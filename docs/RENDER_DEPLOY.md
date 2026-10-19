# Render deployment — frontend only

Create a **Static Site** (not a Web Service) connected to private GitHub repo `jrpasolini/bioflow`.

| Render setting | Value |
| --- | --- |
| Branch | `main` |
| Root directory | leave empty (monorepo root) |
| Build command | `npm install --no-audit --no-fund && npm run build -w @bioflow/web` |
| Publish directory | `apps/web/dist` |

- A frontend build does not launch the Cloudflare Worker. Provision the private R2 bucket and Auth0 authentication separately before enabling document upload.
- For SPA client-side paths in future, add a Render rewrite: `/*` → `/index.html` with action **Rewrite**.
- Never set server secrets in frontend environment variables prefixed with `VITE_`.
- Current interface uses 100% fabricated demo records; protected PDF controls are disabled until Auth0 and R2 are configured.
- Deploy without real patient PDFs, names, dates, or medical data.
