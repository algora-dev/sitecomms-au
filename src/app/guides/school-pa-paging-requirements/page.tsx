import Link from "next/link";
import PlanningArticle from "@/components/content/PlanningArticle";
import { buildMetadata } from "@/lib/seo";
const path = "/guides/school-pa-paging-requirements";
const title = "Australian school PA and paging requirements: plan the brief";
const description = "Define the school, project owner, coverage, bells, intercom, network and handover requirements before requesting an Australian PA or paging proposal.";
export const metadata = buildMetadata({ title, description, path });
export default function SchoolRequirementsPage() {
  return <PlanningArticle path={path} title={title} description={description}>
    <p>A good school communications brief describes what staff need to do and where messages must be heard. It also identifies who can approve the work. This is a planning checklist, not a national technical specification: do not assume that an installation suitable for one school meets another authority&apos;s requirements.</p>
    <h2>Identify the project owner before choosing a brand</h2>
    <p>Record the state or territory, government/Catholic/independent sector, building owner, school decision-maker and network administrator. Ask that team to identify the current property, procurement and ICT requirements for this particular project. A school-owned budget does not, by itself, establish authority to alter a building or enter a finance agreement.</p>
    <p>The <Link href="/states">state planning directory</Link> links to the relevant education departments. Non-government schools should also ask their governing organisation which rules and approvals apply. Keep the approving body separate from the installer: providing equipment is not the same as approving expenditure or determining grant eligibility.</p>
    <h2>Describe the everyday workflow</h2>
    <p>Start with a normal school day. Who edits bell times? Who makes live announcements? Which areas should hear a timetable bell but not an office message? Does a shared hall need a separate schedule? Include holiday shutdowns, special events, temporary classrooms and any before/after-school use.</p>
    <p>Specify the smallest area that must be independently addressed. A list of 30 rooms is not a design for 30 speakers: a hall may need several, and several speakers on one existing circuit may behave as a single zone. Mark desired zones and retained circuits on a plan before comparing equipment counts.</p>
    <h2>Separate paging, classroom audio and intercom</h2>
    <p>One-way announcements, teacher voice amplification and two-way room calls are different requirements. For a classroom call, describe the initiation button or interface, who answers, whether calls queue and what happens when the office is unattended. For a gate, also specify visitor video, answering devices and any access-control interface. Do not infer those functions from a microphone symbol or a SIP label.</p>
    <h2>Define emergency communication without assuming certification</h2>
    <p>Ask the school to supply its authorised emergency procedures and decide which controls staff may operate. Specify who can trigger, override and cancel messages and how accidental activation is handled. Have the relevant qualified fire/life-safety designer determine whether any regulated emergency-warning scope applies. A routine PA system with an emergency button is not, on that fact alone, evidence of compliance.</p>
    <p>Include a witnessed demonstration of the agreed messages and priorities. Test loss of internet, local network, controller and power separately; these are different failure conditions. Record the fallback procedure rather than accepting an undefined claim that the system &ldquo;works offline&rdquo;.</p>
    <h2>Get the network and cabling scope in writing</h2>
    <p>Ask the ICT team and installer to agree ports, power budgets, network access, supported audio traffic, time synchronisation and account ownership. Include testing of any reused speaker circuits or data cabling. Use the <Link href="/guides/ip-paging-network-readiness">network readiness guide</Link> to assign responsibility for each item.</p>
    <p>For regulated telecommunications cabling, use an appropriately registered cabler and confirm the work falls within their registration. ACMA explains registration checks and handover documentation in its <a href="https://www.acma.gov.au/find-registered-cabler" target="_blank" rel="noopener noreferrer">cabling guidance</a>. This does not make every audio-cable task identical; the contractor must identify the actual scope and applicable requirements.</p>
    <h2>Specify evidence and handover, not just hardware</h2>
    <p>Ask for the exact product family, software version/licence, Australian supply route and who handles warranty and on-site support. Require an as-installed drawing, zone/device register, administrator access, configuration backup, user training, acceptance record and support contacts. Where practical, have a school administrator perform a timetable edit during handover.</p>
    <p>For projects outside a provider&apos;s normal service area, ask who physically attends, how travel is charged, what can be diagnosed remotely and how replacement equipment reaches the site. A national distributor listing is not a promise of local installation coverage.</p>
    <h2>Keep cost, funding and finance as separate decisions</h2>
    <p>The SiteComms calculator is a provisional AUD planning model for its stated scope, not a grant budget approval or a quote for every architecture. Site-wide structured cabling, unusual access and other stated exclusions need separate allowances. Use the <Link href="/guides/compare-pa-system-quotes">quote comparison guide</Link> to reconcile those items before comparing totals.</p>
    <p>The <Link href="/tools/funding-check">funding page</Link> explains the current research status. Do not assume a project qualifies because it relates to safety, is installed in a school or is fixed infrastructure. Confirm the pathway and approval sequence before committing expenditure.</p>
    <h2>A practical brief to send out</h2>
    <p>Put the site plan, required zones, daily and emergency workflows, retained equipment, network assessment, project owner, state/sector, programme of work and acceptance tests into one brief. Ask every provider to mark inclusions, exclusions and deviations against it. The <Link href="/guides/school-pa-specification-checklist">specification checklist</Link> provides the companion list for that exercise.</p>
  </PlanningArticle>;
}
