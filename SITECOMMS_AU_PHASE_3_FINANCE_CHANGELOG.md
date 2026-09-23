# SiteComms Australia — Phase 3 Finance implementation

**Completed:** 23 September 2026

## Objective

Keep the existing SmartComms-style finance checker simple, add state/territory as the first step, and ground the result in current Australian equipment-finance and public-school governance evidence without turning the tool into a credit application or lender-comparison marketplace.

## User-facing finance flow

The checker is now a four-step flow:

1. **State or territory**
2. **Organisation type**
3. **Rough project value** (or rough site size when value is unknown)
4. **Regular payment comfort + possible upfront contribution**

The existing qualification-style interaction remains intact. State primarily changes government-school/public-sector guidance; it does not artificially change a private organisation's finance result.

## Result behaviour

Private/non-government organisations can receive:

- strong possibility worth exploring;
- finance pathway may be available;
- tailored finance pathway for larger projects;
- early-stage finance discussion.

Government schools and public organisations do **not** receive a strong finance-readiness outcome merely because they know the project value and budget. They are routed through authority/procurement guidance first.

Results now include a compact **“Why this is a real Australian finance pathway”** section linking to reviewed provider/government sources. These are evidence links, not SiteComms endorsements or finance approvals.

## Australian finance evidence added

National provider evidence includes:

- NAB business equipment loans;
- Westpac equipment loans, finance leases and hire purchase;
- CommBank technology equipment leasing (including AV/communications categories);
- BOQ equipment finance, leases and commercial hire purchase;
- Vestone Capital education equipment finance;
- Finlease technology finance for education;
- ANZ health-sector equipment finance;
- CommBank healthcare equipment finance.

The guide was also corrected to distinguish **hire purchase** (ownership transfers after final required payment) from a **lease**, which can instead involve return, renewal or a purchase option depending on the contract. The tool no longer uses loose “lease-to-own” wording as though it were a single standard product type.

## State / territory public-school governance

Reviewed public evidence is encoded for all eight jurisdictions:

- **QLD:** lease/hire structures exist in state-school contexts, but public evidence does not establish a general school-level borrowing right for communications equipment; confirm the Department route.
- **NSW:** current financial-management and lease procedures exist, but detailed school rules are staff-only; confirm the Department route.
- **VIC:** operating leases are permitted; school councils cannot borrow or enter finance leases.
- **WA:** school councils/boards are not to borrow money or obtain credit.
- **SA:** governing-council borrowing requires the Minister's written consent.
- **NT:** finance leases are borrowing and generally require CE approval; operating leases are not borrowing.
- **TAS:** school associations require Secretary approval before borrowing and for specified restricted contracts.
- **ACT:** ACT Government procurement expressly includes purchase, lease and rental; SiteComms does not infer independent school-level borrowing authority from that and requires Directorate/procurement confirmation.

## Files added

- `src/lib/finance-check/sources.ts`
- `tsconfig.finance.json`
- `docs/finance/RESEARCH_AND_COVERAGE.md`
- `docs/finance/VALIDATION.md`
- `SITECOMMS_AU_PHASE_3_FINANCE_CHANGELOG.md`
- `AGENT_HANDOFF_PHASE_3_FINANCE.md`

## Principal files changed

- `src/lib/finance-check/engine.ts`
- `src/lib/finance-check/config.ts`
- `src/app/tools/finance-check/FinanceCheckTool.tsx`
- `src/app/tools/finance-check/page.tsx`
- `src/app/financing/page.tsx`
- `src/components/project-state.tsx`
- `src/lib/content-meta.ts`
- `src/app/funding/page.tsx`
- `scripts/test-finance.mjs`
- `scripts/test-site.mjs`
- `package.json`

## Preserved boundaries

No changes were made to:

- the pricing engine or AUD assumptions;
- funding-catalogue rules;
- compare/product logic;
- SiteComms enquiry-forwarding policy;
- global visual theme;
- public assets/logo files;
- dependency versions or the existing lockfile;
- preview/no-index release posture.

SiteComms still does not provide finance, financial advice, credit assessment or approval. Provider assessment and the organisation's own authority determine actual availability.
