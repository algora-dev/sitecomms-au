import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { authors, site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "School Bell Systems & Timers Australia",
  description:
    "Compare school bell timers, hybrid upgrades and integrated PA/bell systems in Australia. Plan schedules, zones, announcements, reuse, cost and provider next steps.",
  path: "/systems/school-bell-announcements",
});

const upgradeChoices = [
  [
    "The PA still works; the timer or scheduling is the problem",
    "Bell / timer control upgrade",
    "Keep serviceable amplification and speakers where practical, then modernise schedules, manual triggers and calendar control.",
  ],
  [
    "Speakers and amplifiers are usable, but control and zoning are dated",
    "Hybrid modernisation",
    "Retain suitable 100V infrastructure and add a newer control, paging or network layer after inspection and compatibility checks.",
  ],
  [
    "The school needs bells plus live paging and daily announcements",
    "Integrated PA + bell platform",
    "Use one managed system for schedules, zones, live paging, pre-recorded messages and routine overrides.",
  ],
  [
    "The project also needs intercom, broader emergency workflows or campus integration",
    "Integrated IP communications platform",
    "Design bells as one function within a wider PA, paging and intercom architecture rather than as a standalone timer.",
  ],
] as const;

const workflowExamples = [
  ["Normal and alternate timetables", "Run standard days, A/B weeks or different primary/secondary schedules without rebuilding the system each time."],
  ["Term and holiday exceptions", "Prevent routine bells during holidays, pupil-free days or special calendar periods; confirm who maintains exceptions and whether updates are automatic or manual."],
  ["Exam and event changes", "Mute or isolate selected zones while the rest of the school continues its normal timetable."],
  ["Wet-weather or temporary schedules", "Switch to a temporary timetable without overwriting the normal schedule."],
  ["Manual bell and message triggers", "Give authorised staff a simple way to trigger a bell, tone or pre-recorded announcement when the day does not follow the timetable."],
  ["Zoned announcements", "Page one building, a group of classrooms, outdoor areas or the whole site rather than treating every message as all-call."],
] as const;

const marketExamples = [
  {
    name: "BellTimer / Sandman",
    href: "https://www.belltimer.com.au/",
    fit: "Timer-led modernisation",
    note: "Its Melbourne-focused material shows the lighter end of the market: timetable control, manual triggers and use with existing amplification or bells where suitable.",
  },
  {
    name: "FrontRow Conductor",
    href: "https://www.gofrontrow.com.au/products/conductor/",
    fit: "Campus bells, paging and classroom communication",
    note: "FrontRow describes school-wide scheduling, zoning, paging, intercom and alerts within a broader education communications platform.",
  },
  {
    name: "Jacques school communications",
    href: "https://www.jacques.com.au/schools/",
    fit: "Integrated Australian IP PA, bell and intercom",
    note: "Jacques publishes Australian school examples and calendar-based bell / announcement scheduling alongside zoned PA and intercom functions.",
  },
  {
    name: "Q-SYS school deployments via Masters Voice",
    href: "https://www.mastersvoice.com.au/q-sys-school-bell-systems",
    fit: "Integrator-engineered control and audio platform",
    note: "Masters Voice documents NSW school projects using scheduled bells, selected paging zones, timetable exceptions and retained serviceable infrastructure in some deployments.",
  },
] as const;

