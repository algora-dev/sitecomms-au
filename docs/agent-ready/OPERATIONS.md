# Operations and rollback — Agent-Ready Foundation

This document describes the preserved foundation controls. **For the current Phase 2 funding extension, use [funding operations](../funding/CONTRACT_AND_OPERATIONS.md) and the root Phase 2 handoff.** No production deployment, external-client connection, real enquiry, database operation or background automation was performed. Existing host preview controls and noindex remain. Robots/noindex are not private-access controls; the hosting owner must protect a private preview.

## Ownership and publication

T3 Labs/SiteComms owns the planning model and editorial publication decisions. A named pricing approver, source-review owners, security/hosting owner, retention owner and release approver must be assigned by the business. Do not invent names or approval timestamps. The maintained profile lists outstanding decisions; these do not block independent code review or public-guide preparation, but unapproved new prices/eligibility rules/actions must not be enabled.

Source of authority:

- Rates/defaults: `src/lib/pricing/config.ts`, unchanged from the supplied baseline.
- Arithmetic: `src/lib/pricing/calculate.ts`, unchanged; wrapping policy in `src/lib/agent-ready/assessment.ts`.
- Source/publication state and versions: `src/lib/agent-ready/sources.ts`.
- Guide descriptions: `src/lib/agent-ready/content.ts`; ordinary guide directory and search consume the same records.
- Editorial dates: `src/lib/content-meta.ts`; manufacturer/source links: existing comparison records.
- Enquiry recipient: server environment configuration for the existing owned form, never an assessment request or agent-selected email destination.

The browser pricing model was already public in the supplied code. Do not add private rate tiers, margins, unpublished documents or credentials to these client-reachable core/source modules; any future protected capability needs server-side access controls before retrieval/output.

The master standard is copied verbatim into `STANDARD_0.1.0.md` as the owner-supplied specification. Its protocol snapshot is **not newly verified or implemented** by this foundation. Future protocol work must recheck selected clients and primary documentation.

## Updating, correcting or withdrawing a source

1. Obtain the owner's approved source change. Separate a factual correction, price/rule change, editorial revision and verification event. Do not set `reviewed_at` or any verification date to today just because the application was rebuilt.
2. Edit the actual authority, not a duplicate rate in a page. Update its source version and relevant policy/rule version. Record who approved the change and why. A change to a comparison source must also update its dependent profile/citation where necessary.
3. Assign an owner-approved review deadline only if a deadline actually exists. `review_due_at` is an optional YYYY-MM-DD date, valid through that UTC day. Default is null (`review_interval_not_set`). There is no invented universal maximum source age and no automatic verification service.
4. Run regression, contract, source-update and output parity tests. Intentional rate changes require approved updated baseline fixtures; never regenerate fixtures merely to hide a failing test.
5. Build and redeploy the source data, affected static pages, client calculator bundle and HTTP handlers together. **This deployment uses static source records and may pre-render editorial price examples. It is not a live CMS/webhook freshness service.** Rebuilding is required to publish a correction or withdrawal across all projections, and old browser tabs must reload.
6. Review the generated pages/JSON-LD, calculator/PDF and enabled HTTP result on staging before promotion. Purge/revalidate relevant hosting caches and verify the intended version is visible. Keep the previous source/release for rollback unless it contains withdrawn/misleading information.

At invocation, stale, conflicted, unavailable or withdrawn required pricing sources produce no amount; editorial projection helpers return null/unavailable text rather than zero. Guide search remains usable. Setting a future review deadline does **not** schedule a build, revalidation or alert: an owner must arrange a compatible host job/manual release before static projections expire. No scheduled job is created by this package.

## New routes and feature controls

Normal pages, the client calculator and guide search do not require a key or external service. Optional HTTP routes are off by default. Set `SC_AGENT_READY_HTTP_ENABLED=false` to disable the adapter and restart/redeploy as required by the host's environment handling. No source-code rebuild is logically required by the flag, but a host may apply changed environment variables only on a new deployment.

