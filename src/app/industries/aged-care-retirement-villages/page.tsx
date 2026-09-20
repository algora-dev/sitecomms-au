import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
import { planningEstimate } from "@/lib/agent-ready/assessment";
import { formatAUD } from "@/lib/pricing/config";
import { buildIndustryToolHref } from "@/lib/industry-context";
import { CARE_PRICING_EXAMPLE, careExamplePricingHref } from "@/lib/content/aged-care-example";
import {
  AGED_CARE_PATH, AGED_CARE_TITLE, AGED_CARE_HEADLINE, AGED_CARE_DESCRIPTION,
  careSources, carePlatforms, careUseCases, careQuestions,
  type CareSourceId, type CarePlatformId,
} from "@/lib/content/aged-care-guide";

/** Server-rendered editorial page. Shared enquiry modal is the only client island. */
export const metadata: Metadata = buildMetadata({
  title: AGED_CARE_TITLE, description: AGED_CARE_DESCRIPTION, path: AGED_CARE_PATH,
});
const pageUrl = `${site.url.replace(/\/$/, "")}${AGED_CARE_PATH}`;
const pricingHref = buildIndustryToolHref("/pricing-tool", { industry: "aged-care", source: "other" });
const financeHref = buildIndustryToolHref("/tools/finance-check", { industry: "aged-care", source: "other" });
const financingHref = buildIndustryToolHref("/financing", { industry: "aged-care", source: "other" });
const evidenceEntries = Object.entries(careSources) as [CareSourceId, (typeof careSources)[CareSourceId]][];
const numbers = Object.fromEntries(evidenceEntries.map(([id], index) => [id, index + 1])) as Record<CareSourceId, number>;
const platformNames = Object.fromEntries(carePlatforms.map(({ id, name }) => [id, name])) as Record<CarePlatformId, string>;
/** FrontRow is treated as conditional rather than a main greenfield shortlist entry. */
const mainPlatforms = carePlatforms.filter((p) => p.id !== "frontrow" && p.id !== "spon");
const linkClass = "rounded font-semibold text-[var(--sc-blue-700)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

