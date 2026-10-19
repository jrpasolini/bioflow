# BioFlow

**Your Health. Your History. Your Control.**

BioFlow is a new application started during Hacktoberfest 2026 Week 3. It was conceived from a personal need: helping a family member keep track of laboratory results over time.

> **SYNTHETIC DEMO ONLY.** Walter White is a fictional demo identity; all readings, dates and laboratory names are invented. No personal records, source PDFs or patient archives are committed. BioFlow does not diagnose or replace original medical reports.

## Current milestone

- React + TypeScript: overview, marker evolution and report details for fabricated collections.
- Cloudflare Workers API: public synthetic overview and protected original-PDF upload, index and byte-for-byte download using private Cloudflare R2.
- Authorization boundary: Auth0 JWT verification and allowlisted owner; secure routes fail closed until configured.
- **Not yet integrated:** MongoDB Atlas, live Auth0 frontend login, Gemma extraction and production hosting. No real medical data may be processed in this prototype.

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

An uploaded canonical PDF remains byte-for-byte intact in a **private** R2 object. Its SHA-256 fingerprint and immutable object identifier are maintained separately from the extracted readings. Download is authorized by the backend; the original is never regenerated from AI output. The future MongoDB Atlas integration will link clinical records to private object metadata.

## Development and competition

Track real Copilot-assisted changes and resulting tests in the development log. Do not claim category eligibility until its actual use is documented. Publish only synthetic data after a separate privacy and license review.
