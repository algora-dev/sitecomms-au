# Agent handoff — SiteComms Australia Phase 1

> Historical handoff. The current source baseline is Phase 2 funding, 20 September 2026. Follow `AGENT_HANDOFF_PHASE_2_FUNDING.md` for current capabilities, counts and release gates; preserve the earlier safety controls.

> Historical Phase 1 handoff. The current instructions are in `AGENT_HANDOFF_AGENT_READY.md`. In particular, automatic pricing-output storage has been retired; do not restore or exercise the superseded logging instructions below.

Use this complete directory-preserving project as the Phase 1 working baseline. Preserve the content, evidence qualifications, AUD model, design system and enquiry privacy model. Do not merge back the older flattened ZIP or replace the new comparison with the previous ranked shortlist.

## Review/build gate

This environment could not resolve `registry.npmjs.org`; `npm ci` did not finish and `next build` could not start because Next was not installed. The regression scripts passed through a real TypeScript transpilation loader, but that is not a Next.js build or a React browser test.

From the project root in your normal trusted development environment:

```sh
npm ci
npm test
npm run lint
npm run build
```

Use the committed lockfile and existing package versions. Do not downgrade the framework or change dependencies merely to work around a review-environment network problem. Read the version-matched Next.js documentation installed with the project, as requested in `AGENTS.md`.

Run your normal full TypeScript/framework checks as well. Resolve genuine errors rather than disabling checks. Test a preview deployment before any production release.

## Browser acceptance

Check desktop and narrow mobile widths, keyboard navigation and browser refresh:

- Header logo, optional state selector, mobile-menu scrolling, focus visibility and skip link.
- National first visit; set QLD; open pricing/finance/enquiry; refresh; change to NT; clear the selection. Explicit `?state=WA` overrides a saved preference, `?state=AU` clears it and invalid state values are ignored. State persistence is intentionally browser-local, not account-based.
- Blocked local storage must still allow a selection within the current page session. Hydration must not produce console errors.
- Aged-care `industry`, estimate and pricing `cfg` parameters survive state-aware links. Changing state must not alter the AUD arithmetic.
- `/compare`: tables scroll on small screens; profile/section links and source details work.
- `/states`, `/guides/school-pa-paging-requirements`, `/guides/compare-pa-system-quotes` render, with correct canonical URLs and review dates.
- Funding selection must not display grant matches or an eligibility result in this phase. Finance public-entity answers must show the authority-first guardrail, even for a known large budget.
- Submit a controlled test project enquiry with a valid state to your test inbox; check email includes the state and does not forward to any provider. Test generic contact, validation errors and attachment boundaries separately. Do not use real resident/patient records for testing.
- Exercise pricing PDF output/logging against a test Supabase project if configured. New timestamp text is UTC; the existing `created_nz` column name is deliberately retained. Historical rows have not been rewritten. Check downstream exports/reports before production.

## Preserve preview mode

Do not remove the preview/noindex gates in `src/app/layout.tsx`, `src/lib/seo.ts` or `src/app/robots.ts` in this phase. This is not authorisation to launch indexing. At launch, review all three consistently, along with canonical URLs and the sitemap. Robots/noindex are not access control; use hosting-level protection if the preview must be private.

## Environment and export

Keep production secrets in the hosting environment, not this ZIP. Reuse the existing environment-variable names and controlled destination inbox. No new credentials or third-party account integration are needed for the state preference.

The archive excludes `node_modules`, `.next`, `.git`, caches, logs from dependency installation and secret environment files. Source, original assets, lockfile, tests, documentation and routes are included.

Return the validation outcome and any narrowly scoped fixes. Keep funding implementation and deeper finance research for their separate phases. If you return another source ZIP, archive recursively from the project root and preserve all relative paths.
