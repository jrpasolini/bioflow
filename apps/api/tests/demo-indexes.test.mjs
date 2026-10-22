import test from 'node:test';
import assert from 'node:assert/strict';
import {ensureDemoImportIndexes} from '../../../scripts/demo-import-indexes.mjs';

function collection(indexes){
 const calls=[];
 return {calls,async indexes(){return indexes;},async createIndex(key,options){calls.push({key,options});return options.name;}};
}
test('provisioning accepts an existing full TTL index under its actual name',async()=>{
 const coll=collection([{name:'ttl_import_expiry',key:{expiresAt:1},expireAfterSeconds:0}]);
 assert.deepEqual(await ensureDemoImportIndexes(coll),{unique:'unique_session_sample',ttl:'ttl_import_expiry'});
 assert.equal(coll.calls.length,1);
});
test('provisioning refuses non-TTL, delayed or partial expiry indexes',async()=>{
 for(const options of [{},{expireAfterSeconds:3600},{expireAfterSeconds:0,partialFilterExpression:{isSynthetic:true}}]){
  const coll=collection([{name:'old_expiry',key:{expiresAt:1},...options}]);
  await assert.rejects(ensureDemoImportIndexes(coll),/Unexpected expiresAt index/);
 }
});
test('provisioning creates an immediate TTL index when none exists',async()=>{
 const coll=collection([{name:'_id_',key:{_id:1}}]);
 await ensureDemoImportIndexes(coll);
 assert.deepEqual(coll.calls[1],{key:{expiresAt:1},options:{name:'delete_expired_imports',expireAfterSeconds:0}});
});
