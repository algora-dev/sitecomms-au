# SiteComms Australia

Australian research, education, planning and reviewed-enquiry resource for PA, IP paging, school bells, intercom and communications systems.

## Current baseline — Phase 4 schools comparison (25 September 2026)

**Start with `AGENT_HANDOFF_PHASE_4_SCHOOLS_COMPARE.md`.** This is the complete project built on the Phase 3 finance ZIP. All current instructions, research, changes and validation evidence are inside this archive.

The school comparison is now `/compare/schools`. It includes eight main approaches, feature-based shortlists, expandable profiles, cost/scope guidance, five-state Australian references and the existing reviewed enquiry form. SPON is a positive all-round option; its Australian supplier/support route remains unverified. `/compare` permanently redirects to the canonical page, with compatibility fragment targets preserved.

The existing global theme/assets, provisional AUD 80–100% pricing model, simplified funding flow, state-aware finance tool and enquiry backend are unchanged. The Agent-Ready public guide directory points to the new comparison; there is no new AI protocol, model, database or automatic lead submission.

## Main routes

- `/schools` → `/compare/schools`: school planning and comparison.
- `/pricing-tool`, `/pricing`: shared indicative AUD model, not brand quotes.
- `/tools/funding-check`: simplified state/site/applicant/stage/features pathway tool.
- `/funding` and the five state guides: researched pathways, not awards or a live grants feed.
- `/tools/finance-check`, `/financing`: Phase 3 state-aware indicative finance guidance.
- `/industries/aged-care-retirement-villages`: existing aged-care comparison, unchanged in Phase 4.
- `/integrations`: truthful status of the controlled, disabled-by-default HTTP profile.
- `/contact`: ordinary reviewed enquiry route.

## Development and release checks

```sh
npm ci
npm test
npm run typecheck:schools-compare
npm run typecheck:finance
npm run typecheck:funding
npm run typecheck:agent-ready
npx tsc --noEmit
npm run lint
npm run build
npm run dev
```

Dependencies and the lockfile are unchanged. Full framework installation/build and browser behaviour remain release gates in the hosting environment; see `docs/schools-compare/VALIDATION.md` for exactly what ran here.

Preview/noindex protection remains enabled. Do not enable indexing, public integration access or production deployment without owner approval. Noindex is not access control: protect private staging appropriately. Real environment secrets belong in the hosting provider's protected settings, never in an exported source ZIP.

## Current documentation

- `AGENT_HANDOFF_PHASE_4_SCHOOLS_COMPARE.md`: agent action and preview checklist.
- `SITECOMMS_AU_PHASE_4_SCHOOLS_COMPARE_CHANGELOG.md`: scope and known limits.
- `docs/schools-compare/`: profile, research, validation, actual test output and preservation/changed-file evidence.
- `docs/comparison-research.json`: source snapshot corresponding to the shared comparison registry.
- `docs/finance/`, `docs/funding/`, `docs/agent-ready/`: preserved domain research, operations and standard.

Earlier phase handoffs are historical evidence. Do not use them to restore the funding holding page, the pre-simplification questionnaire, automatic result/PDF storage, the old seven-system comparison or obsolete finance copy.

## Next work

The hosting agent should complete staging QA and fix integration issues without changing approved content/logic. Subsequent work can strengthen verified local installation/support evidence (especially SPON), refine the aged-care comparison, and complete launch QA. No automatic date refresh or unattended research task is configured.
