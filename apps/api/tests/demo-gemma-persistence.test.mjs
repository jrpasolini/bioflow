import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash,createHmac} from 'node:crypto';
import {testModule} from '../../../scripts/test-module.mjs';

const {handleGemmaDemo,demoReady,setDbRunnerForTests}=await testModule(new URL('../src/demo-gemma.ts',import.meta.url),'demo-gemma');
const {SAMPLES}=await testModule(new URL('../src/demo-samples.ts',import.meta.url),'demo-samples');

const SECRET='s'.repeat(48);
const base='https://bioflow.example/api/demo/';
const HASH=Object.keys(SAMPLES)[0];
const SESSION_LIFETIME=60*60*1000;

/** Minimal in-memory stand-in for the bioflow_sessions.demo_imports collection. */
function fakeDb(rows=[]){
 const writes=[];
 const coll={
  rows,writes,
  async findOne(filter,options){
   const found=rows.find(r=>r.sessionId===filter.sessionId&&r.sha256===filter.sha256);
   return found?{...found}:null;
  },
  async countDocuments(filter){
   const now=filter.expiresAt?.$gt??new Date(0);
   return rows.filter(r=>r.sessionId===filter.sessionId&&r.expiresAt>now).length;
  },
  async updateOne(filter,update,options){
   writes.push({filter,update,options});
   const exists=rows.some(r=>r.sessionId===filter.sessionId&&r.sha256===filter.sha256);
   if(!exists&&options?.upsert)rows.push({...update.$setOnInsert});
   return {upsertedCount:exists?0:1};
  },
  find(filter){
   const now=filter.expiresAt?.$gt??new Date(0);
   let out=rows.filter(r=>r.sessionId===filter.sessionId&&r.expiresAt>now);
   const chain={
    sort(){return chain;},limit(n){out=out.slice(0,n);return chain;},maxTimeMS(){return chain;},
    async toArray(){return out.map(({sessionId,...rest})=>rest);}
   };
   return chain;
  }
 };
 return {db:{collection:()=>coll},coll};
}

function token(id,expires){
 const message=id+'.'+expires;
 const mac=createHmac('sha256',SECRET).update(message).digest('hex');
 return message+'.'+mac;
}

function env(overrides={}){
 return {ENABLE_GEMMA_DEMO:'true',DEMO_SESSION_SECRET:SECRET,MONGODB_DEMO_WRITE_URI:'mongodb://not-used',
  AI:{toMarkdown:async()=>{throw Error('must not run');},run:async()=>{throw Error('must not run');}},
  DEMO_RATE_LIMITER:{limit:async()=>({success:true})},...overrides};
}

function report(date){
 return {collectedAt:date,laboratory:'Laboratório demonstrativo',
  results:[{code:'glucose',name:'Glicose',value:98,unit:'mg/dL'}]};
}

function canonical(value){
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 if(value&&typeof value==='object'){
  const entries=Object.entries(value).filter(([,item])=>item!==undefined)
   .sort(([a],[b])=>a<b?-1:a>b?1:0);
  return '{'+entries.map(([k,item])=>JSON.stringify(k)+':'+canonical(item)).join(',')+'}';
 }
 return JSON.stringify(value)??'null';
}

function proof(id,hash,expires,body){
 const message=id+'|'+hash+'|'+expires+'|'+canonical(body);
 return createHmac('sha256',SECRET).update(message).digest('hex');
}

async function commit(id,sessionExpires,body,overrides={}){
 const payload={sha256:HASH,proof:proof(id,HASH,body.proofExpires,body.report),
  proofExpires:body.proofExpires,report:body.report,reviewed:true};
 return handleGemmaDemo(new Request(base+'commit',{method:'POST',
  headers:{Authorization:'Bearer '+token(id,sessionExpires),'Content-Type':'application/json',
   'CF-Connecting-IP':'192.0.2.9'},
  body:JSON.stringify(payload)}),env(overrides),'/api/demo/commit');
}

test.afterEach(()=>setDbRunnerForTests(null));

test('a confirmed import is written only to the temporary session store',async()=>{
 const {db,coll}=fakeDb();
 setDbRunnerForTests(async(_env,fn)=>fn(db));
 const id=crypto.randomUUID(),expires=Date.now()+SESSION_LIFETIME;
 const body={report:report(SAMPLES[HASH].date),proofExpires:Date.now()+5*60*1000};
 const response=await commit(id,expires,body);
 assert.equal(response.status,201);
 assert.equal(coll.rows.length,1);
 const stored=coll.rows[0];
 assert.equal(stored.sessionId,id);
 assert.equal(stored.sha256,HASH);
 assert.equal(stored.report.isSynthetic,true);
 assert.equal(stored.source,'gemma-4-reviewed-demo');
});

test('import expiry is anchored to the session, never extended by a late confirmation',async()=>{
 const {db,coll}=fakeDb();
 setDbRunnerForTests(async(_env,fn)=>fn(db));
 const id=crypto.randomUUID();
 // A reviewer who confirms 59 minutes after the session started.
 const expires=Date.now()+60*1000;
 const body={report:report(SAMPLES[HASH].date),proofExpires:Date.now()+5*60*1000};
 const response=await commit(id,expires,body);
 assert.equal(response.status,201);
 assert.equal(coll.rows[0].expiresAt.getTime(),expires);
 assert.ok(coll.rows[0].expiresAt.getTime()-Date.now()<2*60*1000,
  'a late import must not survive the session that created it');
});

