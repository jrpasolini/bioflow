# Extraction investigation, October 22, 2026

Initial live health: source `a52456c60e70fbbc65b9920d7d67b197219cfe2c`,
build `session-v7-expiry-isolation`. The clean main checkout was
`7b6f2fc03768de08082c6e6f8a5ba9ac4ce4415b`; origin/main was independently checked.
No repository or ancestor AGENTS.md was present; the owner's supplied instructions apply.

The original public October 1 PDF reproduced HTTP 502 `incomplete_extraction`.
Sanitized per-attempt diagnostics then established provider quota rejection:
all three chunks (2500, 2500 and 68 characters) returned provider code 4006,
classified by the quota/allocation wording, before model content existed.
The original loop repeated every rejection immediately, hiding its cause.
This establishes the current failure, not the cause of every historical run.
No model response, PDF content, exception text, token or proof is logged.

The correction preserves the two-attempt/4096-token/16-chunk ceilings and
25-second conversion plus 85-second-per-attempt deadlines. Permanent provider
quota, access and request rejections stop retries and reject the complete report.
Quota exhaustion returns HTTP 503 with `incomplete_extraction` and a fixed
`provider_quota` reason. Transient failures retain their existing bounded retry.
Explicit model truncation is refused even if a JSON object looks complete.
Deadline timers are cleared after completion. No segmentation, clinical validation,
Auth0, session proof, persistence or baseline data was changed.

The smoke script now supports 1–3 consecutive runs (fourth argument), issues
a fresh session per extraction, respects the public session rate limit, records
sanitized diagnostics, and checks that failed extractions expose no report/proof
and leave history empty. A failure is retained; it is never retried manually by
the script to obtain a green result.

Independent text extraction from the eight-page October 1 original identifies
53 numeric observations across seven measurement pages (8+7+5+9+10+8+6).
This verifies the source inventory only. No model fidelity, review/confirmation
or successful persistence may be claimed until a live extraction can run.
The current provider quota prevents this acceptance gate; changing a paid plan
or increasing billing is outside this correction.

Regression tests cover the actual quota-4006 rejection with an otherwise valid
chunk, cross-runtime exception objects, sanitization, and explicit truncation.
Existing session isolation, human confirmation and one-hour expiration tests
remain required. Production results are delivered separately with the actual
running source commit, including every failed acceptance run.
