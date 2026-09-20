/** Reviewed public-source snapshots. These are not live grants data or eligibility decisions.
 * Source facts and SiteComms applicability interpretation are deliberately separate.
 * Updating a date requires an actual review; never refresh dates on build/request.
 */
import type { FundingPathway, FundingSource } from "./types";
export const FUNDING_CATALOGUE_VERSION = "2026-09-20.1";
export const FUNDING_RULE_VERSION = "1.0.0";
export const FUNDING_REVIEWED = "2026-09-20";
export const PRIORITY_FUNDING_STATES = ["QLD", "NSW", "VIC", "WA", "SA"] as const;
export const FUNDING_SOURCES: readonly FundingSource[] = [
  {
    "id": "cgp",
    "title": "Capital Grants Program for non-government schools",
    "publisher": "Australian Government Department of Education",
    "url": "https://www.education.gov.au/other-commonwealth-funding-schools/capital-grants-non-government-schools",
    "section": "Programme purpose and application through Block Grant Authorities",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "cgp-guidelines",
    "title": "Capital Grants Program Guidelines 2025",
    "publisher": "Australian Government Department of Education",
    "url": "https://www.education.gov.au/download/2375/capital-grants-program-guidelines/42877/capital-grants-program-guidelines-2025/pdf",
    "section": "Sections 26–27, especially equipment, pre-primary and retrospective-project exclusions",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19",
    "evidence_note": "Official PDF reviewed. Equipment is generally outside scope unless associated with capital works or an accepted special circumstance; SiteComms does not determine exceptions."
  },
  {
    "id": "bga-contacts",
    "title": "Block Grant Authority contact details",
    "publisher": "Australian Government Department of Education",
    "url": "https://www.education.gov.au/other-commonwealth-funding-schools/block-grant-authority-contact-details",
    "section": "State and Catholic/independent authority links",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "accap",
    "title": "Aged Care Capital Assistance Program",
    "publisher": "Australian Government Department of Health, Disability and Ageing",
    "url": "https://www.health.gov.au/our-work/aged-care-capital-assistance-program",
    "section": "Programme overview; targeted markets; round status; Critical Infrastructure Projects",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20",
    "evidence_note": "Official overview reviewed. Full GO6332 GrantConnect documents were not retrievable in this review; no complete applicant or expenditure eligibility determination is encoded."
  },
  {
    "id": "qld-minor",
    "title": "Minor Works Appropriation",
    "publisher": "Queensland Department of Education",
    "url": "https://education.qld.gov.au/about-us/budgets-funding-grants/grants/state-schools/targeted/minor-works-appropriation",
    "section": "Eligibility, annual allocation and regional contingency funding",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "qld-scas",
    "title": "State Capital Assistance Scheme",
    "publisher": "Queensland Department of Education",
    "url": "https://education.qld.gov.au/about-us/budgets-funding-grants/grants/non-state-school/state-capital-assistance-scheme",
    "section": "Programme purpose, eligible schools and Capital Assistance Authorities",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "qld-gcbf",
    "title": "Gambling Community Benefit Fund: current round",
    "publisher": "Queensland Department of Justice",
    "url": "https://www.justice.qld.gov.au/initiatives/community-grants",
    "section": "Round 127 application dates",
    "reviewed": "2026-09-20",
    "review_due": "2026-09-27"
  },
  {
    "id": "qld-gcbf-eligibility",
    "title": "GCBF eligibility requirements",
    "publisher": "Queensland Department of Justice",
    "url": "https://www.justice.qld.gov.au/initiatives/community-grants/guidelines/eligibility",
    "section": "Legal applicant, schools and parents’ associations",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "qld-gcbf-items",
    "title": "GCBF eligible and ineligible items",
    "publisher": "Queensland Department of Justice",
    "url": "https://www.justice.qld.gov.au/initiatives/community-grants/guidelines/items",
    "section": "Equipment/facilities, commitments before approval, exclusions and retirement-living facilities",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "nsw-works",
    "title": "School infrastructure works proposals",
    "publisher": "NSW Department of Education",
    "url": "https://education.nsw.gov.au/policy-library/policies/pd-2021-0477-01",
    "section": "Current works-proposal procedure, FMWeb 2.0 and local School Infrastructure support",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "nsw-bgas",
    "title": "Building Grants Assistance Scheme",
    "publisher": "NSW Government",
    "url": "https://www.nsw.gov.au/grants-and-funding/building-grants-assistance-scheme",
    "section": "Eligible capital works, BGA administration and inconsistent application-status labels",
    "reviewed": "2026-09-20",
    "review_due": "2026-09-27",
    "evidence_note": "The page labels the scheme ongoing/open in one place and CLOSED near the application action. These were not reconciled into a claim of open applications. School deadlines must come from the BGA."
  },
  {
    "id": "nsw-cbp",
    "title": "Community Building Partnership 2026",
    "publisher": "NSW Government",
    "url": "https://www.nsw.gov.au/grants-and-funding/community-building-partnership/community-building-partnership-2026",
    "section": "2026 dates, eligible applicants, capital scope and council co-contribution",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "nsw-belp",
    "title": "Building Early Learning Places Program",
    "publisher": "NSW Department of Education",
    "url": "https://education.nsw.gov.au/early-childhood-education/operating-an-early-childhood-education-service/grants-and-funded-programs/building-early-learning-places-program",
    "section": "Dated application schedule and service/location criteria",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20",
    "evidence_note": "The page retains an Open label but its specified deadline is 30 March 2025. The dated round is treated as closed, not silently reopened by the stale badge."
  },
  {
    "id": "nsw-ie",
    "title": "2026 Inclusive Environments Funding Program Guidelines",
    "publisher": "NSW Department of Education",
    "url": "https://education.nsw.gov.au/early-childhood-education/operating-an-early-childhood-education-service/grants-and-funded-programs/disability-and-inclusion-program/2026-inclusive-environments-funding-program-guidelines",
    "section": "Sections 3–8: preschool/child criteria, final child-based cut-off, specialised equipment and spending restrictions",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-04"
  },
  {
    "id": "vic-school-funded",
    "title": "School-funded capital projects policy",
    "publisher": "Victorian Department of Education",
    "url": "https://www2.education.vic.gov.au/pal/school-funded-capital-projects/policy",
    "section": "School council, VSBA approval and funding-source requirements",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "vic-cwf",
    "title": "Capital Works Fund",
    "publisher": "Victorian School Building Authority",
    "url": "https://www.schoolbuildings.vic.gov.au/capital-works-fund",
    "section": "2026 round dates, streams and exclusions",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "vic-abp",
    "title": "Accessible Buildings Program policy",
    "publisher": "Victorian Department of Education",
    "url": "https://www2.education.vic.gov.au/pal/accessible-buildings-program/policy",
    "section": "Targeted adjustments and programme process",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "vic-hearing",
    "title": "Hearing technology eligibility",
    "publisher": "Victorian Department of Education",
    "url": "https://www2.education.vic.gov.au/pal/accessible-buildings-program/guidance/hearing-technology-eligibility",
    "section": "Audiologist assessment, recommended equipment and adjustment planning",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "vic-catholic",
    "title": "Building Fund for Non-Government Schools — Catholic",
    "publisher": "Victorian School Building Authority",
    "url": "https://www.schoolbuildings.vic.gov.au/building-fund-non-government-schools-catholic",
    "section": "Published programme and round status",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "vic-independent",
    "title": "Building Fund for Non-Government Schools — Independent",
    "publisher": "Victorian School Building Authority",
    "url": "https://www.schoolbuildings.vic.gov.au/building-fund-non-government-schools-independent",
    "section": "Round 4 closure and eligible low-fee-school stream",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "vic-blocks-improvement",
    "title": "Building Blocks Improvement grants",
    "publisher": "Victorian School Building Authority",
    "url": "https://www.schoolbuildings.vic.gov.au/building-blocks-grants-improvement",
    "section": "Closed programme status, provider commitments and eligible/ineligible works",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "vic-blocks-inclusion",
    "title": "Building Blocks Inclusion grants",
    "publisher": "Victorian School Building Authority",
    "url": "https://www.schoolbuildings.vic.gov.au/building-blocks-grants-inclusion",
    "section": "Closed programme status, buildings versus equipment streams and exclusions",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "wa-supply",
    "title": "Supply to WA public schools",
    "publisher": "WA Department of Education",
    "url": "https://www.education.wa.edu.au/supply-to-us",
    "section": "School-funded Direct to Market minor works and departmental pathways",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "wa-lils",
    "title": "Low Interest Loan Scheme",
    "publisher": "WA Department of Education",
    "url": "https://www.education.wa.edu.au/low-interest-loan-scheme",
    "section": "Non-government-school capital loans and sector-specific application arrangements",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "wa-lotterywest",
    "title": "Applying for a Lotterywest grant",
    "publisher": "Lotterywest",
    "url": "https://www.lotterywest.wa.gov.au/grants/applying-for-a-grant",
    "section": "Eligible organisations, equipment/capital projects and exclusions",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "wa-lottery-opportunities",
    "title": "Lotterywest grant opportunities",
    "publisher": "Lotterywest",
    "url": "https://www.lotterywest.wa.gov.au/grants/grant-opportunities",
    "section": "Current grant routes and community outcomes",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "sa-school-budgets",
    "title": "Budgets for governing councils",
    "publisher": "SA Department for Education",
    "url": "https://www.education.sa.gov.au/working-us/governing-councils/finance-and-budgets/budgets-governing-councils",
    "section": "Site leader preparation and governing-council budget role",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19"
  },
  {
    "id": "sa-infrastructure-plan",
    "title": "20-year infrastructure plan for public education and care",
    "publisher": "SA Department for Education",
    "url": "https://www.education.sa.gov.au/department/strategies-and-plans/20-year-infrastructure-plan-for-public-education-and-care",
    "section": "Infrastructure planning context, not an open grant application",
    "reviewed": "2026-09-20",
    "review_due": "2026-12-19",
    "evidence_note": "This is strategic context only. No public-school grant, delegation threshold or automatic capital allocation is established by this plan."
  },
  {
    "id": "sa-flying",
    "title": "Flying Start Infrastructure Grants",
    "publisher": "SA Office for Early Childhood Development",
    "url": "https://www.earlychildhood.sa.gov.au/for-providers/investing-in-infrastructure/flying-start-infrastructure-grants",
    "section": "Current rolling intake, eligible providers and additional preschool places",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-04"
  },
  {
    "id": "sa-flying-guidelines",
    "title": "Flying Start Infrastructure Grants Guidelines v3",
    "publisher": "SA Office for Early Childhood Development",
    "url": "https://www.earlychildhood.sa.gov.au/__data/assets/pdf_file/0011/1709561/FIG-Guidelines_Version-3.0_FINAL.pdf",
    "section": "Eligibility and eligible/ineligible capital projects; additional places and commitment restrictions",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20",
    "evidence_note": "Official guideline PDF reviewed. Current intake wording is taken from the programme webpage; funding ratios and grant amounts are not applied automatically to the communications component."
  },
  {
    "id": "sa-school-loans",
    "title": "School and Preschool Loans",
    "publisher": "SA Government Financing Authority",
    "url": "https://www.safa.sa.gov.au/commercial-advisory/school-loans",
    "section": "Round 4 closure and eligible non-government school/preschool capital loans",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20"
  },
  {
    "id": "sa-jfdi",
    "title": "Julia Farr Disability Inclusion Grants — Round 1 2026–27",
    "publisher": "SA Department of Human Services",
    "url": "https://dhs.sa.gov.au/how-we-help/grants/available-grants/julia-farr-disability-inclusion-grants-round-1-2026-2027",
    "section": "Round dates, inclusive-community purposes and application route",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-04"
  },
  {
    "id": "sa-jfdi-guidelines",
    "title": "Julia Farr Disability Inclusion Grants Round 1 Guidelines",
    "publisher": "SA Department of Human Services",
    "url": "https://dhs.sa.gov.au/__data/assets/pdf_file/0003/203556/JFDI-Grant-Guidelines-Round-1.pdf",
    "section": "Applicant exclusions, core costs, project duplication and accessibility examples",
    "reviewed": "2026-09-20",
    "review_due": "2026-10-20",
    "evidence_note": "Official PDF reviewed. Educational institutions, gaming-machine organisations and ordinary phone/IT/core-service costs have exclusions; targeted access benefits must be demonstrated."
  }
];
export const FUNDING_PATHWAYS: readonly FundingPathway[] = [
  {
    "id": "national-cgp",
    "title": "Commonwealth Capital Grants Program",
    "jurisdictions": [
      "national"
    ],
    "site_types": [
      "catholic_school",
      "independent_school"
    ],
    "route_type": "grant",
    "availability": "ongoing",
    "availability_note": "Applications follow the relevant Block Grant Authority cycle; this is not a continuously open direct Commonwealth form.",
    "timezone": "Australia/Sydney",
    "source_ids": [
      "cgp",
      "cgp-guidelines",
      "bga-contacts"
    ],
    "facts": "Eligible non-government primary and secondary schools seek capital assistance through their Block Grant Authority. Financial need and the wider project are assessed.",
    "interpretation": "A PA, paging or intercom component may warrant a question to the BGA when it belongs to eligible construction or refurbishment. A standalone equipment purchase is not assumed to fit.",
    "conditions": [
      "The guidelines generally exclude equipment and IT unless associated with capital works or accepted special circumstances.",
      "Pre-primary facilities and projects solely undertaken by parents’ associations are not this programme’s ordinary scope.",
      "School eligibility, tenure, available resources, contributions and the BGA timetable still require assessment."
    ],
    "next_step": "Contact the BGA for the school’s state and sector before contracting. Describe the complete capital project and ask whether each communications line is eligible.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "avoid_retrospective": "before_approval",
    "published_funding_terms": null
  },
  {
    "id": "national-accap",
    "title": "ACCAP: targeted aged-care capital programme",
    "jurisdictions": [
      "national"
    ],
    "site_types": [
      "residential_aged_care"
    ],
    "route_type": "grant",
    "availability": "monitor",
    "availability_note": "This is a programme-level watch route. Prior rounds and local targeted opportunities must not be treated as a new open national round.",
    "timezone": "Australia/Sydney",
    "source_ids": [
      "accap"
    ],
    "facts": "ACCAP supports targeted aged-care infrastructure, including facilities serving rural/remote locations and people with specialised access needs. Availability is opportunity-specific.",
    "interpretation": "Communications infrastructure may form part of an eligible wider facility project. The overview does not establish that a standalone paging, PA or nurse-call purchase will be funded.",
    "conditions": [
      "Residential aged care and retirement villages are different; retirement-village operation alone does not establish access.",
      "Check the particular opportunity’s provider, location, project and expenditure conditions.",
      "No current award, provider endorsement or application invitation is implied."
    ],
    "next_step": "Review the department’s current ACCAP opportunities and obtain programme advice before preparing a grant application.",
    "rules": [
      {
        "field": "registered_care_provider",
        "allowed": [
          "yes"
        ],
        "message": "The applicant must establish the required aged-care provider status with the department.",
        "mismatch": "review"
      },
      {
        "field": "targeted_care_need",
        "allowed": [
          "yes"
        ],
        "message": "Identify the relevant targeted aged-care infrastructure or access need; ordinary equipment renewal alone is not enough.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "national-accap-critical",
    "title": "ACCAP Critical Infrastructure Projects — invitation only",
    "jurisdictions": [
      "national"
    ],
    "site_types": [
      "residential_aged_care"
    ],
    "route_type": "grant",
    "availability": "invitation_only",
    "availability_note": "The Critical Infrastructure opportunity is invitation-only. Its 30 June 2030 end date does not make it open to unsolicited applications.",
    "timezone": "Australia/Sydney",
    "source_ids": [
      "accap"
    ],
    "facts": "The department describes Critical Infrastructure Projects as a closed, non-competitive, invitation-only opportunity, with an end date of 30 June 2030.",
    "interpretation": "An urgent aged-care communications failure is not itself an invitation or eligibility decision. An invited provider must have the department confirm the proposal and expenditure scope.",
    "conditions": [
      "An existing invitation, required provider status and the specific grant documents must be checked.",
      "No inference is made that every urgent safety or maintenance request qualifies.",
      "Full opportunity conditions require departmental confirmation; this record relies on the official programme overview."
    ],
    "next_step": "An invited provider should use its departmental contact. Without an invitation, seek programme advice rather than treating this as an open application.",
    "rules": [
      {
        "field": "registered_care_provider",
        "allowed": [
          "yes"
        ],
        "message": "The applicant must establish the required aged-care provider status with the department.",
        "mismatch": "review"
      },
      {
        "field": "targeted_care_need",
        "allowed": [
          "yes"
        ],
        "message": "Identify the relevant targeted aged-care infrastructure or access need; ordinary equipment renewal alone is not enough.",
        "mismatch": "review"
      },
      {
        "field": "invitation",
        "allowed": [
          "yes"
        ],
        "message": "An invitation from the department is required for this specific opportunity.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "close_date": "2030-06-30",
    "published_funding_terms": null
  },
  {
    "id": "qld-minor",
    "title": "Queensland state-school Minor Works Appropriation",
    "jurisdictions": [
      "QLD"
    ],
    "site_types": [
      "government_school"
    ],
    "route_type": "internal_allocation",
    "availability": "ongoing",
    "availability_note": "An internal school/department allocation route, not a public equipment grant.",
    "timezone": "Australia/Brisbane",
    "source_ids": [
      "qld-minor"
    ],
    "facts": "State education facilities receive annual minor-works allocations; a regional contingency mechanism considers priority and critical work.",
    "interpretation": "A small communications repair or infrastructure improvement is a scope question for the school and regional infrastructure adviser, not an automatic entitlement.",
    "conditions": [
      "Existing school allocations and regional contingency requests are different mechanisms.",
      "The school must confirm permitted spending, priorities and any required approvals.",
      "An available budget cannot be inferred from the existence of this programme."
    ],
    "next_step": "Ask the principal/business manager to check the school’s minor-works position and discuss critical or priority work with the regional infrastructure adviser.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "qld-scas",
    "title": "Queensland non-state-school State Capital Assistance Scheme",
    "jurisdictions": [
      "QLD"
    ],
    "site_types": [
      "catholic_school",
      "independent_school"
    ],
    "route_type": "grant",
    "availability": "ongoing",
    "availability_note": "An ongoing scheme administered through Capital Assistance Authorities; confirm the applicant’s current authority cycle.",
    "timezone": "Australia/Brisbane",
    "source_ids": [
      "qld-scas"
    ],
    "facts": "The scheme assists eligible non-state schools with capital development through their Capital Assistance Authority.",
    "interpretation": "Integrated communications work may be a component of a facility development or upgrade; the school’s authority needs to confirm the cost item and project fit.",
    "conditions": [
      "Accreditation, state-funding eligibility and affiliation with a Capital Assistance Authority matter.",
      "A scheme being ongoing is not evidence that a school-level application round is open today.",
      "Do not assume a grant for standalone electronics or combine state and Commonwealth support for the same cost without approval."
    ],
    "next_step": "Approach the school’s Capital Assistance Authority with the building scope, communications specification, budget and timing.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "avoid_retrospective": "confirm",
    "published_funding_terms": null
  },
  {
    "id": "qld-gcbf-127",
    "title": "Queensland Gambling Community Benefit Fund — Round 127",
    "jurisdictions": [
      "QLD"
    ],
    "site_types": [
      "government_school",
      "catholic_school",
      "independent_school",
      "community",
      "sport_recreation",
      "early_childhood",
      "healthcare",
      "other",
      "retirement_village"
    ],
    "route_type": "grant",
    "availability": "open_at_review",
    "availability_note": "Round 127 was open at the research date and closes 28 September 2026. Confirm the funder’s exact cut-off on the closing day.",
    "timezone": "Australia/Brisbane",
    "source_ids": [
      "qld-gcbf",
      "qld-gcbf-eligibility",
      "qld-gcbf-items"
    ],
    "facts": "The fund supports eligible not-for-profit community equipment and facility projects. Schools themselves cannot apply; eligible P&C/P&F associations may apply in their own capacity.",
    "interpretation": "A community-use PA, announcement or intercom project may be worth scoping if the actual applicant and expenditure satisfy the rules. Parent-body status is not a workaround for every school project.",
    "conditions": [
      "Check legal entity/auspice, Queensland community benefit, ABN, bank details, quotes and permission for works.",
      "Do not order, pay a deposit or sign contracts before approval under the programme rules.",
      "Retirement-living/body-corporate facility improvements and ordinary operating costs are excluded; check all item restrictions."
    ],
    "next_step": "Read the current round and item rules, identify the actual legal applicant, and ask the funder about the proposed communications items before any commitment.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "school_parent_body",
          "local_government",
          "other_government",
          "unincorporated_group"
        ],
        "message": "The actual legal applicant must meet GCBF requirements; a school itself, for-profit business or individual is not treated as eligible.",
        "mismatch": "outside_scope"
      },
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "school_parent_body"
        ],
        "message": "Confirm the eligible legal-entity type or sponsored-entity arrangement with the funder. A council, government organisation or unincorporated group is not automatically accepted by this checker.",
        "mismatch": "review"
      },
      {
        "field": "site_type",
        "allowed": [
          "government_school",
          "catholic_school",
          "independent_school",
          "community",
          "sport_recreation",
          "early_childhood",
          "healthcare",
          "other"
        ],
        "message": "Retirement-living facility improvements are excluded from this GCBF pathway.",
        "mismatch": "outside_scope"
      },
      {
        "field": "community_benefit",
        "allowed": [
          "yes"
        ],
        "message": "Identify a genuine wider community benefit, not only a private or operational benefit.",
        "mismatch": "outside_scope"
      }
    ],
    "publication": "active",
    "open_date": "2026-08-31",
    "close_date": "2026-09-28",
    "avoid_retrospective": "before_approval",
    "published_funding_terms": "Published Round 127 ceiling: up to A$35,000. This is a programme limit, not an expected or approved award for this project."
  },
  {
    "id": "nsw-works",
    "title": "NSW government-school works proposal and approval",
    "jurisdictions": [
      "NSW"
    ],
    "site_types": [
      "government_school"
    ],
    "route_type": "project_approval",
    "availability": "ongoing",
    "availability_note": "A departmental proposal/approval process, not a grant offer.",
    "timezone": "Australia/Sydney",
    "source_ids": [
      "nsw-works"
    ],
    "facts": "Government schools use the departmental works-proposal process for school-funded or department-funded proposals, involving the principal and local School Infrastructure team.",
    "interpretation": "A communications capital proposal needs the correct scope and approval route. Routine maintenance is not simply a new works proposal.",
    "conditions": [
      "Funding source and approval to undertake works are separate decisions.",
      "Department budget consideration does not guarantee allocation.",
      "Use the school’s maintenance route for maintenance and seek advice where project classification is uncertain."
    ],
    "next_step": "Have the principal discuss scope and funding responsibility with the local School Infrastructure team and use the applicable FMWeb 2.0 process.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "nsw-bgas",
    "title": "NSW non-government-school Building Grants Assistance Scheme",
    "jurisdictions": [
      "NSW"
    ],
    "site_types": [
      "catholic_school",
      "independent_school"
    ],
    "route_type": "grant",
    "availability": "confirm_status",
    "availability_note": "Official page status labels conflict. Confirm the actual school application window with the BGA; no open-round claim is made.",
    "timezone": "Australia/Sydney",
    "source_ids": [
      "nsw-bgas",
      "bga-contacts"
    ],
    "facts": "BGAS assists eligible non-government-school capital projects through Block Grant Authorities. Essential equipment can relate to eligible capital works.",
    "interpretation": "A communications component of a qualifying facility project warrants a BGA scope check. This is not a standalone equipment subsidy.",
    "conditions": [
      "NESA, non-profit, tenure, project and BGA requirements still apply.",
      "Do not mistake ministerial submission dates for individual school application deadlines.",
      "General maintenance and already-committed work have restrictions; check before proceeding."
    ],
    "next_step": "Use the BGA for the school’s sector to confirm the current window and item eligibility before preparing or committing the project.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "avoid_retrospective": "before_approval",
    "published_funding_terms": null
  },
  {
    "id": "nsw-cbp-2026",
    "title": "NSW Community Building Partnership 2026",
    "jurisdictions": [
      "NSW"
    ],
    "site_types": [
      "government_school",
      "catholic_school",
      "independent_school",
      "community",
      "sport_recreation",
      "early_childhood",
      "healthcare",
      "other"
    ],
    "route_type": "grant",
    "availability": "closed",
    "availability_note": "The 2026 expression-of-interest round closed on 8 May 2026. A later application stage is not an open invitation to new applicants.",
    "timezone": "Australia/Sydney",
    "source_ids": [
      "nsw-cbp"
    ],
    "facts": "The 2026 programme supports eligible community infrastructure and equipment proposals from incorporated not-for-profits, eligible parents’ bodies and local councils.",
    "interpretation": "A community communications project could be a scope to prepare for a future announced opportunity, but this closed round is not presently available to a new applicant.",
    "conditions": [
      "Councils have a cash co-contribution requirement; do not generalise it to every applicant.",
      "The 2026 process includes an expression of interest and a subsequent stage for shortlisted applicants.",
      "Future rounds, dates, budgets and eligibility are not assumed."
    ],
    "next_step": "Monitor the official programme page. Develop a documented community need, ownership permission and itemised project scope without assuming reimbursement.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "school_parent_body",
          "local_government"
        ],
        "message": "This community programme requires an eligible legal applicant, not a school/department or private business applying in its ordinary capacity.",
        "mismatch": "outside_scope"
      },
      {
        "field": "community_benefit",
        "allowed": [
          "yes"
        ],
        "message": "Identify a genuine wider community benefit, not only a private or operational benefit.",
        "mismatch": "outside_scope"
      }
    ],
    "publication": "active",
    "closes": "2026-05-08T07:00:00Z",
    "avoid_retrospective": "confirm",
    "published_funding_terms": "The closed 2026 round considered requests from A$10,000 to A$100,000. Councils and section 355 committees require matching cash. These historical round terms are not an available award."
  },
  {
    "id": "nsw-belp",
    "title": "NSW Building Early Learning Places — published 2025 round",
    "jurisdictions": [
      "NSW"
    ],
    "site_types": [
      "early_childhood"
    ],
    "route_type": "grant",
    "availability": "closed",
    "availability_note": "The published application deadline was 30 March 2025, despite a retained Open badge. No replacement round was verified.",
    "timezone": "Australia/Sydney",
    "source_ids": [
      "nsw-belp"
    ],
    "facts": "The published programme targets additional early-learning places from eligible not-for-profit services in specified undersupplied areas, or Aboriginal Community Controlled Organisations under its targeted stream.",
    "interpretation": "Communications can only be considered within the eligible additional-places project and approved cost scope, not as a general childcare PA grant.",
    "conditions": [
      "Location/ACCO, provider, new-place and project-start conditions apply.",
      "Published eligibility excludes public and non-government school sites.",
      "A future round needs fresh research; the old page does not establish present funding availability."
    ],
    "next_step": "Check the department’s current early-childhood capital programmes before investing in an application.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "local_government"
        ],
        "message": "An eligible incorporated not-for-profit or council must be the applicant; an eligible auspice would need its own confirmation.",
        "mismatch": "outside_scope"
      },
      {
        "field": "adds_places",
        "allowed": [
          "yes"
        ],
        "message": "Additional eligible early-learning places are required.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "closes": "2025-03-30T12:59:00Z",
    "published_funding_terms": null
  },
  {
    "id": "nsw-ie-child-2026",
    "title": "NSW Inclusive Environments — 2026 child-based funding",
    "jurisdictions": [
      "NSW"
    ],
    "site_types": [
      "early_childhood"
    ],
    "route_type": "grant",
    "availability": "open_at_review",
    "availability_note": "Published final child-based cut-off: 16 October 2026, 5 pm NSW time. The separate service-readiness cut-off has already passed.",
    "timezone": "Australia/Sydney",
    "source_ids": [
      "nsw-ie"
    ],
    "facts": "Eligible funded not-for-profit community/mobile preschools may seek specialised equipment or minor construction for a child’s identified access needs. Generic IT and ordinary refurbishment are excluded.",
    "interpretation": "A genuinely specialised communication-access adjustment should be checked with the department and supporting professional. General IP paging, office telephony or campus PA must not be relabelled as specialised access equipment.",
    "conditions": [
      "Only the relevant Start Strong/mobile preschool places are in scope, not Child Care Subsidy-approved places/hours.",
      "The child and professional evidence, quotes and calendar-year spending requirements apply; do not send personal or medical records to this tool.",
      "The commitment rule is before application, not before approval. Spending after application remains the service’s risk if declined.",
      "The separately invited service-readiness stream is not this child-based result."
    ],
    "next_step": "Ask the preschool’s authorised funding staff to check the child-based guidelines and obtain item-specific advice before commitment. Submit through the official system, not SiteComms.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "local_government"
        ],
        "message": "An eligible not-for-profit funded community/mobile preschool provider is required.",
        "mismatch": "outside_scope"
      },
      {
        "field": "eligible_nsw_preschool",
        "allowed": [
          "yes"
        ],
        "message": "Confirm the specific funded community/mobile preschool and non-CCS place requirements.",
        "mismatch": "outside_scope"
      },
      {
        "field": "project_focus",
        "allowed": [
          "accessibility"
        ],
        "message": "General communications, maintenance or building work is not automatically a specialised child-access adjustment.",
        "mismatch": "outside_scope"
      },
      {
        "field": "accessibility_evidence",
        "allowed": [
          "yes"
        ],
        "message": "A specific, evidenced disability-access adjustment is required. A general PA replacement is not an accessibility grant application.",
        "mismatch": "review"
      },
      {
        "field": "child_adjustment",
        "allowed": [
          "yes"
        ],
        "message": "This record is for the child-based stream, with an identified enrolled child and required supporting evidence.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "closes": "2026-10-16T06:00:00Z",
    "avoid_retrospective": "before_application",
    "published_funding_terms": "Published child-based limits: up to A$5,000 excluding GST for specialised equipment/furniture, or A$20,000 excluding GST for minor construction, per child per year (or per application covering multiple children). Exceptional equipment requests have separate conditions. No award is calculated."
  },
  {
    "id": "vic-school-funded",
    "title": "Victorian government-school school-funded capital projects",
    "jurisdictions": [
      "VIC"
    ],
    "site_types": [
      "government_school"
    ],
    "route_type": "project_approval",
    "availability": "ongoing",
    "availability_note": "This is an approval and governance route using permitted school funds, not an additional grant.",
    "timezone": "Australia/Melbourne",
    "source_ids": [
      "vic-school-funded"
    ],
    "facts": "School-funded capital works require school-council governance and, for the applicable project categories/scale, Victorian School Building Authority approval.",
    "interpretation": "A PA or intercom capital project needs the correct approval, procurement and budget treatment even when the school can pay for it.",
    "conditions": [
      "School-held funds are not all interchangeable: maintenance allocations must not simply be redirected to new capital works.",
      "Approval thresholds, exceptions and project classification should be checked in the current policy.",
      "SiteComms does not approve use of school funds or borrowing."
    ],
    "next_step": "Confirm the proposed scope and source of funds with the school council and VSBA before the school enters commitments.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "vic-capital-works",
    "title": "Victorian government-school Capital Works Fund",
    "jurisdictions": [
      "VIC"
    ],
    "site_types": [
      "government_school"
    ],
    "route_type": "grant",
    "availability": "closed",
    "availability_note": "The published 2026 round closed on 12 June 2026. No subsequent open round is assumed.",
    "timezone": "Australia/Melbourne",
    "source_ids": [
      "vic-cwf"
    ],
    "facts": "The fund provides competitive capital-project assistance through specified streams for government schools.",
    "interpretation": "A communications scope may need consideration as part of a properly eligible capital proposal, not an unrelated equipment bundle or ordinary maintenance request.",
    "conditions": [
      "Each stream has its own purpose and exclusions.",
      "Routine maintenance and a project merely assembled to fit a grant are not treated as eligible here.",
      "Future application dates and grant amounts require a new review."
    ],
    "next_step": "Monitor the fund and use the school-funded/department project route to develop an appropriate scope meanwhile.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "close_date": "2026-06-12",
    "avoid_retrospective": "confirm",
    "published_funding_terms": null
  },
  {
    "id": "vic-hearing-access",
    "title": "Victorian Accessible Buildings Program — hearing technology",
    "jurisdictions": [
      "VIC"
    ],
    "site_types": [
      "government_school"
    ],
    "route_type": "internal_allocation",
    "availability": "ongoing",
    "availability_note": "A targeted accessibility process; the school and department determine the required adjustment and support.",
    "timezone": "Australia/Melbourne",
    "source_ids": [
      "vic-abp",
      "vic-hearing"
    ],
    "facts": "The programme can address eligible school access adjustments. Its hearing-technology guidance requires relevant professional assessment and recommended equipment.",
    "interpretation": "Targeted hearing access may be more appropriate than a general PA upgrade for a specific access need. This is not blanket funding for school announcement systems.",
    "conditions": [
      "Use the audiologist’s assessment, the proposed adjustment and the required school process.",
      "The guidance requires portable technology compatible with personal hearing devices; a fixed campus-wide PA replacement is not equivalent.",
      "Identify eligible learning areas and existing equipment compatibility, and avoid duplicating other funded hearing supports.",
      "Do not enter children’s names, medical reports or diagnoses in the SiteComms checker."
    ],
    "next_step": "Have the school’s responsible staff review the department’s hearing-technology guidance with the qualified professional and seek the appropriate approval.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      },
      {
        "field": "project_focus",
        "allowed": [
          "accessibility"
        ],
        "message": "This is a specific hearing-access route, not a general PA, safety or bell replacement fund.",
        "mismatch": "outside_scope"
      },
      {
        "field": "accessibility_evidence",
        "allowed": [
          "yes"
        ],
        "message": "A specific, evidenced disability-access adjustment is required. A general PA replacement is not an accessibility grant application.",
        "mismatch": "review"
      },
      {
        "field": "hearing_evidence",
        "allowed": [
          "yes"
        ],
        "message": "Audiologist-supported need and equipment recommendations must be established.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "vic-building-catholic",
    "title": "Victorian Non-Government Schools Building Fund — Catholic",
    "jurisdictions": [
      "VIC"
    ],
    "site_types": [
      "catholic_school"
    ],
    "route_type": "grant",
    "availability": "closed",
    "availability_note": "The published stream is closed. Use the responsible sector body to check for any newly announced opportunity.",
    "timezone": "Australia/Melbourne",
    "source_ids": [
      "vic-catholic"
    ],
    "facts": "The state building-fund stream supports eligible school capital projects through its sector arrangements.",
    "interpretation": "Communications infrastructure should be considered as part of the eligible whole-building scope, not as a promised standalone electronics grant.",
    "conditions": [
      "Sector, school, project and contribution conditions require confirmation.",
      "An overall sector contribution is not automatically a fixed contribution rate for each school.",
      "Do not assume that a previously funded round is open to new applicants."
    ],
    "next_step": "Ask the school’s sector body about current opportunities and continue preparing an appropriately scoped capital proposal.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "vic-building-independent",
    "title": "Victorian Non-Government Schools Building Fund — Independent",
    "jurisdictions": [
      "VIC"
    ],
    "site_types": [
      "independent_school"
    ],
    "route_type": "grant",
    "availability": "closed",
    "availability_note": "The published stream is closed. Use the responsible sector body to check for any newly announced opportunity.",
    "timezone": "Australia/Melbourne",
    "source_ids": [
      "vic-independent"
    ],
    "facts": "The state building-fund stream supports eligible school capital projects through its sector arrangements.",
    "interpretation": "Communications infrastructure should be considered as part of the eligible whole-building scope, not as a promised standalone electronics grant.",
    "conditions": [
      "Sector, school, project and contribution conditions require confirmation.",
      "An overall sector contribution is not automatically a fixed contribution rate for each school.",
      "Do not assume that a previously funded round is open to new applicants."
    ],
    "next_step": "Ask the school’s sector body about current opportunities and continue preparing an appropriately scoped capital proposal.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "vic-blocks-improvement",
    "title": "Victorian Building Blocks Improvement",
    "jurisdictions": [
      "VIC"
    ],
    "site_types": [
      "early_childhood"
    ],
    "route_type": "grant",
    "availability": "closed",
    "availability_note": "The reviewed programme page is closed; award announcements are not open application windows.",
    "timezone": "Australia/Melbourne",
    "source_ids": [
      "vic-blocks-improvement"
    ],
    "facts": "The programme assists eligible early-childhood providers with specified facility improvements, subject to funded-kindergarten commitments and stream rules.",
    "interpretation": "Fixed communications work could be a component of an approved facility improvement; it is not automatically eligible as IT equipment or routine maintenance.",
    "conditions": [
      "Eligible providers must meet the continuing Free Kinder service commitment.",
      "Routine/cyclical maintenance, retrospective works and portable electronics have restrictions.",
      "Stream caps and historical awards are not funding available to this visitor."
    ],
    "next_step": "Monitor the official grant page and check the intended fixed-equipment cost scope with VSBA before an application or commitment.",
    "rules": [
      {
        "field": "early_service_type",
        "allowed": [
          "non_profit",
          "government"
        ],
        "message": "Confirm the eligible service/operator; for-profit and family-day-care services are not matched.",
        "mismatch": "outside_scope"
      },
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "local_government",
          "school_authority"
        ],
        "message": "Eligible council, not-for-profit or school early-childhood providers are required; private for-profit operators are excluded.",
        "mismatch": "outside_scope"
      },
      {
        "field": "funded_preschool",
        "allowed": [
          "yes"
        ],
        "message": "Confirm funded Free Kinder participation and the required ongoing service commitment.",
        "mismatch": "review"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "avoid_retrospective": "before_approval",
    "published_funding_terms": null
  },
  {
    "id": "vic-blocks-inclusion",
    "title": "Victorian Building Blocks Inclusion — buildings scope",
    "jurisdictions": [
      "VIC"
    ],
    "site_types": [
      "early_childhood"
    ],
    "route_type": "grant",
    "availability": "closed",
    "availability_note": "The reviewed programme is closed. This record concerns the buildings/accessibility scope, not a generic assistive-technology equipment grant.",
    "timezone": "Australia/Melbourne",
    "source_ids": [
      "vic-blocks-inclusion"
    ],
    "facts": "Building Blocks Inclusion distinguishes building/fixed-facility accessibility work from its separate equipment stream.",
    "interpretation": "An evidence-based fixed communication-access adjustment needs item-specific confirmation under the appropriate stream; do not assume an IP device qualifies.",
    "conditions": [
      "The equipment stream excludes assistive technology, IT and software; fixed works cannot be relabelled as portable equipment.",
      "Provider, funded-kindergarten and continuing service requirements apply.",
      "The published closed status must be checked before planning an application."
    ],
    "next_step": "Discuss the access objective and correct stream with the grant administrator, then develop a documented scope without committing expenditure.",
    "rules": [
      {
        "field": "early_service_type",
        "allowed": [
          "non_profit",
          "government"
        ],
        "message": "Confirm the eligible service/operator; for-profit and family-day-care services are not matched.",
        "mismatch": "outside_scope"
      },
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "local_government",
          "school_authority"
        ],
        "message": "Eligible council, not-for-profit or school early-childhood providers are required; private for-profit operators are excluded.",
        "mismatch": "outside_scope"
      },
      {
        "field": "funded_preschool",
        "allowed": [
          "yes"
        ],
        "message": "Confirm funded Free Kinder participation and the required ongoing service commitment.",
        "mismatch": "review"
      },
      {
        "field": "project_focus",
        "allowed": [
          "accessibility"
        ],
        "message": "A documented inclusion/accessibility project is needed, not general PA modernisation.",
        "mismatch": "outside_scope"
      },
      {
        "field": "accessibility_evidence",
        "allowed": [
          "yes"
        ],
        "message": "A specific, evidenced disability-access adjustment is required. A general PA replacement is not an accessibility grant application.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "avoid_retrospective": "before_approval",
    "published_funding_terms": null
  },
  {
    "id": "wa-direct-market",
    "title": "WA public-school Direct to Market / departmental works",
    "jurisdictions": [
      "WA"
    ],
    "site_types": [
      "government_school"
    ],
    "route_type": "procurement",
    "availability": "ongoing",
    "availability_note": "A procurement mechanism for appropriately scoped school-funded work. It does not provide a grant or a school budget.",
    "timezone": "Australia/Perth",
    "source_ids": [
      "wa-supply"
    ],
    "facts": "WA publishes Direct to Market arrangements for eligible low-risk minor works/maintenance and departmental mechanisms for other work.",
    "interpretation": "Before sourcing a communications contractor, the school must confirm the works category, current value limit, risk and the appropriate purchasing route.",
    "conditions": [
      "Direct to Market does not establish available money or permission for every project.",
      "Broader building, electrical, network or higher-risk work may need a different departmental route.",
      "Do not split a project to fit a procurement threshold."
    ],
    "next_step": "Ask the school’s authorised staff to confirm scope and procurement classification before requesting or accepting quotations.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "wa-school-loan",
    "title": "WA non-government-school Low Interest Loan Scheme",
    "jurisdictions": [
      "WA"
    ],
    "site_types": [
      "catholic_school",
      "independent_school"
    ],
    "route_type": "concessional_loan",
    "availability": "ongoing",
    "availability_note": "A repayable capital loan with sector-specific application arrangements, not a grant. Detailed finance assessment is deferred.",
    "timezone": "Australia/Perth",
    "source_ids": [
      "wa-lils"
    ],
    "facts": "The state scheme assists eligible non-government-school capital development through a repayable loan arrangement.",
    "interpretation": "A communications item would need to fit the eligible capital project and loan terms. The existence of the scheme is not finance approval.",
    "conditions": [
      "Confirm the relevant sector application cycle and planned drawdown year.",
      "Repayment obligations and authorised borrowing must be reviewed separately.",
      "No interest rate, loan affordability, credit decision or approved amount is calculated here."
    ],
    "next_step": "Contact the school’s sector/body and review the official scheme. Treat this as a finance-phase lead, not money awarded to the project.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "wa-lotterywest",
    "title": "Lotterywest community equipment / facilities pathway",
    "jurisdictions": [
      "WA"
    ],
    "site_types": [
      "community",
      "sport_recreation",
      "early_childhood",
      "healthcare",
      "other",
      "government_school",
      "catholic_school",
      "independent_school"
    ],
    "route_type": "grant",
    "availability": "ongoing",
    "availability_note": "Contact Lotterywest to identify the right current opportunity and timing; this is not a blanket open equipment entitlement.",
    "timezone": "Australia/Perth",
    "source_ids": [
      "wa-lotterywest",
      "wa-lottery-opportunities"
    ],
    "facts": "Lotterywest supports eligible not-for-profit and local-government community projects, including appropriate equipment and capital facilities.",
    "interpretation": "A communications improvement may be relevant where it delivers a demonstrable community outcome outside excluded core-service or private benefit.",
    "conditions": [
      "Core government agency business, private benefit, ordinary operating support and retrospective costs have restrictions.",
      "Applicant/auspice eligibility, tenure, community outcomes and the proposed activity must be confirmed.",
      "A school or healthcare label alone is not evidence of eligibility for its normal infrastructure."
    ],
    "next_step": "Discuss the community outcome, legal applicant and cost scope with Lotterywest before making commitments.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "local_government",
          "school_parent_body",
          "school_authority",
          "social_enterprise",
          "unincorporated_group"
        ],
        "message": "The applicant must meet Lotterywest’s not-for-profit or local-government requirements; private business, individuals and government agencies are not an eligible substitute.",
        "mismatch": "outside_scope"
      },
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "local_government"
        ],
        "message": "Confirm the actual not-for-profit legal structure and authority. A parents’ association, school body, social enterprise or unincorporated group is not automatically eligible; unincorporated groups have specific grant limits.",
        "mismatch": "review"
      },
      {
        "field": "community_benefit",
        "allowed": [
          "yes"
        ],
        "message": "Identify a genuine wider community benefit, not only a private or operational benefit.",
        "mismatch": "outside_scope"
      },
      {
        "field": "core_service",
        "allowed": [
          "no"
        ],
        "message": "Ordinary government-funded or routine core-service infrastructure is outside this programme’s general community-project purpose.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "avoid_retrospective": "before_approval",
    "published_funding_terms": null
  },
  {
    "id": "sa-school-planning",
    "title": "SA government-school budget and infrastructure planning",
    "jurisdictions": [
      "SA"
    ],
    "site_types": [
      "government_school"
    ],
    "route_type": "project_approval",
    "availability": "ongoing",
    "availability_note": "A school/department planning starting point, not a verified open capital-grant programme.",
    "timezone": "Australia/Adelaide",
    "source_ids": [
      "sa-school-budgets",
      "sa-infrastructure-plan"
    ],
    "facts": "The department describes the site leader’s budget role and governing-council budget responsibilities, alongside longer-term public education infrastructure planning.",
    "interpretation": "The practical first step is to identify departmental responsibility and the school’s permitted budget route for the actual communications project.",
    "conditions": [
      "The public sources reviewed do not establish a dedicated school PA grant or current project-approval thresholds.",
      "A governing-council budget decision is not proof that every works or procurement approval has been obtained.",
      "School staff need the current departmental process; no private portal access was available in this review."
    ],
    "next_step": "Ask the principal/business manager to confirm budget, asset responsibility and the department’s current facilities/procurement process before commitment.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority"
        ],
        "message": "The school or its authorised system/body needs to pursue this route; a parents’ association is not automatically the applicant.",
        "mismatch": "outside_scope"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "sa-flying-start",
    "title": "SA Flying Start Infrastructure Grants",
    "jurisdictions": [
      "SA"
    ],
    "site_types": [
      "early_childhood"
    ],
    "route_type": "grant",
    "availability": "ongoing",
    "availability_note": "The current programme webpage describes a rolling intake. Confirm current arrangements and project fit with the office.",
    "timezone": "Australia/Adelaide",
    "source_ids": [
      "sa-flying",
      "sa-flying-guidelines"
    ],
    "facts": "The programme supports eligible non-government early-childhood infrastructure that creates additional preschool places and meets the programme’s continuing service commitments.",
    "interpretation": "Fixed communications infrastructure could be considered as one component of an eligible capacity-creating project. A standalone PA replacement without additional places is not the intended pathway.",
    "conditions": [
      "Eligible non-profit/council/non-government-school provider or landowner arrangements must be checked. Government preschools, for-profit services and family day care are outside the published scope.",
      "Additional approved places, need, service approval, tenure, co-contributions and long-term preschool commitments require assessment.",
      "General maintenance, no-capacity-gain projects and already-contracted works have restrictions.",
      "A programme funding percentage must not be applied automatically to an equipment quote."
    ],
    "next_step": "Use the office’s pre-application advice to establish additional places, applicant/landowner arrangements, full capital scope and the proposed fixed communications costs.",
    "rules": [
      {
        "field": "early_service_type",
        "allowed": [
          "non_profit"
        ],
        "message": "Flying Start does not match government preschools, for-profit operators or family day care.",
        "mismatch": "outside_scope"
      },
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "local_government",
          "school_authority"
        ],
        "message": "An eligible non-government/non-profit provider or permitted landowner arrangement is required; for-profit and government-preschool operators are not matched.",
        "mismatch": "outside_scope"
      },
      {
        "field": "adds_places",
        "allowed": [
          "yes"
        ],
        "message": "Additional eligible preschool places are central to Flying Start; an ordinary replacement without a capacity increase does not fit.",
        "mismatch": "outside_scope"
      },
      {
        "field": "funded_preschool",
        "allowed": [
          "yes"
        ],
        "message": "Confirm current delivery or documented plans to deliver the funded three-year-old preschool programme, and the long-term service commitment.",
        "mismatch": "review"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "avoid_retrospective": "before_application",
    "published_funding_terms": "Guidelines describe a usual state contribution of up to 50% of eligible preschool-space project costs; some specified exceptional cases differ. Other spaces and ineligible costs need separate funding. This is not 50% back on a PA quote."
  },
  {
    "id": "sa-school-loans",
    "title": "SA School and Preschool Loans — Round 4",
    "jurisdictions": [
      "SA"
    ],
    "site_types": [
      "catholic_school",
      "independent_school",
      "early_childhood"
    ],
    "route_type": "concessional_loan",
    "availability": "closed",
    "availability_note": "Round 4 is closed. This is a repayable capital-loan signpost for the later finance phase, not an available grant.",
    "timezone": "Australia/Adelaide",
    "source_ids": [
      "sa-school-loans"
    ],
    "facts": "The published scheme provides capital loans for eligible non-government schools and qualifying not-for-profit early-childhood organisations.",
    "interpretation": "A project would need to satisfy the scheme’s capital scope and loan terms; the checker makes no borrowing or affordability assessment.",
    "conditions": [
      "No new loan round, interest rate, approval or repayment calculation is inferred.",
      "Authorised borrowing and the legal applicant need separate review.",
      "A closed capital-loan programme should not be promoted as a small standalone PA grant."
    ],
    "next_step": "Monitor SAFA’s official page and seek authorised finance advice for any subsequent opportunity.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "school_authority",
          "not_for_profit"
        ],
        "message": "The borrower must meet the scheme’s school/preschool organisational conditions.",
        "mismatch": "outside_scope"
      },
      {
        "field": "building_component",
        "allowed": [
          "yes"
        ],
        "message": "Confirm that the communications scope belongs to an eligible building, extension or refurbishment project. Standalone equipment is not assumed to qualify.",
        "mismatch": "review"
      }
    ],
    "publication": "active",
    "published_funding_terms": null
  },
  {
    "id": "sa-julia-farr",
    "title": "SA Julia Farr Disability Inclusion Grants — Round 1 2026–27",
    "jurisdictions": [
      "SA"
    ],
    "site_types": [
      "community",
      "sport_recreation",
      "early_childhood",
      "healthcare",
      "other",
      "government_school",
      "catholic_school",
      "independent_school",
      "tertiary"
    ],
    "route_type": "grant",
    "availability": "open_at_review",
    "availability_note": "Published closing time: 16 October 2026, 1 pm South Australian time.",
    "timezone": "Australia/Adelaide",
    "source_ids": [
      "sa-jfdi",
      "sa-jfdi-guidelines"
    ],
    "facts": "The round supports eligible organisations’ disability inclusion and participation projects. Applicant and expenditure exclusions are substantial.",
    "interpretation": "An accessible communication or wayfinding project may merit an item-specific discussion. A routine PA, telephone system, IT replacement or already-funded core service must not be relabelled as disability inclusion.",
    "conditions": [
      "Schools, universities and other educational institutions are excluded. Eligible incorporated non-profits, councils and qualifying certified social enterprises have further conditions.",
      "Gaming-machine organisations, routine/core phone and IT costs, and already-funded project top-ups are excluded.",
      "Project co-design, accessible participation, appropriate evidence and current supplier quotes matter. A SiteComms planning estimate is not a supplier quotation.",
      "The grant application belongs with DHS; no personal disability records are needed in this checker."
    ],
    "next_step": "Check applicant exclusions first, then discuss the specific access outcome and cost items with DHS before preparing an application.",
    "rules": [
      {
        "field": "applicant_type",
        "allowed": [
          "not_for_profit",
          "local_government",
          "social_enterprise"
        ],
        "message": "A qualifying incorporated non-profit, council or certified social enterprise is required; confirm all legal and certification criteria.",
        "mismatch": "outside_scope"
      },
      {
        "field": "site_type",
        "allowed": [
          "community",
          "sport_recreation",
          "healthcare",
          "other"
        ],
        "message": "Educational institutions cannot apply. A school/tertiary/early-learning site requires confirmation of the actual legal applicant and project purpose; a separate community entity must not be presumed eligible.",
        "mismatch": "review"
      },
      {
        "field": "project_focus",
        "allowed": [
          "accessibility"
        ],
        "message": "This is a disability inclusion project route, not ordinary communications renewal.",
        "mismatch": "outside_scope"
      },
      {
        "field": "accessibility_evidence",
        "allowed": [
          "yes"
        ],
        "message": "A specific, evidenced disability-access adjustment is required. A general PA replacement is not an accessibility grant application.",
        "mismatch": "review"
      },
      {
        "field": "community_benefit",
        "allowed": [
          "yes"
        ],
        "message": "Identify a genuine wider community benefit, not only a private or operational benefit.",
        "mismatch": "outside_scope"
      },
      {
        "field": "core_service",
        "allowed": [
          "no"
        ],
        "message": "Ordinary government-funded or routine core-service infrastructure is outside this programme’s general community-project purpose.",
        "mismatch": "review"
      },
      {
        "field": "gaming",
        "allowed": [
          "no"
        ],
        "message": "Gaming-machine licence holders/operators are excluded.",
        "mismatch": "outside_scope"
      },
      {
        "field": "already_grant_funded",
        "allowed": [
          "no"
        ],
        "message": "A top-up for this same already-grant-funded project is not treated as eligible.",
        "mismatch": "outside_scope"
      }
    ],
    "publication": "active",
    "opens": "2026-09-03T01:30:00Z",
    "closes": "2026-10-16T02:30:00Z",
    "avoid_retrospective": "confirm",
    "published_funding_terms": "Published tiers: up to A$20,000 over 12 months, or A$100,000 over 24 months. The tier ceiling is not an eligibility decision or predicted award."
  }
];
