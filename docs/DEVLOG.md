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
