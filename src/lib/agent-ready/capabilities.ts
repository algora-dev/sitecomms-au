import { assessRequest, assertAssessmentResult } from "./assessment";
import { searchBusinessContent, SEARCH_INPUT_SCHEMA, assertSearchResult } from "./search";
import { ASSESSMENT_INPUT_SCHEMA } from "./validation";

/** One definition per workflow. HTTP and future protocols must call these handlers.
 * This is not a raw protocol tool-list response or an arbitrary command dispatcher.
 */
export const CAPABILITIES = {
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
