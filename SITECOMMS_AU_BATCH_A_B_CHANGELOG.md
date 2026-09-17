# SiteComms Australia — Batch A + Batch B change log

**Completed:** 17 September 2026  
**Scope:** Australianisation cleanup and AUD pricing calibration only. The dedicated funding rebuild, full Australian comparison rebuild, finance evidence pass and aged-care evidence pass remain later work.

## Batch A — Australianisation and contamination cleanup

- Removed invalid mechanically localised `.Australian` URLs and replaced false supplier evidence with genuine Australian routes where verified.
- Removed NZ-derived funding engine/configuration rather than lightly localising it. `/tools/funding-check` now remains as a stable, production-safe funding-pathways status page until the dedicated Australian rebuild.
- Updated site-wide funding CTAs/copy so they no longer imply that an automated Australian eligibility checker is currently operating.
- Removed false Australian school/project evidence and NZ-derived internal audit/handoff/source-check files that should not ship with the Australian application.
- Corrected NZ/SmartComms deployment fallbacks and script references, including IndexNow host and favicon/test references.
- Corrected Australian organisation terminology in the finance-check categories (government, Catholic, independent, university/TAFE/tertiary, early childhood/childcare).
- Corrected stray NZ-style public wording such as `Ministry` references.
- Preserved the T3 Labs NZ operator email/address on the privacy page intentionally; no Australian office has been invented.
- Reworked current comparison/aged-care source references only where required to remove false localisation. This is **not** the later full Australian comparison or aged-care evidence rebuild.
- SPON and ITC Australian supply/support are explicitly qualified where a current strong local route was not verified.

### Australian evidence routes used in this cleanup

- FrontRow Australia: https://www.gofrontrow.com.au/
- FrontRow Conductor: https://www.gofrontrow.com.au/products/conductor/
- advanceNET education / Australian distribution context: https://www.advance-net.com.au/product-category/solutions/education/
- Bosch PROSPERO / Keenfinity Australia: https://www.keenfinity-group.com/au/en/solutions/public-address-solutions/public-address-and-voice-alarm-systems/prospero/
- Axis Australia / Audio Manager Edge: https://www.axis.com/en-au/products/axis-audio-manager-edge
- TOA authorised dealers — Australia: https://toa.com.sg/dealers/29
- AtlasIED Australian distributor announcement: https://www.atlasied.com/news/national-audio-systems-named-distributor-for-atlasied-in-australia
- Australian Government aged-care context: https://www.health.gov.au/topics/aged-care/about-aged-care

## Batch B — AUD pricing calibration

The existing calculator architecture and **80–100%** estimate range were retained. Static SiteComms planning baselines were changed to AUD; the calculator is not dynamically FX-linked.

| Item | AUD baseline |
|---|---:|
| Central platform | 4,895 |
| Standard indoor A | 525 |
| Standard indoor B | 555 |
| Large outdoor A | 770 |
| Large outdoor B | 850 |
| Voice intercom | 525 |
| Video intercom | 710 |
| Two-way button | 230 |
| Extra control station | 1,500 |
| Monitoring annual | 525 |
| Emergency interface | 1,535 |

Public pricing language and regression expectations were updated to match. These remain SiteComms planning assumptions, not claimed Australian market averages.

## Validation

- Pricing regression tests: **passed** (`A$8,356–A$10,445` for the reference 10-room B scenario; 80–100% range retained).
- Finance-check regression tests: **passed**.
- Aged-care content/engine assertions: **passed** (8 profiles, 6 use-case rows, 42 sources).
- TypeScript/TSX syntax transpile check: **66 files, 0 syntax errors**.
- Invalid `.Australian` URL scan: **0**.
- NZ-domain/content scan: only the intentional T3 Labs NZ privacy contact remains.

### Build-environment limitation

A fresh `npm ci` / full Next.js production build could not be completed in this execution environment because DNS resolution to `registry.npmjs.org` failed (`EAI_AGAIN`). The dependency-fetch failure is environmental; it is not reported here as a successful full production build. The project-level regression scripts and independent TS/TSX syntax check above were run successfully.

## Deliberately deferred

1. Full Australian platform-comparison rebuild (including Bodet and final shortlist structure).
2. Dedicated Australian funding research/rebuild by school sector and jurisdiction.
3. Australian finance-provider/evidence pass.
4. Australian aged-care evidence/local-market pass.
5. Final launch QA after those passes.
