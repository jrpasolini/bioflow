import {useEffect,useRef,useState} from 'react';
import {Download,Upload,X} from 'lucide-react';
type InstallEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export function AppActions({portuguese}:{portuguese:boolean}){
 const [install,setInstall]=useState<InstallEvent|null>(null);
 const [installed,setInstalled]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  setInstalled(window.matchMedia('(display-mode: standalone)').matches);
  const ready=(event:Event)=>{event.preventDefault();setInstall(event as InstallEvent);};
  const done=()=>{setInstalled(true);setInstall(null);};
  window.addEventListener('beforeinstallprompt',ready);window.addEventListener('appinstalled',done);
  return ()=>{window.removeEventListener('beforeinstallprompt',ready);window.removeEventListener('appinstalled',done);};
 },[]);
 const showInstall=()=>dialog.current?.showModal();
 const goToImport=()=>{
  document.getElementById('gemma-title')?.scrollIntoView({behavior:'smooth',block:'start'});
  document.getElementById('bioflow-new-pdf')?.focus({preventScroll:true});
 };
 return <>
  <div className="app-actions">
   {!installed&&<button className="secondary" onClick={async()=>{
    if(!install){showInstall();return;}
    try{await install.prompt();await install.userChoice;}finally{setInstall(null);}
   }}><Download size={16}/>{portuguese?'Instalar':'Install'}</button>}
   <button className="open-report" onClick={goToImport}><Upload size={16}/>{portuguese?'Testar PDF':'Try PDF'}</button>
  </div>
  <dialog ref={dialog} className="action-dialog" aria-labelledby="action-title">
   <button className="close-dialog" onClick={()=>dialog.current?.close()} aria-label={portuguese?'Fechar':'Close'}><X size={20}/></button>
   <h2 id="action-title">{portuguese?'Instalar BioFlow':'Install BioFlow'}</h2>
   <p>{portuguese?'No menu do navegador, escolha “Instalar aplicativo” ou “Adicionar à tela de início”. No iPhone, use Compartilhar → Adicionar à Tela de Início.':'In your browser menu, choose “Install app” or “Add to home screen”. On iPhone, use Share → Add to Home Screen.'}</p>
   <button className="open-report" onClick={()=>dialog.current?.close()}>{portuguese?'Entendi':'Got it'}</button>
  </dialog>
 </>;
}
