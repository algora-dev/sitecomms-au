# SiteComms Australia — Launch Readiness Change Log

Date: 25 September 2026
Baseline: agent-verified Phase 4 schools-comparison archive.

## Scope

This pass is launch plumbing and QA only. It does not redesign the site, change approved pricing arithmetic, alter funding/finance matching rules, change the school comparison rankings/content, or change the SiteComms enquiry-routing model.

## Changes

- Added one server-side production indexing gate: `SITE_INDEXING_ENABLED`.
- Preview/staging remains blocked by robots, metadata and `X-Robots-Tag` when the gate is false.
- Production public pages become index/follow when the gate is true.
- Public `robots.txt` advertises `/sitemap.xml` and keeps `/api/` out of crawling.
- Separated search discovery from model-training crawling with `SITE_ALLOW_MODEL_TRAINING`; conservative default is false.
- Added an explicit OAI-SearchBot allow rule on launched builds and a GPTBot disallow rule unless model-training crawling is explicitly enabled.
- Kept `/integrations` explicitly noindex and removed it from the public sitemap until an external integration is actually validated.
- Kept API responses noindex even when the public site is launched.
- Added the missing public IndexNow verification-key file required by the existing submission script.
- Added `npm run test:launch`, a dependency-light static launch audit covering indexing controls, key sitemap routes, the IndexNow key, literal internal links and known NZ-contamination boundaries.
- Updated `.env.example`, README and the current agent handoff.

## Preserved

Existing visual styling/assets, canonical SiteComms URL, all public content, pricing model, funding catalogue and checker logic, finance logic, school comparison content, aged-care content, state context, enquiry backend, privacy operator details, API capability defaults and lockfile dependency versions are preserved.

## Release boundary

The source is prepared for production indexing but does not deploy itself. The hosting agent must run the full dependency-backed test/typecheck/lint/build sequence and browser QA. Only the production build should receive `SITE_INDEXING_ENABLED=true`; staging should remain false and access-controlled.
