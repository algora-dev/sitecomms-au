import type { Metadata } from "next";
import Link from "next/link";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import ProjectNextSteps from "@/components/content/ProjectNextSteps";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { schoolBandSummaries } from "@/lib/pricing/school-bands";
import { authors, site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "School PA Systems Australia | Paging, Bells & Intercom Guide",
  description:
    "Independent Australian guide to school PA systems: compare wired, hybrid and IP paging, bells, emergency announcements, intercom, costs, standards and provider approaches.",
  path: "/schools",
});

const bands = schoolBandSummaries();

const essentialCapabilities = [
  [
    "Whole-site coverage",
    "Design for classrooms, administration, corridors, halls, covered areas, playgrounds, sports fields and detached buildings rather than assuming one speaker type suits every space.",
  ],
  [
    "Live and zoned paging",
    "Staff should be able to reach the whole campus or only the buildings and areas that need the message, without a complicated sequence of controls.",
  ],
  [
    "Automated bells and messages",
    "Timetables, alternate schedules and routine announcements should run automatically, with authorised staff able to make temporary changes when the school day changes.",
  ],
  [
    "Priority communication",
    "Important announcements need a documented priority path so routine audio does not prevent an authorised urgent message from being heard where required.",
  ],
  [
    "Simple staff operation",
    "Reception and administration staff should be able to select a zone, make a page, change an approved schedule and trigger authorised functions without relying on one technical person.",
  ],
  [
    "Serviceable infrastructure",
    "The useful life of speakers, amplifiers, cabling, network switches and control hardware can differ. A good upgrade assesses what is genuinely reusable instead of assuming everything must be replaced.",
  ],
] as const;

const architectures = [
  {
    name: "Retain the PA; modernise bells/control",
    bestFor: "The existing speakers and amplification are serviceable, but the timer, user interface or scheduling is the weak point.",
    strengths: "Lowest-disruption path when the audio distribution still works; can improve scheduling and authorised manual control without rebuilding the whole campus.",
    watch: "Confirm the existing system has acceptable coverage and speech clarity before investing around it.",
  },
  {
    name: "Traditional / dedicated wired PA",
    bestFor: "Schools that value a separate, straightforward audio distribution system and do not need every endpoint individually network-addressable.",
    strengths: "Familiar 100V-style distribution can be practical across large areas and may keep school PA independent from day-to-day data-network changes.",
    watch: "Future zoning or feature changes can require control or cabling work; compare the complete control layer, not only amplifiers and speakers.",
  },
  {
    name: "Hybrid IP control + retained audio",
    bestFor: "Existing speaker circuits or amplifiers are useful, but the school wants better scheduling, zoning, interfaces, monitoring or network integration.",
    strengths: "Often captures much of the operational benefit of a modern platform while retaining suitable field infrastructure.",
    watch: "Compatibility, documentation and responsibility for the old/new boundary need to be explicit in the quote.",
  },
  {
    name: "Full IP / networked communications",
    bestFor: "Newer campuses or major upgrades needing granular zones, distributed endpoints, intercom, central management or wider integrations.",
    strengths: "Flexible zoning and expansion, central management and easier integration with other IP-based communications where the network design supports it.",
    watch: "Network capacity, PoE, switching, resilience, cyber/IT ownership, licences and long-term support all become part of the communications design.",
  },
] as const;

const dailyWorkflows = [
  ["Morning and routine announcements", "Live or pre-recorded messages to the whole school or a selected group of zones."],
  ["Normal and alternate timetables", "Run standard days, shorter days, primary/secondary schedules or temporary timetables without rebuilding the core configuration."],
  ["Exam or event isolation", "Temporarily mute or exclude a hall, exam block or selected zone while the rest of the campus continues normally."],
  ["Outdoor and sports coverage", "Use suitable loudspeaker types and zoning for open areas rather than treating an oval or playground like a classroom."],
  ["Manual overrides", "Give authorised staff an obvious way to trigger a bell, page or approved message when the timetable no longer matches the day."],
  ["Handover and training", "Document normal operation, schedule changes, basic troubleshooting and support contacts so the system does not depend on one staff member."],
] as const;

