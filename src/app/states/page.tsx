import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import { ProjectStatePanel } from "@/components/project-state";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { JURISDICTIONS, withProjectState } from "@/lib/jurisdictions";
import { buildMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
const title = "Plan PA, paging and intercom projects by Australian state";
const description = "Choose your project state or territory, identify the organisation and approval owner, and plan communications scope without assuming funding eligibility or local installer coverage.";
export const metadata = buildMetadata({ title, description, path: "/states" });
const linkClass = "font-semibold text-[var(--sc-blue-700)] underline underline-offset-2";
export default function StatesPage() {
  return <div>
    <AuthorityHero eyebrow="One national resource, local project context" title={title} description={description}
      tags={["All eight jurisdictions", "Schools", "Aged care", "Other large sites"]}
      primaryCta={{ label: "Define the system", href: "/systems" }} secondaryCta={{ label: "Funding research status", href: "/tools/funding-check" }}
      reviewed={reviewedLabel("/states")} note="Planning directory, not eight separate websites or a live grant-matching service" />
    <div className="sc-container max-w-5xl py-6">
      <ProjectStatePanel />
      <section className="sc-prose max-w-4xl">
        <h2>What changes with the project location?</h2>
        <p>Use the same technical guide to define announcements, bells, zones, intercom and retained equipment. Then establish the local approval route, applicable organisation rules and the practical service arrangements for the site. Do not assume another state&apos;s school process or another operator&apos;s funding access applies to your project.</p>
        <p>The selector currently carries location into tools and enquiries. The pricing model remains national. Funding matching and state-specific finance checks are not live in this release. The directory below supplies official education starting points, not a finding that any grant is open or that equipment is eligible.</p>
        <h2>Start with the entity, not just the building</h2>
        <p>For schools, distinguish government, Catholic and independent governance. For care sites, record whether the applicant is a residential aged care provider, retirement-village operator, property owner or another legal entity. For a community facility, identify the council, not-for-profit, tenant and owner roles. Those identities need to be resolved before a later funding assessment can be meaningful.</p>
        <h2>Choose the state or territory of the physical project</h2>
        <p>Use the location of the site being upgraded, not just the organisation&apos;s head office. For a multisite project, list each location in the enquiry. A single saved state is a convenience, not a complete multi-jurisdiction assessment.</p>
      </section>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {JURISDICTIONS.map((item) => <section key={item.code} id={item.slug} className="sc-card scroll-mt-44 p-6">
          <h2 className="text-xl font-bold text-[var(--sc-blue-900)]">{item.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Planning a {item.code} project? Record the sector and project owner, then use the same scope and network checklists as the national guide. Confirm approvals with the relevant organisation before commissioning work.</p>
          <p className="mt-3 text-sm"><a href={item.educationUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Official {item.code} education starting point<span className="sr-only"> (opens in a new tab)</span></a></p>
          <p className="mt-2 text-xs text-[var(--sc-slate)]">Department directory only; not evidence of a specific grant, eligibility or supplier approval. Non-government schools must also confirm their governing body&apos;s requirements.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={withProjectState("/pricing-tool", item.code)} className={linkClass}>Plan a {item.code} budget</Link>
            <Link href={withProjectState("/tools/funding-check", item.code)} className={linkClass}>Funding status for this context</Link>
          </div>
        </section>)}
      </div>
      <section className="sc-prose mt-10 max-w-4xl">
        <h2>Aged care, retirement villages and other large sites</h2>
        <p>A communications brief should identify the service delivered, the operating entity and who owns the infrastructure. General PA and entrance intercom do not automatically cover clinical nurse call or individual resident assistance. Begin with the <Link href="/industries/aged-care-retirement-villages">aged-care planning guide</Link> and keep any clinical system separate in the scope.</p>
        <p>For public facilities, industrial sites, tertiary campuses and community organisations, record the same basics: independent zones, authorised operators, existing assets, network readiness and support owner. Do not select a school entity in a funding tool simply because the proposed equipment is similar.</p>
        <h2>Metropolitan, regional and remote delivery</h2>
        <p>Describe access constraints rather than relying on a state label. Ask who can attend the actual location, what travel is excluded, whether installation must happen outside operating hours and how warranty replacements are handled. Evaluate local-network and power resilience separately from internet availability.</p>
        <p>SiteComms does not apply unverified location price uplifts or claim an installer network covering every community. A provider&apos;s own published scope and a current written proposal are the appropriate places to confirm coverage.</p>
        <h2>How a SiteComms enquiry works</h2>
        <p>You submit the requirement to SiteComms. We review it and respond with the provider or providers we consider suitable and their public contact details. You decide whether to contact them. We do not automatically send the enquiry to installers, lenders or grant bodies.</p>
      </section>
      <div className="my-8 flex flex-wrap gap-3"><ProjectHelpLauncher mode="project_help" sourceTopic="state_planning" buttonLabel="Discuss your site and next step" /><Link href="/guides/school-pa-paging-requirements" className="sc-btn-secondary">School project requirements</Link></div>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ headline: title, description, url: `${site.url}/states`, datePublished: publishedDate("/states"), dateModified: reviewedDate("/states") })).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "SiteComms Australia", url: site.url }, { name: "State planning", url: `${site.url}/states` }])) }} />
  </div>;
}
