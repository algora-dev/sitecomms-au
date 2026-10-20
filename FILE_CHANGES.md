# SiteComms AU — SEO & Conversion Implementation

**Implementation date:** 20 October 2026  
**Working baseline:** supplied `sitecomms-au-audit-handoff-2026-10-20-547eb16` source tree  
**Purpose:** increase qualified Australian organic discovery and make the path from useful content/tool result to a confidential SiteComms enquiry materially simpler.

## Outcome in one sentence

The knowledge base and calculator logic remain intact; the conversion layer is now result-first, quieter and explicit about the service: SiteComms personally reviews the submitted project, may reply with suitable providers' public contact details and reasons, does not forward the user's enquiry/contact/tool information to those providers, and leaves the decision to contact anyone entirely with the user.

## Business behaviour preserved

- SiteComms is the recipient/reviewer of the project enquiry.
- Installer, supplier, finance-provider and other project-party recommendations are sent **back to the customer** as public contact details / suggested next steps.
- Customer enquiry content, contact details, attachments and tool answers are **not forwarded to recommended project parties**.
- The customer decides whether to contact anyone SiteComms suggests.
- Existing privacy disclosures for infrastructure/service processors remain unchanged; the front-end wording does not make a false claim that no technical processor can ever handle data on SiteComms' behalf.
- No live enquiry was sent during this implementation.

## What changed

### 1. Conversion measurement

**`src/lib/analytics.ts`**

- Existing `track()` calls still send structured, non-PII payloads to GA4 when configured.
- The same event **name only** is now sent to Microsoft Clarity via `window.clarity("event", eventName)` when Clarity is available.
- Clarity deliberately receives no analytics payload/context, reducing the chance of sending personal or overly granular project data to the analytics vendor.

**New/important funnel events now available:**

Pricing:
- `pricing_tool_started`
- `pricing_completed`
- `pricing_connect_opened`
- `pricing_result_details_opened`
- `project_help_form_started`
- `project_help_submitted`

Funding:
- `funding_tool_started`
- `funding_check_completed`
- `funding_result_details_opened`
- `project_help_opened`
- `project_help_form_started`
- `project_help_submitted`

Finance:
- `finance_tool_started`
- `finance_check_completed`
- `finance_help_opened`
- `finance_result_details_opened`
- `project_help_form_started`
- `project_help_submitted`

The funding checker previously lacked equivalent funnel tracking; it now emits start/completion/detail events.

### 2. Enquiry experience

**`src/components/enquiry/ProjectEnquiryModal.tsx`**

The modal was reorganised around the lowest-friction information SiteComms actually needs to reply.

Visible project fields:
- name
- email
- organisation / school
- town / region
- state / territory

Moved behind **“Add more project details — optional”**:
- phone
- brand preference
- existing installer / IT provider / consultant relationship
- provider name
- extra project note
- attachments

Other changes:
- tool/page context is carried into the submission and shown under a compact disclosure rather than forcing the user to retype it;
- tool-originated enquiries no longer show a redundant generic “What help do you need?” choice when the source already establishes the intent;
- mode-specific headings now say things such as **“Send your estimate to SiteComms”**, **“Send your funding result to SiteComms”** and **“Send your finance result to SiteComms”**;
- the modal clearly explains that SiteComms reviews the request itself, can reply with public provider contacts and reasoning, does not forward the enquiry/tool information to those providers, and leaves contact entirely to the customer;
- success copy reinforces the same process;
- `project_help_form_started` and `project_help_optional_details_opened` events were added;
- focus trapping includes expandable `<summary>` controls.

**`src/components/pricing/InquiryModal.tsx`**

- The main pricing-result connection flow now uses `quote_help`, so the enquiry correctly says the estimate/context are already included.

**`src/app/contact/page.tsx`**

- Project-help copy now explains the SiteComms review / recommendation process and no-provider-forwarding behaviour.

### 3. Pricing result simplification

**`src/components/pricing/ResultView.tsx`**

No pricing formula, rate, classification or scope logic was changed.

The result page now prioritises:

