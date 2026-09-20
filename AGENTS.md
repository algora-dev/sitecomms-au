<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## SiteComms foundation preservation

Read `AGENT_HANDOFF_AGENT_READY.md` and `docs/agent-ready/PROFILE_AND_PLAN.md` before changing this iteration. Reuse the existing pricing engine through the shared assessment; do not duplicate rates or remove classification/scope checks. The HTTP test adapter is disabled by default and is not MCP. Do not restore automatic result storage, remove noindex, send live enquiries or change source approvals without explicit authorisation. Run the existing and Agent-Ready tests and report unavailable checks honestly.

## Current Phase 2 funding baseline

Read `AGENT_HANDOFF_PHASE_2_FUNDING.md` and `docs/funding/CONTRACT_AND_OPERATIONS.md` first. Funding pages, the checker and the optional protected route use the same catalogue/handler. Preserve source dates, applicant distinctions, unknowns and no-award semantics. Run `npm run test:funding` as well as the full existing checks. The master standard and older evidence remain history, not permission to restore the holding page or change prices/indexing.
