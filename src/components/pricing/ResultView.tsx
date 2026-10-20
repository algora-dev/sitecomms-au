"use client";

import { useState } from "react";
import type { CalculatorState, EstimateResult } from "@/lib/pricing/types";
import { formatAUD, pricingConfig } from "@/lib/pricing/config";
import { packageLabel } from "@/lib/pricing/calculate";
import type { IndustryContext } from "@/lib/industry-context";
import { INDUSTRY_CONTEXTS } from "@/lib/industry-context";
import { InquiryModal } from "./InquiryModal";
import { ToolCrossSell } from "@/components/tool-cross-sell";
import { track } from "@/lib/analytics";
import type { PricingAssessment } from "@/lib/agent-ready/assessment";
import { site } from "@/lib/site";

const pdfLabel = "SiteComms Australia ballpark system estimate";

export function ResultView({
  state,
  estimate,
  assessment,
  industry,
  onEdit,
  onLeaveIndustry,
  onRestart,
}: {
  state: CalculatorState;
  estimate: EstimateResult;
  assessment: PricingAssessment;
  industry?: IndustryContext;
  onEdit: () => void;
  onLeaveIndustry?: () => void;
  onRestart: () => void;
}) {
  const [inquiry, setInquiry] = useState<string | null>(null);

  const tierText =
    state.tier === "A" ? "New build"
    : state.tier === "B" ? "Existing site, cabling within 3m"
    : state.tier === "C" ? "Existing site, new cabling required"
    : "Existing site, cabling not yet known";

  // Site-wide cabling is excluded in every tier. Tier B assumes adequate
  // nearby cabling, so the additional cabling warning is only shown otherwise.
  const needsCablingNote = state.tier !== "B";

  const rangeSuffix = estimate.overThreshold ? "+" : "";
  const isAgedCare = industry === "aged-care";

  // Critical classification/scope text comes from the shared result, not a second policy.
  const disclaimer = assessment.limitations.join(" ");
  const source = assessment.sources[0];
  const configParams = new URLSearchParams({ cfg: encodeURIComponent(JSON.stringify(state)) });
  if (assessment.result.project_state) configParams.set("state", assessment.result.project_state);
  if (industry) configParams.set("industry", industry);
  const safeEstimateLink = `${site.url.replace(/\/$/, "")}/pricing-tool?${configParams}`;

  const summaryChips: string[] = [tierText];
  const a = state.areas;
  if (a.standardIndoor) summaryChips.push(`${a.standardIndoor} indoor rooms`);
  if (a.largeIndoor) summaryChips.push(`${a.largeIndoor} large indoor space${a.largeIndoor > 1 ? "s" : ""}`);
  if (a.outdoor) summaryChips.push(`${a.outdoor} outdoor area${a.outdoor > 1 ? "s" : ""}`);
  if (a.largeOutdoor) summaryChips.push(`${a.largeOutdoor} sports / large outdoor area${a.largeOutdoor > 1 ? "s" : ""}`);
  if (a.entry) summaryChips.push(`${a.entry} entry point${a.entry > 1 ? "s" : ""}`);
  summaryChips.push(`${packageLabel[state.featurePackage]} package`);

  const included: string[] = [
    "Central paging and control platform",
    "Live and zoned paging",
    isAgedCare ? "Scheduled announcements" : "Scheduled announcements and bells",
    "Installation allowance based on the site type selected",
    "Remote programming and commissioning",
  ];
  if (estimate.fireInterface) included.push("Fire / lockdown / EVAC interface");
  if (estimate.twoWayRooms > 0) included.push(`Two-way call buttons in ${estimate.twoWayRooms} room${estimate.twoWayRooms > 1 ? "s" : ""}`);
  if (a.entry > 0) included.push(`${a.entry} × ${state.fineTune.entryIntercom} entry intercom${a.entry > 1 ? "s" : ""}`);

  async function downloadPdf() {
    track("pricing_pdf_downloaded", {
      installation_tier: state.tier,
      total_areas: state.areas.standardIndoor + state.areas.largeIndoor + state.areas.outdoor + state.areas.largeOutdoor + state.areas.entry,
      package: state.featurePackage,
    });
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    let y = 60;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SiteComms Australia", W / 2, y, { align: "center" });
    y += 22;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(pdfLabel, W / 2, y, { align: "center" });
    y += 18;
    doc.setFontSize(10);
    doc.setTextColor(110);
    doc.text(new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }), W / 2, y, { align: "center" });
    y += 30;
    doc.setTextColor(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Estimated installed range: ${formatAUD(estimate.low)} - ${formatAUD(estimate.high)}${rangeSuffix} ex GST`, W / 2, y, { align: "center" });
    y += 26;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Your configuration", 50, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    for (const chip of summaryChips) {
      doc.text(`- ${chip}`, 55, y);
      y += 14;
    }
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Itemised breakdown", 50, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    for (const line of estimate.breakdown) {
      if (y > 700) { doc.addPage(); y = 60; }
      doc.text(line.label, 55, y);
      const lo = line.amountLow ?? line.amount;
      const hi = line.amountHigh ?? line.amount;
      doc.text(lo === hi ? formatAUD(lo) : `${formatAUD(lo)} - ${formatAUD(hi)}`, W - 55, y, { align: "right" });
      y += 14;
    }
    if (y > 660) { doc.addPage(); y = 60; }
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal", 55, y);
    doc.text(`${formatAUD(estimate.high)} (indicative range down to ${formatAUD(estimate.low)})`, W - 55, y, { align: "right" });
    y += 22;

    if (estimate.monitoringAnnual !== null) {
      doc.setFont("helvetica", "bold");
      doc.text("Recurring: off-site monitoring (indicative model assumption)", 55, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${formatAUD(estimate.monitoringAnnual)}/year`, W - 55, y, { align: "right" });
      y += 22;
    }

    if (estimate.overThreshold) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(180, 80, 20);
      doc.text("Large-system note: this configuration is beyond the standard planning range used by", 50, y);
      y += 13;
      doc.text("the SiteComms calculator. Larger systems may need different control, network,", 50, y);
      y += 13;
      doc.text("amplification or licensing architecture, so a site-specific design is recommended.", 50, y);
      y += 20;
      doc.setTextColor(20);
    }

    // cabling exclusion box
    if (needsCablingNote) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(20);
      const cablingLines = doc.splitTextToSize("Network cabling is not included. " + pricingConfig.cablingDisclaimer, W - 100);
      if (y + cablingLines.length * 11 > 780) { doc.addPage(); y = 60; }
      doc.text(cablingLines, 50, y);
      y += cablingLines.length * 11 + 10;
    }

    // Shared domain summary, limitations and assumption metadata. Never drop scope to fit a page.
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90);
    const evidenceParagraphs = [
      assessment.summary,
      ...assessment.limitations,
      ...assessment.result.assumptions.map(item => item.description),
      `Source: ${source.source_id}. Assumption review recorded: ${source.reviewed_at ?? "not recorded"}; this is not new source verification.`,
      `Model: ${assessment.result.versions.pricing_source}. Rules: ${assessment.result.versions.pricing_rules}. Policy: ${assessment.result.versions.assessment_policy}.`,
      `Project state: ${assessment.result.project_state ?? "not supplied"}. Quantity basis: ${assessment.result.quantity_basis}.`,
    ];
    for (const paragraph of evidenceParagraphs) {
      // Standard PDF fonts do not reliably cover all punctuation.
      const ascii = paragraph.replace(/[–—]/g, "-").replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
      const wrapped: string[] = doc.splitTextToSize(ascii, W - 100);
      for (const line of wrapped) {
        if (y > 770) { doc.addPage(); y = 60; }
        doc.text(line, 50, y);
        y += 12;
      }
      y += 6;
    }

    doc.save("SiteComms-estimate.pdf");
  }

  return (
    <div>
      <section className="rounded-2xl border-2 border-[var(--sc-teal)] bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sc-blue-700)]">Your ballpark installed price</p>
        <div className="mt-4 text-4xl font-bold tracking-tight text-[var(--sc-navy)] sm:text-5xl">
          {formatAUD(estimate.low)} – {formatAUD(estimate.high)}{rangeSuffix}
          <span className="ml-2 align-middle text-sm font-normal text-[var(--sc-slate)]">ex GST</span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
          Based on the site, areas and system level you entered. This is a planning estimate rather than a formal supplier quote; actual product, installation and site conditions can move the final price.
        </p>
        <button
          type="button"
          onClick={() => {
            track("pricing_connect_opened", { installation_tier: state.tier });
            setInquiry("connect");
          }}
          className="sc-btn-primary mt-6 cursor-pointer"
        >
          Send this estimate to SiteComms
        </button>
        <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-[var(--sc-slate)]">
          The SiteComms team will personally review your estimate and project details, then reply with the next step we suggest or providers you may want to contact. SiteComms does not send your estimate, project information or contact details to installers or suppliers. You decide whether to contact anyone we suggest.
        </p>
      </section>

      {estimate.overThreshold && (
        <div className="mt-4 rounded-xl border-l-4 border-[#bd4a1a] bg-[#fdf3ec] p-4 text-sm text-[#7a3413]">
          <strong>Large-system estimate:</strong> this configuration is beyond the standard planning range used by the
          SiteComms calculator. Larger systems may require different control, network, amplification or licensing
          architecture, so this estimate may understate the final installed cost and a site-specific design is recommended.
        </div>
      )}

      {isAgedCare && (
        <div className="mt-4 rounded-xl border-l-4 border-[var(--sc-teal)] bg-[var(--sc-blue-50)] p-4 text-sm text-[var(--sc-navy)]">
          <strong>Aged-care / retirement-village scope.</strong> This is a general paging and intercom planning
          estimate, not a complete nurse-call or certified evacuation-system quote. Scheduled-announcement wording
          is used throughout.{" "}
          {onLeaveIndustry && (
            <button
              type="button"
              onClick={onLeaveIndustry}
              className="mt-2 block font-semibold text-[var(--sc-teal-strong)] underline decoration-2 underline-offset-2 hover:text-[var(--sc-blue-700)] cursor-pointer"
            >
              Use the general calculator →
            </button>
          )}
        </div>
      )}

      {needsCablingNote && (
        <div className="mt-4 rounded-xl border-l-4 border-[var(--sc-teal-strong)] bg-[var(--sc-blue-50)] p-4 text-sm text-[var(--sc-navy)]">
          <strong>Network cabling is not included.</strong> {pricingConfig.cablingDisclaimer} SiteComms will take this exclusion into account if you send the estimate for review.
        </div>
      )}

      <details
        className="mt-6 rounded-2xl border border-[var(--sc-border)] bg-white"
        onToggle={(event) => {
          if ((event.currentTarget as HTMLDetailsElement).open) {
            track("pricing_result_details_opened", { installation_tier: state.tier, package: state.featurePackage });
          }
        }}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[var(--sc-navy)] hover:bg-[var(--sc-blue-50)] sm:p-6">
          <span>See the full estimate details</span>
          <span aria-hidden className="text-[var(--sc-blue-700)]">+</span>
        </summary>
        <div className="border-t border-[var(--sc-border)] p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {summaryChips.map((c) => (
              <span key={c} className="rounded-full border border-[var(--sc-border)] bg-[var(--sc-blue-50)] px-3 py-1.5 text-xs font-medium text-[var(--sc-navy)]">
                {c}
              </span>
            ))}
          </div>

          <h3 className="mt-7 text-lg font-semibold text-[var(--sc-navy)]">Included in this estimate</h3>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {included.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--sc-slate)]">
                <span className="mt-0.5 text-[var(--sc-teal)]">✓</span> {i}
              </li>
            ))}
          </ul>

          {estimate.monitoringAnnual !== null && (
            <div className="mt-6 rounded-xl border border-[var(--sc-teal)]/30 bg-[var(--sc-blue-50)] p-4">
              <div className="text-sm font-semibold text-[var(--sc-navy)]">Off-site monitoring</div>
              <div className="text-sm text-[var(--sc-slate)]">
                {formatAUD(estimate.monitoringAnnual)}/year (indicative SiteComms model assumption, not a market-wide package)
                <span className="block text-xs">Recurring cost, separate from the installed estimate above.</span>
              </div>
            </div>
          )}

          <h3 className="mt-7 text-lg font-semibold text-[var(--sc-navy)]">What could change the final price?</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-[var(--sc-slate)]">
            <li>• Cable routes and building access</li>
            <li>• Network switch and power capacity</li>
            <li>• Exact speaker quantities and mounting requirements</li>
            <li>• Additional central hardware for very large systems</li>
          </ul>

          <details className="mt-7 rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
            <summary className="cursor-pointer p-4 font-medium text-[var(--sc-navy)]">Itemised cost breakdown</summary>
            <div className="border-t border-[var(--sc-border)] bg-white p-4">
              {estimate.breakdown.map((l) => (
                <div key={l.label} className="flex items-start justify-between gap-4 py-2 text-sm">
                  <div>
                    <div className="text-[var(--sc-charcoal)]">{l.label}</div>
                    {l.detail && <div className="text-xs text-[var(--sc-slate)]">{l.detail}</div>}
                  </div>
                  <div className="whitespace-nowrap font-medium text-[var(--sc-navy)]">
                    {formatAUD(l.amountLow ?? l.amount)} – {formatAUD(l.amountHigh ?? l.amount)}
                  </div>
                </div>
              ))}
              <div className="mt-2 flex justify-between border-t border-[var(--sc-border)] pt-3 text-sm font-semibold text-[var(--sc-navy)]">
                <span>Subtotal</span>
                <span>{formatAUD(estimate.low)} (range up to {formatAUD(estimate.high)}{rangeSuffix})</span>
              </div>
              <p className="mt-2 text-xs text-[var(--sc-slate)]">
                {estimate.basis === "unsure"
                  ? "Priced on existing-site rates. If site-wide cabling is required, it is excluded from this estimate and is an additional cost."
                  : "Top of range reflects the calculated subtotal; the lower end allows for favourable site conditions."}
              </p>
            </div>
          </details>

          <details className="mt-4 rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-4 text-xs text-[var(--sc-slate)]">
            <summary className="cursor-pointer font-semibold text-[var(--sc-navy)]">Estimate basis, assumptions and sources</summary>
            <p className="mt-3">{assessment.summary}</p>
            <p className="mt-2">Provisional model: {assessment.result.versions.pricing_source}. Assumption review recorded: {source.reviewed_at ?? "not recorded"}; this is not a current supplier stock or price verification.</p>
            <p className="mt-2">Quantity basis: {assessment.result.quantity_basis}. Project state: {assessment.result.project_state ?? "not supplied"}. No state price uplift.</p>
            {assessment.result.assumptions.map(item => <p key={item.id} className="mt-2">{item.description}</p>)}
            <p className="mt-2">Unresolved: {assessment.result.unresolved_inputs.join("; ")}.</p>
            <p className="mt-2"><a className="underline" href={source.reference_path}>Pricing methodology</a>. No enquiry has been sent and no assessment has been saved to the server.</p>
            <p className="mt-2">{disclaimer} Prices shown are ex GST. The standard model allowance covers up to {pricingConfig.endpointWarningThreshold} IP endpoints; beyond that a site-specific design is recommended.</p>
          </details>
        </div>
      </details>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={downloadPdf}
          className="text-sm font-medium text-[var(--sc-navy)] underline decoration-[var(--sc-teal)] decoration-2 underline-offset-4 hover:text-[var(--sc-blue-700)] cursor-pointer"
        >
          Download estimate (PDF)
        </button>
        <div className="flex flex-wrap gap-4">
          <button type="button" onClick={onEdit} className="text-sm font-medium text-[var(--sc-slate)] hover:text-[var(--sc-navy)] cursor-pointer">← Change answers</button>
          <button type="button" onClick={onRestart} className="text-sm font-medium text-[var(--sc-slate)] hover:text-[var(--sc-navy)] cursor-pointer">↻ Start again</button>
        </div>
      </div>

      <ToolCrossSell variant="pricing-to-funding" estimateLow={estimate.low} estimateHigh={estimate.high} industry={industry} />

      <InquiryModal
        open={inquiry !== null}
        mode={inquiry ?? "connect"}
        onClose={() => setInquiry(null)}
        estimateSummary={`${formatAUD(estimate.low)} - ${formatAUD(estimate.high)}${rangeSuffix} ex GST`}
        estimateLink={safeEstimateLink}
        sourceTopic="pricing_tool"
        context={{
          "Assessment classification": "Provisional budget estimate - not a formal quote",
          "Pricing model": assessment.result.versions.pricing_source,
          "Pricing rules": assessment.result.versions.pricing_rules,
          "Quantity basis": assessment.result.quantity_basis,
          "Excluded scope": assessment.result.excluded_scope.join("; "),
          "Unresolved inputs": assessment.result.unresolved_inputs.join("; "),
          ...(isAgedCare ? { Industry: INDUSTRY_CONTEXTS[industry!].label } : {}),
          "Site situation": tierText,
          "Feature package": packageLabel[state.featurePackage],
          "Standard indoor rooms": String(a.standardIndoor),
          "Large indoor spaces": String(a.largeIndoor),
          "Outdoor areas": String(a.outdoor),
          "Large outdoor / sports areas": String(a.largeOutdoor),
          "Entry intercoms": `${a.entry}${a.entry ? ` (${state.fineTune.entryIntercom})` : ""}`,
          "Two-way call buttons": String(estimate.twoWayRooms),
          "Off-site monitoring": state.fineTune.monitoring ? "Yes" : "No",
          "Fire / EVAC interface": estimate.fireInterface ? "Yes" : "No",
          "Modelled endpoints": String(estimate.endpoints),
        }}
      />
    </div>
  );
}
