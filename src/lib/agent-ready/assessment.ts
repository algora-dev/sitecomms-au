import { calculateEstimate } from "../pricing/calculate";
import { pricingConfig, formatAUD } from "../pricing/config";
import type { CalculatorState, EstimateResult } from "../pricing/types";
import { parseProjectState, withProjectState, type ProjectState } from "../jurisdictions";
import { BUSINESS_ID, CONTRACT_VERSION, resultEnvelope, type BusinessResult, type InputIssue } from "./contracts";
import { SOURCE_RECORDS, publicSource, PRICING_RULE_VERSION, ASSESSMENT_POLICY_VERSION, type SourceRecord } from "./sources";
import { checkObject, INPUT_LIMITS, validateCalculatorState } from "./validation";

export type QuantityBasis = "approximate" | "customer_supplied" | "unspecified";
export interface AssessmentRequest {
  intent: "pricing" | "funding" | "finance";
  configuration?: CalculatorState;
  project_state?: ProjectState | null;
  quantity_basis?: QuantityBasis;
  requested_outcome?: "budget_estimate" | "qualification" | "formal_quote";
  brief?: string;
}
export interface PriceRange {
  currency: "AUD";
  minor_unit_exponent: 2;
  low_minor: number;
  high_minor: number;
  tax_treatment: "GST_excluded";
  price_basis: "modelled_installed_communications_scope";
  range_basis: "existing_80_to_100_percent_planning_model";
  monitoring_annual_minor: number | null;
}
export interface PricingPayload {
  price: PriceRange | null;
  estimate: EstimateResult | null;
  normalised_inputs: CalculatorState | null;
  project_state: ProjectState | null;
  quantity_basis: QuantityBasis;
  assumptions: { id: string; origin: "existing_model_default"; description: string }[];
  included_scope: string[];
  excluded_scope: string[];
  unresolved_inputs: string[];
  issues: InputIssue[];
  versions: { pricing_source: string; pricing_rules: string; assessment_policy: string };
}
export type PricingAssessment = BusinessResult<PricingPayload>;
/** Trusted application/test context, never accepted as a caller-supplied request field. */
export interface AssessmentContext { now?: Date; pricingSource?: SourceRecord }

export const PLANNING_LIMITATIONS = [
  "This is a provisional SiteComms budget estimate, not a formal quote, market average or supplier commitment.",
  "Amounts are AUD excluding GST. The 80–100% model range is not a statistical confidence interval or a cap on final cost.",
  "Site-wide structured cabling is excluded and must be scoped separately. Unknown network, power, access, mounting and travel costs have not been priced as zero.",
  "Speaker quantities and interfaces are planning assumptions, not an acoustic design, product compatibility assessment, certified evacuation system or specialist nurse-call design.",
  "State selection provides project context only; no regional price multiplier, funding eligibility or finance approval has been applied.",
  "No site inspection, staff review, enquiry submission or provider contact has taken place through this assessment.",
] as const;

const EXCLUSIONS = ["GST", "Site-wide structured cabling", "Any unscoped network/power, special access, mounting or travel requirements", "Formal life-safety certification and specialist nurse-call scope", "Optional annual monitoring (reported separately)"];
const UNRESOLVED = ["Final acoustic coverage and equipment quantities", "Network/power capacity and cabling routes", "Access, mounting, travel and project conditions", "Integrator design, compatibility and approvals"];
function moneyMinor(value: number): number {
  const n = Math.round(value * 100);
  if (!Number.isFinite(value) || value < 0 || !Number.isSafeInteger(n)) throw new Error("Invalid computed money value.");
  return n;
}

