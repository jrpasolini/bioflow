import {useEffect,useRef,useState,type FormEvent} from 'react';
import {Download,FilePlus2,LoaderCircle,ShieldCheck} from 'lucide-react';
import type {LabReport} from '../../../packages/fixtures/src/synthetic';

type Reading={code:string;name:string;value:number;unit:string;sourcePage?:number;referenceLow?:number;referenceHigh?:number};
type Preview={sha256:string;filename:string;model:string;proof:string;proofExpires:number;report:{
 collectedAt:string;laboratory:string;results:Reading[];
}};
type Imported={sha256:string;report:LabReport};
type Stage='idle'|'uploading'|'review'|'saving'|'saved';
const STORE='bioflow-ephemeral-demo-session';

function apiOrigin():string|null{
 const env=import.meta.env.VITE_API_BASE_URL?.trim();
 if(!env)return null;
 try{
  const url=new URL(env);
  if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))return null;
  if(url.username||url.password||url.hash||url.search||url.pathname!=='/')return null;
  return url.origin;
 }catch{return null;}
}
function errorMessage(code:string,p:boolean):string {
 const translations:Record<string,[string,string]>={
  gemma_demo_disabled:['A leitura com Gemma ainda não foi habilitada no servidor.','Gemma parsing is not enabled on the server yet.'],
  sample_not_allowed:['Use somente um dos três PDFs fictícios oferecidos no artigo.','Only the three fictional PDFs linked in the article are accepted.'],
  pdf_conversion_failed:['Não foi possível ler o PDF.','The PDF could not be converted.'],
  gemma_extraction_failed:['A Gemma não conseguiu interpretar este documento. Tente novamente.','Gemma could not read this document. Please retry.'],
  rate_limited:['Limite temporário de tentativas. Aguarde um minuto.','Temporary request limit. Please wait one minute.'],
  demo_persistence_failed:['Não foi possível gravar a simulação no MongoDB.','Could not save this simulation in MongoDB.'],
  demo_session_required:['Sua sessão expirou. Recarregue a página para recomeçar.','Your session expired. Refresh the page to start again.']
 };
 return translations[code]?.[p?0:1]||(p?'Não foi possível concluir a operação.':'The operation could not be completed.');
}
async function readResponse(response:Response){
 const json:unknown=await response.json();
 if(!response.ok){
  const code=!!json&&typeof json==='object'&&'error' in json?String(json.error):'error';
  throw Error(code);
 }
 return json;
}
export function GemmaImport({portuguese,onReportsChanged}:{portuguese:boolean;onReportsChanged:(reports:LabReport[])=>void}){
 const base=apiOrigin();
 const [stage,setStage]=useState<Stage>('idle');
 const [file,setFile]=useState<File|null>(null);
 const [draft,setDraft]=useState<Preview|null>(null);
 const [saved,setSaved]=useState<Imported[]>([]);
 const [error,setError]=useState('');
 const session=useRef<string|null>(null);
 const p=portuguese;
 const fetching=stage==='uploading'||stage==='saving';

 async function sessionToken():Promise<string>{
  if(session.current)return session.current;
  const current=sessionStorage.getItem(STORE);
  if(current){session.current=current;return current;}
  if(!base)throw Error('gemma_demo_disabled');
  const response=await fetch(base+'/api/demo/session',{method:'POST',credentials:'omit',redirect:'error'});
  const data=await readResponse(response) as {token:string};
  if(typeof data.token!=='string')throw Error('invalid_session');
  session.current=data.token;sessionStorage.setItem(STORE,data.token);
  return data.token;
 }
 async function loadHistory(token:string){
  if(!base)return;
  const response=await fetch(base+'/api/demo/imports',{credentials:'omit',redirect:'error',
   headers:{Authorization:'Bearer '+token}});
  const data=await readResponse(response) as {imports:Imported[]};
  const imports=Array.isArray(data.imports)?data.imports.filter(x=>x&&x.report&&Array.isArray(x.report.results)):[];
  setSaved(imports);
  onReportsChanged(imports.map(x=>x.report));
 }
 useEffect(()=>{
  if(!base)return;
  const token=sessionStorage.getItem(STORE);
  if(token){session.current=token;loadHistory(token).catch(()=>{sessionStorage.removeItem(STORE);session.current=null;});}
  // Load once for this mounted component; onReportsChanged is the stable state setter from App.
 },[base]);

 async function analyze(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(!file||!base)return;
  setError('');setStage('uploading');setDraft(null);
  try{
   if(file.size>1024*1024||file.size<100||!file.name.toLowerCase().endsWith('.pdf'))throw Error('invalid_pdf');
   const token=await sessionToken();
   const form=new FormData();form.set('file',file);
   const response=await fetch(base+'/api/demo/extract',{method:'POST',credentials:'omit',redirect:'error',
    headers:{Authorization:'Bearer '+token},body:form});
   const data=await readResponse(response) as Preview;
   if(!data.report||!Array.isArray(data.report.results)||typeof data.proof!=='string')throw Error('invalid_model_json');
   setDraft(data);setStage('review');
  }catch(e){setStage('idle');setError(errorMessage(e instanceof Error?e.message:'error',p));}
 }
 async function save(){
  if(!base||!draft||!session.current)return;
  setError('');setStage('saving');
  try{
   const response=await fetch(base+'/api/demo/commit',{method:'POST',credentials:'omit',redirect:'error',
    headers:{Authorization:'Bearer '+session.current,'Content-Type':'application/json'},
    body:JSON.stringify({sha256:draft.sha256,proof:draft.proof,proofExpires:draft.proofExpires,report:draft.report,reviewed:true})});
   await readResponse(response);
   await loadHistory(session.current);
   setDraft(null);setFile(null);setStage('saved');
  }catch(e){setStage('review');setError(errorMessage(e instanceof Error?e.message:'error',p));}
 }
 return <section className="panel gemma-import" aria-labelledby="gemma-title">
  <div className="gemma-import-heading"><FilePlus2 size={24} aria-hidden="true"/>
   <div><span className="eyebrow">{p?'ENVIO DE PDF':'PDF UPLOAD'}</span>
    <h2 id="gemma-title">{p?'Analisar PDF com Google Gemma':'Analyze PDF with Google Gemma'}</h2></div></div>
  <p>{base?(p?'Escolha um dos três PDFs fictícios para testar. Confira os números extraídos pela Gemma antes de adicionar o laudo ao histórico desta sessão.':'Choose one of the three fictional PDFs to test. Review the readings extracted by Gemma before adding the report to the temporary history.'):(p?'Conheça os exemplos baixando os três PDFs fictícios abaixo.':'Explore the examples by downloading the three fictional PDFs below.')}</p>
  <p className="gemma-privacy"><ShieldCheck size={16}/>{p?'Apenas arquivos de teste previamente aprovados. Nenhum exame pessoal ou documento real.':'Approved test files only. Do not upload personal or actual medical documents.'}</p>
  <a className="demo-samples-link" href={import.meta.env.BASE_URL+'demo/bioflow-3-exames.zip'} download><Download size={14} aria-hidden="true"/>{p?'Baixar os 3 PDFs fictícios de teste (ZIP)':'Download 3 fictional test PDFs (ZIP)'}</a>
  <form onSubmit={analyze} className="gemma-import-form">
   <label htmlFor="bioflow-new-pdf">{p?'Escolher PDF fictício':'Choose fictional PDF'}</label>
   <input id="bioflow-new-pdf" type="file" accept=".pdf,application/pdf" required disabled={fetching||!base}
    onChange={e=>{setFile(e.target.files?.[0]??null);setDraft(null);setError('');setStage('idle');}}/>
   <button className="open-report" type="submit" disabled={!file||fetching||!base}>
    {stage==='uploading'?<><LoaderCircle size={17}/>{p?'Interpretando...':'Extracting...'}</>:(p?'Analisar com Google Gemma':'Analyze with Google Gemma')}
   </button>
  </form>
  {!base&&<p role="status">{p?'A análise com Google Gemma será habilitada na próxima etapa.':'Analysis with Google Gemma will be enabled in the next stage.'}</p>}
  {error&&<p role="alert" className="gemma-error">{error}</p>}
  {draft&&<div className="gemma-review" aria-live="polite">
   <h3>{p?'Confira antes de salvar':'Review before saving'}</h3>
   <p><strong>{draft.report.collectedAt}</strong> · {draft.report.laboratory} · {draft.report.results.length} {p?'resultados encontrados':'readings found'}</p>
   <details open><summary>{p?'Resultados extraídos pela IA':'AI-extracted results'}</summary>
    <div className="gemma-results">{draft.report.results.map((a,i)=><div className="result-line" key={a.code+'-'+i}>
     <span>{a.name}{a.sourcePage?' (p. '+a.sourcePage+')':''}</span>
     <strong>{a.value} {a.unit}</strong>
    </div>)}</div>
   </details>
   <p className="gemma-privacy">{p?'Confira os valores com o PDF original. Esta é uma experiência fictícia, não uma interpretação médica.':'Compare the values with the source PDF. This is a fictional demo, not medical interpretation.'}</p>
   <div className="gemma-buttons">
    <button type="button" className="open-report" onClick={save} disabled={fetching}>{stage==='saving'?(p?'Salvando...':'Saving...'):(p?'Conferi · salvar no MongoDB':'Reviewed · save to MongoDB')}</button>
    <button type="button" className="secondary" onClick={()=>{setDraft(null);setStage('idle');}} disabled={fetching}>{p?'Descartar':'Discard'}</button>
   </div>
  </div>}
  {stage==='saved'&&<p role="status" className="gemma-saved">{p?'Exame salvo! Seus gráficos e a lista foram atualizados nesta sessão.':'Saved! The charts and report list were updated for your session.'}</p>}
  {saved.length>0&&<p className="gemma-session-total">{saved.length}/3 {p?'exames importados nesta sessão temporária. Os 26 laudos originais permanecem intactos.':'reports imported into this temporary session. All 26 original reports stay unchanged.'}</p>}
 </section>;
}


