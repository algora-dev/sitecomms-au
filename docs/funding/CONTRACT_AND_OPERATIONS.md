# Phase 2 funding — contract, integration and operations

Current capability: `assess_funding_pathways`. Catalogue **2026-09-20.1**; funding rules **1.0.0**; existing business-result envelope **1.0.0**. The normal website remains usable without an AI assistant or enabled HTTP integration. This is a researched navigation/qualification tool, not a grant assessor, loan broker or application service.

## One core and public representations

- `src/lib/funding/catalogue.ts`: 25 pathway records; 33 official source references; observed statuses, explicit date/time zones, material conditions, published terms, source dates and predicates.
- `src/lib/funding/questions.ts`: exact typed enum options, required fields, conditional UI questions and generated JSON input schema.
- `src/lib/funding/assessment.ts`: validation, unknowns, conservative matching, clock/freshness/withdrawal policy, qualification output and outgoing assertions. No model, network fetch or write occurs.
- `src/lib/funding/guides.ts`: five source-linked editorial explanations. Programme records are rendered from the catalogue by `StateFundingGuide`.
- `FundingCheckTool.tsx`: three-step UI calling that same handler, not separate grant formulas. Fields are not saved; only the existing project-state preference persists. Existing general analytics/host logging remain separate.
- `src/lib/agent-ready/capabilities.ts`: third capability, reusing the existing envelope and controlled HTTP profile. Guide search now shares 18 public records with the ordinary guide directory.

## Inputs and their meaning

Required enums: `state`, `site_type`, `applicant_type`, `project_focus`, `stage`. Optional enums include tenure, building scope, community benefit, core-service context, specific accessibility/hearing evidence, preschool service/operator/commitment/additional-places conditions, targeted/authorised care status, invitation, gaming and existing grant funding. See `FUNDING_FIELDS` and `FUNDING_INPUT_SCHEMA` for the exact single definitions.

The project state is the physical site, not inferred geolocation/head-office location. The site and legal applicant are separate. An eligible non-profit label does not decide the identity or entitlement of a school, care provider or venue owner. Unclear legal relationships and exceptions require authority confirmation. Unsupported extra keys, arbitrary URLs, award amounts, role/tenant overrides and client-supplied dates cannot change the server's sources or policy.

Missing optional answers remain `unknown`; zero/false/empty strings are not silently used instead. The UI offers 'not sure' and asks only applicable follow-up questions. A building-project answer conflicting with 'not part of building works' returns clarification. No names, addresses, diagnoses, resident/student identifiers, bank records, financial statements, medical reports or uploaded plans are needed for discovery. Budget is deliberately not used as an unverified eligibility threshold in this release. URL-carried old pricing amounts are not used to calculate grant awards.

## Result contract

`result_type` is always `qualification`. The response can be `needs_input`, `requires_human_review`, `ok` (including an honest no-match) or `unavailable`. A transport 200 does not mean funding approved.

Each pathway includes route type/label; relevance classification; application availability; freshness; official facts; separate SiteComms interpretation; material conditions; applicant-specific reasons/questions; official source IDs; source review/due dates; published closing information where established; next step. `result.grant_award` and `pathway.award_amount` are always **null**, and `approval` is always **not_determined**. Programme ceilings/percentage terms are qualified explanatory text only; no likelihood, award calculation, grant stacking or deduction from the price estimate exists.

Route categories: grant, internal allocation, project approval, procurement and concessional loan. The two loan records are finance-phase signposts and remain outside the grant-investigation group. Human result sections: investigate, check conditions first, closed/watchlist/finance signposts, and outside this limited model. No matched route does not establish that no other funding exists.

Programme facts may support relevance, not authority to issue a commercial promise. The business identity is server/application-controlled SiteComms, not supplied by the requester. `generated_at` is response generation, never a refreshed source verification.

## Date, source and failure behaviour

Exact official times are stored as UTC instants with the applicable Australian time zone. Date-only deadlines remain date-only. On that local closing day the checker asks for the actual cut-off; it does not invent midnight eligibility. Passed closing dates take precedence over stale open badges. No later round is presumed. SA/NSW October daylight-saving boundaries have fixtures.

Source freshness is independent: on the UTC review-due date, re-review is required. It downgrades a positive result and surfaces an overdue-review message, even while published application dates appear open. These are proposed editorial review windows, not claims of live status. Missing source references, invalid/future review metadata or withdrawn records suppress positive relevance and former record facts/terms. An unavailable catalogue is not an empty successful search. Known contradictory official application labels require confirmation rather than a fabricated reconciliation.

The checker re-evaluates dated outcomes when run and each minute/visibility return in an open result tab. It does **not** fetch new funder data. State guides are implemented with request-time rendering (`force-dynamic`) and use the same status function. Confirm actual Next/proxy behaviour in staging; already-open HTML needs reload, and newly published catalogue revisions require users to reload the client bundle.

