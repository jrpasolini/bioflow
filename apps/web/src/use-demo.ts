import {useEffect,useState} from 'react';
import {fetchDemoOverview,localDemo} from './demo-api';

export function useDemoOverview(){
 const base=import.meta.env.VITE_API_BASE_URL?.trim();
 const [state,setState]=useState({data:localDemo,status:base?'loading':'local'});
 useEffect(()=>{
  if(!base)return;
  let active=true;
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),15000);
  fetchDemoOverview(base,controller.signal).then(data=>{
   if(active)setState({data,status:'atlas'});
  }).catch(()=>{
   if(active)setState({data:localDemo,status:'offline'});
  }).finally(()=>clearTimeout(timer));
  return ()=>{active=false;clearTimeout(timer);controller.abort();};
 },[base]);
 return state;
}
