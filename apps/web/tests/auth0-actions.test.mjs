import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

function action(filename){
 const exports={};
 const source=readFileSync(new URL('../../../infra/auth0/actions/'+filename,import.meta.url),'utf8');
 vm.runInNewContext(source,{exports},{filename,timeout:1000});
 return exports.onExecutePostLogin;
}
const requireOtp=action('01-require-otp.js');
const issueClaim=action('02-mfa-access-claim.js');
function event(factors=[],methods=[]){
 return {
  client:{client_id:'bioflow-client'},
  secrets:{BIOFLOW_CLIENT_ID:'bioflow-client'},
  user:{enrolledFactors:factors},
  authentication:{methods}
 };
}
function api(){
 const invocations=[];
 return {
  invocations,
  authentication:{
   enrollWith:f=>invocations.push(['enroll',f.type]),
   challengeWith:f=>invocations.push(['challenge',f.type])
  },
  accessToken:{setCustomClaim:(claim,value)=>invocations.push(['claim',claim,value])}
 };
}
test('New individual account is sent to Auth0 OTP/QR enrollment',async()=>{
 const a=api();
 await requireOtp(event(),a);
 assert.deepEqual(a.invocations,[['enroll','otp']]);
});
test('Enrolled account must complete OTP challenge on return',async()=>{
 const a=api();
 await requireOtp(event([{type:'otp'}]),a);
 assert.deepEqual(a.invocations,[['challenge','otp']]);
});
test('Unrelated Auth0 client cannot invoke BioFlow OTP policy',async()=>{
 const e=event();e.client.client_id='other-spa';
 const a=api();
 await requireOtp(e,a);
 await issueClaim(e,a);
 assert.equal(a.invocations.length,0);
});
test('Only confirmed Auth0 OTP MFA produces the strict private API boolean claim',async()=>{
 for(const methods of [[],[{name:'pwd'}],[{name:'mfa',type:'email'}],[{name:'mfa'}]]){
  const a=api();
  await issueClaim(event([{type:'otp'}],methods),a);
  assert.equal(a.invocations.length,0);
 }
 const a=api();
 await issueClaim(event([{type:'otp'}],[{name:'pwd'},{name:'mfa',type:'otp'}]),a);
 assert.deepEqual(a.invocations,[['claim','https://jrpasolini.tech/bioflow/mfa',true]]);
});
