import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Paging, PA & School Funding Tools Australia",
  description:
    "Free SiteComms tools: get a ballpark installed system price, review school funding pathway guidance, or explore finance and leasing.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="sc-container max-w-4xl py-16">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">SiteComms tools</h1>
      <p className="mt-4 max-w-3xl text-lg text-[var(--sc-slate)]">
        Planning tools for the questions that often stop a communications project early: what might it cost, which school funding pathways are relevant, and is finance or leasing worth exploring?
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
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Australian schools</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">School Communications Funding Pathways</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Review the status of SiteComms Australian school funding guidance and the factors that will determine the relevant pathway.
          </p>
          <Link href="/tools/funding-check" className="sc-btn-primary mt-5">View funding pathways</Link>
        </div>

        <div className="sc-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">About a minute</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">Finance & Leasing Check</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Tell us who the project is for, the rough value and what sort of regular payment feels manageable. Get a practical starting point without completing a finance application.
          </p>
          <Link href="/tools/finance-check" className="sc-btn-primary mt-5">Check finance options</Link>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
        <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">The tools work together</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
          Start wherever the project is clearest: estimate the likely cost, review school funding pathways, or explore finance and leasing. Pricing and finance tools are indicative; funding guidance is being rebuilt against current Australian sources.
        </p>
      </div>
    </div>
  );
}