const systemTerms = [
  {
    term: "PA / paging",
    meaning: "One-way live or recorded audio sent to the whole campus or selected zones. This is the core school announcement function.",
  },
  {
    term: "Bell system",
    meaning: "Scheduled tones, music or spoken audio used for lesson changes, breaks, alternate timetables and special-day operation. It often shares the PA speaker network.",
  },
  {
    term: "Intercom",
    meaning: "Two-way communication between a classroom, gate, office or help point and another authorised station. It is not the same thing as one-way paging.",
  },
  {
    term: "Emergency / warning system",
    meaning: "Priority or statutory warning functions may have separate design, equipment, approval and certification requirements. An everyday PA is not automatically a compliant emergency-warning system.",
  },
] as const;

const startingPoints = [
  ["Bells are the main problem, but announcements still sound clear", "Audit the timer/controller first; a control-layer upgrade may solve the problem without replacing the speaker system."],
  ["Announcements are unclear or missing in parts of the campus", "Audit coverage, speaker condition, amplifier loading, cabling and zone mapping before choosing a new controller."],
  ["The PA works, but zones and schedules are hard to manage", "A hybrid modernisation can retain useful field equipment while replacing the control and scheduling layer."],
  ["A new building or campus expansion needs flexible zoning", "Compare dedicated wired, hybrid and networked designs against the new coverage, IT ownership and expansion requirements."],
  ["Teachers need room-to-office or gate-to-office calling", "Treat two-way intercom as a separate requirement and confirm which rooms or entries genuinely need endpoints."],
  ["The project includes certified evacuation or statutory warning functions", "Separate that requirement from ordinary bells and paging and confirm the applicable authority, consultant and certification path before selecting products."],
] as const;

const governmentBenchmarks = [
  {
    eyebrow: "Victoria · government-school benchmark",
    title: "Coverage, simple operation, bells and efficient zoning",
    body: "Victoria's current Building Quality Standards Handbook requires PA coverage across facilities and the wider site, including outdoor areas, and calls for school bell services, automatic routine/situational/emergency announcements and simple, efficient zone selection. It also tells projects to engage the department's ICT team where the PA requires school network connectivity.",
    href: "https://www.schoolbuildings.vic.gov.au/building-quality-standards-handbook/technical-specifications",
    link: "Victorian technical specifications",
  },
  {
    eyebrow: "New South Wales · EFSG 2026",
    title: "Assess existing services before extending or replacing them",
    body: "The current EFSG 2026 says new or refurbished buildings must be delivered to current communications requirements, including PA and bell systems. For existing reticulated PA and period-bell services, the brief is to assess what is there and retain or enhance functionality where it is in use, with expansion, relocation, upgrade or replacement considered as part of the work.",
    href: "https://education.nsw.gov.au/about-us/efsg-home/efsg-2026/design-and-technical-requirements",
    link: "NSW EFSG 2026 Part D",
  },
  {
    eyebrow: "South Australia · design-standards example",
    title: "Architecture can be jurisdiction-specific",
    body: "South Australia's current education-facilities framework directs major works to the department's design standards. Its current Part 4 technical specification says IP-based audio systems are not permitted to perform the single or combined functions of emergency warning, paging, school bell or public address, and directs projects to confirm the appropriate design performance requirements with the department's Security and Emergency Management team. This is a strong reminder not to treat one preferred architecture as a national rule.",
    href: "https://www.education.sa.gov.au/docs/infrastructure/ecfds/4-technical-specifications.pdf",
    link: "SA Part 4 technical specifications (PDF)",
  },
] as const;

