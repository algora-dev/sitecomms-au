# Validation — SiteComms Australia Agent-Ready Foundation

**Evidence date: 19 September 2026.** This report records observed execution, not expected results. Source baseline: `sitecomms-au-phase-1-australian-content-2026-09-19.zip`, 120 files. Implementation is a foundation-only code package; the standard's full external-client pilot is **not complete**.

## Executed checks

| Check | Observed result | Boundary |
|---|---|---|
| Original pricing regressions | Pass | Existing deterministic model; not market-price validation |
| Original finance regressions | Pass, including public-entity guardrails | Existing logic, not credit/borrowing/legal approval |
| Aged-care assertions | Pass: 7 profiles, 6 use-case rows, 20 inherited sources; illustrative pricing unchanged | Source assertions, not new supplier verification |
| State regressions | Pass: 8 jurisdictions, URL/context persistence and blocked-storage fallbacks | Store logic; not a real browser/hydration test |
| Comparison/content regressions | Pass: 7 school profiles, 4 use cases, 14 inherited references | Existing content/data consistency |
| Static site audit | Pass: 85 TS/TSX files parsed/transpiled, 225 local imports, 255 literal internal links, 30 page routes, 29 sitemap entries | Syntax/local-resolution/source invariants, not a full framework type-check or live URL test |
| New Agent-Ready suite | **62 named groups passed, including 70 captured pricing configurations** | Domain/output assertions and actual exported HTTP route-function invocation |
| Strict dependency-light TypeScript | Pass, zero diagnostics | Core/domain modules and their imports using available real TypeScript/Node types; not React/Next |
| Original-asset and price-engine preservation | Byte equality checked against supplied ZIP | See `FILE_CHANGES.json` for file-level evidence |

The 70 fixtures were captured from the original supplied calculator **before refactoring**, not re-derived from a modified formula to make tests pass. They cover presets, school bands, aged-care illustration and tier/package/size boundaries. For object comparison, results are JSON-normalised because fixture JSON omits undefined optional fields; all computed money and breakdown fields remain compared. Fixtures represent the supplied provisional assumptions, not new business approval.

Source-update tests temporarily mutate an in-process rate/version and restore it in `finally`; withdrawal tests similarly restore source state. No repository rate file, live database, provider record or customer record is changed by those tests.

## Environment and commands actually executed

Node 22.16.0; npm 10.9.2; globally available TypeScript 5.8.3. Source declares Next 16.3.4 / React 19.2.8; those packages did not install in this environment, so they were **not executed**.

Dependency installation was attempted once with:

```sh
npm ci --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=10000
```

Observed: npm exited with “Exit handler never called!”; its debug log contains registry fetch failures `EAI_AGAIN` for `registry.npmjs.org`. The raw command output and DNS excerpts are in `EXECUTED_TEST_OUTPUT.txt`. No dependency versions or lockfile were changed to bypass this failure. Partially created `node_modules` is excluded from the delivered ZIP.

These normal project commands were also attempted and did **not** pass:

```text
npm run build                 -> next: not found; exit 127
npm run lint                  -> eslint: not found; exit 127
npm test                      -> tsx: not found; exit 127
npm run typecheck:agent-ready  -> missing Node type definitions; exit 2
```

To execute the actual source tests despite the unavailable npm dependencies, the review used the existing real global TypeScript compiler with a small ESM loader. **No React/Next/jsPDF modules or business handlers were mocked to claim framework success.** The exact review loader is preserved in `REVIEW_TEST_LOADER.txt`; its absolute paths document this environment and are not application configuration or the recommended agent test command.

Executed from `/mnt/data/sitecomms_agent_ready/sitecomms-au`:

```sh
for name in pricing finance aged-care state content site agent-ready; do
  node --no-warnings --loader ../ts-loader.mjs "scripts/test-$name.mjs"
done
```

Strict core command, exit 0:

```sh
tsc --noEmit --strict --target ES2022 --module ESNext \
  --moduleResolution bundler --lib ES2022,DOM,DOM.Iterable \
  --skipLibCheck --types node \
  --typeRoots /opt/nvm/versions/node/v22.16.0/lib/node_modules/ts-node/node_modules/@types \
  src/lib/agent-ready/*.ts src/lib/content/school-compare.ts \
  src/lib/pricing/presets.ts src/lib/pricing/school-bands.ts
```

The normal hosting-agent route is `npm ci`, `npm test`, `npm run typecheck:agent-ready`, full TypeScript checks, lint and `npm run build`, followed by preview browser testing. A source loader or TS syntax audit must not be substituted for that deployment gate.

## What the new suite demonstrates

