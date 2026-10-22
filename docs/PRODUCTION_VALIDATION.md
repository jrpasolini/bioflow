# Production validation — 2026-10-21 (America/Sao_Paulo)

This is an independent verification record. Historical success and configuration
flags are not substitutes for the HTTP and database checks below.

## Final Atlas acceptance

After the owner privately synchronized the saved database-user password and
Worker secret, the production overview independently returned **HTTP 200** with
`source: mongodb-atlas-synthetic`, **26 reports and 604 readings**.

- Running source commit: `a52456c60e70fbbc65b9920d7d67b197219cfe2c`.
- Active Cloudflare version: `93298a07-7862-488e-bfa1-940249f771de` (100% traffic).
- Deployment ID: `ec7ae37a-9f3b-4ebc-9efc-93c453821dc0`, created at
  `2026-10-22T02:31:40.094Z` (2026-10-21 23:31:40 America/Sao_Paulo).
- Live health confirms the same source commit, `session-v7-expiry-isolation`,
  `databaseConfigured: true`, `gemmaReady: true` and private PDF routes disabled.
- [PR #5](https://github.com/jrpasolini/bioflow/pull/5) added fixed error
  categories after its CI passed; a follow-up handles wrapped Atlas
  authentication errors. Diagnostics never expose connection strings or driver
  messages. 73 application tests, TypeScript and the Worker bundle passed.

The original overview credential blocker is resolved. The deployment's secret
values were entered by the owner; no credential was copied into repository
files, assistant output or validation artifacts.

### Final model smoke run and bounded retry

The full final run independently passed the Atlas overview, one-hour session
issuance, tampered-token refusal, private PDF denial and a successful October 2
extraction/confirmation (56 readings, HTTP 200/201, 44 seconds). Its proof was
refused in the second session, and that visitor's history stayed empty.

May 15 and October 1 returned `502 incomplete_extraction` after 38 and 75
seconds, respectively. One targeted retry per failed sample again returned 502
after 43 and 48 seconds. No confirmation was attempted for these refused drafts;
no partial report was offered or saved. No additional automatic retries were made.

Therefore **Atlas connectivity, baseline integrity, session isolation and
expiration protections pass their stated checks; the final AI smoke run is not
all green**. Gemma reliability remains an explicit limitation, distinct from the
resolved database and legacy-index defects. Earlier successful three-sample
imports are retained below with their actual intermediate version, not presented
as successes on the final version.

The replay tool accepts optional comma-separated audited sample filenames so a
failed sample can be retried without repeating every paid extraction. The full
and retry reports contain only statuses, counts and public provenance.

## Intermediate corrected deployment independently checked

The owner explicitly approved the public PR, precise synthetic baseline repair
and publication. [PR #4](https://github.com/jrpasolini/bioflow/pull/4) passed
GitHub Actions run `39708802478` and was merged.

- Deployed source: `c05d1b0bee97050d3d0a8c4d273febd963e8f622` (merge of correction
  commit `7b7ff017ed81dbc3f9c7c149c693c8fab3c49ac3`).
- Cloudflare version: `4762b0ae-5f82-42d5-acbc-f82fbc1bf3fe`, deployed at
  `2026-10-22T02:01:37.827Z`, 100% traffic.
- Live health independently returns `build: session-v7-expiry-isolation` and
  `commit: c05d1b0bee97050d3d0a8c4d273febd963e8f622`, with Gemma enabled and
  private PDF routes disabled. The database flag is now true, which proves
  binding presence only.
- A fresh production run from `2026-10-22T02:02:38Z` to `02:04:21Z` extracted
  and saved **all three samples in the same session**, with HTTP 200/201:
  May 15: 58 readings/44 seconds; October 1: 53 readings/37 seconds;
  October 2: 57 readings/20 seconds. Counts vary across model executions;
  transport/schema success is not independent verification of every reading.
- All three cross-session proof replays were refused; the second visitor's
  history stayed empty. Extraction alone still caused no write.
- Atlas now contains exactly 26 reports and 604 readings, with zero duplicate
  `(reportId, code)` pairs. A full readback confirmed that the 258 pre-existing
  documents were unchanged and the assembled baseline passes validation.
- The published frontend bundle contains the new session expiration handling,
  correct API origin, Auth0 configuration and public demo entry. Both entry
  paths were visually checked in Portuguese and English. Demo entry worked;
  when the overview failed, the UI explicitly labeled its local fallback.

At this intermediate deployment, `/api/demo/overview` still returned HTTP 503
while private credential entry was in progress. This historical observation is
superseded by the successful final Atlas acceptance above. No password, bearer
token or proof was copied into this document or the public PR.

Dates above are UTC for exact deployment matching; all events occurred on
2026-10-21 in America/Sao_Paulo.

## Production observed before these fixes

- Frontend: `https://jrpasolini.tech/bioflow/`.
- Correct API: `https://bioflow-api.antonio-pasolini.workers.dev`.
  The older `bioflow.antonio-pasolini.workers.dev` is a different Worker.
- Active version, confirmed with `wrangler deployments list` and `versions view`:
  `34bbfa66-f95e-4f67-8541-1c2982966a1d` (100% traffic).
- That version's deployment annotation identifies source commit
  `269f40bcc1b363176b34625eb20b7452128bc85c`. Its API source/configuration is
  unchanged through repository commit `b099cadf8d56ead79da9019e503dc3c041bc44b2`.
- Live health: `build: gemma-v6-strict-chunks`, `gemmaReady: true`,
  `databaseConfigured: false`, private PDF endpoints disabled.
- `/api/demo/overview`: HTTP 200, `source: synthetic-fixtures`, 26 reports and
  604 readings. **The production overview did not read Atlas.** Secret-name
  inspection independently confirmed that `MONGODB_URI` was absent.

## Live session and expiration evidence

The repeatable smoke test is `scripts/verify-demo-production.mjs`. It accepts
only the three hash-audited fictional PDFs from the published ZIP, verifies their
hashes before upload and retains bearer tokens and HMAC proofs in memory only.
Its JSON report contains statuses/counts, never credentials or model output.

On the production version above:

| Sample | Extraction | Numeric readings | Confirmed save |
| --- | --- | --- | --- |
| 2026-05-15 | 200, 34 seconds | 54 | 201 |
| 2026-10-01 | 200, 50 seconds | 53 | 503 `demo_persistence_failed` |
| 2026-10-02 | 200, 34 seconds | 56 | 503 `demo_persistence_failed` |

Each sample's proof was refused when replayed from a second signed session
(403 `invalid_proof`). The second session's history remained empty even when a
query parameter requested the first session. The first session saw its saved
sample. Extraction alone did not write an import. Tampering with a session token
returned 401. A demo code bearer could not open private PDF routes (503).

Atlas contains both `unique_session_sample` (`sessionId`, `sha256`) and legacy
`uniq_session_source` (`sessionId`, `sourceSha256`) indexes. New documents omitted
`sourceSha256`, causing later samples in one session to collide on the missing
field. The fix populates both digest fields, preserving existing indexes/data.
A regression test reproduces the collision and saves all three distinct samples.

A separate disposable, explicitly synthetic canary was inserted into
`bioflow_sessions.demo_imports` at `2026-10-22T01:48:51.027Z`, with a BSON Date
`expiresAt` of `2026-10-22T01:49:21.027Z`. A read confirmed it existed and the field
was a date. A subsequent count returned zero without any explicit delete.
This verifies actual TTL cleanup on the collection; the connector's index listing
alone does not expose all TTL options. It is not an hour-long token lifetime test.

Local tests cover expired/tampered/boundary-expired tokens, cross-session proof
replay, expiry during database access, session-anchored retention and exclusion
of expired rows before MongoDB's asynchronous TTL deletion. The frontend now
clears temporary reports/drafts at the signed session deadline and rejects late
responses; it no longer promises a fresh 60 minutes after a late confirmation.

## Atlas baseline discrepancy and applied repair

Authenticated connector reads confirmed 26 reports but only 258 result documents.
All 258 readings match the current fixtures by `(reportId, code)` and value;
346 current readings are absent. The fictional patient's date of birth is also
stale (`1958-09-07` versus the published fixture's `1962-04-01`).

The approved repair inserted only the missing 346 synthetic readings and
updated only that fictional date, preserving the 26 report records and every
existing reading. A read-only merge simulation passes the full current contract
and yields 26 reports/604 readings; full readback after applying the repair
independently confirmed those counts and preservation of the original readings.

The seed script now matches readings by natural identity instead of a changing
ID suffix, preventing duplication on reseeding. The Worker rejects partial or
outdated Atlas baselines instead of silently replacing the published dataset.
If a configured Atlas read fails validation or connectivity, it returns a
sanitized 503; the frontend labels its local fictional fallback.

## Local release checks

73 application tests pass, including both Auth0 OTP actions, strict MFA claim
handling, the separate public demo code, isolation, expiry, full baseline parity
and TTL provisioning options. TypeScript, the `/bioflow/` build, 3 subpath tests,
3 PWA tests and the Worker dry-run bundle are checked before publishing. PDF/ZIP
bytes are marked binary in Git so Windows line-ending conversion cannot break
the audited SHA-256 fingerprints. No PDF content or baseline fixtures changed.

## Release gates and provenance

The corrected deployment and its verified scope are recorded above.
`/api/health` accepts the non-secret `BUILD_COMMIT` variable for source
provenance. Deployment, configuration and successful imports alone do not
certify the overview's independent read-only Atlas connection.

The owner completed the read-only credential entry. The live overview now
returns `mongodb-atlas-synthetic`, 26 reports and 604 readings, and the active
version created by that secret update is recorded above.

Auth0/TOTP and public demonstration remain separate entry paths. No Auth0
policy changes, private R2 route activation or Atlas ingress expansion was applied.

Real Auth0 login requires the owner's interactive authentication and OTP; no
new end-to-end login is claimed merely from the action unit tests. Existing
Atlas user-role metadata confirms `bioflow_runtime: read` on `bioflow_demo` and
session writers' `readWrite` only on `bioflow_sessions`; this is not an effective
credential-level negative permissions test.

## Handoff items 2.1–2.7 — 2026-10-22 (America/Sao_Paulo)

Read-only evidence, gathered 17:47–18:00 BRT (UTC-3). No Atlas, Cloudflare,
secret, deploy or index change was made. Owner decisions in this section were
recorded by Antonio Pasolini on 2026-10-22. No password, URI or token is copied
here.

### 2.1 Production verification

`scripts/verify-demo-production.mjs` ran against
`https://bioflow-api.antonio-pasolini.workers.dev`. **19/19 checks passed**,
from 2026-10-22 17:43 to 17:45 BRT (`2026-10-22T20:43:19Z` through
`2026-10-22T20:45:02Z`). The report is
`docs/validation/verify-report-2026-10-22.json`. It contains statuses and
counts only.

### 2.2 Atlas network access list

This pass did not read the live Atlas network access list. No Atlas Admin API
access was available; the MongoDB connector exposes data tools only.

The Worker reaches Atlas with TCP `connect()`. Cloudflare documents that these
connections come from an undocumented prefix, and that Dedicated CDN Egress IPs
(Enterprise) are not used for `connect()`. The Atlas Data API reached end of
life in September 2025. Hyperdrive supports Postgres and MySQL only, not
MongoDB.

Antonio Pasolini signed the following justification on 2026-10-22 to keep
`0.0.0.0/0`. Cloudflare Workers TCP egress has no fixed IPs. This is a
non-commercial challenge demo with entirely fictitious, synthetic data, so a
paid fixed-IP relay or extra paid security layers are not justified. Protection
relies on strong rotated credentials held only in Worker secrets, least-privilege
database users scoped to `bioflow_demo`, and no real data ever. If the project
became commercial, the cost of security layers and of data growth would be
re-evaluated. The entry was created as temporary and expires on 2026-11-04. The
owner must make it permanent or extend it in Atlas before that date. Signed:
Antonio Pasolini, 2026-10-22.

Role metadata already recorded in this document remains `bioflow_runtime: read`
on `bioflow_demo` and session writers' `readWrite` only on `bioflow_sessions`.
The signature above does not itself change the Atlas access list.

### 2.3 Secret scan of full git history

Clone of `jrpasolini/bioflow` at `2785659`, all refs (145 commits, 6 remote
branches). `gitleaks detect --log-opts="--all" --redact` (v8.21.2) scanned 136
commits and **found no leaks**.

A search of every patch for `mongodb://` and `mongodb+srv://` found only
placeholder or fixture URIs. Examples: `DEMO_USER` / `YOUR_DEMO_USER` in
`.env.example` and docs (commit `19fe63b`); a test fixture with user `fictional`
on a `.invalid` host (commit `9a8251e`). No `mongodb.net` hostname appears in
history. No `.env`, `.dev.vars`, key or credential file was ever committed.
The only env examples are `.env.example` and `apps/web/.env.example`.

Antonio Pasolini confirmed on 2026-10-22 that the Atlas administrator password
was rotated on 2026-10-21. The new value is stored only in the Worker secret.
The full-history gitleaks scan above (`--all`, redacted) found no leaks. An
exact-value search for the previous password remains an owner check and is
**not done**. It could not be run here without the value. The owner still has
to run `git log --all -p | grep -cF '<old value>'` locally and confirm the
count is 0. That value stays out of this repository.

PDFs in history are exactly the 26 `apps/web/public/demo/laudo-*.pdf` files,
added in `bbc7ece` and never modified or deleted. All 26 SHA-256 digests match
`docs/PDF_PUBLICATION_AUDIT.json`. The `bioflow-3-exames.zip` hash matches
`zipSha256`.

### 2.4 Repository visibility

`jrpasolini/bioflow` is already public as of 2026-10-22, verified by an
anonymous clone. At about 17:50 BRT the same day, the GitHub API also reported
the repository as public. Recorded by Antonio Pasolini, 2026-10-22.

### 2.5 Deploy parity

`/api/health` reports commit `d0b9eedb9d1ae008ce69ebdd58d5c47bd5ef6f18` and
build `gemma-v8-provider-diagnostics`.

Active deployment `33bdc8fe-3679-4366-9d46-9ff58cc26809` (version
`f3c1b1ee-59e3-41bc-a5cf-1627c56c9d82`, #43, 100% traffic) was created on
2026-10-22 at 10:37 BRT via wrangler and annotated with source `d0b9eed`.
The `BUILD_COMMIT` variable is `d0b9eed`.

`main` was `2785659`. The range `d0b9eed..2785659` is one commit (#8). It
changes only `scripts/verify-demo-production.mjs` (+7/−2), which is not part
of the Worker. Runtime code is at parity with the deployed source. No redeploy
is required for that commit.

### 2.6 Worker configuration (names and flags only)

Bindings: `AI` (Workers AI) and `DEMO_RATE_LIMITER` (3 requests / 60 seconds).
Secret names: `DEMO_SESSION_SECRET`, `MONGODB_URI`, `MONGODB_DEMO_WRITE_URI`.
Variables: `APP_ORIGIN`, `BUILD_COMMIT`, `MONGODB_DB=bioflow_demo`,
`ENABLE_GEMMA_DEMO=true`, `ENABLE_PDF_ENDPOINTS=false`.

No R2 bucket binding and no Auth0 bindings are deployed. Health reports
`storageReady: false`, `authReady: false` and `pdfEndpointsEnabled: false`.
This matches `wrangler.jsonc`.

The rate limit of 3 requests per 60 seconds per IP is verified from this
binding and from the client-IP key described in 2.7. A billing or budget alert
has not been created. That remains pending the owner.

### 2.7 Abuse and cost controls

The Workers Rate Limiting binding `DEMO_RATE_LIMITER` (namespace 8701,
`limit 3`, `period 60`) is declared in `wrangler.jsonc`.
`apps/api/src/demo-gemma.ts` keys it by `kind:CF-Connecting-IP`, with separate
`session` and `gemma` buckets, and returns 429 `rate_limited`. It fails closed
when the binding or the IP is missing, and `demoReady()` requires the binding.
**3 requests per 60 seconds per IP is verified** as this configuration. The
Cloudflare rate limiter is per location and eventually consistent, so it is
abuse control, not an exact quota.

No billing or budget alert is configured. The notification policy list was
empty when read on 2026-10-22. Available types include `billing_usage_alert`
and `billing_budget_alert`. Creating one remains pending the owner. No policy
id, threshold or creation date is recorded.
