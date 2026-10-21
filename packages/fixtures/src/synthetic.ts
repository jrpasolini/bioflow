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
        "value": 130.0,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 32.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 179.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 160.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 41.0,
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
        "value": 25.0,
        "unit": "U/L",
        "sourcePage": 5
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 32.0,
        "unit": "U/L",
        "sourcePage": 6
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 114.0,
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
        "value": 143.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "glucosePostMeal",
        "name": "Glicose pós-prandial",
        "value": 87.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 168.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 41.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 183.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 30.0,
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
        "value": 36.0,
        "unit": "U/L",
        "sourcePage": 9
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 83.0,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 130.0,
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
        "value": 158.0,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "glucosePostMeal",
        "name": "Glicose pós-prandial",
        "value": 154.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 39.0,
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
        "value": 29.0,
        "unit": "U/L",
        "sourcePage": 5
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 48.0,
        "unit": "U/L",
        "sourcePage": 6
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 114.0,
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
        "value": 15.0,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 150.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "glucosePostMeal",
        "name": "Glicose pós-prandial",
        "value": 138.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 103.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 144.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 41.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 204.0,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 32.0,
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
        "value": 33.0,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 68.0,
        "unit": "U/L",
        "sourcePage": 12
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 219.0,
        "unit": "U/L",
        "sourcePage": 13
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.5,
        "unit": "%",
        "sourcePage": 15
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
        "value": 145.0,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "glucosePostMeal",
        "name": "Glicose pós-prandial",
        "value": 216.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 143.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 186.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 43.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 123.0,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 26.0,
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
        "value": 24.0,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 32.0,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 7.0,
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
        "value": 115.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 152.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 194.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 42.0,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 146.0,
        "unit": "mg/dL",
        "sourcePage": 8
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 41.0,
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
        "value": 144.0,
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
        "value": 2.0,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "ast",
        "name": "TGO / AST",
        "value": 26.0,
        "unit": "U/L",
        "sourcePage": 14
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 36.0,
        "unit": "U/L",
        "sourcePage": 15
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 91.0,
        "unit": "U/L",
        "sourcePage": 16
      },
      {
        "code": "gammaGt",
        "name": "Gama GT",
        "value": 27.0,
        "unit": "U/L",
        "sourcePage": 16
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 6.3,
        "unit": "%",
        "sourcePage": 25
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
        "value": 107.0,
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
        "value": 12.0,
        "unit": "g/dL",
        "sourcePage": 1
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 138.0,
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
        "value": 44.0,
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
        "value": 141.0,
        "unit": "mEq/L",
        "sourcePage": 5
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 112.0,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 27.0,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 85.0,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 62.0,
        "unit": "mg/dL",
        "sourcePage": 7
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 150.0,
        "unit": "mg/dL",
        "sourcePage": 7
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
        "value": 73.0,
        "unit": "ug/dL",
        "sourcePage": 2
      },
      {
        "code": "vitaminB12",
        "name": "Vitamina B12",
        "value": 288.0,
        "unit": "pg/mL",
        "sourcePage": 4
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
        "value": 168.0,
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
        "value": 35.0,
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
        "value": 45.0,
        "unit": "U/L",
        "sourcePage": 5
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 91.0,
        "unit": "U/L",
        "sourcePage": 5
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 143.0,
        "unit": "U/L",
        "sourcePage": 6
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
        "value": 99.0,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 168.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 34.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 163.0,
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
        "value": 33.0,
        "unit": "U/L",
        "sourcePage": 9
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 48.0,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 158.0,
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
        "value": 73.0,
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
        "value": 54.0,
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
        "value": 443.0,
        "unit": "pg/mL",
        "sourcePage": 8
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 154.0,
        "unit": "mg/dL",
        "sourcePage": 9
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 36.0,
        "unit": "mg/dL",
        "sourcePage": 10
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 118.0,
        "unit": "mg/dL",
        "sourcePage": 10
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 98.0,
        "unit": "mg/dL",
        "sourcePage": 12
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 104.0,
        "unit": "mg/dL",
        "sourcePage": 13
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
        "value": 67.0,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 199.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 34.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 213.0,
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
        "value": 27.0,
        "unit": "U/L",
        "sourcePage": 9
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 51.0,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 122.0,
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
        "value": 71.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 142.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 37.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 73.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "vldl",
        "name": "Colesterol VLDL",
        "value": 32.0,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 218.0,
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
        "value": 137.0,
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
        "value": 102.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 155.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 36.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 241.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 65.0,
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
        "value": 20.0,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 27.0,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 203.0,
        "unit": "U/L",
        "sourcePage": 12
      },
      {
        "code": "hba1c",
        "name": "Hemoglobina glicada",
        "value": 7.0,
        "unit": "%",
        "sourcePage": 13
      },
      {
        "code": "tsh",
        "name": "TSH ultrassensível",
        "value": 1.26,
        "unit": "microUI/mL",
        "sourcePage": 14
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
        "value": 38.0,
        "unit": "ug/dL",
        "sourcePage": 3
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 69.0,
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
        "value": 46.0,
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
        "value": 444.0,
        "unit": "pg/mL",
        "sourcePage": 11
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 113.0,
        "unit": "mg/dL",
        "sourcePage": 12
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 43.0,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 70.0,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 55.0,
        "unit": "mg/dL",
        "sourcePage": 15
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 71.0,
        "unit": "mg/dL",
        "sourcePage": 16
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
        "value": 106.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 122.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 38.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 193.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 42.0,
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
        "value": 32.0,
        "unit": "U/L",
        "sourcePage": 10
      },
      {
        "code": "alt",
        "name": "TGP / ALT",
        "value": 47.0,
        "unit": "U/L",
        "sourcePage": 11
      },
      {
        "code": "ck",
        "name": "Creatinofosfoquinase",
        "value": 159.0,
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
        "value": 79.0,
        "unit": "mg/dL",
        "sourcePage": 1
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 51.0,
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
        "value": 1083.0,
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
        "value": 71.0,
        "unit": "ug/dL",
        "sourcePage": 3
      },
      {
        "code": "glucose",
        "name": "Glicose",
        "value": 147.0,
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
        "value": 58.0,
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
        "value": 768.0,
        "unit": "pg/mL",
        "sourcePage": 12
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 99.0,
        "unit": "mg/dL",
        "sourcePage": 13
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 35.0,
        "unit": "mg/dL",
        "sourcePage": 14
      },
      {
        "code": "nonHdl",
        "name": "Colesterol não HDL",
        "value": 64.0,
        "unit": "mg/dL",
        "sourcePage": 14
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 43.0,
        "unit": "mg/dL",
        "sourcePage": 16
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 125.0,
        "unit": "mg/dL",
        "sourcePage": 17
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
        "value": 123.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 75.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 29.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 25.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 131.0,
        "unit": "mg/dL",
        "sourcePage": 6
      },
      {
        "code": "urea",
        "name": "Ureia",
        "value": 64.0,
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
        "value": 139.0,
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
        "value": 28.0,
        "unit": "U/L",
        "sourcePage": 12
      },
      {
        "code": "alkalinePhosphatase",
        "name": "Fosfatase alcalina",
        "value": 55.0,
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
        "value": 150.0,
        "unit": "mg/dL",
        "sourcePage": 2
      },
      {
        "code": "hdl",
        "name": "Colesterol HDL",
        "value": 28.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "totalCholesterol",
        "name": "Colesterol total",
        "value": 76.0,
        "unit": "mg/dL",
        "sourcePage": 3
      },
      {
        "code": "ldl",
        "name": "Colesterol LDL",
        "value": 26.0,
        "unit": "mg/dL",
        "sourcePage": 4
      },
      {
        "code": "vldl",
        "name": "Colesterol VLDL",
        "value": 22.0,
        "unit": "mg/dL",
        "sourcePage": 5
      },
      {
        "code": "triglycerides",
        "name": "Triglicerídeos",
        "value": 134.0,
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
        "value": 141.0,
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
        "value": 31.0,
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
      }
    ]
  }
];
export const indicatorCodes = ["alkalinePhosphatase", "alt", "ast", "bun", "calciumTotal", "ck", "creatinine", "ferritin", "folate", "gammaGt", "glucose", "glucosePostMeal", "hba1c", "hdl", "hemoglobin", "ionizedCalcium", "iron", "ldl", "magnesium", "nonHdl", "phosphorus", "potassium", "sodium", "t4Free", "totalCholesterol", "triglycerides", "tsh", "urea", "uricAcid", "vitaminB12", "vitaminD", "vldl"] as const;
