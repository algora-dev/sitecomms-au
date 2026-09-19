# Phase 1 validation record — 19 September 2026

## Passed

- All six regression/source-audit scripts: pricing, finance, aged care, state, content and site.
- TypeScript 5.8.3 strict type-check of 12 dependency-light module entry points (jurisdictions, preference store, pricing, finance engine/config, content metadata, both comparison data modules, aged-care example and industry context), including their local dependencies.
- Syntax/transpilation audit of **73 TS/TSX source files**. This is separate from the limited strict module type-check above.
- Resolution of **187 local imports** and **251 literal internal route/asset links**.
- **29 page routes**, including the existing system-planner redirect; **28 distinct sitemap entries** with content metadata. Three routes are new.
- Eight valid jurisdiction codes, invalid inputs rejected/ignored as appropriate, preservation of pricing configuration/industry/hash in state-aware links, browser-storage persistence and fallback logic.
- Seven school profiles/four use-case groups/14 comparison references; seven aged-care profiles/six use cases/20 referenced sources.
- Existing pricing regression values and aged-care calculator round-trip remain unchanged.
- Original pricing modules and calculator components are byte-identical to the supplied source. All original public/image assets are byte-identical. The lockfile and dependency-version declarations are unchanged.
- Original global CSS retained verbatim before accessibility additions.
- Preview/noindex source gates retained, with an explicit root metadata gate added.
- Runtime source contamination check: no Auckland timezone, Christchurch placeholder, 5YA/10YPP, rest-home wording, kura/state-integrated categories or invalid `.Australian` URLs outside documented intentional exceptions. The genuine privacy contact and historical DB column name are deliberately retained.
- JavaScript syntax checks on the project scripts.

## Actual test execution

The npm dependency installation could not complete. The same committed assertion scripts were executed with Node 22.16.0 and a validation-only ESM loader backed by the environment’s real TypeScript 5.8.3 compiler. It transpiled the actual project modules; it did not mock the pricing/finance engines or simulate Next.js. The hosting agent should rerun them normally with `npm test` after `npm ci`.

```text
== pricing ==
pricing tests: all assertions passed
  A: $8,356 - $10,445
  safety: $9,584 | interactive: $11,424 | endpoints: 34
== finance ==
finance tests: all assertions passed, including public-entity governance guardrails
== aged-care ==
Aged-care compare-refresh assertions passed: 7 profiles, 6 use-case rows, 20 sources.
Illustrative scope, current engine: A$9664–$12080 ex GST; 13 endpoints under current defaults.
== state ==
State tests passed: eight jurisdictions, validation, cfg/hash preservation, persistence, clearing, cross-tab reads, blocked storage and quota fallback.
== content ==
Content tests passed: 7 school profiles, 4 use cases, 14 school comparison sources and three new dated routes.
== site ==
Static site audit passed: 73 TS/TSX files parsed/transpiled, 187 local imports, 251 literal internal links, 29 routes and 28 sitemap entries.
Preview/noindex preserved; NZ residue allowlisted only for genuine privacy contact and the historical DB column name.
Scope: syntax and source invariants only; not full framework type-check, build, ESLint or browser validation.
```

## Blocked or not performed — do not treat these as passed

**Fresh dependency installation / full production build:** the runtime could not resolve `registry.npmjs.org`. `npm ci` terminated with npm’s “Exit handler never called!” error. A direct registry request reported `curl: (6) Could not resolve host: registry.npmjs.org`. A subsequent `npm run build` could not start the framework and reported `next: not found`. No production bundle was built.

**Full Next.js/React type-check and ESLint:** not completed without the installed framework/dependency types. The dependency-light strict check is not a substitute.

**Browser, mobile, hydration, accessibility and visual acceptance:** not executed against a running Next.js application. Accessibility and image-sizing changes were inspected in source only; no pixel-perfect or performance result is claimed.

**Live integration checks:** no email was sent, no production database was changed, and no live Supabase/PDF logging round-trip was tested. The UTC timestamp change must be checked against existing downstream reporting. No new DB migration was applied.

**External HTTP sweep:** the source-inventory script lists 32 unique published external references. Individual market/official sources were consulted during research, but a complete runtime HTTP sweep and continuing source validity are not claimed. An HTTP response alone does not establish current stock, support or eligibility.

## Intentional exceptions / compatibility

- T3 Labs privacy contact/address remains New Zealand-based as supplied; no Australian office was fabricated.
- `created_nz` remains the existing storage column name, now written with UTC ISO strings; `payload.createdAtUtc` is the canonical new field. Historical records are not migrated.
- Project state is required by new project enquiry forms, but omitted state remains accepted server-side for legacy clients. Supplied invalid state values are rejected.
- Funding matching and detailed state finance rules are not implemented in this phase. State selection is context, not eligibility or a price multiplier.

## Release gate

The hosting agent must run `npm ci`, `npm test`, `npm run lint`, the full framework/type checks and `npm run build`, then perform the manual browser/integration checklist in `AGENT_HANDOFF_PHASE_1.md`. Keep preview/noindex enabled. These checks do not constitute a security audit or launch sign-off.
