import {useEffect, useState} from 'react';

export type Locale = 'en-US' | 'pt-BR';

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
  demoPatientId: 'Record ID',
  description: 'Your markers, test results and reports, all in one place.',
  simulatedCollections: 'collections',
  navLabel: 'Sections',
  overview: 'Overview',
  trends: 'Trends',
  reports: 'Reports',
  lastCollection: 'Latest collection',
  featuredHigh: 'above the reference range',
  featuredLow: 'below the reference range',
  noOutOfRangeHighlight: 'No out-of-range result identified in this collection',
  outsideReferenceCount: 'results outside the provided reference intervals',
  allResultsLatest: 'All results from the latest collection',
  noReference: 'No reference',
  referenceDisclaimer: 'The highlighted result is selected by a visual deviation rule, not medical severity. Clinical interpretation requires the original report.',
  markersCount: 'markers',
  demoOnly: 'Demo only',
  labMarkers: 'Lab markers',
  attention: 'Attention',
  veryHigh: 'Very high',
  veryLow: 'Very low',
  above: 'Above',
  below: 'Below',
  within: 'Normal',
  recentCollections: 'Recent collections',
  fictionalResults: 'results',
  longitudinal: 'Longitudinal tracking',
  viewHistory: 'View history for',
  historyFor: 'Historical results for',
  collectionOrder: 'Collection order',
  historyPoints: 'Result points',
  selectedExam: 'Selected result',
  collectionDate: 'Collection date',
  laboratory: 'Laboratory',
  openCollection: 'Open collection',
  noHistory: 'No historical results available',
  trendHeading: 'Marker trends',
  trendText: 'Select a marker, then an exam to see its collection details.',
  marker: 'Marker',
  selectMarker: 'Choose a lab marker',
  mostRecentResult: 'most recent result',
  trendFor: 'Trend for',
  medicalDisclaimer: 'Not a substitute for medical advice. Comparisons require equivalent units and testing methods.',
  collections: 'Collections',
  collectionDetails: 'Collection details',
  canonicalPdf: 'Original PDF preserved',
  pdfNotAvailable: 'This collection has no linked PDF yet. Download will be available with authorized access to the original file.',
  downloadUnavailable: 'Download original · unavailable',
  importHeading: 'Intelligent report import',
  integrations: 'Keep the original report linked to each collection, with protected access.',
  inDevelopment: 'In development',
  footer: 'BioFlow · Initial prototype · Your history, your control.',
  trendSeparator: ': ',
  glucose: 'Glucose',
  hba1c: 'Hemoglobin A1c',
  creatinine: 'Creatinine',
  triglycerides: 'Triglycerides',
  hdl: 'HDL cholesterol',
  urea: 'Urea',
  ldl: 'LDL cholesterol',
  totalCholesterol: 'Total cholesterol',
  hemoglobin: 'Hemoglobin',
  labAurora: 'Aurora Laboratory',
  labHorizonte: 'Horizon Laboratory',
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
  demoPatientId: 'Identificação',
  description: 'Seus indicadores, suas coletas e seus laudos em um só lugar.',
  simulatedCollections: 'coletas',
  navLabel: 'Seções',
  overview: 'Visão geral',
  trends: 'Evolução',
  reports: 'Laudos',
  lastCollection: 'Última coleta',
  featuredHigh: 'acima da referência',
  featuredLow: 'abaixo da referência',
  noOutOfRangeHighlight: 'Nenhum resultado fora da referência identificado nesta coleta',
  outsideReferenceCount: 'resultados fora dos intervalos de referência informados',
  allResultsLatest: 'Todos os resultados da última coleta',
  noReference: 'Sem referência',
  referenceDisclaimer: 'O destaque usa uma regra visual de desvio, não de gravidade médica. A interpretação clínica exige o laudo original.',
  markersCount: 'indicadores',
  demoOnly: 'Somente demonstração',
  labMarkers: 'Marcadores laboratoriais',
  attention: 'Atenção',
  veryHigh: 'Muito alto',
  veryLow: 'Muito baixo',
  above: 'Acima',
  below: 'Abaixo',
  within: 'Normal',
  recentCollections: 'Coletas recentes',
  fictionalResults: 'resultados',
  longitudinal: 'Acompanhamento longitudinal',
  viewHistory: 'Ver histórico de',
  historyFor: 'Histórico de resultados de',
  collectionOrder: 'Ordem das coletas',
  historyPoints: 'Pontos dos resultados',
  selectedExam: 'Resultado selecionado',
  collectionDate: 'Data da coleta',
  laboratory: 'Laboratório',
  openCollection: 'Abrir coleta',
  noHistory: 'Nenhum resultado histórico disponível',
  trendHeading: 'Evolução dos indicadores',
  trendText: 'Selecione um marcador e um exame para ver os detalhes da coleta.',
  marker: 'Marcador',
  selectMarker: 'Selecionar marcador',
  mostRecentResult: 'resultado mais recente',
  trendFor: 'Evolução de',
  medicalDisclaimer: 'Não substitui orientação médica. Comparações exigem unidades e métodos equivalentes.',
  collections: 'Coletas',
  collectionDetails: 'Detalhes da coleta',
  canonicalPdf: 'PDF original preservado',
  pdfNotAvailable: 'Esta coleta ainda não tem um PDF vinculado. O download será liberado com acesso autorizado ao arquivo original.',
  downloadUnavailable: 'Baixar original · indisponível',
  importHeading: 'Importação inteligente de laudos',
  integrations: 'Mantenha o laudo original vinculado a cada coleta, com acesso protegido.',
  inDevelopment: 'Em desenvolvimento',
  footer: 'BioFlow · Protótipo inicial · Sua história, seu controle.',
  trendSeparator: ': ',
  glucose: 'Glicose',
  hba1c: 'Hemoglobina glicada',
  creatinine: 'Creatinina',
  triglycerides: 'Triglicerídeos',
  hdl: 'Colesterol HDL',
  urea: 'Ureia',
  ldl: 'Colesterol LDL',
  totalCholesterol: 'Colesterol total',
  hemoglobin: 'Hemoglobina',
  labAurora: 'Laboratório Aurora',
  labHorizonte: 'Laboratório Horizonte',
  pageTitle: 'BioFlow | Histórico laboratorial',
  pageDescription: 'BioFlow — sua saúde, sua história, seu controle.'
};
export const translations: Record<Locale, Record<TranslationKey,string>> = {'en-US': en, 'pt-BR': pt};

const indicatorKeys = {
  glucose:'glucose',hba1c:'hba1c',creatinine:'creatinine',triglycerides:'triglycerides',hdl:'hdl',
  urea:'urea',ldl:'ldl',totalCholesterol:'totalCholesterol',hemoglobin:'hemoglobin'
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
export function useLocale() {
  const [locale,setLocale] = useState<Locale>('en-US');
  useEffect(()=>{
    document.documentElement.lang = locale;
    document.title = translations[locale].pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content',translations[locale].pageDescription);
  },[locale]);
  const changeLocale = (next:Locale)=>{
    setLocale(next);
  };
  return {locale,changeLocale,t: translations[locale]};
}

