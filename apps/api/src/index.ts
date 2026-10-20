import {createRemoteJWKSet,jwtVerify} from 'jose';
import {demoPatient} from '../../../packages/fixtures/src/synthetic';
import {loadDemoFromAtlas,syntheticFallback} from './atlas';

interface Env {
  REPORTS_BUCKET?: R2Bucket;
  AUTH0_ISSUER_BASE_URL?: string;
  AUTH0_AUDIENCE?: string;
  BIOFLOW_OWNER_SUB?: string;
  APP_ORIGIN?: string;
  MONGODB_URI?: string;
  MONGODB_DB?: string;
  ENABLE_PDF_ENDPOINTS?: string;
}
const MAX_PDF_BYTES=10*1024*1024;
const pdfId=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * This claim can only authorize private access after jwtVerify checks the Auth0
 * signature, audience and issuer. Issued by a post-login Auth0 Action *after*
 * enforcing the authenticator OTP challenge; absent/malformed claims fail closed.
 */
export const BIOFLOW_MFA_CLAIM='https://jrpasolini.tech/bioflow/mfa';
export function hasVerifiedMfa(payload:Record<string,unknown>):boolean {
 return payload[BIOFLOW_MFA_CLAIM]===true;
}


function responseHeaders(req:Request,env:Env):Headers{
 const h=new Headers({'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin'});
 const origin=req.headers.get('Origin');
 if(origin && env.APP_ORIGIN && origin===env.APP_ORIGIN){
  h.set('Access-Control-Allow-Origin',origin);
  h.set('Access-Control-Allow-Headers','Authorization, Content-Type');
  h.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');
 }
 return h;
}
function json(req:Request,env:Env,body:unknown,status=200):Response{
 const h=responseHeaders(req,env);h.set('Content-Type','application/json;charset=utf-8');
 return new Response(JSON.stringify(body),{status,headers:h});
}
function err(req:Request,env:Env,status:number,message:string){return json(req,env,{error:message},status);}
function safeFilename(input:string){
 return (input.split(/[\\/]/).at(-1)||'documento.pdf').replace(/[^a-zA-Z0-9_.-]/g,'_').slice(0,120);
}
function prefix(patientId:string){return 'patients/'+patientId+'/reports/';}
function key(patientId:string,id:string){return prefix(patientId)+id+'.pdf';}

