# BioFlow / Google Gemma live synthetic PDF import

Status: **feature implemented behind disabled gate; not deployed or live-certified**.

## Public demo flow

1. Visitor enters the **public synthetic-only** demonstration.
2. Visitor downloads one of three independently hosted fictional PDFs from the DEV article (links will be added later).
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
- The wrangler.jsonc AI and rate limiting bindings are now declared. ENABLE_GEMMA_DEMO is deliberately FALSE by default.
- Test the complete workflow, rate controls, auth/expiring session, both database privileges, CORS allowlist, and Gemma output from the exact three sample PDFs. Verify one visitor cannot see another visitor's temporary data. Confirm Mongo baseline counts remain 26 reports/258 numeric readings after uploads.
- Only after those tests, explicitly enable ENABLE_GEMMA_DEMO=true and deploy the Worker; rebuild the web app with VITE_API_BASE_URL set to the verified HTTPS Worker origin. Do not enable private R2 PDF endpoints or Auth0 until separately configured.
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

**Current limitations:** Still needs live Gemma inference tests and Mongo session-writer provisioning, budget protection, deploy, and UI verification. This is a fictional demonstration, not an analysis or diagnosis tool.
