import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {validateDemoBaseline,syntheticFallback,atlasFailureReason}=await testModule(new URL('../src/atlas.ts',import.meta.url),'atlas-baseline');
test('Atlas must contain the complete published baseline, independent of query ordering',()=>{
 const data=structuredClone(syntheticFallback);
 data.reports.reverse();for(const r of data.reports)r.results.reverse();
 assert.equal(validateDemoBaseline(data).reports.flatMap(r=>r.results).length,604);
});

test('Atlas diagnostics expose fixed categories and never echo connection details',()=>{
 const privateMessage='mongodb+srv://fictional:do-not-echo@example.invalid/';
 for(const [error,expected] of [
  [{name:'MongoParseError',message:privateMessage},'invalid_database_configuration'],
  [{code:18,message:privateMessage},'database_authentication_failed'],
  [{name:'MongoServerError',code:8000,message:'bad auth : authentication failed '+privateMessage},'database_authentication_failed'],
  [{name:'MongoServerError',code:8000,message:privateMessage},'database_server_failed'],
  [new TypeError(privateMessage),'database_runtime_failed'],
  [{code:13,message:privateMessage},'database_permission_denied'],
  [{name:'MongoServerSelectionError',message:privateMessage},'database_unreachable'],
  [Error('demo_baseline_outdated'),'demo_baseline_invalid'],
  [Error(privateMessage),'database_read_failed'],
  [null,'database_read_failed']
 ])assert.equal(atlasFailureReason(error),expected);
});
test('an old partial Atlas seed or altered reading cannot replace the public baseline',()=>{
 const partial=structuredClone(syntheticFallback);
 partial.reports.find(r=>r.results.length).results.pop();
 assert.throws(()=>validateDemoBaseline(partial),/demo_baseline_outdated/);
 const altered=structuredClone(syntheticFallback);
 altered.reports.find(r=>r.results.length).results[0].value++;
 assert.throws(()=>validateDemoBaseline(altered),/demo_baseline_outdated/);
});
