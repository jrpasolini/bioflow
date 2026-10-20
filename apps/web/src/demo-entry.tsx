import {useState,type FormEvent} from 'react';
import {ArrowRight,LockKeyhole,ShieldCheck,ScanQrCode,LogIn,LifeBuoy} from 'lucide-react';
import {DEMO_ACCESS_CODE,isDemoAccessCode} from './demo-access';
import type {Auth0Session} from './auth0-session';

/** Public demo code never becomes an Auth0 credential or grants API permissions. */
export function DemoEntry({portuguese,onExplore,auth0}:{
 portuguese:boolean;
 onExplore:()=>void;
 auth0?:Auth0Session;
}){
 const [code,setCode]=useState(DEMO_ACCESS_CODE);
 const [invalid,setInvalid]=useState(false);
 const [email,setEmail]=useState('walter.white@los-pollos.example');
 const [recoverySimulated,setRecoverySimulated]=useState(false);
 const p=portuguese;
 const submit=(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  if(!isDemoAccessCode(code)){setInvalid(true);return;}
  setCode('');setInvalid(false);onExplore();
 };
 return <section className="demo-entry" aria-labelledby="entry-title">
  <span className="eyebrow">{p?'BEM-VINDO AO BIOFLOW':'WELCOME TO BIOFLOW'}</span>
  <h1 id="entry-title">{p?'Digite seu código de acesso':'Enter your access code'}</h1>
  <p className="entry-intro">{p?'Escolha como deseja explorar o BioFlow: com autenticação real Auth0 e aplicativo autenticador, ou diretamente pelos laudos inteiramente fictícios.':'Choose how to explore BioFlow: real Auth0 sign-in with an authenticator app, or immediate access to entirely fictional reports.'}</p>
  <form className="entry-login" onSubmit={submit}>
   <div className="entry-login-heading"><LockKeyhole size={27} aria-hidden="true"/>
    <div><span className="eyebrow">{p?'ACESSO DEMONSTRATIVO':'DEMO ACCESS'}</span><h2>{p?'Código de seis dígitos':'Six-digit code'}</h2></div>
   </div>
   <label className="demo-code-label" htmlFor="bioflow-entry-code">{p?'Digite o código público':'Enter the public code'}</label>
   <input id="bioflow-entry-code" type="text" inputMode="numeric" autoComplete="off" spellCheck={false}
    pattern="[0-9]{6}" maxLength={6} required value={code}
    onChange={event=>{setCode(event.target.value.replace(/[^0-9]/g,'').slice(0,6));setInvalid(false);}}
    aria-invalid={invalid} aria-describedby={invalid?'bioflow-entry-error':'bioflow-demo-notice'}/>
   {invalid&&<p id="bioflow-entry-error" role="alert">{p?'Código inválido. Para usar seu aplicativo autenticador, escolha Entrar com Auth0.':'Invalid code. To use your authenticator app, choose Sign in with Auth0.'}</p>}
   <button type="submit" className="open-report">{p?'Entrar na demonstração':'Enter demo'} <ArrowRight size={17} aria-hidden="true"/></button>
   <p className="entry-note" id="bioflow-demo-notice">
    {p?'Sem tempo para cadastrar? Use':'No time to register? Use'} <strong className="demo-code-value">{DEMO_ACCESS_CODE}</strong>.
    {' '}{p?'Esse atalho libera apenas dados fictícios, sem passar pelo Auth0.':'This shortcut opens fictional data only, without authenticating via Auth0.'}
   </p>
  </form>
  <section className="auth0-entry-card" aria-label={p?'Autenticação Auth0':'Auth0 authentication'}>
   <div className="auth0-entry-title"><ShieldCheck size={23} aria-hidden="true"/><div><h2>{p?'Seu autenticador, de verdade':'Your real authenticator'}</h2><p>{p?'Identifique sua conta no Auth0 e confirme o código temporário do celular. No primeiro acesso, configure o app escaneando o QR Code apresentado pelo Auth0.':'Identify your account with Auth0, then enter the temporary code from your phone. On first access, scan the QR code shown by Auth0 to enroll your app.'}</p></div></div>
   <div className="auth0-entry-actions">
    <button type="button" className="open-report" disabled={!auth0||auth0.loading} onClick={()=>auth0?.login('login')}><LogIn size={17} aria-hidden="true"/>{p?'Entrar com Auth0':'Sign in with Auth0'}</button>
    <button type="button" className="secondary" disabled={!auth0||auth0.loading} onClick={()=>auth0?.login('signup')}><ScanQrCode size={17} aria-hidden="true"/>{p?'Configurar autenticador':'Set up authenticator'}</button>
   </div>
   {auth0?.error&&<p className="auth0-entry-error" role="alert">{p?'Não foi possível autenticar: ':'Authentication failed: '}{auth0.error}</p>}
   {!auth0&&<p className="auth0-entry-unconfigured" role="status">{p?'O acesso Auth0 exige a configuração do tenant neste ambiente. O código de demonstração continua disponível.':'Auth0 access requires tenant configuration in this environment. The demo code remains available.'}</p>}
   {auth0?.loading&&<p role="status">{p?'Verificando sessão Auth0…':'Checking Auth0 session…'}</p>}
   <p className="auth0-powered">{auth0?'Powered by Auth0':'Auth0'} <span>· {p?'Autenticação de contas individuais':'Individual account authentication'}</span></p>
  </section>
  <details className="entry-recovery">
   <summary><LifeBuoy size={17} aria-hidden="true"/>{p?'Recuperar acesso':'Recover access'}</summary>
   <p>{p?'Para uma conta real, clique em Entrar com Auth0 e use a recuperação de conta no próprio Auth0. A experiência abaixo é fictícia e não envia e-mail.':'For a real account, select Sign in with Auth0 and use account recovery there. The example below is fictional and sends no email.'}</p>
   <form onSubmit={e=>{e.preventDefault();setRecoverySimulated(true);}}>
    <label htmlFor="bioflow-recovery-email">{p?'E-mail fictício de Walter White':'Walter White fictional email'}</label>
    <input id="bioflow-recovery-email" type="email" value={email} onChange={e=>{setEmail(e.target.value);setRecoverySimulated(false);}} required/>
    <button type="submit" className="secondary">{p?'Simular recuperação':'Simulate recovery'}</button>
   </form>
   {recoverySimulated&&<p role="status">{p?'Simulação concluída: nenhum e-mail foi enviado. Contas reais usam a recuperação segura do Auth0.':'Simulation complete: no email was sent. Real accounts use Auth0 recovery.'}</p>}
  </details>
 </section>;
