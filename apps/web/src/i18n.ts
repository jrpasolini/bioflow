import {useEffect, useState} from 'react';

export type Locale = 'en-US' | 'pt-BR';
const STORAGE_KEY = 'bioflow.locale';

const en = {
  tagline: 'Your health. Your history. Your control.',
  demoEnvironment: 'Demo environment',
  enableDark: 'Enable dark mode',
  enableLight: 'Enable light mode',
  dark: 'Dark',
  light: 'Light',
  chooseEnglish: 'Switch to English (United States)',
  choosePortuguese: 'Mudar para português (Brasil)',
  languageSwitcher: 'Language',
  demoHeadline: 'DEMO — 100% SYNTHETIC DATA.',
  demoText: 'Walter White, medical tests, dates, laboratories and results are entirely fictional. This platform does not provide diagnoses.',
  labHistory: 'Laboratory history',
  patientIdentity: 'Patient identification',
  dateOfBirth: 'Date of birth',
  age: 'Age',
  years: 'years',
  demoPatientId: 'Demo record ID',
  description: 'Your markers, test results and reports, all in one place.',
  simulatedCollections: 'simulated collections',
  navLabel: 'Sections',
  overview: 'Overview',
  trends: 'Trends',
  reports: 'Reports',
  lastCollection: 'Latest simulated collection',
  markersCount: 'markers',
  demoOnly: 'Demo only',
  labMarkers: 'Lab markers',
  above: 'Above range',
  below: 'Below range',
  within: 'Within range',
  recentCollections: 'Recent collections',
  fictionalResults: 'fictional results',
  longitudinal: 'Longitudinal tracking',
  trendHeading: 'Marker trends',
  trendText: 'Historical trends based entirely on synthetic results.',
  marker: 'Marker',
  selectMarker: 'Choose a lab marker',
  mostRecentResult: 'most recent result',
  trendFor: 'Trend for',
  medicalDisclaimer: 'Not a substitute for medical advice. Comparisons require equivalent units and testing methods.',
  collections: 'Collections',
  collectionDetails: 'Collection details',
  canonicalPdf: 'Original PDF preserved',
  pdfNotAvailable: 'These simulated collections have no attached PDFs yet. In the integrated version, the original uploaded document will be securely stored and available for authorized download without changes.',
  downloadUnavailable: 'Original unavailable in this demo',
  importHeading: 'Intelligent report import',
  integrations: 'Coming soon: Auth0 login, private R2 PDF storage, Gemma 4 assisted review and MongoDB Atlas.',
  inDevelopment: 'In development',
  footer: 'BioFlow · Initial prototype · Your history, your control.',
  trendSeparator: ': ',
  glucose: 'Glucose',
  hba1c: 'Hemoglobin A1c',
  creatinine: 'Creatinine',
  triglycerides: 'Triglycerides',
  hdl: 'HDL cholesterol',
  labAurora: 'Aurora Laboratory (fictional)',
  labHorizonte: 'Horizon Laboratory (fictional)',
  pageTitle: 'BioFlow | Laboratory history',
  pageDescription: 'BioFlow — your health, your history, your control.'
};
type TranslationKey = keyof typeof en;
const pt: Record<TranslationKey,string> = {
  tagline: 'Sua saúde. Sua história. Seu controle.',
  demoEnvironment: 'Ambiente demonstrativo',
  enableDark: 'Ativar modo escuro',
  enableLight: 'Ativar modo claro',
  dark: 'Escuro',
  light: 'Claro',
  chooseEnglish: 'Switch to English (United States)',
  choosePortuguese: 'Mudar para português (Brasil)',
  languageSwitcher: 'Idioma',
  demoHeadline: 'DEMONSTRAÇÃO — DADOS 100% FICTÍCIOS.',
  demoText: 'Walter White, exames, datas, laboratórios e resultados são inteiramente fictícios. Esta plataforma não emite diagnósticos.',
  labHistory: 'Histórico laboratorial',
  patientIdentity: 'Identificação do paciente',
  dateOfBirth: 'Data de nascimento',
  age: 'Idade',
  years: 'anos',
  demoPatientId: 'ID fictício',
  description: 'Seus indicadores, suas coletas e seus laudos em um só lugar.',
  simulatedCollections: 'coletas simuladas',
  navLabel: 'Seções',
  overview: 'Visão geral',
  trends: 'Evolução',
  reports: 'Laudos',
  lastCollection: 'Última coleta simulada',
  markersCount: 'indicadores',
  demoOnly: 'Somente demonstração',
  labMarkers: 'Marcadores laboratoriais',
  above: 'Acima da referência',
  below: 'Abaixo da referência',
  within: 'Na referência',
  recentCollections: 'Coletas recentes',
  fictionalResults: 'resultados fictícios',
  longitudinal: 'Acompanhamento longitudinal',
  trendHeading: 'Evolução dos indicadores',
  trendText: 'Histórico construído com resultados inteiramente fictícios.',
  marker: 'Marcador',
  selectMarker: 'Selecionar marcador',
  mostRecentResult: 'resultado mais recente',
  trendFor: 'Evolução de',
  medicalDisclaimer: 'Não substitui orientação médica. Comparações exigem unidades e métodos equivalentes.',
  collections: 'Coletas',
  collectionDetails: 'Detalhes da coleta',
  canonicalPdf: 'PDF original preservado',
  pdfNotAvailable: 'As coletas simuladas ainda não possuem PDFs anexados. Na versão integrada, o documento original enviado ficará protegido e disponível para download autorizado, sem alterações.',
  downloadUnavailable: 'Original indisponível nesta demo',
  importHeading: 'Importação inteligente de laudos',
  integrations: 'Em breve: login Auth0, armazenamento privado de PDF no R2, revisão assistida pelo Gemma 4 e MongoDB Atlas.',
  inDevelopment: 'Em desenvolvimento',
  footer: 'BioFlow · Protótipo inicial · Sua história, seu controle.',
  trendSeparator: ': ',
  glucose: 'Glicose',
  hba1c: 'Hemoglobina glicada',
  creatinine: 'Creatinina',
  triglycerides: 'Triglicerídeos',
  hdl: 'Colesterol HDL',
  labAurora: 'Laboratório Aurora (fictício)',
  labHorizonte: 'Laboratório Horizonte (fictício)',
  pageTitle: 'BioFlow | Histórico laboratorial',
  pageDescription: 'BioFlow — sua saúde, sua história, seu controle.'
};
export const translations: Record<Locale, Record<TranslationKey,string>> = {'en-US': en, 'pt-BR': pt};

