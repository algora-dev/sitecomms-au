import type { Metadata } from "next";
import Link from "next/link";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import ProjectNextSteps from "@/components/content/ProjectNextSteps";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { authors, site } from "@/lib/site";
import { presetSummaries } from "@/lib/pricing/presets";
import { pricingConfig, formatAUD } from "@/lib/pricing/config";
import { schoolBandSummaries } from "@/lib/pricing/school-bands";

export const metadata: Metadata = buildMetadata({
  title: "School PA System Cost Australia | Pricing Guide & Calculator",
  description:
    "Australian school PA system cost guide with indicative installed ranges, cost drivers, quote inclusions, architecture trade-offs and a calculator for your own school.",
  path: "/pricing",
});

const COST_BUILDUP = [
  ["Control / platform", "Timer, paging controls, processing, software, gateways or the central platform that manages schedules and routing."],
  ["Coverage endpoints", "Classroom speakers, outdoor horns, hall coverage, paging stations, intercom endpoints and other field devices."],
  ["Distribution infrastructure", "Speaker circuits, structured cabling, network switching/PoE, racks, power and the interfaces between retained and new equipment."],
  ["Functions and integration", "Bell scheduling, priority messages, entry intercom, room calling, phone/SIP integration, monitoring and other required workflows."],
  ["Installation and access", "Cable routes, ceiling access, poles, trenching, staging, travel, working around school operations and any difficult installation conditions."],
  ["Commissioning and handover", "Programming, zone verification, coverage checks, staff training, documentation, configuration records and support arrangements."],
] as const;

const FACTORS = [
  { title: "Rooms, zones and endpoints", desc: "More classrooms, speakers, horns, intercoms and control points increase both equipment and commissioning scope." },
  { title: "Existing infrastructure", desc: "Reusable speaker circuits, amplifiers, racks or network points can reduce replacement scope, but only after their condition and compatibility are checked." },
  { title: "Cabling and access", desc: "New data or speaker cabling, difficult ceiling access, trenching, poles and work at height can materially change installation labour." },
  { title: "Halls and outdoor areas", desc: "Gyms, halls, yards and sports fields need different speaker types, mounting and coverage design from standard classrooms." },
  { title: "Bells, priority messaging and intercom", desc: "Scheduling, authorised priority messages, specialist interfaces, room-call buttons and entry intercom add control, programming and endpoint costs." },
  { title: "Testing, training and handover", desc: "Coverage verification, programming, documentation, staff training and support are part of a usable installed system even though they are not a speaker on a bill of materials." },
];

const ARCHITECTURES = [
  {
    title: "Retain and modernise",
    cost: "Usually the lowest-disruption path when existing infrastructure is serviceable",
    desc: "Keep suitable speakers, amplifiers or circuits and replace the timer, controller or selected failed components. The saving depends on what can genuinely be reused after inspection.",
  },
  {
    title: "Hybrid upgrade",
    cost: "Often a middle path",
    desc: "Retain useful 100V speaker infrastructure while adding modern scheduling, paging controls, network interfaces or selected IP endpoints where they solve a real problem.",
  },
  {
    title: "New dedicated wired PA",
    cost: "Higher replacement scope, simpler network dependency",
    desc: "Install new central amplification, speaker circuits, paging controls and bells. This can suit schools that value a dedicated communications path and straightforward support.",
  },
  {
    title: "Networked / integrated platform",
    cost: "Potentially the broadest scope",
    desc: "Use network-connected speakers, controllers or gateways for granular zoning and integration. Cost depends heavily on endpoint count, PoE/network readiness, licences, intercom and integration requirements.",
  },
] as const;

const BUDGET_LEVERS = [
  ["Can reduce replacement scope", "Existing speakers/circuits test well; existing amplifiers are suitable; usable racks, power or network points already exist; the brief needs simple bells and paging rather than extensive two-way endpoints."],
  ["Often increases scope", "New buildings or zones; poor/unknown cabling; outdoor fields; difficult access; new structured cabling or switching; many intercom points; staged cutovers; complex integrations; extensive documentation or support requirements."],
] as const;

