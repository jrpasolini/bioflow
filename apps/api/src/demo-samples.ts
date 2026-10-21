/** Published synthetic samples ONLY; verified against PDF_PUBLICATION_AUDIT.json. */
export const SAMPLES = {
  "7a3234fc1d3e22595180a6b3e15718a3060b0730f7ea08b6271ffdc5a33d5dc0": {date:"2026-05-15",filename:"bioflow-teste-2026-05-15.pdf",pages:24},
  "c1e81086f4a118470b7e1313a2f3b8bbd4c5d3e5e30621a2e525e55f160744ee": {date:"2026-10-01",filename:"bioflow-teste-2026-10-01.pdf",pages:8},
  "901abea157ab2b14685545059a782d50a92cb7462855a2ee50970b84473ba0a2": {date:"2026-10-02",filename:"bioflow-teste-2026-10-02.pdf",pages:29}
} as const;
export type SampleHash = keyof typeof SAMPLES;
export const isSampleHash=(hash:string):hash is SampleHash=>Object.prototype.hasOwnProperty.call(SAMPLES,hash);
