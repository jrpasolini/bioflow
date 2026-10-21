import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {DEMO_ACCESS_CODE,isDemoAccessCode}=await testModule(new URL('../src/demo-access.ts',import.meta.url),'demo-access');
test('demo access accepts only the exact published six-digit test value',()=>{
 assert.equal(DEMO_ACCESS_CODE,'110526');
 assert.equal(isDemoAccessCode(DEMO_ACCESS_CODE),true);
 for(const code of ['','000000','123456','246810','11052','1105260',' 110526','110526 ','11052x','１１０５２６','Bearer 110526']){
  assert.equal(isDemoAccessCode(code),false,JSON.stringify(code));
 }
});