const marketSources = [
  {
    name: "Masters Voice Technology",
    href: "https://www.mastersvoice.com.au/solution-categories/school-bell-paging-systems",
    type: "NSW integrator / case-study evidence",
    contribution:
      "Useful for concrete examples of automated schedules, selected paging zones, staff-facing controls, staged cutovers and NSW school upgrades where some existing field equipment has been retained when suitable.",
  },
  {
    name: "Data & Voice Plus",
    href: "https://dvplus.com.au/school-pa-systems-melbourne/",
    type: "Victorian installer",
    contribution:
      "Explains the buyer-facing difference between traditional wired and network-based PA in unusually simple language and highlights common symptoms of an ageing or poorly covered system.",
  },
  {
    name: "FrontRow Conductor",
    href: "https://www.gofrontrow.com.au/products/conductor/",
    type: "Education communications platform",
    contribution:
      "Shows how network-led systems can make zones, bell schedules and pre-recorded messages easier to reconfigure, and how IP control can coexist with cost-effective distributed audio in different areas of a campus.",
  },
  {
    name: "Jacques Technologies",
    href: "https://www.jacques.com.au/schools/",
    type: "Australian communications manufacturer",
    contribution:
      "Publishes Australian education examples combining zoned PA, bell scheduling, map-based control and intercom, including projects that expanded over time or integrated retained amplifiers and outdoor speakers.",
  },
  {
    name: "BellTimer / Sandman Sound",
    href: "https://www.belltimer.com.au/",
    type: "Timer-led retrofit approach",
    contribution:
      "Represents the lighter-weight end of the market: schools can sometimes modernise timetable control and authorised triggers around an existing amplifier or bell/PA installation rather than replace the whole system.",
  },
  {
    name: "PA Matthews Audio",
    href: "https://pamatthewsaudio.com.au/PDF/HighSchoolSystemWhitePaper.pdf",
    type: "Dedicated-wired school PA approach",
    contribution:
      "Provides a useful counterpoint to network-first designs, with detailed discussion of dedicated PA cabling, zones, bell control and the operational argument for keeping core paging independent from routine data-network changes.",
  },
  {
    name: "3 Monkeys AV",
    href: "https://www.3monkeysav.com.au/frequently-asked-questions/",
    type: "WA education AV provider",
    contribution:
      "Its school FAQ is particularly clear on the questions staff actually ask: where PA needs to cover, changing bell schedules, using tones or music and including staff training after installation.",
  },
  {
    name: "Prolinx Audio Visual",
    href: "https://prolinx.com.au/school-public-address-systems/",
    type: "NSW school PA integrator",
    contribution:
      "Adds a procurement and audit perspective: school PA upgrades can start with an existing-system audit, and its public school package material separates equipment scope from installation rather than implying a hardware bundle is a complete campus project.",
  },
] as const;

const briefChecklist = [
  "List every indoor and outdoor area that needs routine and important announcements.",
  "Define all-call and day-to-day paging zones before asking suppliers to price hardware.",
  "Document normal, alternate, exam, event and holiday bell-schedule requirements.",
  "State who needs to make live pages, change schedules and trigger authorised priority functions.",
  "Identify existing speakers, amplifiers, cabling, racks and network infrastructure that should be assessed for reuse.",
  "Separate campus PA / operational alerting requirements from any certified fire or emergency warning system obligations.",
  "Require commissioning, intelligibility/coverage checks appropriate to the project, staff training, as-built documentation and an ongoing support path.",
] as const;

