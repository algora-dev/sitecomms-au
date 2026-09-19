import type { ReactNode } from "react";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { StateAwareLink } from "@/components/project-state";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
import { schoolPlatforms, conditionalPlatform, schoolUseCases, comparisonSources, comparisonEvidenceRecords, type ComparisonSourceId } from "@/lib/content/school-compare";
const path = "/compare";
const title = "Compare Australian school PA, paging, bell and intercom systems";
const description = "Compare FrontRow Conductor, Algo, Axis, Bosch PROSPERO, Bodet Harmonys, TOA and traditional/hybrid PA, with Australian evidence and clear supply-verification limits.";
export const metadata = buildMetadata({ title, description, path });
const linkClass = "font-semibold text-[var(--sc-blue-700)] underline underline-offset-2";
function Sources({ ids }: { ids: readonly ComparisonSourceId[] }) {
 return <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">{ids.map(id => <a key={id} className={linkClass} href={comparisonSources[id].href} target="_blank" rel="noopener noreferrer">{comparisonSources[id].label}<span className="sr-only"> (opens in a new tab)</span></a>)}</div>;
}
function Section({ id, title: heading, children }: { id: string; title: string; children: ReactNode }) {
 return <section id={id} className="sc-container max-w-6xl scroll-mt-44 py-10"><h2 className="text-2xl font-bold text-[var(--sc-blue-900)] md:text-3xl">{heading}</h2>{children}</section>;
}
export default function ComparePage() {
 return <article>
  <AuthorityHero eyebrow="Australian school and multi-zone communications" title={title} description={description}
   tags={["Use-case comparison", "Australian supply evidence", "No universal winner"]}
   primaryCta={{ label: "Estimate the modelled system", href: "/pricing-tool" }} secondaryCta={{ label: "Compare the shortlist", href: "#shortlist" }}
   reviewed={reviewedLabel(path)} note="Editorial planning guide, not a hands-on test or installed-price ranking" />
  <nav aria-label="On this comparison page" className="sc-container max-w-6xl flex flex-wrap gap-4 py-5 text-sm">
   {[["shortlist","Start with the job"],["capabilities","Compare capabilities"],["platforms","Platform evidence"],["specialist","Specialist and conditional options"],["costs","Cost and quote scope"],["sources","Sources"]].map(([id,label]) => <a key={id} href={`#${id}`} className={linkClass}>{label}</a>)}
  </nav>
  <div className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
   <Section id="shortlist" title="Choose the architecture before choosing the brand">
    <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">The practical comparison is a complete design: daily bells, live announcements, room calls, outdoor coverage, network dependencies and support. A product family may cover only part of that job. These are representative approaches, not a market-share survey or a claim that every listed system suits every school.</p>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{schoolUseCases.map(useCase => <div key={useCase.title} className="sc-card bg-white p-6">
     <h3 className="font-bold text-[var(--sc-blue-900)]">{useCase.title}</h3>
     <p className="mt-3 flex flex-wrap gap-3 text-sm">{useCase.ids.map(id => <a key={id} href={`#${id}`} className={linkClass}>{schoolPlatforms.find(p => p.id === id)?.name}</a>)}</p>
     <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{useCase.note}</p>
    </div>)}</div>
    <p className="mt-5 text-sm text-[var(--sc-slate)]">Options are not ranked. <Link href="/industries/aged-care-retirement-villages" className={linkClass}>Aged care and retirement villages need a different brief</Link>; entrance access and clinical call-response should not be inferred from a school paging comparison.</p>
   </Section>
  </div>
  <Section id="capabilities" title="Compare the proposed configuration, not a whole-brand score">
   <p className="mt-4 text-[var(--sc-slate)]">Read each row with its source links and profile. &ldquo;Confirm&rdquo; or &ldquo;ask&rdquo; marks a specification question, not a finding that a feature is absent.</p>
   <p className="mt-4 text-xs text-[var(--sc-slate)] lg:hidden">Scroll across the table to see all columns.</p>
   <div role="region" tabIndex={0} aria-label="Australian paging capability comparison" className="mt-3 overflow-x-auto rounded-xl border border-[var(--sc-border)]">
    <table className="w-full min-w-[980px] text-left text-sm leading-relaxed">
     <caption className="p-4 text-left text-xs text-[var(--sc-slate)]">Australian product/manufacturer evidence does not guarantee local stock, installation coverage or every optional feature.</caption>
     <thead className="bg-[var(--sc-blue-900)] text-white"><tr>{["Approach","Bells and paging","Two-way communication","Existing PA","Visual alerts"].map(label => <th key={label} scope="col" className="px-4 py-3">{label}</th>)}</tr></thead>
     <tbody>{schoolPlatforms.map((p,i) => <tr key={p.id} className={`border-t border-[var(--sc-border)] align-top ${i%2 ? "bg-slate-50" : "bg-white"}`}>
      <th scope="row" className="px-4 py-4"><a href={`#${p.id}`} className={linkClass}>{p.name}</a><Sources ids={p.sources} /></th>
      {[p.bells,p.intercom,p.legacy,p.visual].map((text,j) => <td key={j} className="px-4 py-4 text-[var(--sc-slate)]">{text}</td>)}
     </tr>)}</tbody>
    </table>
   </div>
  </Section>
  <div className="border-y border-[var(--sc-border)] bg-slate-50">
   <Section id="platforms" title="Platform profiles and Australian evidence">
    <div className="mt-6 space-y-5">{schoolPlatforms.map(p => <section key={p.id} id={p.id} className="sc-card scroll-mt-44 bg-white p-6 md:p-8">
     <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">{p.family}</p>
     <h3 className="mt-2 text-2xl font-bold text-[var(--sc-blue-900)]">{p.name}</h3>
     <p className="mt-3 font-semibold text-[var(--sc-blue-900)]">Consider when: {p.consider}</p>
     <p className="mt-3 max-w-4xl leading-relaxed text-[var(--sc-slate)]">{p.summary}</p>
     <div className="mt-4 rounded-lg bg-[var(--sc-blue-50)] p-4">
      <p className="text-sm font-semibold text-[var(--sc-blue-900)]">{p.status}</p><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{p.auEvidence}</p><Sources ids={p.sources} />
     </div>
     <div className="mt-5 grid gap-5 md:grid-cols-2"><div><h4 className="font-semibold text-[var(--sc-blue-900)]">Operations and ownership</h4><p className="mt-2 text-sm text-[var(--sc-slate)]">{p.operations}</p></div><div><h4 className="font-semibold text-[var(--sc-blue-900)]">Cost boundary</h4><p className="mt-2 text-sm text-[var(--sc-slate)]">{p.cost}</p></div></div>
     <details className="mt-5 border-t border-[var(--sc-border)] pt-4"><summary className={`cursor-pointer text-sm ${linkClass}`}>Questions for the provider</summary><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--sc-slate)]">{p.verify.map(q => <li key={q}>{q}</li>)}</ul></details>
    </section>)}</div>
   </Section>
  </div>
  <Section id="specialist" title="Keep specialist and unverified routes separate">
   <div className="mt-6 grid gap-5 md:grid-cols-2">
    <section id="2n" className="sc-card scroll-mt-44 p-6"><h3 className="text-xl font-bold text-[var(--sc-blue-900)]">2N: entrance intercom and access</h3><p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">The current IP Verso 2.0 is an entrance-intercom product, and advanceNET publishes a 2N category in Australia. Evaluate the exact model, answering point and access interface. That is not evidence that a current entrance product replaces an entire school bell/paging platform or that an older audio family remains supported.</p><Sources ids={["2n","2n-au"]} /></section>
    <section id="spon" className="sc-card scroll-mt-44 p-6"><h3 className="text-xl font-bold text-[var(--sc-blue-900)]">SPON: Australian support still to verify</h3><p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{conditionalPlatform.summary}</p><Sources ids={conditionalPlatform.sources} /><ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--sc-slate)]">{conditionalPlatform.verify.map(q => <li key={q}>{q}</li>)}</ul></section>
   </div>
   <p id="itc" className="mt-5 max-w-4xl scroll-mt-44 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>ITC:</strong> not included in the main Australian comparison because this review has not verified a current Australian supply/support route for the relevant family. This is an evidence gap, not a finding that the products cannot be supplied.</p>
   <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Engineered AV, mass notification and voice alarm:</strong> products such as Q-SYS, AtlasIED and Bosch PRAESENSA require a separately specified architecture and current local product evidence before we publish a like-for-like comparison. Ordinary PA, a configurable AV platform and a regulated emergency-warning design should not share a simplistic feature score.</p>
  </Section>
  <div className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]"><Section id="costs" title="Compare cost against the same job">
   <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">Ask for the controller/software, endpoints, amplifiers, call controls, licences, network/power work, installation, travel, acceptance tests and support. Overseas component prices do not establish Australian installed-project costs. The SiteComms calculator is a stable AUD planning model for its stated scope, with an 80–100% range around the model baseline; it is not a price ranking of these brands.</p>
   <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">Site-wide structured cabling and unusual project conditions must be scoped separately. A saved state provides enquiry context, not an automatic regional price multiplier or a guarantee of service coverage.</p>
   <div className="mt-5 flex flex-wrap gap-3"><StateAwareLink href="/pricing-tool" className="sc-btn-primary">Estimate the modelled scope</StateAwareLink><Link href="/guides/compare-pa-system-quotes" className="sc-btn-secondary">Compare complete quotes</Link></div>
  </Section></div>
  <Section id="school-scenario" title="One school brief, two legitimate architectures">
   <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">Consider an illustrative site with 24 classrooms, two administration areas, a hall and three outdoor areas. Those 30 coverage areas are not necessarily 30 speakers or 30 independent software zones. Ask one proposal to provide network endpoints where needed and another to retain suitable existing circuits. Require both to meet the same coverage, controls and operational brief.</p>
   <details className="sc-card mt-5 p-6"><summary className={`cursor-pointer ${linkClass}`}>Acceptance demonstrations to put in the brief</summary><ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">
    <li>Change a normal timetable, a special-day exception and holiday shutdown without changing unrelated schedules.</li>
    <li>Demonstrate one-room, block and whole-site paging with the agreed background-noise conditions.</li>
    <li>Where specified, make a room call, handle simultaneous requests and demonstrate message priority and cancellation.</li>
    <li>Test internet, local network, controller and power loss separately; record recovery and staff fallback procedures.</li>
    <li>Restore a configuration backup and hand over accounts, drawings, support contacts and agreed training.</li>
   </ol></details>
   <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--sc-slate)]">For regulated emergency-warning work, involve the relevant qualified designer and approving parties. A product brochure&apos;s emergency feature does not certify the site design. Use the <Link href="/guides/school-pa-paging-requirements" className={linkClass}>school requirements guide</Link> and <Link href="/guides/ip-paging-network-readiness" className={linkClass}>network checklist</Link> to prepare the scope.</p>
  </Section>
  <Section id="providers" title="Australian supply evidence, without a directory of endorsements">
   <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">ClearaSound publishes a FrontRow Conductor service page; advanceNET publishes Algo, Bodet and 2N listings; TOA&apos;s own directory identifies an Australian dealer. These are public starting points for checking supply or services, not claims that the organisations are SiteComms partners, that their coverage is nationwide, or that they have been independently performance-tested.</p>
   <Sources ids={["clearasound","algo","bodet","2n-au","toa-au"]} />
   <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">For an enquiry, SiteComms reviews the requirement and responds with suitable providers&apos; public contact details. You choose whether to contact them. Your enquiry is not automatically forwarded.</p>
   <div className="mt-6"><ProjectHelpLauncher mode="system_selection" sourceTopic="compare" buttonLabel="Discuss the right approach for your site" /></div>
  </Section>
  <Section id="sources" title="Evidence register and review limits">
   <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--sc-slate)]">Reviewed {reviewedLabel(path)}. Manufacturer pages describe capability; Australian listings identify an enquiry route. No market-share claim, hands-on score, stock check, care-sector certification or state-wide service guarantee is implied. The use-case groupings and quote questions are SiteComms editorial planning recommendations. This is a selected comparison, not an exhaustive Australian supplier census.</p>
   <details className="sc-card mt-5 p-6"><summary className={`cursor-pointer ${linkClass}`}>Open the source register ({Object.keys(comparisonSources).length})</summary><div className="mt-4 grid gap-4 md:grid-cols-2">{comparisonEvidenceRecords().map(s => <div key={s.source_id}><a href={s.href} target="_blank" rel="noopener noreferrer" className={`text-sm ${linkClass}`}>{s.label}</a><p className="mt-1 text-xs text-[var(--sc-slate)]">{s.kind}. Source: {s.source_id}; inherited Phase 1 research, not a new stock check.</p></div>)}</div></details>
  </Section>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({...articleSchema({ headline: title, description, url: `${site.url}${path}`, datePublished: publishedDate(path), dateModified: reviewedDate(path) }), citation: Object.values(comparisonSources).map(s => s.href)}).replace(/</g, "\\u003c") }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "SiteComms Australia", url: site.url }, { name: "Compare systems", url: `${site.url}${path}` }])) }} />
 </article>;
}
