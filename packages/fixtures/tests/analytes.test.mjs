import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';

const {canonicalCode,canonicalUnit,canonicalName,normalizeKey,analyteVocabulary}=
  await testModule(new URL('../../../packages/fixtures/src/analytes.ts',import.meta.url),'analytes');

test('the same analyte arriving under different names lands on one code',()=>{
  // Every spelling below was produced by the real model on the three published
  // samples. One analyte, one series: the history matches readings by code alone.
  const groups={
    glucose:['glucose','glicemia_jejum','fasting_glucose','Glicose','Glicemia de Jejum'],
    hemoglobin:['hb','hemoglobin','hemoglobina','Hemoglobina (Hb)'],
    hdl:['hdl','colesterol_hdl','hdl_cholesterol','Colesterol - HDL'],
    ldl:['ldl','colesterol_ldl','ldl_cholesterol','Colesterol - LDL'],
    triglycerides:['triglycerides','triglicerideos','Triglicerídeos'],
    creatinine:['creatinine','creatinina','Dosagem de Creatinina'],
    ferritin:['ferritin','ferritina','ferritina_serica','serum_ferritin','Ferritina Sérica'],
    vitaminD:['vitamind','vitamina_d','vitamin_d_25_oh','vitamin_d_25_hydroxy'],
    vitaminB12:['vitamin_b12','vitamina_b12','cobalamina'],
    calciumTotal:['calcium_total','total_calcium','calcio_serico_total','Cálcio Sérico Total (CaT)'],
    iron:['iron','ferro','ferro_serico','iron_dosage','Dosagem de Ferro'],
    totalCholesterol:['total_cholesterol','colesterol_total','Dosagem de Colesterol Total'],
    tsh:['tsh','tsh_ultrassensivel','TSH Ultrassensível (Hormônio Tireoestimulante)'],
    wbc:['wbc','leucocitos','Leucócitos (WBC)'],
    platelets:['platelets','plaquetas','PLAQUETAS'],
    hematocrit:['ht','hct','hematocrito','Hematócrito (Ht)'],
    urea:['urea','ureia','Ureia'],
    uricAcid:['uric_acid','acido_urico','Dosagem de Ácido Úrico'],
    mcv:['vcm','mcv','VCM'],
    mch:['hcm','mch','HCM'],
    mchc:['chcm','mchc','CHCM']
  };
  for(const [expected,spellings] of Object.entries(groups)){
    for(const spelling of spellings){
      assert.equal(canonicalCode(spelling,spelling),expected,'"'+spelling+'" should resolve to '+expected);
    }
  }
});

test('a differential count is not collapsed into its parent panel',()=>{
  // A naive substring match on "neutrófilos" would swallow both the band and the
  // segmented count into one reading and lose the other. They stay distinct.
  assert.equal(canonicalCode('neutrophil_band','Neutrófilos Bastonetes'),'neutrophilBands');
  assert.equal(canonicalCode('neutrophil_seg','Neutrófilos Segmentados'),'neutrophilSegmented');
  assert.equal(canonicalCode('eosinofilos','Eosinófilos'),'eosinophils');
  assert.equal(canonicalCode('basofilos','Basófilos'),'basophils');
  assert.equal(canonicalCode('monocitos','Monócitos'),'monocytes');
  assert.equal(canonicalCode('lymphocytes_typical','Linfócitos típicos'),'lymphocytesTypical');
  assert.equal(canonicalCode('lymphocytes_atypical','Linfócitos atípicos'),'lymphocytesAtypical');
  const codes=['neutrophilBands','neutrophilSegmented','eosinophils','basophils','monocytes','lymphocytesTypical','lymphocytesAtypical'];
  assert.equal(new Set(codes).size,codes.length);
});

test('haemoglobin is never confused with glycated haemoglobin',()=>{
  // "hemoglobina glicada" contains "hemoglobina". The longer term must win, or the
  // chart would plot an HbA1c percentage as if it were a g/dL haemoglobin.
  assert.equal(canonicalCode('hba1c','Hemoglobina Glicada (HbA1c)'),'hba1c');
  assert.equal(canonicalCode('hemoglobina','Hemoglobina'),'hemoglobin');
  assert.equal(canonicalCode('','Hemoglobina glicada'),'hba1c');
  assert.equal(canonicalCode('','Hemoglobina'),'hemoglobin');
});

test('a derived value is not presented as a measurement',()=>{
  // The estimated average glucose is computed from HbA1c. It has its own code so it
  // never lands on the fasting-glucose series and distorts the trend.
  assert.equal(canonicalCode('gme','Glicemia MÉDIA Estimada (GME)'),'estimatedAverageGlucose');
  assert.notEqual(canonicalCode('gme','Glicemia MÉDIA Estimada (GME)'),'glucose');
});

test('an unknown analyte is kept, never dropped or forced onto a wrong series',()=>{
  assert.equal(canonicalCode('marcador_novo','Marcador Novo'),'marcador-novo');
  assert.equal(canonicalCode('','Marcador Novo'),'marcador-novo');
  assert.equal(canonicalCode('x',''),'x');
  // An unknown analyte keeps its own name and unit; nothing is invented.
  assert.equal(canonicalUnit('marcador-novo','UI/L'),'UI/L');
  assert.equal(canonicalName('marcador-novo'),'');
});

test('a known unit spelling is normalised, an unexpected one is preserved',()=>{
  assert.equal(canonicalUnit('glucose','mg/dl'),'mg/dL');
  assert.equal(canonicalUnit('glucose','mg/dL'),'mg/dL');
  assert.equal(canonicalUnit('hemoglobin','g/dl'),'g/dL');
  assert.equal(canonicalUnit('wbc','milhares/mm3'),'milhares/mm³');
  assert.equal(canonicalUnit('egfr','mL/min'),'mL/min/1,73 m²');
  assert.equal(canonicalUnit('tsh','μUI/mL'),'microUI/mL');
  // g/L is not g/dL. Relabelling it would invent a value ten times too small.
  assert.equal(canonicalUnit('hemoglobin','g/L'),'g/L');
  // A missing unit falls back to the vocabulary, never to an empty string.
  assert.equal(canonicalUnit('glucose',''),'mg/dL');
});

test('every canonical code and alias is unique',()=>{
  const codes=new Set(),aliases=new Map();
  for(const analyte of analyteVocabulary){
    assert.ok(!codes.has(analyte.code),'duplicate code '+analyte.code);
    codes.add(analyte.code);
    for(const alias of [analyte.code,...analyte.aliases]){
      const key=normalizeKey(alias);
      assert.ok(key.length>0,'empty alias on '+analyte.code);
      const owner=aliases.get(key);
      assert.ok(!owner||owner===analyte.code,'alias "'+alias+'" is claimed by '+owner+' and '+analyte.code);
      aliases.set(key,analyte.code);
    }
  }
  assert.ok(analyteVocabulary.length>=60,'the vocabulary must cover a full panel');
});

test('resolving a code is stable regardless of how the model spells it',()=>{
  // Idempotence matters: the commit path re-validates the stored report through the
  // same function, and a second pass must not rename anything.
  for(const analyte of analyteVocabulary){
    assert.equal(canonicalCode(analyte.code,analyte.name),analyte.code);
    assert.equal(canonicalCode(canonicalCode(analyte.code,analyte.name),analyte.name),analyte.code);
  }
});
