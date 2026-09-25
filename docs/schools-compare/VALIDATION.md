# Phase 4 schools comparison — actual validation
Date: 25 September 2026.

## Result
All nine regression/source suites completed successfully in the review environment using Node plus the recorded global-TypeScript import loader. This executes the real assertion scripts, not substituted test results. It is not a successful `npm test` invocation or a Next.js production build.

| Suite | Actual result |
|---|---|
| Pricing | Passed, including unchanged example arithmetic. |
| Finance | Passed: state-aware evidence/public-entity guardrails. |
| Aged care | Passed: 7 profiles, 6 use-case rows, 20 sources; existing pricing example. |
| State | Passed: eight jurisdictions, URL/hash/config preservation and storage fallbacks. |
| Content | Passed: 8 main school profiles, 6 use cases, 26 source records and metadata checks. |
| Static site | Passed: 102 TS/TSX files parsed/transpiled, 287 local imports, 282 literal internal links, 37 routes / 35 sitemap entries. The two non-sitemap routes are the existing system-planner route and the /compare redirect. |
| Agent-Ready | Passed: 62 groups, including 70 captured pricing fixtures. |
| Funding | Passed after the test-only repairs below: 77 groups and 960 state/site/applicant combinations. |
| Schools comparison | Passed: 18 new groups covering source parity, route migration, genuine competitor capabilities, SPON supply uncertainty, five-state evidence and unchanged enquiry boundaries. |

## Typechecks
- `tsc --project tsconfig.schools-compare.json`: passed; strict shared comparison data and metadata.
- `tsc --project tsconfig.funding.json`: passed; existing dependency-light domain.
- `tsc --project tsconfig.finance.json`: passed after removing incomplete dependency directories left by the failed install.
- Agent-Ready isolated check passed with the globally cached Node type declarations:
  `tsc --project tsconfig.agent-ready.json --typeRoots /opt/nvm/versions/node/v22.16.0/lib/node_modules/ts-node/node_modules/@types`.
  Those cached Node types are 25.1.0, not the project's declared installed type dependency. Repeat the ordinary project command after `npm ci`.
- The static site audit transpiled TSX and checked source invariants; it did NOT perform complete React/Next semantic typechecking.

## Dependency/framework/browser limitations
`npm ci --ignore-scripts --no-audit --no-fund` was attempted with bounded retries/timeouts. Registry fetches failed with EAI_AGAIN; npm ended with “Exit handler never called” (exit 1). Partial node_modules was removed. See DEPENDENCY_INSTALL_DIAGNOSTIC.txt.

Ordinary `npm run build`, `npm run lint` and `npm run test:schools-compare` were attempted but could not start their executables in this sandbox (exit 127 / Permission denied). No successful production build, normal full-project typecheck, ESLint pass, Next runtime, browser/hydration or mobile visual test is claimed.

Chromium's presence does not establish that this Next application was rendered. Actual table layout, sticky first column, anchors, modal focus, context propagation, canonical tags and redirect/hash behaviour need hosting-agent preview tests.

No real email, funding application, supplier request, paid integration or database mutation was performed. Existing synthetic HTTP tests invoke local handlers only.

## Inherited funding test repair — not a funding-rule change
The unmodified Phase 3 archive was extracted separately and its funding suite reproduced an assertion failure at the Flying Start unknown-service-type expectation.
The earlier simplified-flow implementation intentionally leaves unknown secondary facts as questions while returning a provisional pathway; two older assertions still expected `confirm_details`.
Only those two fixtures were corrected:
- SA Flying Start: unknown `early_service_type`.
- SA Julia Farr: unknown `gaming`.
Each now additionally asserts that the fact remains in the outstanding questions and `award_amount` remains null. Existing explicit exclusion assertions remain. The full funding suite then passed.
No funding application source, catalogue, feature flow, source dates or matching logic changed.

## Preservation
PRESERVATION_CHECKS.json records byte-for-byte comparisons against the Phase 3 input.
Pricing engine/config/components, funding and finance application code, enquiry components/backend, all API routes, global stylesheet, public assets, lockfile, noindex source and aged-care comparison are unchanged.
Package scripts were extended for the new comparison tests; dependency/devDependency maps and lockfile are unchanged.

## Evidence
TEST_RESULTS.json includes command strings, exit statuses, stdout/stderr, initial failures and final successful runs.
REVIEW_TEST_LOADER.txt records the exact review loader. It is not a production dependency or a substitute for the host's normal npm test setup.
Timing in inherited test output is core-only, warm, single-process; it is not end-to-end website performance.
