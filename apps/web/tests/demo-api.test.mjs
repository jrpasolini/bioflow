import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {fetchDemoOverview,localDemo}=await testModule(new URL('../src/demo-api.ts',import.meta.url),'web-api');
const {parseDemoOverview}=await testModule(new URL('../../../packages/fixtures/src/demo-contract.ts',import.meta.url),'demo-contract');
const body=()=>structuredClone({...localDemo,source:'mongodb-atlas-synthetic'});
test('public contract removes unexpected database fields and sorts report history',()=>{
 const data=body();data.patient.secret='private';data.reports[0].privatePdfUrl='private';data.reports.reverse();
 const parsed=parseDemoOverview(data);
 assert.equal(parsed.patient.secret,undefined);assert.equal(parsed.reports[0].privatePdfUrl,undefined);
 assert.equal(parsed.reports[0].id,localDemo.reports[0].id);
});
test('reject mixed, real, malformed and duplicate demo records',()=>{
 for(const mutate of [d=>d.patient.isSynthetic=false,d=>d.reports[0].isSynthetic=false,d=>d.reports[0].patientId='real',d=>d.reports[0].originalPdfId='private',d=>d.reports[0].results[0].value='88',d=>d.reports.push(d.reports[0]),d=>d.reports=[]]){
  const d=body();mutate(d);assert.throws(()=>parseDemoOverview(d));
 }
});
test('adapter fetches only public demo without cookies and validates source',async()=>{
 const data=await fetchDemoOverview('https://api.example.test',new AbortController().signal,async(url,options)=>{
  assert.equal(String(url),'https://api.example.test/api/demo/overview');assert.equal(options.credentials,'omit');assert.equal(options.redirect,'error');
  return Response.json(body());
 });assert.equal(data.reports.length,8);
});
test('outages, mislabeled fixtures, unsafe origins and aborts reject for visible local fallback',async()=>{
 const signal=new AbortController().signal;
 await assert.rejects(fetchDemoOverview('https://api.example.test',signal,async()=>new Response('',{status:503})));
 await assert.rejects(fetchDemoOverview('https://api.example.test',signal,async()=>Response.json({...body(),source:'synthetic-fixtures'})));
 await assert.rejects(fetchDemoOverview('http://external.test',signal));
 await assert.rejects(fetchDemoOverview('https://user:password@api.example.test',signal));
 const c=new AbortController();c.abort();
 await assert.rejects(fetchDemoOverview('https://api.example.test',c.signal,async(_,options)=>{options.signal.throwIfAborted();}));
});
