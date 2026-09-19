# SiteComms Australia — Phase 1 implementation

**Date:** 19 September 2026  
**Input:** `sitecomms-au-current-structure-2026-09-19.zip`  
**Status:** Code/content implementation complete for this phase; hosting-environment build and browser acceptance are still required. This is not a launch approval.

## Scope delivered

### One national site with optional project-state context
- Added all eight Australian jurisdictions in a shared validated data module.
- Added a non-blocking state/territory selector in the existing header, plus relevant homepage/tool panels.
- Remembers the state in browser local storage, with a tested in-memory fallback when storage is blocked. Visitors can clear it. No IP geolocation, forced redirect or mandatory entry gateway.
- Explicit `?state=QLD`-style incoming links set the context; invalid values are ignored. `?state=AU` clears it.
- Current project enquiry forms require the project state. The email sent to SiteComms includes it. Generic messages remain lightweight; the server accepts omitted state from older clients, but rejects supplied invalid values.
- Tool links preserve existing configuration and aged-care context while adding the state. Pricing is not changed by the state.
- The selector does **not** activate researched state funding matching, finance approval rules, local inventory or automatic provider routing.

### Existing Australian comparison content rebuilt
- Replaced the school comparison with seven evidence-qualified approaches: FrontRow Conductor, Algo, Axis, Bosch PROSPERO, Bodet Harmonys, TOA and traditional/hybrid PA.
- Added use-case groupings, a capability matrix, scoped profile fields, Australian-evidence labels, quote questions, an illustrative school brief and a 14-source register.
- Kept 2N in its entrance-intercom role. SPON remains conditional on verifying Australian supply/support. ITC is not in the main comparison while that evidence is unverified.
- Light references to Australian providers/wholesalers identify public evidence, not SiteComms partnerships or nationwide coverage.
- Updated the aged-care comparison: five main approaches, with SPON and FrontRow conditional/context-specific; removed ITC from the main data. Seven profiles, six use cases and 20 referenced sources remain.
- Removed unsupported predetermined brand ordering from the aged-care tests. Tests now enforce evidence/data integrity instead.
- Clearly separates ordinary PA/intercom from clinical nurse call and specialist emergency-warning design.

### Three new pages, not eight cloned websites
1. `/states` — all-jurisdiction planning directory, project-entity distinctions and official education starting points.
2. `/guides/school-pa-paging-requirements` — the missing requirements guide already linked elsewhere in the original source; now a usable project-brief guide.
3. `/guides/compare-pa-system-quotes` — like-for-like scope, inclusions, exclusions, ownership, acceptance and support questions.

These are server-rendered guide pages using existing design components. The state directory is not eight complete researched state funding guides.

### Existing pages improved
- Tightened network-readiness, IP paging, school-bell and emergency-communications guidance.
- Replaced generic PoE wattage/headroom assumptions and blanket network claims with exact-model, network-owner and failure-testing questions.
- Removed language implying SiteComms has heard particular scenarios from Australian customers when the code did not provide that evidence.
- Clarified schedule exceptions, shared analogue circuits, remote maintenance limitations, cabling scope and emergency-system boundaries.
- Updated homepage, tools and guide links to reflect funding preparation rather than a completed eligibility engine.
- Added truthful review dates, new sitemap entries and consistent navigation to the new material.

### Funding and finance boundaries
- Funding is an honest all-sector preparation/status page with state context, not a grant eligibility quiz. It includes schools, aged care and other applicants in the preparation brief.
- Added an interim finance safeguard: government schools and public organisations receive an authority/approval check before any specialist-finance discussion, regardless of entered budget.
- Unknown organisation types do not get a strong readiness result. A no-upfront-payment preference is not represented as an available product.
- Added finance-page/tool notices explaining that state borrowing rules and lender options are not yet assessed. Detailed finance research remains Phase 3.

### NZ residue and compatibility
- Removed the Christchurch enquiry placeholder, inappropriate school terminology, rest-home wording and NZ school funding references in the case-study intake.
- Removed the Auckland timezone from pricing-output logging. New PDF timestamps and payload `createdAtUtc` use explicit UTC.
- **Intentional exception:** the existing database column is still called `created_nz` to avoid a silent schema-breaking change; new values written there are UTC ISO strings. Historic rows are not migrated. Review any downstream report relying on the former formatting.
- **Intentional exception:** the genuine NZ T3 Labs privacy contact/address is retained. No Australian office has been invented.
- No invalid `.Australian` URLs remain in runtime source.

## Design and behaviour preserved
- Original global CSS is preserved before small appended accessibility rules. Brand colours, typography, cards, buttons, hero components and original assets remain.
- Corrected the header logo’s intrinsic dimensions to match the existing **1334 × 439** transparent asset and supplied a display size. No artificial upscaling or logo redesign.
- Added skip-to-content, visible keyboard focus, reduced-motion support and a scrollable mobile menu.
- Existing pricing modules, calculator components, presets and AUD assumptions remain unchanged, including the 80–100% range. Existing aged-care calculator links still round-trip correctly.
- SiteComms reviews enquiries and replies with suitable providers’ public contact details; it does not forward customer enquiry data to recommended providers.
- Preview protection remains. Explicit root-level `noindex` now also covers pages using their own metadata, including the homepage. Robots still disallows crawling.
- Dependency versions and the package lockfile are unchanged. Added tests/scripts only; no package upgrade or database migration.

## Validation and handoff
See `docs/PHASE_1_VALIDATION.md` for exact passed checks and limitations. See `AGENT_HANDOFF_PHASE_1.md` for deployment acceptance steps.

**Not completed:** a fresh Next.js production build, full framework type-check, ESLint run, browser/mobile/hydration validation, live email delivery, live Supabase/PDF logging or an exhaustive external-link reachability sweep. npm registry DNS failed in this environment, preventing dependency installation. Do not interpret static syntax checks as a successful production build.

## Next phases
**Phase 2:** state-by-state funding research and a source-backed state → applicant → project → pathway engine, beginning with QLD, NSW, VIC and WA. Grants, internal allocations, approval/procurement routes and subsidised loans must be classified separately, with status and review dates.

**Phase 3:** finance research across all jurisdictions, with applicant/governance checks, genuine Australian provider evidence, permitted structures and explicit exclusions. No invented rates, approval likelihood or universal public-school borrowing rules.

**Later:** deeper state guides, verified local case studies/provider coverage, further sector content and launch/indexing QA.
