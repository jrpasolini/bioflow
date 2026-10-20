# Supplied fictional PDF dataset

On 2026-10-20 the owner supplied 29 PDFs and explicitly confirmed that all internal data are invented, authorizing their use in the public demonstration. The archive contains 339 pages.

The 26 oldest PDFs form the baseline (275 pages); the 3 newest PDFs, dated 2026-05-15, 2026-10-01 and 2026-10-02, are held out in the downloadable sample ZIP (64 pages). No held-out readings are included in the initial history. The original supplied archive is unchanged.

The baseline replaces the previous independent 8-report / 44-reading fixture. It includes 258 numeric fields with source-page provenance. Not every field in every PDF is normalized for charting: qualitative assays, full blood-count tables and other untranscribed fields remain available in each complete PDF. Empty numeric arrays are valid and never replaced with fabricated readings. Reference ranges are not invented or copied from unrelated exams; consult the original PDF when a numeric range has not been transcribed.

Collection dates currently follow each supplied PDF filename. The display identity remains the fictional Walter White persona. All PDF contents, including differing source identities, are declared fictitious by the owner. `demo-sources.ts` records SHA-256 hashes and page counts for the 26 source PDFs.

Initial extraction used local PDF text parsing, not Gemma. The automatic approval reviewer rejected further persistence of raw identified source text. The 15 previously inserted raw source documents were removed. Public PDFs and persisted source text instead use copies with administrative identity fields removed, a Walter White demonstration header, and rebuilt pagination. Source-page provenance refers to the original logical page labeled in each transcription, not the rebuilt physical PDF page. Original files remain unchanged locally. Gemma import and Auth0 authentication continue to be labeled as upcoming integrations. Public sample download does not imply that automatic upload or inference is implemented.

Atlas uses `demo_patients`, `demo_reports` and `demo_results`. `demo_report_sources` preserves all 275 extracted baseline pages and source hashes. The public API returns only the allowlisted structured demo fields; it does not return source text through a generic database query. Runtime read-only permissions are unchanged. Baseline replacement is scoped to the fictional demo patient; no other database or project is deleted.
