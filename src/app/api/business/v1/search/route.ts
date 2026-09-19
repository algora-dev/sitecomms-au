import { handleCapabilityHttp } from "@/lib/agent-ready/http.server";
export const runtime = "nodejs";
export function GET(request: Request) {
  return handleCapabilityHttp(request, "search_business_content");
}
