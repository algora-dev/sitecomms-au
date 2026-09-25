# START HERE — SiteComms Australia Launch-Ready Candidate

Date: 25 September 2026
Input baseline: `sitecomms-au-phase-4-schools-compare-verified-2026-09-25.zip`.

This archive is the complete project. No separate supporting download is required.

## What changed

Launch/indexing protection is no longer hard-coded in four independent places. It is coordinated by `SITE_INDEXING_ENABLED`:

- `false` (default): robots disallows crawling, metadata is noindex/nofollow, and the global response header is `X-Robots-Tag: noindex, nofollow, noarchive`.
- `true`: ordinary public pages are index/follow, robots allows public crawling and advertises the sitemap, and only API responses retain a noindex header.

The integration-status page stays explicitly noindex and outside the sitemap. Search discovery and model-training crawling have separate policy switches; `SITE_ALLOW_MODEL_TRAINING=false` remains the default.

## Do this on staging first

Keep:

```sh
SITE_INDEXING_ENABLED=false
SITE_ALLOW_MODEL_TRAINING=false
```

Install from the existing lockfile and run:

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

Then browser-test at minimum:

1. Homepage and header/mobile navigation.
2. `/schools` → `/compare/schools` → pricing/funding/finance links.
3. `/pricing-tool` with small/medium/large representative scenarios.
4. `/tools/funding-check` for QLD, NSW, VIC, WA and SA.
5. `/tools/finance-check` for a private organisation and a government school.
6. `/industries/aged-care-retirement-villages`.
7. `/contact` and each major tool's enquiry route using an approved test inbox.
8. Mobile widths around 360/390px plus tablet/desktop.
9. External source links on funding, finance and schools-comparison pages.

Staging must remain protected from public indexing; noindex is not access control.

## Production launch

After staging passes, set in the **production build environment**:

```sh
SITE_INDEXING_ENABLED=true
SITE_ALLOW_MODEL_TRAINING=false
NEXT_PUBLIC_SITE_URL=https://sitecomms.com.au
```

Retain the existing production enquiry/analytics secrets in protected hosting configuration. Rebuild/redeploy; changing the variable after an already-produced static build may not update every metadata/header output.

Verify on the live origin before requesting indexing:

- `GET /robots.txt` allows public crawling, advertises `https://sitecomms.com.au/sitemap.xml`, explicitly allows OAI-SearchBot and blocks GPTBot under the default policy.
- `GET /sitemap.xml` contains the intended public canonical URLs, including `/compare/schools`; it does not contain `/compare` or `/integrations`.
- `curl -I` on representative public pages does **not** return the global noindex header.
- `curl -I /api/business/v1/search` still returns an `X-Robots-Tag` noindex header.
- Page source/metadata on `/`, `/schools`, `/compare/schools`, `/pricing`, `/funding`, `/financing` and the aged-care page is index/follow and canonicalises to the production origin.
- `/integrations` remains noindex.
- `/compare` permanently redirects to `/compare/schools` without a loop.
- Real production enquiries deliver to the configured SiteComms inbox and are not forwarded to providers.
- GA4 loads only if the production measurement ID is configured.

## Search launch

After the live verification:

1. Add/verify the property in Google Search Console and Bing Webmaster Tools as applicable.
2. Submit `https://sitecomms.com.au/sitemap.xml`.
3. Inspect/request indexing for a representative set: `/`, `/schools`, `/compare/schools`, `/systems/ip-paging-pa`, `/pricing`, `/tools/funding-check`, `/financing`, `/industries/aged-care-retirement-villages` and one state funding guide.
4. Use the existing IndexNow script only after the public key file is reachable. Example: `npm run indexnow -- / /schools /compare/schools /pricing /funding /financing`.
5. Do not promise instant indexing or AI citations; measure discovery separately from traffic and enquiries.

## Do not change during launch

Do not simultaneously rewrite pricing, funding, finance or comparison logic. Do not invent Australian SPON supply/support evidence. Do not create mass-produced city/state doorway pages. Do not enable the disabled integration HTTP profile merely because the site is public.

## Rollback

Fast indexing rollback: set `SITE_INDEXING_ENABLED=false`, rebuild and redeploy. That restores robots blocking, noindex metadata and the global noindex header without reverting the content release.

Full code rollback: redeploy the agent-verified Phase 4 baseline.
