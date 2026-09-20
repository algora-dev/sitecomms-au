import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import { FundingSourceLinks } from "./FundingPathwayCard";
import { FUNDING_PATHWAYS } from "@/lib/funding/catalogue";
import { fundingPublicationStatus } from "@/lib/funding/assessment";
import { ROUTE_LABELS } from "@/lib/funding/types";
import type { StateFundingGuide as Guide } from "@/lib/funding/guides";
import { withProjectState } from "@/lib/jurisdictions";
import { reviewedLabel, publishedDate, reviewedDate } from "@/lib/content-meta";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";
export default function StateFundingGuide({ guide }: { guide: Guide }) {
  const path = `/funding/${guide.slug}`;
  const title = `${guide.name} funding routes for PA, paging and intercom projects`;
  const now = new Date();
  const records = FUNDING_PATHWAYS.filter(p => p.jurisdictions.includes(guide.state) || p.jurisdictions.includes("national"));
  return <div>
    <AuthorityHero eyebrow={`${guide.name} project planning`} title={title} description={guide.description}
      tags={["School capital and approvals", "Aged care", "Selected community / early-learning routes"]}
      primaryCta={{ label: `Check a ${guide.state} project`, href: withProjectState("/tools/funding-check", guide.state) }}
      secondaryCta={{ label: "All funding guides", href: "/funding" }} reviewed={reviewedLabel(path)}
      note="Programme evidence and SiteComms interpretation are distinguished below"
      breadcrumb={[{ name: "SiteComms", href: "/" }, { name: "Funding", href: "/funding" }, { name: guide.name }]} />
    <div className="sc-container max-w-4xl pb-16 pt-6">
      <div className="sc-card bg-[var(--sc-blue-50)] p-6 text-sm leading-relaxed text-[var(--sc-slate)]"><strong className="text-[var(--sc-blue-900)]">Use this as a route map, not an eligibility decision.</strong> Funding depends on the actual applicant, asset owner, approved scope, timing and the authority’s assessment. No amount is awarded or deducted from a SiteComms price estimate.</div>
      <nav className="my-7 text-sm" aria-label="On this funding page"><a href="#state-decisions" className="font-semibold text-[var(--sc-blue-700)] underline">State-specific decisions</a><span aria-hidden> · </span><a href="#reviewed-pathways" className="font-semibold text-[var(--sc-blue-700)] underline">Reviewed programmes and sources</a><span aria-hidden> · </span><a href="#project-brief" className="font-semibold text-[var(--sc-blue-700)] underline">Prepare the brief</a></nav>
      <section id="state-decisions" className="scroll-mt-24 space-y-8">
        {guide.sections.map(section => <section key={section.title} className="sc-card p-6"><h2 className="text-xl font-bold text-[var(--sc-blue-900)]">{section.title}</h2><p className="mt-3 leading-relaxed text-[var(--sc-slate)]">{section.text}</p><FundingSourceLinks ids={section.source_ids} /></section>)}
      </section>
      <section id="reviewed-pathways" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">Reviewed state and national routes</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">The records below use the same programme catalogue as the checker. Dates are evaluated when this page is requested, not treated as proof of live funder availability. Check the official source before applying. National records apply only to their specified organisations.</p>
        <div className="mt-6 space-y-5">{records.map(record => {
          const status = fundingPublicationStatus(record, now);
          return <article key={record.id} id={record.id} className="sc-card scroll-mt-24 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">{ROUTE_LABELS[record.route_type]}{record.jurisdictions.includes("national") ? " · National programme" : ""}</p>
            <h3 className="mt-2 text-lg font-bold text-[var(--sc-blue-900)]">{record.title}</h3>
            <p className="mt-3 text-sm font-semibold text-[var(--sc-blue-900)]">{status.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{record.availability_note}</p>
            {!["withdrawn", "unavailable"].includes(status.freshness) && <><p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Official programme facts: </strong>{record.facts}</p><p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>SiteComms interpretation: </strong>{record.interpretation}</p>
            {record.published_funding_terms && <p className="mt-3 text-sm text-[var(--sc-slate)]"><strong>Published programme terms, not an award: </strong>{record.published_funding_terms}</p>}
            <details className="mt-4 rounded-lg border border-[var(--sc-border)] p-3 text-sm text-[var(--sc-slate)]"><summary className="cursor-pointer font-semibold">Material conditions and next action</summary><ul className="mt-3 list-disc space-y-2 pl-5">{record.conditions.map(c => <li key={c}>{c}</li>)}</ul><p className="mt-4"><strong>Next step: </strong>{record.next_step}</p></details></>}
            <FundingSourceLinks ids={record.source_ids} />
          </article>;
        })}</div>
      </section>
      <section id="project-brief" className="sc-prose mt-10 scroll-mt-24">
        <h2>Prepare a scope the responsible people can assess</h2>
        <p>Identify the legal applicant, project owner, site location and permission to do works. Separate the communications requirement from building works, network upgrades, clinical nurse call and regulated emergency systems. Record what is already committed and what remains only a proposal.</p>
        <p>Use itemised supplier quotes that identify equipment, installation, commissioning, cabling, training, support and exclusions. A preliminary SiteComms range helps planning but does not replace the quotations or professional evidence a programme requests.</p>
        <p>The <Link href="/guides/compare-pa-system-quotes">quote-comparison guide</Link> and <Link href="/guides/school-pa-paging-requirements">school requirements guide</Link> help define that scope. For care sites, keep <Link href="/industries/aged-care-retirement-villages">general PA and intercom separate from clinical systems</Link>.</p>
        <h2>Coverage and remaining research</h2><p>{guide.gap}</p>
        <p>SiteComms can review your technical requirement and reply with suitable providers’ public contact details. We do not approve grants, submit an application to the funder, promise a funding outcome or forward your enquiry to providers.</p>
      </section>
      <div className="mt-8 flex flex-wrap gap-3"><Link href={withProjectState("/tools/funding-check", guide.state)} className="sc-btn-primary">Check a {guide.state} project</Link><Link href="/pricing-tool" className="sc-btn-secondary">Plan the system budget</Link></div>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ headline: title, description: guide.description, url: `${site.url}${path}`, datePublished: publishedDate(path), dateModified: reviewedDate(path) })).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "SiteComms Australia", url: site.url }, { name: "Funding", url: `${site.url}/funding` }, { name: guide.name, url: `${site.url}${path}` }])).replace(/</g, "\\u003c") }} />
  </div>;
}