export function assessRequest(input: unknown, context: AssessmentContext = {}): PricingAssessment {
  const now = context.now ?? new Date();
  const source = publicSource(context.pricingSource ?? SOURCE_RECORDS.pricing_model, now);
  const payload: PricingPayload = { price: null, estimate: null, normalised_inputs: null, project_state: null, quantity_basis: "unspecified", assumptions: [], included_scope: [], excluded_scope: [], unresolved_inputs: [], issues: [], versions: { pricing_source: source.source_version, pricing_rules: PRICING_RULE_VERSION, assessment_policy: ASSESSMENT_POLICY_VERSION } };
  const finish = (status: PricingAssessment["status"], summary: string, extra: Partial<Omit<PricingAssessment, "result" | "status" | "summary" | "schema_version" | "business_id" | "capability" | "generated_at">> = {}): PricingAssessment => {
    const value = resultEnvelope("assess_request", now, { status, result_type: payload.price ? "budget_estimate" : "qualification", summary, result: payload, sources: [source], limitations: [...PLANNING_LIMITATIONS], next_actions: [{ type: "view_page", label: "Use the ordinary pricing tool", path: withProjectState("/pricing-tool", payload.project_state ?? undefined) }, { type: "review_enquiry_form", label: "Review and submit a separate enquiry to SiteComms", path: withProjectState("/contact", payload.project_state ?? undefined) }], ...extra });
    assertAssessmentResult(value);
    return value;
  };
  const allowed = ["intent", "configuration", "project_state", "quantity_basis", "requested_outcome", "brief"];
  if (!checkObject(input, "", allowed, ["intent"], payload.issues)) return finish("needs_input", "Supply the intended assessment and structured project details.");
  if (input.intent !== undefined && (typeof input.intent !== "string" || !["pricing", "funding", "finance"].includes(input.intent))) payload.issues.push({ field: "intent", code: "invalid", message: "Choose pricing, funding or finance." });
  if (input.project_state !== undefined && input.project_state !== null) {
    const state = parseProjectState(input.project_state);
    // No silent upper-casing or place-name inference at the capability boundary.
    if (!state || state !== input.project_state) payload.issues.push({ field: "project_state", code: "invalid", message: "Use an exact Australian state/territory code, or omit the field." });
    else payload.project_state = state;
  }
  if (input.quantity_basis !== undefined) {
    if (typeof input.quantity_basis !== "string" || !["approximate", "customer_supplied", "unspecified"].includes(input.quantity_basis)) payload.issues.push({ field: "quantity_basis", code: "invalid", message: "Use approximate, customer_supplied or unspecified; supplied is not independently verified." });
    else payload.quantity_basis = input.quantity_basis as QuantityBasis;
  }
  if (input.requested_outcome !== undefined && (typeof input.requested_outcome !== "string" || !["budget_estimate", "qualification", "formal_quote"].includes(input.requested_outcome))) payload.issues.push({ field: "requested_outcome", code: "invalid", message: "The requested outcome is not recognised." });
  if (input.brief !== undefined && (typeof input.brief !== "string" || input.brief.length > INPUT_LIMITS.briefCharacters)) payload.issues.push({ field: "brief", code: "invalid", message: `Briefs must be text, no more than ${INPUT_LIMITS.briefCharacters} characters.` });
  // Validate every supplied field, including configuration on an unsupported intent.
  const suppliedConfiguration = input.configuration === undefined ? null : validateCalculatorState(input.configuration);
  if (suppliedConfiguration) payload.issues.push(...suppliedConfiguration.issues);
  if (payload.issues.length) return finish("needs_input", "Correct the indicated fields before requesting an assessment.");
  if (input.requested_outcome === "formal_quote") return finish("not_supported", "SiteComms does not issue formal quotes through this tool. Review a separate enquiry for a suitable provider recommendation.");
  if (typeof input.brief === "string" && input.brief.trim()) return finish("needs_input", "Free-text interpretation is not enabled. Use structured fields; this brief has not been interpreted or reconciled with any supplied values.", { next_actions: [{ type: "provide_input", label: "Confirm the structured project details and remove the unprocessed brief", field: "configuration" }, { type: "view_page", label: "Use the ordinary calculator", path: "/pricing-tool" }] });
  if (input.intent === "funding" || input.intent === "finance") {
    const funding = input.intent === "funding";
    return finish("not_supported", funding ? "State-specific funding matching is not implemented. The available page helps prepare the applicant and project scope; it does not establish eligibility." : "Lender matching, borrowing authority and finance approval are not implemented in this capability. The existing finance tool is preparation guidance only.", { sources: [publicSource(funding ? SOURCE_RECORDS.funding_preparation : SOURCE_RECORDS.finance_preparation, now)], next_actions: [{ type: "view_page", label: funding ? "Funding preparation" : "Finance preparation", path: withProjectState(funding ? "/tools/funding-check" : "/tools/finance-check", payload.project_state ?? undefined) }], limitations: ["No eligibility, funding amount, credit approval or borrowing authority has been determined.", "No enquiry has been submitted and no provider has been contacted."] });
  }
  if (input.requested_outcome === "qualification") return finish("not_supported", "This slice calculates preliminary pricing only, not system suitability or compliance. Use the planning guides or request a separate review.");
  const checked = suppliedConfiguration ?? validateCalculatorState(input.configuration);
  payload.issues = checked.issues;
  if (!checked.value) return finish("needs_input", "Provide the missing or corrected site configuration. Unknown counts must not be entered as zero.", { next_actions: checked.issues.slice(0, 3).map(i => ({ type: "provide_input" as const, label: i.message, field: i.field })) });
  const state = checked.value;
  payload.normalised_inputs = state;
  if (Object.values(state.areas).every(n => n === 0)) {
    payload.issues = [{ field: "configuration.areas", code: "missing", message: "Provide at least one area or entry point. An empty site is not a complete project estimate." }];
    return finish("needs_input", payload.issues[0].message);
  }
  if (["stale", "unavailable", "conflicted", "withdrawn"].includes(source.freshness)) return finish("unavailable", "The required pricing source is unavailable, overdue for review or unresolved. No amount has been produced; use the ordinary enquiry route.");
  // The only calculation call. No adapter, prompt or UI owns another formula.
  const estimate = calculateEstimate(state);
  payload.estimate = estimate;
  payload.price = { currency: "AUD", minor_unit_exponent: 2, low_minor: moneyMinor(estimate.low), high_minor: moneyMinor(estimate.high), tax_treatment: "GST_excluded", price_basis: "modelled_installed_communications_scope", range_basis: "existing_80_to_100_percent_planning_model", monitoring_annual_minor: estimate.monitoringAnnual === null ? null : moneyMinor(estimate.monitoringAnnual) };
  payload.included_scope = estimate.breakdown.map(line => line.label);
  payload.excluded_scope = [...EXCLUSIONS];
  payload.unresolved_inputs = [...UNRESOLVED];
  const defaults = { largeIndoor: pricingConfig.defaults.largeIndoorSpeakers, outdoor: pricingConfig.defaults.outdoorHorns, largeOutdoor: pricingConfig.defaults.largeOutdoorHorns };
  for (const k of ["largeIndoor", "outdoor", "largeOutdoor"] as const) if (state.areas[k] > 0 && state.speakers[k] === null) payload.assumptions.push({ id: `speakers.${k}`, origin: "existing_model_default", description: `${defaults[k]} speakers per ${k} area, carried from the existing provisional model; not measured coverage.` });
  if (state.tier === "unsure") payload.assumptions.push({ id: "tier", origin: "existing_model_default", description: "Existing-site tier B pricing; cabling remains unknown and excluded, not silently priced at zero." });
  if (state.fineTune.twoWayMode === "package") payload.assumptions.push({ id: "two_way_package", origin: "existing_model_default", description: "Two-way room quantity follows the selected package; this does not verify endpoint compatibility." });
  const summary = `Provisional SiteComms budget estimate: ${formatAUD(estimate.low)}–${formatAUD(estimate.high)}${estimate.overThreshold ? "+" : ""} AUD excluding GST, for the modelled communications scope only. Site-wide cabling and unresolved site costs are excluded; not a formal quote.${estimate.monitoringAnnual === null ? "" : ` Optional monitoring: ${formatAUD(estimate.monitoringAnnual)} AUD/year excluding GST, separately.`}`;
  return finish(estimate.overThreshold ? "requires_human_review" : "ok", summary, { limitations: [...PLANNING_LIMITATIONS, ...(estimate.overThreshold ? [`More than ${pricingConfig.endpointWarningThreshold} modelled endpoints: the planning range may understate the project. A site-specific design is required.`] : []), ...(payload.quantity_basis === "approximate" ? ["The supplied quantities are approximate, not surveyed or verified."] : []), "The existing assumption review date is preserved. A source review interval and named launch approver have not yet been recorded."] });
}

