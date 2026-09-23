import type { BusinessResult, FreshnessState, InputIssue } from "../agent-ready/contracts";
import type { ProjectState } from "../jurisdictions";
import type { FundingField, FundingInput, FundingInputKey } from "./questions";
export type RouteType = "grant" | "internal_allocation" | "project_approval" | "procurement" | "concessional_loan";
export const ROUTE_LABELS: Record<RouteType, string> = {
  grant: "Grant programme", internal_allocation: "Internal allocation / department assistance",
  project_approval: "Budget / project-approval route — not a grant", procurement: "School-funded procurement — not new funding",
  concessional_loan: "Repayable loan — finance phase signpost",
};
export type Availability = "open_at_review" | "ongoing" | "closed" | "invitation_only" | "confirm_status" | "monitor";
export interface FundingSource {
  id: string; title: string; publisher: string; url: string; section: string;
  reviewed: string; review_due: string; evidence_note?: string;
}
export interface FundingRule {
  field: FundingField; allowed: string[];
  message: string;
  /** A mismatch is a boundary in this limited pathway model, NOT a statutory eligibility determination. */
  mismatch?: "outside_scope" | "review";
}
export interface FundingPathway {
  id: string; title: string; jurisdictions: (ProjectState | "national")[]; site_types: string[];
  route_type: RouteType; availability: Availability; availability_note: string;
  opens?: string; open_date?: string; closes?: string; close_date?: string; timezone: string;
  source_ids: string[]; facts: string; interpretation: string; conditions: string[]; next_step: string;
  published_funding_terms: string | null;
  rules: FundingRule[]; avoid_retrospective?: "before_approval" | "before_application" | "confirm";
  /** Maintenance stop/withdrawal; no user-controlled source URL or policy override. */
  publication: "active" | "withdrawn";
}
export interface PathwayAssessment {
  id: string; title: string; route_type: RouteType; route_label: string;
  match: "potential_pathway" | "confirm_details" | "outside_scope" | "unavailable";
  availability: Availability | "not_yet_open" | "closing_today";
  availability_label: string; freshness: FreshnessState;
  section: "investigate" | "check_first" | "watchlist" | "not_a_match";
  facts: string; interpretation: string; conditions: string[]; reasons: string[];
  questions: FundingField[]; next_step: string; source_ids: string[];
  reviewed_at: string; review_due_at: string; deadline: string | null;
  published_funding_terms: string | null;
  award_amount: null;
}
export interface FundingPayload {
  catalogue_version: string; rule_version: string;
  inputs: FundingInput; issues: InputIssue[];
  coverage: "five_state_review" | "national_only" | "not_selected";
  coverage_note: string; pathways: PathwayAssessment[];
  missing_fields: FundingInputKey[]; grant_award: null; approval: "not_determined";
}
export type FundingResult = BusinessResult<FundingPayload>;
