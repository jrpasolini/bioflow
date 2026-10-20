import {Auth0Provider,useAuth0} from '@auth0/auth0-react';
import type {ReactNode} from 'react';
import App from './App';
import {parseAuth0Config} from './auth0-config';

export type Auth0Session={
 authenticated:boolean;
 loading:boolean;
 email:string|null;
 error:string|null;
 login:(intent:'login'|'signup')=>void;
 logout:()=>void;
};

const callbackUrl=window.location.origin+import.meta.env.BASE_URL;
const config=parseAuth0Config(import.meta.env);

/** The Auth0 session is never confused with a session in the fictional public demo. */
function Auth0ConnectedApp(){
 const {isAuthenticated,isLoading,user,error,loginWithRedirect,logout}=useAuth0();
 const session:Auth0Session={
  authenticated:isAuthenticated,
  loading:isLoading,
  email:typeof user?.email==='string'?user.email:null,
  error:error?.message||null,
  login:(intent)=>{void loginWithRedirect({
   authorizationParams:intent==='signup'?{screen_hint:'signup'}:{}
  });},
  logout:()=>{void logout({logoutParams:{returnTo:callbackUrl}});}
 };
 return <App auth0={session}/>;
}
export function BioFlowAuth0Root():ReactNode{
 if(!config)return <App/>;
 return <Auth0Provider
  domain={config.domain}
  clientId={config.clientId}
  authorizationParams={{
   redirect_uri:callbackUrl,
   audience:config.audience,
   scope:'openid profile email'
  }}
  onRedirectCallback={()=>{window.history.replaceState({},'',callbackUrl);}}
 ><Auth0ConnectedApp/></Auth0Provider>;
}
