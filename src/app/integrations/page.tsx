import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { capabilityDescriptions } from "@/lib/agent-ready/capabilities";
import { CONTRACT_VERSION } from "@/lib/agent-ready/contracts";

export const metadata = buildMetadata({ title: "Integration status and planning capabilities", description: "How SiteComms keeps public planning information and indicative calculations consistent, with clear integration limits and ordinary human alternatives.", path: "/integrations" });

export default function IntegrationPage() {
  return <div className="sc-container max-w-4xl py-16">
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Agent-Ready foundation</p>
    <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">One planning core, clear limits</h1>
    <p className="mt-4 text-lg leading-relaxed text-[var(--sc-slate)]">SiteComms is an Australian research and planning resource. Public guides, indicative pricing and reviewed enquiries remain available without an AI assistant.</p>
    <div className="sc-card mt-7 bg-[var(--sc-blue-50)] p-6">
      <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Integration status</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">This is a foundation release, not a claim of universal agent compatibility. No remote MCP, WebMCP or model-assisted workflow is enabled by this code. The optional authenticated HTTP testing route is disabled by default and must be configured and checked by the site operator. It is not a public consumer connection or an MCP endpoint.</p>
      <p className="mt-3 text-xs text-[var(--sc-slate)]">Business contract version: {CONTRACT_VERSION}. Organic discovery and external-client compatibility have not been demonstrated by this implementation.</p>
    </div>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">{capabilityDescriptions().map(capability => <section key={capability.id} className="sc-card p-6">
      <h2 className="font-semibold text-[var(--sc-blue-900)]">{capability.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{capability.description}</p>
      <p className="mt-3 text-xs text-[var(--sc-slate)]">No model call. No enquiry submission.</p>
    </section>)}</div>
    <section className="sc-prose mt-8">
      <h2>What a planning result means</h2>
      <p>Pricing results retain the original provisional AUD assumptions, exclude GST and distinguish the modelled scope from unresolved site costs. A result is not a supplier quote, an acoustic design, funding approval or a promise that a particular product is available in your area. Source-review dates are not refreshed just because a result is generated.</p>
      <h2>Funding, finance and enquiries</h2>
      <p>State-specific funding matching and lender or borrowing-authority decisions are not available through these capabilities. You can prepare a project through the ordinary tools and submit a separate reviewed enquiry. SiteComms replies with suitable providers&apos; public contact details; it does not forward your enquiry to those providers.</p>
      <h2>For integration developers</h2>
      <p>The selected testing profile uses <code>GET /api/business/v1/search</code> and <code>POST /api/business/v1/assessments</code>, with server-side authentication and no browser/CORS access. Use the repository&apos;s Agent-Ready contracts and handoff for setup, request examples, limits and test requirements. No API key belongs in a public browser bundle.</p>
    </section>
    <div className="mt-7 flex flex-wrap gap-3">
      <Link href="/guides" className="sc-btn-secondary">Browse and search guides</Link>
      <Link href="/pricing-tool" className="sc-btn-primary">Use the pricing tool</Link>
      <Link href="/contact" className="sc-btn-secondary">Review an enquiry</Link>
    </div>
  </div>;
}
