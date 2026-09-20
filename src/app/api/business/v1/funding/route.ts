import { handleCapabilityHttp } from "@/lib/agent-ready/http.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return handleCapabilityHttp(request, "assess_funding_pathways");
}
