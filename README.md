# BioFlow

**Your Health. Your History. Your Control.**

BioFlow is a new application started during Hacktoberfest 2026 Week 3. It was conceived from a personal need: helping a family member keep track of laboratory results over time.

> **SYNTHETIC DEMO ONLY.** Walter White is a fictional demo identity; all readings, dates and laboratory names are invented. No personal records, source PDFs or patient archives are committed. BioFlow does not diagnose or replace original medical reports.

## Current milestone (updated 2026-10-21)

- **Synthetic-only public demonstration:** the React + TypeScript application is hosted at [jrpasolini.tech/bioflow](https://jrpasolini.tech/bioflow/). The public code `110526` is a convenience entry to fictional content, **not** a password, MFA factor or grant to private data.
- **Google Gemma 4:** a production execution of PDF-to-Markdown conversion, structured reading, human review and a confirmed MongoDB visitor-session import was recorded in [the audit briefing](docs/AUDIT_BRIEFING.md) on October 21. The project owner has also confirmed successful operation. `ENABLE_GEMMA_DEMO` is **true in the current versioned Worker configuration**. This does not establish that every historic or future deployment has the same configuration.
- **Demo inputs:** three fictional allowlisted PDF reports, distributed together in [the synthetic sample ZIP](apps/web/public/demo/bioflow-3-exames.zip), with SHA-256 checks before inference. The 26 baseline PDFs are sanitized, synthetic demonstrations; **do not upload real patient reports**.
- **MongoDB Atlas:** `bioflow_demo` contains 26 fictional reports. A separate `bioflow_sessions` database accepts only reviewed short-lived visitor imports. The Atlas runtime user has `read` on `bioflow_demo`, and the import writer has `readWrite` on `bioflow_sessions` only. TTL indexes exist; cleanup is asynchronous.
- **Important difference:** the Worker reads baseline data from Atlas only if its secret `MONGODB_URI` is configured. Otherwise `GET /api/demo/overview` reports `source: "synthetic-fixtures"`. A verified running Atlas cluster, or a successfully stored import, alone does **not** prove the public overview is Atlas-backed. The runtime must return `source: "mongodb-atlas-synthetic"` to substantiate that claim.
- **Auth0 and private documents:** Auth0 Universal Login + OTP/TOTP integration and guarded private R2 document routes exist in source, but `ENABLE_PDF_ENDPOINTS=false` keeps private clinical uploads unavailable. The owner reports Auth0 configured; current real-user MFA completion, private route enablement and delegated agent authorization are distinct checks. The public six-digit demo code never unlocks these routes.
- **Verification record:** last audit reports a successful live 29-page Gemma extraction on 2026-10-21, alongside a prior Worker deployment identifier `94a8342e`. Source currently reports the health build marker `gemma-v6-strict-chunks`; **production parity with the newest commit must still be checked against the live endpoint**. See [Gemma demo status](docs/GEMMA_DEMO.md) and [Worker deployment](docs/WORKER_DEPLOY.md).

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
# In another terminal:
npm run dev:api
```

The frontend runs at http://localhost:5173. Protected PDF features stay disabled until R2 and Auth0 are configured.

```bash
npm run test
npm run typecheck
npm run build
```

## Repository map

- `apps/web` — user experience, demo dashboard
- `apps/api` — Worker routes, token validation and private PDF preservation
- `packages/fixtures` — entirely fabricated sample records
- `docs` — decisions, planned data model, security and development log
- `.github/copilot-instructions.md` — development guidance for GitHub Copilot

## Document preservation guarantee

The private-document implementation is designed to keep the original PDF bytes unchanged in a **private** R2 object, with SHA-256 integrity information and authenticated downloads. **Those private routes are disabled in the public demo** until Auth0 MFA, access control, storage and privacy have been verified. The public demonstration instead processes three SHA-256-allowlisted fictional PDFs and stores only reviewed structured readings in short-lived MongoDB sessions. AI output is never a replacement for the laboratory's original document.

## Development and competition

Track real Copilot-assisted changes and resulting tests in the development log. Do not claim category eligibility until its actual use is documented. Publish only synthetic data after a separate privacy and license review.