const indicatorKeys = {
  glucose:'glucose',hba1c:'hba1c',creatinine:'creatinine',triglycerides:'triglycerides',hdl:'hdl'
} as const;
export function labelForIndicator(code: string, locale: Locale, fallback: string): string {
  const key = indicatorKeys[code as keyof typeof indicatorKeys];
  return key ? translations[locale][key] : fallback;
}
export function labelForLab(name: string, locale: Locale): string {
  const key = name.includes('Aurora') ? 'labAurora' : name.includes('Horizonte') ? 'labHorizonte' : null;
  return key ? translations[locale][key] : name;
}
export function formatDate(dateISO: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeZone:'UTC'})
    .format(new Date(dateISO+'T12:00:00Z'));
}
/** Calculate completed years using UTC calendar dates to avoid timezone-related birthday drift. */
export function calculateAge(dateOfBirth: string, asOf: Date = new Date()): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth);
  if (!match) throw new Error('Invalid birth date');
  const birthYear = Number(match[1]),birthMonth = Number(match[2]),birthDay = Number(match[3]);
  let age = asOf.getUTCFullYear() - birthYear;
  if (asOf.getUTCMonth()+1 < birthMonth || (asOf.getUTCMonth()+1 === birthMonth && asOf.getUTCDate() < birthDay)) age--;
  return age;
}
export function formatBirthDate(dateISO: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale,{dateStyle:'long',timeZone:'UTC'})
    .format(new Date(dateISO+'T12:00:00Z'));
}
export function formatValue(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale,{maximumFractionDigits:2}).format(value);
}
function readPreference(): Locale {
  try { if (window.localStorage.getItem(STORAGE_KEY)==='pt-BR') return 'pt-BR'; }
  catch { /* Private browsing may block storage. */ }
  return 'en-US'; // Explicit project default: US English, not browser language.
}
export function useLocale() {
  const [locale,setLocale] = useState<Locale>(readPreference);
  useEffect(()=>{
    document.documentElement.lang = locale;
    document.title = translations[locale].pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content',translations[locale].pageDescription);
  },[locale]);
  const changeLocale = (next:Locale)=>{
    setLocale(next);
    try {window.localStorage.setItem(STORAGE_KEY,next);}
    catch { /* Current session still switches locale. */ }
  };
  return {locale,changeLocale,t: translations[locale]};
}
