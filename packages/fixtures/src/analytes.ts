/**
 * One vocabulary for every analyte.
 *
 * The extraction model names things as it likes: the same haemoglobin arrives as
 * "hb", "hemoglobin" or "Hemoglobina (Hb)"; glucose as "glucose", "glicemia_jejum"
 * or "Glicemia de Jejum". A chart matches a series by code alone, so an unstable
 * code does not merely look untidy — it silently creates an orphan line and the
 * new reading never joins the history it belongs to.
 *
 * Every reading is therefore resolved here, before validation, to exactly one
 * canonical code. Unknown analytes keep a slug derived from their name: a new
 * exam must still be stored, it simply starts its own series.
 */

export type Analyte = {
  /** Canonical code used by the history, the charts and the i18n labels. */
  code: string;
  /** Display name in Portuguese, used when a reading arrives unnamed. */
  name: string;
  /** Canonical unit, applied only when the reading uses a known variant. */
  unit: string;
  /** Slugs and spellings the model has produced for this analyte. */
  aliases: string[];
  /** Longer name fragments, matched only when no alias hits. */
  terms?: string[];
  /** Accepted spellings that all mean the canonical unit. */
  units?: string[];
};

/** Lowercase, unaccented, punctuation-free: "Colesterol - HDL" -> "colesterolhdl". */
export function normalizeKey(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

const ANALYTES: Analyte[] = [
  // ---- Série vermelha -------------------------------------------------------
  {code: 'rbc', name: 'Hemácias', unit: 'milhões/mm³',
   aliases: ['rbc', 'hemacias', 'eritrocitos', 'redbloodcells'], terms: ['hemacias', 'eritrocitos'],
   units: ['milhões/mm³', 'milhoes/mm3', 'milhoes/mm³', '10^6/mm3']},
  {code: 'hemoglobin', name: 'Hemoglobina', unit: 'g/dL',
   aliases: ['hb', 'hemoglobin', 'hemoglobina', 'hgb'], terms: ['hemoglobina', 'hemoglobin'],
   units: ['g/dL', 'g/dl', 'g%']},
  {code: 'hematocrit', name: 'Hematócrito', unit: '%',
   aliases: ['ht', 'hct', 'hematocrito', 'hematocrit'], terms: ['hematocrito', 'hematocrit'],
   units: ['%']},
  {code: 'mcv', name: 'VCM', unit: 'fL',
   aliases: ['vcm', 'mcv'], terms: ['vcm', 'volumecorpuscularmedio'], units: ['fL', 'fl']},
  {code: 'mch', name: 'HCM', unit: 'pg',
   aliases: ['hcm', 'mch'], terms: ['hcm'], units: ['pg']},
  {code: 'mchc', name: 'CHCM', unit: 'g/dL',
   aliases: ['chcm', 'mchc'], terms: ['chcm'], units: ['g/dL', 'g/dl']},
  {code: 'rdwCv', name: 'RDW (CV)', unit: '%',
   aliases: ['rdwcv', 'rdw'], terms: ['rdwcv', 'rdw'], units: ['%']},
  {code: 'rdwSd', name: 'RDW (SD)', unit: 'fL',
   aliases: ['rdwsd'], terms: ['rdwsd'], units: ['fL', 'fl']},

  // ---- Série branca e plaquetas --------------------------------------------
  {code: 'wbc', name: 'Leucócitos', unit: 'milhares/mm³',
   aliases: ['wbc', 'leucocitos', 'leukocytes', 'whitebloodcells'], terms: ['leucocitos', 'leukocytes'],
   units: ['milhares/mm³', 'milhares/mm3', '10^3/mm3']},
  {code: 'blasts', name: 'Blastos', unit: 'milhares/mm³',
   aliases: ['blasts', 'blastos'], terms: ['blastos', 'blasts']},
  {code: 'promyelocytes', name: 'Pro-mielócitos', unit: 'milhares/mm³',
   aliases: ['promyelocytes', 'promielocitos'], terms: ['promielocitos', 'promyelocytes']},
  {code: 'myelocytes', name: 'Mielócitos', unit: 'milhares/mm³',
   aliases: ['myelocytes', 'mielocitos'], terms: ['mielocitos', 'myelocytes']},
  {code: 'metamyelocytes', name: 'Metamielócitos', unit: 'milhares/mm³',
   aliases: ['metamyelocytes', 'metamielocitos'], terms: ['metamielocitos', 'metamyelocytes']},
  {code: 'neutrophilBands', name: 'Neutrófilos bastonetes', unit: '%',
   aliases: ['neutrofilosbastonetes', 'neutrophilband', 'neutrophilbands', 'bastonetes'],
   terms: ['neutrofilosbastonetes', 'neutrophilband'], units: ['%']},
  {code: 'neutrophilSegmented', name: 'Neutrófilos segmentados', unit: '%',
   aliases: ['neutrofilossegmentados', 'neutrophilseg', 'neutrophilsegmented', 'segmentados'],
   terms: ['neutrofilossegmentados', 'neutrophilsegment'], units: ['%']},
  {code: 'eosinophils', name: 'Eosinófilos', unit: '%',
   aliases: ['eosinofilos', 'eosinophils'], terms: ['eosinofilos', 'eosinophils'], units: ['%']},
  {code: 'basophils', name: 'Basófilos', unit: '%',
   aliases: ['basofilos', 'basophils'], terms: ['basofilos', 'basophils'], units: ['%']},
  {code: 'lymphocytesTypical', name: 'Linfócitos típicos', unit: '%',
   aliases: ['linfocitostipicos', 'lymphocytestypical', 'linfocitostipico'],
   terms: ['linfocitostipicos', 'lymphocytestypical'], units: ['%']},
  {code: 'lymphocytesAtypical', name: 'Linfócitos atípicos', unit: '%',
   aliases: ['linfocitosatipicos', 'lymphocytesatypical'],
   terms: ['linfocitosatipicos', 'lymphocytesatypical'], units: ['%']},
  {code: 'monocytes', name: 'Monócitos', unit: '%',
   aliases: ['monocitos', 'monocytes'], terms: ['monocitos', 'monocytes'], units: ['%']},
  {code: 'undifferentiatedCells', name: 'Células indiferenciadas', unit: '%',
   aliases: ['undifferentiatedcells', 'celulasindiferenciadas'],
   terms: ['celulasindiferenciadas', 'undifferentiatedcells'], units: ['%']},
  {code: 'nlr', name: 'Razão neutrófilos/linfócitos', unit: 'índice',
   aliases: ['nlr'], terms: ['razaoneutrofiloslinfocitos'], units: ['índice', 'indice', 'ratio']},
  {code: 'platelets', name: 'Plaquetas', unit: 'milhares/mm³',
   aliases: ['plaquetas', 'platelets', 'plt'], terms: ['plaquetas', 'platelets'],
   units: ['milhares/mm³', 'milhares/mm3', '10^3/mm3']},
  {code: 'mpv', name: 'MPV', unit: 'fL',
   aliases: ['mpv'], terms: ['mpv'], units: ['fL', 'fl']},

  // ---- Coagulação ----------------------------------------------------------
  {code: 'prothrombinTime', name: 'Tempo de protrombina', unit: 's',
   aliases: ['tp', 'prothrombintime', 'tempodeprotrombina'], terms: ['tempodeprotrombina', 'prothrombintime'],
   units: ['s', 'segundos', 'sec']},
  {code: 'inr', name: 'INR', unit: 'índice',
   aliases: ['inr'], terms: ['inr'], units: ['índice', 'indice', 'ratio']},
  {code: 'aptt', name: 'TTPa', unit: 's',
   aliases: ['ttpa', 'aptt', 'ttp'], terms: ['ttpa', 'aptt'], units: ['s', 'segundos', 'sec']},

  // ---- Glicídios -----------------------------------------------------------
  // Fasting plasma glucose is the same analyte the history calls "glucose";
  // the estimated average glucose (eAG) is a value *derived* from HbA1c and must
  // never be plotted as if it were a measurement.
  {code: 'glucose', name: 'Glicose', unit: 'mg/dL',
   aliases: ['glucose', 'glicose', 'glicemia', 'glicemiajejum', 'fastingglucose', 'fastingplasmaglucose'],
   terms: ['glicemiadejejum', 'glicose', 'glucose'], units: ['mg/dL', 'mg/dl']},
  {code: 'hba1c', name: 'Hemoglobina glicada', unit: '%',
   aliases: ['hba1c', 'hemoglobinaglicada', 'glicada', 'glycatedhemoglobin'],
   terms: ['hemoglobinaglicada', 'glicada', 'hba1c'], units: ['%']},
  {code: 'estimatedAverageGlucose', name: 'Glicemia média estimada', unit: 'mg/dL',
   aliases: ['gme', 'eag', 'estimatedaverageglucose', 'glicemiamediaestimada'],
   terms: ['glicemiamediaestimada', 'estimatedaverageglucose'], units: ['mg/dL', 'mg/dl']},
  {code: 'glucosePostMeal', name: 'Glicose pós-prandial', unit: 'mg/dL',
   aliases: ['glucosepostmeal', 'glicoseposprandial', 'glicemiaposprandial'],
   terms: ['glicoseposprandial', 'glucosepostmeal'], units: ['mg/dL', 'mg/dl']},

  // ---- Função renal --------------------------------------------------------
  {code: 'urea', name: 'Ureia', unit: 'mg/dL',
   aliases: ['urea', 'ureia'], terms: ['ureia', 'urea'], units: ['mg/dL', 'mg/dl']},
  {code: 'bun', name: 'Nitrogênio ureico', unit: 'mg/dL',
   aliases: ['bun', 'nitrogenoureico', 'bloodureanitrogen'], terms: ['nitrogenoureico', 'bloodureanitrogen'],
   units: ['mg/dL', 'mg/dl']},
  {code: 'creatinine', name: 'Creatinina', unit: 'mg/dL',
   aliases: ['creatinine', 'creatinina'], terms: ['creatinina', 'creatinine'],
   units: ['mg/dL', 'mg/dl']},
  {code: 'egfr', name: 'TFG estimada', unit: 'mL/min/1,73 m²',
   aliases: ['egfr', 'etfg', 'gfr', 'taxadefiltracaoglomerular'],
   terms: ['taxadefiltracaoglomerular', 'filtracaoglomerular', 'estimatedglomerular'],
   units: ['mL/min/1,73 m²', 'mL/min', 'ml/min', 'ml/min/1,73m2', 'mL/min/1.73m2']},
  {code: 'uricAcid', name: 'Ácido úrico', unit: 'mg/dL',
   aliases: ['uricacid', 'acidourico'], terms: ['acidourico', 'uricacid'], units: ['mg/dL', 'mg/dl']},

  // ---- Eletrólitos e minerais ---------------------------------------------
  {code: 'sodium', name: 'Sódio', unit: 'mEq/L',
   aliases: ['sodium', 'sodio'], terms: ['sodio', 'sodium'], units: ['mEq/L', 'meq/l', 'mmol/L']},
  {code: 'potassium', name: 'Potássio', unit: 'mEq/L',
   aliases: ['potassium', 'potassio'], terms: ['potassio', 'potassium'], units: ['mEq/L', 'meq/l', 'mmol/L']},
  {code: 'magnesium', name: 'Magnésio', unit: 'mg/dL',
   aliases: ['magnesium', 'magnesio'], terms: ['magnesio', 'magnesium'], units: ['mg/dL', 'mg/dl']},
  {code: 'calciumTotal', name: 'Cálcio total', unit: 'mg/dL',
   aliases: ['calciumtotal', 'calciosericototal', 'calcioserictotal', 'totalcalcium', 'calciototal', 'calcium'],
   terms: ['calciosericototal', 'calcioserictotal', 'calciototal', 'calciumtotal'], units: ['mg/dL', 'mg/dl']},
  {code: 'phosphorus', name: 'Fósforo', unit: 'mg/dL',
   aliases: ['phosphorus', 'fosforo'], terms: ['fosforo', 'phosphorus'], units: ['mg/dL', 'mg/dl']},
  {code: 'ionizedCalcium', name: 'Cálcio iônico', unit: 'mmol/L',
   aliases: ['ionizedcalcium', 'calcioionico'], terms: ['calcioionico', 'ionizedcalcium'],
   units: ['mmol/L', 'mg/dL']},

  // ---- Enzimas e fígado ---------------------------------------------------
  {code: 'ast', name: 'AST (TGO)', unit: 'U/L',
   aliases: ['ast', 'tgo', 'aspartatoaminotransferase'], terms: ['aspartatoaminotransferase', 'ast', 'tgo'],
   units: ['U/L', 'u/l']},
  {code: 'alt', name: 'ALT (TGP)', unit: 'U/L',
   aliases: ['alt', 'tgp', 'alaninaaminotransferase'], terms: ['alaninaaminotransferase', 'alt', 'tgp'],
   units: ['U/L', 'u/l']},
  {code: 'gammaGt', name: 'Gama GT', unit: 'U/L',
   aliases: ['gamagt', 'ggt', 'gama glutamil transferase', 'gamatransferase'],
   terms: ['gamaglutamiltransferase', 'gama glutamil'], units: ['U/L', 'u/l']},
  {code: 'alkalinePhosphatase', name: 'Fosfatase alcalina', unit: 'U/L',
   aliases: ['fosfatasealcalina', 'alkalinephosphatase', 'fal', 'alp'],
   terms: ['fosfatasealcalina', 'alkalinephosphatase'], units: ['U/L', 'u/l']},
  {code: 'bilirubinTotal', name: 'Bilirrubina total', unit: 'mg/dL',
   aliases: ['bilirrubinatotal', 'bilirubintotal'], terms: ['bilirrubinatotal'], units: ['mg/dL', 'mg/dl']},
  {code: 'bilirubinDirect', name: 'Bilirrubina direta', unit: 'mg/dL',
   aliases: ['bilirrubinadireta', 'bilirubindirect'], terms: ['bilirrubinadireta'], units: ['mg/dL', 'mg/dl']},
  {code: 'ck', name: 'Creatinofosfoquinase', unit: 'U/L',
   aliases: ['ck', 'cpk', 'creatinofosfoquinase'], terms: ['creatinofosfoquinase', 'creatinekinase'],
   units: ['U/L', 'u/l']},

  // ---- Lipídios ------------------------------------------------------------
  {code: 'totalCholesterol', name: 'Colesterol total', unit: 'mg/dL',
   aliases: ['colesteroltotal', 'totalcholesterol', 'cholesteroltotal'],
   terms: ['colesteroltotal', 'totalcholesterol'], units: ['mg/dL', 'mg/dl']},
  {code: 'hdl', name: 'Colesterol HDL', unit: 'mg/dL',
   aliases: ['hdl', 'colesterolhdl', 'hdlcholesterol'], terms: ['colesterolhdl', 'hdlcholesterol'],
   units: ['mg/dL', 'mg/dl']},
  {code: 'ldl', name: 'Colesterol LDL', unit: 'mg/dL',
   aliases: ['ldl', 'colesterolldl', 'ldlcholesterol'], terms: ['colesterolldl', 'ldlcholesterol'],
   units: ['mg/dL', 'mg/dl']},
  {code: 'vldl', name: 'Colesterol VLDL', unit: 'mg/dL',
   aliases: ['vldl', 'colesterolvldl'], terms: ['colesterolvldl'], units: ['mg/dL', 'mg/dl']},
  {code: 'nonHdl', name: 'Colesterol não-HDL', unit: 'mg/dL',
   aliases: ['nonhdl', 'nonhdlcholesterol', 'colesterolnaohdl'],
   terms: ['colesterolnaohdl', 'nonhdlcholesterol'], units: ['mg/dL', 'mg/dl']},
  {code: 'triglycerides', name: 'Triglicerídeos', unit: 'mg/dL',
   aliases: ['triglycerides', 'triglicerideos', 'triglicerides'],
   terms: ['triglicerideos', 'triglycerides'], units: ['mg/dL', 'mg/dl']},

  // ---- Tireoide, vitaminas, ferro -----------------------------------------
  {code: 'tsh', name: 'TSH', unit: 'microUI/mL',
   aliases: ['tsh', 'tshultrassensivel', 'tshultrasensivel', 'hormoniopitutario'],
   terms: ['tshultrassensivel', 'tireoestimulante'], units: ['microUI/mL', 'μUI/mL', 'uUI/mL', 'mUI/L']},
  {code: 't4Free', name: 'T4 livre', unit: 'ng/dL',
   aliases: ['t4livre', 't4free', 'freethyroxine'], terms: ['t4livre', 'freethyroxine'],
   units: ['ng/dL', 'ng/dl']},
  {code: 'vitaminB12', name: 'Vitamina B12', unit: 'pg/mL',
   aliases: ['vitaminb12', 'vitaminab12', 'cobalamina'], terms: ['vitaminab12', 'cobalamina'],
   units: ['pg/mL', 'pg/ml']},
  {code: 'folate', name: 'Ácido fólico', unit: 'ng/mL',
   aliases: ['folate', 'acidofolico', 'folicacid', 'vitaminab9'],
   terms: ['acidofolico', 'folicacid'], units: ['ng/mL', 'ng/ml']},
  {code: 'vitaminD', name: '25-hidroxivitamina D', unit: 'ng/mL',
   aliases: ['vitamind', 'vitaminad', 'vitamind25oh', 'vitamind25hydroxy', '25hidroxivitaminad'],
   terms: ['hidroxivitaminad', 'vitamind25'], units: ['ng/mL', 'ng/ml']},
  {code: 'ferritin', name: 'Ferritina', unit: 'ng/mL',
   aliases: ['ferritin', 'ferritina', 'ferritinaserica', 'serumferritin'],
   terms: ['ferritinaserica', 'ferritina'], units: ['ng/mL', 'ng/ml', 'µg/L']},
  {code: 'iron', name: 'Ferro sérico', unit: 'ug/dL',
   aliases: ['iron', 'ferro', 'ferroserico', 'feroserico', 'irondosage', 'dosagemdeferro'],
   terms: ['ferroserico', 'feroserico', 'dosagemdeferro', 'serumiron'], units: ['ug/dL', 'µg/dL', 'μg/dL']},

  // ---- Inflamação e outros ------------------------------------------------
  {code: 'crp', name: 'Proteína C reativa', unit: 'mg/L',
   aliases: ['crp', 'pcr', 'proteinacreativa'], terms: ['proteinacreativa'], units: ['mg/L', 'mg/l', 'mg/dL']},
  {code: 'psa', name: 'PSA total', unit: 'ng/mL',
   aliases: ['psa', 'psatotal'], terms: ['psatotal'], units: ['ng/mL', 'ng/ml']},

  // ---- Urina ---------------------------------------------------------------
  {code: 'urineDensity', name: 'Densidade urinária', unit: 'g/mL',
   aliases: ['densidade', 'densidadeurina', 'urinedensity'], terms: ['densidadeurinaria', 'densidade'],
   units: ['g/mL', 'g/ml']},
  {code: 'urinePh', name: 'pH urinário', unit: 'pH',
   aliases: ['ph', 'phurinario', 'urineph'], terms: ['phurinario'], units: ['pH', 'ph']},
  {code: 'urineLeukocytes', name: 'Leucócitos urinários', unit: '/campo',
   aliases: ['leucocitosurinarios', 'urineleukocytes'], terms: ['leucocitosurinarios'],
   units: ['/campo']},
  {code: 'urineErythrocytes', name: 'Hemácias urinárias', unit: '/campo',
   aliases: ['hemaciasurinarias', 'urineerythrocytes'], terms: ['hemaciasurinarias'],
   units: ['/campo']},
  {code: 'urineEpithelialCells', name: 'Células epiteliais', unit: '/campo',
   aliases: ['celulasepiteliais', 'urineepithelialcells'], terms: ['celulasepiteliais'],
   units: ['/campo']},
  {code: 'urineCrystals', name: 'Cristais', unit: '/campo',
   aliases: ['cristais', 'urinecrystals'], terms: ['cristais'], units: ['/campo']},
  {code: 'urineAlbumin', name: 'Albumina urinária', unit: 'μg/mL',
   aliases: ['urinaryalbumin', 'albuminuria', 'albuminurinaria'], terms: ['albuminurinaria'],
   units: ['μg/mL', 'ug/mL', 'µg/mL']},
  {code: 'urineCreatinine', name: 'Creatinina urinária', unit: 'mg/dL',
   aliases: ['urinarycreatinine', 'creatininaurinaria'], terms: ['creatininaurinaria'],
   units: ['mg/dL', 'mg/dl']},
  {code: 'albuminCreatinineRatio', name: 'Relação albumina/creatinina', unit: 'mg/g',
   aliases: ['rac', 'acr', 'albumincreatinineratio'], terms: ['relacaoalbuminacreatinina'],
   units: ['mg/g', 'mg/g creat', 'mg/g de creatinina']}
];

const byAlias = new Map<string, Analyte>();
const byCode = new Map<string, Analyte>();
/** Longest fragment first, so "hemoglobina glicada" beats "hemoglobina". */
const byTerm: {term: string; analyte: Analyte}[] = [];

for (const analyte of ANALYTES) {
  byCode.set(analyte.code, analyte);
  for (const alias of [analyte.code, ...analyte.aliases]) {
    const key = normalizeKey(alias);
    if (key && !byAlias.has(key)) byAlias.set(key, analyte);
  }
  for (const term of [analyte.code, ...(analyte.terms ?? [])]) {
    const key = normalizeKey(term);
    if (key) byTerm.push({term: key, analyte});
  }
}
byTerm.sort((a, b) => b.term.length - a.term.length);

/** The declared vocabulary, for prompts, tests and future UI lists. */
export const analyteVocabulary: readonly Analyte[] = ANALYTES;

export function analyteByCode(code: string): Analyte | undefined {
  return byCode.get(code);
}

/**
 * Resolve whatever the model called this analyte to a single canonical code.
 * Aliases win over name fragments; an unknown analyte keeps its own slug so a
 * brand-new exam is still stored instead of being discarded.
 */
export function canonicalCode(code: string, name: string): string {
  const direct = byAlias.get(normalizeKey(code));
  if (direct) return direct.code;
  const label = normalizeKey(name);
  if (label) {
    for (const {term, analyte} of byTerm) {
      if (label.includes(term)) return analyte.code;
    }
    const named = byAlias.get(label);
    if (named) return named.code;
  }
  return slug(code || name);
}

/** Stable short code from a label, so a missing "code" never costs us the reading. */
export function slug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

/**
 * Keep the unit the report printed unless it is a known spelling of the
 * canonical one. Relabelling g/L as g/dL would invent a number, so an
 * unexpected unit is preserved and left visible rather than "fixed".
 */
export function canonicalUnit(code: string, unit: string): string {
  const analyte = byCode.get(code);
  if (!analyte) return unit;
  const key = normalizeKey(unit);
  if (!key) return analyte.unit;
  const accepted = [analyte.unit, ...(analyte.units ?? [])];
  return accepted.some(candidate => normalizeKey(candidate) === key) ? analyte.unit : unit;
}

/** Canonical display name, only used when the model sent no usable name. */
export function canonicalName(code: string): string {
  return byCode.get(code)?.name ?? '';
}
