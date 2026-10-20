import {useState,type FormEvent} from 'react';
import {ArrowRight,LockKeyhole,ShieldCheck} from 'lucide-react';
import {DEMO_ACCESS_CODE,isDemoAccessCode} from './demo-access';

/** One public entry form. Never grants an Auth0 session or backend permissions. */
export function DemoEntry({portuguese,onExplore}:{portuguese:boolean;onExplore:()=>void}){
 const [code,setCode]=useState('');
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
   <p>{p?'Digite o código de seis dígitos para explorar os dados sintéticos. Contas privadas utilizarão Auth0 com aplicativo autenticador quando a integração estiver disponível.':'Enter the six-digit code to explore synthetic data. Private accounts will use Auth0 with an authenticator app once that integration is available.'}</p>
   <label className="demo-code-label" htmlFor="bioflow-entry-code">{p?'Código de seis dígitos':'Six-digit code'}</label>
   <input id="bioflow-entry-code" type="text" inputMode="numeric" autoComplete="off" spellCheck={false}
    pattern="[0-9]{6}" maxLength={6} required value={code}
    onChange={event=>{setCode(event.target.value.replace(/[^0-9]/g,'').slice(0,6));setInvalid(false);}}
    aria-invalid={invalid} aria-describedby={invalid?'bioflow-entry-error':'bioflow-demo-notice'}/>
   {invalid&&<p id="bioflow-entry-error" role="alert">{p?'Código inválido. Use o código de demonstração indicado abaixo.':'Invalid code. Use the demo code shown below.'}</p>}
   <button type="submit" className="open-report">{p?'Entrar na demonstração':'Enter demo'} <ArrowRight size={17} aria-hidden="true"/></button>
   <p className="entry-note" id="bioflow-demo-notice">
    {p?'Para testar sem cadastrar um autenticador, use o código público':'To try the app without setting up an authenticator, use the public code'} <strong className="demo-code-value">{DEMO_ACCESS_CODE}</strong>.
    {' '}{p?'Ele dá acesso somente à demonstração fictícia. Não é 2FA, código de recuperação nem autenticação Auth0.':'It only opens the fictional demo. It is not 2FA, a recovery code or Auth0 authentication.'}
   </p>
  </form>
  <div className="entry-auth0-note"><ShieldCheck size={22} aria-hidden="true"/>
   <p>{p?'Contas particulares: Auth0 Universal Login com TOTP obrigatório, ainda não habilitado. Nenhum documento privado pode ser acessado com o código demonstrativo.':'Private accounts: Auth0 Universal Login with mandatory TOTP is not yet enabled. The demo code cannot access private documents.'}</p>
  </div>
 </section>;
}
