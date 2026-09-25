<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## SiteComms foundation preservation

Read `AGENT_HANDOFF_AGENT_READY.md` and `docs/agent-ready/PROFILE_AND_PLAN.md` before changing this iteration. Reuse the existing pricing engine through the shared assessment; do not duplicate rates or remove classification/scope checks. The HTTP test adapter is disabled by default and is not MCP. Do not restore automatic result storage, remove noindex, send live enquiries or change source approvals without explicit authorisation. Run the existing and Agent-Ready tests and report unavailable checks honestly.

## Preserved Phase 2 funding baseline

Read `AGENT_HANDOFF_PHASE_2_FUNDING.md` and `docs/funding/CONTRACT_AND_OPERATIONS.md` first. Funding pages, the checker and the optional protected route use the same catalogue/handler. Preserve source dates, applicant distinctions, unknowns and no-award semantics. Run `npm run test:funding` as well as the full existing checks. The master standard and older evidence remain history, not permission to restore the holding page or change prices/indexing.


## Current Phase 4 schools-comparison baseline — 25 September 2026

Start with `AGENT_HANDOFF_PHASE_4_SCHOOLS_COMPARE.md`. The canonical school comparison is `/compare/schools`; `/compare` is a permanent compatibility redirect. SPON is intentionally a main all-round option with source-backed strengths, not a verified Australian supplier relationship or a numeric winner. Keep the shared source/profile data in `src/lib/content/school-compare.ts`. Do not restore the older conditional-only placement or duplicate a second comparison page.

Phase 3 finance and the simplified feature-led funding tool are preserved. Run `npm test`, all relevant typechecks, lint/build and desktop/mobile preview checks after installing the existing lockfile. The two funding fixture corrections in this phase align tests with the existing simplified-flow policy; funding application code and sources are unchanged. Read the current validation record, rather than assuming historical build results apply. Noindex, external-API enablement and deployment still require separate owner authorisation.
