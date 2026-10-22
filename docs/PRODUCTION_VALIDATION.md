# Production validation — 2026-10-21 (America/Sao_Paulo)

This is an independent verification record. Historical success and configuration
flags are not substitutes for the HTTP and database checks below.

## Corrected deployment independently checked

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

**Remaining blocker:** `/api/demo/overview` returned HTTP 503 on this corrected
deployment. The owner's secure credential entry is still in progress. The
current overview read is **not certified** until it returns HTTP 200 with
`source: mongodb-atlas-synthetic` and 26 reports/604 readings. No credential,
password, bearer token or proof was read into this document or the public PR.

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

72 application tests pass, including both Auth0 OTP actions, strict MFA claim
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

Remaining gates:

1. Owner privately finishes the read-only `MONGODB_URI` credential on **bioflow-api**.
2. Verify live `source: mongodb-atlas-synthetic` and 26 reports/604 readings,
   and record the active version again if secret updates created a new version.

Auth0/TOTP and public demonstration remain separate entry paths. No Auth0
policy changes, private R2 route activation or Atlas ingress expansion was applied.

Real Auth0 login requires the owner's interactive authentication and OTP; no
new end-to-end login is claimed merely from the action unit tests. Existing
Atlas user-role metadata confirms `bioflow_runtime: read` on `bioflow_demo` and
session writers' `readWrite` only on `bioflow_sessions`; this is not an effective
credential-level negative permissions test.
