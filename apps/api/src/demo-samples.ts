/** Reduced public fictional samples ONLY; hashes match PDF_PUBLICATION_AUDIT.json. */
export const SAMPLES = {
  "b9a85a34b40086b2b18794a183a01d7139c282605ea279bc3aea846c8d39a26b": {date:"2026-05-15",filename:"bioflow-teste-2026-05-15.pdf",pages:1},
  "5632d1844a102141815efea83fb2e8926532f1c89550165cf4b13955d600027e": {date:"2026-10-01",filename:"bioflow-teste-2026-10-01.pdf",pages:1},
  "aa9ea75764909e69828e275fbd3d7cf517cc2606739ace559a027c67590b58da": {date:"2026-10-02",filename:"bioflow-teste-2026-10-02.pdf",pages:1}
} as const;
export type SampleHash = keyof typeof SAMPLES;
export const isSampleHash=(hash:string):hash is SampleHash=>Object.prototype.hasOwnProperty.call(SAMPLES,hash);
