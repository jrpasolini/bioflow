/** Provision the session collection without dropping existing indexes or data. */
export async function ensureDemoImportIndexes(coll){
 const unique=await coll.createIndex({sessionId:1,sha256:1},{name:'unique_session_sample',unique:true});
 const existing=await coll.indexes();
 const ttlIndex=existing.find(index=>{
  const keys=Object.keys(index.key);
  return keys.length===1&&keys[0]==='expiresAt';
 });
 // A similarly named index is not evidence of immediate expiration. Adopting a
 // non-TTL, delayed TTL or partial index would silently retain some imports.
 if(ttlIndex&&(ttlIndex.expireAfterSeconds!==0||ttlIndex.partialFilterExpression))
  throw Error('Unexpected expiresAt index options; review before changing retention');
 const ttl=ttlIndex?.name??await coll.createIndex({expiresAt:1},{name:'delete_expired_imports',expireAfterSeconds:0});
 return {unique,ttl};
}
