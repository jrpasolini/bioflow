# BioFlow / Google Gemma live synthetic PDF import

Status as of 2026-10-21: **implemented and enabled in the versioned Worker configuration; successful live synthetic extraction and MongoDB session write reported and documented**. Independent checks of the three samples and of the currently deployed Worker version remain distinct from the historical production test.

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
| At least one real Gemma → review → MongoDB write | [Audit briefing](AUDIT_BRIEFING.md) and merged [PR #3](https://github.com/jrpasolini/bioflow/pull/3) | **Reported successful in production** |
| Three demonstration PDFs | SHA-256 hashes and metadata in [publication audit](PDF_PUBLICATION_AUDIT.json); owner confirms download works | **Fictional and downloadable**; independent end-to-end Gemma success for each is a separate check |
| Isolation and integrity | Test suite plus HMAC proof, session-based commits and limited writer | **Implemented/tested**; real-user cross-session test still useful |
| Expiration | `expiresAt` TTL index confirmed in Atlas, with 60-minute session-bound expiry | **Configured**; deletion is eventually consistent |
| Baseline dataset | Atlas contains 26 reports; read-only runtime account scoped to `bioflow_demo` | **Verified in Atlas**; public Worker read path must independently report `mongodb-atlas-synthetic` |
| Deployment version | Audit briefing records a deployed Worker identifier `94a8342e` at 19:20 Brazil time on 2026-10-21; source `GET /api/health` reports `build: "gemma-v6-strict-chunks"` | **Historical deployment recorded**; cannot infer current running version from Git source |
| Private Auth0/R2 routes | `ENABLE_PDF_ENDPOINTS=false` | **Disabled by design** for synthetic demonstration |

**Live runtime verification:** inspect `GET /api/health` for `gemmaReady`, `databaseConfigured`, and `build`. The flags report configuration, not an actual database ping. Then inspect `GET /api/demo/overview`: it must return `source: "mongodb-atlas-synthetic"` to prove the public read path uses Atlas. If it returns `"synthetic-fixtures"`, configure a **read-only** `MONGODB_URI` as a Cloudflare Worker secret using the dedicated `bioflow_runtime` account. Never place a URI in the frontend or repository. Verify permissions via Atlas user roles and test effective read/write boundaries separately; do not use an administrator connection string. See [Worker rollout](WORKER_DEPLOY.md).

**Current limitations:** the public demo is strictly fictional; complete performance and error coverage for each of the three held-out PDFs, live Worker/source parity, visual accessibility, and global inference budget protection warrant further validation. No diagnosis or medical interpretation is provided.