## Location and reviewed enquiry handoff

Explicit valid `?state=` wins; otherwise a named `/funding/<state>` guide sets the existing project-state preference. `state=AU` explicitly clears it. Users can change/clear it without location detection or forced redirects. Tests cover pure path mapping; browser hydration and navigation remain preview checks.

Changing the saved state or key answers hides earlier results and clears conditional context before reassessment. The enquiry launcher appears only with current results and carries compact path IDs/statuses, source version, selected answers and unresolved limitations into the existing **reviewed** form. It does not send automatically. The enquiry context is user/browser supplied, not a funder-approved or server-issued award record. Existing email handling labels client context unverified.

SiteComms receives the user's explicitly submitted requirement and replies with appropriate providers' **public contact details**. It does not forward the enquiry to providers. No grant application, referral data transfer, direct agent submission, new retention store or medical-document collection is introduced. No integration or delivery test contacted real people.

## Optional HTTP test route

```
POST /api/business/v1/funding
Authorization: Bearer <server-only key>
Content-Type: application/json
```

Uses the same `handleCapabilityHttp` profile as existing pricing/search: **disabled unless `SC_AGENT_READY_HTTP_ENABLED=true`**, a server key of at least 32 characters, no browser-Origin requests, streamed 16 KiB request limit, five-second body deadline, safe errors and no-store/noindex headers. Its per-process authenticated 60/minute backstop is not a distributed quota. Apply real host/WAF limits and protected staging before enabling any reachable route. Never add the key to `NEXT_PUBLIC_*`, URLs, logs or browser JavaScript.

After owner-authorised staging setup, an agent can run a non-writing synthetic test:

```sh
curl --fail-with-body "$SITE_URL/api/business/v1/funding" \
  -H "Authorization: Bearer $SC_AGENT_READY_HTTP_KEY" \
  -H 'Content-Type: application/json' \
  --data-binary @tests/funding/example-request.json
```

Do not send a real customer brief. The fixture response is dated, not a live contract answer. The original `POST /assessments` pricing shape still rejects attempts to repurpose it for funding and points to the separate capability. Strict clients of the old capability enumeration need a schema refresh. Remote MCP, WebMCP, selected consumer agents, proxy behaviour and organic discovery are **not tested/implemented claims** of this release.

## Updating the evidence and rules

Assign a named SiteComms editorial owner before launch. The proposed review calendar is not a scheduled automation. Start with QLD GCBF and NSW BGAS by 27 September; follow each source record's due date thereafter. Re-review sooner if a funder changes/closes/withdraws guidance.

Read the official page and the actual relevant guidelines. Record what was checked and any inaccessible/conflicting material; change `reviewed` only for a real review. Keep status, closing time, source due date and source-publication date distinct. Update facts, exclusions, conditions and rules together; bump catalogue version and, when behaviour changes, funding rule version. Inspect the source-linked editorial explanations in `guides.ts`, metadata, shared directory and dependent public copy. A record withdrawal requires reviewing those explanatory sections too, not simply changing a badge. Never automate an annual new round by changing the year.

Run funding, core/HTTP parity, state/source/link and all existing tests; scrutinise changed expected cases rather than rebaseline blindly. Rebuild/redeploy pages, client bundle and handlers together, invalidate relevant caches and verify the visible/source versions. Preserve a previous known-good evidence release except where it contains withdrawn misleading claims.

## Disable / rollback

Set `SC_AGENT_READY_HTTP_ENABLED=false` to disable the optional adapter under the host's environment/restart rules; ordinary pages/tools are independent. For an individual evidence issue, set that pathway's `publication` to `withdrawn`, correct dependent editorial sections, test and redeploy. There is no hot-edit database/CMS or automatic crawler in this release. Withdrawn evidence must not be restored merely to obtain a previous appearance.

For a full Phase 2 rollback use the supplied 20 September **pre-funding Agent-Ready** ZIP/commit, not an older version that restores automatic pricing logs. Remove/revert new routes, navigation and capability registrations together. Once publicly indexed, any route removal needs the site's redirect/removal policy. There are no database/schema migrations to reverse and no historical data has been touched.

## Release ownership and limits

T3 Labs/SiteComms must approve the interpretation/routing policy, source maintenance responsibility and launch. The hosting agent must install the unchanged dependencies, read version-matched Next guidance, complete framework/lint/browser and synthetic enquiry tests, verify dynamic dates/noindex/access controls and then seek deployment/indexing authorisation. This code is not a legal, privacy, accessibility or security certification.

Next research phase: commercial equipment finance and public-entity borrowing/lease authority for QLD, NSW, VIC, WA and SA, with institution/sector distinctions. No state price multiplier, interest rate, lender recommendation or loan-approval rule has been added here. A further Australian comparison-market pass follows separately.
