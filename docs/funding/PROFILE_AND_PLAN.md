# Phase 2 — Australian funding pilot profile and implementation plan

Prepared 20 September 2026, before substantive implementation. Baseline: user archive `sitecomms-au-codebase-2026-09-20.zip`. No production access, changes, enquiries, payments or deployment authorised.

## Approved scope
Research-led funding pathway discovery for Queensland, NSW, Victoria, WA and South Australia. Schools, residential aged care, early childhood and relevant community organisations; other site types return an honest coverage limitation. ACT, NT and Tasmania retain state selection and applicable national records, without implying a state-level audit. Preserve design, assets, deterministic AUD calculator and its 80–100% range. Commercial finance and a further product-comparison pass are deferred.

## Observed baseline
The actual source contains the shared Agent-Ready pricing/search registry and default-disabled authenticated HTTP adapter. Funding is a status/preparation page. The state store, reviewed enquiry modal, metadata registry and hardcoded sitemap are reusable. Public pages remain noindex. No runtime, live delivery or deployed integration is established by source inspection.

## Authority map
Official programme owners are authorities for their programme facts and application decisions. Public guidelines, official round pages and education infrastructure procedures are the research sources. SiteComms owns its conservative pathway-selection rules and editorial interpretation, not eligibility decisions. Every record preserves the distinction. A page publication date or a generated answer is not a new verification event.

Source ownership: government/funder cited on each record. Editorial maintenance and release approval: T3 Labs/SiteComms owner must assign a named maintainer before public launch. No grant approval, future round, entitlement, provider partnership or award is invented. Programmes can be closed, invitation-only, internally administered or status-conflicted.

## Smallest useful vertical slice
QLD organisation/site/applicant/scope → shared `assess_funding_pathways` handler → existing-style funding form → sourced result with limitations → reviewed SiteComms enquiry form. Expand the same mechanism to all five priority states and national care/non-government-school sources; no model or new database.

## Ordered changes
| Classification | Existing/target | Change | Acceptance / rollback |
|---|---|---|---|
| Reuse | pricing, theme, state store, enquiry modal | Preserve arithmetic, assets, UI classes and explicit submission | Hash/regression checks; restore baseline archive |
| Add | `src/lib/funding/` | Typed catalogue, official sources, explicit question schemas, date/freshness and conservative matching | Deterministic positive, negative, unknown, source-failure and deadline fixtures; withdraw affected records |
| Wrap | `src/lib/agent-ready/` | Third named assessment capability and optional protected HTTP route | Core/HTTP parity, validation, no side effects, route remains disabled |
| Refactor | `/tools/funding-check` | Accessible structured tool, no contact gate, editable context and ordinary form handoff | Input/result invalidation, state binding, source/limitation display; revert page |
| Add | `/funding` and five state guides | Useful state-specific summaries generated from the same catalogue | Source/page/tool parity, sitemap and guide links; remove routes with migration policy if published |
| Refactor | guide directory, state/tool landing pages | Replace obsolete status-only copy, add navigation | Existing links/source tests and metadata checks |
| Defer | commercial finance, MCP/WebMCP, automated grant applications | No speculative finance eligibility, protocol support or automatic submissions | Explicit unsupported/not-tested documentation |

## Release gates
Run existing regression scripts; add funding fixtures covering each state and entity boundary, dates/time zones, retrospective spending, source conflict/staleness/withdrawal, incomplete inputs, invalid fields and no predicted awards. Run strict domain typechecking and available source/syntax/link checks. Attempt the full framework build, report missing dependencies honestly. Preview browser testing, mobile/accessibility review and end-to-end synthetic enquiry delivery remain agent/hosting gates if unavailable here.

## Business constraints and unanswered questions
Programme eligibility involves facts this tool does not collect, and final decisions remain with the funder/department. No comprehensive grants-directory claim. No school/student/resident identity, medical record, address, bank record or contact detail is needed for discovery. All scheme amounts are deliberately omitted from automated awards; no stacking or subtraction from the pricing estimate. T3 Labs must approve editorial assumptions, assign update responsibility and authorise deployment. Funding source review cadence is risk-based and enforced; existing sources can remain useful with an explicit stale/recheck state, never a false live-check claim.
