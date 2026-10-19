# Logical model — planned MongoDB integration

The application intentionally separates document contents, metadata and clinical observations:

- `Patient`: ID, owner user ID, display name, synthetic flag
- `LabReport`: ID, patient ID, collection date, lab, original document ID, review status
- `OriginalDocument`: ID, patient ID, private R2 object key, SHA-256, filename, byte count, created-at and version
- `AnalyteResult`: ID, report ID, indicator code, literal and numeric value, unit, reference interval, source page, review status
- `ImportJob`: Gemma model/version, source document, extracted fields, human review, usage accounting
- `AccessGrant`: patient-approved scopes, target user, expiry and revocation
- `AuditEvent`: action metadata (never raw clinical values, PDFs or bearer tokens)

PDF bytes belong in private R2, not MongoDB. Canonical files and extracted measurements have different lifecycles and must never silently overwrite one another.
