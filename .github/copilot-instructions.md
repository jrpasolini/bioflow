# BioFlow — GitHub Copilot instructions

BioFlow is a new medical-document organization demo for Hacktoberfest 2026.

- Never add real patient information, medical histories, names, images, PDFs, API keys or production tokens to source code, examples, prompts or logs.
- Demo identity is Walter White, clearly labeled fictional. Laboratory readings and dates must be independently fabricated.
- Store canonical uploaded PDF bytes **unchanged** in a private Cloudflare R2 bucket with SHA-256 integrity metadata; never reconstruct the original from AI output.
- Validate JWT signature, issuer, audience and patient authorization in backend before any document action; deny access if configuration is absent.
- Never implement public R2 URLs or expose credentials to the frontend.
- MongoDB Atlas stores observations, provenance and private object identifiers, not raw PDFs.
- Gemma proposes field extraction; humans review and confirm. No diagnosis and no silent rewriting of source evidence.
- Add tests for authorization, upload validation and provenance. Record meaningful changes in docs/DEVLOG.md.
- Document Copilot's actual involvement for the DEV challenge. Never invent participation.

- All new interface elements must respect both themes, reusing CSS tokens in `apps/web/src/styles.css`; avoid hardcoded UI colours.

- The interface must be bilingual: `en-US` default and `pt-BR` optional. Use `apps/web/src/i18n.ts` for all user-facing text and locale-aware dates/numbers; do not hardcode copy in components.
- Preserve both theme modes and language selection when adding features. Any new text must be translated in both locales.

- Every marker timeline data point must resolve to a source collection/report ID and date. Always use `markerHistory` for chart observations, never interpolate fictional readings or assume every report contains every marker.
- Overview sparklines and the detailed selectable chart are separate components; ensure accessible keyboard selection and bilingual labels in both light and dark themes.

- Show **all** measurements of the selected latest lab collection and label status only when that measurement has a valid source reference bound; missing bounds => "No reference" (never assume normal).
- Latest-summary featured measurement may be chosen by a deterministic **visual deviation** heuristic, never treated as medical severity or diagnosis. Keep calculation logic tested and separate from UI.

- MongoDB synthetic demo uses `bioflow_demo` and `demo_*` collections only.
  `scripts/seed-demo.mjs` may write ONLY these demo collections. It must never populate sensitive collections.
- Store `MONGODB_URI` only in ignored local env or Wrangler secrets, never as `VITE_*`.
- Public API must not return real clinical records, even if they are later stored in the same cluster.
  Future patient routes require Auth0 owner authorization and per-resource filters in every DB query.
