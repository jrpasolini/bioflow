import {parseDemoOverview} from '../../../packages/fixtures/src/demo-contract';
import {MongoClient, type Db} from 'mongodb';
import {demoPatient,demoReports,type Indicator,type LabReport} from '../../../packages/fixtures/src/synthetic';

export interface AtlasEnv {
  MONGODB_URI?: string;
  MONGODB_DB?: string;
}
const DEMO_PATIENT='demo-walter-white';

/** Independent collections: public demonstration is never populated from real patient datasets. */
interface DemoPatient {
  id: string; displayName: string; dateOfBirth: string;
  demoRecordId: string; isSynthetic: true;
}
interface DemoReport {
  id: string; patientId: string; collectedAt: string; laboratory: string;
  status: 'synthetic-demo'; isSynthetic: true; originalPdfId: null;
}
interface DemoResult extends Indicator {
  id: string; reportId: string; patientId: string; collectedAt: string;
  isSynthetic: true;
}

async function readDemo(db:Db):Promise<{patient:DemoPatient;reports:LabReport[]}> {
  const patient=await db.collection<DemoPatient>('demo_patients').findOne(
    {id:DEMO_PATIENT,isSynthetic:true},
    {maxTimeMS:3000,projection:{_id:0,id:1,displayName:1,dateOfBirth:1,demoRecordId:1,isSynthetic:1}}
  );
  if(!patient) throw new Error('Demo data not seeded');
  const reports=await db.collection<DemoReport>('demo_reports')
    .find({patientId:patient.id,isSynthetic:true,status:'synthetic-demo',originalPdfId:null},{projection:{_id:0,id:1,patientId:1,collectedAt:1,laboratory:1,status:1,isSynthetic:1,originalPdfId:1}})
    .maxTimeMS(3000).sort({collectedAt:1,id:1}).limit(200).toArray();
  if(!reports.length) throw new Error('Demo reports not seeded');
  const ids=reports.map(r=>r.id);
  const resultDocs=await db.collection<DemoResult>('demo_results')
    .find({reportId:{$in:ids},patientId:patient.id,isSynthetic:true},{projection:{_id:0,reportId:1,code:1,name:1,value:1,unit:1,referenceLow:1,referenceHigh:1}})
    .maxTimeMS(3000).limit(5000).toArray();
  const byReport=new Map<string,Indicator[]>();
  for(const item of resultDocs){
    const readings=byReport.get(item.reportId)||[];
    readings.push({
      code:item.code,name:item.name,value:item.value,unit:item.unit,
      ...(item.referenceLow===undefined?{}:{referenceLow:item.referenceLow}),
      ...(item.referenceHigh===undefined?{}:{referenceHigh:item.referenceHigh})
    });
    byReport.set(item.reportId,readings);
  }
  return {patient,reports:reports.map(r=>({...r,results:byReport.get(r.id)||[]}))};
}

/**
 * Cloudflare official direct-TCP MongoDB integration; one MongoClient per request.
 * A plain Worker must not cache I/O handles between requests.
 * Later, a Durable Object can retain one connection for better latency.
 */
export async function loadDemoFromAtlas(env:AtlasEnv):Promise<{patient:DemoPatient;reports:LabReport[]}> {
  if(!env.MONGODB_URI)throw new Error('Atlas not configured');
  const databaseName=env.MONGODB_DB||'bioflow_demo';
  if(databaseName!=='bioflow_demo')throw new Error('Unexpected demo database name');
  const client=new MongoClient(env.MONGODB_URI,{
    maxPoolSize:1,minPoolSize:0,serverSelectionTimeoutMS:5000,
    connectTimeoutMS:5000,socketTimeoutMS:5000,
    retryReads:false,appName:'bioflow-public-demo'
  });
  try {
    await client.connect();
    return parseDemoOverview(await readDemo(client.db(databaseName)));
  } finally {
    await client.close();
  }
}

export const syntheticFallback = {patient:demoPatient,reports:demoReports};

