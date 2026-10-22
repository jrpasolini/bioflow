import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {validateDemoBaseline,syntheticFallback}=await testModule(new URL('../src/atlas.ts',import.meta.url),'atlas-baseline');
test('Atlas must contain the complete published baseline, independent of query ordering',()=>{
 const data=structuredClone(syntheticFallback);
 data.reports.reverse();for(const r of data.reports)r.results.reverse();
 assert.equal(validateDemoBaseline(data).reports.flatMap(r=>r.results).length,604);
});
test('an old partial Atlas seed or altered reading cannot replace the public baseline',()=>{
 const partial=structuredClone(syntheticFallback);
 partial.reports.find(r=>r.results.length).results.pop();
 assert.throws(()=>validateDemoBaseline(partial),/demo_baseline_outdated/);
 const altered=structuredClone(syntheticFallback);
 altered.reports.find(r=>r.results.length).results[0].value++;
 assert.throws(()=>validateDemoBaseline(altered),/demo_baseline_outdated/);
});
