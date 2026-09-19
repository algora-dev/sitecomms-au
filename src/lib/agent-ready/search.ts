import { publicGuideRecords } from "./content";
import { resultEnvelope, InputValidationError, type BusinessResult, type InputIssue } from "./contracts";
import { checkObject } from "./validation";
import { SOURCE_RECORDS, publicSource, type SourceRecord } from "./sources";

export const SEARCH_INPUT_SCHEMA = {
  type: "object", additionalProperties: false, required: ["query"],
  properties: { query: { type: "string", minLength: 1, maxLength: 200 }, limit: { type: "integer", minimum: 1, maximum: 10, default: 5 }, offset: { type: "integer", minimum: 0, maximum: 100, default: 0 } },
} as const;
export interface SearchPayload { items: ReturnType<typeof publicGuideRecords>; total: number; next_offset: number | null; scope: "public_guide_directory" }
export type SearchResult = BusinessResult<SearchPayload>;

export function searchBusinessContent(input: unknown, context: { now?: Date; source?: SourceRecord } = {}): SearchResult {
  const issues: InputIssue[] = [];
  if (!checkObject(input, "", ["query", "limit", "offset"], ["query"], issues)) throw new InputValidationError(issues);
  if (typeof input.query !== "string" || input.query.trim().length < 1 || input.query.length > 200) issues.push({ field: "query", code: "invalid", message: "Enter a query of 1–200 characters." });
  for (const [key, min, max] of [["limit", 1, 10], ["offset", 0, 100]] as const) if (input[key] !== undefined && (typeof input[key] !== "number" || !Number.isInteger(input[key]) || (input[key] as number) < min || (input[key] as number) > max)) issues.push({ field: key, code: "invalid", message: `Use a whole number from ${min} to ${max}.` });
  if (issues.length) throw new InputValidationError(issues);
  const query = (input.query as string).trim().toLocaleLowerCase("en-AU");
  const limit = (input.limit as number | undefined) ?? 5;
  const offset = (input.offset as number | undefined) ?? 0;
  const now = context.now ?? new Date();
  const source = publicSource(context.source ?? SOURCE_RECORDS.content_directory, now);
  const available = !["unavailable", "conflicted", "withdrawn"].includes(source.freshness);
  const tokens = query.match(/[\p{L}\p{N}]+/gu) ?? [];
  // Deterministic keyword navigation relevance, not brand/product ranking.
  const matches = available && tokens.length ? publicGuideRecords().map(record => {
    const title = record.title.toLocaleLowerCase("en-AU");
    const text = `${title} ${record.desc} ${record.href}`.toLocaleLowerCase("en-AU");
    return { record, score: tokens.reduce((sum, token) => sum + (title.includes(token) ? 3 : text.includes(token) ? 1 : 0), 0) };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.record.id.localeCompare(b.record.id)) : [];
  const items = matches.slice(offset, offset + limit).map(item => item.record);
  const result = resultEnvelope("search_business_content", now, {
    status: available ? "ok" : "unavailable", result_type: "information",
    summary: available ? `${matches.length} matching public planning guide${matches.length === 1 ? "" : "s"}. This searches directory descriptions, not every paragraph of the site.` : "The public guide directory is unavailable. No absence-of-service conclusion can be drawn.",
    result: { items, total: matches.length, next_offset: offset + limit < matches.length ? offset + limit : null, scope: "public_guide_directory" as const },
    sources: [source], limitations: ["Navigation results are public page descriptions, not independent product, funding or finance verification.", ...(source.freshness === "stale" ? ["The directory is overdue for editorial review; confirm time-sensitive facts at their cited sources."] : [])],
    next_actions: [{ type: "view_page", label: "Browse all public planning guides", path: "/guides" }],
  });
  assertSearchResult(result);
  return result;
}

export function assertSearchResult(result: SearchResult): void {
  const ids = new Set(publicGuideRecords().map(record => record.id));
  if (result.result.items.length > 10 || result.result_type !== "information" || result.capability !== "search_business_content") throw new Error("Invalid public search result.");
  for (const item of result.result.items) {
    if (!ids.has(item.id) || !item.href.startsWith("/") || item.href.startsWith("//") || item.href.includes("\\")) throw new Error("Invalid public directory record.");
  }
}
