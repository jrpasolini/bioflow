# BioFlow / Google Gemma live synthetic PDF import

> Latest independent production verification: [production validation](PRODUCTION_VALIDATION.md).

Status as of 2026-10-21: **implemented and enabled for audited fictional PDFs only**. Independent production runs confirmed temporary writes, session isolation and real Atlas overview reads. Gemma also produced incomplete extractions in the final smoke run and its bounded retries; those were refused without saving partial reports. See the exact running version and evidence below.

## Public demo flow

1. Visitor enters the **public synthetic-only** demonstration.
2. Visitor downloads the [synthetic three-PDF ZIP](../apps/web/public/demo/bioflow-3-exames.zip) or its public mirror. The test PDFs are fictional and independently hashed. The DEV post should include the stable public URL.
3. Visitor uploads that PDF to BioFlow. The Worker verifies its SHA-256 fingerprint against ONLY the three audited samples. Every other PDF is rejected **before AI inference**.
4. Cloudflare AI toMarkdown converts PDF pages to text; Google Gemma 4 26B A4B extracts dates, numerical values, units, test names and page provenance.
5. Visitor compares the AI draft with the source and explicitly confirms. Before confirmation **nothing is written**.
6. The reviewed, temporary report is written to an isolated session in MongoDB database bioflow_sessions and displayed alongside—but never inside—the 26 immutable historical reports in bioflow_demo.
7. The guest bearer session expires after one hour. MongoDB TTL subsequently removes its saved readings. The Worker does not keep PDF bytes or converted text.

### Privacy and abuse limits

Only exact known fictional files are accepted. Their SHA-256s are in apps/api/src/demo-samples.ts and docs/PDF_PUBLICATION_AUDIT.json. The public access code is NOT Auth0 or MFA. Do not remove the allowlist for a publicly available site. IP-based Cloudflare rate limiting (3 calls/minute per location/IP/endpoint class) is not a hard global cost ceiling: set account-level Workers AI budget alerts and additional safeguards before publication.

### Deployment prerequisites

- Keep existing MONGODB_URI **read-only** for bioflow_demo.
- Create a separate MongoDB database bioflow_sessions with a separate runtime user with readWrite privileges **only for bioflow_sessions**. Store its URI in Worker secret MONGODB_DEMO_WRITE_URI. Never put URI into a VITE variable, Render environment or GitHub.
- In a trusted administrator's MongoDB shell, provision the collection indexes:

        use bioflow_sessions
        db.demo_imports.createIndex({sessionId:1,sha256:1},{unique:true,name:"unique_session_sample"})
        db.demo_imports.createIndex({expiresAt:1},{expireAfterSeconds:0,name:"delete_expired_imports"})

- Alternatively, with MONGODB_DEMO_WRITE_URI available securely in the ignored local .env.local, run npm run db:setup:demo-imports to create both indexes. This provisioning script touches only bioflow_sessions.
- Indexes are REQUIRED: unique prevents concurrent duplicate writes and TTL ensures the import expires. TTL deletion is eventually consistent.
- Set DEMO_SESSION_SECRET with a cryptographically random secret of at least 32 bytes via Cloudflare's secure secret input.
- The wrangler.jsonc AI and rate-limiting bindings are declared. **The current tracked configuration sets ENABLE_GEMMA_DEMO=true.** Keep the sample allowlist, rate limits, approval proof and isolated write credential in place.
- Test the complete workflow, rate controls, auth/expiring session, both database privileges, CORS allowlist, and Gemma output from the exact three sample PDFs. Verify one visitor cannot see another visitor's temporary data. Confirm Mongo baseline counts remain 26 reports/604 numeric readings after uploads.
- For a new Worker deployment, verify the correct ENABLE_GEMMA_DEMO value and secrets, run safe smoke tests on the deployed HTTPS origin, and confirm the frontend VITE_API_BASE_URL. Do not enable private R2 PDF endpoints merely to enable the public fictional Gemma demo.
- No real medical data may be processed by the public demo.

### HTTP endpoints

POST /api/demo/session: signed one-hour bearer token (rate-limited).

POST /api/demo/extract: bearer plus multipart file; max 1 MiB, PDF signature and SHA-256 allowlist. Returns model extraction as review draft with HMAC proof valid for 20 minutes. No DB write.

POST /api/demo/commit: bearer, reviewed:true, unchanged report, digest and proof; server checks proof and saves to bioflow_sessions.demo_imports only.

GET /api/demo/imports: bearer; returns current session's unexpired imports only.

GET /api/health: gemmaReady=true if all bindings/gates/secrets are set; does not establish actual model or database reachability.

### Primary docs

https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/
https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/
https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/

## Verification status and remaining checks (2026-10-21)

| Check | Evidence | Status |
| --- | --- | --- |
| Real Gemma → review → MongoDB write | Independent production smoke test after [PR #4](https://github.com/jrpasolini/bioflow/pull/4) | **All three samples saved in the same temporary session** on the intermediate corrected release; later model failures and retries are recorded separately |
| Three demonstration PDFs | SHA-256 hashes in [publication audit](PDF_PUBLICATION_AUDIT.json), verified before each upload | **Fictional, allowlisted and exercised live**; schema success does not certify every numerical reading |
| Isolation and integrity | Separate live signed sessions, proof replay refusals and scoped history reads | **Verified live**; another visitor cannot select the first visitor's history through a query parameter |
| Expiration | Short-lived BSON-Date canary was observed and later disappeared without an explicit delete; clock-controlled session tests also pass | **TTL cleanup observed**; deletion is asynchronous, and natural one-hour token expiry was not waited out live |
| Baseline dataset | Live `/api/demo/overview`: HTTP 200, `mongodb-atlas-synthetic`, 26 reports/604 readings | **Verified through the production Worker**, after preserving all 258 original readings and adding 346 missing readings |
| Deployment version | Live health source `a52456c60e70fbbc65b9920d7d67b197219cfe2c`; Cloudflare version `93298a07-7862-488e-bfa1-940249f771de` | **Running source and active version independently checked**; build `session-v7-expiry-isolation` |
| Private Auth0/R2 routes | `ENABLE_PDF_ENDPOINTS=false` | **Disabled by design** for synthetic demonstration |

**Live runtime verification:** inspect `GET /api/health` for `gemmaReady`, `databaseConfigured`, and `build`. The flags report configuration, not an actual database ping. Then inspect `GET /api/demo/overview`: it must return `source: "mongodb-atlas-synthetic"` to prove the public read path uses Atlas. If it returns `"synthetic-fixtures"`, configure a **read-only** `MONGODB_URI` as a Cloudflare Worker secret using the dedicated `bioflow_runtime` account. Never place a URI in the frontend or repository. Verify permissions via Atlas user roles and test effective read/write boundaries separately; do not use an administrator connection string. See [Worker rollout](WORKER_DEPLOY.md).

**Current limitations:** Gemma output varies across executions, and malformed chunks can still cause `incomplete_extraction`. The Worker refuses those attempts before offering a partial report for confirmation. Successful extraction remains subject to human review against the fictional source; schema validity is not numerical accuracy certification. Broader accessibility and global inference budget protection warrant further work. No diagnosis or medical interpretation is provided. See [production validation](PRODUCTION_VALIDATION.md) for actual successful and failed runs.

