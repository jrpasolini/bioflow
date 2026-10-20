import usFlag from 'flag-icons/flags/4x3/us.svg';
import brFlag from 'flag-icons/flags/4x3/br.svg';
import {useEffect,useMemo,useRef,useState} from 'react';
import {markerHistory,plotHistory,smoothHistoryPath} from './timeline';
import {referenceStatus,chooseFeaturedResult,type ReferenceStatus} from './reference';
import {Activity,ChartNoAxesCombined,FileText,HeartPulse,LockKeyhole,Download,FlaskConical,Moon,Sun} from 'lucide-react';
import {demoReports as fixtureReports,indicatorCodes,type Indicator,type LabReport} from '../../../packages/fixtures/src/synthetic';
import {AppActions} from './pwa';
import {DemoEntry} from './demo-entry';
import {useDemoOverview} from './use-demo';
import {useThemePreference} from './theme';
import {useLocale,labelForIndicator,labelForLab,formatDate,formatBirthDate,formatValue,calculateAge,type Locale} from './i18n';

type Section='overview'|'trends'|'reports';
const initialLatest=fixtureReports[fixtureReports.length-1];

function markerStatus(a: Indicator,t:ReturnType<typeof useLocale>['t']):string {
  const status=referenceStatus(a);
  return status==='very-high'?t.veryHigh:status==='very-low'?t.veryLow:status==='attention'?t.attention:status==='high'?t.above:status==='low'?t.below:status==='normal'?t.within:t.noReference;
}
const statusClass=(status:ReferenceStatus)=>'status-'+status;
const searchKey=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
function MiniSparkline({code,reports}:{code:string;reports:LabReport[]}){
  const series=markerHistory(reports,code);
  const coords=plotHistory(series,116,48,5,7);
  if(!coords.length)return null;
  return <svg className="mini-sparkline" viewBox="0 0 116 48" aria-hidden="true" focusable="false">
    <path fill="none" stroke="var(--plot-stroke)" strokeWidth="2.1" strokeLinecap="round" d={smoothHistoryPath(coords)}/>
    {coords.map((p,i)=><circle key={series[i].id} cx={p.x} cy={p.y} r={i===coords.length-1?3.1:2} fill="var(--plot-stroke)"/>)}
  </svg>;
}
function Trend({code,reports,locale,onOpenReport,t}:{
  code:string;reports:LabReport[];locale:Locale;onOpenReport:(reportId:string)=>void;t:ReturnType<typeof useLocale>['t']
}){
  const series=markerHistory(reports,code);
  const [selectedPoint,setSelectedPoint]=useState<{code:string;id:string}|null>(null);
  if(!series.length)return <p>{t.noHistory}</p>;
  const selected=series.find(s=>selectedPoint?.code===code&&s.id===selectedPoint.id)??series[series.length-1];
  const points=plotHistory(series,760,240,58,25);
  const min=Math.min(...series.map(s=>s.value)),max=Math.max(...series.map(s=>s.value));
  const ticks=min===max?[{y:120,value:min}]:[0,1,2,3].map(i=>({y:25+i*190/3,value:max-(max-min)*i/3}));
  const selectedIndex=series.findIndex(s=>s.id===selected.id);
  const label=labelForIndicator(code,locale,series[0].name);
  const chartLabel=t.historyFor+' '+label+'. '+t.collectionOrder;
  return <div className="timeline-wrap">
    <div className="trend-chart">
      <svg className="interactive-history" viewBox="0 0 760 240" role="group" aria-label={chartLabel}>
        {ticks.map(({y,value},i)=>{
          return <g key={i} aria-hidden="true"><line x1="58" x2="702" y1={y} y2={y} stroke="var(--plot-axis)" opacity=".65"/><text x="47" y={y+4} textAnchor="end" className="chart-tick">{formatValue(value,locale)}</text></g>;
        })}
        <path key={code} className="history-line" pathLength="1" d={smoothHistoryPath(points)} fill="none" stroke="var(--plot-stroke)" strokeWidth="2" strokeLinecap="round"/>
        <line x1={points[selectedIndex]?.x} x2={points[selectedIndex]?.x} y1="15" y2="225" stroke="var(--plot-stroke)" strokeDasharray="3 5" opacity=".25"/>
        {points.map((p,i)=>{
          const s=series[i];
          const pointLabel=label+', '+formatDate(s.collectedAt,locale)+', '+formatValue(s.value,locale)+' '+s.unit+', '+labelForLab(s.laboratory,locale);
          return <g key={s.id} role="button" tabIndex={0} focusable="true"
            aria-label={pointLabel} aria-pressed={s.id===selected.id}
            className={'history-point '+(s.id===selected.id?'active':'')}
            onClick={()=>setSelectedPoint({code,id:s.id})}
            onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelectedPoint({code,id:s.id});}}}>
            <title>{pointLabel}</title>
            <circle cx={p.x} cy={p.y} r="13" fill="transparent" className="point-target"/>
            <circle cx={p.x} cy={p.y} r={s.id===selected.id?5:3.5} className="point-dot"/>
          </g>;
        })}
      </svg>
      <div className="chart-labels"><span>{formatDate(series[0].collectedAt,locale)}</span><span>{t.collectionOrder}</span><span>{formatDate(series[series.length-1].collectedAt,locale)}</span></div>
    </div>
    <section className="selected-exam" aria-live="polite" aria-label={t.selectedExam}>
      <div><span className="eyebrow">{t.selectedExam} {selectedIndex+1}/{series.length}</span>
        <h3>{formatValue(selected.value,locale)} <small>{selected.unit}</small></h3>
        <p>{t.collectionDate}: <strong>{formatDate(selected.collectedAt,locale)}</strong></p>
        <p>{t.laboratory}: <strong>{labelForLab(selected.laboratory,locale)}</strong></p>
      </div>
      <button type="button" className="open-report" onClick={()=>onOpenReport(selected.reportId)}>{t.openCollection} <span aria-hidden="true">→</span></button>
    </section>
    <section className="marker-history" aria-label={t.historyFor+' '+label}>
      <h3>{locale==='pt-BR'?'Histórico de exames':'Exam history'}</h3>
      <ul>{[...series].reverse().map(s=>{
        const state=referenceStatus(s);
        const badge=markerStatus(s,t);
        const range=s.referenceLow!==undefined&&s.referenceHigh!==undefined?formatValue(s.referenceLow,locale)+'–'+formatValue(s.referenceHigh,locale):s.referenceLow!==undefined?'≥ '+formatValue(s.referenceLow,locale):s.referenceHigh!==undefined?'≤ '+formatValue(s.referenceHigh,locale):null;
        return <li key={s.id}><button type="button" className={'history-row '+(s.id===selected.id?'selected':'')} aria-pressed={s.id===selected.id} onClick={()=>setSelectedPoint({code,id:s.id})}>
          <span className="history-collection"><strong>{formatDate(s.collectedAt,locale)}</strong><span>{labelForLab(s.laboratory,locale)}</span>{range&&<small>{locale==='pt-BR'?'Referência':'Reference'}: {range} {s.unit}</small>}{state==='attention'&&<small>{locale==='pt-BR'?'Faixa de atenção':'Attention interval'}: {s.referenceAttentionLow===undefined?'':('≥ '+formatValue(s.referenceAttentionLow,locale)+' ')}{s.referenceAttentionHigh===undefined?'':('≤ '+formatValue(s.referenceAttentionHigh,locale))} {s.unit}</small>}</span>
          <strong className="history-value">{formatValue(s.value,locale)} <small>{s.unit}</small></strong><span className={'reference-badge '+statusClass(state)}>{badge}</span>
        </button></li>;
      })}</ul>
    </section>
  </div>;
}
export default function App(){
  const {data,status}=useDemoOverview();
  const {patient:demoPatient,reports:demoReports}=data;
  const latest=demoReports[demoReports.length-1];
  const {theme,toggleTheme}=useThemePreference();
  const {locale,changeLocale,t}=useLocale();
  const [entered,setEntered]=useState(false);
  const historyHeading=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{if(entered)historyHeading.current?.focus();},[entered]);
  const [section,setSection]=useState<Section>('overview');
  const [selected,setSelected]=useState<string>(indicatorCodes[0]);
  const [reportId,setReportId]=useState(initialLatest.id);
  const [reportSearch,setReportSearch]=useState('');
  const report=demoReports.find(r=>r.id===reportId)??latest;
  const visibleResults=report.results.filter(a=>searchKey(labelForIndicator(a.code,locale,a.name)).includes(searchKey(reportSearch)));
  const latestIndicator=useMemo(()=>latest.results.find(a=>a.code===selected),[selected,latest]);
  const featured=useMemo(()=>chooseFeaturedResult(latest.results),[latest]);
  const outsideCount=latest.results.filter(a=>['high','very-high','low','very-low'].includes(referenceStatus(a))).length;
  const date=(s:string)=>formatDate(s,locale);
  const fmt=(n:number)=>formatValue(n,locale);
  const indicatorName=(a:Indicator)=>labelForIndicator(a.code,locale,a.name);
  const labName=(n:string)=>labelForLab(n,locale);

  return <div className="app">
    <header className="topbar">
      <div className="brand"><span className="brand-icon"><HeartPulse size={23}/></span><span>BioFlow<small>{t.tagline}</small></span></div>
      <div className="header-actions">
        {entered&&<><button type="button" className="secondary access-options" onClick={()=>setEntered(false)}>{locale==='pt-BR'?'Opções de acesso':'Access options'}</button><AppActions portuguese={locale==='pt-BR'}/></>}
        <div className="locale-switch" role="group" aria-label={t.languageSwitcher}>
          <button type="button" lang="en-US" aria-label={t.chooseEnglish} title="English (United States)" aria-pressed={locale==='en-US'} className={locale==='en-US'?'selected':''} onClick={()=>changeLocale('en-US')}><img className="locale-flag" src={usFlag} alt="" aria-hidden="true"/></button>
          <button type="button" lang="pt-BR" aria-label={t.choosePortuguese} title="Português (Brasil)" aria-pressed={locale==='pt-BR'} className={locale==='pt-BR'?'selected':''} onClick={()=>changeLocale('pt-BR')}><img className="locale-flag" src={brFlag} alt="" aria-hidden="true"/></button>
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme==='light'?t.enableDark:t.enableLight} aria-pressed={theme==='dark'} title={theme==='light'?t.enableDark:t.enableLight}>
          {theme==='light'?<Moon size={18}/>:<Sun size={18}/>}<span>{theme==='light'?t.dark:t.light}</span>
        </button>
      </div>
    </header>
    <main className="container">
      {!entered?<DemoEntry portuguese={locale==='pt-BR'} onExplore={()=>setEntered(true)}/>:<>
      <div className="demo-banner"><FlaskConical size={20}/><span><strong>{t.demoHeadline}</strong> {t.demoText}</span></div>
      {status==='offline'&&<p role="status" className="demo-source">{locale==='pt-BR'?'Não foi possível atualizar. Exibindo o histórico local.':'Unable to refresh. Showing local history.'}</p>}
      <div className="page-title"><div><span className="eyebrow">{t.labHistory}</span><h1 ref={historyHeading} tabIndex={-1}>{demoPatient.displayName}</h1><div className="patient-identity" aria-label={t.patientIdentity}><span><strong>{t.dateOfBirth}:</strong> {formatBirthDate(demoPatient.dateOfBirth,locale)}</span><span><strong>{t.age}:</strong> {calculateAge(demoPatient.dateOfBirth)} {t.years}</span><span><strong>{t.demoPatientId}:</strong> {demoPatient.demoRecordId}</span></div><p>{t.description}</p></div><span className="pill">{demoReports.length} {t.simulatedCollections}</span></div>
      <nav className="tabs" aria-label={t.navLabel}>
        <button className={section==='overview'?'active':''} onClick={()=>setSection('overview')}><Activity size={18}/> {t.overview}</button>
        <button className={section==='trends'?'active':''} onClick={()=>setSection('trends')}><ChartNoAxesCombined size={18}/> {t.trends}</button>
        <button className={section==='reports'?'active':''} onClick={()=>setSection('reports')}><FileText size={18}/> {t.reports}</button>
      </nav>
      {section==='overview'&&<>
        <section className="notice latest-summary">
          <div className="latest-intro">
            <span className="eyebrow">{t.lastCollection}</span>
            <h2>{featured
              ? <>{indicatorName(featured)}: {fmt(featured.value)} {featured.unit}, {['high','very-high'].includes(referenceStatus(featured))?t.featuredHigh:t.featuredLow}.</>
              : t.noOutOfRangeHighlight}</h2>
            <p>{date(latest.collectedAt)} · {labName(latest.laboratory)} · {latest.results.length} {t.markersCount}</p>
            <p className="latest-count">{outsideCount} {t.outsideReferenceCount}</p>
          </div>
          <div className="latest-result-list" aria-label={t.allResultsLatest}>
            {latest.results.map(a=>{
              const status=referenceStatus(a);
              return <button type="button" className="latest-result-row" key={a.code}
                aria-label={t.viewHistory+' '+indicatorName(a)+', '+fmt(a.value)+' '+a.unit+', '+markerStatus(a,t)}
                onClick={()=>{setSelected(a.code);setSection('trends')}}>
                <span className="latest-result-name">{indicatorName(a)}</span>
                <span className="latest-result-value">{fmt(a.value)} {a.unit}</span>
                <span className={'reference-badge '+statusClass(status)}>{markerStatus(a,t)}</span>
              </button>;
            })}
          </div>
          <p className="latest-disclaimer">{t.referenceDisclaimer}</p>
        </section>
        <h2 className="section-title">{t.labMarkers}</h2>
        <div className="indicator-grid">{latest.results.map(a=><button key={a.code} className="indicator" aria-label={t.viewHistory+' '+indicatorName(a)+', '+fmt(a.value)+' '+a.unit} onClick={()=>{setSelected(a.code);setSection('trends')}}><span className="indicator-copy"><span className="indicator-name">{indicatorName(a)}</span><strong>{fmt(a.value)} <small>{a.unit}</small></strong><span className="indicator-meta">{date(latest.collectedAt)} · {markerStatus(a,t)}</span></span><MiniSparkline code={a.code} reports={demoReports}/></button>)}</div>
        <h2 className="section-title">{t.recentCollections}</h2>
        <div className="panel">{[...demoReports].reverse().map(r=><button className="report-row" key={r.id} onClick={()=>{setReportId(r.id);setSection('reports')}}><span className="doc-icon"><FileText size={18}/></span><span><strong>{date(r.collectedAt)}</strong><small>{labName(r.laboratory)} · {r.results.length} {t.fictionalResults}</small></span><span className="chevron">›</span></button>)}</div>
      </>}
      {section==='trends'&&<section className="panel detail-panel">
        <div className="detail-heading"><div><span className="eyebrow">{t.longitudinal}</span><h2>{latestIndicator?indicatorName(latestIndicator):t.trendHeading}</h2><p>{t.trendText}</p></div>
        <label>{t.marker}<select aria-label={t.selectMarker} value={selected} onChange={e=>setSelected(e.target.value)}>{latest.results.map(a=><option key={a.code} value={a.code}>{indicatorName(a)}</option>)}</select></label></div>
        <div className="value-card"><strong>{latestIndicator&&fmt(latestIndicator.value)}</strong><span>{latestIndicator?.unit} · {t.mostRecentResult}</span></div>
        <Trend reports={demoReports} code={selected} locale={locale} t={t} onOpenReport={(id)=>{setReportId(id);setSection('reports')}}/><p className="disclaimer">{t.medicalDisclaimer}</p>
      </section>}
      {section==='reports'&&<div className="reports-layout">
        <section className="panel reports-list"><h2>{t.collections}</h2>{[...demoReports].reverse().map(r=><button className={'report-row '+(r.id===reportId?'selected':'')} key={r.id} onClick={()=>setReportId(r.id)}><span className="doc-icon"><FileText size={18}/></span><span><strong>{date(r.collectedAt)}</strong><small>{labName(r.laboratory)}</small></span></button>)}</section>
        <section className="panel detail-panel"><span className="eyebrow">{t.collectionDetails}</span><h2>{date(report.collectedAt)}</h2><p>{labName(report.laboratory)}</p>
          <label className="report-search">{locale==='pt-BR'?'Buscar neste laudo':'Search this report'}<input type="search" value={reportSearch} onChange={e=>setReportSearch(e.target.value)} placeholder={locale==='pt-BR'?'Nome do marcador':'Marker name'}/></label>
          <div className="results-list">{visibleResults.map(a=><div key={a.code} className="result-line"><span>{indicatorName(a)}</span><strong>{fmt(a.value)} {a.unit}</strong><span className={"reference-badge "+statusClass(referenceStatus(a))}>{markerStatus(a,t)}</span></div>)}</div>
          {!visibleResults.length&&<p role="status">{locale==='pt-BR'?'Nenhum marcador encontrado nesta coleta.':'No matching marker in this collection.'}</p>}
          <div className="source-placeholder"><LockKeyhole size={23}/><div><strong>{locale==='pt-BR'?'Laudo original':'Original report'}</strong><p>{t.pdfNotAvailable}</p><button className="secondary" disabled><Download size={16}/> {t.downloadUnavailable}</button></div></div>
        </section>
      </div>}
      </>}
    </main>
    <footer className="site-footer">
      <p className="footer-note">{t.footer}</p>
      <p className="technology-label">BioFlow · {t.technologyCredits}</p>
      <ul className="technology-credits" aria-label={t.technologyCredits}>{['React','TypeScript','Vite','Cloudflare Workers','MongoDB Atlas','Lucide','Newsreader','Figtree','flag-icons'].map(name=><li key={name}>{name}</li>)}</ul>
      <p className="integration-credits">
        <span>{locale==='pt-BR'?'Leitura de PDFs com':'PDF reading with'} <a href="https://deepmind.google/models/gemma/" target="_blank" rel="noopener noreferrer">Gemma</a> <small>· {locale==='pt-BR'?'em breve':'coming soon'}</small></span>
        <span>{locale==='pt-BR'?'Autenticação 2FA com':'2FA authentication with'} <a href="https://auth0.com/" target="_blank" rel="noopener noreferrer">Auth0</a> <small>· {locale==='pt-BR'?'em breve':'coming soon'}</small></span>
      </p>
    </footer>
  </div>;
}

