import { assessFundingPathways, assertFundingResult } from "../funding/assessment";
import { FUNDING_INPUT_SCHEMA } from "../funding/questions";
import { assessRequest, assertAssessmentResult } from "./assessment";
import { searchBusinessContent, SEARCH_INPUT_SCHEMA, assertSearchResult } from "./search";
import { ASSESSMENT_INPUT_SCHEMA } from "./validation";

/** One definition per workflow. HTTP and future protocols must call these handlers.
 * This is not a raw protocol tool-list response or an arbitrary command dispatcher.
 */
export const CAPABILITIES = {
  assess_funding_pathways: {
    id: "assess_funding_pathways", category: "assessment", uses_model: false,
    title: "Find researched Australian funding pathways",
    description: "Shortlist dated official-source pathways for a structured state, site, applicant and scope. Separates grants, internal approvals, closed rounds, invitation-only routes and repayable loans. Does not determine eligibility, predict awards, submit applications/enquiries or fetch arbitrary sources. Five-state research plus selected national routes; other states have limited coverage.",
    input_schema: FUNDING_INPUT_SCHEMA,
    handler: assessFundingPathways,
    validate_result: assertFundingResult,
    output_contract: "BusinessResult<FundingPayload> (funding/types.ts)",
  },
  search_business_content: {
    id: "search_business_content", category: "read", uses_model: false,
    title: "Find public planning guides",
    description: "Search SiteComms' public guide directory using a bounded keyword query. Returns page links and descriptions; no arbitrary URL retrieval or private document access.",
    input_schema: SEARCH_INPUT_SCHEMA,
    handler: searchBusinessContent,
    validate_result: assertSearchResult,
    output_contract: "BusinessResult<SearchPayload> (contracts.ts / search.ts)",
  },
  assess_request: {
    id: "assess_request", category: "assessment", uses_model: false,
    title: "Assess a structured pricing request",
    description: "Run the existing AUD planning calculator using explicit configuration fields. Returns a provisional budget estimate, missing-input questions or a limitation. Does not issue quotes, determine eligibility, submit enquiries or interpret free text.",
    input_schema: ASSESSMENT_INPUT_SCHEMA,
    handler: assessRequest,
    validate_result: assertAssessmentResult,
    output_contract: "BusinessResult<PricingPayload> (contracts.ts / assessment.ts)",
  },
} as const;
export function capabilityDescriptions() {
  return Object.values(CAPABILITIES).map(({ id, category, uses_model, title, description, input_schema }) => ({ id, category, uses_model, title, description, input_schema }));
}
