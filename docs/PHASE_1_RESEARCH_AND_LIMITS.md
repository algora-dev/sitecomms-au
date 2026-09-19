# Phase 1 research scope and editorial limits

Reviewed 19 September 2026. This register separates what the sources establish from SiteComms editorial planning recommendations. This is not an Australian market-share survey, independent product test or full legal/financial review.

## Product and local-supply evidence

`src/lib/content/school-compare.ts` is the current school comparison data source. `docs/comparison-research.json` mirrors its 14 references. The content test prevents those source records drifting apart.

Manufacturer documentation is used for product capabilities. Australian manufacturer pages, public provider service pages and wholesaler listings are used only to establish a public Australian-facing starting point. They do not prove current stock, every-state service coverage, a completed local deployment, a SiteComms partnership or suitability for a particular care site.

The source families reviewed include FrontRow Australia/Conductor; ClearaSound’s Conductor service publication; advanceNET’s Algo 8301, Bodet Harmonys Trio and 2N listings; Algo’s 8301 manual; Axis Australian product information and Audio Manager Edge documentation; Keenfinity Australia’s PROSPERO page; TOA IP-A1PG documentation and manufacturer dealer directory; Australian Monitor’s school paging/custom-tones application design; SPON’s manufacturer school solution; and the current 2N IP Verso 2.0 page.

Aged-care references are attached to the actual data entries in `src/lib/content/aged-care-guide.ts`, with 20 referenced sources. Additional model-level references cover Axis C6110/C8110/I8116-E, Algo 8188 and TOA N-8000/IP-A1AF. Current Australian supply of the exact proposed family must still be confirmed. Overseas technical documents are not labelled Australian case studies.

School use-case groupings, project-brief questions, quote comparison criteria and acceptance demonstrations are SiteComms editorial synthesis. Conditional product coverage is explicitly qualified. ITC is not in the main comparison because the required Australian route was not established; that is not proof it cannot be supplied. SPON’s capabilities are not a substitute for verifying its Australian supply/support route. FrontRow’s school evidence is not represented as an Australian aged-care deployment.

## Official directory and technical references

All eight education directory links were checked as public starting points, not as grant-program evidence:

- ACT: https://www.act.gov.au/education-and-training
- NSW: https://education.nsw.gov.au/
- NT: https://education.nt.gov.au/
- QLD: https://education.qld.gov.au/
- SA: https://www.education.sa.gov.au/
- TAS: https://www.decyp.tas.gov.au/
- VIC: https://www.education.vic.gov.au/
- WA: https://www.education.wa.edu.au/

Australian cabling references: https://www.acma.gov.au/cabling-your-home-or-office and https://www.acma.gov.au/find-registered-cabler . These support registered-cabler checks and responsibilities for the applicable communications-cabling scope; they are not a blanket classification of every audio installation task.

Care-sector context: https://www.health.gov.au/topics/aged-care/providing-aged-care-services/types-of-services . Do not merge residential aged care, retirement-village ownership and clinical call-response into one assumed legal applicant or technical requirement.

A limited governance cross-check used Victoria’s school finance manual, Section 14: https://www2.education.vic.gov.au/pal/finance-manual/guidance/section-14-liabilities-management . It supports caution about authority to incur borrowing commitments. It is **not** encoded as a rule for every state, and this review does not claim that page establishes all operating-lease/finance-lease distinctions. Public applicants receive an interim authority-first message, not a legal determination.

Framework context: https://nextjs.org/docs/app/guides/upgrading/version-16 . Installed version-matched documentation and the full build must be checked by the hosting agent after dependency installation.

## Deferred research: Phase 2 funding

No grant program, opening window, closing date or equipment eligibility has been freshly approved for display by this phase. Do not copy dates or apparent current availability from the earlier chat into live rules without a new official-source review.

For QLD, NSW, VIC and WA first, research government schools, Catholic/independent schools, residential aged care applicants and other credible at-scale sectors separately. Extend the same model to SA, TAS, ACT and NT as evidence is obtained. For each pathway record:

- Jurisdiction and legal applicant; owner/tenant/operator constraints.
- Route type: grant, allocation, internal project approval, procurement process, subsidised loan or another clearly named mechanism.
- Eligible project scope and exclusions, especially standalone communications equipment versus a component of capital works.
- Current status, opening/closing dates, approval-before-spend constraints and official contact/process.
- Official primary URL, reviewed date, next review/expiry date and a plain-language evidence limitation.
- User action and what SiteComms can help scope, without promising eligibility, funding or automatic introduction.

The later tool should distinguish “potential pathway to investigate”, “approval/procurement route”, “closed/not currently accepting applications” and “insufficient information”. Selecting a state and sector alone must never produce an approval claim.

## Deferred research: Phase 3 finance

Research actual Australian providers, eligible entity types, financeable hardware/software/installation scope, minimum transaction conditions, public-sector authority checks, approvals, ownership/end-of-term conditions and exclusions. Keep grants and debt/lease commitments separate. Do not invent provider rates, acceptance likelihood or finance availability for all public schools/care operators. Aged-care site type is not the legal borrowing entity.

## Maintenance

Use `node scripts/check-external-links.mjs --list` to inventory references without network requests. Use the script without `--list` in a network-enabled environment to check HTTP responses, then review failures manually; bot protection can produce false negatives. An HTTP 200 does not verify that the content still supports the claim. Product revisions, program windows and support routes require human editorial review, not just URL checking.
