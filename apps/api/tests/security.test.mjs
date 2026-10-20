import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {default:worker,hasVerifiedMfa,BIOFLOW_MFA_CLAIM}=await testModule(new URL('../src/index.ts',import.meta.url),'api');
const origin='https://jrpasolini.tech';
const env={APP_ORIGIN:origin,ENABLE_PDF_ENDPOINTS:'false'};
const call=(path,options={},bindings=env)=>worker.fetch(new Request('https://bioflow.test'+path,options),bindings);

test('health is liveness and makes configuration status explicit',async()=>{
 const r=await call('/api/health',{headers:{Origin:origin}});
 assert.equal(r.status,200);
 const body=await r.json();
 assert.equal(body.databaseConfigured,false);assert.equal(body.pdfEndpointsEnabled,false);
 assert.equal(r.headers.get('Access-Control-Allow-Origin'),origin);
 assert.equal(r.headers.get('Cache-Control'),'no-store');
});
test('CORS permits only the exact public BioFlow origin',async()=>{
 assert.equal((await call('/api/demo/overview',{method:'OPTIONS',headers:{Origin:origin}})).status,204);
 const bad=await call('/api/demo/overview',{method:'OPTIONS',headers:{Origin:origin+'.evil.test'}});
 assert.equal(bad.status,403);assert.equal(bad.headers.get('Access-Control-Allow-Origin'),null);
 const read=await call('/api/demo/overview',{headers:{Origin:'https://evil.test'}});
 assert.equal(read.headers.get('Access-Control-Allow-Origin'),null);
 for(const rejectedOrigin of [origin+'/bioflow','https://www.jrpasolini.tech','https://bioflow-6d0z.onrender.com']){
  const denied=await call('/api/demo/overview',{method:'OPTIONS',headers:{Origin:rejectedOrigin}});
  assert.equal(denied.status,403);assert.equal(denied.headers.get('Access-Control-Allow-Origin'),null);
 }
});
test('fixture-only response is labeled and has 26 reports / 258 numeric observations',async()=>{
 const r=await call('/api/demo/overview');const body=await r.json();
 assert.equal(body.source,'synthetic-fixtures');assert.equal(body.reports.length,26);
 assert.equal(body.reports.flatMap(r=>r.results).length,258);
});
test('configured but unavailable Atlas returns a sanitized error, never silent fixtures',async()=>{
 const r=await call('/api/demo/overview',{}, {...env,MONGODB_URI:'invalid-test-uri'});
 assert.equal(r.status,503);assert.deepEqual(await r.json(),{error:'demo_database_unavailable'});
});
test('PDF list/upload/download stay disabled even if bindings accidentally exist',async()=>{
 const bindings={...env,REPORTS_BUCKET:{},AUTH0_ISSUER_BASE_URL:'https://example.test',AUTH0_AUDIENCE:'a',BIOFLOW_OWNER_SUB:'owner'};
 for(const method of ['GET','POST']){
  const r=await call('/api/patients/demo-walter-white/reports',{method},bindings);
  assert.equal(r.status,503);assert.deepEqual(await r.json(),{error:'pdf_endpoints_disabled'});
 }
 assert.equal((await call('/api/patients/demo-walter-white/reports/00000000-0000-0000-0000-000000000000/download',{},bindings)).status,503);
});

test('a published demo code cannot authorize private PDF endpoints',async()=>{
 const code='246810'; // UI-only shortcut; never a bearer token.
 const binding={...env,ENABLE_PDF_ENDPOINTS:'true',REPORTS_BUCKET:{}};
 const response=await call('/api/patients/demo-walter-white/reports',{
  headers:{Authorization:'Bearer '+code,'X-Bioflow-Demo-Code':code}
 },binding);
 assert.equal(response.status,503);
 assert.deepEqual(await response.json(),{error:'auth_not_configured'});
});

test('private account needs a signed, explicitly boolean MFA claim',()=>{
 assert.equal(hasVerifiedMfa({}),false);
 assert.equal(hasVerifiedMfa({[BIOFLOW_MFA_CLAIM]:false}),false);
 assert.equal(hasVerifiedMfa({[BIOFLOW_MFA_CLAIM]:'true'}),false);
 assert.equal(hasVerifiedMfa({[BIOFLOW_MFA_CLAIM]:true}),true);
 assert.equal(hasVerifiedMfa({'amr':['pwd','mfa']}),false);
});
