# Public Worker rollout

## Prepared configuration

- Worker: `bioflow-api`, compatibility date `2026-10-19`, `nodejs_compat`.
- Only allowed browser origin: `https://bioflow-6d0z.onrender.com`.
- Atlas: `bioflow_demo`, explicitly synthetic `demo_*` collections only.
- PDF routes: `ENABLE_PDF_ENDPOINTS=false`; no R2 binding and no Auth0 credentials provisioned.
- React remains fixture-backed until `VITE_API_BASE_URL` is set to a verified Worker origin.

## Account prerequisites and approvals

1. Rotate the previously exposed Atlas administrator password **before** deploying or widening network access. Do not reuse it in the Worker. Update any legitimate consumers separately.
2. Create a separate runtime user scoped to `bioflow-cluster`, with `read` on `bioflow_demo` only. A seed job may need its own `readWrite` user; public reads do not.
3. Inspect the selected Cloudflare account, existing Worker, deployment version and secret names. Confirm the account and deployment before publishing. Never print tokens or secret values.
4. Review Atlas ingress. The checked project had a single `/32` allowed IP, so ordinary dynamic-egress Workers cannot be assumed to connect. Do not silently replace it with `0.0.0.0/0`. Broad ingress exposes the cluster listener to the Internet even though TLS and database authentication still apply. Prefer a controlled egress/proxy design for sensitive data. Any broadening requires explicit approval and this deployment must remain synthetic-only.
5. Review rate limiting and expected request volume before public traffic. The Worker opens and closes a small MongoDB client per request; free-cluster connection limits and TLS handshake latency still apply. Timeouts bound individual operations, not a guaranteed end-to-end latency. Consider a Durable Object or controlled backend if traffic warrants it.

## Secret and deployment

In `apps/api`, set `MONGODB_URI` through a secure secret input (`wrangler secret put MONGODB_URI` or Cloudflare's secret UI). Do not pass it as a shell argument, put it in command history, copy it into chat, or store it in GitHub/Render/VITE variables. Credentials must be URL encoded in the URI. Preserve TLS certificate validation.

After approval, run `npm run deploy -w @bioflow/api`. Record the actual Worker URL and deployment version. A dry run is not a deployment.

Check against the deployed URL:

- `/api/health`: HTTP 200; `databaseConfigured:true`, `demoOnly:true`, `pdfEndpointsEnabled:false`, `storageReady:false`, `authReady:false`. This is liveness/configuration, not a database ping.
- `/api/demo/overview`: HTTP 200, `source:mongodb-atlas-synthetic`, 8 reports and 44 observations. A 200 with `synthetic-fixtures` does **not** verify Atlas.
- CORS: exact Render origin gets `Access-Control-Allow-Origin`; another origin gets no permission and its preflight returns 403. CORS is not authentication: this is intentionally a public synthetic endpoint.
- PDF list, upload and download: HTTP 503 `pdf_endpoints_disabled`; never upload a real report to test them.

## Frontend activation and rollback

Only after the checks pass, set **only the public Worker origin** as `VITE_API_BASE_URL` in Render, approve the frontend deployment and rebuild. The adapter sends no cookies or auth tokens, validates the synthetic contract and rejects redirects, malformed responses and unexpected sources. On an API error it displays local fictional fixtures with an explicit refresh failure message. No API response is persisted in browser storage.

Rollback: remove `VITE_API_BASE_URL` and redeploy the frontend to restore fixture-only mode. If necessary roll back the Worker to the previously recorded version. Changing a secret may affect more than a code rollback; keep its operational recovery separate and never restore the exposed password.

## PWA and documents

The build generates a versioned app-shell service worker, PNG icons and a web manifest. It caches only explicitly built public resources. It ignores API requests, private PDFs, cross-origin URLs, queries and mutations. Installation availability depends on browser support and HTTPS; iOS uses the Share menu. The install dialog provides instructions when a native install prompt is unavailable.

`Add report` explains the current protected-storage prerequisite; it does not upload or retain a file. Each chart point retains its collection/report ID and opens that collection. Original download remains unavailable until a canonical PDF actually exists with authenticated private R2 access. No generated PDF is substituted for the original.

## Verification scope

Local checks cover API routes/CORS/PDF denial, response contracts, outages, exam-to-point provenance, app build, Worker bundle and PWA cache boundaries. Live Atlas counts were inspected through the Atlas connector. Local Worker endpoint success with fixtures does not establish live Worker-to-Atlas connectivity. Rotation, account access, ingress approval, secret upload, public endpoint checks and frontend activation must be confirmed separately.

Sources: [Cloudflare MongoDB integration](https://developers.cloudflare.com/workers/databases/third-party-integrations/mongodb/), [MongoDB Atlas network access](https://www.mongodb.com/docs/atlas/security/ip-access-list/).
