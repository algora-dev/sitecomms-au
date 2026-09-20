import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import { STATE_FUNDING_GUIDES } from "@/lib/funding/guides";
import { FUNDING_REVIEWED } from "@/lib/funding/catalogue";
import { buildMetadata } from "@/lib/seo";
import { reviewedLabel } from "@/lib/content-meta";
import { withProjectState } from "@/lib/jurisdictions";
const title = "Australian funding routes for communications projects";
export const metadata = buildMetadata({ title, description: "Research school, aged-care, community and early-learning funding pathways in Queensland, NSW, Victoria, WA and South Australia. Separate grants from approvals and loans.", path: "/funding" });
export default function FundingGuidePage() {
  return <div>
    <AuthorityHero eyebrow="Plan the funding route, not just the equipment" title={title}
      description="There is no single funding route for every PA, paging, school-bell or intercom project. Start with the state, the organisation applying and the purpose of the wider project. Use our researched route map, then confirm the actual application and costs with the authority."
      tags={["Five-state research", "Selected national programmes", "Official evidence", "No promised awards"]}
      primaryCta={{ label: "Check a project’s pathways", href: "/tools/funding-check" }} secondaryCta={{ label: "Prepare comparable quotes", href: "/guides/compare-pa-system-quotes" }}
      reviewed={reviewedLabel("/funding")} note="A dated evidence catalogue, not an exhaustive or live grants register" />
    <div className="sc-container max-w-5xl pb-16 pt-6">
      <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">Start with the project’s state</h2>
      <p className="mt-3 max-w-4xl leading-relaxed text-[var(--sc-slate)]">These guides explain genuinely different state processes and use the same programme records as the tool. The location is the physical project site, not simply your head office.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{STATE_FUNDING_GUIDES.map(guide => <article key={guide.state} className="sc-card p-6"><h3 className="text-xl font-bold text-[var(--sc-blue-900)]">{guide.name}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{guide.description}</p><div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-[var(--sc-blue-700)]"><Link href={`/funding/${guide.slug}`} className="underline">Read the {guide.state} guide</Link><Link href={withProjectState("/tools/funding-check", guide.state)} className="underline">Check a {guide.state} project</Link></div></article>)}</div>
      <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">ACT, Northern Territory and Tasmania remain selectable. Only applicable national records are included for them in this release; their state-specific opportunities have not yet been researched. A limited result is not a finding that no funding exists.</p>
      <section className="sc-prose mt-10 max-w-4xl">
        <h2>What kind of route are you looking at?</h2>
        <p><strong>A grant</strong> is programme assistance subject to the funder’s rules, assessment and availability. <strong>An internal allocation</strong> is a school/department budget or assistance mechanism. <strong>Project approval and procurement</strong> govern how works can proceed; they do not themselves supply money. <strong>A concessional loan</strong> must be repaid and needs its own authorised finance assessment.</p>
        <h2>Which organisations does this release consider?</h2>
        <p>Government, Catholic and independent schools are separate branches. Early-childhood routes are limited to the service, capacity or access requirements of the reviewed programme. Residential aged care is distinct from retirement-village operation. Community applicants need their own legal status and community purpose. A healthcare, tertiary or commercial site is not simply reclassified as a school or charity because it uses similar equipment.</p>
        <h2>Why a PA system is not automatically eligible</h2>
        <p>The relevant question is often whether a defined communications component belongs to an eligible facility project or an evidenced access adjustment. A generic equipment replacement, subscription, ordinary telephone system or maintenance bill may not fit. The state guides link the specific conditions and distinguish programme facts from SiteComms’ project relevance interpretation.</p>
        <h2>Read the result’s status before the next step</h2>
        <p>The checker separates possible routes, conditions to clarify, closed rounds and routes outside its supported scope. It never issues a grant approval, estimates a success probability, invents an award or adds grants together. A programme’s closing date and a source’s next review date are separate: a programme can be closed, or its source can require a fresh check.</p>
        <h2>Evidence and maintenance</h2>
        <p>The initial catalogue was researched on {FUNDING_REVIEWED}. Each record links to the official programme evidence, carries source-review information and preserves material gaps or conflicting status labels. Dates are not renewed merely because the page is built or someone runs the checker. Source links are the place to confirm the latest conditions before committing money.</p>
        <p>This release prioritises relevant programmes rather than claiming exhaustive coverage of local council, philanthropic, disaster-specific or industry grants. Detailed commercial finance research and new state-specific borrowing rules are a separate next phase.</p>
        <h2>How SiteComms helps after research</h2>
        <p>A useful next step is a clear requirement and comparable supplier quotes. SiteComms reviews an explicitly submitted enquiry and replies with suitable providers’ public contact details. We do not automatically forward the enquiry, lodge a grant application or guarantee that a provider can secure funding.</p>
      </section>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/tools/funding-check" className="sc-btn-primary">Find researched pathways</Link><Link href="/pricing-tool" className="sc-btn-secondary">Estimate the modelled system</Link><Link href="/tools/finance-check" className="sc-btn-secondary">Finance preparation — separate from grants</Link></div>
    </div>
  </div>;
}