1. **ballpark installed price**;
2. one short planning caveat;
3. **“Send this estimate to SiteComms”** as the dominant next action;
4. a concise explanation of what SiteComms does next and that the project information is not sent to providers;
5. only material warnings that can change interpretation of the result.

The previous long first-screen presentation has been moved under **“See the full estimate details”**, including:
- configuration summary;
- included scope;
- recurring monitoring assumption where applicable;
- factors that may change final price;
- itemised cost breakdown;
- assumptions, unresolved inputs and methodology/source information.

PDF download, change answers and restart remain available.

The previous duplicate/competing quote/site-assessment conversion panels were removed. There is now one primary project-help action.

### 4. Funding result simplification

**`src/app/tools/funding-check/FundingCheckTool.tsx`**

No funding catalogue, eligibility/qualification rule, applicant distinction, date rule or award semantics were changed.

Result hierarchy is now:

1. **Your funding result** / concise interpretation;
2. project/state/stage summary;
3. **“Send this result to SiteComms”**;
4. short confidentiality / next-step explanation;
5. **“See funding pathways and official sources”** disclosure;
6. secondary route/caveat/source detail inside the expanded result;
7. quiet cross-sell to other project-planning paths below.

### 5. Finance result simplification

**`src/app/tools/finance-check/FinanceCheckTool.tsx`**

No finance classification/assessment logic or question logic was changed.

Result hierarchy is now:

1. **Your finance-check result**;
2. concise result explanation;
3. **“Send this result to SiteComms”**;
4. short SiteComms review / provider-privacy explanation;
5. **“See why you got this result”** disclosure containing answers, reasons and evidence;
6. school funding path and other planning paths below as secondary actions.

The result/step viewport behaviour now scrolls to the active tool/result rather than forcing the whole document to page-top.

**`src/app/tools/finance-check/page.tsx`**

- The page now server-renders a meaningful H1 and introduction before the client tool/Suspense boundary, improving initial crawlability and making the page useful even before the client component hydrates.

### 6. Cross-sell hierarchy

**`src/components/tool-cross-sell.tsx`**

- Funding/finance links no longer visually compete with the primary SiteComms enquiry immediately after a pricing result.
- Secondary routes now live in quiet disclosures such as **“Not ready for provider help? Explore funding or finance”** and **“Other ways to progress the project”**.
- Existing tracking is retained.

### 7. Homepage conversion proposition

**`src/components/home/sitecomms-hero.tsx`**

- Hero description now explains that SiteComms can review the project and suggest suitable providers for the visitor to contact.
- Primary **Estimate your system** action remains unchanged.
- Secondary action now points to **How SiteComms helps**, rather than adding another competing research route.

**`src/app/page.tsx`**

- Added/strengthened an **Independent next-step help** section explaining the SiteComms process.
- Makes clear that recommendations go back to the user, providers do not receive the enquiry/tool information from SiteComms, and the user decides whether to contact anyone.
- Homepage metadata description was tightened around independent Australian decision support and confidential project help.

### 8. Stronger expertise/review signals

**`src/components/content/AuthorityHero.tsx`**

- Added an optional visible reviewer field.

Reviewer information is now surfaced where applied as:
- **Reviewed by Shaun Carter, Editor**
- linked to the methodology/about context.

It is also reflected in article structured data where added.

### 9. School bell / timer “super article”

**`src/app/systems/school-bell-announcements/page.tsx`**

This was the principal SEO-content investment because the supplied Search Console data already showed relevant school-bell queries close to page-one territory.

The page now starts with a direct buyer decision framework:
- timer/control-only upgrade;
- retained-infrastructure / hybrid modernisation;
- integrated PA + bell system;
- wider integrated IP communications system.

It then covers concrete buyer/workflow questions including:
- normal and alternate timetables;
- term and holiday exceptions;
- exam/event zone changes;
- temporary/wet-weather schedules;
- manual triggers;
- selected-zone announcements;
- retaining suitable existing speakers/amplifiers/cabling after inspection/testing;
- bell + daily paging design;
- emergency/lockdown scope boundaries;
- Australian planning considerations;
- cost/scoping path;
- specification checklist;
- direct SiteComms project-help path.

