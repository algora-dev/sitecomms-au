"use client";

import Link from "next/link";
import { useProjectState } from "@/components/project-state";
import { withProjectState } from "@/lib/jurisdictions";
import { useSearchParams } from "next/navigation";
import {
  buildIndustryToolHref,
  industryFromParams,
  readEstimateRange,
} from "@/lib/industry-context";

/**
 * Query-aware CTA links used inside the server-rendered /financing article.
 * Preserves validated industry context and any carried SiteComms estimate
 * through to the finance checker / pricing calculator. Falls back to the
 * plain path for general visitors. Never forwards arbitrary query strings.
 */
export function IndustryAwareToolLink({
  to,
  className,
  children,
  fallbackLabel,
}: {
  to: "/tools/finance-check" | "/pricing-tool";
  className: string;
  children: React.ReactNode;
  fallbackLabel?: string;
}) {
  const searchParams = useSearchParams();
  const state = useProjectState();
  const industry = industryFromParams(searchParams);
  const estimate = readEstimateRange(searchParams);
  const href = buildIndustryToolHref(to, {
    industry,
    source: to === "/tools/finance-check" ? "financing" : "other",
    estimate,
  });
  return (
    <Link href={withProjectState(href, state)} className={className}>
      {fallbackLabel ?? children}
    </Link>
  );
}
