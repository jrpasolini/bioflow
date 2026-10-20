import {useState,type FormEvent} from 'react';
import {ArrowRight,LockKeyhole,ShieldCheck} from 'lucide-react';
import {DEMO_ACCESS_CODE,isDemoAccessCode} from './demo-access';

/** One public entry form. Never grants an Auth0 session or backend permissions. */
export function DemoEntry({portuguese,onExplore}:{portuguese:boolean;onExplore:()=>void}){
 const [code,setCode]=useState(DEMO_ACCESS_CODE);
 const [invalid,setInvalid]=useState(false);
 const p=portuguese;
 const submit=(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  if(!isDemoAccessCode(code)){setInvalid(true);return;}
  setCode('');setInvalid(false);onExplore();
 };
 return <section className="demo-entry" aria-labelledby="entry-title">
  <span className="eyebrow">{p?'BEM-VINDO AO BIOFLOW':'WELCOME TO BIOFLOW'}</span>
  <h1 id="entry-title">{p?'Sua história de saúde, com mais clareza.':'A clearer picture of your health history.'}</h1>
  <p className="entry-intro">{p?'Acompanhe resultados ao longo do tempo e explore a demonstração com exames inteiramente fictícios.':'Follow results over time and explore the demo with entirely fictional reports.'}</p>
  <form className="entry-login" onSubmit={submit}>
   <div className="entry-login-heading"><LockKeyhole size={27} aria-hidden="true"/>
    <div><span className="eyebrow">{p?'ENTRADA ÚNICA':'ONE ENTRY SCREEN'}</span><h2>{p?'Código de acesso':'Access code'}</h2></div>
   </div>
   <p>{p?'Use o código demonstrativo abaixo para experimentar os recursos com dados fictícios. Sem cadastro.':'Use the demo code below to explore the features with fictional data. No registration needed.'}</p>
   <label className="demo-code-label" htmlFor="bioflow-entry-code">{p?'Código de seis dígitos':'Six-digit code'}</label>
   <input id="bioflow-entry-code" type="text" inputMode="numeric" autoComplete="off" spellCheck={false}
    pattern="[0-9]{6}" maxLength={6} required value={code}
    onChange={event=>{setCode(event.target.value.replace(/[^0-9]/g,'').slice(0,6));setInvalid(false);}}
    aria-invalid={invalid} aria-describedby={invalid?'bioflow-entry-error':'bioflow-demo-notice'}/>
   {invalid&&<p id="bioflow-entry-error" role="alert">{p?'Código inválido. Use o código de demonstração indicado abaixo.':'Invalid code. Use the demo code shown below.'}</p>}
   <button type="submit" className="open-report">{p?'Entrar na demonstração':'Enter demo'} <ArrowRight size={17} aria-hidden="true"/></button>
   <p className="entry-note" id="bioflow-demo-notice">
    {p?'Código público da demonstração:':'Public demo code:'} <strong className="demo-code-value">{DEMO_ACCESS_CODE}</strong>.
    {' '}{p?'Ele dá acesso somente à demonstração fictícia. Não é 2FA, código de recuperação nem autenticação Auth0.':'It only opens the fictional demo. It is not 2FA, a recovery code or Auth0 authentication.'}
   </p>
  </form>
  <div className="entry-auth0-note"><ShieldCheck size={20} aria-hidden="true"/><p>{p?'Acesso exclusivo aos laudos fictícios. O código não permite consultar arquivos privados.':'Fictional reports only. This code cannot access private files.'}</p></div>
 </section>;
}
