import { JURISDICTIONS } from "../jurisdictions";

const yesNo = [["unknown", "Not sure / not established"], ["yes", "Yes"], ["no", "No"]] as const;
/** One public option registry drives the form and the HTTP input schema. No free text or personal data. */
export const FUNDING_FIELDS = {
  state: { label: "Where is the project?", options: JURISDICTIONS.map(s => [s.code, s.name] as const) },
  site_type: { label: "What kind of site is it?", options: [
    ["government_school", "Government school"], ["catholic_school", "Catholic school"], ["independent_school", "Independent school"],
    ["early_childhood", "Early learning / preschool / childcare"], ["residential_aged_care", "Residential aged care home"],
    ["retirement_village", "Retirement village (not residential aged care)"], ["community", "Community / not-for-profit facility"],
    ["sport_recreation", "Sport / recreation facility"], ["healthcare", "Other healthcare facility"], ["tertiary", "University / TAFE / tertiary"],
    ["commercial", "Commercial / industrial / business site"], ["other", "Another type of site"],
  ] as const },
  applicant_type: { label: "Who owns/runs the site or would apply?", options: [
    ["unknown", "Not sure yet"], ["school_authority", "School / school system / authorised school body"],
    ["school_parent_body", "School parents’ association (P&C / P&F)"], ["not_for_profit", "Incorporated not-for-profit / charity"],
    ["local_government", "Local council"], ["other_government", "Other government organisation"],
    ["private_business", "For-profit operator / business"], ["social_enterprise", "Certified social enterprise"], ["unincorporated_group", "Unincorporated not-for-profit group"], ["individual", "Individual"],
  ] as const },
  project_focus: { label: "What is the project?", options: [
    ["unknown", "Not sure yet"], ["communications", "Replace or upgrade PA / paging / bells / intercom"],
    ["building", "New building, extension or substantial refurbishment"], ["maintenance", "Repair or maintenance"],
    ["accessibility", "A specific disability-access or hearing-access adjustment"], ["urgent_failure", "Urgent infrastructure failure / safety issue"],
    ["operating_costs", "Subscriptions, staffing or other ongoing costs"],
  ] as const },
  stage: { label: "What stage is the project at?", options: [
    ["unknown", "Not sure"], ["planning", "Planning only"], ["quotes", "Getting quotes — no purchase or contract yet"],
    ["committed", "Order, deposit or contract already committed"], ["started", "Work already started"], ["completed", "Work completed / equipment purchased"],
  ] as const },
  tenure: { label: "Who controls the property?", options: [
    ["unknown", "Not confirmed"], ["owned", "Applicant owns the property"], ["consent", "Leased / another owner, with written permission"],
    ["pending", "Owner permission or lease terms still need resolving"],
  ] as const },
  building_component: { label: "Is the communications work part of a building, extension or refurbishment project?", options: yesNo },
  community_benefit: { label: "Does this project have a defined wider community benefit?", options: yesNo },
  core_service: { label: "Is this ordinary operating infrastructure or a service already funded by government?", options: yesNo },
  accessibility_evidence: { label: "Is there a documented disability-access need and a proposed adjustment?", options: yesNo },
  hearing_evidence: { label: "Has a qualified audiologist recommended the school hearing technology?", options: yesNo },
  funded_preschool: { label: "Is the required state-funded preschool participation or programme commitment established?", options: yesNo },
  early_service_type: { label: "How is this early-childhood service operated?", options: [
    ["unknown", "Not established"], ["government", "Government preschool / service"],
    ["non_profit", "Not-for-profit community / council / non-government school service"],
    ["for_profit", "For-profit provider"], ["family_day_care", "Family day care"],
  ] as const },
  adds_places: { label: "Will the project create additional approved preschool / early-learning places?", options: yesNo },
  eligible_nsw_preschool: { label: "Is this a Start Strong community / mobile preschool, for places NOT Child Care Subsidy approved?", options: yesNo },
  child_adjustment: { label: "Is the adjustment for an enrolled preschool child with an identified ongoing support need?", options: yesNo },
  registered_care_provider: { label: "Is the applicant an authorised residential aged care provider?", options: yesNo },
  targeted_care_need: { label: "Does the proposal address targeted aged-care access needs (for example rural/remote or specialist care gaps)?", options: yesNo },
  invitation: { label: "Has the department invited this organisation to the relevant ACCAP opportunity?", options: yesNo },
  gaming: { label: "Does the applicant hold a gaming-machine licence or operate gaming machines?", options: yesNo },
  already_grant_funded: { label: "Has another grant already funded this same project or cost?", options: yesNo },
} as const;
export type FundingField = keyof typeof FUNDING_FIELDS;
export type FundingInput = Partial<Record<FundingField, string>>;
export const REQUIRED_FUNDING_FIELDS: FundingField[] = ["state", "site_type", "applicant_type", "project_focus", "stage"];
export function fieldLabel(field: FundingField, value: string): string {
  return FUNDING_FIELDS[field].options.find(option => option[0] === value)?.[1] ?? value;
}
export const FUNDING_INPUT_SCHEMA = {
  type: "object", additionalProperties: false, required: REQUIRED_FUNDING_FIELDS,
  properties: Object.fromEntries(Object.entries(FUNDING_FIELDS).map(([key, field]) => [key, {
    type: "string", enum: field.options.map(option => option[0]), description: field.label,
  }])),
} as const;
/** Questions relevant to the selected branch. Unknown stays unknown; hidden fields are never inferred. */
export function relevantDetailFields(input: FundingInput): FundingField[] {
  const fields: FundingField[] = ["tenure", "building_component", "already_grant_funded"];
  const school = input.site_type?.endsWith("_school");
  if (!school || input.applicant_type === "school_parent_body") fields.push("community_benefit", "core_service");
  if (input.project_focus === "accessibility") fields.push("accessibility_evidence");
  if (input.site_type === "government_school" && input.state === "VIC" && input.project_focus === "accessibility") fields.push("hearing_evidence");
  if (input.site_type === "early_childhood") {
    fields.push("early_service_type", "funded_preschool", "adds_places");
    if (input.state === "NSW" && input.project_focus === "accessibility") fields.push("eligible_nsw_preschool", "child_adjustment");
  }
  if (input.site_type === "residential_aged_care") fields.push("registered_care_provider", "targeted_care_need", "invitation");
  if (input.state === "SA" && ["not_for_profit", "local_government", "social_enterprise"].includes(input.applicant_type ?? "")) fields.push("gaming");
  return [...new Set(fields)];
}
