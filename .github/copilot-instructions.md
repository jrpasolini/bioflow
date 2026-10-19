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