const QUOTE_CHECKLIST = [
  "The same rooms, buildings, yards, halls and sports areas are included.",
  "The same zoning and paging controls are included.",
  "Bell schedules, holiday/exam exceptions and manual overrides are defined.",
  "Existing speakers, amplifiers and cabling are either explicitly retained, tested or replaced.",
  "Structured/data cabling and network-switch work are clearly included or excluded.",
  "Priority / emergency interfaces are described rather than assumed.",
  "Intercom, room-call and entry points are counted consistently.",
  "Programming, testing, commissioning, staff training and documentation are included.",
  "Warranty, support, licences and recurring costs are identified.",
];

const AUSTRALIAN_PRICE_SOURCES = [
  {
    name: "Masters Voice Technology",
    href: "https://www.mastersvoice.com.au/insights/school-bell-solution-guide",
    contribution: "Explains why campus size, buildings/zones, existing infrastructure, speaker quantities, amplification, network requirements, programming, access and staging all affect a school PA/bell quote.",
  },
  {
    name: "HFAV",
    href: "https://highfidelityav.com/school-pa-system-perth",
    contribution: "Makes school quote drivers concrete: building size, zone count, speaker type, existing cabling and whether bells, paging and emergency tones are integrated.",
  },
  {
    name: "Prolinx Audio Visual",
    href: "https://prolinx.com.au/school-public-address-systems/",
    contribution: "Publishes a school PA refresh package whose advertised equipment price explicitly excludes installation, a useful real-world example of why a hardware/package number and an installed campus-project budget are not the same thing.",
  },
  {
    name: "3 Monkeys AV",
    href: "https://www.3monkeysav.com.au/school-pa-system/",
    contribution: "Shows why fixed school-wide bell/paging systems and portable event PA are different purchasing problems and should not be compared as though they are the same scope.",
  },
  {
    name: "Data & Voice Plus",
    href: "https://dvplus.com.au/school-pa-systems-melbourne/",
    contribution: "Highlights structured cabling, network-aware design, testing and coverage verification as part of the installed project rather than treating the speaker list as the whole job.",
  },
  {
    name: "13001comms",
    href: "https://www.13001comms.com.au/sound-system-for-school/",
    contribution: "Identifies school/campus size, feature requirements and sound-quality expectations as reasons one school PA quote can differ from another.",
  },
  {
    name: "Altronics / Redback",
    href: "https://www.altronics.com.au/product/a4270-redback-pa-mixer-amplifier-125w-4-zone",
    contribution: "Public component pricing is a useful reality check: amplifiers, speakers and controls have visible hardware prices, but a component price is not an installed school-system quote.",
  },
  {
    name: "Anything Audio",
    href: "https://anythingaudio.com.au/collections/public-address-pa-amplifier-100v",
    contribution: "Shows a broad public range of 100V and network-audio amplifier capacities, reinforcing why equipment selection changes with system size and architecture.",
  },
] as const;