export default function SchoolsPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="Independent Australian school communications guide"
        title="School PA Systems Australia: Paging, Bells & Intercom"
        description="A school public-address system can be as simple as reliable campus paging and automated bells, or as broad as a managed IP platform with zoned announcements, intercom and wider integrations. This guide compares the main architectures, what Australian providers do differently, what can often be retained, indicative cost and what to put in a project brief."
        tags={["School PA systems", "School paging", "Bell systems", "Emergency announcements", "Intercom"]}
        primaryCta={{ label: "Get a ballpark price", href: "/pricing-tool" }}
        secondaryCta={{ label: "Compare school systems", href: "/compare/schools" }}
        reviewed={reviewedLabel("/schools")}
        reviewer={{ name: authors.shaun.name, role: authors.shaun.role, href: "/about/methodology" }}
        note="Independent planning guide · provider examples are sources, not SiteComms partnerships"
        breadcrumb={[{ name: "Schools", href: "/schools" }]}
      />

      <AtAGlance
        items={[
          { label: "Short answer", value: "Start with coverage, staff workflows and zones; choose the technology after the job is defined." },
          { label: "Main options", value: "Retained system + new control, dedicated wired PA, hybrid IP/analogue, or full IP communications" },
          { label: "Often reusable", value: "Some speakers, amplifiers, cabling, racks or network infrastructure, only after condition and compatibility checks" },
          { label: "Next step", value: "Compare architectures, estimate the project, then ask SiteComms to review the brief if you want independent next-step help" },
        ]}
      />

      <ProjectNextSteps
        sourceTopic="schools_mega_guide_top"
        mode="system_selection"
        title="Turn the research into an answer for your school"
        intro="If you already know enough to move forward, you do not need to read the whole guide first. Price the site, check funding, check finance, or send the project to SiteComms for a confidential human review."
        context={{ Topic: "School PA, paging, bell or intercom project" }}
      />

      <section className="border-y border-[var(--sc-border)] bg-white py-6">
        <nav className="sc-container max-w-5xl" aria-label="On this page">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">On this page</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <a href="#what-is-school-pa" className="text-[var(--sc-blue-700)] hover:underline">What the terms mean</a>
            <a href="#what-good-looks-like" className="text-[var(--sc-blue-700)] hover:underline">What a good system does</a>
            <a href="#starting-point" className="text-[var(--sc-blue-700)] hover:underline">Where to start</a>
            <a href="#architecture" className="text-[var(--sc-blue-700)] hover:underline">Architecture options</a>
            <a href="#australian-requirements" className="text-[var(--sc-blue-700)] hover:underline">Australian requirements</a>
            <a href="#market-examples" className="text-[var(--sc-blue-700)] hover:underline">Provider examples</a>
            <a href="#cost" className="text-[var(--sc-blue-700)] hover:underline">Cost</a>
            <a href="#brief" className="text-[var(--sc-blue-700)] hover:underline">Project brief</a>
          </div>
        </nav>
      </section>

      <article className="sc-container max-w-5xl py-14 sc-prose">
        <section id="what-is-school-pa" aria-labelledby="what-is-school-pa-heading">
          <h2 id="what-is-school-pa-heading">What do “school PA”, paging, bells and intercom actually mean?</h2>
          <p>
            This guide is about a <strong>fixed, school-wide communications system</strong> used across classrooms, administration, halls and outdoor areas. It is not primarily about a portable assembly speaker, a teacher voice amplifier or a performance sound system. Those products can be useful, but they solve a different problem from campus paging and bell infrastructure.
          </p>
          <div className="not-prose mt-6 overflow-x-auto rounded-2xl border border-[var(--sc-border)] bg-white">
            <table className="min-w-[720px] w-full text-left text-sm">
              <thead className="bg-[var(--sc-blue-50)] text-[var(--sc-blue-900)]">
                <tr><th className="px-4 py-3 font-semibold">Term</th><th className="px-4 py-3 font-semibold">What it means in a school project</th></tr>
              </thead>
              <tbody className="divide-y divide-[var(--sc-border)] text-[var(--sc-slate)]">
                {systemTerms.map((item) => (
                  <tr key={item.term} className="align-top">
                    <td className="px-4 py-4 font-semibold text-[var(--sc-blue-900)]">{item.term}</td>
                    <td className="px-4 py-4 leading-relaxed">{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Keeping those terms separate matters when requesting quotes. A supplier can reasonably quote a “PA upgrade” that includes only one-way paging, while another may include bell scheduling, intercom and priority-message interfaces. The words sound similar; the project scope is not.
          </p>
        </section>

        <section id="what-good-looks-like" aria-labelledby="what-good-looks-like-heading">
          <h2 id="what-good-looks-like-heading">What should a modern school PA system actually do?</h2>
          <p>
            The useful answer is broader than “make announcements”. A school PA system has to support the ordinary school day first: clear live paging, bells that follow the timetable, simple zone selection and coverage that includes the places people actually use. Emergency or priority communication can then be designed around the school&apos;s wider safety procedures and any separate systems that apply to the project.
          </p>
          <div className="not-prose mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {essentialCapabilities.map(([title, description]) => (
              <div key={title} className="sc-card bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-blue-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{description}</p>
              </div>
            ))}
          </div>
          <p>
            For schools where bells are the immediate problem, the <Link href="/systems/school-bell-announcements">school bell systems and timer guide</Link> goes deeper into schedules, exceptions and timer-only upgrades. For the broader safety-message scope, use the <Link href="/systems/emergency-lockdown">emergency and lockdown communication guide</Link> as a separate planning layer.
          </p>
        </section>

        <section id="starting-point" aria-labelledby="starting-point-heading">
          <h2 id="starting-point-heading">Start with the problem, not the product</h2>
          <p>
            The fastest way to over-specify a school communications project is to start with a brand or technology before confirming what is actually failing. This SiteComms decision table combines the recurring problems described across Australian provider pages with the government emphasis on coverage, operation and existing-service assessment.
          </p>
          <div className="not-prose mt-6 overflow-x-auto rounded-2xl border border-[var(--sc-border)] bg-white">
            <table className="min-w-[820px] w-full text-left text-sm">
              <thead className="bg-[var(--sc-blue-50)] text-[var(--sc-blue-900)]">
                <tr><th className="px-4 py-3 font-semibold">If this is the problem</th><th className="px-4 py-3 font-semibold">A sensible first step</th></tr>
              </thead>
              <tbody className="divide-y divide-[var(--sc-border)] text-[var(--sc-slate)]">
                {startingPoints.map(([problem, start]) => (
                  <tr key={problem} className="align-top"><td className="px-4 py-4 font-semibold text-[var(--sc-blue-900)]">{problem}</td><td className="px-4 py-4 leading-relaxed">{start}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="architecture" aria-labelledby="architecture-heading">
          <h2 id="architecture-heading">Which school PA architecture should you choose?</h2>
          <p>
            There is no universal “best school PA system”. Current Australian provider material spans dedicated wired systems, timer-led retrofits, hybrid upgrades and fully networked platforms. The right comparison is therefore the complete installed and supported architecture for the school, not a list of speaker or controller brands.
          </p>
          <div className="not-prose mt-6 overflow-x-auto rounded-2xl border border-[var(--sc-border)] bg-white">
            <table className="min-w-[820px] w-full text-left text-sm">
              <thead className="bg-[var(--sc-blue-50)] text-[var(--sc-blue-900)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Approach</th>
                  <th className="px-4 py-3 font-semibold">Best when</th>
                  <th className="px-4 py-3 font-semibold">Why it can work</th>
                  <th className="px-4 py-3 font-semibold">Watch for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sc-border)] text-[var(--sc-slate)]">
                {architectures.map((item) => (
                  <tr key={item.name} className="align-top">
                    <td className="px-4 py-4 font-semibold text-[var(--sc-blue-900)]">{item.name}</td>
                    <td className="px-4 py-4 leading-relaxed">{item.bestFor}</td>
                    <td className="px-4 py-4 leading-relaxed">{item.strengths}</td>
                    <td className="px-4 py-4 leading-relaxed">{item.watch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            If you already have supplier proposals, the <Link href="/guides/compare-pa-system-quotes">PA quote comparison guide</Link> helps separate hardware price from coverage, programming, licences, commissioning, documentation and ongoing support.
          </p>
        </section>

        <section aria-labelledby="reuse-heading">
          <h2 id="reuse-heading">Do you need to replace the whole existing PA system?</h2>
          <p>
            Often, no. One of the clearest themes across current Australian school projects is selective retention: a project may keep serviceable loudspeakers, amplifier channels, speaker circuits or network infrastructure while modernising the control, scheduling or distribution layer. NSW&apos;s current EFSG also requires existing PA and period-bell services affected by refurbishment to be assessed, with functionality retained or enhanced where those services are in use.
          </p>
          <p>
            Reuse is only valuable when the retained equipment is known, documented and fit for the new design. A 20-year-old speaker circuit that happens to make sound is not automatically a good asset, just as replacing a perfectly serviceable outdoor horn solely because the controller is obsolete can waste budget.
          </p>
          <div className="not-prose mt-5 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
            <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">Ask for an existing-system audit before deciding the architecture</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
              Record the controller/timer, amplifiers, speaker circuits, loudspeaker types, paging microphones, rack condition, cabling, network points, current zones and known dead/weak areas. The supplier can then price “retain”, “repair”, “interface” and “replace” items explicitly instead of hiding the assumption inside one lump sum.
            </p>
          </div>
        </section>

        <section aria-labelledby="staff-heading">
          <h2 id="staff-heading">The staff experience matters as much as the hardware</h2>
          <p>
            Several of the better provider pages focus on the people in reception and administration rather than the equipment rack. That is important. A technically capable system still fails the school if only one person knows how to change a bell schedule, the zone labels do not match the campus, or a substitute staff member cannot tell whether an announcement will reach one block or the entire site.
          </p>
          <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
            {dailyWorkflows.map(([title, description]) => (
              <div key={title} className="rounded-xl border border-[var(--sc-border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-blue-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="australian-requirements" aria-labelledby="australian-requirements-heading">
          <h2 id="australian-requirements-heading">What do current Australian school requirements tell us?</h2>
          <p>
            Requirements vary by jurisdiction, sector and project. There is no safe national shortcut such as “all schools should use IP” or “all schools should keep PA off the network”. Current government material instead shows why coverage, operational simplicity, existing-service assessment and jurisdiction-specific technical rules need to be resolved before the architecture is locked in.
          </p>
          <div className="not-prose mt-6 grid gap-5 lg:grid-cols-3">
            {governmentBenchmarks.map((item) => (
              <div key={item.eyebrow} className="sc-card bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">{item.eyebrow}</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{item.body}</p>
                <a href={item.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">{item.link} ↗</a>
              </div>
            ))}
          </div>
          <p>
            Use the <Link href="/guides/school-pa-paging-requirements">Australian school PA and paging requirements guide</Link> for the wider jurisdiction and procurement context. Always confirm the current version and rules for the specific project rather than treating a SiteComms summary, a supplier page or another state&apos;s standard as approval.
          </p>
        </section>

        <section aria-labelledby="evidence-heading">
          <h2 id="evidence-heading">How SiteComms weighs the evidence on this page</h2>
          <div className="not-prose mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[var(--sc-border)] bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">1 · Official requirements</p><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Government and education-authority material is used for jurisdiction-specific requirements and project context. Another state&apos;s standard is never treated as a national rule.</p></div>
            <div className="rounded-xl border border-[var(--sc-border)] bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">2 · Market evidence</p><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Installer and manufacturer pages are used to show real architectures, workflows and publicly described project examples. Their performance claims remain attributed to the source.</p></div>
            <div className="rounded-xl border border-[var(--sc-border)] bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">3 · SiteComms synthesis</p><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">The decision tables, trade-offs and planning sequence are SiteComms editorial analysis built from multiple sources. They are not presented as laboratory testing or a provider ranking.</p></div>
          </div>
        </section>

        <section id="market-examples" aria-labelledby="market-examples-heading">
          <h2 id="market-examples-heading">What current Australian providers and manufacturers explain particularly well</h2>
          <p>
            The market is useful precisely because providers emphasise different problems. SiteComms uses those public examples as evidence and comparison material; the organisations below are not presented as SiteComms partners, and inclusion is not a ranking or endorsement. Their strongest public material helps build a more complete buyer brief.
          </p>
          <div className="not-prose mt-6 grid gap-4 lg:grid-cols-2">
            {marketSources.map((source) => (
              <div key={source.name} className="sc-card bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[var(--sc-blue-900)]">{source.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">{source.type}</p>
                  </div>
                  <a href={source.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Source ↗</a>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{source.contribution}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--sc-slate)]">
            Sources rechecked 20 October 2026. Supplier and manufacturer pages can change; SiteComms keeps their claims attributed and reviews the source set when this guide is materially updated.
          </p>
          <p>
            The practical conclusion is not that one of these approaches wins every project. The useful shortlist starts by deciding whether the school mainly needs a better timer/control layer, a dependable dedicated PA, a hybrid modernisation or a broader IP communications platform. Only then does a product or installer comparison become meaningful.
          </p>
          <div className="not-prose mt-6 flex flex-wrap gap-3">
            <Link href="/compare/schools" className="sc-btn-primary">Compare school systems</Link>
            <Link href="/systems/traditional-vs-ip" className="sc-btn-secondary">Compare traditional, hybrid & IP</Link>
          </div>
        </section>

        <section aria-labelledby="network-heading">
          <h2 id="network-heading">Should school PA run on the data network?</h2>
          <p>
            This is one of the few areas where strong suppliers legitimately disagree. Network-led platforms emphasise flexible zoning, central management, easier endpoint changes and integration. Dedicated-wired school PA suppliers emphasise independence from routine network changes and the simplicity of a purpose-built audio distribution system. Hybrid designs deliberately take elements from both.
          </p>
          <p>
            Rather than accepting either sales argument in isolation, ask: which functions actually need IP; what happens during switch, server or network maintenance; which devices require PoE; how are priority messages handled; who owns configuration; what licences are recurring; and what parts of the system can continue operating if an upstream service is unavailable? The <Link href="/guides/ip-paging-network-readiness">IP paging network-readiness checklist</Link> covers these questions in more detail.
          </p>
        </section>

        <section id="cost" aria-labelledby="cost-heading">
          <h2 id="cost-heading">How much can a school PA system cost in Australia?</h2>
          <p>
            There is no useful single “price per school”. A timer/control refresh around serviceable infrastructure and a new multi-building IP PA/intercom system are different projects. The ranges below are planning examples generated from the same SiteComms pricing model as the calculator, so they are useful for order-of-magnitude budgeting rather than as supplier quotes or market averages.
          </p>
          <div className="not-prose mt-6 grid gap-5">
            {bands.map((band) => (
              <article key={band.id} className="sc-card bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">{band.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-[var(--sc-slate)]">{band.description}</p>
                  </div>
                  <p className="text-xl font-bold text-[var(--sc-teal-strong)]">{band.displayRange}</p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {band.typicalFeatures.map((feature) => (
                    <li key={feature} className="rounded-full bg-[var(--sc-blue-50)] px-3 py-1 text-xs text-[var(--sc-blue-900)]">{feature}</li>
                  ))}
                </ul>
                {band.largeSystem && (
                  <p className="mt-3 text-xs text-[var(--sc-slate)]">
                    The upper end exceeds the calculator&apos;s standard 30-endpoint system allowance, so additional central hardware may be required.
                  </p>
                )}
              </article>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-[var(--sc-slate)]">
            Indicative installed planning ranges, ex GST. Existing cabling, coverage, quantity of endpoints, control architecture, outdoor work, intercom, network work and commissioning can materially change the final scope.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
            <h3 className="text-xl font-bold text-[var(--sc-blue-900)]">Price the school you actually have</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
              Enter the rooms, larger spaces, outdoor areas, entries and current cabling condition to get an indicative installed range using the same model behind the examples above.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pricing-tool" className="sc-btn-primary">Get a ballpark price</Link>
              <Link href="/pricing" className="sc-btn-secondary">Read the full school PA cost guide</Link>
            </div>
          </div>
        </section>

        <section id="brief" aria-labelledby="brief-heading">
          <h2 id="brief-heading">What should go into a school PA project brief?</h2>
          <p>
            A better brief is one of the easiest ways to get better quotes. If each supplier is allowed to assume a different number of zones, different reuse scope and different commissioning obligations, the prices may look comparable while describing materially different systems.
          </p>
          <ol>
            {briefChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p>
            The full <Link href="/guides/school-pa-specification-checklist">school PA specification checklist</Link> is designed to turn these points into a like-for-like supplier brief.
          </p>
        </section>

        <section aria-labelledby="funding-heading">
          <h2 id="funding-heading">Can a school PA upgrade fit a funding pathway?</h2>
          <p>
            Potentially, but communications infrastructure is not automatically grant-eligible because it supports safety or school operations. The relevant route depends on the jurisdiction, school sector, applicant, project scope and current program status. SiteComms keeps the funding research separate from the technical recommendation so a product decision is not dressed up as a funding promise.
          </p>
          <div className="not-prose mt-5 flex flex-wrap gap-3">
            <Link href="/tools/funding-check" className="sc-btn-primary">Check funding pathways</Link>
            <Link href="/funding" className="sc-btn-secondary">Read the funding guides</Link>
            <Link href="/tools/finance-check" className="sc-btn-secondary">Check finance fit</Link>
          </div>
        </section>

        <section id="project-help" aria-labelledby="project-help-heading">
          <h2 id="project-help-heading">Want SiteComms to review the project before you contact suppliers?</h2>
          <p>
            Send us the school, location and what you need the system to achieve. The SiteComms team personally reviews the request and replies with what it thinks the sensible next step is. Where useful, we may suggest installers or suppliers and provide their public contact details and why they appear relevant.
          </p>
          <div className="not-prose mt-5 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
            <ProjectHelpLauncher
              mode="system_selection"
              sourceTopic="schools_mega_guide"
              buttonLabel="Ask SiteComms to review my school project"
              className="sc-btn-primary inline-flex cursor-pointer"
              context={{ Topic: "School PA, paging, bell or intercom project" }}
            />
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--sc-slate)]">
              We do not automatically forward your enquiry. SiteComms does not send your contact details, attachments or tool answers to installers or suppliers. We reply to you; you decide whether to contact anyone we suggest.
            </p>
          </div>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading">School PA system questions</h2>
          <h3>What is a school PA system?</h3>
          <p>
            It is the campus audio communication system used for live announcements and paging. Depending on the design it can also provide scheduled bells, pre-recorded routine messages, priority announcements and interfaces to intercom or other communication systems.
          </p>
          <h3>Does a modern school PA system have to be IP-based?</h3>
          <p>
            No. Dedicated wired, hybrid and full-IP architectures are all current approaches. The right choice depends on the existing infrastructure, required zoning and integrations, network capability, support model and how much change the school actually needs.
          </p>
          <h3>Can a school keep its existing speakers?</h3>
          <p>
            Sometimes. Existing loudspeakers, amplifiers or speaker circuits can be worth retaining if their condition, coverage, impedance/load, cabling and compatibility are suitable. They should be inspected and documented rather than automatically reused or automatically discarded.
          </p>
          <h3>Can bells and PA use the same speakers?</h3>
          <p>
            Commonly, yes. Many school communication systems distribute bells, tones, recorded messages and live paging over the same speaker network, but the required zones, priorities and emergency-system boundaries still need to be defined in the design.
          </p>
          <h3>How do you compare school PA quotes fairly?</h3>
          <p>
            Give suppliers the same coverage areas, zones, timetable requirements, reuse assumptions, network/cabling scope, commissioning requirements, training and support expectations. Then compare the complete installed result rather than only the equipment list.
          </p>
        </section>

        <ContinuePlanning
          items={[
            { title: "Pricing calculator", desc: "Model the actual rooms, halls, outdoor areas and intercom points to get a school-specific planning range.", href: "/pricing-tool" },
            { title: "Funding checker", desc: "Check researched state and national pathways against the school and project scope.", href: "/tools/funding-check" },
            { title: "Finance checker", desc: "See whether equipment finance or leasing is worth discussing after the likely project value is understood.", href: "/tools/finance-check" },
            { title: "Compare school systems", desc: "Compare complete school communication approaches by use case, architecture and Australian evidence.", href: "/compare/schools" },
            { title: "Specification checklist", desc: "Build one scope that every supplier can quote against on a like-for-like basis.", href: "/guides/school-pa-specification-checklist" },
            { title: "Network readiness", desc: "Check switching, PoE, cabling, multicast and responsibilities before specifying IP paging.", href: "/guides/ip-paging-network-readiness" },
          ]}
        />

        <p className="mt-8 text-xs text-[var(--sc-slate)]">
          Last reviewed {reviewedLabel("/schools")}. Provider and manufacturer pages are used as attributed examples of available approaches, not as independent performance testing, SiteComms partnerships or a claim that any provider is suitable for every school. Government requirements must be checked against the version and jurisdiction applicable to the project. See <Link href="/about/methodology">SiteComms methodology</Link> for how technical, pricing and source claims are reviewed.
        </p>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "School PA Systems Australia: Paging, Bells & Intercom Guide",
              description:
                "Independent Australian guide to school PA systems, including wired, hybrid and IP paging, bells, intercom, reuse, costs, requirements and provider approaches.",
              url: `${site.url}/schools`,
              datePublished: publishedDate("/schools"),
              dateModified: reviewedDate("/schools"),
              reviewedBy: { name: authors.shaun.name, role: authors.shaun.role, organisation: site.name },
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "SiteComms Australia", url: site.url },
              { name: "Schools", url: `${site.url}/schools` },
            ])
          ),
        }}
      />
    </div>
  );
}
