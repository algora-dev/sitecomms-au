# Agent-Ready Foundation contracts — SiteComms Australia

Business contract: **1.0.0**. This is an internal application contract, not an MCP/WebMCP wire format. The authoritative definitions are `src/lib/agent-ready/contracts.ts`, `assessment.ts`, `validation.ts`, `search.ts` and `capabilities.ts`. The following is explanatory documentation, not a second implementation.

## Selected capabilities

| Capability | Handler | Effect | Scope |
|---|---|---|---|
| `search_business_content` | `searchBusinessContent` | Read only; zero model calls | Keyword navigation search of the shared 18-record public guide directory |
| `assess_request` | `assessRequest` | Stateless assessment; zero model calls | Existing deterministic AUD pricing model with strict structured inputs |
| `assess_funding_pathways` | `assessFundingPathways` | Stateless assessment; zero model calls | Dated five-state/national pathway shortlist; no eligibility or award decision |

There is no `submit_enquiry`, product-stock lookup, lender matching, funding-eligibility engine, natural-language interpretation or arbitrary fetch operation. A form link is not a submission. There is no durable assessment record or `assessment_id`. Transport request IDs diagnose calls only.

`capabilities.ts` defines input JSON schemas, descriptions, handlers and output validators once. Outputs currently have TypeScript contracts plus executable cross-field assertions; **a protocol-specific output JSON Schema and remote adapter have not been implemented or tested**. Do not represent these HTTP routes as MCP or promise universal external-client support.

## Shared result envelope

Successful domain evaluation, including a clarification or unsupported request, returns:

```text
schema_version: "1.0.0"
business_id: "sitecomms-au"             # fixed by application, never caller authority
capability: search_business_content | assess_request | assess_funding_pathways
status: ok | needs_input | not_supported | requires_human_review | unavailable
result_type: information | budget_estimate | qualification
summary: string
result: typed capability-specific payload
sources: public source records
limitations: string[]
next_actions: view_page | provide_input | review_enquiry_form
generated_at: response-generation ISO timestamp, not source verification
```

`formal_quote` is **not** an output classification. A request asking for a formal quote produces `not_supported`, with no amount. `requires_human_review` may contain the same provisional estimate for a larger configuration; the warning is not permission to present it as a price cap or final design.

Source records distinguish authority, owner role, source version, recorded editorial review date, optional review deadline, approval status and freshness. There is no manufactured `verified_at`. Price source status defaults to `review_interval_not_set` because the owner has not approved a review interval. This is not a claim of current independent market verification.

## Pricing request

Use `tests/agent-ready/example-request.json` for a complete **synthetic 10-room test configuration**, not a real customer submission. The existing pricing baseline produces AUD 8,356–10,445 excluding GST for that configuration; these numbers are regression expectations for the supplied provisional model, not new commercial approval.

`intent` is required and accepts `pricing`, `funding`, or `finance`. Only pricing is implemented **under this original request shape**. Funding now has its own separate, strictly typed `assess_funding_pathways` capability; sending `intent: funding` to the pricing endpoint still returns a limitation and directs the caller to the proper funding tool. Do not reinterpret pricing quantities as funding inputs. Optional top-level fields are `configuration`, `project_state`, `quantity_basis`, `requested_outcome` and `brief`. No other keys are accepted.

The exact nested configuration follows the existing `CalculatorState`:

- `tier`: `A`, `B`, `C`, `unsure`.
- `areas`: all five keys explicitly supplied: `standardIndoor`, `largeIndoor`, `outdoor`, `largeOutdoor`, `entry`. Integers 0–99. Zero means explicitly none; missing/null/string/negative/fractional counts do not become zero. An entirely empty site returns `needs_input`, not a headend-only project price.
- `speakers`: `largeIndoor`, `outdoor`, `largeOutdoor`, each integer 1–99 or explicit `null`. Here null is the user's choice to use the existing model default, which is disclosed; it is not measured coverage.
- `featurePackage`: `essential`, `safety`, `interactive`.
- `fineTune`: `twoWayMode` (`package`, `none`, `some`, `all`); `twoWayQty` integer 0–99; `entryIntercom` (`voice`, `video`); `additionalControlStations` integer 0–5; `monitoring` boolean. Selected `some` two-way rooms cannot exceed standard indoor rooms.
- `project_state`: exact `ACT`, `NSW`, `NT`, `QLD`, `SA`, `TAS`, `VIC`, `WA`, null or omitted. It affects context and next-step links, never the arithmetic. Unrecognised values are not inferred or silently capitalised.
- `quantity_basis`: `approximate`, `customer_supplied`, `unspecified`; omitted means unspecified. The human calculator uses approximate. Customer-supplied is not independently verified.
- `requested_outcome`: omitted or `budget_estimate` for pricing. `formal_quote` and `qualification` return unsupported in this slice rather than inventing a different service.
- `brief`: optional text, at most 4,000 characters. **Any non-empty brief returns a clarification**: natural-language interpretation is not enabled, so a possibly conflicting brief is not ignored while calculating from other fields. Confirm structured fields and remove the unprocessed brief.

Supplied objects reject additional properties. Caller-supplied business IDs, roles, rate tables, source overrides and destinations are not permissions. Trusted source/time overrides exist only as an internal application/test argument, never a public field.

