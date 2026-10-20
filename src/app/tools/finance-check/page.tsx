import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { FinanceCheckTool } from "./FinanceCheckTool";

export const metadata: Metadata = buildMetadata({
  title: "Equipment Finance & Leasing Check Australia",
  description:
    "Quick Australian finance check for paging, PA, bell, intercom and communications systems. See whether equipment finance or leasing is worth discussing and what to do next.",
  path: "/tools/finance-check",
});

export default function FinanceCheckPage() {
  return (
    <main className="sc-container max-w-3xl py-12">
      <header className="mb-9">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Australia equipment finance</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] sm:text-4xl">
          Is finance or leasing worth exploring for your communications project?
        </h1>
        <p className="mt-3 text-[var(--sc-slate)]">
          Answer four short steps about the project, organisation and budget. The checker gives a preliminary finance-fit result and shows the Australian evidence behind that guidance.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[var(--sc-slate)]">
          No contact details are required. This is not a finance application, credit assessment or approval. <Link href="/financing" className="underline">Read how equipment finance and leasing can work</Link>.
        </p>
      </header>
      <Suspense fallback={<div className="sc-card p-6 text-sm text-[var(--sc-slate)]">Loading finance checker…</div>}>
        <FinanceCheckTool />
      </Suspense>
    </main>
  );
}
