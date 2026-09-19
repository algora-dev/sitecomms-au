import Link from "next/link";
import PlanningArticle from "@/components/content/PlanningArticle";
import { buildMetadata } from "@/lib/seo";
const path = "/guides/compare-pa-system-quotes";
const title = "How to compare Australian PA, paging and intercom quotes";
const description = "Compare the complete scope: coverage, controls, network works, installation, software, support and handover, not just the price of a speaker.";
export const metadata = buildMetadata({ title, description, path });
const rows = [
  ["Coverage", "Rooms, common areas, outdoor areas and independent zones; design assumptions and exclusions."],
  ["Endpoints and controls", "Exact models, quantities, mounts, microphones, call buttons, answering points and spare capacity."],
  ["Retained equipment", "Test results, interfaces, amplifier/circuit boundaries and responsibility if reused equipment fails."],
  ["Network and power", "Switches, PoE capacity, new data runs, fibre, local electrical work and backup-power scope."],
  ["Software and integrations", "Licence term, renewal costs, schedules, telephony, security interfaces and commissioning responsibility."],
  ["Installation", "Access equipment, travel, delivery, after-hours work, making good, training and interruption planning."],
  ["Handover and service", "Acceptance tests, records, account ownership, warranty, response arrangements and exclusions."],
];
export default function CompareQuotesPage() {
  return <PlanningArticle path={path} title={title} description={description}>
    <p>A lower quote can reflect a simpler design, a missing requirement or a genuinely efficient solution. The useful question is whether each proposal delivers the same agreed outcome. Use this guide as a comparison worksheet; it is not a tender evaluation rule or a recommendation to choose the cheapest supplier.</p>
    <h2>Issue one brief and ask for a scope response</h2>
    <p>Provide the same site plan, zone list, daily workflows and existing-system information to every provider. Ask each to mark every requirement as included, excluded, optional or dependent on another contractor. Keep assumptions visible: &ldquo;existing network suitable&rdquo; needs evidence or a separately priced verification task.</p>
    <p>For a school, begin with the <Link href="/guides/school-pa-paging-requirements">school requirements guide</Link>. For a care site, distinguish general announcements, entrance intercom and clinical call-response systems before comparing any products. A campus PA quotation is not automatically a nurse-call quotation.</p>
    <h2>Compare seven parts of the project</h2>
    <div role="region" aria-label="Quote scope checklist" tabIndex={0} className="overflow-x-auto rounded-xl border border-[var(--sc-border)]">
      <table className="min-w-[580px] w-full text-sm"><caption className="p-4 text-left">Ask each provider to state the included scope and any exclusions.</caption>
        <thead><tr><th scope="col">Cost heading</th><th scope="col">What to compare</th></tr></thead>
        <tbody>{rows.map(([label, detail]) => <tr key={label}><th scope="row">{label}</th><td>{detail}</td></tr>)}</tbody>
      </table>
    </div>
    <h2>Normalize the commercial basis</h2>
    <p>Put every proposal on the same GST basis and distinguish one-off capital items from recurring charges. Record quote validity, delivery lead time, payment milestones and assumptions about working hours. Ask what changes if equipment is unavailable and whether an alternative must be approved before substitution.</p>
    <p>Do not compare an overseas web price for a component with a commissioned Australian system. Similarly, an indicative SiteComms estimate only describes the current modelled scope. The calculator uses stable AUD assumptions and does not include a research-backed state premium or every possible building/network cost.</p>
    <h2>Check what a hybrid proposal really retains</h2>
    <p>A network interface feeding an existing amplifier does not create independent control of every speaker on that amplifier&apos;s circuit. Ask the provider to draw the retained zones, identify the test/repair allowance and explain where new endpoints are needed. Compare the hybrid proposal against the same required coverage and controls, not a nominal &ldquo;IP speaker count&rdquo;.</p>
    <p>Include a contingency decision: what happens if a circuit fails testing? The quote should identify the variation process before installation, rather than leave the project dependent on an untested assumption.</p>
    <h2>Ask for an operator demonstration</h2>
    <p>Have a staff member change a schedule, page one zone, handle a call and stop an authorised priority message. Agree which tests are relevant to the actual brief. Ask how the system recovers after an outage, who receives fault notifications and whether configuration backups can be restored without a particular employee&apos;s account.</p>
    <p>Where visual messages, visitor video or staff-device notifications are required, demonstrate the exact proposed endpoint and software combination. A family-level brochure is not evidence that an optional feature has been included in the quote.</p>
    <h2>Verify the Australian service route</h2>
    <p>Identify the contracting installer, supply channel, warranty process and on-site service contact. Ask who supports the combined system when it includes another vendor&apos;s telephone platform, access system or retained amplifier. Request evidence of relevant work without assuming that a product listing establishes market share or installation coverage in your state.</p>
    <p>For regional or remote sites, record travel charges, access windows, shipping/spares arrangements and support response expectations explicitly. Choosing a state on SiteComms saves project context; it does not certify provider coverage.</p>
    <h2>Use a simple whole-project comparison</h2>
    <p>For each proposal, record: required functions met, unresolved assumptions, capital total on a common GST basis, separately quoted works, recurring charges over a stated period, acceptance criteria and support responsibilities. Ask for clarifications in writing. Compare funding and finance only after the project scope is sufficiently clear; neither should hide an omitted cost.</p>
    <p>The <Link href="/compare">Australian comparison guide</Link> supplies manufacturer and local-listing evidence for representative approaches. SiteComms can review an enquiry and suggest providers&apos; public contact details; you decide whether to contact them. Your enquiry is not automatically forwarded to those providers.</p>
  </PlanningArticle>;
}
