/**
 * Transcribe the haematology and urinalysis sections that the baseline PDFs carry
 * but the fixture never recorded.
 *
 * Two layouts exist in the corpus (2013-2015 and 2022-2025) and they disagree on
 * how a decimal looks: the older reports print "5.190" for 5.19 million red cells
 * while printing "5.760" for 5,760 white cells. The same shape means two different
 * magnitudes, so the reference interval decides: the reading is interpreted as the
 * candidate that falls inside the interval the report itself printed.
 *
 * Deterministic by design. No model is asked to read a value that is already
 * printed; a wrong number here would be worse than a missing one.
 */
import {execFileSync} from 'node:child_process';
import {readdirSync,writeFileSync} from 'node:fs';

const DIR='apps/web/public/demo';
const files=readdirSync(DIR).filter(f=>/^laudo-\d{4}-\d{2}-\d{2}\.pdf$/.test(f)).sort();

const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();

/** Split "5.190" / "4,010" / "2.440" into the two readings it could carry. */
function candidates(raw){
  const s=raw.replace(/\s|\u00a0/g,'');
  if(!/^-?[\d.,]+$/.test(s))return [];
  const dots=(s.match(/\./g)||[]).length,commas=(s.match(/,/g)||[]).length;
  if(dots&&commas){
    // Last separator is the decimal one.
    const lastDot=s.lastIndexOf('.'),lastComma=s.lastIndexOf(',');
    const dec=lastDot>lastComma?'.':',';
    const out=Number(s.split(dec==='.'?',':'.').join('').replace(dec,'.'));
    return Number.isFinite(out)?[out]:[];
  }
  if(dots===1){
    const plain=Number(s.replace('.',''));       // "5.190" -> 5190
    const decimal=Number(s);                      // "5.190" -> 5.19
    return [decimal,plain].filter(Number.isFinite);
  }
  if(commas===1){
    const decimal=Number(s.replace(',','.'));     // "4,010" -> 4.01
    const plain=Number(s.replace(',',''));        // "4,010" -> 4010
    return [decimal,plain].filter(Number.isFinite);
  }
  const n=Number(s);
  return Number.isFinite(n)?[n]:[];
}

/** First "a - b" or "a a b" pair on a line, as numbers. */
function interval(line){
  const m=/([\d.,]+)\s*(?:-|a|–|—)\s*([\d.,]+)/i.exec(line);
  if(!m)return null;
  const lo=candidates(m[1]),hi=candidates(m[2]);
  if(!lo.length||!hi.length)return null;
  const low=lo[0],high=hi[0];
  return high>low?[low,high]:null;
}

/** Pick the interpretation the report's own interval supports. */
function resolve(raw,range){
  const options=candidates(raw);
  if(!options.length)return undefined;
  if(options.length===1)return options[0];
  if(range){
    const [low,high]=range;
    const inside=options.find(v=>v>=low*0.98&&v<=high*1.02);
    if(inside!==undefined)return inside;
    const nearest=options.slice().sort((a,b)=>distance(a,low,high)-distance(b,low,high))[0];
    return nearest;
  }
  return options[0];
}
const distance=(v,low,high)=>v<low?low-v:v>high?v-high:0;

