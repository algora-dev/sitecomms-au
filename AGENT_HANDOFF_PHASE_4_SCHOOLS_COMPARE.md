# START HERE — SiteComms Australia Phase 4 schools comparison

Date: 25 September 2026.
Input baseline: `sitecomms-au-phase-3-finance-2026-09-23.zip`.
This archive is the full project. All current handoff, research, tests and validation evidence are included. No separate downloads are needed.

## What to implement
Use this source as the next baseline while preserving the host's real environment configuration outside the repository. The canonical school comparison is `/compare/schools`; `/compare` is an exact permanent redirect with a query-preserving fallback.
The site uses the existing Australian theme and components. The comparison follows the NZ page's content/UX pattern, not its facts or supplier assumptions.

Read:
- `SITECOMMS_AU_PHASE_4_SCHOOLS_COMPARE_CHANGELOG.md`
- `docs/schools-compare/RESEARCH_AND_COVERAGE.md`
- `docs/schools-compare/VALIDATION.md`
- `docs/schools-compare/FILE_CHANGES.json`
- `AGENTS.md`

## Non-negotiable content boundaries
SPON is a main, positive all-round option, not a hidden specialist. Its integrated capabilities and stated expansion path are sourced; its Australian supplier/support route and local school deployment remain unverified.
Do not invent a distributor, school reference, free licensing, guaranteed saving or independent rank. Do not suppress actual competitor capabilities: Algo 8188 talkback and Axis C1710 display/strobe/two-way audio are documented.
Australian evidence labels distinguish a supplier listing, an Australian-facing product page, a provider's description and a named school project. Hall/performance audio examples are not whole-campus bell installations.
The Australian Monitor example includes discontinued products; do not reuse it as a current bill of materials.
No brands have verified comparable installed prices in this review. Do not label the shared pricing calculator a SPON quotation.

## Install and verify before deployment
Use the existing package versions and lockfile. No new dependency, database or environment key is required.

```sh
npm ci
npm test
npm run typecheck:schools-compare
npm run typecheck:finance
npm run typecheck:funding
npm run typecheck:agent-ready
npx tsc --noEmit
npm run lint
npm run build
```

All nine suites passed here with the documented review loader, but a dependency-backed Next build, full project typecheck and browser preview did not run successfully in this sandbox. Registry DNS failed. Do not report those as completed.

## Preview checklist
1. Open `/schools`: the comparison is accessible from the hero secondary button and planning links. Header/footer also point to the new canonical page.
2. Open `/compare/schools` directly: verify metadata, one Article/breadcrumb set, no numeric rating/Offer schema, and the eight platform profiles.
3. Request `/compare?state=QLD` and confirm a single permanent redirect to `/compare/schools?state=QLD`. In a browser test `/compare?state=QLD#spon`, `/compare#sources`, `/compare#2n` and `/compare#itc`. Queries and fragments must survive; the canonical page must not loop.
4. Test 360/390px, tablet and desktop widths. Check table scrolling/sticky first column, no body overflow, profile anchors below the sticky header and readable text.
5. Keyboard-test navigation, the scrollable comparison region, every details/summary, and enquiry open/close/Escape/focus return.
6. Open the comparison's enquiry buttons: system_selection mode, sourceTopic compare_schools, school context. No brand is silently selected. No enquiry should be sent just by viewing, opening or closing the page.
7. Use only an approved staging/test inbox for any delivery test. The real inquiry endpoint, provider-relationship question, state handling and no-forwarding policy were not changed.
8. Choose a state and follow pricing/funding/finance links. Context should carry as before; pricing arithmetic must not change.
9. Smoke-test existing funding and finance flows. Two inherited funding assertions were repaired, not their runtime rules; see validation.
10. Check external source links manually. Macrosphere could only be reviewed from a search extract; its direct fetch timed out. If that link is unavailable to users, keep the limitation or remove the reference rather than asserting live verification.
11. Verify the sitemap lists `/compare/schools`, not `/compare`; canonical points to the intended configured Australian origin.

## Preserved behaviours / permissions
The global stylesheet, all original public assets, price formulas/config, funding/finance application code, inquiry backend and all API routes are unchanged. The old automatic pricing logger remains retired. Existing integration routes remain disabled by default; this release adds no MCP, WebMCP, model or vector store.
Preview/noindex headers, robots and metadata remain in place. Do not enable indexing, external API access, real provider forwarding or production deployment without the applicable owner approval. Private staging still needs access control.

## Updates and rollback
Edit shared comparison records in `src/lib/content/school-compare.ts`; update the research snapshot and tests together. Do not duplicate a second AI-only article/data table. Review dates describe the underlying source check, not the current request/deploy time.
The current profile is `docs/schools-compare/PROFILE_AND_PLAN.md`. The new article retains the existing comparison's original publication date and records this substantive review on 25 September 2026.
No data migration. Roll back to the prior Phase 3 deployment or revert the manifest's changed/new files. Do not combine rollback with changes to finance, funding or prices.

## Remaining work
Actual staging/build/browser gates; owner-approved launch/indexing decision; stronger verifiable Australian SPON supply/support evidence and genuine campus deployments. No background research or automatic publishing job is configured.