export function assessPricingConfiguration(configuration: CalculatorState, projectState?: ProjectState, quantityBasis: QuantityBasis = "unspecified", context: AssessmentContext = {}): PricingAssessment {
  return assessRequest({ intent: "pricing", configuration, project_state: projectState ?? null, quantity_basis: quantityBasis }, context);
}
/** Editorial projections use null for an unavailable price, never a zero or a cached invented number. */
export function planningEstimate(configuration: CalculatorState): EstimateResult | null {
  const assessment = assessPricingConfiguration(configuration);
  return assessment.result.estimate;
}

/** Validate output invariants before exposing domain data in any adapter. */
export function assertAssessmentResult(value: PricingAssessment): void {
  const { price, estimate } = value.result;
  if (value.business_id !== BUSINESS_ID || value.schema_version !== CONTRACT_VERSION || value.capability !== "assess_request") throw new Error("Unexpected assessment identity.");
  if (value.next_actions.some(a => a.path && (!a.path.startsWith("/") || a.path.startsWith("//") || a.path.includes("\\")))) throw new Error("Unsafe action path.");
  if (!price) {
    if (estimate !== null || value.result_type === "budget_estimate") throw new Error("A no-price result cannot contain an estimate.");
    return;
  }
  if (!estimate || !["ok", "requires_human_review"].includes(value.status) || value.result_type !== "budget_estimate") throw new Error("Invalid priced outcome classification.");
  if (price.currency !== "AUD" || price.tax_treatment !== "GST_excluded" || !Number.isSafeInteger(price.low_minor) || !Number.isSafeInteger(price.high_minor) || price.low_minor < 0 || price.high_minor < price.low_minor) throw new Error("Invalid price range.");
  if (price.low_minor !== moneyMinor(estimate.low) || price.high_minor !== moneyMinor(estimate.high) || price.monitoring_annual_minor !== (estimate.monitoringAnnual === null ? null : moneyMinor(estimate.monitoringAnnual))) throw new Error("Inconsistent money projections.");
  const total = estimate.breakdown.reduce((sum, line) => sum + moneyMinor(line.amount), 0);
  if (total !== price.high_minor || !value.limitations.length || !value.result.excluded_scope.length) throw new Error("Incomplete scope or unreconciled total.");
}
