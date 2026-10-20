import {useRef,useState} from 'react';
import {ArrowRight,FlaskConical,ShieldCheck,X} from 'lucide-react';

export function DemoEntry({portuguese,onExplore}:{portuguese:boolean;onExplore:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 const field=useRef<HTMLInputElement>(null);
 const [example,setExample]=useState('');
 const [code,setCode]=useState('');
 const [error,setError]=useState(false);
 const [confirmed,setConfirmed]=useState(false);
 const p=portuguese;
 const explore=()=>{dialog.current?.close();onExplore();};
 const open=()=>{
  // Public UI exercise only: this displayed value is never an authentication credential.
  setExample(String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,'0'));
  setCode('');setError(false);setConfirmed(false);dialog.current?.showModal();
 };
 return <section className="demo-entry" aria-labelledby="entry-title">
  <span className="eyebrow">{p?'CONHEÇA O BIOFLOW':'EXPLORE BIOFLOW'}</span>
  <h1 id="entry-title">{p?'Sua história de saúde, com mais clareza.':'A clearer picture of your health history.'}</h1>
  <p className="entry-intro">{p?'Explore exames, acompanhe marcadores ao longo do tempo e encontre cada resultado em seu contexto.':'Explore reports, follow your markers over time and see every result in context.'}</p>
  <div className="entry-options">
   <article className="entry-option entry-primary">
    <FlaskConical size={28} aria-hidden="true"/>
    <h2>{p?'Explore no seu ritmo':'Take a look around'}</h2>
    <p>{p?'Entre direto no histórico fictício de Walter White. Sem cadastro, senha ou aplicativo autenticador.':'Jump into Walter White’s fictional history. No account, password or authenticator app needed.'}</p>
    <button type="button" className="open-report" onClick={onExplore}>{p?'Explorar demonstração':'Explore demo'} <ArrowRight size={17} aria-hidden="true"/></button>
   </article>
   <article className="entry-option">
    <ShieldCheck size={28} aria-hidden="true"/>
    <h2>{p?'Conheça a segunda etapa':'Try the second step'}</h2>
    <p>{p?'Experimente uma simulação da tela de código 2FA, sem instalar um aplicativo. Você usará um código de exemplo exibido na tela.':'Try a simulation of the 2FA code screen without installing an app. You’ll use an example code displayed on screen.'}</p>
    <button type="button" className="secondary" onClick={open}>{p?'Experimentar 2FA · simulação':'Try 2FA · simulation'}</button>
   </article>
  </div>
  <p className="entry-note">{p?'Ambos os caminhos abrem a mesma demonstração pública, com dados inteiramente fictícios. O acesso a contas e documentos privados ainda não está disponível.':'Both options open the same public demo with entirely fictional data. Access to private accounts and documents is not available yet.'}</p>
  <dialog ref={dialog} className="action-dialog demo-auth-dialog" aria-labelledby="simulation-title" aria-describedby="simulation-help">
   <button type="button" className="close-dialog" onClick={()=>dialog.current?.close()} aria-label={p?'Fechar simulação':'Close simulation'}><X size={20}/></button>
   <span className="eyebrow">{p?'SIMULAÇÃO · SEM AUTENTICAÇÃO REAL':'SIMULATION · NO REAL AUTHENTICATION'}</span>
   <h2 id="simulation-title">{confirmed?(p?'Você concluiu a simulação':'Simulation complete'):(p?'Experimente o código de exemplo':'Try the example code')}</h2>
   <p id="simulation-help">{p?'Este exercício só demonstra a interface. Não valida sua identidade nem libera dados privados. Não digite senhas ou códigos do seu autenticador.':'This exercise only demonstrates the interface. It does not verify your identity or unlock private data. Do not enter passwords or codes from your authenticator.'}</p>
   {confirmed?<>
    <p role="status">{p?'Código de exemplo confirmado. Você pode continuar para os dados fictícios.':'Example code confirmed. You can continue to the fictional data.'}</p>
    <button type="button" className="open-report" onClick={explore}>{p?'Explorar demonstração':'Explore demo'}</button>
   </>:<form onSubmit={event=>{event.preventDefault();if(code!==example){setError(true);field.current?.focus();return;}setError(false);setConfirmed(true);}}>
    <div className="example-code"><span>{p?'Código de exemplo':'Example code'}</span><output aria-label={p?'Código de exemplo':'Example code'}>{example}</output></div>
    <label className="demo-code-label" htmlFor="demo-code">{p?'Repita o código de exemplo':'Repeat the example code'}</label>
    <input ref={field} id="demo-code" inputMode="numeric" autoComplete="off" spellCheck={false} maxLength={6} pattern="[0-9]{6}" required value={code} onChange={event=>{setCode(event.target.value.replace(/[^0-9]/g,''));setError(false);}} aria-invalid={error} aria-describedby={error?'simulation-error':'simulation-help'}/>
    {error&&<p id="simulation-error" role="alert">{p?'O código não corresponde ao exemplo acima. Tente novamente.':'That code does not match the example above. Try again.'}</p>}
    <button type="submit" className="open-report">{p?'Confirmar código de exemplo':'Confirm example code'}</button>
    <button type="button" className="secondary" onClick={explore}>{p?'Prefiro explorar direto':'Explore without the exercise'}</button>
   </form>}
  </dialog>
 </section>;
}
