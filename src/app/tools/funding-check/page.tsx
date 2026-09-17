import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { FundingCheckTool } from "./FundingCheckTool";

export const metadata: Metadata = buildMetadata({
  title: "Australian School Communications Funding Check",
  description:
    "Free Australian school funding check: see which parts of a paging, PA, bell, intercom or communications project may have a school funding pathway.",
  path: "/tools/funding-check",
});

export default function FundingCheckPage() {
  return (
    <div className="sc-container max-w-3xl py-12">
      <div className="mb-9">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Australian state schools</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] sm:text-4xl">School communications funding check</h1>
        <p className="mt-3 text-[var(--sc-slate)]">
          Answer a few simple questions to see whether parts of a proposed paging, PA, bell, intercom or communications project appear worth investigating through their education authority&#39;s school funding pathway.
        </p>
        <p className="mt-2 text-xs text-[var(--sc-slate)]">
          Indicative only. This tool does not approve funding. <Link href="/tools/funding-check" className="underline">Read how the funding pathway works</Link>.
        </p>
      </div>
      <Suspense fallback={<div className="sc-card p-6 text-sm text-[var(--sc-slate)]">Loading funding checker…</div>}>
        <FundingCheckTool />
      </Suspense>
    </div>
  );
}
