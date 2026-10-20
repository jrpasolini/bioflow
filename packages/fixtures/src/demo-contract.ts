import {demoPatient,demoReports,type LabReport,type Indicator} from './synthetic.ts';

export type DemoOverview={patient:{id:string;displayName:string;dateOfBirth:string;demoRecordId:string;isSynthetic:true};reports:LabReport[]};
export const localDemo:DemoOverview={patient:demoPatient,reports:demoReports};
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const text=(v:unknown):v is string=>typeof v==='string'&&v.length>0&&v.length<=200;
const finite=(v:unknown):v is number=>typeof v==='number'&&Number.isFinite(v);
const date=(v:unknown):v is string=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v));

/** Validate the synthetic boundary and copy only public fields; never trust a cast of JSON. */
export function parseDemoOverview(value:unknown):DemoOverview{
 if(!record(value)||!record(value.patient)||!Array.isArray(value.reports))throw Error('invalid_demo');
 const p=value.patient;
 if(p.id!==demoPatient.id||p.isSynthetic!==true||p.displayName!==demoPatient.displayName||p.dateOfBirth!==demoPatient.dateOfBirth||p.demoRecordId!==demoPatient.demoRecordId)throw Error('invalid_demo_identity');
 if(!value.reports.length||value.reports.length>200)throw Error('invalid_reports');
 const ids=new Set<string>();
 const reports=value.reports.map((r:unknown):LabReport=>{
  if(!record(r)||!text(r.id)||!r.id.startsWith('bf-demo-')||ids.has(r.id)||r.patientId!==p.id||r.isSynthetic!==true||r.status!=='synthetic-demo'||r.originalPdfId!==null||!date(r.collectedAt)||!text(r.laboratory)||!Array.isArray(r.results)||!r.results.length||r.results.length>100)throw Error('invalid_report');
  ids.add(r.id);
  const codes=new Set<string>();
  const results=r.results.map((a:unknown):Indicator=>{
   if(!record(a)||!text(a.code)||codes.has(a.code)||!text(a.name)||!text(a.unit)||!finite(a.value)||(a.referenceLow!==undefined&&!finite(a.referenceLow))||(a.referenceHigh!==undefined&&!finite(a.referenceHigh))||(a.referenceAttentionLow!==undefined&&!finite(a.referenceAttentionLow))||(a.referenceAttentionHigh!==undefined&&!finite(a.referenceAttentionHigh)))throw Error('invalid_result');
   codes.add(a.code);
   return {code:a.code,name:a.name,value:a.value,unit:a.unit,...(a.referenceLow===undefined?{}:{referenceLow:a.referenceLow as number}),...(a.referenceHigh===undefined?{}:{referenceHigh:a.referenceHigh as number}),...(a.referenceAttentionLow===undefined?{}:{referenceAttentionLow:a.referenceAttentionLow as number}),...(a.referenceAttentionHigh===undefined?{}:{referenceAttentionHigh:a.referenceAttentionHigh as number})};
  });
  return {id:r.id,patientId:p.id as string,collectedAt:r.collectedAt,laboratory:r.laboratory,status:'synthetic-demo',isSynthetic:true,originalPdfId:null,results};
 }).sort((a,b)=>a.collectedAt.localeCompare(b.collectedAt)||a.id.localeCompare(b.id));
 return {patient:{id:demoPatient.id,displayName:demoPatient.displayName,dateOfBirth:demoPatient.dateOfBirth,demoRecordId:demoPatient.demoRecordId,isSynthetic:true},reports};
}

