# MongoDB Atlas — BioFlow (implementation phase)

## Architecture

Render serves the static React application. The separate Cloudflare Worker uses the official
MongoDB Node.js driver (6.15+) to connect to Atlas over direct TLS/TCP.
**Do not place the Atlas URI in Render, `VITE_*`, frontend code or GitHub.**

Cloudflare documentation (Oct 16, 2026):
https://developers.cloudflare.com/workers/tutorials/connect-to-mongodb-atlas/

MongoDB is for structured data and provenance; **canonical original PDF bytes belong in private R2**.
Public demo records are segregated in `bioflow_demo` database:

| Collection | Purpose | Key/index |
| --- | --- | --- |
| `demo_patients` | Walter White synthetic profile | unique `id` |
| `demo_reports` | Each synthetic collection and source metadata | unique `id`, `patientId+collectedAt` |
| `demo_results` | Each marker reading, linked to report and collection date | unique `id`, `patientId+code+collectedAt`, `reportId` |

For future authenticated medical records we will create different production collections
(`patients`, `lab_reports`, `analyte_results`, `original_documents`,
`import_jobs`, `access_grants`, `audit_events`) with patient ownership,
audit, retention and document versioning. Never populate them with the demo fixture script.

## Provisioning checklist (Atlas console)

1. Create a dedicated Atlas **project** for BioFlow and a free/low-cost **M0** cluster if available in your region.
   Do not add a payment method or enable paid tiers without first reviewing limits and costs.
2. Create a dedicated database user with **readWrite only on `bioflow_demo`**; use a long unique password.
3. Configure the Atlas **Network Access** list. Workers use dynamic outbound addresses; discuss network controls
   before enabling Worker connections. Broad `0.0.0.0/0` ingress can enlarge exposure: do not use this
   for sensitive health records. This prototype must remain synthetic-only.
4. In the Atlas console, **Connect > Drivers**, copy the mongodb+srv URI. Keep the URI secret.
5. In the local repository root create an ignored `.env.local` containing:
   ```env
   MONGODB_URI=mongodb+srv://YOUR_DEMO_USER:YOUR_URL_ENCODED_PASSWORD@YOUR_CLUSTER_HOST/?retryWrites=true&w=majority
   MONGODB_DB=bioflow_demo
   ```
6. Install dependencies: `npm install`.
7. Run **`npm run db:seed:demo`**. It inserts/upserts only the synthetic Walter White fixture,
   creates demo indexes and prints only document counts. Rerunning is idempotent.
8. For Cloudflare Worker only, inside `apps/api`, configure the URI as a secret:
   ```sh
   npx wrangler secret put MONGODB_URI
   ```
   The Worker uses the nonsecret DB name `bioflow_demo` from Wrangler vars.
9. Deploy Worker separately after reviewing CORS, rate limiting and Atlas ingress.
   Public `GET /api/demo/overview` reads **only** the synthetic collections.
   When `MONGODB_URI` is absent it serves local synthetic fixtures; once configured,
   it refuses to silently fall back if the Atlas read fails.
10. Set `VITE_API_BASE_URL` on Render only once the Worker URL is deployed and
    tested; the current frontend remains fixture-powered until the data access
    adapter is implemented and verified.

## For the planned batch of 23 mock PDFs

- Keep the PDFs synthetic from their first byte, not anonymized actual reports.
- Validate upload, persist the exact PDF bytes into private R2, compute SHA-256.
- Create document metadata in Atlas that references the R2 object, then run Gemma
  extraction with human confirmation before results enter timelines.
- Ensure failures between object storage and MongoDB use retries/reconciliation,
  not silent loss or orphaned objects.
- Never give public access to original PDFs and never treat AI output as canonical.

## Important

This commit **does not create a real Atlas cluster, connect credentials, upload PDFs,
configure an Auth0 tenant or deploy an API**. Those actions require the actual
Atlas project and credentials plus the next authorization milestone.


## Worker and frontend activation

See [WORKER_DEPLOY.md](WORKER_DEPLOY.md) for the current credential-rotation gate, runtime read-only user, explicit ingress approval, live endpoint checks and frontend rollback. The React data adapter and PWA are implemented; activation still requires a tested public Worker origin.
