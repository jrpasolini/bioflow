import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {testModule} from '../../../scripts/test-module.mjs';

const {handleGemmaDemo,demoReady,extractGemmaJson}=await testModule(new URL('../src/demo-gemma.ts',import.meta.url),'demo-gemma');
const {SAMPLES,isSampleHash}=await testModule(new URL('../src/demo-samples.ts',import.meta.url),'demo-samples');
const audit=JSON.parse(await readFile(new URL('../../../docs/PDF_PUBLICATION_AUDIT.json',import.meta.url),'utf8'));
const base='https://bioflow.example/api/demo/';

test('only three audited synthetic PDFs can enter the paid AI path',()=>{
 assert.equal(Object.keys(SAMPLES).length,3);
 for(const sample of audit.heldout){
  assert.ok(isSampleHash(sample.sha256));
  assert.equal(SAMPLES[sample.sha256].filename,sample.file);
  assert.equal(SAMPLES[sample.sha256].pages,sample.pages);
 }
 for(const sample of audit.baseline)assert.equal(isSampleHash(sample.sha256),false);
 assert.equal(isSampleHash('0000'),false);
});

test('Gemma output needs an explicit, verifiable date and numeric values',()=>{
 const data={collectedAt:'2026-05-15',laboratory:'Laboratório demonstrativo',
  results:[{code:'glucose',name:'Glicose',value:98,unit:'mg/dL',sourcePage:2,referenceLow:70,referenceHigh:99}]};
 const ai={choices:[{message:{content:JSON.stringify(data)}}]};
 const parsed=extractGemmaJson(ai,'2026-05-15');
 assert.deepEqual(parsed,data);
 assert.throws(()=>extractGemmaJson(ai,'2026-10-02'),/invalid_model_metadata/);
 assert.throws(()=>extractGemmaJson({response:'{"collectedAt":"2026-05-15","laboratory":"X","results":[{"code":"glucose","name":"Glicose","value":"98","unit":"mg"}]}'},'2026-05-15'),/invalid_result/);
 assert.throws(()=>extractGemmaJson({response:'nothing'},'2026-05-15'),/invalid_model_json/);
});

test('new route is disabled until explicitly enabled with all safety bindings',async()=>{
 const env={ENABLE_GEMMA_DEMO:'false'};
 assert.equal(demoReady(env),false);
 const res=await handleGemmaDemo(new Request(base+'extract',{method:'POST'}),env,'/api/demo/extract');
 assert.equal(res.status,503);
 assert.deepEqual(await res.json(),{error:'gemma_demo_disabled'});
});

test('demo token is temporary, and unknown PDF cannot reach paid model',async()=>{
 let calls=0;
 const env={ENABLE_GEMMA_DEMO:'true',DEMO_SESSION_SECRET:'z'.repeat(40),MONGODB_URI:'not-used-in-this-test',
 AI:{toMarkdown:async()=>{calls++;throw Error('must not run');},run:async()=>{calls++;throw Error('must not run');}},
 DEMO_RATE_LIMITER:{limit:async()=>({success:true})}};
 const opts={method:'POST',headers:{'CF-Connecting-IP':'192.0.2.5'}};
 const created=await handleGemmaDemo(new Request(base+'session',opts),env,'/api/demo/session');
 assert.equal(created.status,200);
 const {token}=await created.json();
 const badAuth=await handleGemmaDemo(new Request(base+'extract',{...opts,headers:{'CF-Connecting-IP':'192.0.2.5',Authorization:'Bearer incorrect'}}),env,'/api/demo/extract');
 assert.equal(badAuth.status,401);
 const form=new FormData();
 form.append('file',new File([new TextEncoder().encode('%PDF-1.4\nNOT-ONE-OF-OUR-THREE-SAMPLES\n'+'x'.repeat(128))],'unknown.pdf',{type:'application/pdf'}));
 const rejected=await handleGemmaDemo(new Request(base+'extract',{...opts,headers:{'CF-Connecting-IP':'192.0.2.5',Authorization:'Bearer '+token},body:form}),env,'/api/demo/extract');
 assert.equal(rejected.status,403);
 assert.deepEqual(await rejected.json(),{error:'sample_not_allowed'});
 assert.equal(calls,0);
});

test('no rate limiter means disabled, not public paid inference',()=>{
 const env={AI:{},MONGODB_URI:'x',DEMO_SESSION_SECRET:'s'.repeat(40),ENABLE_GEMMA_DEMO:'true'};
 assert.equal(demoReady(env),false);
});