- Unchanged numerical/breakdown outputs across 70 fixtures; integer-minor-unit money, GST exclusion, scope/rule/source labels and monitoring separation.
- Eight state contexts never change the arithmetic. Approximate/supplied/unspecified quantities and explicit model defaults remain distinguishable.
- Missing, null, malformed, negative, fractional, non-finite, coerced-string and out-of-bound inputs never silently produce a project price. Conflicting room counts and unsafe/additional request fields are rejected.
- Empty sites require input. Formal quote, funding/finance and unprocessed free-text requests cannot become unsupported commercial conclusions. No arbitrary URL/code/model path exists.
- Required source failure, conflict, withdrawal, expiry and malformed/impossible deadline yield a no-price result. Generation time does not reset source review; public projections exclude extra internal fields.
- Shared guide/search descriptions and source references agree. Empty search differs from source failure. Pagination/query bounds hold.
- The direct core does not fetch, submit, or store. The legacy logger returns 410 without database/PDF effects. Only two read/assessment capabilities exist.
- **Actual exported route functions** execute with native Request/Response: disabled, key/config/auth, Origin, query/body/type/size, domain clarification vs malformed input, no-store and quota paths. Core/HTTP result facts agree.
- Redacted opt-in adapter events do not contain the test key or request body. Turning off the adapter leaves the direct core usable.
- Source wiring checks show the calculator/examples/PDF use the shared result and only the original engine owns the formula.

These are finite regression cases, not proof against all possible inputs. Read body timeout is implemented but its real-time deadline and production proxy cancellation were not separately exercised. Per-process quota tests do not validate a distributed WAF configuration.

## Compatibility and evidence matrix

| Interface / environment | Implemented? | Execution evidence | Status |
|---|---|---|---|
| Pure domain functions, Node 22.16.0 + TypeScript 5.8.3 | Yes | Actual regressions/source cases | Tested in this environment |
| New HTTP route functions, native Request/Response | Yes; deployment flag off | Actual exported handlers invoked with synthetic authenticated/invalid requests | Function-level tested, not deployed HTTP |
| Next.js 16.3.4 production/server runtime | Source supplied, not installed | Build could not start | Not tested; dependency/network failure |
| Human React calculator/guide filtering | Wired to core | Static/transpile/wiring checks only | Real browser, hydration and visual behaviour not tested |
| Browser-generated jsPDF download | Shared result wired | Source review only | PDF generation/pagination/rendering not tested |
| Existing enquiry/email/attachments | Existing route retained; context labels improved | No real submission performed | Staging end-to-end delivery not tested |
| Remote MCP / configured agent client | Deferred | No adapter, connection or invocation | Not implemented / not tested |
| WebMCP / browser site tools | Deferred | No registration or target browser | Not implemented / not tested |
| Onsite model/headless free-text interpreter | Deferred | Non-empty briefs explicitly require structured confirmation | Not implemented |
| Organic discovery / AI referrals | Not a release claim | No unconfigured discovery experiment | Not tested / no uplift claimed |

## Mapping to the supplied standard's T01–T30 catalogue

“Passed” below applies only to the named test layer. Missing access is not a pass; disabled/absent features are not claimed compatible.

| IDs | Disposition |
|---|---|
| T01 | Core/HTTP facts and editorial helper parity pass; actual browser and MCP parity not tested |
| T02 | Supplied-model fixture arithmetic passes; new owner approval/market validation not inferred |
| T03–T06 | Input/uncertainty/conflict/unknown-cost cases pass for this typed scope; free text is deliberately not interpreted |
| T07–T09 | Unsupported paths, no compatibility guarantee and estimate-to-quote boundary pass; no product stock/safety certification tool |
| T10–T11 | In-process source update/withdrawal/stale/conflict pass; deployed static-page/cache update not tested |
| T12 | Anonymous new HTTP access is intentionally disabled/unauthorised; public guide records allowlisted; page visibility needs browser check |
| T13–T14 | Forged fields rejected and responses no-store; cross-tenant/entitled-price systems not applicable because absent |
| T15–T16 | Adversarial fields/briefs and body bounds tested; no model, arbitrary fetch or new upload capability; legacy form uploads not audited here |
| T17–T19 | External writes absent; read-only assessment has no submission; existing reviewed form/delivery/idempotency need controlled staging tests |
| T20 | Model failure not applicable (no model); adapter disable leaves deterministic functions working |
| T21–T23 | WebMCP/MCP not implemented; no client compatibility evidence |
| T24 | Shared price/search/source projections and wiring tested; rendered page/JSON-LD/PDF comparison not tested |
| T25 | Original design preserved and source links audited; real accessibility/browser testing not performed |
| T26–T27 | No core side effects, legacy writer retired, input/output/link safety tested; live rendering needs preview |
| T28 | Downstream agent paraphrase not tested because no selected client |
| T29 | Small warm core-only timing sample recorded, not a production SLO or load-test pass |
| T30 | Flag-off and source withdrawal tested in process; host rollback/cache invalidation not exercised |

## Performance observation

Core-only warm single-process timing: n=1000, concurrency=1, p50=0.019ms, p95=0.042ms, p99=0.146ms. Not production/browser/client latency.

The sample follows 50 warm-up calls on the local deterministic path. It excludes framework boot, browser work, network, proxy/CDN, cold starts and any downstream client. No production speed or traffic/conversion uplift is claimed, and no new service-level budget is approved from this result.

## Release disposition

The code/fixtures/documentation are ready for hosting-agent integration review. **A production release is not signed off.** Complete installation, framework/React checks, browser/PDF/enquiry tests, owner source approvals, hosted rate controls and rollback validation before enabling affected features. Keep HTTP off, noindex intact and direct agent submissions absent by default. There are no new database migrations and no live data was changed.
