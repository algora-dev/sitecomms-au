# SiteComms Australia — Phase 3 finance validation

**Date:** 23 September 2026

## Checks completed in this implementation environment

- `tsc --project tsconfig.finance.json` — **PASS**.
- Finance domain transpilation plus executable smoke suite — **PASS (9 representative cases)**:
  - commercial organisation returns a positive discussion pathway plus national provider evidence;
  - Victorian government school returns operating-lease guidance, not a normal finance-loan result;
  - WA public-school borrowing/credit restriction retained;
  - SA Ministerial-consent restriction retained;
  - NT operating-lease versus finance-lease distinction retained;
  - Tasmania Secretary-approval rule retained;
  - ACT procurement-framework evidence retained without inventing school-level borrowing authority;
  - non-government school receives education-finance evidence;
  - aged-care organisation receives relevant health/equipment-finance evidence.
- Static source audit — **PASS** after fixing the added assertion helper:
  - 101 TS/TSX files parsed/transpiled;
  - 286 local imports checked;
  - 276 literal internal links checked;
  - 36 routes and 35 sitemap entries checked;
  - preview/no-index posture retained;
  - NZ contamination guard retained.
- Changed TSX files were syntax-transpiled successfully during implementation.

## Full dependency-backed project suite

A fresh `npm ci` was attempted. The container operation timed out before the dependency installation completed. A subsequent `npm test` could not start because the `tsx` binary had not been installed. Partial `node_modules` output was removed and is not included in the deliverable.

Therefore the following are **not claimed as passed in this environment**:

- full `npm test`;
- framework-wide TypeScript check using installed project dependencies;
- ESLint;
- Next.js production build;
- browser/hydration/mobile preview;
- live enquiry delivery.

The hosting agent must perform these checks from the existing lockfile before deployment.

## Release smoke cases for the hosting agent

At minimum verify the public finance checker for:

1. QLD commercial business — state first, then existing three-question readiness flow, national provider evidence.
2. NSW independent school — education-sector provider evidence, no invented state lender restriction.
3. VIC government school — operating lease possible; finance lease/borrowing not represented as a normal school route.
4. WA government school — no school-controlled borrowing/credit suggestion.
5. SA government school — written Ministerial-consent caveat visible.
6. NT government school — operating/finance lease distinction visible.
7. TAS government school — Secretary approval visible.
8. ACT government school — government procurement route visible without claiming independent school borrowing authority.
9. Aged care — healthcare/equipment finance evidence shown as market evidence, not approval.
10. SiteComms enquiry — carries state and finance context; does not auto-forward to a finance provider.
