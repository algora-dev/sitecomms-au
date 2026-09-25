import type { ReactNode } from "react";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { StateAwareLink } from "@/components/project-state";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
import {
  SCHOOL_COMPARE_PATH, schoolPlatforms, schoolPlatform,
  schoolUseCases, specialistPlatforms, australianStateReferences, schoolComparisonQuestions,
  comparisonSources, comparisonEvidenceRecords, type ComparisonSourceId,
} from "@/lib/content/school-compare";

const path = SCHOOL_COMPARE_PATH;
const title = "Compare school PA, bell & intercom systems in Australia";
const description = "Compare SPON, FrontRow, Algo, Axis, Bosch PROSPERO, Bodet, TOA and hybrid school PA: features, value, Australian evidence and practical next steps.";
export const metadata = buildMetadata({ title, description, path });
const linkClass = "font-semibold text-[var(--sc-blue-700)] underline underline-offset-4";
const bodyClass = "leading-relaxed text-[var(--sc-slate)]";

function Sources({ ids }: { ids: readonly ComparisonSourceId[] }) {
  if (!ids.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
      {ids.map(id => (
        <a key={id} href={comparisonSources[id].href} className={linkClass} target="_blank" rel="noopener noreferrer">
          {comparisonSources[id].label}<span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
function Section({ id, title: heading, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="sc-container max-w-6xl scroll-mt-44 py-10 sm:py-14">
      <h2 id={`${id}-heading`} className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)] sm:text-3xl">{heading}</h2>
      {children}
    </section>
  );
}
function Help({ label = "Help me choose a school system" }: { label?: string }) {
  return (
    <ProjectHelpLauncher mode="system_selection" sourceTopic="compare_schools"
      buttonLabel={label} context={{ site_type: "school" }} />
  );
}

export default function SchoolComparePage() {
  return (
    <article>
      <AuthorityHero
        eyebrow="Australian school systems comparison"
        title="The right school system starts with the job—not the logo."
        description="Compare the systems behind everyday bells, clear announcements, room-to-office calls and urgent messages. Start with your school's priorities, then compare the complete installed and supported solution."
        tags={["Eight practical approaches", "Features and value", "Australian evidence"]}
        primaryCta={{ label: "Find your shortlist", href: "#shortlist" }}
        secondaryCta={{ label: "Compare the features", href: "#capabilities" }}
        reviewed={reviewedLabel(path)}
        breadcrumb={[{ name: "Schools", href: "/schools" }, { name: "Compare systems" }]}
      />
      <nav aria-label="On this school comparison page" className="sc-container flex max-w-6xl flex-wrap gap-x-5 gap-y-3 py-5 text-sm">
        {[
          ["shortlist", "Quick shortlist"], ["capabilities", "Feature comparison"],
          ["platforms", "System profiles"], ["costs", "Cost and value"],
          ["school-scenario", "Example school brief"], ["providers", "Australian references"],
          ["buyer-questions", "Common questions"], ["next-step", "Get help"],
        ].map(([id, label]) => <a key={id} href={`#${id}`} className={linkClass}>{label}</a>)}
      </nav>

      <Section id="shortlist" title="Which systems belong on your shortlist?">
        <p className={`mt-4 max-w-4xl ${bodyClass}`}>
          For an integrated school-wide brief, SPON deserves a close look: bells, zoned paging, two-way communication and a path to expansion.
          FrontRow is particularly relevant when classroom audio is part of the job; Algo is a useful hybrid/SIP comparator.
          Axis, PROSPERO, Bodet and TOA bring different strengths. These are editorial starting points, not test scores or a cheapest-brand ranking.
        </p>
        <Sources ids={["spon", "spon-software", "frontrow", "algo"]} />
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[var(--sc-slate)]">
          SPON&apos;s Australian supplier and support arrangement still needs confirmation. See each profile for the difference between documented features and local supply evidence.
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schoolUseCases.map(useCase => (
            <div key={useCase.id} className="sc-card flex flex-col bg-white p-6">
              <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">{useCase.title}</h3>
              <p className={`mt-2 text-sm ${bodyClass}`}>{useCase.brief}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {useCase.ids.map(id => (
                  <a key={id} href={`#${id}`} className="rounded-full border border-[var(--sc-border)] bg-[var(--sc-blue-50)] px-3 py-2 text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">
                    {schoolPlatform(id).name}
                  </a>
                ))}
              </div>
              <p className={`mt-4 text-sm ${bodyClass}`}>{useCase.reason}</p>
              <details className="mt-4 text-xs">
                <summary className={`cursor-pointer ${linkClass}`}>Basis for this shortlist</summary>
                <Sources ids={useCase.sources} />
              </details>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Help />
          <Link href="/guides/school-pa-paging-requirements" className={`mt-6 text-sm ${linkClass}`}>Not sure what to specify? Start with the school brief.</Link>
        </div>
      </Section>

      <div className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <Section id="capabilities" title="Compare the functions—not just a list of ticks">
          <p className={`mt-4 max-w-4xl ${bodyClass}`}>
            A feature may need a particular endpoint, controller or integration. This table says what to ask for in a complete design.
            Read across a row, then open the profile for cost, expansion and Australian support questions.
          </p>
          <p id="table-help" className="mt-3 text-sm text-[var(--sc-slate)]">On a small screen, scroll the table sideways. Each system name links to its detailed profile.</p>
          <div role="region" aria-label="School system capability comparison" aria-describedby="table-help" tabIndex={0}
            className="mt-5 overflow-x-auto rounded-xl border border-[var(--sc-border)] bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-blue-700)]">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <caption className="sr-only">School PA, bell and intercom capabilities by specified platform or architecture. No numeric ratings or universal feature guarantees.</caption>
              <thead className="bg-[var(--sc-blue-900)] text-white">
                <tr>
                  {["System / architecture", "Bells and paging", "Two-way communication", "Text, clocks and visual alerts", "Existing speakers"].map((label, index) =>
                    <th key={label} scope="col" className={`p-4 align-top font-semibold ${index === 0 ? "sticky left-0 z-20 bg-[var(--sc-blue-900)]" : ""}`}>{label}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {schoolPlatforms.map(platform => (
                  <tr key={platform.id} className="border-t border-[var(--sc-border)] align-top even:bg-[var(--sc-blue-50)]">
                    <th scope="row" className="sticky left-0 z-10 w-[18%] bg-white p-4 font-normal">
                      <a href={`#${platform.id}`} className={linkClass}>{platform.name}</a>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--sc-slate)]">{platform.status}</p>
                      <a href={`#evidence-${platform.id}`} className={`mt-3 inline-block text-xs ${linkClass}`}>Evidence and support</a>
                    </th>
                    {[platform.bells, platform.intercom, platform.visual, platform.legacy].map((text, i) =>
                      <td key={i} className={`w-[20.5%] p-4 ${bodyClass}`}>{text}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-[var(--sc-slate)]">
            A documented alert or lockdown function is not a certification of the installation. Have the school&apos;s responsible adviser define any regulated life-safety requirements separately.
          </p>
        </Section>
      </div>

      <Section id="platforms" title="A closer look at the school systems">
        <p className={`mt-4 max-w-4xl ${bodyClass}`}>Use the same brief for every proposal. The important comparison is what staff can do, what the complete system includes and who keeps it working.</p>
        <div className="mt-7 space-y-6">
          {schoolPlatforms.map(platform => (
            <section key={platform.id} id={platform.id} aria-labelledby={`${platform.id}-title`}
              className="sc-card scroll-mt-44 bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">{platform.family}</p>
              <h3 id={`${platform.id}-title`} className="mt-2 text-2xl font-bold text-[var(--sc-blue-900)]">{platform.name}</h3>
              <p className="mt-2 font-medium text-[var(--sc-blue-900)]">{platform.consider}</p>
              <p className={`mt-4 max-w-4xl ${bodyClass}`}>{platform.summary}</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-[var(--sc-blue-900)]">Why consider it?</h4>
                  <ul className={`mt-3 list-disc space-y-2 pl-5 text-sm ${bodyClass}`}>
                    {platform.strengths.map(strength => <li key={strength}>{strength}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--sc-blue-900)]">Where the value can come from</h4>
                  <p className={`mt-3 text-sm ${bodyClass}`}>{platform.cost}</p>
                  <p className={`mt-3 text-sm ${bodyClass}`}><strong className="text-[var(--sc-blue-900)]">Watch for: </strong>{platform.tradeoff}</p>
                </div>
              </div>
              <div id={`evidence-${platform.id}`} className="mt-6 scroll-mt-44 rounded-lg border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-4">
                <h4 className="text-sm font-semibold text-[var(--sc-blue-900)]">Australian evidence and support</h4>
                <p className={`mt-2 text-sm ${bodyClass}`}>{platform.auEvidence}</p>
                <Sources ids={platform.sources} />
              </div>
              <details className="mt-5 rounded-lg border border-[var(--sc-border)] px-4 py-3">
                <summary className={`cursor-pointer py-1 text-sm ${linkClass}`}>Configuration, expansion and questions for the supplier</summary>
                <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                  {[
                    ["What to put in the proposal", platform.components],
                    ["Management and operation", platform.operations],
                    ["Expansion and scale", platform.scale],
                  ].map(([label, text]) => <div key={label}><dt className="font-semibold text-[var(--sc-blue-900)]">{label}</dt><dd className={`mt-1 ${bodyClass}`}>{text}</dd></div>)}
                </dl>
                <ul className={`mt-5 list-disc space-y-2 pl-5 text-sm ${bodyClass}`}>
                  {platform.verify.map(question => <li key={question}>{question}</li>)}
                </ul>
              </details>
            </section>
          ))}
        </div>
      </Section>

      <Section id="specialist" title="Other systems can have a place in the design">
        <p className={`mt-4 max-w-4xl ${bodyClass}`}>Not every part of a school&apos;s audio, access or notification project belongs in the same product comparison.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {specialistPlatforms.map(platform => (
            <section key={platform.id} id={platform.id} className="sc-card scroll-mt-44 p-6">
              <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">{platform.name}</h3>
              <p className={`mt-3 text-sm ${bodyClass}`}>{platform.text}</p>
              <Sources ids={platform.sources} />
            </section>
          ))}
        </div>
        <details id="itc" className="mt-5 scroll-mt-44 text-sm">
          <summary className={`cursor-pointer ${linkClass}`}>Why is ITC not in the main Australian shortlist?</summary>
          <p className={`mt-3 max-w-4xl ${bodyClass}`}>This review did not establish enough current Australian supply/support evidence for the relevant school system family. That is a research limitation, not a claim that the products are unavailable or unsuitable. A documented local proposal can be assessed on the same requirements.</p>
        </details>
      </Section>

      <div className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <Section id="costs" title="Best value means the complete school job">
          <p className={`mt-4 max-w-4xl ${bodyClass}`}>
            A lower endpoint price does not necessarily mean a lower project cost. Compare the installed scope, recurring costs, staff workflow and expansion—not a full campus platform against a basic bell controller.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Integrated platform", "Ask whether one system covers the bells, paging, room calls and control you actually need. Price licences, servers, consoles and configuration together."],
              ["Retained-speaker / hybrid", "Get the existing circuits tested. Identify what can stay, which zones can be independent and what extra work is needed for calls or visual alerts."],
              ["Classroom or visible-alert project", "Separate classroom voice reinforcement, screens, clocks and strobes from baseline campus PA. Otherwise two sensible quotes may be solving different jobs."],
            ].map(([heading, text]) => (
              <div key={heading} className="sc-card bg-white p-6"><h3 className="font-semibold text-[var(--sc-blue-900)]">{heading}</h3><p className={`mt-3 text-sm ${bodyClass}`}>{text}</p></div>
            ))}
          </div>
          <details className="sc-card mt-5 bg-white p-5">
            <summary className={`cursor-pointer ${linkClass}`}>The costs every comparable proposal should identify</summary>
            <div className={`mt-4 grid gap-4 text-sm sm:grid-cols-2 ${bodyClass}`}>
              <p><strong>Installation:</strong> speakers, controllers, network switches/PoE, cabling, amplifier work, backup power and access equipment.</p>
              <p><strong>Configuration:</strong> zones, term calendars, priority/cancellation, classroom call handling, integrations and testing.</p>
              <p><strong>Operation:</strong> licences/subscriptions, support, training, backups, firmware responsibilities and replacement equipment.</p>
              <p><strong>Later changes:</strong> another building, extra rooms, visual alerts, licence tiers, travel and regional service.</p>
            </div>
          </details>
          <p className={`mt-5 max-w-4xl text-sm ${bodyClass}`}>
            SiteComms has not established like-for-like Australian installed prices for these brands. Our AUD calculator is a provisional planning model for its stated scope—not a SPON quote, a brand price comparison or a guaranteed saving.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <StateAwareLink href="/pricing-tool" className="sc-btn-primary">Get an indicative project range</StateAwareLink>
            <Link href="/guides/compare-pa-system-quotes" className="sc-btn-secondary">Compare quotes fairly</Link>
          </div>
        </Section>
      </div>

      <Section id="school-scenario" title="One school brief, several sensible designs">
        <p className={`mt-4 max-w-4xl ${bodyClass}`}>
          Imagine an existing school with 30 teaching areas, an administration office, two playground areas and a hall.
          It wants reliable bells, live announcements, calls from selected rooms and future expansion.
          This is an illustrative brief—not a real installation, an acoustic design or a count of speakers to buy.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["A. Integrated campus design", "Quote a complete SPON or FrontRow approach; use a PROSPERO proposal as a PA-focused comparator. Require a demonstration of every requested room-call and priority workflow."],
            ["B. Phased hybrid upgrade", "Quote retained tested circuits with an Algo or appropriately designed TOA/100V upgrade. Add individual IP endpoints only where separate zones or calls are needed."],
            ["C. Visible messages first", "Quote Bodet or Axis configurations where clocks/text/strobes are priorities. Keep the room-call requirement explicit rather than assuming every display speaker has it."],
          ].map(([heading, text]) => <div key={heading} className="sc-card p-6"><h3 className="font-semibold text-[var(--sc-blue-900)]">{heading}</h3><p className={`mt-3 text-sm ${bodyClass}`}>{text}</p></div>)}
        </div>
        <p className={`mt-5 max-w-4xl text-sm ${bodyClass}`}>
          Keep the same coverage plan, term-calendar task, call demonstration, commissioning tests and support requirements in all three proposals.
          Treat performance/assembly sound in the hall as a separate scope unless the design explicitly integrates it.
        </p>
        <Sources ids={["spon", "frontrow", "algo", "toa", "bodet", "axis-display"]} />
      </Section>

      <Section id="providers" title="Australian references: what the evidence actually shows">
        <p className={`mt-4 max-w-4xl ${bodyClass}`}>
          Here are useful public reference points across five states. A manufacturer page, distributor listing and named school project are different kinds of evidence.
          None of the organisations below is presented as a SiteComms partner or a guaranteed installer for every system.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {australianStateReferences.map(reference => (
            <section key={reference.code} className="sc-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">{reference.state} · {reference.kind}</p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">{reference.name}</h3>
              <p className={`mt-3 text-sm ${bodyClass}`}>{reference.text}</p>
              <Sources ids={reference.sources} />
              <details className="mt-3 text-sm">
                <summary className={`cursor-pointer ${linkClass}`}>What this does—and does not—prove</summary>
                <p className={`mt-2 ${bodyClass}`}>{reference.limit}</p>
              </details>
            </section>
          ))}
          <section className="sc-card bg-[var(--sc-blue-50)] p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">A different school audio job</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">Brisbane South State College hall</h3>
            <p className={`mt-3 text-sm ${bodyClass}`}>SCP Audio Australia publishes a multipurpose-hall sound system example. It is useful context for assembly/performance audio—not evidence of SPON supply or a whole-campus paging installation.</p>
            <Sources ids={["scp-australia"]} />
          </section>
        </div>
        <p className={`mt-5 max-w-4xl text-sm ${bodyClass}`}>
          Schools in Tasmania, the ACT and Northern Territory can use the same technical comparison. This page does not yet provide equivalent local project evidence for those jurisdictions.
          For any regional or remote school, ask who surveys, commissions and repairs the system, where spares are held and what travel is included.
        </p>
        <Link href="/states" className={`mt-4 inline-block text-sm ${linkClass}`}>Plan with your project state or territory</Link>
      </Section>

      <Section id="buyer-questions" title="The questions schools ask before choosing">
        <div className="mt-6 space-y-3">
          {schoolComparisonQuestions.map(item => (
            <details key={item.question} className="sc-card p-5">
              <summary className={`cursor-pointer ${linkClass}`}>{item.question}</summary>
              <p className={`mt-3 max-w-4xl text-sm ${bodyClass}`}>{item.answer}</p>
              <Sources ids={item.sources} />
            </details>
          ))}
        </div>
      </Section>

      <div className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <Section id="next-step" title="Turn the shortlist into a clear next step">
          <p className={`mt-4 max-w-3xl ${bodyClass}`}>
            Tell us which school, what needs to work and what you already have. You do not need to choose a brand first.
            SiteComms reviews your requirement and replies with suitable providers&apos; public contact details. You decide whether to contact them; we do not automatically forward your enquiry.
          </p>
          <Help label="Ask SiteComms about my school project" />
          <p className="mt-4 text-sm text-[var(--sc-slate)]">Prefer a normal contact page? <Link href="/contact" className={linkClass}>Contact SiteComms</Link>.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <StateAwareLink href="/pricing-tool" className="sc-btn-secondary justify-center">Estimate the project</StateAwareLink>
            <StateAwareLink href="/tools/funding-check" className="sc-btn-secondary justify-center">Check funding pathways</StateAwareLink>
            <StateAwareLink href="/tools/finance-check" className="sc-btn-secondary justify-center">Explore finance</StateAwareLink>
          </div>
          <p className={`mt-4 text-xs ${bodyClass}`}>The planning tools are not supplier quotes, funding awards or finance approvals.</p>
        </Section>
      </div>

      <Section id="sources" title="Sources, method and review limits">
        <p className={`mt-4 max-w-4xl text-sm ${bodyClass}`}>
          Reviewed {reviewedLabel(path)}. The capability descriptions are based on the linked publications, not hands-on testing.
          Shortlists, value commentary and supplier questions are SiteComms editorial assessments. There is no measured overall winner, current-stock guarantee or paid-partner recommendation implied.
          Product selection, licences, support and site design still need a written proposal.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link href="/about/methodology" className={linkClass}>Methodology</Link>
          <Link href="/about/disclosure" className={linkClass}>Disclosure</Link>
          <Link href="/about/editorial-policy" className={linkClass}>Editorial policy</Link>
        </div>
        <details className="sc-card mt-5 p-5">
          <summary className={`cursor-pointer ${linkClass}`}>Open the source register ({Object.keys(comparisonSources).length} references)</summary>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {comparisonEvidenceRecords().map(source => (
              <div key={source.source_id}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className={`text-sm ${linkClass}`}>
                  {source.label}<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <p className={`mt-2 text-xs ${bodyClass}`}>{source.kind}. {source.scope}</p>
                <p className={`mt-1 text-xs ${bodyClass}`}>{source.limits}</p>
                <p className="mt-1 text-xs text-[var(--sc-slate)]">Document review: {source.reviewed_at}. Reference: {source.source_id}.</p>
              </div>
            ))}
          </div>
        </details>
      </Section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        ...articleSchema({ headline: title, description, url: `${site.url}${path}`, datePublished: publishedDate(path), dateModified: reviewedDate(path) }),
        citation: Object.values(comparisonSources).map(source => source.href),
      }).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        breadcrumbSchema([{ name: "SiteComms Australia", url: site.url }, { name: "Schools", url: `${site.url}/schools` }, { name: "Compare systems", url: `${site.url}${path}` }])
      ).replace(/</g, "\\u003c") }} />
    </article>
  );
}