const HEMO=[
  {code:'rbc',label:/^hemacias( \(rbc\))?$|^hemacias em milhoes$/,name:'Hemácias',unit:'milhões/mm³',ref:'milhoes'},
  {code:'hemoglobin',label:/^hemoglobina( \(hb\))?$/,name:'Hemoglobina',unit:'g/dL'},
  {code:'hematocrit',label:/^hematocrito( \(ht\))?$/,name:'Hematócrito',unit:'%'},
  {code:'mcv',label:/^v\.?c\.?m\.?$/,name:'VCM',unit:'fL'},
  {code:'mch',label:/^h\.?c\.?m\.?$/,name:'HCM',unit:'pg'},
  {code:'mchc',label:/^c\.?h\.?c\.?m\.?$/,name:'CHCM',unit:'g/dL'},
  {code:'rdwCv',label:/^r\.?d\.?w\.?( \(cv\))?$/,name:'RDW (CV)',unit:'%'},
  {code:'rdwSd',label:/^r\.?d\.?w\.? \(sd\)$/,name:'RDW (SD)',unit:'fL'},
  {code:'wbc',label:/^leucocitos( \(wbc\))?$/,name:'Leucócitos',unit:'milhares/mm³',ref:'milhares'},
  {code:'blasts',label:/^blastos$/,name:'Blastos',unit:'%'},
  {code:'promyelocytes',label:/^pro-?mielocitos$/,name:'Pro-mielócitos',unit:'%'},
  {code:'myelocytes',label:/^mielocitos$/,name:'Mielócitos',unit:'%'},
  {code:'metamyelocytes',label:/^metamielocitos$/,name:'Metamielócitos',unit:'%'},
  {code:'neutrophilBands',label:/^n\.? ?bastoes$|^neutrofilos bastonetes$/,name:'Neutrófilos bastonetes',unit:'%'},
  {code:'neutrophilSegmented',label:/^n\.? ?segmentados$|^neutrofilos segmentados$/,name:'Neutrófilos segmentados',unit:'%'},
  {code:'eosinophils',label:/^eosinofilos$/,name:'Eosinófilos',unit:'%'},
  {code:'basophils',label:/^basofilos$/,name:'Basófilos',unit:'%'},
  {code:'lymphocytesTypical',label:/^linfocitos( tipicos)?$/,name:'Linfócitos típicos',unit:'%'},
  {code:'lymphocytesAtypical',label:/^linfocitos atipicos$/,name:'Linfócitos atípicos',unit:'%'},
  {code:'monocytes',label:/^monocitos$/,name:'Monócitos',unit:'%'},
  {code:'platelets',label:/^plaquetas:?$/,name:'Plaquetas',unit:'milhares/mm³',ref:'milhares'},
  {code:'mpv',label:/^mpv$/,name:'MPV',unit:'fL'}
];

const URINE=[
  {code:'urineDensity',label:/^densidade$/,name:'Densidade urinária',unit:'g/mL'},
  {code:'urinePh',label:/^ph$/,name:'pH urinário',unit:'pH'},
  {code:'urineProtein',label:/^proteinas$/,name:'Proteínas urinárias',unit:'mg/dL'},
  {code:'urineGlucose',label:/^glicose$/,name:'Glicose urinária',unit:'mg/dL'},
  {code:'urineKetones',label:/^corpos cetonicos$/,name:'Corpos cetônicos',unit:'mg/dL'},
  {code:'urineBilirubin',label:/^bilirrubinas$/,name:'Bilirrubinas urinárias',unit:'mg/dL'},
  {code:'urineUrobilinogen',label:/^urobilinogenio$/,name:'Urobilinogênio',unit:'mg/dL'},
  {code:'urineBlood',label:/^sangue \(hb\)$/,name:'Sangue urinário (Hb)',unit:'mg/dL'},
  {code:'urineErythrocytes',label:/^hemacias$/,name:'Hemácias urinárias',unit:'/uL'},
  {code:'urineLeukocytes',label:/^leucocitos$/,name:'Leucócitos urinários',unit:'/uL'},
  {code:'urineEpithelialCells',label:/^celulas epiteliais escamosas$/,name:'Células epiteliais escamosas',unit:'/uL'},
  {code:'albuminCreatinineRatio',label:/^relacao albumina\/creatinina/,name:'Relação albumina/creatinina',unit:'mg/g'}
];

const NOISE=/^(bioflow \||paciente ficticio|transcricao sem|interpretacao medica|dados declarados|material|metodo|valores de referencia|resultados|serie vermelha|serie branca|leucograma|relativo|absoluto|\(%\)|\(mm3\)|unidade|adultos|masculino|feminino|analise|analisador|contagem|metodo:|obs\.|fonte:|legenda)/i;

