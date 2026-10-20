import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const dist=new URL('../apps/web/dist/bioflow/',import.meta.url);
const html=await readFile(new URL('index.html',dist),'utf8');
const manifest=JSON.parse(await readFile(new URL('manifest.webmanifest',dist),'utf8'));
const worker=await readFile(new URL('sw.js',dist),'utf8');
const handlers={};
const removed=[];
vm.runInNewContext(worker,{
 self:{location:{origin:'https://jrpasolini.tech'},addEventListener:(name,handler)=>handlers[name]=handler,clients:{claim:async()=>{}}},
 URL,Response,fetch:async()=>new Response('BioFlow'),
 caches:{keys:async()=>['pocket-oracle-v1','bioflow-shell-root-old','bioflow-shell-subpath-old'],delete:async key=>removed.push(key)}
});
test('all entry assets and installation URLs stay under /bioflow/',()=>{
 const urls=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match=>match[1]);
 assert.ok(urls.length>=4);
 assert.ok(urls.every(url=>url.startsWith('/bioflow/')));
 assert.equal(manifest.id,'/bioflow/');assert.equal(manifest.scope,'/bioflow/');assert.equal(manifest.start_url,'/bioflow/');
 assert.ok(manifest.icons.every(icon=>icon.src.startsWith('/bioflow/')));
});
test('subpath service worker never intercepts Pocket Oracle or API requests',()=>{
 for(const path of ['/','/index.html','/sw.js','/assets/oracle.js','/api/interpret','/bioflow/api/demo/overview','/bioflow/private.pdf']){
  handlers.fetch({request:{url:'https://jrpasolini.tech'+path,method:'GET',mode:'navigate'},respondWith:()=>assert.fail('unrelated resource intercepted: '+path)});
 }
 let served=false;
 handlers.fetch({request:{url:'https://jrpasolini.tech/bioflow/',method:'GET',mode:'navigate'},respondWith:()=>served=true});
 assert.equal(served,true);
});
test('activation deletes only obsolete caches for the BioFlow subpath',async()=>{
 await new Promise((resolve,reject)=>handlers.activate({waitUntil:promise=>promise.then(resolve,reject)}));
 assert.deepEqual(removed,['bioflow-shell-subpath-old']);
});
