# Phase 2 funding validation — 20 September 2026

## Scope and environment

Reviewed/edited source: user ZIP `sitecomms-au-codebase-2026-09-20.zip`. Node **22.16.0**, npm **10.9.2**, real global TypeScript **5.8.3** in an isolated review workspace. No running production website, live client, provider database or real inbox was accessed. The exact commands/output are in `EXECUTED_TEST_OUTPUT.txt`; the fallback loader is recorded in `REVIEW_TEST_LOADER.txt`.

## Passed checks actually run

| Check | Evidence / scope |
|---|---|
| Existing pricing | All assertions; existing arithmetic preserved |
| Existing finance | All assertions including public-entity governance safeguards |
| Aged-care content/pricing | Seven profiles, six use-case rows, twenty existing sources; existing illustrative model preserved |
| State | Eight jurisdictions; URL/hash preservation; storage failure/cross-tab behaviour; named funding-route mapping |
| Existing content | School comparison/source and dated-route invariants |
| Site source audit | **100 TS/TSX files**, **282 local imports**, **276 literal internal links**, **36 page routes / 35 sitemap entries** (redirect-only route is not a canonical sitemap page) |
| Agent-Ready | **62 named test groups**, including **70 captured pricing configurations**; classification, validation, source failure, HTTP controls and original projections |
| Funding | **75 named test groups**, plus **960 state × site × applicant combinations**; sources/enum rules, five-state coverage, exclusions, uncertainty, clock boundaries, stale/missing/withdrawn evidence, no-award assertions and direct HTTP-handler parity |
| Strict funding typecheck | `tsc -p tsconfig.funding.json` passed using global TypeScript, with no ambient dependency types required |
| Strict isolated Agent-Ready/domain typecheck | Passed using real installed Node type definitions from the review environment and the supplied domain tsconfig; not a Next/React typecheck |
| File preservation | **11 public asset files** plus the recorded critical CSS/pricing/finance/security/lockfile/standard files byte-for-byte unchanged; dependencies/devDependencies unchanged |

Scripts were executed using `node --experimental-loader ...` and real TypeScript because project `tsx` could not be installed. This executes the domain assertions and source checks; it does **not** establish a successful normal `npm test` installation or browser framework execution. The normal package test chain now includes `test:funding` for the hosting agent.

The capability-list expectation was deliberately extended from two to three and the state-hub reviewed date updated to 20 September, matching the implementation. No pricing fixture was regenerated. Funding tests explicitly cover newer nuanced legal-applicant cases without removing the school/for-profit, invitation or no-award boundaries.

### Representative negative and consistency cases

QLD school versus P&C; unresolved sponsor/government entity; retirement-living exclusion; deposits/contracts; conflicting building answers; NSW BGAS status conflict and BELP stale badge; preschool-only/access evidence; Victorian non-profit service and portable hearing-access constraints; WA procurement not cash, loan not grant, uncertain NFP structure; SA added places versus routine replacement, excluded operators, school applicant versus a separate legal entity, gaming/core-cost/duplicate-project restrictions; ACCAP invitation-only and no automatic retirement-village fit; national-only ACT/NT/TAS; source disappearance, bad review date, withdrawal and outdated evidence; local closing dates and daylight saving; secret/role/time/source overrides; invalid/oversized requests; no automatic enquiry.

HTTP tests invoke actual application route/domain handlers with synthetic `Request` objects. They demonstrate direct-handler parity, auth/disabled/error handling and no-store policy, **not** Next routing, CDN behaviour, public ingress security or an external client connection. No real requests went to a grant application or provider.

## Failed / unavailable framework gates

| Attempt | Actual result |
|---|---|
| `npm ci --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000` | Failed: underlying `EAI_AGAIN` npm-registry DNS errors and npm “Exit handler never called”; incomplete dependency directories excluded from the ZIP |
| `npm run build` | Exit 127: `next: not found`; **no production build completed** |
| `npm run lint` | Exit 127: `eslint: not found`; **ESLint not completed** |
| `npm run typecheck:agent-ready` using the project setup | Exit 2: project Node types missing; the separate isolated real-type check above passed but does not change this result |
| Full project `tsc --project tsconfig.json --incremental false` | Exit 2: dependency type definitions missing; **not a full project typecheck pass** |

Not tested: browser rendering/hydration, desktop/mobile visuals, full keyboard/accessibility behaviour, actual request-time Next page rendering, host/CDN caching, deployed HTTP transport/quotas, browser PDF layout and authorised test-inbox enquiry delivery. No MCP/WebMCP or named AI-client integration is claimed. No source-authority approval or legal/privacy/security certification is established by these tests.

## Release gates and limitations

The hosting agent must install the unchanged lockfile, run the normal complete checks, exercise the browser checklist in the handoff and review funding evidence before public release. Do not disable errors or change prices to disguise missing dependencies. Noindex and the default-disabled HTTP profile remain. Protect private staging independently from noindex.

Source/round maintenance is manual and versioned. Re-evaluation of a date does not fetch new funder rules. Programmes may change outside the recorded schedule. The 25 records are selected routes/streams, not 25 currently open grants or complete coverage of every sector. Full ACCAP GO6332 rules were inaccessible. Review timing and all source restrictions remain documented in the catalogue and research report.

There were no deployments, real enquiry submissions, funding applications, database mutations, charges or changes to historical records. Existing pricing, finance and comparison work can continue on this baseline, but none of the untested framework gates should be relabelled passed.
