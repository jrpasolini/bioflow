/** Published synthetic samples ONLY; verified against PDF_PUBLICATION_AUDIT.json. */
export const SAMPLES = {
  "7a3234fc1d3e22595180a6b3e15718a3060b0730f7ea08b6271ffdc5a33d5dc0": {date:"2026-05-15",filename:"bioflow-teste-2026-05-15.pdf",pages:24},
  "dc56057a84649ac41059363da12f95cf1f68a8056d037dcf8a40ab45f0327032": {date:"2026-10-01",filename:"bioflow-teste-2026-10-01.pdf",pages:9},
  "901abea157ab2b14685545059a782d50a92cb7462855a2ee50970b84473ba0a2": {date:"2026-10-02",filename:"bioflow-teste-2026-10-02.pdf",pages:29}
} as const;
export type SampleHash = keyof typeof SAMPLES;
export const isSampleHash=(hash:string):hash is SampleHash=>Object.prototype.hasOwnProperty.call(SAMPLES,hash);
