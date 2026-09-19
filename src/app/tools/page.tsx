import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Australian PA, Paging and Project Planning Tools",
  description:
    "Free SiteComms tools: get a ballpark installed system price, prepare a funding enquiry, or explore finance and leasing.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="sc-container max-w-4xl py-16">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">SiteComms tools</h1>
      <p className="mt-4 max-w-3xl text-lg text-[var(--sc-slate)]">
        Planning tools for the questions that often stop a communications project early: what might it cost, what information a funding enquiry needs, and is finance or leasing worth exploring?
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="sc-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">30-60 seconds</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">Ballpark Cost Calculator</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Describe the site, areas to cover and desired capability level to get an indicative installed range. No technical design knowledge is required.
          </p>
          <Link href="/pricing-tool" className="sc-btn-primary mt-5">Get a ballpark price</Link>
        </div>

        <div className="sc-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Schools, aged care and other sites</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">Funding Preparation & Research Status</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Identify the project state, applicant and scope. Detailed funding matching is not live yet; this page explains what to prepare and what still needs research.
          </p>
          <Link href="/tools/funding-check" className="sc-btn-primary mt-5">Prepare a funding enquiry</Link>
        </div>

        <div className="sc-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">About a minute</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">Finance & Leasing Check</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Tell us who the project is for, the rough value and what sort of regular payment feels manageable. This is a planning-readiness check, not a lender, affordability or state borrowing-rules assessment.
          </p>
          <Link href="/tools/finance-check" className="sc-btn-primary mt-5">Prepare a finance discussion</Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-[var(--sc-slate)]">Choose or change your project state in the header, or use the <Link href="/states" className="font-semibold text-[var(--sc-blue-700)] underline">state planning guide</Link>. Prices are not automatically adjusted by state.</p>
      <div className="mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
        <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">The tools work together</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
          Start wherever the project is clearest: estimate the likely cost, prepare the applicant and funding questions, or explore finance and leasing. Pricing and finance tools are indicative; funding guidance is being rebuilt against current Australian sources.
        </p>
      </div>
    </div>
  );
}
