import type { Metadata } from "next";
import Link from "next/link";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";

export const metadata: Metadata = buildMetadata({
  title: "IP Paging & Network PA Systems",
  description:
    "Learn how IP paging and network PA systems work, what infrastructure they need, and when full-IP or hybrid designs make sense.",
  path: "/systems/ip-paging-pa",
});

export default function IpPagingPaPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="IP Paging & PA System Guide"
        title="IP Paging & Network PA Systems"
        description="Modern IP paging systems use the data network to deliver live announcements, scheduled messages, emergency audio and zoned communication across classrooms, offices, warehouses and multi-building sites. This guide explains how the architecture works, when full-IP or hybrid systems make sense, and what to consider before specifying one."
        tags={["IP paging", "Network PA", "PoE speakers", "Zoned announcements", "Hybrid systems"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Compare paging platforms", href: "/compare" }}
        reviewed={reviewedLabel("/systems/ip-paging-pa")}
        note="Australian-focused guidance"
        breadcrumb={[{ name: "Systems", href: "/systems" }, { name: "IP Paging & Network PA" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Site-wide paging, scheduled announcements and emergency communication" },
          { label: "Best fit", value: "Schools, commercial sites and distributed facilities using modern network infrastructure" },
          { label: "Works with", value: "IP speakers, SIP devices, existing 100V systems and hybrid architectures" },
          { label: "Next step", value: "Estimate a system or compare platform options" },
        ]}
      />
      <article className="sc-container max-w-[800px] py-8 sc-prose">
      <h2 id="what-is">What &quot;Audio over IP&quot; actually means</h2>
      <p>
        In a traditional PA system, audio travels as an analogue signal from a microphone or source
        through a central amplifier, then out over 100-volt speaker lines to every speaker. In an IP
        paging system, the audio is converted to digital packets at the source and sent over the
        same network that carries your computers, printers and phones. Each endpoint decodes the
        packets and plays the audio locally.
      </p>
      <p>
        The practical benefit is flexible addressing where the chosen platform supports it. Confirm which endpoints can be grouped, which authorised phones or consoles can initiate a page, and what extra configuration or licensing is required. Speakers retained on one analogue circuit generally remain a shared audio zone rather than becoming individually addressable.
      </p>
      <h2 id="poe">Power over Ethernet (PoE) endpoints</h2>
      <p>
        Many IP speakers and intercoms support Power over Ethernet: the network cable carries data and power. Check the specific endpoint’s PoE requirements and any separate amplifier or supply. This is not a reason to omit cabling, electrical or backup-power work from the project scope.
      </p>
      <p>
        The trade-off is that your network switches must supply enough PoE power for every connected
        endpoint. Existing switches may need upgrading or extending, depending on the design and available capacity. Our{" "}
        <Link href="/guides/ip-paging-network-readiness">network readiness checklist</Link> covers
        what to check before specifying an IP system.
      </p>
      <h2 id="zoning">Zoning, scheduling and per-endpoint control</h2>
      <ul>
        <li>
          <strong>Zones are software-defined.</strong> A &quot;zone&quot; can be one classroom, one
          building, or the whole site where the platform and network design allow. Retained analogue circuits limit how finely those speakers can be separated.
        </li>
        <li>
          <strong>Calendars and schedules.</strong> Bell schedules, period changes and pre-recorded
          messages can follow configured timetables. Demonstrate local time settings, term breaks and holiday exceptions; do not assume calendars update themselves.
        </li>
        <li>
          <strong>Per-endpoint volume and prioritisation.</strong> Check volume control and message priority for each device or shared circuit. Require a demonstration of configured priority overrides.
        </li>
        <li>
          <strong>Remote management.</strong> Some platforms expose status, firmware and configuration through a web interface. Confirm permissions and monitoring coverage; remote tools do not remove the need for on-site inspection and maintenance.
        </li>
      </ul>
      <p>
        For schools, these capabilities map directly onto bell and announcement requirements — see
        our <Link href="/systems/school-bell-announcements">school bells and announcements guide</Link>.
      </p>
      <h2 id="emergency">Emergency and lockdown capability</h2>
      <p>
        Because messages are digital, IP platforms can store pre-recorded emergency announcements,
        trigger them from multiple points, and target specific zones. Many platforms integrate with
        existing security systems or provide dedicated lockdown buttons. Planning guidance is in our{" "}
        <Link href="/systems/emergency-lockdown">emergency and lockdown communication guide</Link>.
      </p>
      <h2 id="intercom">Two-way communication and intercom</h2>
      <p>
        IP intercom endpoints add two-way audio, so classrooms or gates can talk back to the office.
        Many schools use a mix of one-way speakers and two-way intercom units. See the{" "}
        <Link href="/systems/ip-intercom">IP intercom guide</Link> for how two-way paging works and
        what it adds to a deployment.
      </p>
      <h2 id="vs-traditional">IP vs traditional vs hybrid</h2>
      <p>
        Full-IP, traditional 100V and hybrid systems suit different scopes. A hybrid can retain serviceable amplifiers, speakers or circuits while adding network control, but the retained equipment’s condition and zoning still matter. Compare the complete installed scope rather than assuming one architecture is always cheaper. The{" "}
        <Link href="/systems">architecture comparison</Link> covers the trade-offs, and{" "}
        <Link href="/systems/traditional-vs-ip">what to keep when replacing an old PA</Link> deals
        specifically with reuse.
      </p>
      <h2 id="cost">What IP paging tends to cost</h2>
      <p>
        Endpoint count, indoor/outdoor mix, cabling state and network readiness are the main cost
        drivers. Indicative Australian installed ranges and a calculator for your own site are on the{" "}
        <Link href="/pricing">pricing page</Link>.
      </p>
      <h2 id="platforms">Choosing a platform</h2>
      <p>
        SiteComms compares integrated school platforms, SIP-first options, browser-managed network audio, hybrid
        approaches from FrontRow, Algo, Axis, Bosch PROSPERO, Bodet, TOA and Australian traditional/hybrid designs, with specialist and unverified-supply options clearly separated. Our{" "}
        <Link href="/compare">platform comparison guide</Link> matches those options to your priorities for
        Australian buyers. Planning for an aged care home or retirement village?{" "}
        <Link href="/industries/aged-care-retirement-villages">Use the aged-care comparison</Link>, where
        the requirements and shortlist differ.
      </p>
      <h2 id="evidence">Check capabilities against the selected design</h2>
      <p>
        Our <Link href="/compare#sources">comparison source register</Link> separates manufacturer documentation
        from evidence of Australian supply. A brand page is not confirmation that every model, integration or service
        is available for your site. Use the <Link href="/guides/compare-pa-system-quotes">quote comparison guide</Link>
        to request a defined scope and acceptance tests.
      </p>
      <h2 id="next">Next steps</h2>
      <ul>
        <li>
          Check your network against the{" "}
          <Link href="/guides/ip-paging-network-readiness">network readiness checklist</Link>
        </li>
        <li>
          Write your scope with the{" "}
          <Link href="/guides/school-pa-specification-checklist">specification checklist</Link>
        </li>
        <li>
          Get an indicative cost with the <Link href="/pricing-tool">ballpark calculator</Link>, or{" "}
          <Link href="/tools/funding-check">check researched funding routes</Link>
        </li>
      </ul>
      <ContinuePlanning
        items={[
          { title: "Compare paging platforms", desc: "Use-case shortlists for integrated school platforms, SIP-first paging, hybrid migration and specialist architectures.", href: "/compare" },
          { title: "Network readiness checklist", desc: "Check cabling, PoE and switch capacity before requesting IP paging quotes.", href: "/guides/ip-paging-network-readiness" },
          { title: "Replacing an old PA system", desc: "What can be kept, what usually changes and how to plan the replacement.", href: "/systems/traditional-vs-ip" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewedLabel("/systems/ip-paging-pa")}. General information only — not design or compliance advice for any
        specific site.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "IP Paging & Network PA Systems",
              description:
                "A plain-language explanation of IP paging and network PA systems for Australian sites: Audio over IP, PoE endpoints, zoning, scheduling and architecture trade-offs.",
              url: `${site.url}/systems/ip-paging-pa`,
              datePublished: publishedDate("/systems/ip-paging-pa"),
              dateModified: reviewedDate("/systems/ip-paging-pa"),
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
              { name: "IP Paging & Network PA", url: `${site.url}/systems/ip-paging-pa` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
