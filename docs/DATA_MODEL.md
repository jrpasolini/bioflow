# BioFlow data model

## Implemented: isolated synthetic demo in MongoDB Atlas

The MongoDB Adapter (`apps/api/src/atlas.ts`) reads the `bioflow_demo` database
with three intentionally public-demo-only collections:

- `demo_patients`: `id`, `displayName`, `dateOfBirth`, `demoRecordId`, `isSynthetic:true`.
- `demo_reports`: `id`, `patientId`, `collectedAt`, `laboratory`, `status`, `isSynthetic:true`, `originalPdfId:null`.
- `demo_results`: `id`, `patientId`, `reportId`, `code`, `name`, `value`, `unit`, `referenceLow`,
  `referenceHigh`, `collectedAt`, `isSynthetic:true`.

The API reconstructs reports from source-linked observations. The public demo never queries real collections.

## Planned: separate authenticated records

- `patients`: ID, immutable owner identity, display name and care profile.
- `lab_reports`: ID, patient ID, collection date, lab, canonical document ID, review state.
- `analyte_results`: ID, patient ID, report ID, marker code, literal and numeric value,
  unit, source-page/region, lab-specific reference interval and review state.
- `original_documents`: ID, patient ID, private R2 object key, SHA-256, original filename,
  MIME type, byte count, upload timestamp, version, owner and retention policy.
- `import_jobs`: model/version, document ID, extracted fields, confidence, review,
  usage and failure state.
- `access_grants`: patient-authorized resource scopes, user identity, expiry, revocation.
- `audit_events`: action metadata without copying PDFs, bearer tokens or medical readings.

*PDF bytes must never be stored in MongoDB or regenerated from AI text.*
A report and its original source document have independent lifecycles.
MongoDB records must enforce per-patient authorization in the API.
