# SiteComms Australia — Agent-Ready Foundation profile and plan

Standard: supplied Agent-Ready Website Master Implementation Standard 0.1.0. Profile 0.1.0, foundation-only. Baseline: `sitecomms-au-phase-1-australian-content-2026-09-19.zip` (120 files). Review/implementation date: 19 September 2026. No deployment authorisation, no live submissions, no paid model calls.

## Site profile and boundaries

- Business: SiteComms Australia, operated by T3 Labs. Research, education, planning and reviewed provider recommendations, **not** an installer, lender, funding authority, marketplace or formal-quote issuer.
- Locale: Australia, AUD, estimates excluding GST. All eight states/territories are context; no location price multiplier is approved. Genuine operator privacy contact remains unchanged.
- Framework observed: Next.js 16.3.4 App Router, React 19.2.8, TypeScript; existing `src/app`, components and pure library modules. Hosting inference: Vercel configuration exists; actual deployed infrastructure is not inspected.
- No onsite model assistant or external agent adapter is present in the supplied source. Do not create a chatbot, vector database, multi-tenant service, MCP/WebMCP/A2A adapter or new paid service in this foundation pass.
- Preserve visual theme, assets, existing routes, accessible human calculator and owned enquiry form. Preserve preview/noindex. Enquiries go to the configured SiteComms inbox only; SiteComms replies with public provider details and does not forward customer data.
- Business approver: user/T3 Labs; named operational/data owners and launch sign-off not yet recorded. Existing provisional pricing assumptions are carried forward for planning, not promoted to independently verified market prices.
- Existing facts: calculator is already deterministic; guide directory, content-review dates, comparison source maps, jurisdiction records and finance engine are present. Funding matching is not implemented; finance is preparatory, not credit approval.
- Gaps observed: calculator URL input uses shallow unchecked JSON; result scope/version is assembled independently in the interface; public projections lack a common outcome envelope; legacy output logger trusts caller totals and silently persists assessments; no foundation capability contracts or external compatibility evidence.
- Unknowns: deployed configuration, dependency/framework build success, live email/storage delivery, retention/WAF policies, target external client, current supplier stock and all-state funding/finance eligibility. No new market research or owner approvals are inferred.

## Selected capabilities / first slice

1. `search_business_content`: deterministic, bounded navigation search of the same public guide directory rendered for humans. This is **not** full-site semantic search or arbitrary URL retrieval.
2. `assess_request`: structured pricing assessment using the existing engine. Preserve supplied/approximate quantities, declared model defaults, price/scope, version and source status. Unsupported funding/finance, free-text interpretation and formal-quote requests return explicit limitations, never invented matches.
3. Enquiry: existing reviewed human form only. No `submit_enquiry` capability, booking, payment or automatic provider introduction.

First slice: source model → shared pricing assessment → existing calculator/examples/PDF summary → reviewed form. Add an optional, disabled-by-default, authenticated HTTP testing adapter over the same handlers. This is **not** a claim of MCP/client compatibility or completion of the standard's external-client pilot.

## Authority map

| Area | Current authority / code | Publication and limit | Treatment |
|---|---|---|---|
| Identity | `src/lib/site.ts` | Existing public business description; no invented installer coverage | Reuse |
| Pricing assumptions | `src/lib/pricing/config.ts` | Provisional AUD planning values, original review date retained; T3 Labs approval before public launch | Reuse; source/version record |
| Calculation | `src/lib/pricing/calculate.ts` | Existing 80–100% model, not statistical confidence or a formal quote | Wrap; do not change arithmetic |
| Example inputs | `presets.ts`, `school-bands.ts`, `content/aged-care-example.ts` | Illustrative configurations, not surveyed sites | Reuse, route through shared assessment |
| Public navigation | Guide directory and `content-meta.ts` | Public page descriptions and editorial dates, not newly verified evidence | Refactor into shared records |
| Comparison evidence | `content/school-compare.ts`, `content/aged-care-guide.ts` | Existing cited public sources; not stock, installer coverage or partnerships | Reuse; add derived provenance |
| State context | `jurisdictions.ts`, project-state store | User-selected location only | Reuse |
| Funding | `tools/funding-check/page.tsx` | Preparation/status guidance only | Defer matching until dedicated research |
| Finance | `finance-check/engine.ts` and config | Preliminary discussion readiness, not credit/borrowing authority | Defer research/rebuild and external assessment |
| Enquiry | Owned modal and `api/inquiry/route.ts` | User-reviewed submission to environment-configured SiteComms inbox | Reuse; no external writes |
| Legacy output records | `api/pricing-tool/output-log/route.ts` | Unapproved automatic storage is not part of this read-only slice | Disable/retire writer; preserve historical data |

## Ordered tasks recorded before implementation

| Task | Type | Smallest change | Exit test / rollback |
|---|---|---|---|
| AR01 | Reuse | Capture current outputs and theme/assets before edits | 70 baseline fixtures; revert to supplied ZIP |
| AR02 | Add/wrap | Typed result, strict inputs, source policy, shared pricing handler | Pricing parity, missing/invalid inputs, stale/withdrawn source, scope/money assertions; revert new modules/callers together |
| AR03 | Refactor | Human calculator, examples and export/handoff use shared result; validate cfg | No arithmetic drift; malformed URL never becomes a price; original layout preserved |
| AR04 | Refactor/add | Shared public directory and local human search; derived comparison provenance | Same human/search descriptions and citations; no private docs or arbitrary retrieval |
| AR05 | Add | Thin authenticated HTTP testing adapter, off by default | Actual Request/Response positive/negative tests; flag off leaves human paths intact |
| AR06 | Refactor | Stop silent legacy assessment persistence; ordinary enquiry stays explicit | No calculation sends a lead or stores a PDF; legacy route has no write imports |
| AR07 | Add | Evidence, contracts, operations, source-update/rollback instructions | Executed tests separated from unavailable runtime/client checks |

## Deferred and required owner decisions

- Select a real target external client before MCP/WebMCP implementation; foundation HTTP is not a substitute for that protocol test.
- Approve pricing assumptions, publication timing, review intervals and named owners. A build/response timestamp never renews source verification.
- Funding deep dives and then finance research remain the next business phases; their typed outcomes can plug into this core later.
- Authorise any assessment retention and define minimisation/deletion before restoring a durable log. Existing generic analytics remains separate.
- Hosting agent must verify full framework build, browser flows, existing mail/attachment controls and deployment-layer rate limits in a preview environment. Source-level evidence is not production proof.
