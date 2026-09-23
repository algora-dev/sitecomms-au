# Agent handoff — SiteComms Australia Phase 3 Finance

Use this archive as the new working baseline. Do not reapply the earlier Phase 1/2 ZIPs over it.

## What changed

The existing finance checker was retained rather than redesigned. State/territory is now the first step inside the checker, and the result is grounded in reviewed Australian provider and public-school governance evidence.

The state selection is **not** used to fabricate state-specific lender lists or price differences. The strongest commercial products found are national. State changes the result where public-school/public-sector authority genuinely differs.

## Before deployment

Run from the existing lockfile:

1. `npm ci`
2. `npm test`
3. `npm run typecheck:finance`
4. the project's normal lint/typecheck commands
5. `npm run build`

Then preview `/tools/finance-check` and `/financing` on desktop and mobile.

## Required preview checks

- State selection is step 1 and is required.
- Existing finance questions remain simple; no additional lender/credit questionnaire has been introduced.
- National provider evidence opens to the correct public source.
- Government-school results vary appropriately by jurisdiction.
- A public-school result never implies that a commercial provider page creates authority to borrow.
- Private/non-government results never imply finance approval.
- “Discuss finance options” opens the existing SiteComms enquiry flow and carries state/finance context.
- SiteComms does not forward the enquiry automatically to a finance provider.
- No index/robots posture remains unchanged until the separate launch decision.

## Important implementation choices to preserve

- Provider sources are **evidence of market pathways**, not partnership badges.
- Hire purchase, finance lease and operating/rental lease are distinct structures.
- State is principally a public-governance input; private finance providers generally operate nationally.
- Finance and funding remain separate tools/questions.
- The checker is preliminary guidance, not a credit application, affordability assessment, rate quote, tax recommendation or approval.

## Validation limitation

Isolated finance typechecking, finance-domain smoke cases and the static source audit passed in the implementation environment. A fresh dependency install timed out, so the full dependency-backed test/lint/build suite still needs to be run by the hosting agent before deployment. See `docs/finance/VALIDATION.md`.
