import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const dist=new URL('../apps/web/dist/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('manifest.webmanifest',dist),'utf8'));
const worker=await readFile(new URL('sw.js',dist),'utf8');
const handlers={};
const cached=new Response('offline app shell');
vm.runInNewContext(worker,{
 self:{location:{origin:'https://bioflow.test'},addEventListener:(name,handler)=>handlers[name]=handler},
 URL,Response,caches:{match:async()=>cached},fetch:async()=>{throw Error('offline');}
});
test('installable app metadata includes real 192 and 512 pixel icons',async()=>{
 assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'/');
 for(const size of [192,512]){
  const bytes=await readFile(new URL(`icon-${size}.png`,dist));
  assert.equal(bytes.readUInt32BE(16),size);assert.equal(bytes.readUInt32BE(20),size);
 }
});
test('service worker ignores APIs, PDFs, cross-origin requests and mutations',()=>{
 for(const [url,method] of [['https://bioflow.test/api/demo/overview','GET'],['https://bioflow.test/api/patients/demo-walter-white/reports','GET'],['https://bioflow.test/private.pdf','GET'],['https://other.test/','GET'],['https://bioflow.test/','POST'],['https://bioflow.test/?token=private','GET']]){
  handlers.fetch({request:{url,method,mode:'navigate'},respondWith:()=>assert.fail('private resource intercepted')});
 }
});
test('offline navigation serves only the public app shell',async()=>{
 let result;
 handlers.fetch({request:{url:'https://bioflow.test/',method:'GET',mode:'navigate'},respondWith:value=>result=value});
 assert.equal(await (await result).text(),'offline app shell');
});