/** Read the quadruple that follows a label: value, unit, reference interval. */
function readAfter(lines,index){
  const value=lines[index+1]?.text??'';
  if(!candidates(value).length)return null;
  let unit='',range=null;
  for(let k=index+2;k<Math.min(index+6,lines.length);k++){
    const line=lines[k].text;
    if(!range){const found=interval(line);if(found)range=found;}
    if(!unit&&/[a-zA-Z%\/]/.test(line)&&!interval(line)&&line.length<24)unit=line;
    if(range&&unit)break;
  }
  return {value,unit,range,page:lines[index+1].page};
}

const result={};
for(const file of files){
  const date=file.slice(6,16);
  const text=execFileSync('pdftotext',['-layout',DIR+'/'+file,'-'],{encoding:'utf8',maxBuffer:1e8});
  // Keep the page each line came from. The fixture stores the page of the ORIGINAL
  // report, and the republished copy declares it on every page ("Página de origem
  // 1 de 14"); the physical page index of this PDF is not that number.
  // Republication added cover and separator pages that carry no declaration. Such a
  // page continues the original page before it, so the last declared number is
  // carried forward; using the physical index instead would point past the original
  // report and break the provenance the fixture promises.
  const lines=[];
  let lastOriginal=1;
  text.split('\f').forEach(page=>{
    const declared=/P[aá]gina de origem (\d+) de (\d+)/i.exec(page);
    if(declared)lastOriginal=Number(declared[1]);
    const original=lastOriginal;
    for(const raw of page.split('\n')){
      const line=raw.trim();
      if(line)lines.push({text:line,page:original});
    }
  });
  const flat=lines.map(l=>norm(l.text));
  const found=[];

  // Haematology comes before the urinalysis; stop at the urine section so that a
  // urine "Hemácias" line is never recorded as a red-cell count.
  const urineStart=flat.findIndex(l=>/elementos anormais|urina tipo i/.test(l));
  const hemoEnd=urineStart>=0?urineStart:flat.length;
  for(let i=0;i<hemoEnd;i++){
    const label=flat[i];
    if(!label||NOISE.test(label))continue;
    const spec=HEMO.find(h=>h.label.test(label));
    if(!spec)continue;
    const block=readAfter(lines,i);
    if(!block)continue;
    const range=block.range;
    let value=resolve(block.value,range);
    if(value===undefined)continue;
    // Old reports print white cells per mm3 ("5.760"); the fixture stores thousands.
    if(spec.ref==='milhares'&&value>100)value=value/1000;
    if(spec.ref==='milhoes'&&value>100)value=value/1e6;
    if(found.some(r=>r.code===spec.code))continue;
    found.push({code:spec.code,name:spec.name,value:Number(value.toFixed(3)),unit:spec.unit,sourcePage:block.page,
      ...(range?{referenceLow:range[0],referenceHigh:range[1]}:{})});
  }

  // Urinalysis: only the numeric lines carry a measurement; qualitative results
  // (Negativo, Ausente, Límpido) are skipped rather than coerced to zero.
  if(urineStart>=0){
    for(let i=urineStart;i<flat.length;i++){
      const label=flat[i];
      if(!label)continue;
      const spec=URINE.find(u=>u.label.test(label));
      if(!spec)continue;
      const block=readAfter(lines,i);
      if(!block)continue;
      const value=resolve(block.value,block.range);
      if(value===undefined)continue;
      if(found.some(r=>r.code===spec.code))continue;
      found.push({code:spec.code,name:spec.name,value,unit:spec.unit,sourcePage:block.page,
        ...(block.range?{referenceLow:block.range[0],referenceHigh:block.range[1]}:{})});
    }
  }

  if(found.length)result[date]=found;
  console.log(date.padEnd(12),String(found.length).padStart(3),'leituras |',
    found.map(r=>r.code+'='+r.value).join(' ').slice(0,110));
}
writeFileSync('packages/fixtures/src/extra-readings.json',JSON.stringify(result,null,1)+'\n');
console.log('\ndatas:',Object.keys(result).length,'| leituras:',Object.values(result).reduce((a,b)=>a+b.length,0));
