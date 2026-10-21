import React from 'react';
import {createRoot} from 'react-dom/client';
import {BioFlowAuth0Root} from './auth0-session';
import '@fontsource-variable/newsreader/standard.css';
import '@fontsource-variable/figtree';
import './styles.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><BioFlowAuth0Root/></React.StrictMode>);
if(import.meta.env.PROD&&'serviceWorker' in navigator){
 window.addEventListener('load',()=>{navigator.serviceWorker.register(import.meta.env.BASE_URL+'sw.js',{scope:import.meta.env.BASE_URL}).catch(()=>{/* The app remains usable without offline support. */});});
}

