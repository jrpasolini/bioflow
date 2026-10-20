/** Public SPA metadata only. Never place tenant secrets or TOTP seeds in Vite variables. */
export type Auth0ClientConfig={domain:string;clientId:string;audience:string};
export function parseAuth0Config(env:Record<string,string|undefined>):Auth0ClientConfig|null{
 const domain=(env.VITE_AUTH0_DOMAIN||'').trim().replace(/^https:\/\//i,'').replace(/\/$/,'');
 const clientId=(env.VITE_AUTH0_CLIENT_ID||'').trim();
 const audience=(env.VITE_AUTH0_AUDIENCE||'').trim();
 // Requiring all three fields avoids issuing an opaque token instead of the intended API JWT.
 if(!domain||!clientId||!audience)return null;
 if(!/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/i.test(domain)||domain.includes('..'))return null;
 if(!audience.startsWith('https://')&&!audience.startsWith('http://')&&!/^[a-z0-9._:-]+$/i.test(audience))return null;
 return {domain,clientId,audience};
}
