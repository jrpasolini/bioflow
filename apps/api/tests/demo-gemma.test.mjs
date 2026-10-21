import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {testModule} from '../../../scripts/test-module.mjs';

const {handleGemmaDemo,demoReady,extractGemmaJson,chunkDocument}=await testModule(new URL('../src/demo-gemma.ts',import.meta.url),'demo-gemma');
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
 // A quoted but unambiguous number is accepted on purpose: Brazilian reports print
 // "5,170" and the model echoes it as text. Anything non-numeric still throws.
 assert.equal(extractGemmaJson({response:'{"collectedAt":"2026-05-15","laboratory":"X","results":[{"code":"glucose","name":"Glicose","value":"98","unit":"mg"}]}'},'2026-05-15').results[0].value,98);
 // A value carrying its own unit is ambiguous, so the row is dropped; with nothing
 // left the report fails as unreadable rather than inventing a number.
 assert.throws(()=>extractGemmaJson({response:'{"collectedAt":"2026-05-15","laboratory":"X","results":[{"code":"glucose","name":"Glicose","value":"98 mg/dL","unit":"mg"}]}'},'2026-05-15'),/no_results_extracted/);
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
 const env={ENABLE_GEMMA_DEMO:'true',DEMO_SESSION_SECRET:'z'.repeat(40),MONGODB_DEMO_WRITE_URI:'not-used-in-this-test',
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
 const env={AI:{},MONGODB_DEMO_WRITE_URI:'x',DEMO_SESSION_SECRET:'s'.repeat(40),ENABLE_GEMMA_DEMO:'true'};
 assert.equal(demoReady(env),false);
});

test('Brazilian decimal comma is normalised instead of rejected',()=>{
 const data={collectedAt:'2026-05-15',laboratory:'Labortel',results:[
  {code:'hemacias',name:'Hemácias',value:'5,170',unit:'milhões/mm3'},
  {code:'hemoglobina',name:'Hemoglobina',value:'15,30',unit:'g/dL'},
  {code:'hematocrito',name:'Hematócrito',value:'46,70',unit:'%',referenceLow:'41,0',referenceHigh:'53,0'},
  {code:'vcm',name:'VCM',value:'1.234,5',unit:'fL'}
 ]};
 const parsed=extractGemmaJson({response:JSON.stringify(data)},'2026-05-15');
 assert.equal(parsed.results[0].value,5.17);
 assert.equal(parsed.results[1].value,15.3);
 assert.equal(parsed.results[2].value,46.7);
 assert.equal(parsed.results[2].referenceLow,41);
 assert.equal(parsed.results[2].referenceHigh,53);
 assert.equal(parsed.results[3].value,1234.5);
});

test('a non-numeric value is still refused, never coerced',()=>{
 const data={collectedAt:'2026-05-15',laboratory:'Labortel',results:[
  {code:'x',name:'Marcador',value:'negativo',unit:'-'}]};
 assert.throws(()=>extractGemmaJson({response:JSON.stringify(data)},'2026-05-15'),/no_results_extracted/);
});

test('one malformed row does not discard an otherwise readable report',()=>{
 const data={collectedAt:'2026-05-15',laboratory:'Labortel',results:[
  {code:'hemoglobina',name:'Hemoglobina',value:'15,30',unit:'g/dL'},
  {code:'ausentes',name:'Ausentes',value:'Ausentes',unit:''},
  {code:'leucocitos',name:'Leucócitos',value:'6.800',unit:'/mm3'}
 ]};
 const parsed=extractGemmaJson({response:JSON.stringify(data)},'2026-05-15');
 assert.equal(parsed.results.length,2);
 // The readable rows are kept and resolved to the shared vocabulary, so they join
 // the series the history already plots instead of starting orphan lines.
 assert.deepEqual(parsed.results.map(r=>r.code),['hemoglobin','wbc']);
});

test('long documents are split on page breaks, never in one oversized call',()=>{
 const page='\f'+'x'.repeat(3000);
 const doc=page.repeat(5)+'\f'+'y'.repeat(500);
 const chunks=chunkDocument(doc,9000);
 assert.ok(chunks.length>1,'expected several chunks');
 assert.ok(chunks.every(c=>c.length<=9000),'no chunk exceeds the cap');
 assert.equal(chunks.slice(0,10).map(c=>c.length).reduce((a,b)=>a+b,0)<=10*9000,true);
});

test('a document that already fits is sent whole',()=>{
 const doc='short report body';
 assert.deepEqual(chunkDocument(doc,9000),[doc]);
});

test('chunking stops at the safety ceiling instead of unbounded fan-out',()=>{
 const doc=('z'.repeat(20000)+'\f').repeat(40);
 assert.equal(chunkDocument(doc,9000).length,10);
});
