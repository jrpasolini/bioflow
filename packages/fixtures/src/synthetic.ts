/** All people, measurements and laboratory names here are entirely fictional. */
export type Indicator = {
  code: string; name: string; value: number; unit: string;
  referenceLow?: number; referenceHigh?: number;
  /** Optional explicit attention interval from this exam, never inferred from proximity. */
  referenceAttentionLow?: number; referenceAttentionHigh?: number;
  /** Inclusive limits explicitly supplied by this exam for very low/high values. */
  referenceVeryLow?: number; referenceVeryHigh?: number;
  /** Page in the supplied fictional source PDF. */
  sourcePage?: number;
};
export type LabReport = {
  id: string; patientId: string; collectedAt: string;
  laboratory: string; status: 'synthetic-demo'; isSynthetic: true;
  originalPdfId: null; results: Indicator[];
};
export const demoPatient = {
  id: 'demo-walter-white', displayName: 'Walter White', isSynthetic: true,
  dateOfBirth: '1962-04-01', demoRecordId: 'BF-DEMO-001',
  description: 'Pessoa fictícia criada para demonstração; não representa um paciente real.'
} as const;
export const demoReports: LabReport[] = [
  {
    "id": "bf-demo-2013-07-13",
    "patientId": "demo-walter-white",
    "collectedAt": "2013-07-13",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 130,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 32,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 179,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 160,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 41,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.43,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 6.5,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 25,
        "unit": "U/L",
        "sourcePage": 5
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 32,
        "unit": "U/L",
        "sourcePage": 6
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 114,
        "unit": "U/L",
        "sourcePage": 6
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 7.1,
        "unit": "%",
        "sourcePage": 7
      }
    ]
  },
  {
    "id": "bf-demo-2013-11-25",
    "patientId": "demo-walter-white",
    "collectedAt": "2013-11-25",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 15.4,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 143,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "glucosePostMeal",
        "name": "Glicose pós-prandial",
        "value": 87,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 168,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 41,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 183,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 30,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.33,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.2,
        "unit": "mEq/L",
        "sourcePage": 8
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 6.2,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 36,
        "unit": "U/L",
        "sourcePage": 9
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 83,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 130,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.6,
        "unit": "%",
        "sourcePage": 13
      },
      {
        "code": "tsh",
        "name": "TSH ultrassensível",
        "value": 1.63,
        "unit": "microUI/mL",
        "sourcePage": 14
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 5.19,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 46.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 90.2,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 29.7,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 32.9,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 13.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 5.76,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 423,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 42,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 89,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 45,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.161,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2014-09-11",
    "patientId": "demo-walter-white",
    "collectedAt": "2014-09-11",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 158,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "glucosePostMeal",
        "name": "Glicose pós-prandial",
        "value": 154,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 39,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.19,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.3,
        "unit": "mEq/L",
        "sourcePage": 4
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 29,
        "unit": "U/L",
        "sourcePage": 5
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 48,
        "unit": "U/L",
        "sourcePage": 6
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 114,
        "unit": "U/L",
        "sourcePage": 7
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.8,
        "unit": "%",
        "sourcePage": 8
      }
    ]
  },
  {
    "id": "bf-demo-2014-12-15",
    "patientId": "demo-walter-white",
    "collectedAt": "2014-12-15",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 15,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 150,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "glucosePostMeal",
        "name": "Glicose pós-prandial",
        "value": 138,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 103,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 144,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 41,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 204,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 32,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.41,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.7,
        "unit": "mEq/L",
        "sourcePage": 9
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 6.7,
        "unit": "mg/dL",
        "sourcePage": 10
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 33,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 68,
        "unit": "U/L",
        "sourcePage": 12
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 219,
        "unit": "U/L",
        "sourcePage": 13
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.5,
        "unit": "%",
        "sourcePage": 15
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 5.05,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 43.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 86.7,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 29.7,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 34.2,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 12.9,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 5.52,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 459,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 34,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 0.7,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 82,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 42,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.151,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2015-06-02",
    "patientId": "demo-walter-white",
    "collectedAt": "2015-06-02",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 145,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "glucosePostMeal",
        "name": "Glicose pós-prandial",
        "value": 216,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 143,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 186,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 43,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 123,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 26,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.21,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 5.3,
        "unit": "mg/dL",
        "sourcePage": 9
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 24,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 32,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 7,
        "unit": "%",
        "sourcePage": 12
      }
    ]
  },
  {
    "id": "bf-demo-2015-07-20",
    "patientId": "demo-walter-white",
    "collectedAt": "2015-07-20",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 15.9,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 115,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 152,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 194,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 42,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 146,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 41,
        "unit": "mg/dL",
        "sourcePage": 9
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.21,
        "unit": "mg/dL",
        "sourcePage": 10
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.1,
        "unit": "mEq/L",
        "sourcePage": 11
      },
      {
        "code": "sodium",
        "name": "Sódio",
        "value": 144,
        "unit": "mEq/L",
        "sourcePage": 11
      },
      {
        "code": "ionizedCalcium",
        "name": "Cálcio iônico",
        "value": 1.31,
        "unit": "mmol/L",
        "sourcePage": 12
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 6.1,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "magnesium",
        "name": "Magnésio",
        "value": 2,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 26,
        "unit": "U/L",
        "sourcePage": 14
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 36,
        "unit": "U/L",
        "sourcePage": 15
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 91,
        "unit": "U/L",
        "sourcePage": 16
      },
      {
        "code": "gammaGt",
        "name": "Gama GT",
        "value": 27,
        "unit": "U/L",
        "sourcePage": 16
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.3,
        "unit": "%",
        "sourcePage": 25
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 5.29,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 45.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 86.6,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 30.1,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 34.7,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 13.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 6.43,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 523,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 23,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 0.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 70,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 38,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.171,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2022-04-12",
    "patientId": "demo-walter-white",
    "collectedAt": "2022-04-12",
    "laboratory": "Labortel (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 107,
        "unit": "mg/dL",
        "sourcePage": 1
      }
    ]
  },
  {
    "id": "bf-demo-2022-06-20",
    "patientId": "demo-walter-white",
    "collectedAt": "2022-06-20",
    "laboratory": "Labortel (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 12,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 138,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 7.3,
        "unit": "%",
        "sourcePage": 3
      },
      {
        "code": "bun",
        "name": "Nitrogênio ureico",
        "value": 20.6,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 44,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.3,
        "unit": "mEq/L",
        "sourcePage": 5
      },
      {
        "code": "sodium",
        "name": "Sódio",
        "value": 141,
        "unit": "mEq/L",
        "sourcePage": 5
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 112,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 27,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 85,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 62,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 150,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.01,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.5,
        "referenceHigh": 5.9
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 36,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 41,
        "referenceHigh": 53
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 89.78,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 80,
        "referenceHigh": 98
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 29.93,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 27,
        "referenceHigh": 32
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 33.33,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 35
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 13.2,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.5,
        "referenceHigh": 14.5
      },
      {
        "code": "rdwSd",
        "name": "RDW (SD)",
        "value": 43.4,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 38.6,
        "referenceHigh": 49.1
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 5.93,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 5,
        "referenceHigh": 10
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 45.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 35,
        "referenceHigh": 75
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 3.4,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 1.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 1
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 35.9,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 20,
        "referenceHigh": 50
      },
      {
        "code": "lymphocytesAtypical",
        "name": "Linfócitos atípicos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 10.6,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 2,
        "referenceHigh": 10
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.162,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 140,
        "referenceHigh": 400
      },
      {
        "code": "urineDensity",
        "name": "Densidade urinária",
        "value": 1.015,
        "unit": "g/mL",
        "sourcePage": 8,
        "referenceLow": 1.015,
        "referenceHigh": 1.025
      },
      {
        "code": "urinePh",
        "name": "pH urinário",
        "value": 6.5,
        "unit": "pH",
        "sourcePage": 8,
        "referenceLow": 5,
        "referenceHigh": 7.5
      },
      {
        "code": "albuminCreatinineRatio",
        "name": "Relação albumina/creatinina",
        "value": 0,
        "unit": "mg/g",
        "sourcePage": 8
      },
      {
        "code": "urineProtein",
        "name": "Proteínas urinárias",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "urineGlucose",
        "name": "Glicose urinária",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "urineKetones",
        "name": "Corpos cetônicos",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "urineBilirubin",
        "name": "Bilirrubinas urinárias",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "urineUrobilinogen",
        "name": "Urobilinogênio",
        "value": 1.4,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "urineEpithelialCells",
        "name": "Células epiteliais escamosas",
        "value": 0,
        "unit": "/uL",
        "sourcePage": 8
      },
      {
        "code": "undifferentiatedCells",
        "name": "Células indiferenciadas",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      }
    ]
  },
  {
    "id": "bf-demo-2022-08-09",
    "patientId": "demo-walter-white",
    "collectedAt": "2022-08-09",
    "laboratory": "Labortel (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 13.4,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "ferritin",
        "name": "Ferritina",
        "value": 22.7,
        "unit": "ng/mL",
        "sourcePage": 2
      },
      {
        "code": "iron",
        "name": "Ferro",
        "value": 73,
        "unit": "ug/dL",
        "sourcePage": 2
      },
      {
        "code": "vitaminB12",
        "name": "Vitamina B12",
        "value": 288,
        "unit": "pg/mL",
        "sourcePage": 4
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.43,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.5,
        "referenceHigh": 5.9
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 39.4,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 41,
        "referenceHigh": 53
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 88.94,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 80,
        "referenceHigh": 98
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 30.25,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 27,
        "referenceHigh": 32
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 34.01,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 35
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 13.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.5,
        "referenceHigh": 14.5
      },
      {
        "code": "rdwSd",
        "name": "RDW (SD)",
        "value": 43.4,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 38.6,
        "referenceHigh": 49.1
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 5.53,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 5,
        "referenceHigh": 10
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 2,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 42.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 35,
        "referenceHigh": 75
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 3.1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 1.1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 1
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 40.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 20,
        "referenceHigh": 50
      },
      {
        "code": "lymphocytesAtypical",
        "name": "Linfócitos atípicos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 11.2,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 2,
        "referenceHigh": 10
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.2,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 140,
        "referenceHigh": 400
      },
      {
        "code": "undifferentiatedCells",
        "name": "Células indiferenciadas",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      }
    ]
  },
  {
    "id": "bf-demo-2022-08-24",
    "patientId": "demo-walter-white",
    "collectedAt": "2022-08-24",
    "laboratory": "Labortel (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": []
  },
  {
    "id": "bf-demo-2022-11-11",
    "patientId": "demo-walter-white",
    "collectedAt": "2022-11-11",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 13.7,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.44,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 39,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 87.8,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 30.9,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 35.1,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 13.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 6.3,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 460,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 20,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 80,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 43,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.182,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2022-11-19",
    "patientId": "demo-walter-white",
    "collectedAt": "2022-11-19",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": []
  },
  {
    "id": "bf-demo-2022-12-09",
    "patientId": "demo-walter-white",
    "collectedAt": "2022-12-09",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 168,
        "unit": "mg/dL",
        "sourcePage": 2
      }
    ]
  },
  {
    "id": "bf-demo-2023-06-23",
    "patientId": "demo-walter-white",
    "collectedAt": "2023-06-23",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 14.1,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 35,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.3,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.7,
        "unit": "mEq/L",
        "sourcePage": 4
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 6.8,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 45,
        "unit": "U/L",
        "sourcePage": 5
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 91,
        "unit": "U/L",
        "sourcePage": 5
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 143,
        "unit": "U/L",
        "sourcePage": 6
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.68,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 40.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 86.1,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 30.1,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 35,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 13.6,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 8.2,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 530,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 20,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 80,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 36,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.22,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2023-09-05",
    "patientId": "demo-walter-white",
    "collectedAt": "2023-09-05",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 99,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 168,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 34,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 163,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.56,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.4,
        "unit": "mEq/L",
        "sourcePage": 7
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 7.6,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 33,
        "unit": "U/L",
        "sourcePage": 9
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 48,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 158,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.4,
        "unit": "%",
        "sourcePage": 12
      }
    ]
  },
  {
    "id": "bf-demo-2024-01-22",
    "patientId": "demo-walter-white",
    "collectedAt": "2024-01-22",
    "laboratory": "Labortel (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 13.4,
        "unit": "g/dL",
        "sourcePage": 2
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 73,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.6,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "bun",
        "name": "Nitrogênio ureico",
        "value": 25.2,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 54,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "vitaminD",
        "name": "25-hidroxivitamina D",
        "value": 21.3,
        "unit": "ng/mL",
        "sourcePage": 7
      },
      {
        "code": "vitaminB12",
        "name": "Vitamina B12",
        "value": 443,
        "unit": "pg/mL",
        "sourcePage": 8
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 154,
        "unit": "mg/dL",
        "sourcePage": 9
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 36,
        "unit": "mg/dL",
        "sourcePage": 10
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 118,
        "unit": "mg/dL",
        "sourcePage": 10
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 98,
        "unit": "mg/dL",
        "sourcePage": 12
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 104,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.45,
        "unit": "milhões/mm³",
        "sourcePage": 2,
        "referenceLow": 4.5,
        "referenceHigh": 5.9
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 39.2,
        "unit": "%",
        "sourcePage": 2,
        "referenceLow": 41,
        "referenceHigh": 53
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 88.09,
        "unit": "fL",
        "sourcePage": 2,
        "referenceLow": 80,
        "referenceHigh": 98
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 30.11,
        "unit": "pg",
        "sourcePage": 2,
        "referenceLow": 27,
        "referenceHigh": 32
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 34.18,
        "unit": "g/dL",
        "sourcePage": 2,
        "referenceLow": 31,
        "referenceHigh": 35
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 13.9,
        "unit": "%",
        "sourcePage": 2,
        "referenceLow": 11.5,
        "referenceHigh": 14.5
      },
      {
        "code": "rdwSd",
        "name": "RDW (SD)",
        "value": 44.7,
        "unit": "fL",
        "sourcePage": 2,
        "referenceLow": 38.6,
        "referenceHigh": 49.1
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 6.3,
        "unit": "milhares/mm³",
        "sourcePage": 2,
        "referenceLow": 5,
        "referenceHigh": 10
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 2
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 2
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 2
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 2
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 1,
        "unit": "%",
        "sourcePage": 2,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 45.5,
        "unit": "%",
        "sourcePage": 2,
        "referenceLow": 35,
        "referenceHigh": 75
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 3,
        "unit": "%",
        "sourcePage": 2,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 0.5,
        "unit": "%",
        "sourcePage": 2,
        "referenceLow": 0,
        "referenceHigh": 1
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 42.9,
        "unit": "%",
        "sourcePage": 2,
        "referenceLow": 20,
        "referenceHigh": 50
      },
      {
        "code": "lymphocytesAtypical",
        "name": "Linfócitos atípicos",
        "value": 0,
        "unit": "%",
        "sourcePage": 2
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 7.1,
        "unit": "%",
        "sourcePage": 2,
        "referenceLow": 2,
        "referenceHigh": 10
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.222,
        "unit": "milhares/mm³",
        "sourcePage": 2,
        "referenceLow": 140,
        "referenceHigh": 400
      },
      {
        "code": "urineDensity",
        "name": "Densidade urinária",
        "value": 1.017,
        "unit": "g/mL",
        "sourcePage": 17,
        "referenceLow": 1.015,
        "referenceHigh": 1.025
      },
      {
        "code": "urinePh",
        "name": "pH urinário",
        "value": 5.5,
        "unit": "pH",
        "sourcePage": 17,
        "referenceLow": 5,
        "referenceHigh": 7.5
      },
      {
        "code": "albuminCreatinineRatio",
        "name": "Relação albumina/creatinina",
        "value": 0,
        "unit": "mg/g",
        "sourcePage": 17
      },
      {
        "code": "urineProtein",
        "name": "Proteínas urinárias",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 17
      },
      {
        "code": "urineGlucose",
        "name": "Glicose urinária",
        "value": 500,
        "unit": "mg/dL",
        "sourcePage": 17
      },
      {
        "code": "urineKetones",
        "name": "Corpos cetônicos",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 17
      },
      {
        "code": "urineBilirubin",
        "name": "Bilirrubinas urinárias",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 17
      },
      {
        "code": "urineUrobilinogen",
        "name": "Urobilinogênio",
        "value": 1.4,
        "unit": "mg/dL",
        "sourcePage": 17
      },
      {
        "code": "urineBlood",
        "name": "Sangue urinário (Hb)",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 17
      },
      {
        "code": "urineErythrocytes",
        "name": "Hemácias urinárias",
        "value": 1,
        "unit": "/uL",
        "sourcePage": 17
      },
      {
        "code": "urineLeukocytes",
        "name": "Leucócitos urinários",
        "value": 3,
        "unit": "/uL",
        "sourcePage": 17
      },
      {
        "code": "urineEpithelialCells",
        "name": "Células epiteliais escamosas",
        "value": 0,
        "unit": "/uL",
        "sourcePage": 17
      },
      {
        "code": "undifferentiatedCells",
        "name": "Células indiferenciadas",
        "value": 0,
        "unit": "%",
        "sourcePage": 2
      },
      {
        "code": "nlr",
        "name": "Razão neutrófilos/linfócitos",
        "value": 1.08,
        "unit": "índice",
        "sourcePage": 2,
        "referenceLow": 1,
        "referenceHigh": 3
      },
      {
        "code": "egfr",
        "name": "TFG estimada",
        "value": 48.7,
        "unit": "mL/min/1,73 m²",
        "sourcePage": 4
      },
      {
        "code": "psa",
        "name": "PSA total",
        "value": 0.45,
        "unit": "ng/mL",
        "sourcePage": 16
      }
    ]
  },
  {
    "id": "bf-demo-2024-03-12",
    "patientId": "demo-walter-white",
    "collectedAt": "2024-03-12",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 67,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 199,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 34,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 213,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.48,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 3.9,
        "unit": "mEq/L",
        "sourcePage": 7
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 5.9,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 27,
        "unit": "U/L",
        "sourcePage": 9
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 51,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 122,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.5,
        "unit": "%",
        "sourcePage": 12
      }
    ]
  },
  {
    "id": "bf-demo-2024-06-19",
    "patientId": "demo-walter-white",
    "collectedAt": "2024-06-19",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 14.6,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 71,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 142,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 37,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 73,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "vldl",
        "name": "Colesterol VLDL",
        "value": 32,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 218,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.51,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.2,
        "unit": "mEq/L",
        "sourcePage": 10
      },
      {
        "code": "sodium",
        "name": "Sódio",
        "value": 137,
        "unit": "mEq/L",
        "sourcePage": 10
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 5.3,
        "unit": "mg/dL",
        "sourcePage": 11
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.6,
        "unit": "%",
        "sourcePage": 12
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 5.28,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 42.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 81.1,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 27.7,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 34.1,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 15.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 8.8,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 490,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 30,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 100,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 38,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.205,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2024-07-25",
    "patientId": "demo-walter-white",
    "collectedAt": "2024-07-25",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 13.7,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 102,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 155,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 36,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 241,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 65,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.7,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.3,
        "unit": "mEq/L",
        "sourcePage": 8
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 8.3,
        "unit": "mg/dL",
        "sourcePage": 9
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 20,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 27,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 203,
        "unit": "U/L",
        "sourcePage": 12
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 7,
        "unit": "%",
        "sourcePage": 13
      },
      {
        "code": "tsh",
        "name": "TSH ultrassensível",
        "value": 1.26,
        "unit": "microUI/mL",
        "sourcePage": 14
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.84,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 40.1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 82.9,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 28.3,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 34.2,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 17.1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 6.7,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 370,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 30,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 80,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 51,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.178,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2024-08-23",
    "patientId": "demo-walter-white",
    "collectedAt": "2024-08-23",
    "laboratory": "Labortel (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 12.6,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "ferritin",
        "name": "Ferritina",
        "value": 8.4,
        "unit": "ng/mL",
        "sourcePage": 2
      },
      {
        "code": "folate",
        "name": "Ácido fólico",
        "value": 16.8,
        "unit": "ng/mL",
        "sourcePage": 2
      },
      {
        "code": "iron",
        "name": "Ferro",
        "value": 38,
        "unit": "ug/dL",
        "sourcePage": 3
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 69,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.78,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "bun",
        "name": "Nitrogênio ureico",
        "value": 21.5,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 46,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "calciumTotal",
        "name": "Cálcio total",
        "value": 9.2,
        "unit": "mg/dL",
        "sourcePage": 9
      },
      {
        "code": "vitaminD",
        "name": "25-hidroxivitamina D",
        "value": 19.6,
        "unit": "ng/mL",
        "sourcePage": 10
      },
      {
        "code": "vitaminB12",
        "name": "Vitamina B12",
        "value": 444,
        "unit": "pg/mL",
        "sourcePage": 11
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 113,
        "unit": "mg/dL",
        "sourcePage": 12
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 43,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 70,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 55,
        "unit": "mg/dL",
        "sourcePage": 15
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 71,
        "unit": "mg/dL",
        "sourcePage": 16
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.44,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.5,
        "referenceHigh": 5.9
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 38.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 41,
        "referenceHigh": 53
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 86.26,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 80,
        "referenceHigh": 98
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 28.38,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 27,
        "referenceHigh": 32
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 32.9,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 35
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 17.2,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.5,
        "referenceHigh": 14.5
      },
      {
        "code": "rdwSd",
        "name": "RDW (SD)",
        "value": 53.4,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 38.6,
        "referenceHigh": 49.1
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 7.29,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 5,
        "referenceHigh": 10
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 59.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 35,
        "referenceHigh": 75
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 0.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 0.7,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 1
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 26.9,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 20,
        "referenceHigh": 50
      },
      {
        "code": "lymphocytesAtypical",
        "name": "Linfócitos atípicos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 8.8,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 2,
        "referenceHigh": 10
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.198,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 140,
        "referenceHigh": 400
      },
      {
        "code": "urineDensity",
        "name": "Densidade urinária",
        "value": 1.016,
        "unit": "g/mL",
        "sourcePage": 18,
        "referenceLow": 1.015,
        "referenceHigh": 1.025
      },
      {
        "code": "urinePh",
        "name": "pH urinário",
        "value": 5.5,
        "unit": "pH",
        "sourcePage": 18,
        "referenceLow": 5,
        "referenceHigh": 7.5
      },
      {
        "code": "albuminCreatinineRatio",
        "name": "Relação albumina/creatinina",
        "value": 0,
        "unit": "mg/g",
        "sourcePage": 18
      },
      {
        "code": "urineProtein",
        "name": "Proteínas urinárias",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 18
      },
      {
        "code": "urineGlucose",
        "name": "Glicose urinária",
        "value": 100,
        "unit": "mg/dL",
        "sourcePage": 18
      },
      {
        "code": "urineKetones",
        "name": "Corpos cetônicos",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 18
      },
      {
        "code": "urineBilirubin",
        "name": "Bilirrubinas urinárias",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 18
      },
      {
        "code": "urineUrobilinogen",
        "name": "Urobilinogênio",
        "value": 1.4,
        "unit": "mg/dL",
        "sourcePage": 18
      },
      {
        "code": "urineBlood",
        "name": "Sangue urinário (Hb)",
        "value": 0.01,
        "unit": "mg/dL",
        "sourcePage": 18
      },
      {
        "code": "urineErythrocytes",
        "name": "Hemácias urinárias",
        "value": 3,
        "unit": "/uL",
        "sourcePage": 18
      },
      {
        "code": "urineLeukocytes",
        "name": "Leucócitos urinários",
        "value": 1,
        "unit": "/uL",
        "sourcePage": 18
      },
      {
        "code": "urineEpithelialCells",
        "name": "Células epiteliais escamosas",
        "value": 0,
        "unit": "/uL",
        "sourcePage": 18
      },
      {
        "code": "undifferentiatedCells",
        "name": "Células indiferenciadas",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "nlr",
        "name": "Razão neutrófilos/linfócitos",
        "value": 2.33,
        "unit": "índice",
        "sourcePage": 1,
        "referenceLow": 1,
        "referenceHigh": 3
      },
      {
        "code": "egfr",
        "name": "TFG estimada",
        "value": 42.6,
        "unit": "mL/min/1,73 m²",
        "sourcePage": 5
      }
    ]
  },
  {
    "id": "bf-demo-2024-11-25",
    "patientId": "demo-walter-white",
    "collectedAt": "2024-11-25",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 14.3,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 106,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 122,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 38,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 193,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 42,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.6,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.3,
        "unit": "mEq/L",
        "sourcePage": 8
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 5.9,
        "unit": "mg/dL",
        "sourcePage": 9
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 32,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 47,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 159,
        "unit": "U/L",
        "sourcePage": 12
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 7.4,
        "unit": "%",
        "sourcePage": 13
      },
      {
        "code": "tsh",
        "name": "TSH ultrassensível",
        "value": 1.65,
        "unit": "microUI/mL",
        "sourcePage": 14
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.77,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 41.9,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 87.8,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 30,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 34.1,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 14.9,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 6.1,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 510,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 30,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 100,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 35,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.164,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2025-03-06",
    "patientId": "demo-walter-white",
    "collectedAt": "2025-03-06",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 79,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 51,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.7,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.4,
        "unit": "mEq/L",
        "sourcePage": 4
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 6.8,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 7.6,
        "unit": "%",
        "sourcePage": 6
      },
      {
        "code": "vitaminD",
        "name": "25-hidroxivitamina D",
        "value": 18.1,
        "unit": "ng/mL",
        "sourcePage": 7
      },
      {
        "code": "vitaminB12",
        "name": "Vitamina B12",
        "value": 1083,
        "unit": "pg/mL",
        "sourcePage": 7
      }
    ]
  },
  {
    "id": "bf-demo-2025-03-20",
    "patientId": "demo-walter-white",
    "collectedAt": "2025-03-20",
    "laboratory": "Labortel (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "ferritin",
        "name": "Ferritina",
        "value": 27.8,
        "unit": "ng/mL",
        "sourcePage": 2
      },
      {
        "code": "folate",
        "name": "Ácido fólico",
        "value": 16.2,
        "unit": "ng/mL",
        "sourcePage": 3
      },
      {
        "code": "iron",
        "name": "Ferro",
        "value": 71,
        "unit": "ug/dL",
        "sourcePage": 3
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 147,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.66,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "bun",
        "name": "Nitrogênio ureico",
        "value": 27.1,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 58,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "calciumTotal",
        "name": "Cálcio total",
        "value": 9.1,
        "unit": "mg/dL",
        "sourcePage": 10
      },
      {
        "code": "vitaminD",
        "name": "25-hidroxivitamina D",
        "value": 17.6,
        "unit": "ng/mL",
        "sourcePage": 11
      },
      {
        "code": "vitaminB12",
        "name": "Vitamina B12",
        "value": 768,
        "unit": "pg/mL",
        "sourcePage": 12
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 99,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 35,
        "unit": "mg/dL",
        "sourcePage": 14
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 64,
        "unit": "mg/dL",
        "sourcePage": 14
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 43,
        "unit": "mg/dL",
        "sourcePage": 16
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 125,
        "unit": "mg/dL",
        "sourcePage": 17
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.68,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.5,
        "referenceHigh": 5.9
      },
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 14.2,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 13.5,
        "referenceHigh": 17.5
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 43.6,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 41,
        "referenceHigh": 53
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 93.16,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 80,
        "referenceHigh": 98
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 30.34,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 27,
        "referenceHigh": 32
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 32.57,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 35
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 13.7,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.5,
        "referenceHigh": 14.5
      },
      {
        "code": "rdwSd",
        "name": "RDW (SD)",
        "value": 46.8,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 38.6,
        "referenceHigh": 49.1
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 7.02,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 5,
        "referenceHigh": 10
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 2,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 50.7,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 35,
        "referenceHigh": 75
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 2.4,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 3
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 0.6,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 1
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 35.6,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 20,
        "referenceHigh": 50
      },
      {
        "code": "lymphocytesAtypical",
        "name": "Linfócitos atípicos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 8.7,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 2,
        "referenceHigh": 10
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.186,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 140,
        "referenceHigh": 400
      },
      {
        "code": "mpv",
        "name": "MPV",
        "value": 11.6,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 7.5,
        "referenceHigh": 11.5
      },
      {
        "code": "urineDensity",
        "name": "Densidade urinária",
        "value": 1.027,
        "unit": "g/mL",
        "sourcePage": 20,
        "referenceLow": 1.015,
        "referenceHigh": 1.025
      },
      {
        "code": "urinePh",
        "name": "pH urinário",
        "value": 5.5,
        "unit": "pH",
        "sourcePage": 20,
        "referenceLow": 5,
        "referenceHigh": 7.5
      },
      {
        "code": "albuminCreatinineRatio",
        "name": "Relação albumina/creatinina",
        "value": 0,
        "unit": "mg/g",
        "sourcePage": 20
      },
      {
        "code": "urineProtein",
        "name": "Proteínas urinárias",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 20
      },
      {
        "code": "urineGlucose",
        "name": "Glicose urinária",
        "value": 500,
        "unit": "mg/dL",
        "sourcePage": 20
      },
      {
        "code": "urineKetones",
        "name": "Corpos cetônicos",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 20
      },
      {
        "code": "urineBilirubin",
        "name": "Bilirrubinas urinárias",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 20
      },
      {
        "code": "urineUrobilinogen",
        "name": "Urobilinogênio",
        "value": 1.4,
        "unit": "mg/dL",
        "sourcePage": 20
      },
      {
        "code": "urineBlood",
        "name": "Sangue urinário (Hb)",
        "value": 0,
        "unit": "mg/dL",
        "sourcePage": 20
      },
      {
        "code": "urineErythrocytes",
        "name": "Hemácias urinárias",
        "value": 2,
        "unit": "/uL",
        "sourcePage": 20
      },
      {
        "code": "urineLeukocytes",
        "name": "Leucócitos urinários",
        "value": 1,
        "unit": "/uL",
        "sourcePage": 20
      },
      {
        "code": "urineEpithelialCells",
        "name": "Células epiteliais escamosas",
        "value": 0,
        "unit": "/uL",
        "sourcePage": 20
      },
      {
        "code": "undifferentiatedCells",
        "name": "Células indiferenciadas",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "nlr",
        "name": "Razão neutrófilos/linfócitos",
        "value": 1.48,
        "unit": "índice",
        "sourcePage": 1,
        "referenceLow": 1,
        "referenceHigh": 3
      },
      {
        "code": "egfr",
        "name": "TFG estimada",
        "value": 46,
        "unit": "mL/min/1,73 m²",
        "sourcePage": 6
      },
      {
        "code": "psa",
        "name": "PSA total",
        "value": 0.48,
        "unit": "ng/mL",
        "sourcePage": 19
      }
    ]
  },
  {
    "id": "bf-demo-2025-05-10",
    "patientId": "demo-walter-white",
    "collectedAt": "2025-05-10",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 14.7,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 123,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 75,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 29,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 25,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 131,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 64,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.52,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.3,
        "unit": "mEq/L",
        "sourcePage": 9
      },
      {
        "code": "sodium",
        "name": "Sódio",
        "value": 139,
        "unit": "mEq/L",
        "sourcePage": 9
      },
      {
        "code": "phosphorus",
        "name": "Fósforo",
        "value": 3.2,
        "unit": "mg/dL",
        "sourcePage": 10
      },
      {
        "code": "ionizedCalcium",
        "name": "Cálcio iônico",
        "value": 1.26,
        "unit": "mmol/L",
        "sourcePage": 10
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 7.1,
        "unit": "mg/dL",
        "sourcePage": 11
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 28,
        "unit": "U/L",
        "sourcePage": 12
      },
      {
        "code": "alkalinePhosphatase",
        "name": "Fosfatase alcalina",
        "value": 55,
        "unit": "U/L",
        "sourcePage": 13
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 8.6,
        "unit": "%",
        "sourcePage": 15
      },
      {
        "code": "vitaminD",
        "name": "25-hidroxivitamina D",
        "value": 23.9,
        "unit": "ng/mL",
        "sourcePage": 16
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.95,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 44.1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 89.1,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 29.7,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 33.3,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 14.3,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 7.1,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 490,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 30,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 100,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 37,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.153,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  },
  {
    "id": "bf-demo-2025-06-28",
    "patientId": "demo-walter-white",
    "collectedAt": "2025-06-28",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "urea",
        "name": "Ureia",
        "value": 44.3,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.76,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "potassium",
        "name": "Potássio",
        "value": 4.7,
        "unit": "mEq/L",
        "sourcePage": 3
      },
      {
        "code": "vitaminD",
        "name": "25-hidroxivitamina D",
        "value": 15.5,
        "unit": "ng/mL",
        "sourcePage": 4
      }
    ]
  },
  {
    "id": "bf-demo-2025-08-21",
    "patientId": "demo-walter-white",
    "collectedAt": "2025-08-21",
    "laboratory": "Pretti (laudo fictício fornecido)",
    "status": "synthetic-demo",
    "isSynthetic": true,
    "originalPdfId": null,
    "results": [
      {
        "code": "hemoglobin",
        "name": "Hemoglobina",
        "value": 15.4,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 150,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 28,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 76,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 26,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "vldl",
        "name": "Colesterol VLDL",
        "value": 22,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 134,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 61.6,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "creatinine",
        "name": "Creatinina",
        "value": 1.88,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "sodium",
        "name": "Sódio",
        "value": 141,
        "unit": "mEq/L",
        "sourcePage": 10
      },
      {
        "code": "ionizedCalcium",
        "name": "Cálcio iônico",
        "value": 1.25,
        "unit": "mmol/L",
        "sourcePage": 10
      },
      {
        "code": "uricAcid",
        "name": "Ácido úrico",
        "value": 7.8,
        "unit": "mg/dL",
        "sourcePage": 11
      },
      {
        "code": "phosphorus",
        "name": "Fósforo",
        "value": 3.9,
        "unit": "mg/dL",
        "sourcePage": 11
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 31,
        "unit": "U/L",
        "sourcePage": 12
      },
      {
        "code": "tsh",
        "name": "TSH ultrassensível",
        "value": 1.79,
        "unit": "microUI/mL",
        "sourcePage": 14
      },
      {
        "code": "t4Free",
        "name": "T4 livre",
        "value": 0.68,
        "unit": "ng/dL",
        "sourcePage": 14
      },
      {
        "code": "vitaminD",
        "name": "25-hidroxivitamina D",
        "value": 37.5,
        "unit": "ng/mL",
        "sourcePage": 15
      },
      {
        "code": "rbc",
        "name": "Hemácias",
        "value": 4.99,
        "unit": "milhões/mm³",
        "sourcePage": 1,
        "referenceLow": 4.3,
        "referenceHigh": 5.7
      },
      {
        "code": "hematocrit",
        "name": "Hematócrito",
        "value": 44.7,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 39,
        "referenceHigh": 50
      },
      {
        "code": "mcv",
        "name": "VCM",
        "value": 89.6,
        "unit": "fL",
        "sourcePage": 1,
        "referenceLow": 81,
        "referenceHigh": 95
      },
      {
        "code": "mch",
        "name": "HCM",
        "value": 30.9,
        "unit": "pg",
        "sourcePage": 1,
        "referenceLow": 26,
        "referenceHigh": 34
      },
      {
        "code": "mchc",
        "name": "CHCM",
        "value": 34.5,
        "unit": "g/dL",
        "sourcePage": 1,
        "referenceLow": 31,
        "referenceHigh": 36
      },
      {
        "code": "rdwCv",
        "name": "RDW (CV)",
        "value": 14.4,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 11.8,
        "referenceHigh": 15.6
      },
      {
        "code": "wbc",
        "name": "Leucócitos",
        "value": 6.5,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 3500,
        "referenceHigh": 10500
      },
      {
        "code": "blasts",
        "name": "Blastos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "promyelocytes",
        "name": "Pro-mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "myelocytes",
        "name": "Mielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "metamyelocytes",
        "name": "Metamielócitos",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilBands",
        "name": "Neutrófilos bastonetes",
        "value": 0,
        "unit": "%",
        "sourcePage": 1
      },
      {
        "code": "neutrophilSegmented",
        "name": "Neutrófilos segmentados",
        "value": 480,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 1700,
        "referenceHigh": 8000
      },
      {
        "code": "eosinophils",
        "name": "Eosinófilos",
        "value": 30,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 50,
        "referenceHigh": 500
      },
      {
        "code": "basophils",
        "name": "Basófilos",
        "value": 1,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 0,
        "referenceHigh": 100
      },
      {
        "code": "monocytes",
        "name": "Monócitos",
        "value": 110,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 300,
        "referenceHigh": 900
      },
      {
        "code": "lymphocytesTypical",
        "name": "Linfócitos típicos",
        "value": 37,
        "unit": "%",
        "sourcePage": 1,
        "referenceLow": 900,
        "referenceHigh": 2900
      },
      {
        "code": "platelets",
        "name": "Plaquetas",
        "value": 0.145,
        "unit": "milhares/mm³",
        "sourcePage": 1,
        "referenceLow": 150,
        "referenceHigh": 450
      }
    ]
  }
]
export const indicatorCodes = ["albuminCreatinineRatio", "alkalinePhosphatase", "alt", "ast", "basophils", "blasts", "bun", "calciumTotal", "ck", "creatinine", "egfr", "eosinophils", "ferritin", "folate", "gammaGt", "glucose", "glucosePostMeal", "hba1c", "hdl", "hematocrit", "hemoglobin", "ionizedCalcium", "iron", "ldl", "lymphocytesAtypical", "lymphocytesTypical", "magnesium", "mch", "mchc", "mcv", "metamyelocytes", "monocytes", "mpv", "myelocytes", "neutrophilBands", "neutrophilSegmented", "nlr", "nonHdl", "phosphorus", "platelets", "potassium", "promyelocytes", "psa", "rbc", "rdwCv", "rdwSd", "sodium", "t4Free", "totalCholesterol", "triglycerides", "tsh", "undifferentiatedCells", "urea", "uricAcid", "urineBilirubin", "urineBlood", "urineDensity", "urineEpithelialCells", "urineErythrocytes", "urineGlucose", "urineKetones", "urineLeukocytes", "urinePh", "urineProtein", "urineUrobilinogen", "vitaminB12", "vitaminD", "vldl", "wbc"] as const;
