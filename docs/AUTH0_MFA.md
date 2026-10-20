# BioFlow / Auth0: real individual sign-in, OTP MFA and public demo

Status: **integration source implemented; tenant setup and real end-to-end
verification remain required**. Do not advertise live Auth0 MFA until tested.

## Two intentionally separate entry paths

1. **Public demo**: published `110526` code opens the synthetic Walter White
   dashboard. This is not Auth0 authentication, not a credential or recovery
   factor, not a bearer token, and MUST NEVER be accepted by any private API.
   The public demo must contain no personal medical data.
2. **Real Auth0**: a visitor selects **Sign in with Auth0** or **Set up
   authenticator**. Auth0's Universal Login handles individual account
   registration / first-factor authentication, then shows a **real QR code**
   for first OTP enrollment or requests a six-digit OTP from a previously
   enrolled authenticator. The React SPA SDK uses Authorization Code + PKCE.

The BioFlow public dashboard remains synthetic after Auth0 login; private
records require separate ownership, backend authorization and R2 setup.
An Auth0 session by itself never grants access to someone else's records.

### Source files

- `apps/web/src/auth0-session.tsx`: Auth0 React SDK provider, SPA login,
  sign-up hint and logout callbacks. No secrets in the browser build.
- `apps/web/src/auth0-config.ts`: required public tenant parameters.
- `apps/web/src/demo-entry.tsx`: separate quick-demo / real-Auth0 controls
  and transparently fictional recovery example.
- `infra/auth0/actions/01-require-otp.js`: Post-Login Action v3, trigger OTP
  enrollment (real QR) or challenge. Do NOT use the old after-flow MFA API.
- `infra/auth0/actions/02-mfa-access-claim.js`: subsequent Action that issues
  the **namespaced API access token** `.../mfa: true` claim only after Auth0
  reports a completed MFA method of type `otp`.
- `apps/api/src/index.ts`: existing fail-closed private PDF JWT guard:
  RS256 issuer, audience, owner `sub`, signed MFA claim; disabled by default.

## Configure the Auth0 tenant (manual configuration required)

1. In Auth0 Applications, create an **Application / Single Page Application**
   named BioFlow. Enable **New Universal Login**, a Database connection
   allowing sign-ups, and configure first-factor authentication (such as
   email and password). Do not enable passwordless-only or bypass flows that
   evade individual identity verification.
2. Application settings: set exact Allowed Callback URLs and Allowed Logout
   URLs to `https://jrpasolini.tech/bioflow/` (plus a localhost development
   callback if needed). Set Allowed Web Origins and Allowed Origins (CORS)
   as appropriate to `https://jrpasolini.tech` and local dev.
   For the deployed subpath, retain the trailing slash. If the Render app
   is actually served from another host, configure that exact host as well.
3. In Auth0 APIs, create a custom BioFlow API identifier
   (for example `https://jrpasolini.tech/bioflow/api`), with signed **RS256**
   access tokens. This identifier is NOT a URL you must host.
4. Dashboard > Security > Multi-factor Auth: enable **One-time Password**,
   enable **Customize MFA Factors using Actions** and follow current Auth0
   settings for an Actions-managed MFA policy. Use **Post-Login Action v3**.
   Install `01-require-otp.js` and set its Action secret
   `BIOFLOW_CLIENT_ID` to the SPA Client ID.
5. Install `02-mfa-access-claim.js` with the same secret and put it **after**
   Action #1 in the Post-Login flow. Save and **deploy** both Actions.
   Do not set `/mfa` from enrollment state, client input, or an ID token.
6. In the web deployment environment set the browser-visible (non-secret)
   build variables from `apps/web/.env.example`:
   `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `VITE_AUTH0_AUDIENCE`.
   **Rebuild** the Vite application; these values are injected at build time.
   Check the generated callback is exactly the deployed application base URL.
   Never put client secrets, passwords, OTP seeds or Management API tokens
   in `VITE_*` values.
7. Configure the private Cloudflare Worker with
   `AUTH0_ISSUER_BASE_URL=https://YOUR_TENANT.auth0.com`,
   `AUTH0_AUDIENCE` matching the Auth0 custom API identifier and
   `BIOFLOW_OWNER_SUB` matching the owner account's `sub`, plus the
   private R2 bucket binding. **Keep `ENABLE_PDF_ENDPOINTS=false` until
   proper authorization tests and clinical-data privacy review pass.**

If the tenant is not configured, the BioFlow demo still works and the
Auth0 actions are shown disabled with an explicit setup-required message.
Do not mock the Auth0 callback, QR code, challenge result or private tokens.

## Recovery

- **Demo recovery** is a clearly marked example; it displays an
  `.example` address and **never sends email**.
- **Real password recovery** happens in Auth0 Universal Login after
  identity checks. Password reset by email does **not** reset TOTP MFA.
- **Lost authenticator** requires Auth0's supported MFA recovery codes
  or verified administrative recovery / factor reset; do not create a
  bypass code, pretend an email alone proves MFA or expose a self-reset
  endpoint unauthenticated. Test Auth0's recovery UX with a separate
  sacrificial account.

## Required acceptance tests before claiming the feature is live

- [ ] New account signup displays authentic Auth0 QR enrollment and accepts
      a first OTP generated by an actual authenticator app.
- [ ] Subsequent sign-in challenges for the six-digit code (wrong / stale
      codes must fail); recovery, cancellation and sign-out work.
- [ ] The **API access token** after verified OTP contains boolean
      `https://jrpasolini.tech/bioflow/mfa: true`; token without MFA
      must NOT contain it.
- [ ] `110526` opens synthetic demo without an Auth0 account and has no
      effect on any private endpoint.
- [ ] Backend returns 401/403 for invalid signature, issuer, audience,
      missing/false MFA claim, wrong owner and expired token.
- [ ] Validate redirects at `/bioflow/`, mobile layouts, both languages,
      and no private data in fixtures or analytics.
- [ ] Only after all checks, decide whether to enable owner-only R2 PDF
      routes (not needed for the public Hacktoberfest demonstration).

Auth0 references:
- https://github.com/auth0/auth0-react
- https://support.auth0.com/center/s/article/Action-triggered-MFA-using-enrollWith-and-challengeWith
- https://support.auth0.com/center/s/article/using-actions-mfa-authentication-method-is-missing-on-first-login
- https://support.auth0.com/center/s/article/api-authentication-is-undefined-in-post-login-action