export default function SchoolBellPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="Australian School Communications Guide"
        title="School Bell Systems, Timers & Daily Announcements"
        description="Compare the practical ways Australian schools can modernise bells: replace only the timer, retain useful PA infrastructure, or move to an integrated system for scheduled bells, live paging, announcements and wider campus communication."
        tags={["School bell timers", "Automated schedules", "Zoned paging", "PA announcements", "Hybrid upgrades"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Compare school systems", href: "/compare/schools" }}
        reviewed={reviewedLabel("/systems/school-bell-announcements")}
        reviewer={{ name: authors.shaun.name, role: authors.shaun.role, href: "/about/methodology" }}
        note="Australian-focused guidance"
        breadcrumb={[{ name: "Systems", href: "/systems" }, { name: "School Bells & Announcements" }]}
      />

      <AtAGlance
        items={[
          { label: "Fastest upgrade", value: "Modernise the timer/control layer if the existing PA and speakers remain serviceable" },
          { label: "Common next step", value: "Combine automated bells with zoned live paging and daily announcements" },
          { label: "Larger projects", value: "Treat bells as one function inside an integrated PA, paging and intercom platform" },
          { label: "Next step", value: "Estimate cost, then send the result to SiteComms if you want help progressing it" },
        ]}
      />

      <article className="sc-container max-w-[900px] py-10 sc-prose">
        <section aria-labelledby="which-system">
          <h2 id="which-system">Which type of school bell system do you actually need?</h2>
          <p>
            A school bell upgrade does not automatically mean replacing every speaker, amplifier and cable. The useful first question is what is actually failing or missing. A school with reliable 100V speakers and a frustrating old timer has a different project from a campus that also needs better paging coverage, zone control, intercom and emergency messaging.
          </p>
          <div className="not-prose mt-6 overflow-x-auto rounded-2xl border border-[var(--sc-border)] bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-[var(--sc-blue-50)] text-[var(--sc-blue-900)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">If this sounds like your school</th>
                  <th className="px-4 py-3 font-semibold">Start by considering</th>
                  <th className="px-4 py-3 font-semibold">What that usually means</th>
                </tr>
              </thead>
              <tbody>
                {upgradeChoices.map(([situation, route, explanation]) => (
                  <tr key={route} className="border-t border-[var(--sc-border)] align-top">
                    <td className="px-4 py-4 text-[var(--sc-slate)]">{situation}</td>
                    <td className="px-4 py-4 font-semibold text-[var(--sc-blue-900)]">{route}</td>
                    <td className="px-4 py-4 text-[var(--sc-slate)]">{explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            If you are replacing a legacy installation, also read <Link href="/systems/traditional-vs-ip">traditional vs IP paging and what may be reusable</Link>. Reuse should always be confirmed by inspection and testing rather than assumed from age or connector type alone.
          </p>
        </section>

        <section aria-labelledby="scheduling">
          <h2 id="scheduling">What a modern school bell timer should make easier</h2>
          <p>
            Modern school bell control is normally schedule-driven rather than a single hard-wired timer. Depending on the platform, the timetable can play tones, music or recorded audio to selected zones and can share the same audio system used for live announcements. The practical value is not merely that the bell is digital; it is that authorised staff can change the school day without calling a technician for routine timetable changes.
          </p>
          <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
            {workflowExamples.map(([title, description]) => (
              <div key={title} className="sc-card bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-blue-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{description}</p>
              </div>
            ))}
          </div>
          <p>
            When demonstrations are being arranged, ask the supplier to show the school&apos;s real timetable rather than a generic demo: create an exception, change one zone, suspend a bell, trigger a manual announcement and restore the normal schedule. That exposes usability issues much faster than reading a feature list.
          </p>
        </section>

        <section aria-labelledby="reuse">
          <h2 id="reuse">Can an existing school PA be retained?</h2>
          <p>
            Sometimes. Serviceable loudspeakers, 100V speaker circuits, amplifiers, racks and data infrastructure can all have reuse value, but only after their condition, coverage, load, cabling and compatibility are checked. A hybrid project can be a sensible middle ground when the acoustic coverage is acceptable but the control layer is obsolete or difficult to operate.
          </p>
          <p>
            This is why the cheapest useful project is not always a new set of IP speakers. For some schools, a new controller or scheduling layer around sound existing infrastructure can solve the immediate problem. For others, repeated coverage gaps, unsupported hardware or expansion into new buildings makes a broader replacement easier to justify.
          </p>
        </section>

        <section aria-labelledby="paging">
          <h2 id="paging">Bells, daily announcements and paging should be planned together</h2>
          <p>
            Once the bell system uses the same audio path as school announcements, the project needs a clear message hierarchy. Office staff may need all-call paging, selected-zone paging and pre-recorded routine messages; some schools also want classroom or gate intercom. Decide which users can make which announcements, which zones they can reach and what should happen when a routine bell coincides with a higher-priority message.
          </p>
          <p>
            Two-way room or entrance communication is a separate design question; see the <Link href="/systems/ip-intercom">IP intercom guide</Link>. For broader networked audio design, see <Link href="/systems/ip-paging-pa">IP paging and network PA</Link>.
          </p>
        </section>

        <section aria-labelledby="emergency">
          <h2 id="emergency">Emergency and lockdown messaging needs a deliberate scope</h2>
          <p>
            Many school communication platforms can trigger warning tones, recorded instructions or urgent live announcements. That can be useful operationally, but a PA/bell product should not be described as a certified life-safety or evacuation system unless the proposed design and product certifications actually support that claim. Define exactly what the school expects the system to do, how staff activate it, where messages must be heard and how it interacts with any separate required emergency warning systems.
          </p>
          <p>
            See <Link href="/systems/emergency-lockdown">emergency and lockdown communication planning</Link> for the wider scope and acceptance questions.
          </p>
        </section>

        <section aria-labelledby="australian-planning">
          <h2 id="australian-planning">Australian school planning considerations</h2>
          <p>
            Requirements vary by jurisdiction, sector and project. As a concrete current example, Victoria&apos;s Building Quality Standards Handbook calls for public-address coverage across school facilities and the site, including outdoor areas and future modular spaces, and specifically identifies school bell services, automatic announcements, simple staff operation and efficient zone selection. That is a useful planning benchmark, but it should not be treated as a substitute for the requirements that apply to a particular school or procurement pathway.
          </p>
          <p>
            NSW projects should also be checked against the applicable current <a href="https://education.nsw.gov.au/about-us/efsg-home/efsg-2026" target="_blank" rel="noreferrer">Educational Facilities Standards and Guidelines (EFSG)</a> rather than relying on an older version. The SiteComms <Link href="/guides/school-pa-paging-requirements">Australian school PA and paging requirements guide</Link> provides the broader jurisdiction and project-planning starting points.
          </p>
          <p className="not-prose mt-4 rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-4 text-sm leading-relaxed text-[var(--sc-slate)]">
            Official Victorian reference: <a href="https://www.schoolbuildings.vic.gov.au/building-quality-standards-handbook/technical-specifications" target="_blank" rel="noreferrer" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Victorian School Building Authority - technical specifications ↗</a>
          </p>
        </section>

        <section aria-labelledby="market-examples">
          <h2 id="market-examples">Examples of the approaches available in Australia</h2>
          <p>
            The Australian market includes everything from dedicated bell/timer controls to complete IP communications platforms. The examples below are included to show different approaches, not as SiteComms endorsements, rankings or claims of partnership. Product capabilities and local supply arrangements should be confirmed for the specific project.
          </p>
          <div className="not-prose mt-6 space-y-4">
            {marketExamples.map((example) => (
              <div key={example.name} className="sc-card bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[var(--sc-blue-900)]">{example.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">{example.fit}</p>
                  </div>
                  <a href={example.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Official / provider information ↗</a>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{example.note}</p>
              </div>
            ))}
          </div>
          <p>
            For a broader feature-by-feature view, use the <Link href="/compare/schools">Australian school communications comparison</Link>. The important question is not which logo is universally best; it is which architecture solves the school&apos;s actual bell, paging, coverage, operation and support requirements without unnecessary replacement.
          </p>
        </section>

        <section aria-labelledby="cost">
          <h2 id="cost">What will a school bell or PA upgrade cost?</h2>
          <p>
            Cost depends on how much of the existing installation is reusable, the number of rooms and outdoor areas, cabling, the number of zones, the control hardware and whether bells are part of a wider paging/intercom project. A timer-only control change and a new site-wide IP system are not comparable projects, so a useful budget starts with the intended scope rather than a generic per-speaker price.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
            <h3 className="text-xl font-bold text-[var(--sc-blue-900)]">Turn the scope into a ballpark project budget</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
              The SiteComms calculator estimates an installed range from the site condition, areas to cover and feature level. It is designed for early planning rather than as a supplier quote.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pricing-tool" className="sc-btn-primary">Estimate project cost</Link>
              <Link href="/pricing" className="sc-btn-secondary">See pricing methodology</Link>
            </div>
          </div>
        </section>

        <section id="project-help" aria-labelledby="project-help-heading">
          <h2 id="project-help-heading">Already know what needs fixing?</h2>
          <p>
            Send SiteComms the school, location and current problem. If you have used the pricing tool, your result can travel with the enquiry automatically. The SiteComms team reviews the request itself and replies with the next steps it thinks make sense. Where useful, we can suggest providers and give you their public contact details and the reason they may fit.
          </p>
          <div className="not-prose mt-5">
            <ProjectHelpLauncher
              mode="project_help"
              sourceTopic="school_bell_guide"
              buttonLabel="Send the project to SiteComms"
              className="sc-btn-primary"
              context={{ Topic: "School bell, timer or announcement system" }}
            />
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--sc-slate)]">
              SiteComms does not send your enquiry or contact details to installers or suppliers. You decide whether to contact anyone we recommend.
            </p>
          </div>
        </section>

        <section aria-labelledby="specification">
          <h2 id="specification">What should appear in a school bell specification?</h2>
          <ul>
            <li>Normal, alternate and temporary timetable requirements.</li>
            <li>Term, holiday, pupil-free-day and event exceptions.</li>
            <li>All-call and selected paging zones, including outdoor areas.</li>
            <li>Who can edit schedules and trigger manual bells or announcements.</li>
            <li>Tone, music and pre-recorded-message requirements.</li>
            <li>Any retained speakers, amplifiers, cabling or network infrastructure to be assessed.</li>
            <li>Emergency-message scope and interfaces with separate safety systems.</li>
            <li>Acceptance testing using the school&apos;s actual timetable and representative zones.</li>
          </ul>
          <p>
            Use the <Link href="/guides/school-pa-specification-checklist">school PA specification checklist</Link> to build a like-for-like brief before comparing formal quotes.
          </p>
        </section>

        <ContinuePlanning
          items={[
            { title: "Compare school systems", desc: "Start with the school outcome, then compare the architectures and platforms that can meet it.", href: "/compare/schools" },
            { title: "Specification checklist", desc: "Define bells, zones, paging, reuse and emergency functions so quotes are comparable.", href: "/guides/school-pa-specification-checklist" },
            { title: "Funding pathway checker", desc: "Check researched state and national routes using the actual applicant and project scope.", href: "/tools/funding-check" },
          ]}
        />

        <p className="mt-8 text-xs text-[var(--sc-slate)]">
          Last reviewed {reviewedLabel("/systems/school-bell-announcements")}. General information for Australian schools - not education-authority, engineering, safety-system or funding advice.
        </p>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              articleSchema({
                headline: "School Bell Systems, Timers & Daily Announcements Australia",
                description:
                  "Australian guide to school bell timers, hybrid PA upgrades and integrated bell, paging and announcement systems.",
                url: `${site.url}/systems/school-bell-announcements`,
                datePublished: publishedDate("/systems/school-bell-announcements"),
                dateModified: reviewedDate("/systems/school-bell-announcements"),
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
                { name: "Home", url: site.url },
                { name: "Systems", url: `${site.url}/systems` },
                { name: "School Bells & Announcements", url: `${site.url}/systems/school-bell-announcements` },
              ])
            ),
          }}
        />
      </article>
    </div>
  );
}
