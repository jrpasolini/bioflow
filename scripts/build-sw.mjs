import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dist=new URL('../apps/web/dist/',import.meta.url);
const assets=(await readdir(new URL('assets/',dist))).map(file=>'/assets/'+file);
const shell=['/','/manifest.webmanifest','/icon-192.png','/icon-512.png',...assets];
const version=createHash('sha256').update(await readFile(new URL('index.html',dist))).digest('hex').slice(0,16);
// Only explicitly built public app-shell resources are cached. No APIs, PDFs or user files.
await writeFile(new URL('sw.js',dist),`
const CACHE='bioflow-shell-${version}';
const SHELL=${JSON.stringify(shell)};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('bioflow-shell-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||url.search||!SHELL.includes(url.pathname))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).catch(()=>caches.match('/').then(response=>response||Response.error())));
 }else{
  event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request)));
 }
});
`);
