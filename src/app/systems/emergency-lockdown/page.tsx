import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "School Emergency & Lockdown Systems",
  description:
    "Learn how school paging supports lockdown, evacuation and emergency messages, including coverage, zoning and intelligibility.",
  path: "/systems/emergency-lockdown",
});

export default function EmergencyLockdownPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="School Safety Communication Guide"
        title="Emergency, Lockdown & Safety Announcement Systems"
        description="A school emergency communication system needs to deliver clear, fast and intelligible messages to the right areas during lockdowns, evacuations and other incidents. This guide explains the role of paging, zoning, prerecorded messages, live announcements, outdoor coverage and system resilience."
        tags={["Lockdown announcements", "Emergency paging", "Evacuation messages", "Safety warnings", "Site-wide coverage"]}
        primaryCta={{ label: "Discuss the technical scope", href: "/contact" }}
        primaryCtaNode={
          <ProjectHelpLauncher
            mode="system_selection"
            sourceTopic="emergency_lockdown"
            buttonLabel="Discuss the technical scope"
            className="sc-btn-primary"
          />
        }
        secondaryCta={{ label: "View funding pathways", href: "/tools/funding-check" }}
        reviewed={reviewedLabel("/systems/emergency-lockdown")}
        note="Planning guidance, not procedure advice"
        breadcrumb={[{ name: "Systems", href: "/systems" }, { name: "Emergency & Lockdown Communication" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Lockdown, evacuation and urgent safety communication" },
          { label: "Best fit", value: "Schools needing reliable site-wide emergency messaging alongside normal paging" },
          { label: "Works with", value: "Paging platforms, bells, fixed speakers, outdoor horns and approved safety procedures" },
          { label: "Next step", value: "Review coverage gaps or investigate funding" },
        ]}
      />
      <div className="sc-container max-w-[1150px] pt-6">
        <p className="rounded-xl border border-[var(--sc-teal)] bg-[var(--sc-blue-50)] px-5 py-4 text-sm font-medium text-[var(--sc-slate)]">
          Paging and PA systems support emergency communication but do not replace required fire
          alarm systems, emergency procedures or specialist life-safety systems.
        </p>
      </div>
      <article className="sc-container max-w-[800px] py-8 sc-prose">
      <h2 id="why-paging">The role of paging in the emergency plan</h2>
      <p>
        Paging can deliver instructions without requiring each listener to have a phone or app. Its usefulness depends on audible coverage, accessibility, power, working activation paths and agreed procedures. Assess those dependencies rather than assuming an existing speaker system reaches everyone or works through every failure.
      </p>
      <h2 id="capabilities">Capabilities to specify and demonstrate</h2>
      <ul>
        <li>
          <strong>Pre-recorded messages.</strong> Calm, consistent, pre-scripted lockdown and
          evacuation announcements, recorded and tested in advance rather than improvised live.
        </li>
        <li>
          <strong>Distinct alert tones.</strong> Different signals for evacuation, lockdown and
          all-clear, so the response is unambiguous.
        </li>
        <li>
          <strong>Zone targeting.</strong> Instruct only the affected building to evacuate while
          others lock down, or page outdoor zones separately.
        </li>
        <li>
          <strong>Multiple activation points.</strong> Office console, designated handsets, wall
          buttons, and in some cases integration with access control or duress systems.
        </li>
        <li>
          <strong>Priority preemption.</strong> Emergency messages automatically override bells and
          routine paging.
        </li>
        <li>
          <strong>Live voice override.</strong> Authorised staff can speak live to all zones when a
          scripted message is not appropriate.
        </li>
      </ul>
      <p>
        Availability and behaviour vary by platform, configuration and installed design — see the{" "}
        <Link href="/systems/ip-paging-pa">IP paging architecture guide</Link> for the underlying
        model.
      </p>
      <p>
        Manufacturer documentation describes product functions, not approval of an emergency plan. See the
        <Link href="/compare/schools#sources"> comparison sources</Link> for model-specific references. An ordinary PA
        with an alert tone is not automatically a compliant voice-alarm or evacuation system; specialist design
        and the applicable project requirements must determine what is needed.
      </p>
      <h2 id="redundancy">Redundancy and failure modes to ask about</h2>
      <ul>
        <li>What happens to emergency paging if the network switch, server or NVR fails?</li>
        <li>If messages are stored locally, what working power and activation path is still required to play them during a failure?</li>
        <li>Is there battery backup for at least the core endpoints, and for how long?</li>
        <li>Can the system be activated from more than one physical location?</li>
        <li>How is a failed or offline endpoint reported so it is fixed before it matters?</li>
      </ul>
      <p>
        Reliability questions like these are a good differentiator between proposals that look
        otherwise similar on price.
      </p>
      <h2 id="vs-other-channels">How paging fits with other emergency channels</h2>
      <p>
        Paging is one possible channel for immediate instructions. It complements — not replaces —
        text/email notification systems for parents, and duress alarms that alert police or
        security monitoring. The school’s emergency-management team should define the appropriate combination of channels and fallback arrangements. When specifying,
        ask whether the paging platform can be triggered by or integrated with your existing
        security and notification systems.
      </p>
      <h2 id="specifying">What to specify</h2>
      <p>
        Include emergency capability explicitly in your scope: which messages are pre-recorded, how
        many activation points exist and where, what tones mean what, what redundancy is included,
        and how staff training and testing are handled at handover. The{" "}
        <Link href="/guides/school-pa-specification-checklist">school PA specification checklist</Link>{" "}
        includes an emergency section so quotes can be compared like-for-like.
      </p>
      <h2 id="cost-funding">Costs and funding</h2>
      <p>
        Emergency features range from included platform features to significant uplifts when
        redundancy, dedicated hardware and integration are added. Use the{" "}
        <Link href="/pricing-tool">ballpark calculator</Link> to see how emergency functionality
        affects indicative cost, and the <Link href="/tools/funding-check">funding pathways page</Link> to
        review the current guidance for school-sector and jurisdiction-specific capital pathways.
      </p>
      <h2 id="more">Related resources</h2>
      <ul>
        <li><Link href="/systems/school-bell-announcements">School bells and announcements</Link></li>
        <li><Link href="/systems/ip-intercom">IP intercom and two-way paging</Link></li>
        <li><Link href="/guides/school-pa-paging-requirements">Australian school PA and paging requirements</Link></li>
      </ul>
      <ContinuePlanning
        items={[
          { title: "Australian school PA requirements", desc: "Project-owner, scope, cabling and approval questions for Australian school communications.", href: "/guides/school-pa-paging-requirements" },
          { title: "School systems overview", desc: "Features, indicative costs and upgrade decisions for school communications.", href: "/schools" },
          { title: "Funding pathways and conditions", desc: "Separate safety objectives, project approval and funding eligibility.", href: "/tools/funding-check" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewedLabel("/systems/emergency-lockdown")}. System-planning information only — not emergency procedure advice.
        Follow your school&apos;s emergency management plan and guidance from the relevant state or territory education authority and emergency services.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "Emergency & Lockdown Communication Systems for Australian Schools",
              description:
                "Planning guidance for school emergency paging, lockdown and evacuation communication in Australia: capabilities, activation methods, redundancy and specification.",
              url: `${site.url}/systems/emergency-lockdown`,
              datePublished: publishedDate("/systems/emergency-lockdown"),
              dateModified: reviewedDate("/systems/emergency-lockdown"),
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
              { name: "Emergency & Lockdown Communication", url: `${site.url}/systems/emergency-lockdown` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
