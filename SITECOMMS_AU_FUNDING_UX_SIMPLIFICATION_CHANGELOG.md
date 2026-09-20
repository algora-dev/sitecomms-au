# SiteComms Australia — Funding Tool UX Simplification

Date: 20 September 2026

## Scope

This update changes the funding checker only. It preserves the researched funding catalogue, official-source records, Agent-Ready foundation, existing design system, pricing logic, finance logic, comparison content, enquiry model, and preview/no-index posture.

## User experience changes

The public checker now asks only five high-value questions:

1. State or territory
2. Site type
3. Who owns/runs the site or would apply
4. Project type
5. Project stage

The previous third step of funder-specific detail questions has been removed from the public flow. Those details remain in the underlying funding model as conditions to verify after a plausible pathway is identified.

The form is now two short steps rather than three.

Site, applicant, project and stage option lists shown to users have been reduced and grouped to avoid overwhelming visitors. The underlying contract still retains the more detailed values for structured integrations and future expert workflows.

## Result changes

The result now leads with one clear outcome:

- Yes — a funding pathway may be worth pursuing
- Possibly — a pathway needs a quick eligibility/status check
- No clear active pathway identified in the reviewed catalogue

The primary result area then shows only the relevant routes, with:

- why the route may fit;
- the simplest next step;
- a direct official-source link.

Detailed official evidence, conditions, review dates and caveats are available in expandable sections rather than occupying the primary result.

Closed rounds, monitoring-only routes, repayable loans and routes outside the basic match are grouped under one collapsed “Other reviewed routes” section.

The general limitations/disclaimer material is also collapsed.

The SiteComms enquiry CTA has been simplified and moved into the main result journey.

## Funding logic adjustment

Unknown funder-specific detail fields no longer automatically demote an otherwise plausible pathway during the initial public shortlist.

This is deliberate: the public checker is now a pathway-finding tool, not a grant-application form.

Required fields still drive the initial match:
- state;
- site type;
- applicant/owner type;
- project focus;
- stage.

Explicitly supplied conflicting or restrictive detail values still affect the assessment. Programme status, source freshness, closed dates, invitation-only status, retrospective restrictions, and unsupported applicant/site combinations remain enforced.

The tool still never:
- decides formal eligibility;
- calculates an award;
- predicts approval;
- submits an application;
- automatically sends an enquiry;
- deducts speculative funding from a project price.

## Files changed

- `src/app/tools/funding-check/FundingCheckTool.tsx`
- `src/components/funding/FundingPathwayCard.tsx`
- `src/app/tools/funding-check/page.tsx`
- `src/lib/funding/questions.ts`
- `src/lib/funding/assessment.ts`
- `scripts/test-funding.mjs`

## Validation

Source-level review completed for the changed funding files.

A regression fixture was added to confirm that unknown optional/funder-specific detail fields can remain follow-up conditions without blocking the initial shortlist.

The funding test also now checks that the public UI:
- is two steps;
- invokes the shared `assessFundingPathways` handler;
- does not fetch an ad-hoc alternative result;
- does not render `relevantDetailFields` as a public questionnaire;
- includes the five simplified decisions.

A complete project typecheck/test run could not be executed in this sandbox because the uploaded project intentionally excludes `node_modules`, and the required local type packages/test runner are therefore not present. The hosting agent should run the existing lockfile installation and normal project test/build commands before deployment.

## Agent handoff

Use this ZIP as the new working baseline.

Before deployment:

1. Install dependencies from the existing lockfile.
2. Run `npm test`.
3. Run the project typecheck/lint/build commands.
4. Preview `/tools/funding-check` on desktop and mobile.
5. Test representative QLD, NSW, VIC, WA and SA journeys.
6. Confirm the primary result is immediately understandable without opening any expandable sections.
7. Confirm official source links open the intended programme pages.
8. Confirm the SiteComms enquiry CTA carries the funding context but does not submit automatically.
9. Do not reintroduce the removed detail-question step unless a specific researched pathway proves it is essential to the initial shortlist.