Current/re-checked external examples/reference links used in the guide:
- Victorian School Building Authority technical specifications;
- NSW EFSG 2026;
- BellTimer / Sandman;
- FrontRow Conductor;
- Jacques school communications;
- Masters Voice Q-SYS school deployments.

These are explicitly presented as examples of different approaches, **not** as SiteComms endorsements, rankings or partnership claims.

The title/H1 were tightened around the Search Console intent:
- metadata: **School Bell Systems & Timers Australia**
- H1: **School Bell Systems, Timers & Daily Announcements**

### 10. School hub / internal relevance

**`src/app/schools/page.tsx`**

- H1 now leads with **School PA** before paging/bells/intercom to better match observed qualified search intent.
- Intro explains that a modern school PA can combine paging, automated bells, scheduled announcements and related functions.
- Bell/timer guide is more prominent in onward planning.
- Reviewer/schema data added.

### 11. Generic systems intent cleanup

**`src/app/systems/page.tsx`**

- Generic wording now says **IP Audio Paging / Public Address** more explicitly.
- This is intended to help distinguish SiteComms from radio-pager/transmitter intent that appeared in Search Console but does not represent the desired buyer.

### 12. School comparison usability

**`src/app/compare/schools/page.tsx`**

The existing eight-profile evidence registry and dated comparison source model were intentionally preserved.

- Upper-page copy now starts with scenario/architecture selection rather than assuming a brand-first decision.
- Bell/timer-only users are sent to the bell guide before being encouraged to compare full platforms.
- Visible reviewer/schema data added.
- Next-step copy now explicitly describes the SiteComms reviewed recommendation process and preserves the established **“we do not automatically forward your enquiry”** rule.

No new platform was silently promoted into the comparison registry and no “winner” was manufactured.

### 13. Small quality fixes

**`src/app/about/page.tsx`**
- “Australia guidance” → “Australian guidance”.
- “a Australia information” → “an Australian information”.

**`src/app/industries/aged-care-retirement-villages/page.tsx`**
- corrected “a aged-care-home” grammar.

**`src/lib/content-meta.ts`**

Review dates updated to 20 October 2026 only for pages materially reviewed/changed in this implementation:
- `/schools`
- `/systems`
- `/systems/school-bell-announcements`
- `/pricing-tool`
- `/tools/funding-check`
- `/tools/finance-check`

`/compare/schools` retains its existing comparison-source review snapshot date because the underlying shared evidence registry was deliberately not re-baselined.

## Files changed

19 existing source files were modified. No dependencies or lockfile entries were changed.

- `src/app/about/page.tsx`
- `src/app/compare/schools/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/industries/aged-care-retirement-villages/page.tsx`
- `src/app/page.tsx`
- `src/app/schools/page.tsx`
- `src/app/systems/page.tsx`
- `src/app/systems/school-bell-announcements/page.tsx`
- `src/app/tools/finance-check/FinanceCheckTool.tsx`
- `src/app/tools/finance-check/page.tsx`
- `src/app/tools/funding-check/FundingCheckTool.tsx`
- `src/components/content/AuthorityHero.tsx`
- `src/components/enquiry/ProjectEnquiryModal.tsx`
- `src/components/home/sitecomms-hero.tsx`
- `src/components/pricing/InquiryModal.tsx`
- `src/components/pricing/ResultView.tsx`
- `src/components/tool-cross-sell.tsx`
- `src/lib/analytics.ts`
- `src/lib/content-meta.ts`

## Explicitly unchanged / preserved

- pricing rates, formulas, 80–100% range logic and scope/classification checks;
- funding catalogue/rules/source dates/no-award semantics;
- finance decision/classification logic;
- school comparison eight-profile registry/source snapshot;
- API enquiry routing semantics;
- permanent redirects and URL architecture;
- sitemap architecture;
- production/preview indexing gates and noindex behaviour;
- optional HTTP capability enablement defaults;
- package dependencies and lockfile;
- no live enquiry sending was performed.

