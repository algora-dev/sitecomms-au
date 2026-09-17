import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Australian School Communications Funding Pathways",
  description:
    "Australian school communications funding guidance is being rebuilt around current state, territory and non-government pathways.",
  path: "/tools/funding-check",
});

export default function FundingCheckPage() {
  return (
    <div className="sc-container max-w-3xl py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Australian schools</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] sm:text-4xl">School communications funding pathways</h1>
      <div className="sc-card mt-6 bg-white p-6">
        <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Australian funding guidance is being rebuilt</h2>
        <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">
          SiteComms is rebuilding this guidance around current Australian pathways. The replacement will distinguish government and non-government schools and use current state, territory and Commonwealth sources before presenting any project-specific guidance.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">
          Funding eligibility depends on the school sector, jurisdiction, project scope and the current program rules. A paging, bell or intercom project is not automatically eligible simply because it is fixed infrastructure.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pricing-tool" className="sc-btn-primary">Estimate project cost</Link>
          <Link href="/schools" className="sc-btn-secondary">Back to school planning</Link>
        </div>
      </div>
    </div>
  );
}
