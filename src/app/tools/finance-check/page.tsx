import { ProjectStatePanel } from "@/components/project-state";
import type { Metadata } from "next";
import { Suspense } from "react";
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
    <div className="sc-container max-w-3xl py-12">
      {/* The introduction is rendered by FinanceCheckTool only while the
          questionnaire is active, so the completed result is the first
          content on the page. */}
      <ProjectStatePanel purpose="finance" />
      <Suspense fallback={<div className="sc-card p-6 text-sm text-[var(--sc-slate)]">Loading finance checker…</div>}>
        <FinanceCheckTool />
      </Suspense>
    </div>
  );
}
