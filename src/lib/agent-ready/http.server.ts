/** Server-to-server HTTP testing adapter only. Not MCP, not a browser API.
 * Nothing here may be imported by a client component. No model or write tool.
 */
import { timingSafeEqual, randomUUID } from "node:crypto";
import { CAPABILITIES } from "./capabilities";
import { InputValidationError, type CapabilityId } from "./contracts";
import { INPUT_LIMITS } from "./validation";

const HEADERS = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow" };
class HttpFailure extends Error { constructor(public status: number, public code: string) { super(code); } }
const json = (value: unknown, status = 200, extra: Record<string, string> = {}) => Response.json(value, { status, headers: { ...HEADERS, ...extra } });

// Bounded local backstop; deliberately NOT claimed as a distributed quota.
// Set durable hosting/WAF limits before enabling this on a reachable deployment.
let windowStart = 0;
let requests = 0;
function enforceLocalBudget(now: number) {
  if (now - windowStart >= 60_000) { windowStart = now; requests = 0; }
  if (++requests > 60) throw new HttpFailure(429, "rate_limited");
}
function authorise(req: Request) {
  if (process.env.SC_AGENT_READY_HTTP_ENABLED !== "true") throw new HttpFailure(404, "not_enabled");
  const key = process.env.SC_AGENT_READY_HTTP_KEY;
  if (!key || key.length < 32) throw new HttpFailure(503, "integration_not_configured");
  // Explicit profile: no cookies, CORS or browser clients. This is not an MCP transport policy.
  if (req.headers.has("origin")) throw new HttpFailure(403, "browser_access_not_enabled");
  const supplied = req.headers.get("authorization");
  const expected = Buffer.from(`Bearer ${key}`, "utf8");
  const received = Buffer.from(supplied ?? "", "utf8");
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) throw new HttpFailure(401, "authentication_required");
  enforceLocalBudget(Date.now());
}
async function boundedJson(req: Request): Promise<unknown> {
  if (req.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json") throw new HttpFailure(415, "json_required");
  if (req.headers.has("content-encoding") && req.headers.get("content-encoding") !== "identity") throw new HttpFailure(415, "content_encoding_not_supported");
  const length = Number(req.headers.get("content-length"));
  if (length > INPUT_LIMITS.bodyBytes) throw new HttpFailure(413, "body_too_large");
  if (!req.body) throw new HttpFailure(400, "missing_body");
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new HttpFailure(408, "body_timeout")), 5000); });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      size += value.byteLength;
      if (size > INPUT_LIMITS.bodyBytes) throw new HttpFailure(413, "body_too_large");
      chunks.push(value);
    }
    const bytes = Buffer.concat(chunks);
    try { return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); }
    catch { throw new HttpFailure(400, "invalid_json"); }
  } finally {
    if (timer) clearTimeout(timer);
    void reader.cancel().catch(() => undefined);
  }
}

export async function handleCapabilityHttp(req: Request, capability: CapabilityId): Promise<Response> {
  const requestId = randomUUID();
  const started = performance.now();
  let status = 500;
  let outcome = "transport_error";
  try {
    authorise(req);
    const expectedMethod = capability === "search_business_content" ? "GET" : "POST";
    if (req.method !== expectedMethod) throw new HttpFailure(405, "method_not_allowed");
    let value;
    if (capability === "search_business_content") {
      const params = new URL(req.url).searchParams;
      if ([...params.keys()].some(k => !["query", "limit", "offset"].includes(k) || params.getAll(k).length > 1)) throw new HttpFailure(400, "invalid_query_parameters");
      const parsed: Record<string, unknown> = { query: params.get("query") };
      for (const key of ["limit", "offset"]) if (params.has(key)) {
        const text = params.get(key)!;
        if (!/^\d{1,3}$/.test(text)) throw new HttpFailure(400, "invalid_query_parameters");
        parsed[key] = Number(text);
      }
      value = CAPABILITIES.search_business_content.handler(parsed);
      status = value.status === "unavailable" ? 503 : 200;
    } else {
      value = CAPABILITIES.assess_request.handler(await boundedJson(req));
      // Missing fields are a domain clarification; malformed supplied values are a transport error.
      status = value.result.issues.some(i => i.code !== "missing") ? 400 : value.status === "unavailable" ? 503 : 200;
    }
    outcome = value.status;
    // Critical facts, scope and classification come from the domain object unchanged.
    return json(value, status, { "X-Request-Id": requestId });
  } catch (error) {
    if (error instanceof InputValidationError) {
      status = 400;
      return json({ error: "invalid_input", issues: error.issues, request_id: requestId }, status);
    }
    status = error instanceof HttpFailure ? error.status : 500;
    return json({ error: error instanceof HttpFailure ? error.code : "service_unavailable", request_id: requestId }, status, status === 429 ? { "Retry-After": "60" } : {});
  } finally {
    // Opt-in redacted operational events only: never the query, configuration, header/key or brief.
    if (process.env.SC_AGENT_READY_LOG_EVENTS === "true") console.info(JSON.stringify({ event: "agent_ready_capability", request_id: requestId, capability, adapter: "authenticated_http_test", status, outcome, duration_ms: Math.round(performance.now() - started) }));
  }
}