## Validation completed in this review environment

Because the environment cannot retrieve npm packages from the registry and the project currently has no installed `node_modules`, a normal framework installation/build could not be completed here. The repository's deterministic logic/static suites were instead run with the available installed TypeScript loader, without mocking the project domain logic.

**Passed:**

- pricing tests — all assertions passed;
- finance tests — state-aware evidence/governance guardrails passed;
- aged-care tests — 7 profiles, 6 use-case rows, 20 sources;
- state tests — all eight jurisdictions plus storage/query/hash rules;
- content tests — 8 school profiles, 6 use cases, 26 school comparison sources;
- static site audit — 103 TS/TSX files parsed/transpiled, 294 local imports, 286 literal internal links, 37 routes, 34 sitemap entries;
- Agent-Ready — 62 named test groups and 70 captured pricing fixtures;
- funding — 77 named groups and exhaustive 960 state/site/applicant cases;
- school comparison — 18 guardrail groups, 8 profiles, 26 sources, five state reference records;
- launch-readiness — 37 public page routes / 103 TS/TSX files;
- preview/noindex source guardrails preserved.

## Checks that remain mandatory in a normal install/deployment environment

The deploying agent should **not** interpret the passing static/domain checks above as a Next.js production build.

Run, in order:

```sh
npm ci
# Per AGENTS.md, then read the installed/version-matched guidance under:
# node_modules/next/dist/docs/

npm test
npm run typecheck:finance
npm run typecheck:funding
npm run typecheck:agent-ready
npm run typecheck:schools-compare
npx tsc --noEmit
npm run lint
npm run build
npm run test:launch
```

Then preview on desktop and mobile before deployment:

1. pricing tool: complete an ordinary and large project, open/close full details, download PDF, edit/restart, open enquiry;
2. funding checker: complete a representative result, open detailed pathways, open enquiry;
3. finance checker: complete a representative result, open “why” detail, open enquiry;
4. enquiry modal: keyboard/focus/scroll behaviour, required five fields, optional disclosure, attachments and cancellation;
5. confirm tool context is visible in the enquiry but the user is not asked to restate it;
6. perform only an owner-authorised test submission to a controlled SiteComms inbox; verify no provider receives anything;
7. verify Clarity custom events are appearing and build the three funnels below;
8. inspect `/systems/school-bell-announcements`, `/schools` and `/compare/schools` on mobile for tables/cards/disclosures;
9. verify production indexing controls separately before any launch/indexing change.

## Recommended Clarity funnels after deployment

### Pricing
`pricing_tool_started` → `pricing_completed` → `pricing_connect_opened` / `project_help_opened` → `project_help_form_started` → `project_help_submitted`

### Funding
`funding_tool_started` → `funding_check_completed` → `project_help_opened` → `project_help_form_started` → `project_help_submitted`

### Finance
`finance_tool_started` → `finance_check_completed` → `finance_help_opened` / `project_help_opened` → `project_help_form_started` → `project_help_submitted`

Watch the ratio of completed-tool users who open an enquiry and, separately, enquiry opens/form starts that become submissions. Those two numbers will tell us whether the next iteration belongs in the tool result or in the form itself.

## SEO measurement after deployment

Do not judge the release on raw traffic alone. Compare:

- relevant organic impressions/clicks for school PA / school bell / timer / announcement terms;
- `/systems/school-bell-announcements` position and CTR for the existing near-page-one bell queries;
- `/schools` query mix, especially school-PA intent;
- `/compare/schools` clicks and Search/AI-feature visibility;
- irrelevant generic radio-paging/transmitter impressions;
- organic session → tool completion → enquiry submission rate.

The supplied Search Console dataset is young, so avoid broad title/content changes elsewhere until additional query data accumulates.

## Deployment authority

This package is code for review/installation. It has **not** been deployed and does not authorise:
- production deployment;
- changing indexing flags;
- changing source approvals;
- enabling optional external/API capabilities;
- sending a real customer enquiry during QA without owner approval.
