import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL,fileURLToPath} from 'node:url';
export async function testModule(entry,name){
 const outfile=fileURLToPath(new URL('../.wrangler/tests/'+name+'.mjs',import.meta.url));
 await mkdir(new URL('../.wrangler/tests/',import.meta.url),{recursive:true});
 await build({entryPoints:[fileURLToPath(entry)],outfile,bundle:true,platform:'node',format:'esm',packages:'external',logLevel:'silent'});
 return import(pathToFileURL(outfile).href);
}
