import { site } from "../site";
import { CONTENT_META } from "../content-meta";

/** The existing human directory is the authority for navigation descriptions.
 * Search returns these same public records, not a second article store.
 */
export const PUBLIC_GUIDES = [
  { title: "Compare Australian PA and intercom quotes", desc: "A scope-by-scope worksheet for coverage, installation, licensing, support and handover.", href: "/guides/compare-pa-system-quotes" },
  { title: "Plan by Australian state or territory", desc: "Save the project location, identify the approval owner and find official education starting points.", href: "/states" },
  {
    title: "Aged Care & Retirement Village PA/Intercom Guide",
    desc: "PA, paging, entrance intercom and staff communication for Australian aged care homes and retirement villages, with use-case shortlists and indicative costs.",
    href: "/industries/aged-care-retirement-villages",
  },
  {
    title: "Australian School PA & Paging Requirements",
    desc: "Identify the project owner, state and sector, required workflows, cabling scope, evidence and acceptance tests.",
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
    title: "Funding preparation: schools, aged care and other sites",
    desc: "Prepare the applicant and project scope; state-specific funding matching is not live yet.",
    href: "/tools/funding-check",
  },
];
export function publicGuideRecords() {
  return PUBLIC_GUIDES.map((record) => ({
    id: record.href.slice(1).replaceAll("/", ":"),
    ...record,
    canonical_url: `${site.url.replace(/\/$/, "")}${record.href}`,
    reviewed_at: CONTENT_META[record.href]?.reviewed ?? null,
    source_id: `page:${record.href}`,
  }));
}
