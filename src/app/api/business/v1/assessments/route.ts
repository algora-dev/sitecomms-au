import { handleCapabilityHttp } from "@/lib/agent-ready/http.server";
export const runtime = "nodejs";
export function POST(request: Request) {
  return handleCapabilityHttp(request, "assess_request");
}