## Pricing payload semantics

`price` and `estimate` are null when an amount cannot be produced. For an estimate, the payload includes:

- `currency: AUD`, `minor_unit_exponent: 2`, integer `low_minor` and `high_minor`, and `tax_treatment: GST_excluded`.
- `price_basis: modelled_installed_communications_scope`, `range_basis: existing_80_to_100_percent_planning_model`.
- Optional annual monitoring in `monitoring_annual_minor`, separate from project total; null when not selected, not a hidden zero-cost promise.
- The unchanged legacy calculator result for existing human renderers; normalised inputs; quantity basis; explicitly listed existing-model defaults; included/excluded scope; unresolved site conditions; source, rule and assessment-policy versions.
- Machine-readable input issues and useful next actions when more information is required.

Price results preserve site-wide cabling exclusions, unpriced network/power/access/travel conditions, no acoustic/life-safety/nurse-call certification and no quote/eligibility promise. Outgoing money, classification and total reconciliation are asserted. The existing model already rounds its displayed amounts; the wrapper converts those results to integer cents without replacing its arithmetic or silently changing rounding.

## Search request and response

`query`: 1–200 characters after requiring meaningful non-whitespace text. `limit`: integer 1–10, default 5. `offset`: integer 0–100, default 0. HTTP only accepts these three query parameter names once each.

Results return the same IDs, titles, descriptions and canonical links as the human guide directory, with source references, editorial dates, `total`, `next_offset` and `scope: public_guide_directory`. This is not full-text article retrieval, independent product ranking, or a claim to search the entire code/document archive. No match is `ok` with an empty list; unavailable required directory data is a different outcome. The human directory initially renders all ordinary links and adds optional filtering.

## Optional authenticated HTTP test profile

Disabled unless `SC_AGENT_READY_HTTP_ENABLED=true`. A strong secret `SC_AGENT_READY_HTTP_KEY` (minimum 32 characters) must exist **only in server environment configuration**. This profile is for a controlled server-to-server staging test, not a consumer browser or an OAuth identity system.

```text
GET  /api/business/v1/search?query=cabling&limit=5
POST /api/business/v1/assessments
POST /api/business/v1/funding
Authorization: Bearer <server-held key>
Content-Type: application/json           # POST only
```

Use a trusted local terminal/runner; do not embed credentials in browser JavaScript, query strings, public examples or chat logs. After owner-authorised staging configuration:

```sh
# SITE_URL must identify an authorised local/staging site.
# SC_AGENT_READY_HTTP_KEY is supplied securely in this terminal environment.
curl --fail-with-body --get "$SITE_URL/api/business/v1/search" \
  -H "Authorization: Bearer $SC_AGENT_READY_HTTP_KEY" \
  --data-urlencode 'query=cabling' --data-urlencode 'limit=5'

curl --fail-with-body "$SITE_URL/api/business/v1/assessments" \
  -H "Authorization: Bearer $SC_AGENT_READY_HTTP_KEY" \
  -H 'Content-Type: application/json' \
  --data-binary @tests/agent-ready/example-request.json
```

These calls must not submit an enquiry or write a database record. Do not send personal briefs while testing. Hosting-layer authentication may separately protect preview pages.

The adapter rejects all Origin-bearing requests intentionally because this selected profile has no browser/CORS access. This is **not** a general MCP transport policy. A future actual MCP adapter needs its own selected specification/client implementation.

| HTTP status | Meaning |
|---|---|
| 200 | A domain result, which may still be `needs_input`, `not_supported` or `requires_human_review`; inspect `status` and `result_type` |
| 400 | Malformed supplied fields, query parameters, JSON or unsupported fields |
| 401 / 403 | Missing/incorrect key; or browser-Origin request outside the selected profile |
| 404 | Integration disabled |
| 405 | Unsupported method (framework dispatch may handle this first) |
| 408 | Body read timeout |
| 413 / 415 | Body exceeds 16,384 bytes; wrong content type or unsupported compression |
| 429 | Local per-process backstop exceeded; hosting-level durable quotas remain required |
| 503 | Missing/weak integration key or unavailable mandatory domain source |
| 500 | Safe generic unexpected failure, no stack trace or secret output |

New adapter responses are private/no-store with noindex/nosniff headers. Request bodies are bounded using actual streamed bytes, not only Content-Length. The body deadline is 5 seconds. The local 60 authenticated requests/minute limit is a single-process backstop, **not** a production distributed quota or comprehensive denial-of-service protection.

## Phase 2 funding extension — 20 September 2026

See [funding contracts and operations](../funding/CONTRACT_AND_OPERATIONS.md). The shared envelope remains version 1.0.0; the capability registry adds a new ID, the funding rules are independently versioned and the pricing request/response semantics are unchanged. Strict consumers of the capability-name enumeration must refresh their schemas before opting into the new route. No external-client compatibility has been assumed or tested.

Funding accepts structured enum fields, preserves unknowns, returns `qualification`, and always leaves award/approval unknown. Published programme caps are evidence text, never calculated awards. The guide directory now has 18 records. Existing foundation evidence is historical and must not be presented as a full Phase 2 build or browser test.
