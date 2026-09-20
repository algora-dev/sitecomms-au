import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "IP Paging Network Readiness Guide",
  description:
    "Check cabling, PoE, switching, fibre, multicast, SIP and resilience before deploying an IP paging system.",
  path: "/guides/ip-paging-network-readiness",
});

const CHECKS = [
  {
    "title": "Switch ports, buildings and links",
    "items": [
      "Map proposed endpoints to switch locations and identify missing ports or inter-building links.",
      "Check the exact manufacturer port-speed, topology and cabling requirements, rather than assuming all IP devices are interchangeable.",
      "Record which network components are retained, upgraded or supplied by someone outside the paging quote."
    ]
  },
  {
    "title": "Power over Ethernet and backup power",
    "items": [
      "Check the proposed model’s PoE class and maximum demand against both per-port limits and the switch’s total power budget.",
      "Include other powered devices, startup behaviour, intended audio output and planned additions in the assessment; do not use one generic wattage for every speaker.",
      "Ask which switches, controllers, amplifiers and endpoints need backed-up power, how long the design will operate and how that will be tested."
    ]
  },
  {
    "title": "Addressing, VLANs and access",
    "items": [
      "Agree VLANs, DHCP reservations or static addressing with the network owner and document the chosen design.",
      "Confirm administration access, DNS and time-server access, firewall rules and permitted remote-support methods.",
      "Separate the operator role from administrator access; record who owns accounts, configuration backups and firmware maintenance."
    ]
  },
  {
    "title": "Multicast, SIP and competing traffic",
    "items": [
      "Ask the integrator to document multicast groups, IGMP requirements and any routing between subnets for the chosen platform.",
      "Where phones initiate pages, confirm SIP registration, licensing, codecs and behaviour if the phone service is unavailable.",
      "Agree traffic prioritisation with the IT team and test paging under realistic network load. A QoS setting alone is not a resilience guarantee."
    ]
  },
  {
    "title": "Existing and new cabling",
    "items": [
      "Inspect and test retained cabling; identify unsuitable routes, damaged runs, terminations and links beyond the selected cabling design’s limits.",
      "Confirm suitable outdoor and inter-building protection, access equipment and any building-work approvals with the relevant specialists.",
      "Identify who is responsible for communications cabling, test records and handover documentation. Do not assume cabling is included in endpoint installation allowances."
    ]
  },
  {
    "title": "Timetables, time zones and calendar ownership",
    "items": [
      "Set the project’s actual local time zone and a suitable time source; test time recovery after a reboot or network interruption.",
      "Demonstrate ordinary days, alternate timetables, term breaks, local holidays and any applicable daylight-saving changes.",
      "Assign a staff member to maintain calendar exceptions. A scheduler is not evidence of automatic Australian school-calendar updates."
    ]
  },
  {
    "title": "Failures, recovery and coverage",
    "items": [
      "Test loss of WAN, a switch, a controller, a phone service and local power separately. Record which workflows still function in each case.",
      "Local audio storage does not by itself provide power, a working activation path or continued network delivery.",
      "Define fault reporting, escalation and periodic testing. If wireless links are proposed, require an engineered design and demonstrate performance under the agreed failure scenarios."
    ]
  },
  {
    "title": "Responsibility and acceptance",
    "items": [
      "Name the network owner, paging integrator, cabler and day-to-day support contact, with clear boundaries between their responsibilities.",
      "Include a practical test of live paging, scheduled audio, zone selection, authorised overrides and restore from backup.",
      "Keep a network diagram, endpoint inventory, configuration backup and support record with the site owner."
    ]
  }
];

