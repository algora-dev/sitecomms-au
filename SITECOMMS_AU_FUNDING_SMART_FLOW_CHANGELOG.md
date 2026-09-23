# SiteComms Australia — Funding Checker Smart Flow Redesign

Date: 20 September 2026

## Purpose

This update simplifies only the funding-checker experience while preserving the researched Australian funding catalogue and Agent-Ready architecture.

The public flow now follows the same basic philosophy as SmartComms NZ: ask the visitor only for facts they are likely to know, let them describe what they want the communications system to do, and keep funding-programme complexity behind the tool.

## New public flow

The checker now asks:

1. State or territory
2. Site type
3. Who owns/runs the site or would apply
4. Project stage
5. Communications features required (multi-select)

The previous public `What is this project?` dropdown has been removed.

### Feature choices

Visitors can select any combination of:

- Bells and scheduled tones
- Live announcements and zoned paging
- Emergency / lockdown messages
- Two-way room / intercom communication
- Entry / door intercom
- Outdoor paging / wider-site coverage
- Visual alerts or hearing-access support
- Replace or expand an existing system
- Staff paging / help points / care-area communication
- General communications upgrade / not sure yet

The user does not need to know whether a funder would classify the project as capital works, accessibility, minor works, procurement or another administrative category.

## Internal logic

The detailed `project_focus` field remains in the structured contract for backwards compatibility and controlled/expert integrations, but it is no longer a public form question.

For the public flow:

- ordinary selected communications functions derive `project_focus = communications`;
- selecting `Visual alerts or hearing-access support` derives `project_focus = accessibility`, allowing the researched specialist accessibility routes to surface;
- detailed programme-specific conditions remain follow-up checks rather than initial questionnaire blockers.

The funding catalogue, official sources, programme status/deadline handling, applicant restrictions, retrospective-cost safeguards, source freshness and no-award/no-approval rules are unchanged.

## Result redesign

The result now leads with one direct answer:

- `Yes — there are funding avenues worth checking.`
- `There may be a funding avenue for this project.`
- `No clear current funding avenue was identified.`

The primary result shows:

- relevant funding avenue name;
- why it may fit;
- simplest next step;
- direct official-source button;
- `Ask SiteComms for help` button.

Programme mechanics, conditions, review dates and detailed evidence are behind `More details and evidence`.

Closed, monitoring-only, repayable or non-matching routes remain in a collapsed `Other reviewed routes` section.

The result summary also shows the selected communications features so the visitor can immediately see what the assessment was based on.

## Agent-Ready changes

`features` is now a first-class array in the shared funding assessment contract.

The public flow requires:

- state;
- site type;
- applicant/owner type;
- stage;
- at least one communications feature.

The shared handler derives the internal project classification before applying the existing pathway rules. The HTTP capability schema has been updated from the same source definition.

No second funding engine or UI-only eligibility formula was added.

## Files changed

- `src/app/tools/funding-check/FundingCheckTool.tsx`
- `src/components/funding/FundingPathwayCard.tsx`
- `src/app/tools/funding-check/page.tsx`
- `src/lib/funding/questions.ts`
- `src/lib/funding/assessment.ts`
- `src/lib/funding/types.ts`
- `scripts/test-funding.mjs`

## Validation completed here

- Funding-domain TypeScript check passed with `tsc --project tsconfig.funding.json --noEmit`.
- Changed TSX files passed TypeScript syntax transpilation checks.
- Static review confirms the public checker no longer renders the `project_focus` selector.
- The existing funding regression script was updated for the new required `features` contract and for feature-to-internal-classification checks.

The uploaded project excludes `node_modules`, so the full dependency-backed Next.js test/build suite was not run in this environment.

## Agent deployment handoff

Use this ZIP as the new working baseline.

Before deployment:

1. Install dependencies using the existing lockfile.
2. Run `npm test`.
3. Run `npm run typecheck:funding` and the normal project typecheck/lint/build checks used by the hosting environment.
4. Preview `/tools/funding-check` on desktop and mobile.
5. Test at least one representative journey for QLD, NSW, VIC, WA and SA.
6. Verify that selecting visual/hearing-access support can surface specialist accessibility routes without asserting final eligibility.
7. Verify ordinary bells/paging/emergency/intercom choices remain ordinary communications scope.
8. Confirm official-source buttons open the expected programme pages.
9. Confirm `Ask SiteComms for help` carries state, site, stage, selected features and shortlisted pathways into the reviewed enquiry flow without automatically submitting anything.
10. Do not restore the removed `What is this project?` public question unless a later evidence-backed requirement genuinely needs it.

## Preserved boundaries

This update does not:

- determine final grant eligibility;
- calculate or promise a grant award;
- predict approval;
- submit a grant application;
- automatically submit an enquiry;
- change pricing or finance logic;
- change the researched funding catalogue or official-source evidence;
- change the overall SiteComms design system;
- enable indexing or deploy the site.
