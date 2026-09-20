/** Business-domain contracts, not MCP/WebMCP wire messages. No private records. */
export const CONTRACT_VERSION = "1.0.0";
export const BUSINESS_ID = "sitecomms-au";
export type CapabilityId = "search_business_content" | "assess_request" | "assess_funding_pathways";
export type OutcomeStatus = "ok" | "needs_input" | "not_supported" | "requires_human_review" | "unavailable";
export type ResultType = "information" | "budget_estimate" | "qualification";
export type FreshnessState = "within_review_period" | "review_interval_not_set" | "stale" | "unavailable" | "conflicted" | "withdrawn";

export interface SourceReference {
  source_id: string;
  title: string;
  authority: string;
  owner: string;
  reference_path: string;
  reference_url: string;
  source_version: string;
  reviewed_at: string | null;
  review_due_at: string | null;
  approval_status: "provisional" | "existing_public_content";
  freshness: FreshnessState;
  // No generated verified_at: editorial review is not independent verification.
}
export interface NextAction {
  type: "view_page" | "review_enquiry_form" | "provide_input";
  label: string;
  path?: string;
  field?: string;
}
export interface BusinessResult<T> {
  schema_version: typeof CONTRACT_VERSION;
  business_id: typeof BUSINESS_ID;
  capability: CapabilityId;
  status: OutcomeStatus;
  result_type: ResultType;
  summary: string;
  result: T;
  sources: SourceReference[];
  limitations: string[];
  next_actions: NextAction[];
  generated_at: string;
  // No durable assessment_id: this foundation does not store assessments.
}
export interface InputIssue {
  field: string;
  code: "missing" | "invalid" | "unknown_field" | "conflict";
  message: string;
}
export class InputValidationError extends Error {
  constructor(public readonly issues: InputIssue[]) {
    super("The request does not match the supported input contract.");
    this.name = "InputValidationError";
  }
}

export function resultEnvelope<T>(capability: CapabilityId, now: Date, body: Omit<BusinessResult<T>, "schema_version" | "business_id" | "capability" | "generated_at">): BusinessResult<T> {
  return { schema_version: CONTRACT_VERSION, business_id: BUSINESS_ID, capability, generated_at: now.toISOString(), ...body };
}