/** No protected route works without verified JWT and a configured owner. */
async function verifyOwner(req:Request,env:Env):Promise<true|Response>{
 if(!env.AUTH0_ISSUER_BASE_URL||!env.AUTH0_AUDIENCE||!env.BIOFLOW_OWNER_SUB){
  return err(req,env,503,'auth_not_configured');
 }
 const header=req.headers.get('Authorization')||'';
 if(!header.startsWith('Bearer '))return err(req,env,401,'authentication_required');
 const token=header.substring(7).trim();
 if(!token)return err(req,env,401,'authentication_required');
 try{
  const issuer=env.AUTH0_ISSUER_BASE_URL.replace(/\/+$/,'')+'/';
  if(!issuer.startsWith('https://'))return err(req,env,503,'issuer_must_be_https');
  const jwks=createRemoteJWKSet(new URL(issuer+'.well-known/jwks.json'));
  const {payload}=await jwtVerify(token,jwks,{issuer,audience:env.AUTH0_AUDIENCE,algorithms:['RS256']});
  if(payload.sub!==env.BIOFLOW_OWNER_SUB)return err(req,env,403,'forbidden');
  if(!hasVerifiedMfa(payload))return err(req,env,403,'mfa_required');
  return true;
 }catch{return err(req,env,401,'invalid_or_expired_token');}
}
async function storeOriginal(req:Request,env:Env,patientId:string):Promise<Response>{
 if(!env.REPORTS_BUCKET)return err(req,env,503,'private_storage_not_configured');
 if(!(req.headers.get('Content-Type')||'').toLowerCase().startsWith('multipart/form-data')){
  return err(req,env,415,'multipart_required');
 }
 const length=Number(req.headers.get('Content-Length')||'0');
 if(length>MAX_PDF_BYTES+65536)return err(req,env,413,'document_too_large');
 let form:FormData;
 try{form=await req.formData();}catch{return err(req,env,400,'invalid_upload');}
 const file=form.get('file');
 if(!(file instanceof File)||!file.name.toLowerCase().endsWith('.pdf')||file.size===0||file.size>MAX_PDF_BYTES){
  return err(req,env,400,'invalid_pdf');
 }
 const bytes=await file.arrayBuffer();
 if(new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-')return err(req,env,415,'invalid_pdf_signature');
 const digest=await crypto.subtle.digest('SHA-256',bytes);
 const hash=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
 const id=crypto.randomUUID(),filename=safeFilename(file.name);
 await env.REPORTS_BUCKET.put(key(patientId,id),bytes,{
  httpMetadata:{contentType:'application/pdf'},
  customMetadata:{filename,sha256:hash,patientId}
 });
 return json(req,env,{id,filename,bytes:file.size,sha256:hash,canonicalOriginalPreserved:true},201);
}
async function listOriginals(req:Request,env:Env,patientId:string):Promise<Response>{
 if(!env.REPORTS_BUCKET)return err(req,env,503,'private_storage_not_configured');
 const results:Array<{id:string;filename:string;size:number;sha256:string|null;uploadedAt:string}>=[];
 let cursor:string|undefined;
 do{
  const batch=await env.REPORTS_BUCKET.list({prefix:prefix(patientId),limit:100,cursor});
  for(const o of batch.objects){
   const id=o.key.slice(prefix(patientId).length).replace(/\.pdf$/,'');
   if(pdfId.test(id)){
    const meta=await env.REPORTS_BUCKET.head(o.key);
    results.push({id,filename:meta?.customMetadata?.filename||'original.pdf',size:o.size,sha256:meta?.customMetadata?.sha256||null,uploadedAt:o.uploaded.toISOString()});
   }
  }
  cursor=batch.truncated?batch.cursor:undefined;
 }while(cursor&&results.length<1000);
 return json(req,env,{reports:results,limited:results.length>=1000});
}
async function downloadOriginal(req:Request,env:Env,patientId:string,id:string):Promise<Response>{
 if(!env.REPORTS_BUCKET)return err(req,env,503,'private_storage_not_configured');
 if(!pdfId.test(id))return err(req,env,404,'not_found');
 const doc=await env.REPORTS_BUCKET.get(key(patientId,id));
 if(!doc)return err(req,env,404,'not_found');
 const headers=responseHeaders(req,env);
 headers.set('Content-Type','application/pdf');
 headers.set('Content-Disposition','attachment; filename="'+safeFilename(doc.customMetadata?.filename||'original.pdf')+'"');
 if(doc.customMetadata?.sha256)headers.set('X-Content-SHA256',doc.customMetadata.sha256);
 return new Response(doc.body,{headers});
}
export default {
 async fetch(req:Request,env:Env):Promise<Response>{
  const path=new URL(req.url).pathname;
  if(req.method==='OPTIONS'){
   const origin=req.headers.get('Origin');
   if(origin&&(!env.APP_ORIGIN||env.APP_ORIGIN!==origin))return err(req,env,403,'origin_denied');
   return new Response(null,{status:204,headers:responseHeaders(req,env)});
  }
  if(req.method==='GET'&&path==='/api/health'){
   return json(req,env,{ok:true,service:'bioflow-api',demoOnly:true,databaseConfigured:!!env.MONGODB_URI,pdfEndpointsEnabled:env.ENABLE_PDF_ENDPOINTS==='true'&&!!env.REPORTS_BUCKET&&!!(env.AUTH0_ISSUER_BASE_URL&&env.AUTH0_AUDIENCE&&env.BIOFLOW_OWNER_SUB),storageReady:!!env.REPORTS_BUCKET,authReady:!!(env.AUTH0_ISSUER_BASE_URL&&env.AUTH0_AUDIENCE&&env.BIOFLOW_OWNER_SUB)});
  }
  if(req.method==='GET'&&path==='/api/demo/overview'){
   // Only explicitly synthetic data are exposed publicly.
   if(!env.MONGODB_URI)return json(req,env,{...syntheticFallback,source:'synthetic-fixtures'});
   try{
    const content=await loadDemoFromAtlas(env);
    return json(req,env,{...content,source:'mongodb-atlas-synthetic'});
   }catch{
    // Fail loudly instead of hiding a database outage behind stale fixture data.
    return err(req,env,503,'demo_database_unavailable');
   }
  }
  const m=path.match(/^\/api\/patients\/([^/]+)\/reports(?:\/([^/]+)\/download)?$/);
  if(!m)return err(req,env,404,'not_found');
  if(env.ENABLE_PDF_ENDPOINTS!=='true'||!env.REPORTS_BUCKET)return err(req,env,503,'pdf_endpoints_disabled');
  const patientId=m[1],reportId=m[2];
  // Prototype owner boundary: only fictional patient is addressable.
  if(patientId!==demoPatient.id)return err(req,env,404,'not_found');
  const auth=await verifyOwner(req,env);
  if(auth instanceof Response)return auth;
  if(req.method==='GET'&&reportId)return downloadOriginal(req,env,patientId,reportId);
  if(req.method==='GET'&&!reportId)return listOriginals(req,env,patientId);
  if(req.method==='POST'&&!reportId)return storeOriginal(req,env,patientId);
  return err(req,env,405,'method_not_allowed');
 }
};

