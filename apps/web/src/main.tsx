import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import '@fontsource-variable/newsreader/standard.css';
import '@fontsource-variable/figtree';
import './styles.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
if(import.meta.env.PROD&&'serviceWorker' in navigator){
 window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{/* The app remains usable without offline support. */});});
}

