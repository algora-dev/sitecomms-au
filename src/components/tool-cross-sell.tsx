"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import {
  buildIndustryToolHref,
  type IndustryContext,
} from "@/lib/industry-context";

type Variant = "pricing-to-funding" | "funding-to-pricing";

function queryString(params: Record<string, string | number | undefined>): string {
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") q.set(key, String(value));
  }
  const rendered = q.toString();
  return rendered ? `?${rendered}` : "";
}

export function ToolCrossSell({
  variant,
  estimateLow,
  estimateHigh,
  fundingResult,
  financePrimary = false,
  industry,
}: {
  variant: Variant;
  estimateLow?: number;
  estimateHigh?: number;
  fundingResult?: string;
  financePrimary?: boolean;
  industry?: IndustryContext;
}) {
  if (variant === "pricing-to-funding") {
    const fundingHref = industry === "aged-care"
      ? "/tools/funding-check?source=aged-care"
      : "/tools/funding-check?source=pricing";
    const financeHref = industry === "aged-care"
      ? buildIndustryToolHref("/tools/finance-check", {
          industry,
          source: "pricing",
          estimate: estimateLow && estimateHigh ? { low: estimateLow, high: estimateHigh } : undefined,
        })
      : `/tools/finance-check${queryString({
          source: "pricing",
          estimateLow: Math.round(estimateLow ?? 0) || undefined,
          estimateHigh: Math.round(estimateHigh ?? 0) || undefined,
        })}`;

    return (
      <details className="mt-7 rounded-xl border border-[var(--sc-border)] bg-white p-5">
        <summary className="cursor-pointer text-sm font-semibold text-[var(--sc-blue-900)]">
          Not ready for provider help? Explore funding or finance
        </summary>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
          {industry === "aged-care"
            ? "You can check researched funding routes for relevant care projects or explore equipment finance and leasing. These are separate planning paths and do not change this estimate."
            : "You can check researched funding routes or explore equipment finance and leasing. These are separate planning paths and do not change this estimate."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={fundingHref}
            className="sc-btn-secondary"
            onClick={() => track("pricing_to_funding_clicked", industry ? { industry } : undefined)}
          >
            Check funding pathways
          </Link>
          <Link
            href={financeHref}
            className="sc-btn-secondary"
            onClick={() => track("pricing_to_finance_clicked", industry ? { industry } : undefined)}
          >
            Explore finance / leasing
          </Link>
          {industry === "aged-care" ? (
            <Link
              href={buildIndustryToolHref("/financing", { industry })}
              className="text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2 self-center"
              onClick={() => track("pricing_to_finance_guide_clicked", { industry })}
            >
              Read the finance guide
            </Link>
          ) : null}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--sc-slate)]">
          A carried pricing estimate can prefill the finance checker. Funding eligibility is assessed separately from the estimate value.
        </p>
      </details>
    );
  }

  const financeHref = `/tools/finance-check${queryString({
    source: "funding",
    fundingResult,
    estimateLow: Math.round(estimateLow ?? 0) || undefined,
    estimateHigh: Math.round(estimateHigh ?? 0) || undefined,
  })}`;
  const pricingHref = `/pricing-tool${queryString({ source: "funding" })}`;

  return (
    <details className="mt-7 rounded-xl border border-[var(--sc-border)] bg-white p-5">
      <summary className="cursor-pointer text-sm font-semibold text-[var(--sc-blue-900)]">
        {financePrimary ? "No clear funding route? See other ways to progress" : "Other ways to progress the project"}
      </summary>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
        {financePrimary
          ? "Equipment finance or leasing may still be worth exploring. You can also estimate the likely installed cost if the project value is not yet clear."
          : "Funding and commercial finance are different options. You can estimate the likely project cost or explore finance without changing this funding result."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={financeHref}
          className="sc-btn-secondary"
          onClick={() => track("funding_to_finance_clicked", { funding_result: fundingResult ?? "unknown" })}
        >
          Explore finance / leasing
        </Link>
        <Link
          href={pricingHref}
          className="sc-btn-secondary"
          onClick={() => track("funding_to_pricing_clicked")}
        >
          Estimate project cost
        </Link>
      </div>
      {estimateLow && estimateHigh ? (
        <p className="mt-3 text-xs leading-relaxed text-[var(--sc-slate)]">
          The pricing estimate you brought into this funding check will also carry into the finance checker.
        </p>
      ) : null}
    </details>
  );
}
