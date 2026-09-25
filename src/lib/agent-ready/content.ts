import { site } from "../site";
import { CONTENT_META } from "../content-meta";

/** The existing human directory is the authority for navigation descriptions.
 * Search returns these same public records, not a second article store.
 */
export const PUBLIC_GUIDES = [
  { title: "Australian communications funding guide", desc: "Understand grants, school capital approvals, targeted aged care, community projects and repayable loans.", href: "/funding" },
  { title: "Queensland communications funding routes", desc: "Research QLD school, early-learning, community and national aged-care pathways with source evidence and current-status limitations.", href: "/funding/queensland" },
  { title: "New South Wales communications funding routes", desc: "Research NSW school, early-learning, community and national aged-care pathways with source evidence and current-status limitations.", href: "/funding/new-south-wales" },
  { title: "Victoria communications funding routes", desc: "Research VIC school, early-learning, community and national aged-care pathways with source evidence and current-status limitations.", href: "/funding/victoria" },
  { title: "Western Australia communications funding routes", desc: "Research WA school, early-learning, community and national aged-care pathways with source evidence and current-status limitations.", href: "/funding/western-australia" },
  { title: "South Australia communications funding routes", desc: "Research SA school, early-learning, community and national aged-care pathways with source evidence and current-status limitations.", href: "/funding/south-australia" },

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
    title: "Compare School PA, Bell & Intercom Systems in Australia",
    desc: "Compare SPON, FrontRow, Algo, Axis, Bosch, Bodet, TOA and hybrid school systems, with feature, value and Australian support evidence.",
    href: "/compare/schools",
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
    title: "Australian funding pathway checker",
    desc: "Find researched state and national pathways by legal applicant and project scope, with dates, official sources and clear limits.",
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
