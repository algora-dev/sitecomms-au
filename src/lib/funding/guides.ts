import type { ProjectState } from "../jurisdictions";
export interface StateFundingGuide {
  state: ProjectState; slug: string; name: string; description: string;
  sections: { title: string; text: string; source_ids: string[] }[];
  gap: string;
}
/** State-specific editorial explanation. Programme facts/status remain in the shared catalogue. */
export const STATE_FUNDING_GUIDES: readonly StateFundingGuide[] = [
  {
    state: "QLD", slug: "queensland", name: "Queensland",
    description: "Separate state-school minor works, non-state-school capital assistance and community applicant routes before budgeting a Queensland communications project.",
    sections: [
      { title: "A state school and its parents’ association take different routes", text: "For a government school, start with the principal’s minor-works and regional infrastructure process. Do not treat that internal allocation as a grant the school can simply claim. For a community fund, the legal applicant matters separately: the GCBF rules exclude schools themselves while allowing qualifying P&C/P&F associations. School ownership or parent involvement does not remove programme conditions.", source_ids: ["qld-minor", "qld-gcbf-eligibility"] },
      { title: "Non-state schools should develop the whole capital brief", text: "The State Capital Assistance Scheme uses Capital Assistance Authorities. Commonwealth capital grants use the relevant BGA arrangements. Before obtaining a narrow equipment quote, establish whether the proposal is a facility upgrade with a communications component or just a replacement purchase. Standalone equipment has material restrictions in the Commonwealth guidelines.", source_ids: ["qld-scas", "cgp-guidelines"] },
      { title: "Community benefit is not the same as general business benefit", text: "For a community facility or eligible early-learning not-for-profit, establish the actual applicant, public benefit and the expenditure rules. GCBF Round 127 has a fixed closing date; a saved result must not be treated as an indefinitely open application. Orders and deposits before approval can undermine a project’s fit.", source_ids: ["qld-gcbf", "qld-gcbf-items"] },
    ],
    gap: "This release does not establish a dedicated Queensland early-childhood capital grant for every service. A not-for-profit community route is not proof that ordinary childcare operating infrastructure is fundable. Residential aged care uses the separately qualified national ACCAP records.",
  },
  {
    state: "NSW", slug: "new-south-wales", name: "New South Wales",
    description: "Plan NSW school works, BGA capital proposals, community projects and specific preschool access adjustments without confusing programme existence with open funding.",
    sections: [
      { title: "Government-school works need the department’s route", text: "A school-funded proposal and a department-funded proposal can use the departmental works process, but permission and funding are separate decisions. Identify whether the task is a new works proposal or maintenance, then involve the principal and the local School Infrastructure team. A supplier quotation does not replace that approval chain.", source_ids: ["nsw-works"] },
      { title: "Confirm BGAS dates with the BGA, not a page badge", text: "The reviewed Building Grants Assistance Scheme page contains conflicting status labels. This catalogue preserves that uncertainty rather than advertising open applications. The school’s sector BGA is the practical place to establish application timing, whole-project eligibility and whether essential communications equipment is part of the permitted capital scope.", source_ids: ["nsw-bgas", "bga-contacts"] },
      { title: "Early-learning capital and child-access funding are different", text: "The Building Early Learning Places page retains an Open label but publishes a March 2025 closing date, so that round is not treated as open. The separate 2026 Inclusive Environments child-based stream has its own deadline and specialised adjustment rules. Generic IT or PA equipment is not automatically specialised access equipment, and the service-readiness stream has different entry conditions.", source_ids: ["nsw-belp", "nsw-ie"] },
      { title: "Community projects need a real applicant and the right round", text: "The Community Building Partnership 2026 intake is closed. Its eligible community applicants and staged application process must not be generalised into a permanently available school or council grant. Prepare community outcomes, tenure and realistic quotes for a genuinely announced opportunity.", source_ids: ["nsw-cbp"] },
    ],
    gap: "No general funding entitlement is inferred for private childcare, retirement villages, tertiary institutions or ordinary commercial sites. National aged-care support remains opportunity-specific, and other NSW programmes may exist outside this reviewed catalogue.",
  },
  {
    state: "VIC", slug: "victoria", name: "Victoria",
    description: "Distinguish Victorian school-funded works, closed capital rounds, targeted hearing access and eligible early-childhood building programmes.",
    sections: [
      { title: "School funds still need the correct authority and purpose", text: "A government school may have a school-funded capital route, but the funding source and VSBA/school-council requirements still matter. Maintenance allocations are not simply an unrestricted new-capital budget. The published Capital Works Fund round is closed; the school’s project planning should not depend on a new grant round being assumed.", source_ids: ["vic-school-funded", "vic-cwf"] },
      { title: "Hearing access is a specific adjustment, not a campus PA label", text: "The Accessible Buildings Program’s hearing-technology guidance requires the relevant assessment and equipment recommendations. Start with the person’s educational access requirements and the qualified professional, not a preferred speaker brand. A schoolwide replacement does not become eligible merely by being described as inclusive.", source_ids: ["vic-abp", "vic-hearing"] },
      { title: "Keep non-government school streams separate", text: "Catholic and independent school building-fund arrangements are not interchangeable. The reviewed state streams are closed. Schools can discuss their current capital pipeline with their sector body and BGA, but this catalogue does not assume an open state round or apply a sector-wide co-contribution as an individual school rule.", source_ids: ["vic-catholic", "vic-independent", "bga-contacts"] },
      { title: "For early childhood, fixed works and equipment are not the same stream", text: "The reviewed Building Blocks Improvement and Inclusion pages are closed. Eligible provider and funded-kindergarten commitments matter, as do the distinctions between buildings, fixed fittings and portable equipment. In particular, the Inclusion equipment stream’s technology exclusions must not be bypassed by calling generic IP equipment an accessibility project.", source_ids: ["vic-blocks-improvement", "vic-blocks-inclusion"] },
    ],
    gap: "This release has not substantiated a general Victorian community PA grant for every not-for-profit. School, kindergarten and national aged-care routes are researched separately; a no-match result is not a finding that all other grants are unavailable.",
  },
  {
    state: "WA", slug: "western-australia", name: "Western Australia",
    description: "Understand WA school procurement, non-government-school capital routes and Lotterywest community outcomes before assuming there is grant money for a system.",
    sections: [
      { title: "Direct to Market is a purchasing route, not new money", text: "A WA public school must first establish the available budget and correct works classification. Direct to Market applies to appropriately scoped school-funded work within its conditions. It is not a blanket PA grant, an unrestricted contractor appointment or a reason to split a larger project.", source_ids: ["wa-supply"] },
      { title: "A low-interest loan must remain a loan", text: "Non-government schools can investigate Commonwealth capital assistance through their BGA and the separate WA Low Interest Loan Scheme. The latter carries repayment and application-cycle obligations. This funding release deliberately signposts it without estimating finance approval, interest or monthly payments.", source_ids: ["cgp", "wa-lils"] },
      { title: "Lotterywest needs a community outcome and an eligible project", text: "Equipment or capital scope alone is not enough. Lotterywest assesses eligible organisations and community outcomes, with restrictions on core government activity, private benefit and retrospective costs. A community hall access or announcement project needs to explain who benefits and why this is the appropriate funding route; ordinary school or clinical infrastructure is not automatically matched.", source_ids: ["wa-lotterywest", "wa-lottery-opportunities"] },
    ],
    gap: "No unverified WA early-childhood programme or broad retirement-village grant has been inserted. Eligible community organisations may have a Lotterywest discussion; residential aged care has separate national programme restrictions. Regional distance is a delivery consideration, not an automatic grant entitlement.",
  },
  {
    state: "SA", slug: "south-australia", name: "South Australia",
    description: "Plan SA school budgets, non-government capital proposals, additional preschool places and defined disability-inclusion projects with clear funding boundaries.",
    sections: [
      { title: "Government schools: establish the internal process first", text: "The public sources explain governing-council budget responsibilities and the state’s infrastructure planning context, but do not establish a dedicated open school-PA grant or every works delegation. The responsible school staff should confirm the actual funding, facilities and procurement route. A long-term infrastructure plan is not an application invitation.", source_ids: ["sa-school-budgets", "sa-infrastructure-plan"] },
      { title: "Non-government schools: grants and capital loans stay separate", text: "The Commonwealth BGA route can be relevant to eligible capital development. SAFA’s published School and Preschool Loans Round 4 is closed and is a repayable finance mechanism, not an equipment grant. Neither source establishes an automatic subsidy for a standalone paging replacement.", source_ids: ["cgp-guidelines", "bga-contacts", "sa-school-loans"] },
      { title: "Flying Start is about additional preschool places", text: "Flying Start Infrastructure Grants can be relevant where an eligible non-government early-childhood project creates additional approved preschool places. The applicant, site/landowner arrangements, service commitments and co-funding all need confirmation. Fixed communications may be one component of that wider scope; ordinary replacement without added capacity is not the same proposition.", source_ids: ["sa-flying", "sa-flying-guidelines"] },
      { title: "Disability inclusion requires more than a new phone or PA system", text: "The Julia Farr round has a specific closing time and substantial applicant and cost exclusions. An eligible community organisation’s accessible communication or wayfinding proposal needs a real participation outcome and funder confirmation. Educational institutions, ordinary core phone/IT costs, gaming-machine organisations and top-ups for the same already-funded project are not quietly treated as eligible.", source_ids: ["sa-jfdi", "sa-jfdi-guidelines"] },
    ],
    gap: "This is selected SA pathway research, not a full grants directory. Other state, local or philanthropic opportunities require their own evidence review. Residential aged care is assessed separately from retirement-village operation under the national ACCAP records.",
  },
];
