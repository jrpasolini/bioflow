import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

// Transpile a pure TypeScript module once to test its actual decision logic in Node.
const source = readFileSync(new URL('../../../apps/web/src/reference.ts', import.meta.url), 'utf8');
const transpiled = ts.transpileModule(source, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const {referenceStatus,proportionalReferenceDeviation,chooseFeaturedResult} =
  await import('data:text/javascript;base64,'+Buffer.from(transpiled).toString('base64'));

const marker=(value,low,high)=>({code:'demo',name:'Synthetic',value,unit:'u',referenceLow:low,referenceHigh:high});
test('attention requires an explicit exam interval, never an inferred near-limit zone',()=>{
  assert.equal(referenceStatus(marker(99,70,100)),'normal');
  const explicit={...marker(105,70,100),referenceAttentionLow:101,referenceAttentionHigh:120};
  assert.equal(referenceStatus(explicit),'attention');
  assert.equal(referenceStatus({...explicit,value:121}),'high');
  assert.equal(referenceStatus({...explicit,value:69}),'low');
  assert.equal(referenceStatus({...explicit,referenceAttentionLow:130}),'unknown');
});
test('reference ranges classify high, low, in-range and unknown',()=>{
  assert.equal(referenceStatus(marker(6.6,4,5.7)),'high');
  assert.equal(referenceStatus(marker(38,40,undefined)),'low');
  assert.equal(referenceStatus(marker(5.7,4,5.7)),'normal');
  assert.equal(referenceStatus(marker(4,4,5.7)),'normal');
  assert.equal(referenceStatus(marker(5,undefined,undefined)),'unknown');
  assert.equal(referenceStatus(marker(5,8,4)),'unknown');
});
test('highlight is strictly out-of-range, stable and not a medical severity judgment',()=>{
  const normal=marker(0.99,0.7,1.3);
  const above=marker(6.6,4,5.7);
  const below=marker(38,40,undefined);
  assert.equal(chooseFeaturedResult([normal,below,above]),above);
  assert.equal(chooseFeaturedResult([normal]),null);
  assert.equal(proportionalReferenceDeviation(normal),0);
  assert.ok(proportionalReferenceDeviation(above)>proportionalReferenceDeviation(below));
});

