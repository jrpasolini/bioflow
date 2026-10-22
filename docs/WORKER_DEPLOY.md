# Public Worker rollout

> Latest independent production verification: [production validation](PRODUCTION_VALIDATION.md).

## Current deployment configuration and verification (reviewed 2026-10-21)

> The independently checked running source is `a52456c60e70fbbc65b9920d7d67b197219cfe2c`, build `session-v7-expiry-isolation`, Cloudflare version `93298a07-7862-488e-bfa1-940249f771de`. The production overview returns HTTP 200 with `source: mongodb-atlas-synthetic`, 26 reports and 604 readings. Private PDF routes remain disabled. See the validation record for session, TTL and model evidence.

- Worker: `bioflow-api`, compatibility date `2026-10-19`, `nodejs_compat`.
- Allowed browser origin in the tracked Worker config: `https://jrpasolini.tech` (the Render-hosted frontend is accessed through the `.tech` subpath). Review the runtime origin before changing it.
- Atlas: `bioflow_demo`, explicitly synthetic `demo_*` collections only.
- PDF routes: `ENABLE_PDF_ENDPOINTS=false`; no R2 binding and no Auth0 credentials provisioned.
- The React demo uses the configured API and a separate fallback UI; the public Worker itself selects Atlas only when its `MONGODB_URI` secret is present. The synthetic fallback is not proof of an Atlas-backed live read.

## Account prerequisites and approvals

1. **Confirm rotation** of the previously exposed Atlas administrator password **before making the source history public**. This document records a prior exposure risk; it does not prove the password was rotated. Do not reuse admin credentials in the Worker.
2. Create a separate runtime user scoped to `bioflow-cluster`, with `read` on `bioflow_demo` only. A seed job may need its own `readWrite` user; public reads do not.
3. Inspect the selected Cloudflare account, existing Worker, deployment version and secret names. Confirm the account and deployment before publishing. Never print tokens or secret values.
4. **Atlas network review (2026-10-21):** the connection access list currently includes a temporary `0.0.0.0/0` entry through 2026-10-29 (Atlas caps temporary access at 7 days; the owner made the entry permanent on 2026-10-22, confirmed via the Atlas API with no expiration date), plus a specific `/32` entry. This was authorized for the **fictional** demo, not for real medical records. Restrict it once an appropriate egress strategy is available and do not carry this access pattern into a patient-data product.
5. Review rate limiting and expected request volume before public traffic. The Worker opens and closes a small MongoDB client per request; free-cluster connection limits and TLS handshake latency still apply. Timeouts bound individual operations, not a guaranteed end-to-end latency. Consider a Durable Object or controlled backend if traffic warrants it.

## Secret and deployment

In `apps/api`, set `MONGODB_URI` through a secure secret input (`wrangler secret put MONGODB_URI` or Cloudflare's secret UI). Do not pass it as a shell argument, put it in command history, copy it into chat, or store it in GitHub/Render/VITE variables. Credentials must be URL encoded in the URI. Preserve TLS certificate validation.

After approval, run `npm run deploy -w @bioflow/api`. Record the actual Worker URL and deployment version. A dry run is not a deployment.

Check against the deployed URL:

- `/api/health`: HTTP 200; inspect `databaseConfigured`, `gemmaReady`, `pdfEndpointsEnabled:false` and `build`. Tracked source reports `build:"session-v7-expiry-isolation"`; the value from a **live response** is needed to establish the running version. This is liveness/configuration, not a database ping. Auth0 status must be tested separately, not assumed.
- `/api/demo/overview`: HTTP 200 and **`source:mongodb-atlas-synthetic`**. The Atlas seed currently contains 26 synthetic reports. A 200 with `source:synthetic-fixtures` does **not** verify the live read path, even when confirmed guest imports are being written to `bioflow_sessions`.
- CORS: exact Render origin gets `Access-Control-Allow-Origin`; another origin gets no permission and its preflight returns 403. CORS is not authentication: this is intentionally a public synthetic endpoint.
- PDF list, upload and download: HTTP 503 `pdf_endpoints_disabled`; never upload a real report to test them.

## Frontend activation and rollback

Only after the checks pass, set **only the public Worker origin** as `VITE_API_BASE_URL` in Render, approve the frontend deployment and rebuild. The adapter sends no cookies or auth tokens, validates the synthetic contract and rejects redirects, malformed responses and unexpected sources. On an API error it displays local fictional fixtures with an explicit refresh failure message. No API response is persisted in browser storage.

Rollback: remove `VITE_API_BASE_URL` and redeploy the frontend to restore fixture-only mode. If necessary roll back the Worker to the previously recorded version. Changing a secret may affect more than a code rollback; keep its operational recovery separate and never restore the exposed password.

## PWA and documents

The build generates a versioned app-shell service worker, PNG icons and a web manifest. It caches only explicitly built public resources. It ignores API requests, private PDFs, cross-origin URLs, queries and mutations. Installation availability depends on browser support and HTTPS; iOS uses the Share menu. The install dialog provides instructions when a native install prompt is unavailable.

`Add report` explains the current protected-storage prerequisite; it does not upload or retain a file. Each chart point retains its collection/report ID and opens that collection. Original download remains unavailable until a canonical PDF actually exists with authenticated private R2 access. No generated PDF is substituted for the original.

## Verified Atlas resources and production read path

On 2026-10-21, an authenticated MongoDB Atlas connector inspection confirmed 26 baseline reports, read-only access to `bioflow_demo` for `bioflow_runtime`, and session writers restricted to `bioflow_sessions`. The initial 258 result documents were an incomplete older seed: the approved repair added exactly 346 missing readings and preserved every existing result, yielding 604 documents with no duplicate report/code pairs. The fictional identity was synchronized with the published fixture. Actual TTL deletion of a disposable date-typed session canary was observed.

After private credential entry by the owner, the production Worker independently returned HTTP 200 and `source: mongodb-atlas-synthetic`, with 26 reports/604 readings. This verifies the actual public read path, beyond cluster metadata and binding presence. Full source/version provenance and the remaining model reliability limits are recorded in [production validation](PRODUCTION_VALIDATION.md). Never copy a connection URI or password into public logs, the repository, screenshots or assistant output.

## Verification scope

Local checks cover API routes/CORS/PDF denial, response contracts, outages, exam-to-point provenance, app build, Worker bundle and PWA cache boundaries. Live Atlas counts were inspected through the Atlas connector. Local Worker endpoint success with fixtures does not establish live Worker-to-Atlas connectivity. Rotation, account access, ingress approval, secret upload, public endpoint checks and frontend activation must be confirmed separately.

Sources: [Cloudflare MongoDB integration](https://developers.cloudflare.com/workers/databases/third-party-integrations/mongodb/), [MongoDB Atlas network access](https://www.mongodb.com/docs/atlas/security/ip-access-list/).
