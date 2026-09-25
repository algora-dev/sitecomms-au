import { site } from "../site";
import { pricingConfig } from "../pricing/config";
import { CONTENT_META } from "../content-meta";
import type { FreshnessState, SourceReference } from "./contracts";

/** Independently version policy, commercial assumptions and transport. */
export const PRICING_RULE_VERSION = "au-calculator-80-100-v1";
export const ASSESSMENT_POLICY_VERSION = "au-planning-assessment-v1";
export const PRICING_SOURCE_VERSION = "au-planning-baseline-2026-09-17-v1";
export type SourceId = "pricing_model" | "content_directory" | "school_comparison" | "funding_preparation" | "finance_preparation" | "enquiry_policy";
export interface SourceRecord extends Omit<SourceReference, "freshness" | "reference_url"> {
  availability: "available" | "unavailable" | "conflicted" | "withdrawn";
}
const editorial = (id: SourceId, title: string, path: string): SourceRecord => ({
  source_id: id, title, reference_path: path, owner: "T3 Labs / SiteComms editorial owner",
  authority: "Existing SiteComms public editorial content; not an eligibility or approval authority",
  source_version: `editorial:${CONTENT_META[path]?.reviewed ?? "undated"}`,
  reviewed_at: CONTENT_META[path]?.reviewed ?? null, review_due_at: null,
  approval_status: "existing_public_content", availability: "available",
});

/** Publication records, not a second rate table or a new database.
 * Named reviewers, review intervals and launch approval remain owner decisions.
 * The baseline's recorded review date is carried forward, not verified again here.
 */
export const SOURCE_RECORDS: Record<SourceId, SourceRecord> = {
  pricing_model: {
    source_id: "pricing_model", title: "SiteComms provisional Australian pricing assumptions",
    authority: "SiteComms planning model; not a market average or supplier quote",
    owner: "T3 Labs / SiteComms pricing approver", reference_path: "/about/methodology",
    source_version: PRICING_SOURCE_VERSION, reviewed_at: pricingConfig.reviewedAt,
    review_due_at: null, approval_status: "provisional", availability: "available",
  },
  content_directory: editorial("content_directory", "SiteComms public planning guide directory", "/guides"),
  school_comparison: editorial("school_comparison", "Australian school comparison and cited evidence", "/compare/schools"),
  funding_preparation: editorial("funding_preparation", "Funding pathway checker — not eligibility or approval", "/tools/funding-check"),
  finance_preparation: editorial("finance_preparation", "Finance preparation — not lender or borrowing approval", "/tools/finance-check"),
  enquiry_policy: editorial("enquiry_policy", "SiteComms reviewed enquiry and recommendation process", "/contact"),
};

/** No arbitrary default maximum source age: the owner must approve an interval.
 * A recorded stale/conflicted/withdrawn price source blocks a new price.
 */
export function sourceFreshness(record: SourceRecord, now: Date): FreshnessState {
  if (record.availability !== "available") return record.availability;
  if (!record.review_due_at) return "review_interval_not_set";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.review_due_at)) return "unavailable";
  const expiry = Date.parse(`${record.review_due_at}T23:59:59.999Z`);
  // Date.parse may normalise an impossible day into the next month: reject it.
  if (!Number.isFinite(expiry) || new Date(expiry).toISOString().slice(0, 10) !== record.review_due_at) return "unavailable";
  return now.getTime() > expiry ? "stale" : "within_review_period";
}
export function publicSource(record: SourceRecord, now: Date): SourceReference {
  // Explicit allowlist: do not spread future internal source fields into output.
  return { source_id: record.source_id, title: record.title, authority: record.authority,
    owner: record.owner, reference_path: record.reference_path, reference_url: `${site.url.replace(/\/$/, "")}${record.reference_path}`, source_version: record.source_version,
    reviewed_at: record.reviewed_at, review_due_at: record.review_due_at,
    approval_status: record.approval_status, freshness: sourceFreshness(record, now) };
}