test('the fourth import is refused as a limit, not reported as a database failure',async()=>{
 const id=crypto.randomUUID(),expires=Date.now()+SESSION_LIFETIME;
 const now=new Date();
 const {db}=fakeDb(['a','b','c'].map((suffix,index)=>({sessionId:id,sha256:suffix.repeat(64),
  expiresAt:new Date(now.getTime()+SESSION_LIFETIME),report:{}})));
 setDbRunnerForTests(async(_env,fn)=>fn(db));
 const body={report:report(SAMPLES[HASH].date),proofExpires:Date.now()+5*60*1000};
 const response=await commit(id,expires,body);
 assert.equal(response.status,429);
 assert.deepEqual(await response.json(),{error:'demo_limit_reached'});
});

test('re-confirming an already saved sample at the cap stays idempotent',async()=>{
 const id=crypto.randomUUID(),expires=Date.now()+SESSION_LIFETIME;
 const rows=['a','b'].map(suffix=>({sessionId:id,sha256:suffix.repeat(64),
  expiresAt:new Date(Date.now()+SESSION_LIFETIME),report:{}}));
 rows.push({sessionId:id,sha256:HASH,expiresAt:new Date(expires),report:report(SAMPLES[HASH].date)});
 const {db}=fakeDb(rows);
 setDbRunnerForTests(async(_env,fn)=>fn(db));
 const body={report:report(SAMPLES[HASH].date),proofExpires:Date.now()+5*60*1000};
 const response=await commit(id,expires,body);
 assert.equal(response.status,201);
});

test('a forged proof is rejected before any write happens',async()=>{
 const {db,coll}=fakeDb();
 setDbRunnerForTests(async(_env,fn)=>fn(db));
 const id=crypto.randomUUID(),expires=Date.now()+SESSION_LIFETIME;
 const body={report:report(SAMPLES[HASH].date),proofExpires:Date.now()+5*60*1000};
 const forged={sha256:HASH,proof:'0'.repeat(64),proofExpires:body.proofExpires,report:body.report,reviewed:true};
 const response=await handleGemmaDemo(new Request(base+'commit',{method:'POST',
  headers:{Authorization:'Bearer '+token(id,expires),'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.9'},
  body:JSON.stringify(forged)}),env(),'/api/demo/commit');
 assert.equal(response.status,403);
 assert.deepEqual(await response.json(),{error:'invalid_proof'});
 assert.equal(coll.rows.length,0);
 assert.equal(coll.writes.length,0);
});

test('a report altered after extraction is refused',async()=>{
 const {db,coll}=fakeDb();
 setDbRunnerForTests(async(_env,fn)=>fn(db));
 const id=crypto.randomUUID(),expires=Date.now()+SESSION_LIFETIME;
 const original=report(SAMPLES[HASH].date);
 const proofExpires=Date.now()+5*60*1000;
 const tampered={...original,results:[{...original.results[0],value:9999}]};
 const response=await handleGemmaDemo(new Request(base+'commit',{method:'POST',
  headers:{Authorization:'Bearer '+token(id,expires),'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.9'},
  body:JSON.stringify({sha256:HASH,proof:proof(id,HASH,proofExpires,original),proofExpires,
   report:tampered,reviewed:true})}),env(),'/api/demo/commit');
 assert.equal(response.status,403);
 assert.equal(coll.rows.length,0);
});

test('history returns only imports that have not expired',async()=>{
 const id=crypto.randomUUID(),expires=Date.now()+SESSION_LIFETIME;
 const {db}=fakeDb([
  {sessionId:id,sha256:HASH,expiresAt:new Date(Date.now()+10*60*1000),report:report(SAMPLES[HASH].date)},
  {sessionId:id,sha256:'e'.repeat(64),expiresAt:new Date(Date.now()-1000),report:report(SAMPLES[HASH].date)}
 ]);
 setDbRunnerForTests(async(_env,fn)=>fn(db));
 const response=await handleGemmaDemo(new Request(base+'imports',{headers:{
  Authorization:'Bearer '+token(id,expires),'CF-Connecting-IP':'192.0.2.9'}}),env(),'/api/demo/imports');
 assert.equal(response.status,200);
 const {imports}=await response.json();
 assert.equal(imports.length,1);
 assert.equal(imports[0].sha256,HASH);
});

test('the demo stays disabled without every safety binding',()=>{
 assert.equal(demoReady({ENABLE_GEMMA_DEMO:'true',DEMO_SESSION_SECRET:SECRET,MONGODB_DEMO_WRITE_URI:'x',
  AI:{},DEMO_RATE_LIMITER:{limit:async()=>({success:true})}}),true);
 assert.equal(demoReady({ENABLE_GEMMA_DEMO:'true',DEMO_SESSION_SECRET:'short',MONGODB_DEMO_WRITE_URI:'x',
  AI:{},DEMO_RATE_LIMITER:{limit:async()=>({success:true})}}),false);
 assert.equal(demoReady({ENABLE_GEMMA_DEMO:'true',DEMO_SESSION_SECRET:SECRET,
  AI:{},DEMO_RATE_LIMITER:{limit:async()=>({success:true})}}),false);
});
