# SiteComms Australia

Australian research, education, planning and enquiry resource for IP paging, PA, bell, intercom and integrated communication systems.

## Current baseline — Agent-Ready Foundation (19 September 2026)

Start with [the current handoff](AGENT_HANDOFF_AGENT_READY.md) and [change log](SITECOMMS_AU_AGENT_READY_CHANGELOG.md). This iteration adds a shared, validated pricing/result core, a public guide search and disabled-by-default authenticated HTTP testing routes. It preserves the Phase 1 design, AUD model and noindex status. It does not implement MCP/WebMCP, a chatbot, funding eligibility, finance matching or direct agent enquiry submission.

The former automatic pricing-result/PDF storage call is retired; historical data is untouched. Review [operations](docs/agent-ready/OPERATIONS.md) before restoring any assessment retention. Contracts, evidence and the supplied master standard are in `docs/agent-ready/`.

## Core routes

- `/pricing-tool` — indicative installed pricing in AUD
- `/pricing` — crawlable pricing guidance
- `/compare` — platform comparison
- `/schools` — Australian school communications planning
- `/tools/funding-check` — holding page pending dedicated Australian funding rebuild
- `/tools/finance-check` — preliminary finance/leasing fit check
- `/industries/aged-care-retirement-villages` — aged-care and retirement-village communications guidance

## Local development

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
npm run typecheck:agent-ready
npx tsc --noEmit
npm run build
```

Set `NEXT_PUBLIC_SITE_URL=https://sitecomms.com.au` for production builds.

## Australian Phase 1 — 19 September 2026

Historical baseline: this source contains the national state-context layer, revised Australian comparisons and three new planning pages. Start with `SITECOMMS_AU_PHASE_1_CHANGELOG.md`, `AGENT_HANDOFF_PHASE_1.md` and `docs/PHASE_1_VALIDATION.md`. Detailed funding and finance phases remain separate. Keep preview/noindex enabled until the approved launch review.
