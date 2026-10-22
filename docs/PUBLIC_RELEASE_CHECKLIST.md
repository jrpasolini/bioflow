# BioFlow — Public release preflight (2026-10-21)

This document is an evidence log and checklist for publishing `jrpasolini/bioflow`. It contains **no secrets or real health records**.

## Verified in linked services
- GitHub repository was private when inspected. The linked GitHub interface provides file/commit access but **no change-visibility action**, so its public status cannot be asserted or changed using this integration.
- Default branch: `main`. GitHub Actions CI includes tests, type checking, web and subpath builds, PWA checks, and Worker build verification.
- Project owner confirms all sample PDFs are entirely fictional and downloads work. Existing publication audit lists each PDF and SHA-256. Exactly **one ZIP containing three held-out sample PDFs** is versioned under `apps/web/public/demo/bioflow-3-exames.zip`; there are also 26 baseline synthetic PDFs.
- Authenticated Atlas inspection: cluster exists and is running. `bioflow_demo.demo_reports` has 26 report documents. `bioflow_demo.demo_results` has 258 documents (not equivalent to count of individual reading fields in source artifacts). User `bioflow_runtime` has `read` on `bioflow_demo` only. `bioflow_sessions_rw` and `bioflow_demo_writer` have `readWrite` on `bioflow_sessions`, not on baseline; `demo_imports` has an `expiresAt` index.
- Atlas network list currently includes a broad `0.0.0.0/0` entry documented as temporary through 2026-10-29 (Atlas limits temporary entries to 7 days; the owner decided on 2026-10-22 to make it permanent). This is acceptable only as a consciously accepted risk for the synthetic prototype; do not use with real patient data.
- The source Worker has `ENABLE_GEMMA_DEMO=true`, `ENABLE_PDF_ENDPOINTS=false`, and a `GET /api/health` build marker of `gemma-v6-strict-chunks`. A prior audit documents a successful production Gemma import at approximately 19:20 Brazil time on 2026-10-21 and recorded Worker deployment `94a8342e`. This does not attest parity with later commits.

## Release blockers requiring account-side evidence
1. **Old admin secret:** `docs/WORKER_DEPLOY.md` reports an Atlas administrator password was previously exposed. Confirm revocation/rotation and check other services using it. Removing a secret from the newest commit does not erase it from Git history.
2. **Repository history and binary review:** a final history-wide scan for keys, JWTs, connection URIs, identity fields and private data, including binary PDF attachments. GitHub's secret-scanning alerts should be reviewed. The current tree contains sanitized fictional PDFs per `docs/PDF_PUBLICATION_AUDIT.json`; independent history-wide binary inspection was not completed by this audit.
3. **Source license:** no root `LICENSE` file was found in the checked tree. The author must select and authorize the code license (e.g. MIT or Apache-2.0) and ensure third-party attributions remain intact before representing the repo as openly licensed.
4. **Public Worker Atlas-backed overview:** configure `MONGODB_URI` only as a Cloudflare Worker secret with **`bioflow_runtime`**, then obtain a live `GET /api/demo/overview` response with `source:"mongodb-atlas-synthetic"`. `databaseConfigured:true` is configuration, not a successful DB ping. Never paste credentials into issues, logs, commits, Render or frontend VITE variables.
5. **Deployment parity:** obtain live `GET /api/health` and record its `build`, `gemmaReady`, `databaseConfigured`; compare with the head commit and Cloudflare deployment ID. The public endpoints could not be reached through this analysis environment.
6. **Gemma test scope:** the owner confirms successful PDF import; the audit briefing documents one 29-page extraction. Independent end-to-end tests for *all three* sample PDFs, session isolation, expiry and inaccessible private routes should be recorded before claiming full coverage.

## Publish (after the blockers above)
1. In the GitHub browser: `jrpasolini/bioflow` → **Settings** → **General** → **Danger Zone** → **Change repository visibility** → **Make public** → complete the GitHub confirmation.
2. Open `https://github.com/jrpasolini/bioflow` in a private/incognito window to establish unauthenticated access to the source and documentation.
3. Re-run GitHub Actions on the public repository, verify there are no secrets or private artifacts, and update the DEV challenge article's Code link and the actual deployment SHA.

Do **not** publish real clinical data, passwords, database URIs or root API keys. The public demonstration is fictional and distinct from any future Auth0-gated private records.

## Auth0 for AI Agents category
Auth0 OTP/TOTP proves end-user identity when the configured flow actually succeeds. The official partner description additionally calls for using Auth0 **to sign users into an AI agent, scope an agent's tool/API access, require consent for risky actions, or authorize RAG retrievals**. The BioFlow code currently exposes a public synthetic Gemma demo separately from optional human Auth0 login; no verified identity-bound Gemma/tool authorization was established in this audit. Do not advertise a verified agent-delegation integration based solely on the demo code or ordinary site login.
