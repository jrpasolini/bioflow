/** All people, measurements and laboratory names here are entirely fictional. */
export type Indicator = {
  code: string; name: string; value: number; unit: string;
  referenceLow?: number; referenceHigh?: number;
};
export type LabReport = {
  id: string; patientId: string; collectedAt: string;
  laboratory: string; status: 'synthetic-demo'; isSynthetic: true;
  originalPdfId: null; results: Indicator[];
};
export const demoPatient = {
  id: 'demo-walter-white', displayName: 'Walter White', isSynthetic: true,
  dateOfBirth: null,
  description: 'Pessoa fictícia criada para demonstração; não representa um paciente real.'
} as const;
export const demoReports: LabReport[] = [
  {id:'bf-demo-2025-03',patientId:demoPatient.id,collectedAt:'2025-03-14',laboratory:'Laboratório Aurora (fictício)',status:'synthetic-demo',isSynthetic:true,originalPdfId:null,results:[
    {code:'glucose',name:'Glicose',value:92,unit:'mg/dL',referenceLow:70,referenceHigh:99},
    {code:'hba1c',name:'Hemoglobina glicada',value:5.6,unit:'%',referenceLow:4,referenceHigh:5.7},
    {code:'creatinine',name:'Creatinina',value:0.96,unit:'mg/dL',referenceLow:0.7,referenceHigh:1.3},
    {code:'triglycerides',name:'Triglicerídeos',value:141,unit:'mg/dL',referenceHigh:150},
    {code:'hdl',name:'Colesterol HDL',value:49,unit:'mg/dL',referenceLow:40}
  ]},
  {id:'bf-demo-2025-11',patientId:demoPatient.id,collectedAt:'2025-11-21',laboratory:'Laboratório Horizonte (fictício)',status:'synthetic-demo',isSynthetic:true,originalPdfId:null,results:[
    {code:'glucose',name:'Glicose',value:98,unit:'mg/dL',referenceLow:70,referenceHigh:99},
    {code:'hba1c',name:'Hemoglobina glicada',value:5.7,unit:'%',referenceLow:4,referenceHigh:5.7},
    {code:'creatinine',name:'Creatinina',value:1.03,unit:'mg/dL',referenceLow:0.7,referenceHigh:1.3},
    {code:'triglycerides',name:'Triglicerídeos',value:136,unit:'mg/dL',referenceHigh:150},
    {code:'hdl',name:'Colesterol HDL',value:47,unit:'mg/dL',referenceLow:40}
  ]},
  {id:'bf-demo-2026-09',patientId:demoPatient.id,collectedAt:'2026-09-07',laboratory:'Laboratório Aurora (fictício)',status:'synthetic-demo',isSynthetic:true,originalPdfId:null,results:[
    {code:'glucose',name:'Glicose',value:95,unit:'mg/dL',referenceLow:70,referenceHigh:99},
    {code:'hba1c',name:'Hemoglobina glicada',value:5.5,unit:'%',referenceLow:4,referenceHigh:5.7},
    {code:'creatinine',name:'Creatinina',value:0.99,unit:'mg/dL',referenceLow:0.7,referenceHigh:1.3},
    {code:'triglycerides',name:'Triglicerídeos',value:128,unit:'mg/dL',referenceHigh:150},
    {code:'hdl',name:'Colesterol HDL',value:51,unit:'mg/dL',referenceLow:40}
  ]}
];
export const indicatorCodes = ['glucose','hba1c','creatinine','triglycerides','hdl'] as const;
