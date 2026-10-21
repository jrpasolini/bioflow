import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const subpath=process.argv[2]||'';
if(subpath && subpath!=='bioflow')throw Error('unsupported_subpath');
const base=subpath?'/bioflow/':'/';
const dist=new URL('../apps/web/dist/'+(subpath?'bioflow/':''),import.meta.url);
const assets=(await readdir(new URL('assets/',dist))).map(file=>base+'assets/'+file);
const shell=[base,base+'manifest.webmanifest',base+'icon-192.png',base+'icon-512.png',...assets];
const manifest=JSON.parse(await readFile(new URL('manifest.webmanifest',dist),'utf8'));
manifest.id=base;manifest.start_url=base;manifest.scope=base;
manifest.icons=manifest.icons.map(icon=>({...icon,src:base+icon.src.split('/').at(-1)}));
await writeFile(new URL('manifest.webmanifest',dist),JSON.stringify(manifest,null,2)+'\n');
const cachePrefix='bioflow-shell-'+(subpath?'subpath-':'root-');
const version=createHash('sha256').update(await readFile(new URL('index.html',dist))).digest('hex').slice(0,16);
// Only explicitly built public app-shell resources are cached. No APIs, PDFs or user files.
await writeFile(new URL('sw.js',dist),`
const CACHE='${cachePrefix}${version}';
const SHELL=${JSON.stringify(shell)};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('${cachePrefix}')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||url.search||!SHELL.includes(url.pathname))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).catch(()=>caches.match('${base}').then(response=>response||Response.error())));
 }else{
  event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request)));
 }
});
`);


// The provider's root is only an alias; Auth0 uses the canonical public subpath.
// A small redirect page also works when the host gives static files priority
// over dashboard redirect rules.
if(subpath){
 await writeFile(new URL('../apps/web/dist/index.html',import.meta.url),`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>BioFlow</title><meta http-equiv="refresh" content="0;url=https://jrpasolini.tech/bioflow/"><link rel="canonical" href="https://jrpasolini.tech/bioflow/"></head><body><p><a href="https://jrpasolini.tech/bioflow/">Open BioFlow</a></p></body></html>
`);
}

