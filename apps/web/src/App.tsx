import {useMemo,useState} from 'react';
import {Activity,ChartNoAxesCombined,FileText,HeartPulse,LockKeyhole,Download,Upload,ShieldCheck,FlaskConical} from 'lucide-react';
import {demoPatient,demoReports,indicatorCodes,type Indicator} from '../../../packages/fixtures/src/synthetic';

type Section='overview'|'trends'|'reports';
const date=(s:string)=>new Intl.DateTimeFormat('pt-BR',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(s+'T12:00:00Z'));
const latest=demoReports[demoReports.length-1];
const level=(a:Indicator)=>a.referenceHigh!==undefined&&a.value>a.referenceHigh?'Acima':a.referenceLow!==undefined&&a.value<a.referenceLow?'Abaixo':'Na referência';
const fmt=(n:number)=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2}).format(n);
function Trend({code}:{code:string}){
 const series=demoReports.flatMap(r=>r.results.filter(a=>a.code===code).map(a=>({...a,date:r.collectedAt})));
 if(!series.length)return null;
 const lo=Math.min(...series.map(a=>a.value)),hi=Math.max(...series.map(a=>a.value)),span=Math.max(1,hi-lo);
 const x=(i:number)=>22+i*396/Math.max(1,series.length-1);
 const y=(v:number)=>140-(v-lo)*95/span;
 const points=series.map((s,i)=>x(i)+','+y(s.value)).join(' ');
 return <div className="trend-chart" role="img" aria-label={'Evolução de '+series[0].name+': '+series.map(s=>date(s.date)+' '+fmt(s.value)+' '+s.unit).join('; ')}>
   <svg viewBox="0 0 440 165" aria-hidden="true"><line x1="16" y1="142" x2="424" y2="142" stroke="#d8e3e3"/><polyline points={points} fill="none" stroke="#0c847c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>{series.map((s,i)=><g key={s.date}><circle cx={x(i)} cy={y(s.value)} r="5" fill="#0c847c"/><text x={x(i)} y={y(s.value)-14} textAnchor="middle" fontSize="12" fill="#2a4948">{fmt(s.value)}</text></g>)}</svg>
   <div className="chart-labels">{series.map(s=><span key={s.date}>{date(s.date)}</span>)}</div>
 </div>;
}
export default function App(){
 const [section,setSection]=useState<Section>('overview');
 const [selected,setSelected]=useState<string>(indicatorCodes[0]);
 const [reportId,setReportId]=useState(latest.id);
 const report=demoReports.find(r=>r.id===reportId)??latest;
 const latestIndicator=useMemo(()=>latest.results.find(a=>a.code===selected),[selected]);
 return <div className="app">
 <header className="topbar"><div className="brand"><span className="brand-icon"><HeartPulse size={23}/></span><span>BioFlow<small>Seu histórico, sob seu controle</small></span></div><span className="privacy"><ShieldCheck size={16}/> Ambiente demonstrativo</span></header>
 <main className="container">
  <div className="demo-banner"><FlaskConical size={20}/><span><strong>DEMONSTRAÇÃO — DADOS 100% FICTÍCIOS.</strong> Walter White, exames, datas, laboratórios e resultados são fictícios. Esta plataforma não emite diagnósticos.</span></div>
  <div className="page-title"><div><span className="eyebrow">Histórico laboratorial</span><h1>{demoPatient.displayName}</h1><p>Seus indicadores, suas coletas e seus laudos em um só lugar.</p></div><span className="pill">{demoReports.length} coletas simuladas</span></div>
  <nav className="tabs" aria-label="Seções"><button className={section==='overview'?'active':''} onClick={()=>setSection('overview')}><Activity size={18}/> Visão geral</button><button className={section==='trends'?'active':''} onClick={()=>setSection('trends')}><ChartNoAxesCombined size={18}/> Evolução</button><button className={section==='reports'?'active':''} onClick={()=>setSection('reports')}><FileText size={18}/> Laudos</button></nav>
  {section==='overview'&&<><section className="notice"><div><span className="eyebrow">Última coleta simulada</span><h2>{date(latest.collectedAt)}</h2><p>{latest.laboratory} · {latest.results.length} indicadores</p></div><span className="pill">Somente demonstração</span></section>
   <h2 className="section-title">Marcadores laboratoriais</h2><div className="indicator-grid">{latest.results.map(a=><button key={a.code} className="indicator" onClick={()=>{setSelected(a.code);setSection('trends')}}><span>{a.name}</span><strong>{fmt(a.value)} <small>{a.unit}</small></strong><span className="reference">{level(a)}</span></button>)}</div>
   <h2 className="section-title">Coletas recentes</h2><div className="panel">{[...demoReports].reverse().map(r=><button className="report-row" key={r.id} onClick={()=>{setReportId(r.id);setSection('reports')}}><span className="doc-icon"><FileText size={18}/></span><span><strong>{date(r.collectedAt)}</strong><small>{r.laboratory} · {r.results.length} resultados fictícios</small></span><span className="chevron">›</span></button>)}</div></>}
  {section==='trends'&&<section className="panel detail-panel"><div className="detail-heading"><div><span className="eyebrow">Acompanhamento longitudinal</span><h2>Evolução dos indicadores</h2><p>Histórico construído com resultados fictícios.</p></div><label>Marcador<select aria-label="Selecionar marcador" value={selected} onChange={e=>setSelected(e.target.value)}>{latest.results.map(a=><option key={a.code} value={a.code}>{a.name}</option>)}</select></label></div><div className="value-card"><strong>{latestIndicator&&fmt(latestIndicator.value)}</strong><span>{latestIndicator?.unit} · resultado mais recente</span></div><Trend code={selected}/><p className="disclaimer">Não substitui interpretação médica. Comparações exigem unidades e métodos equivalentes.</p></section>}
  {section==='reports'&&<div className="reports-layout"><section className="panel reports-list"><h2>Coletas</h2>{[...demoReports].reverse().map(r=><button className={'report-row '+(r.id===reportId?'selected':'')} key={r.id} onClick={()=>setReportId(r.id)}><span className="doc-icon"><FileText size={18}/></span><span><strong>{date(r.collectedAt)}</strong><small>{r.laboratory}</small></span></button>)}</section><section className="panel detail-panel"><span className="eyebrow">Detalhes da coleta</span><h2>{date(report.collectedAt)}</h2><p>{report.laboratory}</p><div className="results-list">{report.results.map(a=><div key={a.code} className="result-line"><span>{a.name}</span><strong>{fmt(a.value)} {a.unit}</strong></div>)}</div><div className="source-placeholder"><LockKeyhole size={23}/><div><strong>PDF canônico preservado</strong><p>As coletas simuladas ainda não possuem arquivos PDFs. Na versão integrada, o original enviado ficará protegido e disponível para download autorizado, sem alterações.</p><button className="secondary" disabled><Download size={16}/> Original indisponível nesta demo</button></div></div></section></div>}
  <section className="next-step"><Upload size={21}/><div><strong>Importação inteligente de laudos</strong><p>Próximas integrações: login Auth0, PDF privado no R2, revisão com Gemma 4 e MongoDB Atlas.</p></div><span className="pill">Em desenvolvimento</span></section>
 </main><footer>BioFlow · protótipo inicial · Seu histórico, seu controle.</footer></div>;
}
