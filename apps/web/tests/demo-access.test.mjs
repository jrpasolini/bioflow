import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {DEMO_ACCESS_CODE,isDemoAccessCode}=await testModule(new URL('../src/demo-access.ts',import.meta.url),'demo-access');
test('demo access accepts only the exact published six-digit test value',()=>{
 assert.equal(DEMO_ACCESS_CODE,'246810');
 assert.equal(isDemoAccessCode(DEMO_ACCESS_CODE),true);
 for(const code of ['','000000','123456','24681','2468100',' 246810','246810 ','24681x','２４６８１０','Bearer 246810']){
  assert.equal(isDemoAccessCode(code),false,JSON.stringify(code));
 }
});
