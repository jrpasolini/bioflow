import {useMemo,useState} from 'react';
import {Activity,ChartNoAxesCombined,FileText,HeartPulse,LockKeyhole,Download,Upload,ShieldCheck,FlaskConical,Moon,Sun} from 'lucide-react';
import {demoPatient,demoReports,indicatorCodes,type Indicator} from '../../../packages/fixtures/src/synthetic';
import {useThemePreference} from './theme';
import {useLocale,labelForIndicator,labelForLab,formatDate,formatValue,type Locale} from './i18n';

type Section='overview'|'trends'|'reports';
const latest=demoReports[demoReports.length-1];

function markerStatus(a: Indicator,t:ReturnType<typeof useLocale>['t']):string {
  if(a.referenceHigh!==undefined&&a.value>a.referenceHigh)return t.above;
  if(a.referenceLow!==undefined&&a.value<a.referenceLow)return t.below;
  return t.within;
}
function Trend({code,locale}:{code:string;locale:Locale}){
  const series=demoReports.flatMap(r=>r.results.filter(a=>a.code===code).map(a=>({...a,date:r.collectedAt})));
  if(!series.length)return null;
  const lo=Math.min(...series.map(a=>a.value)),hi=Math.max(...series.map(a=>a.value)),span=Math.max(1,hi-lo);
  const x=(i:number)=>22+i*396/Math.max(1,series.length-1);
  const y=(v:number)=>140-(v-lo)*95/span;
  const points=series.map((s,i)=>x(i)+','+y(s.value)).join(' ');
  const accessible=series.map(s=>formatDate(s.date,locale)+' '+formatValue(s.value,locale)+' '+s.unit).join('; ');
  return <div className="trend-chart" role="img" aria-label={labelForIndicator(code,locale,series[0].name)+': '+accessible}>
    <svg viewBox="0 0 440 165" aria-hidden="true">
      <line x1="16" y1="142" x2="424" y2="142" stroke="var(--plot-axis)"/>
      <polyline points={points} fill="none" stroke="var(--plot-stroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {series.map((s,i)=><g key={s.date}><circle cx={x(i)} cy={y(s.value)} r="5" fill="var(--plot-stroke)"/><text x={x(i)} y={y(s.value)-14} textAnchor="middle" fontSize="12" fill="var(--plot-label)">{formatValue(s.value,locale)}</text></g>)}
    </svg>
    <div className="chart-labels">{series.map(s=><span key={s.date}>{formatDate(s.date,locale)}</span>)}</div>
  </div>;
}
export default function App(){
  const {theme,toggleTheme}=useThemePreference();
  const {locale,changeLocale,t}=useLocale();
  const [section,setSection]=useState<Section>('overview');
  const [selected,setSelected]=useState<string>(indicatorCodes[0]);
  const [reportId,setReportId]=useState(latest.id);
  const report=demoReports.find(r=>r.id===reportId)??latest;
  const latestIndicator=useMemo(()=>latest.results.find(a=>a.code===selected),[selected]);
  const date=(s:string)=>formatDate(s,locale);
  const fmt=(n:number)=>formatValue(n,locale);
  const indicatorName=(a:Indicator)=>labelForIndicator(a.code,locale,a.name);
  const labName=(n:string)=>labelForLab(n,locale);

  return <div className="app">
    <header className="topbar">
      <div className="brand"><span className="brand-icon"><HeartPulse size={23}/></span><span>BioFlow<small>{t.tagline}</small></span></div>
      <div className="header-actions">
        <span className="privacy"><ShieldCheck size={16}/> {t.demoEnvironment}</span>
        <div className="locale-switch" role="group" aria-label={t.languageSwitcher}>
          <button type="button" lang="en-US" aria-label={t.chooseEnglish} title="English (United States)" aria-pressed={locale==='en-US'} className={locale==='en-US'?'selected':''} onClick={()=>changeLocale('en-US')}><span aria-hidden="true">🇺🇸</span><span className="locale-code">EN</span></button>
          <button type="button" lang="pt-BR" aria-label={t.choosePortuguese} title="Português (Brasil)" aria-pressed={locale==='pt-BR'} className={locale==='pt-BR'?'selected':''} onClick={()=>changeLocale('pt-BR')}><span aria-hidden="true">🇧🇷</span><span className="locale-code">PT</span></button>
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme==='light'?t.enableDark:t.enableLight} aria-pressed={theme==='dark'} title={theme==='light'?t.enableDark:t.enableLight}>
          {theme==='light'?<Moon size={18}/>:<Sun size={18}/>}<span>{theme==='light'?t.dark:t.light}</span>
        </button>
      </div>
    </header>
    <main className="container">
      <div className="demo-banner"><FlaskConical size={20}/><span><strong>{t.demoHeadline}</strong> {t.demoText}</span></div>
      <div className="page-title"><div><span className="eyebrow">{t.labHistory}</span><h1>{demoPatient.displayName}</h1><p>{t.description}</p></div><span className="pill">{demoReports.length} {t.simulatedCollections}</span></div>
      <nav className="tabs" aria-label={t.navLabel}>
        <button className={section==='overview'?'active':''} onClick={()=>setSection('overview')}><Activity size={18}/> {t.overview}</button>
        <button className={section==='trends'?'active':''} onClick={()=>setSection('trends')}><ChartNoAxesCombined size={18}/> {t.trends}</button>
        <button className={section==='reports'?'active':''} onClick={()=>setSection('reports')}><FileText size={18}/> {t.reports}</button>
      </nav>
      {section==='overview'&&<>
        <section className="notice"><div><span className="eyebrow">{t.lastCollection}</span><h2>{date(latest.collectedAt)}</h2><p>{labName(latest.laboratory)} · {latest.results.length} {t.markersCount}</p></div><span className="pill">{t.demoOnly}</span></section>
        <h2 className="section-title">{t.labMarkers}</h2>
        <div className="indicator-grid">{latest.results.map(a=><button key={a.code} className="indicator" onClick={()=>{setSelected(a.code);setSection('trends')}}><span>{indicatorName(a)}</span><strong>{fmt(a.value)} <small>{a.unit}</small></strong><span className="reference">{markerStatus(a,t)}</span></button>)}</div>
        <h2 className="section-title">{t.recentCollections}</h2>
        <div className="panel">{[...demoReports].reverse().map(r=><button className="report-row" key={r.id} onClick={()=>{setReportId(r.id);setSection('reports')}}><span className="doc-icon"><FileText size={18}/></span><span><strong>{date(r.collectedAt)}</strong><small>{labName(r.laboratory)} · {r.results.length} {t.fictionalResults}</small></span><span className="chevron">›</span></button>)}</div>
      </>}
      {section==='trends'&&<section className="panel detail-panel">
        <div className="detail-heading"><div><span className="eyebrow">{t.longitudinal}</span><h2>{t.trendHeading}</h2><p>{t.trendText}</p></div>
        <label>{t.marker}<select aria-label={t.selectMarker} value={selected} onChange={e=>setSelected(e.target.value)}>{latest.results.map(a=><option key={a.code} value={a.code}>{indicatorName(a)}</option>)}</select></label></div>
        <div className="value-card"><strong>{latestIndicator&&fmt(latestIndicator.value)}</strong><span>{latestIndicator?.unit} · {t.mostRecentResult}</span></div>
        <Trend code={selected} locale={locale}/><p className="disclaimer">{t.medicalDisclaimer}</p>
      </section>}
      {section==='reports'&&<div className="reports-layout">
        <section className="panel reports-list"><h2>{t.collections}</h2>{[...demoReports].reverse().map(r=><button className={'report-row '+(r.id===reportId?'selected':'')} key={r.id} onClick={()=>setReportId(r.id)}><span className="doc-icon"><FileText size={18}/></span><span><strong>{date(r.collectedAt)}</strong><small>{labName(r.laboratory)}</small></span></button>)}</section>
        <section className="panel detail-panel"><span className="eyebrow">{t.collectionDetails}</span><h2>{date(report.collectedAt)}</h2><p>{labName(report.laboratory)}</p>
          <div className="results-list">{report.results.map(a=><div key={a.code} className="result-line"><span>{indicatorName(a)}</span><strong>{fmt(a.value)} {a.unit}</strong></div>)}</div>
          <div className="source-placeholder"><LockKeyhole size={23}/><div><strong>{t.canonicalPdf}</strong><p>{t.pdfNotAvailable}</p><button className="secondary" disabled><Download size={16}/> {t.downloadUnavailable}</button></div></div>
        </section>
      </div>}
      <section className="next-step"><Upload size={21}/><div><strong>{t.importHeading}</strong><p>{t.integrations}</p></div><span className="pill">{t.inDevelopment}</span></section>
    </main>
    <footer>{t.footer}</footer>
  </div>;
}
