import {parseDemoOverview,type DemoOverview} from '../../../packages/fixtures/src/demo-contract.ts';
export {localDemo} from '../../../packages/fixtures/src/demo-contract.ts';
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);

export async function fetchDemoOverview(base:string,signal:AbortSignal,fetcher:typeof fetch=fetch):Promise<DemoOverview>{
 const url=new URL(base);
 if(url.username||url.password||url.search||url.hash||url.pathname!=='/'||(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname))))throw Error('invalid_api_origin');
 const response=await fetcher(new URL('/api/demo/overview',url),{signal,credentials:'omit',redirect:'error',headers:{Accept:'application/json'}});
 if(!response.ok)throw Error('demo_unavailable');
 const payload:unknown=await response.json();
 if(!record(payload)||payload.source!=='mongodb-atlas-synthetic')throw Error('atlas_not_active');
 return parseDemoOverview(payload);
}
