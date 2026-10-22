/**
 * Provision ONLY the temporary public demo import collection in bioflow_sessions.
 * Requires MONGODB_DEMO_WRITE_URI with createIndex privileges there; never changes bioflow_demo.
 * Run intentionally with a credential from a local, ignored environment file.
 */
import {MongoClient} from 'mongodb';
import {ensureDemoImportIndexes} from './demo-import-indexes.mjs';

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
  const {unique,ttl}=await ensureDemoImportIndexes(coll);
  console.log('Isolated demo indexes ready:',unique,ttl);
 }catch{
  console.error('Could not configure the isolated session indexes. Check access and existing index options.');
  process.exitCode=1;
 }finally{await client.close();}
}
