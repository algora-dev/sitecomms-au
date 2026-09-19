import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ProjectStatePanel } from "@/components/project-state";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
export const metadata = buildMetadata({ title: "Australian Communications Funding: Planning and Research Status", description: "Prepare a communications project brief for schools, aged care and other organisations. State-specific funding matching is being researched, not yet live.", path: "/tools/funding-check" });
export default function FundingCheckPage() {
  return <div className="sc-container max-w-3xl py-14">
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Australian project funding</p>
    <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] sm:text-4xl">Prepare the project before checking a funding pathway</h1>
    <div className="sc-card mt-6 bg-white p-6">
      <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">State-specific funding matching is not live yet</h2>
      <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">This page does not currently assess grants, eligibility, open rounds or approval. The planned tool will distinguish state/territory, entity type and project scope using reviewed official sources. Selecting a location below only saves project context.</p>
      <ProjectStatePanel purpose="funding" />
      <h2 className="mt-6 text-xl font-semibold text-[var(--sc-blue-900)]">Useful information to gather now</h2>
      <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">Record the site location, legal applicant, property owner, organisation type, existing system, required outcomes, rough budget and proposed timing. For schools, distinguish government, Catholic and independent. For care sites, distinguish a residential aged care provider from a retirement-village operator. For community facilities, identify the owner and the organisation seeking funds.</p>
      <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">A grant, an internal capital allocation, permission to undertake works and equipment finance are different routes. A communications project is not automatically eligible because it improves safety or involves fixed equipment. Do not incur expenditure on the assumption that it will later be reimbursed.</p>
      <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">SiteComms can review the technical requirement and suggest suitable providers to contact. It cannot approve funding or promise that a provider will secure it. Your enquiry is not automatically forwarded.</p>
      <div className="mt-6 flex flex-wrap gap-3"><ProjectHelpLauncher mode="funding_help" sourceTopic="funding_preparation" buttonLabel="Discuss the scope and budget" /><Link href="/pricing-tool" className="sc-btn-secondary">Estimate the modelled system</Link></div>
    </div>
    <p className="mt-6 text-sm text-[var(--sc-slate)]">See the <Link href="/states" className="font-semibold underline">state planning directory</Link> and <Link href="/guides/compare-pa-system-quotes" className="font-semibold underline">quote comparison guide</Link>. Detailed funding research is the next separate work phase.</p>
  </div>;
}
