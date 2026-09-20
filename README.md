# SiteComms Australia

Australian research, education, planning and enquiry resource for PA, IP paging, school bells, intercom and communications systems.

## Current baseline — Phase 2 funding (20 September 2026)

Start with [the current agent handoff](AGENT_HANDOFF_PHASE_2_FUNDING.md), [change log](SITECOMMS_AU_PHASE_2_FUNDING_CHANGELOG.md) and [validation evidence](docs/funding/VALIDATION.md). This is the full source project, preserving the Agent-Ready foundation, original theme/assets, AUD calculations, reviewed enquiry flow and preview/noindex controls.

Phase 2 adds a shared, deterministic funding-pathway assessment for Queensland, NSW, Victoria, Western Australia and South Australia, plus selected national school/aged-care records. A three-step checker, five state guides and a national funding hub share 25 pathway records and 33 official-source records. It is not an exhaustive or live grants register, an eligibility decision, an award calculation or an application service. Source availability and material gaps are explicit.

The optional authenticated HTTP test profile remains disabled by default. No MCP/WebMCP, chatbot, new database, direct agent enquiry submission or automated grant application is added. The retired automatic pricing-result/PDF logger stays retired; historical data is untouched. Finance and a further product-market comparison pass remain separate phases.

## Main routes

- `/tools/funding-check` — researched state/applicant/project pathway tool.
- `/funding` — national overview and links to five substantive state guides.
- `/funding/queensland`, `/funding/new-south-wales`, `/funding/victoria`, `/funding/western-australia`, `/funding/south-australia`.
- `/pricing-tool`, `/pricing`, `/schools` — existing shared indicative AUD model, unchanged arithmetic.
- `/compare`, `/industries/aged-care-retirement-villages` — existing Australian comparison/sector content.
- `/tools/finance-check` — existing preliminary finance guidance, not a researched state/lender eligibility engine.
- `/integrations` — factual capability/compatibility status, not a universal AI-support claim.

## Development and checks

```sh
npm ci
npm test
npm run typecheck:funding
npm run typecheck:agent-ready
npx tsc --noEmit
npm run lint
npm run build
npm run dev
```

Use the unchanged dependency versions and lockfile. In the review environment dependency downloads failed; only the documented domain/source checks were completed. The hosting agent must finish the full framework and browser gates before deployment. Read `AGENTS.md` and the installed framework's version-matched documentation after installing dependencies.

Use `.env.example` only as a sanitised template. Supply real credentials in the host's protected environment. Noindex and API enablement are separate owner-authorised release decisions; robots/noindex do not protect private staging access.

## Maintenance and prior phases

Current funding evidence, rules, update/withdrawal procedures and review priorities: [research](docs/funding/RESEARCH_AND_COVERAGE.md), [contracts and operations](docs/funding/CONTRACT_AND_OPERATIONS.md), [profile](docs/funding/PROFILE_AND_PLAN.md).

The Agent-Ready master standard is preserved at `docs/agent-ready/STANDARD_0.1.0.md`. Historical Phase 1 and foundation handoffs/validation remain for traceability; do not use them to restore the funding holding page, the old 12-record directory or automatic result storage. The next substantial work is the separate Australian finance phase.