export default function NetworkReadinessPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="IT & Network Planning Guide"
        title="Is Your Network Ready for IP Paging?"
        description="IP paging systems rely on the site's data network. Establish what can be reused and what needs upgrading before agreeing a project budget. This guide helps schools and IT teams assess cabling, PoE capacity, switch ports, fibre links, multicast, SIP, VLANs, time synchronisation, resilience and remote management before the paging design is finalised."
        tags={["Cat6 cabling", "PoE", "Network switches", "SIP", "Multicast", "VLANs"]}
        primaryCta={{ label: "Estimate an IP paging system", href: "/pricing-tool" }}
        secondaryCta={{ label: "Read the IP paging guide", href: "/systems/ip-paging-pa" }}
        reviewed={reviewedLabel("/guides/ip-paging-network-readiness")}
        note="For school IT teams and MSPs"
        breadcrumb={[{ name: "Guides", href: "/guides" }, { name: "IP Paging Network Readiness" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Checking whether existing network infrastructure can support an IP paging rollout" },
          { label: "Best fit", value: "School IT teams, MSPs, network providers and project consultants" },
          { label: "Check first", value: "Cabling, PoE, switch capacity, inter-building links and network design" },
          { label: "Next step", value: "Identify gaps before requesting a final system quote" },
        ]}
      />
      <article className="sc-container max-w-[800px] py-8 sc-prose">
      {CHECKS.map((section) => (
        <section key={section.title} className="sc-card p-6 not-prose">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">{section.title}</h2>
          <ul className="mt-3 space-y-1 text-[var(--sc-slate)] list-disc pl-5">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      <h2 id="why-cost">Why this changes cost</h2>
      <p>
        Network readiness is one of the main cost drivers between otherwise similar quotes. Even a network-ready site needs design, configuration and testing; an unready site may also need switch upgrades, cabling and inter-building links. Our <Link href="/pricing">pricing guide</Link> reflects this split, and
        the <Link href="/pricing-tool">ballpark calculator</Link> asks about it directly.
      </p>
      <h2 id="sources">Technical and Australian cabling references</h2>
      <p>
        Apply the documentation for the exact selected products. Examples include the{' '}
        <a href="https://docs.algosolutions.com/docs/8301-user-guide" target="_blank" rel="noopener noreferrer">Algo 8301 guide</a>{' '}
        for one SIP/multicast adapter and the{' '}
        <a href="https://help.axis.com/en-us/axis-audio-manager-edge" target="_blank" rel="noopener noreferrer">Axis Audio Manager Edge manual</a>{' '}
        for its network-audio environment; neither is a universal design standard. For Australian phone and data wiring,
        ACMA explains the role of a{' '}
        <a href="https://www.acma.gov.au/cabling-your-home-or-office" target="_blank" rel="noopener noreferrer">registered cabler</a>.
        Confirm the registration, scope and documentation applicable to the work with the cabling professional.
      </p>
      <h2 id="funding">Funding note for schools</h2>
      <p>
        Cabling and switch work tied to a paging upgrade may form part of the same property or capital project as the paging system itself. The applicable pathway varies by school sector and jurisdiction. See the{" "}
        <Link href="/tools/funding-check">funding pathways page</Link> for researched state and national pathways with official sources and clear limitations.
      </p>
      <h2 id="after">After the checklist</h2>
      <p>
        Once you know the network position, write the full project scope with the{" "}
        <Link href="/guides/school-pa-specification-checklist">specification checklist</Link> so
        every quote you receive covers the same work. Project-owner and approval questions are in the{" "}
        <Link href="/guides/school-pa-paging-requirements">requirements guide</Link>.
      </p>
      <ContinuePlanning
        items={[
          { title: "IP paging architecture guide", desc: "How Audio over IP, PoE endpoints and zoning actually work.", href: "/systems/ip-paging-pa" },
          { title: "Compare paging platforms", desc: "Which platforms fit which networks, budgets and support models.", href: "/compare" },
          { title: "School systems overview", desc: "Features, indicative costs and upgrade decisions for schools.", href: "/schools" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewedLabel("/guides/ip-paging-network-readiness")}. General guidance — always confirm specifics with your network
        administrator and installer.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "IP Paging Network Readiness Checklist (Australian Schools & Sites)",
              description:
                "What to check before specifying an IP paging system: PoE budget, VLANs, QoS, switch capacity, cabling state and support responsibility.",
              url: `${site.url}/guides/ip-paging-network-readiness`,
              datePublished: publishedDate("/guides/ip-paging-network-readiness"),
              dateModified: reviewedDate("/guides/ip-paging-network-readiness"),
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
              { name: "Guides", url: `${site.url}/guides` },
              { name: "IP Paging Network Readiness Checklist", url: `${site.url}/guides/ip-paging-network-readiness` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
