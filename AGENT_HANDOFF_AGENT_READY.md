# Agent handoff — SiteComms Australia Agent-Ready Foundation

Use **this complete directory-preserving source tree** as the next working baseline, replacing the earlier Phase 1 source after review. This is implemented code, not only a proposal. Keep the supplied design/theme/assets, existing Australian content and pricing assumptions. No deployment, real email, database mutation or indexing change is authorised by this package.

Start with `SITECOMMS_AU_AGENT_READY_CHANGELOG.md`, then `docs/agent-ready/PROFILE_AND_PLAN.md`, `CONTRACTS.md`, `OPERATIONS.md` and `VALIDATION.md`. The supplied standard is retained verbatim at `docs/agent-ready/STANDARD_0.1.0.md`. Historical Phase 1 documents are reference history, not instructions to restore superseded logging behaviour.

## Required review/build gate

```sh
npm ci
npm test
npm run typecheck:agent-ready
npx tsc --noEmit
npm run lint
npm run build
```

Use the existing lockfile and package versions. Dependencies were **not** changed in this iteration. `npm ci` failed in the review environment with npm-registry DNS errors; full Next/ESLint/tsx were not installed. Tests were executed using real installed TypeScript with a documented local loader, not mocked framework modules. The dependency-light core passed strict type-checking; this is **not** full React/Next validation. Do not disable errors, downgrade the framework or regenerate a lockfile to conceal this environment limitation.

After installing, read the version-matched framework guidance referenced in `AGENTS.md`. Fix any real integration/build errors narrowly, preserving arithmetic and contracts. Keep `.env.example` as a template only; never place credentials in an exported ZIP.

## Behaviour to preserve

- Calculator arithmetic/rates and 80–100% range remain unchanged. Source date 17 September 2026 is inherited, not newly verified. Pricing stays provisional and excluding GST, not a quote or market average.
- One pricing handler serves the human calculator, presets, school bands, care example and optional HTTP assessment. Full input validation; no missing-to-zero or incomplete URL default merge.
- State selection is context only; all eight states/territories retain identical arithmetic for identical inputs.
- Public guide filtering and search share the same 12-record directory. It is not whole-site AI semantic search.
- No model calls, MCP, WebMCP or automatic external submission. HTTP testing routes are **off by default** and require a server-only key. Never put the key in a browser bundle or enable them merely to claim agent support.
- The previous automatic assessment/PDF storage route is retired (410). Its browser call is removed. No historical Supabase data was touched. Do not restore it from Phase 1 or test it expecting new stored PDFs.
- SiteComms receives reviewed enquiries and replies to the customer with public provider contact details. It does not forward their data to providers.
- All existing preview/noindex controls remain. Enabling indexing is a separate business release decision.

## Preview browser checklist

1. Check desktop/mobile layout, original logo/theme, guide cards/search, keyboard focus, skip link, modal scrolling and close/focus behaviour. Clear search restores all ordinary guide links; no chat or sign-in is required.
2. Run ordinary and aged-care pricing journeys. Test zero-area start, each tier/package, optional controls/monitoring, >30 endpoints and review/back/restart. Changing state must not change computed money. Source/default details and critical exclusions must remain readable.
3. Open a valid old saved `cfg` link and the new canonical link. Test truncated/malformed/oversized config and missing fields: no saved price or silently filled-in amounts; show correction guidance. Confirm URL/state/industry persistence and hydration.
4. Export a small and large estimate PDF in the actual browser. Check every page for overflow, totals, monitoring separation, source/rule dates, estimate label, exclusions and warnings. PDF rendering was **not exercised in the review environment**.
5. Open the enquiry form, inspect attached context, edit ordinary fields and cancel. No request should be sent on cancellation, pricing view or PDF download. Only perform a separately authorised controlled submission to a test inbox; no provider forwarding or real customer records.
6. Confirm `/integrations` accurately describes foundation-only status. Inspect the noindex/canonical/sitemap behaviour. A guide route/source update must appear consistently after a build/deploy; static pages do not refresh merely because time has passed.

## Optional HTTP staging test — separate from ordinary deployment

Leave the flag false for the default handoff. If the owner authorises a server-to-server test, first apply HTTPS, a strong server-held key, durable hosting/WAF quotas and controlled preview access. Then use `CONTRACTS.md` and `tests/agent-ready/example-request.json`.

Verify disabled/auth/bad-input paths, source unavailability, output parity with the same human configuration, no-store headers, actual proxy/body limits and redacted logs. The local per-process limit is only a backstop. Do not claim a named external agent, MCP protocol or browser tool was tested unless it genuinely was. Record client/version/environment/evidence before any such claim.

## Return after integration

Return commands/results, preview findings and narrowly scoped fixes. If creating another ZIP, preserve every relative path and include source, public assets, lockfile, tests, sanitised template and documentation. Exclude dependency folders, build/cache output, `.git`, production data, real `.env` files and secrets.

After this foundation is reviewed, continue with the dedicated funding research and then finance research. No new funding/finance eligibility has been encoded here.