export default function PricingPage() {
  const examples = presetSummaries();
  const schoolBands = schoolBandSummaries();

  return (
    <div>
      <AuthorityHero
        eyebrow="Independent Australian school PA pricing guide"
        title="How much does a school PA system cost in Australia?"
        description={`For the current SiteComms planning model, a smaller school is roughly ${schoolBands[0]?.displayRange}, a medium school ${schoolBands[1]?.displayRange}, and a larger school or campus ${schoolBands[2]?.displayRange}. These are modelled installed planning ranges, not supplier quotes or market averages. The guide below explains what moves the budget and what a like-for-like quote should include.`}
        tags={["School PA cost", "Installed pricing", "Paging & bells", "Quote comparison", "Australian schools"]}
        primaryCta={{ label: "Calculate my school", href: "/pricing-tool" }}
        secondaryCta={{ label: "Choose the system approach", href: "/schools" }}
        reviewed={reviewedLabel("/pricing")}
        reviewer={{ name: authors.shaun.name, role: authors.shaun.role, href: "/about/methodology" }}
        note="Planning ranges · ex GST · not a supplier quote"
        breadcrumb={[{ name: "Pricing", href: "/pricing" }]}
      />

      <AtAGlance
        items={[
          { label: "Small school", value: schoolBands[0]?.displayRange ?? "Estimate unavailable" },
          { label: "Medium school", value: schoolBands[1]?.displayRange ?? "Estimate unavailable" },
          { label: "Large school / campus", value: schoolBands[2]?.displayRange ?? "Estimate unavailable" },
          { label: "Important exclusion", value: "Site-wide structured cabling is excluded from the SiteComms estimate and must be scoped separately where required." },
        ]}
      />

      <ProjectNextSteps
        sourceTopic="pricing_mega_guide_top"
        mode="quote_help"
        title="Use the number, or go straight to the next decision"
        intro="You can calculate your own site, check researched funding pathways, check whether finance is worth discussing, or send the project straight to SiteComms for a confidential review."
        context={{ Topic: "School PA, paging, bell or intercom project budget" }}
      />

      <section className="border-y border-[var(--sc-border)] bg-white py-6">
        <nav className="sc-container max-w-5xl" aria-label="On this page">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">On this page</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <a href="#ranges" className="text-[var(--sc-blue-700)] hover:underline">Current planning ranges</a>
            <a href="#installed-cost" className="text-[var(--sc-blue-700)] hover:underline">What installed cost means</a>
            <a href="#architecture-cost" className="text-[var(--sc-blue-700)] hover:underline">Architecture effects</a>
            <a href="#cost-drivers" className="text-[var(--sc-blue-700)] hover:underline">Cost drivers</a>
            <a href="#market-evidence" className="text-[var(--sc-blue-700)] hover:underline">Australian evidence</a>
            <a href="#compare-quotes" className="text-[var(--sc-blue-700)] hover:underline">Compare quotes</a>
            <a href="#method" className="text-[var(--sc-blue-700)] hover:underline">Method & limits</a>
          </div>
        </nav>
      </section>

      <section id="ranges" className="border-b border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-5xl">
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">Current SiteComms school PA planning ranges</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-[var(--sc-slate)]">
            These bands are generated from the same pricing engine as the calculator. They deliberately model different room counts, outdoor areas and capability levels; they are not survey results and should not be read as “the average Australian school price”.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {schoolBands.map((band) => (
              <div key={band.id} className="sc-card bg-white p-6">
                <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">{band.title}</h3>
                <p className="mt-2 text-2xl font-bold text-[var(--sc-teal-strong)]">{band.displayRange}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{band.description}</p>
                <p className="mt-3 text-xs leading-relaxed text-[var(--sc-slate)]">Typical modelled scope may include {band.typicalFeatures.join(", ")}.</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pricing-tool" className="sc-btn-primary">Price my own school</Link>
            <Link href="/schools" className="sc-btn-secondary">School PA buyer&apos;s guide</Link>
          </div>
        </div>
      </section>

      <main className="sc-container max-w-5xl py-14">
        <article className="sc-prose">
          <section id="installed-cost" aria-labelledby="installed-cost-heading">
            <h2 id="installed-cost-heading">What does an “installed school PA system cost” actually include?</h2>
            <p>
              An installed school PA budget is not simply <em>speaker price × number of rooms</em>. A useful planning model has to account for the control platform, enough endpoints for the required coverage, the distribution infrastructure that connects them, the functions the school needs, the physical installation and the work required to commission and hand the system over.
            </p>
            <div className="not-prose mt-6 rounded-2xl border border-[var(--sc-border)] bg-white p-5 sm:p-6">
              <p className="text-sm font-semibold text-[var(--sc-blue-900)]">SiteComms budgeting model - conceptual view</p>
              <p className="mt-2 text-lg font-bold leading-relaxed text-[var(--sc-blue-900)]">Installed budget ≈ control + coverage + infrastructure + functions + installation + commissioning</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {COST_BUILDUP.map(([title, desc]) => (
                  <div key={title} className="rounded-xl bg-[var(--sc-blue-50)] p-4">
                    <h3 className="text-sm font-semibold text-[var(--sc-blue-900)]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <p>
              Search results often mix portable assembly speakers, classroom voice amplifiers, bell timers, individual amplifiers and complete campus systems. Those are different purchases. This page focuses on the <strong>fixed school-wide paging, bell and communications infrastructure</strong> used across classrooms, administration and outdoor areas.
            </p>
          </section>

          <section id="architecture-cost" aria-labelledby="architecture-cost-heading">
            <h2 id="architecture-cost-heading">The same “PA upgrade” can describe four very different budgets</h2>
            <p>
              Architecture is one of the biggest reasons two credible proposals can have very different totals. The cheapest sensible option may be a control upgrade around serviceable infrastructure; a new integrated platform is a different scope, not simply a more expensive version of the same product.
            </p>
            <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
              {ARCHITECTURES.map((item) => (
                <div key={item.title} className="sc-card p-5">
                  <h3 className="font-semibold text-[var(--sc-blue-900)]">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--sc-teal-strong)]">{item.cost}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{item.desc}</p>
                </div>
              ))}
            </div>
            <p>
              The <Link href="/schools">school PA buyer&apos;s guide</Link> explains how to decide between these architectures before price becomes the deciding factor.
            </p>
          </section>

          <section id="cost-drivers" aria-labelledby="cost-drivers-heading">
            <h2 id="cost-drivers-heading">What moves a school PA quote up or down?</h2>
            <p>
              Across Australian installer material, the same themes recur: site size, coverage, existing assets, cabling/network scope, system functions and installation conditions. SiteComms uses those themes as scope checks, not as a claim that any one supplier&apos;s design is the market standard.
            </p>
            <div className="not-prose mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FACTORS.map((factor) => (
                <div key={factor.title} className="sc-card p-5">
                  <h3 className="font-semibold text-[var(--sc-blue-900)]">{factor.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{factor.desc}</p>
                </div>
              ))}
            </div>
            <div className="not-prose mt-6 overflow-x-auto rounded-2xl border border-[var(--sc-border)] bg-white">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead className="bg-[var(--sc-blue-50)] text-[var(--sc-blue-900)]"><tr><th className="px-4 py-3 font-semibold">Budget direction</th><th className="px-4 py-3 font-semibold">Typical scope conditions</th></tr></thead>
                <tbody className="divide-y divide-[var(--sc-border)] text-[var(--sc-slate)]">
                  {BUDGET_LEVERS.map(([direction, conditions]) => <tr key={direction} className="align-top"><td className="px-4 py-4 font-semibold text-[var(--sc-blue-900)]">{direction}</td><td className="px-4 py-4 leading-relaxed">{conditions}</td></tr>)}
                </tbody>
              </table>
            </div>
            <p>
              Network readiness matters particularly for IP-heavy designs. A site with suitable switching, PoE capacity and data outlets is a different project from one requiring new network infrastructure. Use the <Link href="/guides/ip-paging-network-readiness">IP paging network-readiness checklist</Link> before assuming the network side is “already there”.
            </p>
          </section>

          <section aria-labelledby="hardware-heading">
            <h2 id="hardware-heading">Why public hardware prices do not equal an installed school-system price</h2>
            <p>
              Australian retailers such as Altronics and Anything Audio publish individual amplifier, speaker and control prices. That is useful evidence that hardware capacity and selection affect the bill of materials, but it does not price the design, cable routes, mounting, network work, programming, commissioning, documentation or staff handover needed to turn components into a working campus system.
            </p>
            <p className="text-sm">
              Examples: <a href="https://www.altronics.com.au/product/c2056-redback-20w-100v-ewis-ip66-weather-proof-plastic-horn-speaker" target="_blank" rel="noreferrer">Altronics weatherproof Redback horn</a>, <a href="https://www.altronics.com.au/product/a4270-redback-pa-mixer-amplifier-125w-4-zone" target="_blank" rel="noreferrer">Altronics four-zone Redback amplifier</a>, and <a href="https://anythingaudio.com.au/collections/public-address-pa-amplifier-100v" target="_blank" rel="noreferrer">Anything Audio 100V amplifier range</a>. Public prices can change; SiteComms does not convert these individual retail prices into promises of installed cost.
            </p>
          </section>

          <section id="market-evidence" aria-labelledby="market-evidence-heading">
            <h2 id="market-evidence-heading">What current Australian sources contribute to the pricing picture</h2>
            <p>
              No single installer represents the whole market. The value comes from comparing several sources that expose different parts of the quote. Inclusion below is not an endorsement, ranking, partnership claim or statement that a provider is suitable for every school.
            </p>
            <div className="not-prose mt-6 grid gap-4 lg:grid-cols-2">
              {AUSTRALIAN_PRICE_SOURCES.map((source) => (
                <div key={source.name} className="rounded-2xl border border-[var(--sc-border)] bg-white p-5">
                  <h3 className="font-semibold text-[var(--sc-blue-900)]"><a href={source.href} target="_blank" rel="noreferrer" className="underline decoration-[var(--sc-border)] underline-offset-4 hover:decoration-current">{source.name}</a></h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{source.contribution}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--sc-slate)]">
              Sources rechecked 20 October 2026. Supplier and retailer pages can change; product/package prices are evidence of component scope only and are not treated as installed-project quotes.
            </p>
            <p>
              <strong>SiteComms synthesis:</strong> the finished budget is driven less by a headline “PA brand” than by the number and type of spaces to cover, what existing infrastructure can be proven reusable, which communications functions are required, and what work is needed to install and verify the result.
            </p>
          </section>

          <section id="compare-quotes" aria-labelledby="compare-quotes-heading">
            <h2 id="compare-quotes-heading">How to compare two school PA quotes without choosing the wrong “cheapest” one</h2>
            <p>
              Two totals are only comparable when the suppliers priced the same outcome. Before comparing the bottom line, check that each proposal answers the same brief:
            </p>
            <ul>{QUOTE_CHECKLIST.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>
              If one quote includes new structured cabling and another assumes the school supplies it, or one replaces outdoor speakers while another reuses them, the difference is scope rather than simply margin. The <Link href="/guides/compare-pa-system-quotes">PA quote comparison guide</Link> and <Link href="/guides/school-pa-specification-checklist">school specification checklist</Link> are designed to make those differences visible.
            </p>
          </section>

          <section id="method" aria-labelledby="method-heading">
            <h2 id="method-heading">What the SiteComms estimate includes, and what it does not prove</h2>
            <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--sc-border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-blue-900)]">What it is useful for</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--sc-slate)]">
                  <li>• Early order-of-magnitude budgeting for the modelled communications scope.</li>
                  <li>• Comparing how room counts, outdoor areas, capability packages and intercom endpoints affect a planning range.</li>
                  <li>• Giving SiteComms enough structured context to discuss the next step without starting from zero.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--sc-border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-blue-900)]">What it does not establish</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--sc-slate)]">
                  <li>• A formal supplier quote, market average or statistical confidence interval.</li>
                  <li>• Final acoustic coverage, exact equipment quantities, product compatibility or statutory emergency-system compliance.</li>
                  <li>• Site-wide structured cabling, unknown power/network works, difficult access, travel or other unresolved site conditions.</li>
                </ul>
              </div>
            </div>
            <p>
              Amounts are AUD excluding GST. The current model uses an 80-100% planning range around the modelled scope and flags larger endpoint counts for human review. Pricing assumptions were last reviewed {pricingConfig.reviewedAtLabel}; this guide was last reviewed {reviewedLabel("/pricing")}. See <Link href="/about/methodology">how SiteComms gets and reviews pricing</Link>.
            </p>
          </section>

          <section aria-labelledby="calculator-heading">
            <h2 id="calculator-heading">Get a school-specific planning range</h2>
            <p>
              Broad bands are useful for a first budget, but the better next step is to model the actual number of classrooms, halls, outdoor areas and entry/intercom points. The calculator uses the same assumptions as this guide and gives the result immediately.
            </p>
            <div className="not-prose mt-5 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
              <Link href="/pricing-tool" className="sc-btn-primary">Calculate my project</Link>
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--sc-slate)]">No supplier contact is required to see the planning result. If you later ask SiteComms for help, the result can travel with your enquiry so you do not have to explain the project again.</p>
            </div>
          </section>

          <section id="project-help" aria-labelledby="project-help-heading">
            <h2 id="project-help-heading">Want SiteComms to review the budget before you approach suppliers?</h2>
            <p>
              Send us the project and, if you have one, the calculator result or supplier quote. The SiteComms team personally reviews what you send and replies with what it thinks the sensible next step is. Where useful, we may suggest installers or suppliers and provide their public contact details and why they appear relevant.
            </p>
            <div className="not-prose mt-5 rounded-2xl border border-[var(--sc-border)] bg-white p-6 shadow-sm">
              <ProjectHelpLauncher
                mode="quote_help"
                sourceTopic="pricing_mega_guide"
                buttonLabel="Ask SiteComms to review my project"
                className="sc-btn-primary inline-flex cursor-pointer"
                context={{ Topic: "PA, paging, bell or intercom project budget" }}
              />
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--sc-slate)]">We do not automatically forward your enquiry. SiteComms does not send your contact details, attachments or tool answers to installers or suppliers. We reply to you; you decide whether to contact anyone we suggest.</p>
            </div>
          </section>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading">School PA system cost questions</h2>
            <h3>What is a realistic school PA system budget in Australia?</h3>
            <p>For the scopes currently modelled by SiteComms, the live bands on this page are {schoolBands[0]?.displayRange} for a smaller school, {schoolBands[1]?.displayRange} for a medium school and {schoolBands[2]?.displayRange} for a larger school/campus. They are planning examples, not fixed market prices or promises of a final quote.</p>
            <h3>Why can two school PA quotes be so different?</h3>
            <p>They may include different coverage areas and zones, different reuse assumptions, different cabling scope, different priority/intercom features, or different levels of programming, testing, training and support. Compare the scope before comparing the total.</p>
            <h3>Is an IP school PA system always more expensive?</h3>
            <p>Not necessarily. A networked design can avoid some dedicated speaker cabling when suitable network infrastructure already exists, but it may add PoE switching, licences or higher-cost endpoints. A hybrid design can sometimes be more economical when serviceable speaker infrastructure can be retained.</p>
            <h3>Can we reduce cost by keeping existing speakers?</h3>
            <p>Potentially. Reuse can be sensible when speakers, circuits and amplifiers are in suitable condition and compatible with the proposed design. They should be tested and documented rather than assumed usable.</p>
            <h3>Does the SiteComms estimate include site-wide structured cabling?</h3>
            <p>No. {pricingConfig.cablingDisclaimer}</p>
            <h3>Does a cheaper hardware list mean a cheaper installed system?</h3>
            <p>No. Hardware is only one part of the project. A lower equipment total can still produce a higher installed cost if the design requires extensive new cabling, difficult access, more installation labour, network upgrades or more complex commissioning.</p>
          </section>

          <details className="not-prose mt-10 rounded-2xl border border-[var(--sc-border)] bg-white p-5">
            <summary className="cursor-pointer font-semibold text-[var(--sc-blue-900)]">Planning a non-school site? See examples from the same model</summary>
            <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">The calculator also supports commercial, care and other multi-zone sites. These are configuration examples, not market averages or formal quotes.</p>
            <div className="mt-5 grid gap-4">
              {examples.map((example) => (
                <div key={example.title} className="rounded-xl border border-[var(--sc-border)] p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="font-semibold text-[var(--sc-blue-900)]">{example.title}</h3><p className="font-bold text-[var(--sc-teal-strong)]">{example.range}</p></div>
                  <p className="mt-2 text-sm text-[var(--sc-slate)]">{example.blurb}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">Every modelled example includes a central control/platform allowance ({examples[0]?.available ? `currently ${formatAUD(pricingConfig.headendPrice)} ex GST` : "currently withheld while the source is under review"}). Depending on architecture, equivalent functionality may instead be distributed across controllers, software, gateways, licences or endpoints.</p>
          </details>

          <ContinuePlanning
            items={[
              { title: "School PA buyer's guide", desc: "Choose between retained, wired, hybrid and IP approaches before comparing a final system price.", href: "/schools" },
              { title: "Pricing calculator", desc: "Model the actual classrooms, halls, outdoor areas and intercom points for your project.", href: "/pricing-tool" },
              { title: "Funding checker", desc: "Check researched state and national pathways against the actual school and project scope.", href: "/tools/funding-check" },
              { title: "Finance checker", desc: "See whether equipment finance or leasing looks worth discussing for the planned project.", href: "/tools/finance-check" },
              { title: "Compare PA quotes", desc: "Separate equipment, coverage, cabling, commissioning and recurring costs before comparing totals.", href: "/guides/compare-pa-system-quotes" },
              { title: "Specification checklist", desc: "Give suppliers one consistent scope so their proposals are easier to compare.", href: "/guides/school-pa-specification-checklist" },
            ]}
          />
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
        headline: "School PA System Cost Australia: Pricing Guide & Calculator",
        description: "Australian school PA system cost guide with indicative installed ranges, cost drivers, architecture trade-offs, quote inclusions and a calculator for your own school.",
        url: `${site.url}/pricing`,
        datePublished: publishedDate("/pricing"),
        dateModified: reviewedDate("/pricing"),
        reviewedBy: { name: authors.shaun.name, role: authors.shaun.role, organisation: site.name },
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "SiteComms Australia", url: site.url },
        { name: "Pricing", url: `${site.url}/pricing` },
      ])) }} />
    </div>
  );
}
