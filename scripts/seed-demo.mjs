/**
 * Safe, explicit seed script. Synthetic Walter White only.
 * Run from repository root with MONGODB_URI as an environment variable:
 *   node --env-file=.env.local scripts/seed-demo.mjs
 *
 * No database credentials or real patient files are ever committed.
 */
import {readFileSync} from 'node:fs';
import {MongoClient} from 'mongodb';
import ts from 'typescript';

const uri=process.env.MONGODB_URI;
if(!uri || !/^mongodb(\+srv)?:\/\//.test(uri)){
  console.error('Missing MONGODB_URI. Put it in an ignored .env.local file.');
  process.exitCode=1;
}else{
  const dbName=process.env.MONGODB_DB||'bioflow_demo';
  if(dbName!=='bioflow_demo')throw new Error('The seed tool can write ONLY to bioflow_demo');
  const source=readFileSync(new URL('../packages/fixtures/src/synthetic.ts',import.meta.url),'utf8');
  const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
  const {demoPatient,demoReports}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
  if(demoPatient.id!=='demo-walter-white'||!demoPatient.isSynthetic||demoReports.some(r=>r.isSynthetic!==true||r.originalPdfId!==null))throw Error('Seed data is not exclusively synthetic');
  const patient={
    id:demoPatient.id,displayName:demoPatient.displayName,
    dateOfBirth:demoPatient.dateOfBirth,demoRecordId:demoPatient.demoRecordId,
    isSynthetic:true
  };
  const reports=demoReports.map(({results,...r})=>r);
  const results=demoReports.flatMap(r=>r.results.map(item=>({
    ...item,id:r.id+':'+item.code,reportId:r.id,patientId:r.patientId,
    collectedAt:r.collectedAt,isSynthetic:true
  })));
  const client=new MongoClient(uri,{maxPoolSize:1,minPoolSize:0,serverSelectionTimeoutMS:10000});
  try{
    await client.connect();
    const db=client.db(dbName);
    const patients=db.collection('demo_patients');
    const collections=db.collection('demo_reports');
    const observations=db.collection('demo_results');
    await Promise.all([
      patients.createIndex({id:1},{unique:true}),
      collections.createIndex({id:1},{unique:true}),
      collections.createIndex({patientId:1,collectedAt:1}),
      observations.createIndex({id:1},{unique:true}),
      observations.createIndex({patientId:1,code:1,collectedAt:1}),
      observations.createIndex({reportId:1})
    ]);
    await patients.updateOne({id:patient.id},{$set:patient},{upsert:true});
    for(const item of reports)await collections.updateOne({id:item.id},{$set:item},{upsert:true});
    // Match the natural reading identity. Old seeds used a different id suffix;
    // matching only id would duplicate every existing observation on reseeding.
    for(const {id,...item} of results)await observations.updateOne(
      {reportId:item.reportId,code:item.code,isSynthetic:true},
      {$set:item,$setOnInsert:{id}},{upsert:true});
    console.log('BioFlow synthetic demo seeded:',reports.length,'lab reports and',results.length,'observations.');
    console.log('No PDF or real patient information was uploaded. Database:',dbName);
  }finally{
    await client.close();
  }
}