Before an authorised staging HTTP test, configure a random server-only key (at least 32 characters), HTTPS on non-local environments, body/method limits and hosting-layer rate/abuse controls. Shared-key access represents one controlled client profile, not multi-user entitlement. Rotate the key if exposed. Keep it out of `NEXT_PUBLIC_*`, browser requests, screenshots and logs.

The application has a 16 KiB body limit, five-second read deadline, constant-time secret comparison and a local per-process rate backstop. **A durable hosting/WAF quota and actual proxy/CDN tests are prerequisites to enabling this on a public reachable deployment.** The local counter does not coordinate serverless instances and does not protect against unauthenticated network floods. This is not a completed production security audit.

`SC_AGENT_READY_LOG_EVENTS=true` enables minimal adapter operational events: request ID, capability, adapter, transport status, domain outcome and elapsed time. It does not log key, query, configuration or brief. The host may have separate request/access logs; configure redaction/retention there. Default remains false. No model, token budget, paid provider or model credentials are introduced.

## Enquiries and assessment storage

Calculating, viewing, searching and generating a browser PDF do not call a new write service or create an automatic assessment record. Existing generic analytics remains separate; this release is not a promise of zero network traffic or anonymised hosting access logs.

The prior `POST /api/pricing-tool/output-log` automatically persisted caller-supplied results/PDFs on result view. It is deliberately retired: it now returns **410** and has no database/PDF writes. The triggering browser effect is removed. **Historical Supabase tables, bucket files, exports and records are untouched.** Supabase dependencies remain to avoid an unrelated lockfile change; remove them only through a separate dependency review. Check any reports relying on that old automatic stream.

The existing human enquiry form is retained. The user can inspect attached tool context before submitting to SiteComms. Client-supplied estimate/context is labelled unverified in the email, not a server-issued quote. No external agent has a submission capability. A restored durable assessment log would require explicit owner-approved purpose, data minimisation, retention, consent/authority, server recalculation, idempotency and failure-state work; do not re-enable the old blind writer.

The existing enquiry endpoint, attachment handling, email delivery, duplicate-prevention and hosting abuse protections are **not newly certified by this foundation**. Test their authorised staging route separately with a test inbox, not actual providers/residents/students. Formal legal/privacy compliance and retention practice need owner review. Existing privacy contact is preserved; no Australian office is invented.

## Rollback

- Adapter issue: disable the HTTP flag; leave ordinary pages/calculators functioning. Remove/rotate the server key if necessary. Check safe errors and redacted logs.
- Bad evidence or rates: withdraw/qualify the affected source, deploy all affected projections, verify no amount/unsupported conclusion appears, then fix with the owner. Do not roll back to an already withdrawn misleading fact.
- Full code rollback: use the preserved Phase 1 ZIP as a source comparison/release baseline. **Do not blindly restore its automatic assessment logger**. Retain the current retired route and removed browser effect unless a separate reviewed storage decision authorises reinstatement.
- There are no migrations or new data tables to undo. Customer records have not been modified. Disabled adapters must never break ordinary contact/navigation.

## Next iteration

The Phase 2 funding extension now covers selected routes in QLD, NSW, VIC, WA and SA, with explicitly limited national-only coverage elsewhere. Its separate source/rule policy is documented in `docs/funding/`. Next: preview/owner review, then the separate finance research and policy build. Neither the funding capability nor finance preparation decides eligibility or awards.

A later external pilot needs one named consuming client, supported protocol/SDK versions, controlled connection, actual listing/invocation/error/auth tests and downstream answer checks. Keep that evidence separate from human usefulness and organic discovery. MCP/WebMCP and model interpretation remain deferred, not partially advertised.

## Technical references consulted

Official primary documentation consulted on 19 September 2026:

- Next.js Route Handlers: https://nextjs.org/docs/app/api-reference/file-conventions/route
- Next.js environment variables: https://nextjs.org/docs/app/guides/environment-variables
- Next.js data security: https://nextjs.org/docs/app/guides/data-security

These support the framework approach, not a claim that the supplied exact dependency versions or live host were exercised. The hosting agent must also read the installed, version-matched documentation referenced by `AGENTS.md`.
