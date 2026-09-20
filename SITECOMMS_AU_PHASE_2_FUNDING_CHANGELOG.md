# SiteComms Australia — Phase 2 funding change log

**Implemented 20 September 2026.** Baseline: the user's latest `sitecomms-au-codebase-2026-09-20.zip`. This is a complete source update, not an instruction-only audit, patch, deployment or promise of a grant.

## Added and rebuilt

A three-step funding checker now asks for the project state and site, the actual legal applicant/project/stage, and only relevant follow-up details. Its core is shared with a third Agent-Ready capability and a default-disabled authenticated HTTP route. It returns sourced routes, conditions and practical next steps—not awards or eligibility approval.

The versioned catalogue has **25 pathway records and 33 official-source records**, covering selected QLD, NSW, VIC, WA and **South Australian** routes and national school/aged-care programmes. Grants, internal allocations, works approval, procurement and repayable loans are labelled separately. ACT, NT and Tasmania retain applicable national routes only, explicitly marked as limited coverage. Schools, care homes, retirement villages, early learning and other legal/site contexts are not conflated.

Added `/funding` and five substantive state guides. They reuse the catalogue, official citations, conditions and clock/freshness logic; the ordinary guide directory/search now shares 18 records. Direct state-guide visits establish state context unless an explicit query chooses otherwise. Existing home, school, aged-care and related links no longer claim funding is merely coming later. The aged-care pricing journey can reach the all-sector funding tool without a school-only suggestion.

## Important safeguards

Missing details remain unknown; no arbitrary grant odds, predicted award or price reduction is computed. Published programme limits are explicitly not an award. Already committed work, property permission, government/core-service restrictions, new preschool places, accessibility evidence, invitation-only access and applicant legal form are handled conservatively.

Application deadlines are distinct from editorial review deadlines. Date-only cut-offs do not invent precise times; NSW/SA daylight-saving boundaries are tested. Closed or conflicting official statuses are not turned into open grants. Missing/withdrawn evidence cannot support a positive conclusion. Long-lived tool results re-evaluate date status without pretending to refetch sources; new records require a coordinated update/deployment.

The existing reviewed enquiry form receives compact selected context only after the user opens and approves their enquiry. No automatic lead, application, provider forwarding or new assessment storage is added. Old results are hidden when key answers/state change. Old URL-carried prices are not used to calculate funding; finance retains its own existing estimate context.

## Preserved

Global stylesheet, original public assets, pricing engine/config/presets and 80–100% AUD range, finance calculation/configuration, inquiry backend, retired pricing logger, comparison data, preview/noindex, dependency versions and lockfile remain unchanged. No redesign, new database, model/AI service, MCP/WebMCP adapter, production record change or deployment occurred. Relevant navigation wording was updated without changing the design system.

## Research qualifications

ACCAP Critical Infrastructure is invitation-only; full GO6332 documents were not retrievable. NSW BGAS status is conflicting; BELP's old deadline is not overridden by an Open badge. SA Flying Start requires a genuine additional-capacity preschool proposal, and Julia Farr has substantial applicant/core-cost exclusions. WA procurement is not a grant; two capital-loan records are signposts for the later finance phase. Selected sector/community gaps are disclosed rather than invented away. See `docs/funding/RESEARCH_AND_COVERAGE.md` and the runtime source register.

## Validation

All eight domain/source suites passed through the documented real-TypeScript review loader. That includes **62 Agent-Ready groups / 70 captured pricing configurations**, **75 funding test groups / 960 state-site-applicant combinations**, and strict funding plus isolated Agent-Ready domain typechecks. Source audit covered 100 TS/TSX files, 282 imports and 276 literal links. Exact commands and file-preservation hashes are supplied.

**A full Next.js production build, project typecheck, ESLint and browser tests remain unverified.** Dependency installation failed with npm-registry DNS/exit-handler errors; the build could not find Next and lint could not find ESLint. The agent handoff requires normal installation, full checks and preview verification before any deployment. Local route-handler tests are not an external consumer integration test.

## Next step

The hosting agent should verify this source on a preview using `AGENT_HANDOFF_PHASE_2_FUNDING.md`, preserving noindex and disabled integration flags. SiteComms must approve source interpretation and assign a maintainer; first time-sensitive reviews are due 27 September. Then proceed to the **separate five-state finance research/build**, followed by the planned comparison/product-market refinement. Enabling public indexing is a separate release decision.

Full file changes and preservation evidence are under `docs/funding/`; programme records are maintained in `src/lib/funding/catalogue.ts`, not in this historical change log.
