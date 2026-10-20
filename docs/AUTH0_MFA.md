# Auth0 private-account MFA — integration contract

The public code `110526` is a **non-secret, synthetic-demo-only UI shortcut**.
It is not accepted by any private API, cannot mint an Auth0 token, and MUST NOT
be set as an MFA recovery code. Do not put real medical data in this demo.

## Backend enforcement already in code

Private PDF routes require a valid Auth0 RS256 JWT with the configured issuer,
audience, owner `sub`, **and** a strict signed boolean access-token claim
`https://jrpasolini.tech/bioflow/mfa: true`. Missing claims fail closed.
A client-provided HTTP header or demo code cannot assert this claim. Backend
enforcement is NOT equivalent to a functioning Auth0 login flow.

## Configuring Auth0 — still required before enabling private records

1. Register a **Single Page Application** in an Auth0 tenant and configure the
   exact BioFlow callback, logout and web origins (including /bioflow/ deployment).
2. Integrate the official Auth0 SPA SDK with Authorization Code + PKCE and
   Universal Login in the frontend. No Auth0 password, seed, code or token goes
   into the public demo code field. Never use a handwritten implicit flow.
3. Enable the **OTP authenticator** factor and enforce it in the Auth0 login flow.
   Prefer the modern `api.authentication.enrollWith({type:'otp'})` for first-time
   enrollment and `api.authentication.challengeWith({type:'otp'})` for registered
   users in a Post-Login Action; use test accounts to validate both cases. Keep
   enrollment/recovery entirely within Auth0.
4. Use a **subsequent** Post-Login Action, after the challenge/enrollment, to
   confirm `event.authentication.methods` contains a successful `mfa` event.
   Only then call:
   `api.accessToken.setCustomClaim('https://jrpasolini.tech/bioflow/mfa', true)`.
   Do not set the claim solely because a user is enrolled or requested a challenge.
   Validate that it reaches the intended **API access token**, not just the ID token.
5. Configure Worker secrets and bindings separately:
   `AUTH0_ISSUER_BASE_URL`, `AUTH0_AUDIENCE`, `BIOFLOW_OWNER_SUB`,
   a private R2 bucket, and explicit `ENABLE_PDF_ENDPOINTS=true` after
   authorization tests and security review. Never expose tokens/secrets to Vite.
6. Test expired/missing/wrong-audience/wrong-owner tokens, no-MFA tokens and
   completed OTP MFA, including first enrollment, recovery and sign-out.
   Review access limits before adding multi-user patient records.

**Current state:** This change only strengthens backend verification and replaces
the public entry page. It does not create an Auth0 tenant, install/configure the
SPA SDK, complete real MFA, activate private routes or enable real uploads.

References:
- https://dev.auth0.com/docs/universal-login
- https://support.auth0.com/center/s/article/using-actions-mfa-authentication-method-is-missing-on-first-login
- https://support.auth0.com/center/s/article/Set-access-token-claims-using-actions
