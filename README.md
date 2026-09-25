# SiteComms Australia

Australian research, education, planning and reviewed-enquiry resource for PA, IP paging, school bells, intercom and communications systems.

## Current baseline — Launch-ready candidate (25 September 2026)

**Start with `AGENT_HANDOFF_LAUNCH_READY.md`.** This is the complete project built on the agent-verified Phase 4 schools-comparison ZIP. All current launch instructions and validation notes are inside this archive.

The content/tool baseline includes school planning and comparison, indicative AUD pricing, simplified state-aware funding pathways, state-aware finance guidance, aged-care planning content, Australian system guides, state context and the reviewed SiteComms enquiry workflow.

## Controlled indexing

Indexing is now governed by one server-side build setting:

```sh
SITE_INDEXING_ENABLED=false   # preview/staging
SITE_INDEXING_ENABLED=true    # production launch after QA
```

When false, robots, page metadata and the global `X-Robots-Tag` all block indexing. When true, ordinary public pages become crawlable and indexable, `/robots.txt` advertises the sitemap, and API responses remain noindex. The `/integrations` status page remains explicitly noindex for this release.

Search discovery and model-training crawling are deliberately separate. `SITE_ALLOW_MODEL_TRAINING=false` is the conservative default; the launched robots policy still allows OAI-SearchBot while GPTBot remains blocked. Change that only as an explicit owner policy decision.

**The production environment variable must be present during the production build.** Do not set it to true on a publicly reachable staging site.

## Main routes

- `/schools` and `/compare/schools`: school planning and Australian system comparison.
- `/pricing-tool`, `/pricing`: shared indicative AUD planning model.
- `/tools/funding-check`, `/funding`: state-aware funding-pathway research.
- `/tools/finance-check`, `/financing`: state-aware indicative finance guidance.
- `/industries/aged-care-retirement-villages`: aged-care communications planning.
- `/systems`, `/guides`, `/states`: supporting research and planning content.
- `/contact`: ordinary reviewed enquiry route.

## Required release checks

```sh
npm ci
npm test
npm run test:launch
npm run typecheck:schools-compare
npm run typecheck:finance
npm run typecheck:funding
npm run typecheck:agent-ready
npx tsc --noEmit
npm run lint
npm run build
```

Then preview the key human journeys on mobile and desktop before the production build. Use a test inbox for enquiry-delivery tests.

After the production build with `SITE_INDEXING_ENABLED=true`, verify `/robots.txt`, `/sitemap.xml`, representative page source/headers, canonical URLs and live enquiries before requesting indexing.

## Current documentation

- `AGENT_HANDOFF_LAUNCH_READY.md`: production/staging instructions and launch checklist.
- `SITECOMMS_AU_LAUNCH_READINESS_CHANGELOG.md`: what changed in this pass.
- `docs/launch/VALIDATION.md`: checks completed here and remaining host-side gates.
- `AGENT_HANDOFF_PHASE_4_SCHOOLS_COMPARE.md` and prior handoffs: historical implementation evidence.

Earlier handoffs must not be used to restore old pricing storage, the funding holding page, the pre-simplification funding questionnaire, old finance wording or the old school comparison.

## Post-launch work

Improve the aged-care comparison, add further Australian verticals and verified local installation evidence, and use real search/enquiry data to guide content expansion. Do not mass-produce near-duplicate location pages.
