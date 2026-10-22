/** Synthetic production smoke test. Tokens/proofs stay in process memory only.
 * node scripts/verify-demo-production.mjs SAMPLE_DIRECTORY SAFE_REPORT.json [COMMA_SEPARATED_SAMPLE_FILENAMES]
 * Explicitly commits reviewed fictional readings to a disposable one-hour session.
 */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';

const base='https://bioflow-api.antonio-pasolini.workers.dev';
const [directory,output,onlySample]=process.argv.slice(2);
if(!directory||!output)throw Error('Provide a sample directory and a safe JSON report path');
const audit=JSON.parse(await readFile(new URL('../docs/PDF_PUBLICATION_AUDIT.json',import.meta.url),'utf8'));
const requested=onlySample?new Set(onlySample.split(',')):null;
const samples=requested?audit.heldout.filter(sample=>requested.has(sample.file)):audit.heldout;
if(!samples.length||(requested&&requested.size!==samples.length))throw Error('Unknown sample; only the three audited PDFs are accepted');
const report={checkedAt:new Date().toISOString(),origin:base,checks:[],samples:[]};
const check=(name,passed,details={})=>{report.checks.push({name,passed,...details});console.log(JSON.stringify(report.checks.at(-1)));};
async function call(path,{token,headers,...options}={}){
 const response=await fetch(base+path,{...options,redirect:'error',signal:AbortSignal.timeout(210000),
  headers:{Origin:'https://jrpasolini.tech',...headers,...(token?{Authorization:'Bearer '+token}:{})}});
 return {status:response.status,body:await response.json(),cors:response.headers.get('Access-Control-Allow-Origin'),cache:response.headers.get('Cache-Control')};
}
try{
 const health=await call('/api/health');report.health=health.body;
 const overview=await call('/api/demo/overview');
 report.overview={status:overview.status,source:overview.body.source,reports:overview.body.reports?.length,
  readings:overview.body.reports?.flatMap(r=>r.results).length};
 check('atlas-overview',overview.status===200&&overview.body.source==='mongodb-atlas-synthetic',report.overview);
 check('private-routes-disabled',health.body.pdfEndpointsEnabled===false);
 const denied=await call('/api/patients/demo-walter-white/reports',{token:'110526'});
 check('demo-code-cannot-open-private-pdfs',denied.status===503&&denied.body.error==='pdf_endpoints_disabled');
 const unauthorized=await call('/api/demo/imports');check('history-requires-session',unauthorized.status===401);
 const a=await call('/api/demo/session',{method:'POST'}),b=await call('/api/demo/session',{method:'POST'});
 assert.equal(a.status,200);assert.equal(b.status,200);
 check('independent-one-hour-sessions',a.body.token!==b.body.token&&
  Math.abs(Date.parse(a.body.expiresAt)-Date.now()-3600000)<15000);
 const altered=a.body.token.slice(0,-1)+(a.body.token.endsWith('0')?'1':'0');
 check('tampered-session-denied',(await call('/api/demo/imports',{token:altered})).status===401);
 const initial=await call('/api/demo/imports',{token:a.body.token});
 check('fresh-session-empty',initial.status===200&&initial.body.imports.length===0);
 for(const sample of samples){
  const bytes=await readFile(resolve(directory,sample.file));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),sample.sha256);
  const form=new FormData();form.set('file',new Blob([bytes],{type:'application/pdf'}),sample.file);
  const started=Date.now();
  const preview=await call('/api/demo/extract',{method:'POST',token:a.body.token,body:form});
  const result={sample:sample.file,extractStatus:preview.status,seconds:Math.round((Date.now()-started)/1000)};
  if(preview.status!==200){result.error=preview.body.error;report.samples.push(result);check('extract-'+sample.file,false,result);continue;}
  result.readings=preview.body.report.results.length;
  const payload={sha256:preview.body.sha256,proof:preview.body.proof,proofExpires:preview.body.proofExpires,
   report:preview.body.report,reviewed:true};
  const before=await call('/api/demo/imports',{token:a.body.token});
  check('no-write-before-confirmation-'+sample.file,before.status===200&&!before.body.imports.some(x=>x.sha256===sample.sha256));
  const replay=await call('/api/demo/commit',{method:'POST',token:b.body.token,headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  check('cross-session-proof-denied-'+sample.file,replay.status===403&&replay.body.error==='invalid_proof');
  const saved=await call('/api/demo/commit',{method:'POST',token:a.body.token,headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  result.commitStatus=saved.status;if(saved.status!==201)result.commitError=saved.body.error;
  report.samples.push(result);check('extract-and-commit-'+sample.file,saved.status===201,result);
  const mine=await call('/api/demo/imports',{token:a.body.token});
  const theirs=await call('/api/demo/imports?sessionId='+a.body.token.split('.')[0],{token:b.body.token});
  check('session-isolation-'+sample.file,mine.status===200&&theirs.status===200&&theirs.body.imports.length===0&&
   (saved.status!==201||mine.body.imports.some(x=>x.sha256===sample.sha256)));
 }
}catch{
 // Never print exceptions, response bodies, headers, tokens or model output.
 check('verification-completed',false,{error:'verification_interrupted'});
}finally{
 report.finishedAt=new Date().toISOString();report.passed=report.checks.every(x=>x.passed);
 await writeFile(output,JSON.stringify(report,null,2)+'\n');
 if(!report.passed)process.exitCode=1;
}
