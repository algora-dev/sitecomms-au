# Agent handoff — SiteComms Australia Phase 2 funding

**Current full source baseline: 20 September 2026.** Use this directory-preserving project as the working codebase after reviewing its changes against the previous `sitecomms-au-codebase-2026-09-20.zip`. It contains implemented funding code, research, public pages and tests. No production deployment, indexing change, live enquiry, database mutation, funder application or payment is authorised by this handoff.

## What is new

The funding holding page is replaced with a three-step state/site → legal applicant/scope/stage → relevant-details checker. It shares a deterministic `assess_funding_pathways` handler and 25 pathway/33 source records with five state guides (QLD, NSW, VIC, WA, SA) and a `/funding` hub. Selected national school/aged-care records also work for ACT/NT/TAS; those jurisdictions' own programmes are explicitly unreviewed. Guide search now contains 18 records.

Programme types, uncertain/closed/invitation-only status, application deadlines and source review age are distinct. No grant award, success probability, eligibility approval, grant stacking or reduction of a pricing estimate is calculated. Published programme caps are labelled as limits, not expected awards. An ordinary explicitly reviewed SiteComms enquiry is the only handoff, with no provider forwarding.

Start with `docs/funding/RESEARCH_AND_COVERAGE.md`, `CONTRACT_AND_OPERATIONS.md`, `PROFILE_AND_PLAN.md`, and `VALIDATION.md`. Historical phase reports remain for traceability. The supplied master standard is preserved unchanged.

## Required installation and verification

```sh
npm ci
npm test
npm run typecheck:funding
npm run typecheck:agent-ready
npx tsc --noEmit
npm run lint
npm run build
```

Dependency declarations and package lockfile were not changed; only npm scripts were extended. In the review environment `npm ci --ignore-scripts` failed with npm-registry DNS errors and an npm exit-handler error. Full Next, ESLint and project-installed dependencies therefore could not run. Domain/source scripts were executed through the documented global-TypeScript review loader; strict funding and dependency-light Agent-Ready domain checks passed. Do not claim a framework build or browser test on the basis of those results.

After installing, read the installed version-matched framework guidance referenced by `AGENTS.md`. Fix real errors narrowly. Do not change/downgrade the framework or loosen validation simply to hide a missing-dependency failure. Do not regenerate the price fixtures or change rates without explicit approval.

## Browser preview checklist

1. Confirm original theme/logo/assets, responsive cards, select labels, keyboard focus and mobile enquiry scrolling. The layout reuses current classes; no visual browser audit was possible here.
2. Enter each state guide directly with no query, verify the header state updates, then test an explicit state query and `state=AU`. Change state mid-check, after results and with the enquiry modal open. Old results/context must disappear; details must be reviewed again. No geolocation is involved.
3. Complete representative routes: QLD school vs P&C vs community NFP; NSW government vs BGA vs eligible child-based preschool; VIC general PA vs documented hearing access; WA procurement vs Lotterywest; SA additional preschool capacity vs routine replacement and Julia Farr exclusions; private residential care vs retirement village; unreviewed ACT/NT/TAS national-only coverage.
4. Test unknowns, owner permission pending, already-committed works, unsupported fields in the optional API, ordinary costs and no-match. No answer may say approved/qualified, estimate an award, deduct a grant from price or invent an open round.
5. Check state page status and checker parity. Use fixtures for QLD's local closing day and NSW/SA October cut-offs. Confirm state pages really render current dates on request in the chosen host/proxy; never cache a date-sensitive 'open' result indefinitely. New source versions require a coordinated deployment and old tabs to reload.
6. Verify source links, conditions, published limits, reviewed/due dates and clear stale/conflicted/invitation-only messages. Read the first urgent source-review priorities below. No automatic live funder feed exists.
7. Try the pricing and aged-care journeys, guide filter, saved configurations and browser PDF export. Pricing/finance/calculator arithmetic must stay unchanged. The price-to-funding link no longer pretends to carry a budget into an award calculation; the separate finance link retains its existing estimate context.
8. Open the funding enquiry launcher, inspect the exact compact context, cancel and verify no send. A controlled submission needs separate authorisation and a test inbox. Confirm the existing inquiry size limits accept the fields, duplicate/delivery/abuse behaviour is appropriate and the receipt does not claim that a funder/provider received anything. No automatic provider forwarding.
9. Confirm the retired `/api/pricing-tool/output-log` remains 410/no-write, no secret appears in client assets, robots/meta/header noindex remain, and preview authentication is independent of noindex.
10. Keep `SC_AGENT_READY_HTTP_ENABLED=false`. A separately approved HTTP test needs server-only credentials, real host quotas/proxy tests and evidence. Local handler tests are not MCP/WebMCP, a consumer AI client test or organic discovery.

## Owner evidence review before public release

Approve the **interpretation/routing policy**, not merely the existence of source links. Assign a named editor. QLD GCBF Round 127 and unresolved NSW BGAS status need review by **27 September 2026**; QLD's published deadline is **28 September 2026**. NSW child-based Inclusive Environments and SA Julia Farr have **16 October 2026** cut-offs. The code closes expired published windows and flags overdue source review but cannot discover changed/new rounds itself.

The ACCAP overview identifies invitation-only Critical Infrastructure access; full GO6332 guidelines were inaccessible in this review and full eligibility is not encoded. SA government-school planning sources do not establish a dedicated PA grant or complete delegation threshold. Selected community/early-childhood coverage has explicit gaps. ACT/NT/TAS are national-only. Preserve these limitations; do not fill them with inferred grants or fabricated percentages.

## Preserve / rollback

Original assets/global CSS, pricing engine/configuration/presets, finance calculation/validation, inquiry backend, noindex settings, exact dependency versions and lockfile are preserved. A few existing public paragraphs/links were updated to point to the now-working funding tool; that is not a redesign or finance rebuild. The genuine T3 Labs privacy contact remains.

No database migrations or new tables are added. Optional HTTP can be disabled through its existing flag. Individual records can be withdrawn, with affected explanations updated and redeployed. Full rollback uses the pre-funding 20 September **Agent-Ready** baseline, preserving retired logging and explicit human submission. See `docs/funding/CONTRACT_AND_OPERATIONS.md` for update/withdrawal procedure.

Return actual installation/check/preview results and any focused fixes. Before re-exporting preserve all paths and include source/assets/tests/configuration/lockfile/docs; exclude node_modules, .next, .git, caches, production data and real environment secrets.

**Next content/tool phase:** Australian finance research for these same five states and relevant applicant/sector distinctions, then the separate comparison/product-market refinement. Deployment and enabling indexing remain owner decisions, not implied by this package.
