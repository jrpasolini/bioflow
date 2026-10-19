# BioFlow security baseline

1. **Synthetic demonstration:** Never commit real patient data, source records, dates or private laboratory PDFs. All public demo content is wholly fictional.
2. **Private canonical originals:** Cloudflare R2 objects have no public bucket access. Authorized Worker download streams the stored file without rewriting; SHA-256 records received bytes.
3. **Deny by default:** Protected routes require a verified Auth0 JWT (signature, issuer, audience, expiry) and server-side ownership. Missing credentials or configuration => reject, not open access.
4. **Upload checks:** Extension, header bytes and 10 MiB cap are necessary but do not provide antivirus scanning. Do not accept real medical records until threat modeling, malware scanning and LGPD review.
5. **Access grants:** Future doctor access requires time-bound, resource-scoped approval by the patient; login alone gives no access.
6. **Secrets:** Keep Auth0 issuer/audience and owner controls server-side as appropriate; never log bearer tokens or expose privileged API credentials.
7. **Operational readiness:** Real deployment requires retention, audit logs, regional processing review, incident response, key management, backups and data deletion controls.
8. **Clinical purpose:** BioFlow is an organization and review tool; it does not produce diagnoses or substitute for certified laboratory documents.
