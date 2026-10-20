import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {testModule} from '../../../scripts/test-module.mjs';
const {demoPatient,demoReports}=await testModule(new URL('../src/synthetic.ts',import.meta.url),'import-fixtures');
const {demoSources,heldoutDates}=await testModule(new URL('../src/demo-sources.ts',import.meta.url),'import-sources');
test('26 distinct baseline reports exclude all 3 held-out dates',()=>{
 assert.equal(demoReports.length,26);assert.equal(new Set(demoReports.map(r=>r.id)).size,26);
 assert.equal(demoReports.flatMap(r=>r.results).length,258);
 assert.equal(demoPatient.isSynthetic,true);assert.match(demoPatient.dateOfBirth,/^\d{4}-\d{2}-\d{2}$/);
 assert.equal(heldoutDates.length,3);
 for(const r of demoReports){assert.equal(r.isSynthetic,true);assert.equal(r.originalPdfId,null);assert.ok(!heldoutDates.includes(r.collectedAt));}
});
test('all 26 baseline PDFs match recorded hashes and source page provenance',()=>{
 for(const r of demoReports){
  const source=demoSources[r.id];assert.ok(source);
  const bytes=readFileSync(new URL('../../../apps/web/public/demo/'+source.file,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),source.sha256);
  for(const a of r.results){assert.ok(Number.isFinite(a.value));assert.ok(a.sourcePage>=1&&a.sourcePage<=source.originalPages);}
 }
 assert.equal(Object.values(demoSources).reduce((s,r)=>s+r.originalPages,0),275);
});
test('qualitative reports retain PDFs without invented numeric readings',()=>{
 for(const date of ['2022-08-24','2022-11-19']){
  const r=demoReports.find(r=>r.collectedAt===date);assert.ok(r);assert.deepEqual(r.results,[]);assert.ok(demoSources[r.id]);
 }
});
