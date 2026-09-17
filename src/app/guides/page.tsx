import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guides: IP Paging, PA, Bells & Funding Australia",
  description:
    "Practical Australian guides to paging system architecture, replacing old PA systems, installed pricing and school communications funding pathways.",
  path: "/guides",
});

const GUIDES = [
  {
    title: "Aged Care & Retirement Village PA/Intercom Guide",
    desc: "PA, paging, entrance intercom and staff communication for Australian aged care homes and retirement villages, with use-case shortlists and indicative costs.",
    href: "/industries/aged-care-retirement-villages",
  },
  {
    title: "Australian School PA & Paging Requirements",
    desc: "What education authority design, cabling, funding and procurement guidance means for school PA, bells, intercom and emergency communications.",
    href: "/guides/school-pa-paging-requirements",
  },
  {
    title: "IP Paging Network Readiness Checklist",
    desc: "PoE budget, VLANs, QoS, cabling state and support responsibility — check these before asking for IP paging quotes.",
    href: "/guides/ip-paging-network-readiness",
  },
  {
    title: "School PA Specification Checklist",
    desc: "A pre-procurement checklist so every PA, bell or intercom quote you receive covers the same scope and compares fairly.",
    href: "/guides/school-pa-specification-checklist",
  },
  {
    title: "IP Paging & PA Systems: 2026 Buyer’s Guide",
    desc: "Compare integrated school platforms, SIP-first options, browser-managed audio, hybrid approaches and specialist architectures for Australian buyers.",
    href: "/compare",
  },
  {
    title: "School PA, Paging, Bell & Intercom Systems",
    desc: "A single guide to school communication features, indicative costs, upgrade decisions and potential school funding.",
    href: "/schools",
  },
  {
    title: "Traditional, IP and Hybrid Paging Systems",
    desc: "Understand the three common architectures and where each approach makes sense.",
    href: "/systems",
  },
  {
    title: "Replacing an Old PA System",
    desc: "What may be reusable, what usually changes and how to plan the replacement.",
    href: "/systems/traditional-vs-ip",
  },
  {
    title: "What Do Paging and Intercom Systems Cost?",
    desc: "Indicative Australian installed ranges, the main cost drivers and a calculator for your own site.",
    href: "/pricing",
  },
  {
    title: "School Funding for Australian School Communications",
    desc: "Current SiteComms guidance status for Australian school communications funding pathways.",
    href: "/tools/funding-check",
  },
];

export default function GuidesPage() {
  return (
    <div className="sc-container max-w-4xl py-16">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Practical guides</h1>
      <p className="mt-4 max-w-3xl text-lg text-[var(--sc-slate)]">
        Plain-language resources for planning, pricing and reviewing paging, PA, bell, intercom and emergency communication systems in Australia.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <Link key={guide.href} href={guide.href} className="sc-card group p-6">
            <h2 className="font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">
              {guide.title} <span aria-hidden>→</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--sc-slate)]">{guide.desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/pricing-tool" className="sc-btn-primary">Get a ballpark price</Link>
        <Link href="/tools/funding-check" className="sc-btn-secondary">View funding pathways</Link>
      </div>
    </div>
  );
}
