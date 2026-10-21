/**
 * Provision ONLY the temporary public demo import collection in bioflow_sessions.
 * Requires MONGODB_DEMO_WRITE_URI with createIndex privileges there; never changes bioflow_demo.
 * Run intentionally with a credential from a local, ignored environment file.
 */
import {MongoClient} from 'mongodb';

const uri=process.env.MONGODB_DEMO_WRITE_URI;
if(!uri||!/^mongodb(\+srv)?:\/\//.test(uri)){
 console.error('Set MONGODB_DEMO_WRITE_URI securely. No changes were made.');
 process.exitCode=1;
}else{
 const client=new MongoClient(uri,{maxPoolSize:1,minPoolSize:0,serverSelectionTimeoutMS:6000,connectTimeoutMS:6000,
  appName:'bioflow-provision-guest-import-indexes'});
 try{
  await client.connect();
  const coll=client.db('bioflow_sessions').collection('demo_imports');
  const unique=await coll.createIndex({sessionId:1,sha256:1},{name:'unique_session_sample',unique:true});
  // A TTL index on the same key may already exist under a different name; MongoDB
  // allows only one, so adopt the existing one instead of failing the whole setup.
  const existing=await coll.indexes();
  const ttlIndex=existing.find(index=>{
   const keys=Object.keys(index.key);
   return keys.length===1&&keys[0]==='expiresAt'&&index.expireAfterSeconds!==undefined;
  });
  const ttl=ttlIndex?ttlIndex.name
   :await coll.createIndex({expiresAt:1},{name:'delete_expired_imports',expireAfterSeconds:0});
  console.log('Isolated demo indexes ready:',unique,ttl);
 }catch{
  console.error('Could not configure the isolated session indexes. Check access and existing index options.');
  process.exitCode=1;
 }finally{await client.close();}
}