function Sources({ ids }: { ids: readonly CareSourceId[] }) {
  if (!ids.length) return null;
  return (
    <span className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs leading-relaxed text-[var(--sc-slate)]">
      <span>Evidence:</span>
      {ids.map((id) => (
        <a key={id} href={careSources[id].href} target="_blank" rel="noopener noreferrer" className={linkClass}
          aria-label={`${careSources[id].label}, source ${numbers[id]} (opens in a new tab)`}
          title={`${careSources[id].kind}: ${careSources[id].label}`}>[{numbers[id]}]</a>
      ))}
    </span>
  );
}
function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold leading-relaxed text-slate-700">{children}</span>;
}
function SectionHeading({ id, eyebrow, children, description }: { id: string; eyebrow: string; children: ReactNode; description?: string }) {
  return <div className="max-w-4xl">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">{eyebrow}</p>
    <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-3xl">{children}</h2>
    {description && <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">{description}</p>}
  </div>;
}
function TableRegion({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs text-[var(--sc-slate)] lg:hidden">Scroll across the table to compare all columns.</p>
      <div role="region" aria-label={label} tabIndex={0}
        className="overflow-x-auto rounded-xl border border-[var(--sc-border)] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-blue-700)]">
        {children}
      </div>
    </div>
  );
}
function Help({ useCase, label = "Ask who to contact", className }: { useCase: string; label?: string; className?: string }) {
  return <ProjectHelpLauncher mode="system_selection" sourceTopic="aged_care_retirement_villages" buttonLabel={label}
    className={className ?? "sc-btn-primary cursor-pointer"}
    context={{ industry: "Aged care / retirement village", sourcePage: AGED_CARE_PATH, topic: useCase }} />;
}
function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function AgedCareRetirementVillagesPage() {
  const example = planningEstimate(CARE_PRICING_EXAMPLE);
  const exampleFinanceHref = buildIndustryToolHref("/tools/finance-check", {
    industry: "aged-care", source: "pricing", estimate: example ? { low: example.low, high: example.high } : undefined,
  });
  const article = {
    ...articleSchema({ headline: AGED_CARE_HEADLINE, description: AGED_CARE_DESCRIPTION, url: pageUrl,
      datePublished: publishedDate(AGED_CARE_PATH), dateModified: reviewedDate(AGED_CARE_PATH) }),
    "@id": `${pageUrl}#article`, inLanguage: "en-AU",
    about: [
      { "@type": "Thing", name: "Aged-care and retirement-village public address systems" },
      { "@type": "Thing", name: "IP paging and entrance intercom" },
    ],
    citation: evidenceEntries.map(([, source]) => source.href),
  };
  // Unordered editorial shortlist: positions identify visible entries, not ratings.
  const shortlistSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#shortlist`,
    name: "Australian aged-care and retirement-village communications comparison shortlist",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: mainPlatforms.length,
    itemListElement: mainPlatforms.map((platform, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${pageUrl}#care-${platform.id}`,
      name: `${platform.name}: ${platform.family}`,
      description: platform.verdict,
    })),
  };
  return (
    <article aria-labelledby="care-title">
      <header className="sc-container max-w-5xl py-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Australia · Aged care & retirement villages</p>
        <h1 id="care-title" className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-5xl">{AGED_CARE_HEADLINE}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[var(--sc-slate)]">
          Planning a aged-care-home PA upgrade, retirement-village announcement system or entrance intercom? Compare the systems against the job you need done: reaching the right areas, answering visitors, supporting staff and keeping everyday communication easy to manage.
        </p>
        <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">
          Compare <strong>Axis, 2N, Algo, TOA and Bosch PROSPERO</strong>, with SPON and FrontRow treated conditionally, for common areas, visitor access and general two-way calling. The right shortlist changes with the brief, and specialist nurse call is explained separately.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={pricingHref} className="sc-btn-primary">Estimate project cost</Link>
          <a href="#care-shortlists" className="sc-btn-secondary">Compare the shortlist</a>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-[var(--sc-slate)]">
          SiteComms editorial guide · Reviewed <time dateTime={reviewedDate(AGED_CARE_PATH)}>{reviewedLabel(AGED_CARE_PATH)}</time> · Document-based recommendations, not hands-on test scores. <a href="#care-methodology" className={linkClass}>How we compare</a>
        </p>
        <nav aria-label="Aged-care guide contents" className="mt-7 border-t border-[var(--sc-border)] pt-5">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {[["#care-shortlists", "Which system fits?"], ["#care-capabilities", "Feature comparison"], ["#care-scope", "PA or nurse call?"], ["#care-platforms", "Platform profiles"], ["#care-design", "What to demonstrate"], ["#care-cost", "Cost example"], ["#care-finance", "Finance & leasing"], ["#care-questions", "Buyer questions"], ["#care-sources", "Sources"]].map(([href, label]) => <li key={href}><a href={href} className={linkClass}>{label}</a></li>)}
          </ul>
        </nav>
      </header>

      <section id="care-shortlists" aria-labelledby="care-shortlists-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
        <div className="sc-container max-w-6xl">
          <SectionHeading id="care-shortlists-title" eyebrow="Start with the job, not the logo">
            Which system belongs on your aged-care or retirement-village shortlist?
          </SectionHeading>
          <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">
            There is no single winner. A retirement village choosing entrance/video communication has a different shortlist from a care facility replacing its PA, and both differ from a site wanting one integrated PA + intercom platform.
          </p>
          <TableRegion label="Aged-care use-case shortlists. Editorial starting points, not measured rankings.">
            <table className="w-full min-w-[760px] text-left text-sm leading-relaxed">
              <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Editorial shortlists drawn from the evidence on this page. The strongest fit is listed first where a clear reason exists — this is not a measured 1–3 ranking.</caption>
              <thead className="bg-[var(--sc-blue-900)] text-white"><tr>
                <th scope="col" className="w-1/3 px-4 py-3">What matters most</th>
                <th scope="col" className="px-4 py-3">Strong starting points</th>
                <th scope="col" className="px-4 py-3">Why</th>
              </tr></thead>
              <tbody>{careUseCases.map((useCase, index) => (
                <tr key={useCase.id} id={useCase.id} className={`scroll-mt-24 border-t border-[var(--sc-border)] align-top ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
                  <th scope="row" className="px-4 py-4 font-semibold text-[var(--sc-blue-900)]">{useCase.whatMatters}</th>
                  <td className="px-4 py-4 text-[var(--sc-slate)]">{useCase.startingPoints.map((id) => <a key={id} href={`#care-${id}`} className={linkClass}>{platformNames[id]}</a>).reduce<ReactNode[]>((acc, el, i) => (i === 0 ? [el] : [...acc, " · ", el]), [])}</td>
                  <td className="px-4 py-4 text-[var(--sc-slate)]">{useCase.why}<Sources ids={useCase.sources} /></td>
                </tr>
              ))}</tbody>
            </table>
          </TableRegion>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">
            Not sure which row fits your site? <Help useCase="Choosing an aged-care use-case shortlist" label="Tell us what needs to happen" className={`${linkClass} cursor-pointer bg-transparent`} />
          </p>
          <TableRegion label="Overall aged-care system shortlist. Scroll horizontally on smaller screens.">
            <table className="w-full min-w-[760px] text-left text-sm leading-relaxed">
              <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Main comparison options for an aged-care or retirement-village brief. The order is not a measured ranking. Select a name for its evidence and trade-offs.</caption>
              <thead className="bg-[var(--sc-blue-900)] text-white"><tr>
                <th scope="col" className="w-1/5 px-4 py-3">System / family</th>
                <th scope="col" className="px-4 py-3">When it makes sense</th>
                <th scope="col" className="px-4 py-3">Where value comes from</th>
                <th scope="col" className="px-4 py-3">What can change the cost / scope</th>
              </tr></thead>
              <tbody>{mainPlatforms.map((platform, index) => (
                <tr key={platform.id} className={`border-t border-[var(--sc-border)] align-top ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
                  <th scope="row" className="px-4 py-4 font-normal"><a href={`#care-${platform.id}`} className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">{platform.name}</a><span className="mt-1 block text-xs text-[var(--sc-slate)]">{platform.category}</span></th>
                  <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.verdict}</td>
                  <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.value}</td>
                  <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.costWatch}</td>
                </tr>
              ))}</tbody>
            </table>
          </TableRegion>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">
            <a href="#care-frontrow" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">FrontRow has a conditional role</a> where its room-audio ecosystem is already valuable. SPON is also conditional because Australian supply/support remains unverified. ITC is not included in the main Australian comparison. <a href="#care-alternatives" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Traditional 100V and specialist architectures</a> are covered below where the brief changes.
          </p>
        </div>
      </section>

      <section id="care-capabilities" aria-labelledby="care-capabilities-title" className="sc-container max-w-6xl scroll-mt-24 py-12">
        <SectionHeading id="care-capabilities-title" eyebrow="Apples to apples" description="These entries describe how the relevant current product family can deliver the function. They are not whole-brand scores, and clinical nurse call is outside this table.">
          Paging, intercom, visitor access and system reuse compared
        </SectionHeading>
        <TableRegion label="Aged-care capability comparison. Scroll horizontally on smaller screens.">
          <table className="w-full min-w-[860px] text-left text-sm leading-relaxed">
            <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Family-aware feature comparison. “Confirm” means the reviewed evidence does not establish the feature for the locally supplied package.</caption>
            <thead className="bg-[var(--sc-blue-900)] text-white"><tr>
              <th scope="col" className="px-4 py-3">Platform</th>
              <th scope="col" className="px-4 py-3">Zoned paging / schedules</th>
              <th scope="col" className="px-4 py-3">General two-way intercom</th>
              <th scope="col" className="px-4 py-3">Visitor video / entrance</th>
              <th scope="col" className="px-4 py-3">Existing PA / SIP integration</th>
            </tr></thead>
            <tbody>{mainPlatforms.map((platform, index) => (
              <tr key={platform.id} className={`border-t border-[var(--sc-border)] align-top ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
                <th scope="row" className="px-4 py-4"><a href={`#care-${platform.id}`} className="text-[var(--sc-blue-700)] underline underline-offset-2">{platform.name}</a></th>
                <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.paging}</td>
                <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.intercom}</td>
                <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.visitor}</td>
                <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.integration}<Sources ids={platform.sources.slice(0, 3)} /></td>
              </tr>
            ))}</tbody>
          </table>
        </TableRegion>
      </section>

      <section id="care-scope" aria-labelledby="care-scope-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-slate-50 py-12">
        <div className="sc-container max-w-5xl">
          <SectionHeading id="care-scope-title" eyebrow="Define the system before the brand">
            PA, staff paging and nurse call are different jobs
          </SectionHeading>
          <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">A search for “aged-care paging systems” can mean loudspeaker announcements, private messages to staff, or a resident’s call for assistance. Specify which you need. Specialist nurse-call and staff-notification systems go beyond a general PA/intercom quote and should be scoped separately.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["PA and announcements", "Live or scheduled audio to chosen common areas, staff areas or outdoor locations. This is the main cost/comparison scope here."],
              ["Entrance and general intercom", "Two-way communication with a defined answering point. Quote visitor video, access hardware and optional room calling explicitly."],
              ["Nurse call and staff alerts", "Resident assistance, pendants, call escalation or staff-device alerts need a separately specified response system—not just a speaker with a microphone."],
            ].map(([title, text]) => <div key={title} className="sc-card p-5"><h3 className="font-bold text-[var(--sc-blue-900)]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p></div>)}
          </div>
          <details className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5">
            <summary className={`cursor-pointer ${linkClass}`}>Independent village, residential care or a mixed site?</summary>
            <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">Australian Government guidance describes residential aged care as a service type. Our planning recommendation is to identify the actual service and operator rather than treating all retirement housing as the same: an independent-living village may prioritise entrances and shared spaces; a care facility needs its care-response systems scoped alongside general PA; a mixed village should identify where the systems connect and where they remain separate.</p>
            <Sources ids={["care-scope"]} />
          </details>
          <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">An emergency-announcement function is also not proof that a product meets a required fire/evacuation specification. Keep that engineered scope separate. Unsure which system you are asking for? <Help useCase="Distinguish PA, intercom, nurse call or specialist alerts" label="Tell us what needs to happen" className={`${linkClass} cursor-pointer bg-transparent`} />.</p>
        </div>
      </section>

      <section id="care-platforms" aria-labelledby="care-platforms-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
        <SectionHeading id="care-platforms-title" eyebrow="The system behind the brand" description="Compare the actual product family and the supported design. An Australian listing establishes a route for enquiry, not guaranteed stock, nationwide service or a care-sector market share.">
          Detailed platform comparison and Australian evidence
        </SectionHeading>
        <div className="mt-7 space-y-5">
          {carePlatforms.map((platform) => (
            <section id={`care-${platform.id}`} key={platform.id} aria-labelledby={`care-${platform.id}-title`} className="sc-card scroll-mt-24 bg-white p-5 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 id={`care-${platform.id}-title`} className="text-2xl font-bold text-[var(--sc-blue-900)]">{platform.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--sc-blue-700)]">{platform.family}</p>
                </div>
                <Badge>{platform.category}</Badge>
              </div>
              <p className="mt-4 font-semibold text-[var(--sc-blue-900)]">{platform.fit}</p>
              <p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{platform.summary}</p>
              <Sources ids={platform.sources} />
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div><h4 className="font-semibold text-[var(--sc-blue-900)]">Where it earns its place</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">{platform.strengths.map((text) => <li key={text}>{text}</li>)}</ul></div>
                <div><h4 className="font-semibold text-[var(--sc-blue-900)]">Trade-offs to check</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">{platform.tradeoffs.map((text) => <li key={text}>{text}</li>)}</ul></div>
              </div>
              <div className="mt-5 rounded-lg border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-4">
                <h4 className="text-sm font-semibold text-[var(--sc-blue-900)]">Australian market fit / local ecosystem</h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{platform.australianMarket}</p>
                <Sources ids={platform.auSources} />
              </div>
              <details className="mt-5 border-t border-[var(--sc-border)] pt-4">
                <summary className={`cursor-pointer ${linkClass}`}>Design detail: endpoints, controls and quote scope</summary>
                <dl className="mt-4 grid gap-x-6 gap-y-4 text-sm leading-relaxed md:grid-cols-2">
                  {[
                    ["Core / control", platform.core],
                    ["Representative paging / audio", platform.audio],
                    ["General room/staff intercom", platform.call],
                    ["Entrance / video provision", platform.entrance],
                    ["Where value comes from", platform.value],
                    ["What to confirm in the quote", platform.costWatch],
                  ].map(([title, text]) => <div key={title}><dt className="font-semibold text-[var(--sc-blue-900)]">{title}</dt><dd className="mt-1 text-[var(--sc-slate)]">{text}</dd></div>)}
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">These are a quoting framework and component examples, not a complete bill of materials or an assurance of cross-family compatibility.</p>
                <Sources ids={[...platform.sources, ...platform.auSources]} />
              </details>
            </section>
          ))}
        </div>
      </section>

      <section id="care-alternatives" aria-labelledby="care-alternatives-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-slate-50 py-10">
        <div className="sc-container max-w-5xl">
          <SectionHeading id="care-alternatives-title" eyebrow="When the brief changes">
            Specialist and alternative architectures
          </SectionHeading>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-[var(--sc-blue-900)]">Traditional 100V / hybrid</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Keep a simple amplifier-and-speaker proposal in the comparison for modest one-way announcements, and ask what can be retained before choosing a full IP replacement.</p>
              <Link href="/systems/traditional-vs-ip" className={`mt-3 inline-block text-sm ${linkClass}`}>Compare analogue, IP and hybrid</Link>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--sc-blue-900)]">AtlasIED</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Enterprise/mass-notification scope needs its own current product and Australian delivery review. Do not infer a care-sector recommendation from the brand name alone.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--sc-blue-900)]">Bosch PRAESENSA</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Investigate separately when a supervised public-address / voice-alarm design is an actual engineering requirement. PRAESENSA and PROSPERO are different systems; capabilities do not transfer between them.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--sc-blue-900)]">FrontRow</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Conditional where an existing FrontRow room-audio environment or a specialised activity/training-room audio requirement makes its ecosystem relevant to the wider project.</p>
              <Sources ids={["frontrow-system", "frontrow-Australian"]} />
            </div>
          </div>
        </div>
      </section>

      <section id="care-design" aria-labelledby="care-design-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
        <SectionHeading id="care-design-title" eyebrow="Design around people">What should the installer demonstrate?</SectionHeading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">Our suggested acceptance brief is based on staff tasks rather than a generic speaker count. Include your care, facilities and IT teams where the scope crosses their responsibilities.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["The right places, not every room", "Page a lounge, a staff area and the outdoor space separately. Agree whether resident bedrooms receive routine announcements at all; do not use bed count as an automatic speaker quantity."],
            ["Quiet hours and clear speech", "Demonstrate the routine timetable, message priority and authorised overrides. Include hearing-accessibility needs in the brief rather than assuming more volume solves them."],
            ["Calls that reach someone", "Show who answers an entrance or general intercom call, what happens when reception is busy and the after-hours arrangement. Clinical escalation remains a separate nurse-call requirement."],
            ["Recovery and ongoing support", "Test internet, local-server, network-switch and power failures separately. Specify backups, software responsibility, replacement lead times and a supported upgrade path."],
          ].map(([title, text]) => <div key={title} className="sc-card p-5"><h3 className="font-bold text-[var(--sc-blue-900)]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p></div>)}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">For microphone-equipped devices, agree who can initiate a call, where audio is heard and whether any recording is proposed. For network planning, use the <Link href="/guides/ip-paging-network-readiness" className={linkClass}>IP paging network-readiness checklist</Link>.</p>
        <div className="mt-5"><Help useCase="Care-site installer demonstration and project scope" label="Help me find the right provider" /></div>
      </section>

      <section id="care-cost" aria-labelledby="care-cost-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
        <div className="sc-container max-w-5xl">
          <SectionHeading id="care-cost-title" eyebrow="A useful starting budget">What could an aged-care PA and intercom upgrade cost?</SectionHeading>
          <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">The SiteComms calculator can model the <strong>general paging and optional intercom</strong> part of the project. Start with the actual rooms and outdoor areas that need coverage, then adjust calling and other options. It is not a per-bed price or a quotation for the entire care-communications system.</p>
          <div className="mt-6 rounded-2xl border border-[var(--sc-border)] bg-white p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Illustrative common-area project · not a real installation</p>
            <h3 className="mt-2 text-xl font-bold text-[var(--sc-blue-900)]">Six small indoor areas, one large lounge, one outdoor area and one voice-entry point</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Assumes suitable existing data cabling, the Essential package, no room-call buttons and no monitoring service. These are eight audio coverage areas plus an entrance—not nine speakers or nine software zones. The calculator applies its normal speaker-quantity assumptions.</p>
            <p className="mt-5 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-4xl">{example ? `${formatAUD(example.low)}–${formatAUD(example.high)}` : "Estimate unavailable — pricing assumptions need review"}<span className="mt-1 block text-sm font-medium tracking-normal text-[var(--sc-slate)]">AUD, excluding GST · indicative installed planning range</span></p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Calculated from the existing SiteComms model, including its central-platform and installation allowances. It is not a measured multi-brand average or a promise of a provider quote at this price. Different architectures and site conditions can fall outside it.</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Not included:</strong> site-wide cabling, a clinical nurse-call/pendant system, a complete door/access-control project or an engineered fire/evacuation system. Those require their own scope. Confirm network capacity, installation access and any additional works.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={careExamplePricingHref()} className="sc-btn-primary">Adjust this example</Link>
              <Link href={pricingHref} className="sc-btn-secondary">Start my own estimate</Link>
              <Link href={exampleFinanceHref} className="sc-btn-secondary">Explore payment options</Link>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">Existing 100V equipment may change the best approach substantially. The calculator models a particular new-system scope; a hybrid-reuse quote may be different. Read the <Link href="/pricing" className={linkClass}>pricing assumptions and exclusions</Link>, or <Help useCase="Cost or reuse scope for an aged-care project" label="ask who to contact about your scope" className={`${linkClass} cursor-pointer bg-transparent`} />.</p>
        </div>
      </section>

      <section id="care-finance" aria-labelledby="care-finance-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
        <SectionHeading id="care-finance-title" eyebrow="Payment options">Finance and leasing for a village communications upgrade</SectionHeading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">A financing discussion should begin with the actual legal borrower and its authority to contract. Equipment, installation costs, security, term and ownership need assessment by a qualified provider. This phase has not validated lender eligibility for Australian aged-care operators.</p>

        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">The SiteComms check asks for a little project and budget context; it does not approve finance, quote repayments or reject an enquiry because the deposit or budget is uncertain. You can request the next step at every result level.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={financeHref} className="sc-btn-primary">Explore payment options</Link>
          <Link href={financingHref} className="sc-btn-secondary">Read about finance and leasing</Link>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]"><Link href="/tools/funding-check" className={linkClass}>Check researched funding pathways for care and community projects</Link>. The checker distinguishes residential aged care from retirement-village operation and flags restricted or unverified routes; it does not approve eligibility or award money.</p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">This is commercial equipment planning for the organisation, not residential-care subsidy advice. Funding and finance are separate questions. The funding research will consider relevant non-school entities rather than reusing school assumptions.</p>
      </section>

      <section id="care-questions" aria-labelledby="care-questions-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-slate-50 py-12">
        <div className="sc-container max-w-4xl">
          <SectionHeading id="care-questions-title" eyebrow="Buyer questions">Aged-care and retirement-village communications FAQs</SectionHeading>
          <div className="mt-5 divide-y divide-[var(--sc-border)]">
            {careQuestions.map((faq) => <section id={faq.id} key={faq.id} className="scroll-mt-24 py-5" aria-labelledby={`${faq.id}-title`}>
              <h3 id={`${faq.id}-title`} className="text-lg font-bold text-[var(--sc-blue-900)]">{faq.question}</h3>
              <p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{faq.answer}</p>
              <Sources ids={faq.sources} />
            </section>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="care-next-title" className="bg-[var(--sc-blue-900)] py-12 text-white">
        <div className="sc-container max-w-4xl text-center">
          <h2 id="care-next-title" className="text-3xl font-bold">Define what the site needs. Then choose the system.</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-blue-100">Tell us what needs to happen, what is already installed and your region. The SiteComms team can review the enquiry and reply with the provider or providers we think are most relevant to contact.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Help useCase="Aged-care or retirement-village project next step" label="Ask SiteComms who to contact" className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--sc-blue-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" />
            <Link href={pricingHref} className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Estimate project cost</Link>
            <Link href={financeHref} className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Explore payment options</Link>
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-blue-100">Your enquiry stays with SiteComms. Please describe the facilities project without including resident names, medical details or security-sensitive records.</p>
        </div>
      </section>

      <section id="care-methodology" aria-labelledby="care-methodology-title" className="sc-container max-w-5xl scroll-mt-24 py-10">
        <h2 id="care-methodology-title" className="text-xl font-bold text-[var(--sc-blue-900)]">How we reached these recommendations</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">We matched documented product functions to six defined care/village communications briefs, then checked for an Australian-facing supply or integration route. The options are not ordered as winners; the proposed configuration and local support still need verification. We have not conducted a hands-on group test, measured market share or compared complete competitive tenders.</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Manufacturer documents support capability, not universal superiority. Local listings and overseas case studies have their limits labelled. Citations do not establish a SiteComms provider relationship or coverage of the entire market. No business named here is being represented as a partner or endorser merely because it is cited. Clinical nurse call is outside the compared scope. See our <Link href="/about/editorial-policy" className={linkClass}>editorial policy</Link> and <Link href="/about/disclosure" className={linkClass}>commercial disclosure</Link>.</p>
        <details id="care-sources" className="mt-6 scroll-mt-24 rounded-xl border border-[var(--sc-border)] p-5 md:p-6">
          <summary className={`cursor-pointer ${linkClass}`}>Sources and evidence register ({evidenceEntries.length})</summary>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">Evidence and local-support claims reviewed 19 September 2026. Product revisions, supply and service terms need confirmation in a current proposal. References open the original publisher’s material.</p>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {evidenceEntries.map(([id, source]) => <li key={id} className="min-w-0 rounded-lg border border-[var(--sc-border)] p-3">
              <a href={source.href} target="_blank" rel="noopener noreferrer" className={`text-sm ${linkClass}`}>[{numbers[id]}] {source.label}<span className="sr-only"> (opens in a new tab)</span></a>
              <span className="mt-1 block text-xs leading-relaxed text-[var(--sc-slate)]">{source.kind}</span>
            </li>)}
          </ol>
        </details>
      </section>
      <JsonLd data={article} />
      <JsonLd data={breadcrumbSchema([{ name: "SiteComms Australia", url: site.url }, { name: "Aged care & retirement villages", url: pageUrl }])} />
      <JsonLd data={shortlistSchema} />
    </article>
  );
}
