# BioFlow

> Latest independent production verification: [production validation](docs/PRODUCTION_VALIDATION.md).

**Your Health. Your History. Your Control.**

BioFlow is a new application started during Hacktoberfest 2026 Week 3. It was conceived from a personal need: helping a family member keep track of laboratory results over time.

> **SYNTHETIC DEMO ONLY.** Walter White is a fictional demo identity; all readings, dates and laboratory names are invented. No personal records, source PDFs or patient archives are committed. BioFlow does not diagnose or replace original medical reports.

## Current milestone (updated 2026-10-21)

- **Synthetic-only public demonstration:** the React + TypeScript application is hosted at [jrpasolini.tech/bioflow](https://jrpasolini.tech/bioflow/). The public code `110526` is a convenience entry to fictional content, **not** a password, MFA factor or grant to private data.
- **Google Gemma 4:** independent production runs exercised fictional PDF conversion, human-reviewed temporary writes and cross-session proof refusal. The model can still return malformed chunks; the Worker responds with `incomplete_extraction` and refuses partial reports. The final smoke run was not all green, and the failed attempts plus bounded retries are retained in [production validation](docs/PRODUCTION_VALIDATION.md).
- **Demo inputs:** three fictional allowlisted PDF reports, distributed together in [the synthetic sample ZIP](apps/web/public/demo/bioflow-3-exames.zip), with SHA-256 checks before inference. The 26 baseline PDFs are sanitized, synthetic demonstrations; **do not upload real patient reports**.
- **MongoDB Atlas:** `bioflow_demo` contains 26 fictional reports. A separate `bioflow_sessions` database accepts only reviewed short-lived visitor imports. The Atlas runtime user has `read` on `bioflow_demo`, and the import writer has `readWrite` on `bioflow_sessions` only. TTL indexes exist; cleanup is asynchronous.
- **Important difference:** the Worker reads baseline data from Atlas only if its secret `MONGODB_URI` is configured. Otherwise `GET /api/demo/overview` reports `source: "synthetic-fixtures"`. A verified running Atlas cluster, or a successfully stored import, alone does **not** prove the public overview is Atlas-backed. The runtime must return `source: "mongodb-atlas-synthetic"` to substantiate that claim.
- **Auth0 and private documents:** Auth0 Universal Login + OTP/TOTP integration and guarded private R2 document routes exist in source, but `ENABLE_PDF_ENDPOINTS=false` keeps private clinical uploads unavailable. The owner reports Auth0 configured; current real-user MFA completion, private route enablement and delegated agent authorization are distinct checks. The public six-digit demo code never unlocks these routes.
- **Verification record:** the live overview now returns HTTP 200, `source: mongodb-atlas-synthetic`, 26 reports and 604 readings. The running source is `a52456c60e70fbbc65b9920d7d67b197219cfe2c`, Cloudflare version `93298a07-7862-488e-bfa1-940249f771de`. Session isolation and actual Atlas TTL cleanup were independently checked; 73 application tests pass. See [the production validation record](docs/PRODUCTION_VALIDATION.md) for scope and model limitations.

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

## License

BioFlow's original application code and documentation are licensed under the [MIT License](LICENSE) (Copyright 2026 Antonio Pasolini). Third-party fonts, icons, SDKs, dependencies and model weights retain their respective licenses; see the included attribution files and upstream notices.
