import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {demoSessionExpiry}=await testModule(new URL('../src/demo-session.ts',import.meta.url),'demo-session');
test('the UI expires an old token instead of retaining its history or renewing its deadline',()=>{
 const now=1792620000000,token=expiry=>'00000000-0000-4000-8000-000000000001.'+expiry+'.'+'0'.repeat(64);
 const original=token(now+60000);
 assert.equal(demoSessionExpiry(original,now),now+60000);
 assert.equal(demoSessionExpiry(original,now+60000),null);
 for(const invalid of ['110526','invalid',token(now-1),token(now+3600001)])
  assert.equal(demoSessionExpiry(invalid,now),null);
});
