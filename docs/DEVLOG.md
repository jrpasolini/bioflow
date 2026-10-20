# Private development log — Hacktoberfest 2026 Week 3

## 2026-10-19
- BioFlow is founded as a new, independent application inspired by family caregiving.
- First fictitious patient: Walter White. Sample laboratory results, dates and facilities are independently invented for the competition demo.
- Initial UI sections planned: overview, evolution and reports.
- Canonical original PDF contract: private R2, original bytes retained, SHA-256, authenticated download.
- MongoDB Atlas, Auth0 frontend login and Gemma: next integrations, not completed yet.
- GitHub Copilot instructions added. Log actual use and reviewed code changes before reporting its participation in the challenge.
- DEV submission: English final article after a deployable, reviewed and privacy-safe build.

- Added light/dark themes with global CSS tokens, including trends, controls and alert surfaces.
- First visit follows operating-system preference; manual selection persists locally and loads before React to prevent flashing.
- Theme switch includes accessible labels and keyboard focus; new components must use theme tokens.

- Internationalization: US English is the first-visit default, regardless of browser language. Brazilian Portuguese is available via flags 🇺🇸 and 🇧🇷.
- Locale selection is persisted in localStorage and updates text, medical marker labels, fictional labs, charts, number/date formats, theme controls and document lang/title/description.
- Language dictionaries live in apps/web/src/i18n.ts so future pages and Auth0 flows can reuse the same architecture.

- Introduced a synthetic patient identification strip under Walter White: fictional DOB 1958-09-07, calculated age (UTC date), and BF-DEMO-001. Both languages use localized birth dates and labels.

- Every distinct lab indicator now receives a mini chronological sparkline on its overview card.
- Expanded the fabricated dataset to eight distinct collection dates. Each point on a detailed timeline is one real **synthetic fixture observation**, not interpolation, and links to its associated collection.
- Added selectable SVG points (mouse/keyboard), mobile-accessible numbered point selectors, source collection metadata, and contextual open-collection action. Time spacing follows **collection order**, not elapsed days; the axis is labeled accordingly.

- Latest collection now renders **every** result from its synthetic source report, not a truncated list. Each has a value, unit and translated badge (high / normal / low / no reference).
- A single highlighted headline is selected from out-of-range values by **proportional reference deviation**, a display heuristic only (NOT diagnosis, clinical risk or medical severity).
- Added nine independently fabricated measurements to the latest demo collection and consistent status badges in report details. Reference ranges must be the original lab's approved intervals when real data are eventually supported.
- Pure reference classification and highlighted-result selection have regression tests.

- Prepared Atlas direct-TCP adapter with official MongoDB Node driver, isolated `bioflow_demo` collections,
  proper report-to-observation reconstruction, deterministic seed script and limited demo indexes.
- Worker `/api/demo/overview` uses Atlas once configured or synthetic fixtures when URI is absent;
  if configured Atlas becomes unavailable it explicitly responds 503 instead of serving stale data.
- No DB credentials, real records, Worker deployment or Atlas cloud resources created in this commit.
