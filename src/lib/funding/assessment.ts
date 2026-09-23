import { resultEnvelope, InputValidationError, type InputIssue, type SourceReference, type FreshnessState } from "../agent-ready/contracts";
import { projectStateName } from "../jurisdictions";
import { FUNDING_FEATURES, FUNDING_FIELDS, REQUIRED_FUNDING_FIELDS, type FundingFeature, type FundingField, type FundingInput, type FundingInputKey } from "./questions";
import { FUNDING_PATHWAYS, FUNDING_SOURCES, FUNDING_CATALOGUE_VERSION, FUNDING_RULE_VERSION, PRIORITY_FUNDING_STATES } from "./catalogue";
import { ROUTE_LABELS, type FundingPathway, type FundingSource, type FundingResult, type PathwayAssessment, type Availability } from "./types";

/** Trusted application/test context only. Never populated from HTTP/browser request fields. */
export interface FundingAssessmentContext {
  now?: Date;
  catalogue?: readonly FundingPathway[];
  sources?: readonly FundingSource[];
  unavailable?: boolean;
}
const LIMITATIONS = [
  "This is a researched pathway shortlist, not a grant application, eligibility decision, approval, award or funding probability.",
  "Programme facts come from the linked official sources. Communications-project relevance is SiteComms interpretation and requires the funder’s confirmation.",
  "This is a dated editorial catalogue, not a live lookup of every grant. No result means no route identified in this catalogue, not that funding does not exist.",
  "No grant amount is calculated or deducted from your project estimate. Do not combine schemes for the same cost or assume retrospective reimbursement.",
  "No enquiry is sent and no information is forwarded to providers by running this assessment.",
];
const STATUSES: Record<Availability, string> = {
  open_at_review: "Within published application dates — recheck with funder",
  ongoing: "Ongoing route — authority confirmation required",
  closed: "Published round closed",
  invitation_only: "Invitation only — not open to unsolicited applications",
  confirm_status: "Conflicting or unclear status — confirm with authority",
  monitor: "Programme watchlist — no general open round established",
};
export function dateInZone(date: Date, zone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const value = (type: string) => parts.find(p => p.type === type)?.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}
/** Date-only deadlines do not invent a midnight cut-off: the closing day explicitly requires confirmation. */
export function pathwayAvailability(pathway: FundingPathway, now: Date): { availability: PathwayAssessment["availability"]; label: string } {
  const today = dateInZone(now, pathway.timezone);
  if ((pathway.closes && now.getTime() >= Date.parse(pathway.closes)) || (pathway.close_date && today > pathway.close_date)) {
    return { availability: "closed", label: "Published deadline passed — no later round assumed" };
  }
  if ((pathway.opens && now.getTime() < Date.parse(pathway.opens)) || (pathway.open_date && today < pathway.open_date)) return { availability: "not_yet_open", label: "Before published opening date" };
  if (pathway.close_date === today && pathway.availability === "open_at_review") return { availability: "closing_today", label: "Published closing day — confirm exact cut-off before applying" };
  return { availability: pathway.availability, label: STATUSES[pathway.availability] };
}
function validDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function sourceFreshness(records: readonly FundingSource[], now: Date): FreshnessState {
  const today = now.toISOString().slice(0, 10);
  if (records.some(source => !validDateOnly(source.reviewed) || !validDateOnly(source.review_due) || source.reviewed > today || source.review_due <= source.reviewed)) return "unavailable";
  // Conservative: on the due date a new review is required, rather than retaining a fresh badge all day.
  return records.some(source => source.review_due <= today) ? "stale" : "within_review_period";
}
function toReference(source: FundingSource, now: Date): SourceReference {
  return {
    source_id: source.id, title: source.title, authority: source.publisher,
    owner: "SiteComms editorial catalogue; programme decisions remain with the cited authority",
    reference_path: "/funding", reference_url: source.url, source_version: `${FUNDING_CATALOGUE_VERSION}:${source.id}`,
    reviewed_at: source.reviewed, review_due_at: source.review_due,
    approval_status: "provisional", freshness: sourceFreshness([source], now),
  };
}
function validate(raw: unknown): { inputs: FundingInput; issues: InputIssue[] } {
  const issues: InputIssue[] = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || ![Object.prototype, null].includes(Object.getPrototypeOf(raw))) {
    throw new InputValidationError([{ field: "request", code: "invalid", message: "Supply a structured funding request using the published fields." }]);
  }
  if (Object.keys(raw).length > 40) throw new InputValidationError([{ field: "request", code: "invalid", message: "Too many fields in the funding request." }]);
  const inputs: FundingInput = {};
  const allowedFeatures = new Set<string>(FUNDING_FEATURES.map(option => option[0]));

  for (const [key, value] of Object.entries(raw)) {
    if (key === "features") {
      if (!Array.isArray(value) || value.length === 0 || value.length > FUNDING_FEATURES.length || value.some(item => typeof item !== "string" || !allowedFeatures.has(item)) || new Set(value).size !== value.length) {
        issues.push({ field: "features", code: "invalid", message: "Choose at least one supported communications feature." });
      } else {
        inputs.features = value as FundingFeature[];
      }
      continue;
    }
    if (!Object.hasOwn(FUNDING_FIELDS, key)) {
      issues.push({ field: key.slice(0, 80), code: "unknown_field", message: "This field is not part of the funding assessment contract." });
      continue;
    }
    const field = key as FundingField;
    if (typeof value !== "string" || !FUNDING_FIELDS[field].options.some(o => o[0] === value)) {
      issues.push({ field, code: "invalid", message: `Choose a supported value for ${FUNDING_FIELDS[field].label}` });
    } else inputs[field] = value;
  }

  for (const field of REQUIRED_FUNDING_FIELDS) if (!Object.hasOwn(raw, field)) issues.push({ field, code: "missing", message: FUNDING_FIELDS[field].label });
  if (!Object.hasOwn(raw, "features")) issues.push({ field: "features", code: "missing", message: "Choose what you want the communications system to do." });

  // The public user describes the communications functions they want. The
  // specialised project classification stays internal: a specific visual/hearing
  // access requirement can surface accessibility routes; everything else is
  // ordinary communications infrastructure unless a controlled integration
  // explicitly supplies a different supported project_focus.
  if (!inputs.project_focus && inputs.features?.length) {
    inputs.project_focus = inputs.features.includes("accessibility_alerts") ? "accessibility" : "communications";
  }

  for (const field of Object.keys(FUNDING_FIELDS) as FundingField[]) if (!inputs[field] && !REQUIRED_FUNDING_FIELDS.includes(field)) inputs[field] = "unknown";
  if (inputs.project_focus === "building" && inputs.building_component === "no") {
    issues.push({ field: "building_component", code: "conflict", message: "The main project is a building project but the communications work is stated not to be part of it. Resolve that scope before assessing." });
  }
  return { inputs, issues };
}
function assessPathway(pathway: FundingPathway, inputs: FundingInput, now: Date, allSources: readonly FundingSource[]): PathwayAssessment {
  const records = pathway.source_ids.map(id => allSources.find(s => s.id === id));
  const known = records.filter((s): s is FundingSource => !!s);
  const withdrawn = pathway.publication === "withdrawn";
  const freshness: FreshnessState = withdrawn ? "withdrawn" : known.length !== records.length || !records.length ? "unavailable" : sourceFreshness(known, now);
  const availability = pathwayAvailability(pathway, now);
  const reasons: string[] = [pathway.availability_note];
  const questions: FundingField[] = [];
  let outside = false;
  let needsReview = false;
  for (const rule of pathway.rules) {
    const value = inputs[rule.field];
    if (!value || value === "unknown") {
      questions.push(rule.field);
      reasons.push(rule.message);
      // The public checker intentionally asks only the five high-value project
      // questions. Funder-specific detail fields remain conditions to confirm
      // after a pathway is found; they do not block an initial shortlist.
      if (REQUIRED_FUNDING_FIELDS.includes(rule.field)) needsReview = true;
    } else if (!rule.allowed.includes(value)) {
      reasons.push(rule.message);
      if (rule.mismatch === "review") needsReview = true; else outside = true;
    }
  }
  if (["committed", "started", "completed"].includes(inputs.stage ?? "") && pathway.avoid_retrospective) {
    needsReview = true;
    reasons.push(pathway.avoid_retrospective === "before_application"
      ? "Costs already committed need their timing checked against the application date. This programme’s rule is not the same as a before-approval rule; no retrospective eligibility is assumed."
      : pathway.avoid_retrospective === "before_approval"
        ? "An order, contract, deposit or completed work is a material restriction. Confirm whether the required approval existed before commitment; this checker cannot retrospectively approve costs."
        : "Check project commitment and start dates with the administrator before assuming existing costs can be supported.");
  } else if (inputs.stage === "unknown" && pathway.avoid_retrospective) {
    needsReview = true; questions.push("stage"); reasons.push("Establish whether any order, contract, deposit or work has already been committed.");
  }
  if (pathway.route_type === "grant" && inputs.project_focus === "operating_costs") {
    outside = true; reasons.push("The records in this capital/equipment catalogue do not substantiate ordinary subscriptions, staffing or continuing operating costs.");
  }
  if (pathway.route_type === "grant" && inputs.tenure !== "owned" && inputs.tenure !== "consent") {
    questions.push("tenure");
    reasons.push("Resolve property control, any lease requirements and written owner permission where relevant to the proposed works.");
    // Unknown tenure is a follow-up condition, not a reason to make the initial
    // public questionnaire longer. An explicit unresolved/pending answer still
    // needs review when supplied through a structured integration.
    if (inputs.tenure && inputs.tenure !== "unknown") needsReview = true;
  }
  if (pathway.route_type === "grant" && inputs.already_grant_funded === "yes") {
    needsReview = true; reasons.push("The same cost must not be double-funded. Obtain written programme advice; this tool does not aggregate grant amounts or authorise co-funding.");
  }
  if (freshness === "stale") reasons.push("At least one source is due for editorial re-review. Programme facts may still be useful, but current availability and rules must be rechecked before action.");
  if (freshness === "unavailable" || freshness === "withdrawn") reasons.push("The required catalogue evidence is missing, unavailable or withdrawn. No positive pathway conclusion is supported.");
  let match: PathwayAssessment["match"] = outside ? "outside_scope" : needsReview ? "confirm_details" : "potential_pathway";
  if (["unavailable", "withdrawn"].includes(freshness)) match = "unavailable";
  else if (freshness === "stale" || ["confirm_status", "invitation_only", "monitor"].includes(availability.availability)) {
    if (match !== "outside_scope") match = "confirm_details";
  }
  let section: PathwayAssessment["section"] = match === "outside_scope" ? "not_a_match" : "investigate";
  if (section !== "not_a_match") {
    if (match === "unavailable" || freshness === "stale" || match === "confirm_details") section = "check_first";
    if (["closed", "not_yet_open", "monitor"].includes(availability.availability) || pathway.route_type === "concessional_loan") section = "watchlist";
  }
  const label = freshness === "stale" && availability.availability === "open_at_review"
    ? "Published dates only — source review overdue; current status unconfirmed" : availability.label;
  return {
    id: pathway.id, title: pathway.title, route_type: pathway.route_type, route_label: ROUTE_LABELS[pathway.route_type],
    match, availability: availability.availability, availability_label: label, freshness, section,
    facts: ["withdrawn", "unavailable"].includes(freshness) ? "Required evidence is not available for this record." : pathway.facts,
    interpretation: ["withdrawn", "unavailable"].includes(freshness) ? "No current relevance conclusion can be supported." : pathway.interpretation,
    conditions: ["withdrawn", "unavailable"].includes(freshness) ? ["Obtain current programme evidence before relying on this record."] : [...pathway.conditions],
    reasons: [...new Set(reasons)], questions: [...new Set(questions)], next_step: pathway.next_step,
    source_ids: [...pathway.source_ids], reviewed_at: known.map(s => s.reviewed).sort()[0] ?? "not established",
    review_due_at: known.map(s => s.review_due).sort()[0] ?? "not established",
    deadline: pathway.closes ?? pathway.close_date ?? null,
    published_funding_terms: ["withdrawn", "unavailable"].includes(freshness) ? null : pathway.published_funding_terms,
    award_amount: null,
  };
}
export function assessFundingPathways(raw: unknown, context: FundingAssessmentContext = {}): FundingResult {
  const now = context.now ?? new Date();
  if (!Number.isFinite(now.getTime())) throw new Error("Invalid trusted assessment clock");
  const { inputs, issues } = validate(raw);
  const coverage = !inputs.state ? "not_selected" : (PRIORITY_FUNDING_STATES as readonly string[]).includes(inputs.state) ? "five_state_review" : "national_only";
  const coverageNote = coverage === "five_state_review"
    ? `Selected national and ${projectStateName(inputs.state)} pathways reviewed on 20 September 2026. This is not an exhaustive state grants register.`
    : coverage === "national_only"
      ? `Only applicable national pathways are included for ${projectStateName(inputs.state)}. State/territory-specific research has not been completed for this location.`
      : "Choose a state or territory and site type to identify the reviewed scope.";
  const base = { catalogue_version: FUNDING_CATALOGUE_VERSION, rule_version: FUNDING_RULE_VERSION, inputs, issues, coverage, coverage_note: coverageNote, pathways: [] as PathwayAssessment[], missing_fields: issues.filter(i => i.code === "missing").map(i => i.field as FundingInputKey), grant_award: null, approval: "not_determined" } as const;
  if (issues.length) return resultEnvelope("assess_funding_pathways", now, {
    status: "needs_input", result_type: "qualification", summary: "Check the highlighted project details before a funding pathway assessment.",
    result: base, sources: [], limitations: LIMITATIONS, next_actions: issues.map(i => ({ type: "provide_input" as const, label: i.message, field: i.field })),
  });
  const catalogue = context.catalogue ?? FUNDING_PATHWAYS;
  const sourceRecords = context.sources ?? FUNDING_SOURCES;
  if (context.unavailable || catalogue.length === 0) return resultEnvelope("assess_funding_pathways", now, {
    status: "unavailable", result_type: "qualification", summary: "The reviewed funding catalogue is unavailable. This is not a finding that no funding exists.",
    result: base, sources: [], limitations: LIMITATIONS, next_actions: [{ type: "view_page", label: "Read the funding research guide", path: "/funding" }],
  });
  const selected = catalogue.filter(p => (p.jurisdictions as readonly string[]).some(state => state === "national" || state === inputs.state) && p.site_types.includes(inputs.site_type!));
  const pathways = selected.map(pathway => assessPathway(pathway, inputs, now, sourceRecords));
  const sourceIds = [...new Set(pathways.flatMap(p => p.source_ids))];
  const sources = sourceIds.flatMap(id => { const record = sourceRecords.find(s => s.id === id); return record ? [toReference(record, now)] : []; });
  const onlyUnavailable = pathways.length > 0 && pathways.every(p => p.match === "unavailable");
  const relevant = pathways.filter(p => p.section === "investigate" || p.section === "check_first");
  const summary = onlyUnavailable ? "Required evidence is unavailable or withdrawn. No positive pathway conclusion is supported."
    : relevant.length ? "Review the possible routes and their conditions below. No funding eligibility or approval has been determined."
      : "No currently actionable route was identified in this reviewed catalogue. Check any closed-round or finance signposts and seek advice on other options.";
  const result = resultEnvelope("assess_funding_pathways", now, {
    status: onlyUnavailable ? "unavailable" : relevant.length ? "requires_human_review" : "ok", result_type: "qualification", summary,
    result: { ...base, pathways, missing_fields: [...new Set(pathways.filter(p => p.section !== "not_a_match").flatMap(p => p.questions))] },
    sources, limitations: LIMITATIONS,
    next_actions: [
      { type: "view_page", label: "Read the research, scope and state guides", path: "/funding" },
      { type: "review_enquiry_form", label: "Review a project enquiry to SiteComms — no automatic submission", path: "/tools/funding-check#project-enquiry" },
    ],
  });
  assertFundingResult(result);
  return result;
}
/** The public result may qualify relevance; it can never manufacture an award or final eligibility decision. */
export function assertFundingResult(value: FundingResult): void {
  if (value.capability !== "assess_funding_pathways" || value.result_type !== "qualification" || value.result.grant_award !== null || value.result.approval !== "not_determined") throw new Error("Invalid funding result classification");
  const ids = new Set<string>();
  for (const p of value.result.pathways) {
    if (ids.has(p.id) || p.award_amount !== null || !p.source_ids.length || !p.conditions.length || !p.interpretation || !p.next_step) throw new Error("Invalid pathway result");
    ids.add(p.id);
    if (["closed", "not_yet_open", "monitor"].includes(p.availability) && p.section === "investigate") throw new Error("Unavailable round presented as actionable");
    if (p.route_type === "concessional_loan" && !["watchlist", "not_a_match"].includes(p.section)) throw new Error("Loan presented as grant access");
    if (["unavailable", "withdrawn"].includes(p.freshness) && p.match !== "unavailable") throw new Error("Unsupported positive source conclusion");
  }
}
/** Shared page projection. It does not run a fictitious user assessment. */
export function fundingPublicationStatus(pathway: FundingPathway, now: Date): { label: string; freshness: FreshnessState } {
  const records = pathway.source_ids.map(id => FUNDING_SOURCES.find(s => s.id === id));
  const freshness = pathway.publication === "withdrawn" ? "withdrawn" : records.some(s => !s) ? "unavailable" : sourceFreshness(records as FundingSource[], now);
  const state = pathwayAvailability(pathway, now);
  return { label: freshness === "withdrawn" ? "Withdrawn from active guidance" : freshness === "unavailable" ? "Evidence unavailable" : freshness === "stale" ? `${state.label} · editorial re-review due` : state.label, freshness };
}
