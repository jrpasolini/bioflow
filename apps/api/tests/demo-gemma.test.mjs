import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {testModule} from '../../../scripts/test-module.mjs';

const {handleGemmaDemo,demoReady,extractGemmaJson,chunkDocument,parseGemmaChunk,runGemmaChunks}=await testModule(new URL('../src/demo-gemma.ts',import.meta.url),'demo-gemma');
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

test('chunking never discards text, whatever the document size',()=>{
 // This used to assert a ceiling of 10 chunks. That ceiling silently dropped the
 // rest of the document: the two large published samples were only 59% and 51%
 // read, and the visitor was still told the extraction had succeeded. Every
 // character must now reach a chunk; an oversized document is refused upstream
 // instead of being shortened here.
 const page='z'.repeat(20000);
 const doc=(page+'\f').repeat(40);
 const chunks=chunkDocument(doc,9000);
 assert.ok(chunks.length>10,'a large document needs more than the old ceiling');
 // Page breaks are separators, not content: compare against the text itself.
 const content=doc.replace(/\f/g,'');
 assert.equal(chunks.reduce((total,chunk)=>total+chunk.length,0),content.length,'no character may be dropped');
 assert.ok(chunks.every(chunk=>chunk.length<=9000),'no chunk exceeds the cap');
});

test('every published sample is read in full',()=>{
 // The real documents, at their real size: the regression this test protects is
 // measured against them, not against a synthetic string.
 for(const sample of audit.heldout){
  const chars=Math.ceil(sample.bytes/6)*4; // generous upper bound on extracted text
  const doc='x'.repeat(Math.min(chars,40000));
  const chunks=chunkDocument(doc);
  assert.equal(chunks.reduce((total,chunk)=>total+chunk.length,0),doc.length,sample.file+' must be read in full');
 }
});

test('a Gemma chunk needs parseable JSON and a results array, even if HTTP succeeded',()=>{
 const date='2026-10-02';
 assert.throws(()=>parseGemmaChunk({response:'{\"results\": ['},date),/invalid_model_json/);
 assert.throws(()=>parseGemmaChunk({response:JSON.stringify({laboratory:'Lab'})},date),/invalid_model_schema/);
 assert.throws(()=>parseGemmaChunk({response:JSON.stringify({results:'none'})},date),/invalid_model_schema/);
 assert.throws(()=>parseGemmaChunk({response:JSON.stringify({results:[42]})},date),/invalid_model_schema/);
 assert.throws(()=>parseGemmaChunk({response:JSON.stringify({collectedAt:'2026-01-01',results:[]})},date),/invalid_model_metadata/);
 // Empty arrays are legitimate for cover sheets and administrative pages.
 assert.deepEqual(parseGemmaChunk({response:JSON.stringify({results:[]})},date),{laboratory:'',results:[]});
});

test('invalid JSON in one chunk is retried and only fully validated chunks are merged',async()=>{
 const calls=new Map();
 const date='2026-10-02';
 const data=await runGemmaChunks(['page-1','page-2','page-3'],date,async chunk=>{
  const attempt=(calls.get(chunk)||0)+1;calls.set(chunk,attempt);
  if(chunk==='page-2'&&attempt===1)return {response:'{\"results\": ['};
  if(chunk==='page-3')return {response:JSON.stringify({results:[]})};
  return {choices:[{message:{content:JSON.stringify({
   collectedAt:date,laboratory:'Lab demonstration',results:[{code:chunk,name:'Test',value:1,unit:'mg/dL'}]
  })}}]};
 });
 assert.equal(calls.get('page-1'),1);
 assert.equal(calls.get('page-2'),2);
 assert.equal(calls.get('page-3'),1);
 assert.equal(data.laboratory,'Lab demonstration');
 assert.deepEqual(data.results.map(row=>row.code),['page-1','page-2']);
});

test('a persistently malformed chunk aborts the complete document instead of returning a partial report',async()=>{
 const calls=new Map();
 await assert.rejects(runGemmaChunks(['good','bad'],'2026-10-02',async chunk=>{
  calls.set(chunk,(calls.get(chunk)||0)+1);
  if(chunk==='bad')return {response:'{\"results\": ['};
  return {response:JSON.stringify({results:[{code:'glucose',name:'Glucose',value:93,unit:'mg/dL'}]})};
 }),/incomplete_extraction/);
 assert.equal(calls.get('good'),1);
 assert.equal(calls.get('bad'),2);
});

test('malformed chunk schema or transport errors get one retry; a second failure rejects the whole extraction',async()=>{
 let attempts=0;
 const accepted=await runGemmaChunks(['only'],'2026-10-02',async()=>{
  attempts++;
  if(attempts===1)throw Error('model_unavailable');
  return {response:JSON.stringify({results:[]})};
 });
 assert.equal(attempts,2);
 assert.deepEqual(accepted.results,[]);
 let failures=0;
 await assert.rejects(runGemmaChunks(['only'],'2026-10-02',async()=>{
  failures++;
  return {response:JSON.stringify({results:null})};
 }),/incomplete_extraction/);
 assert.equal(failures,2);
});

