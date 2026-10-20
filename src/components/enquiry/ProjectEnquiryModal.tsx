"use client";

import { ProjectStateSelector } from "@/components/project-state";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { attributionForSubmission } from "@/lib/attribution";

/**
 * Site-wide SiteComms project enquiry modal.
 *
 * Enquiries are received and reviewed by the SiteComms team only. SiteComms
 * replies to the user with its suggested next step and, where useful, public
 * contact details for suitable providers. Customer enquiry data is never
 * forwarded to recommended providers; the customer decides whether to make
 * contact themselves.
 */

export type EnquiryMode =
  | "project_help"
  | "quote_help"
  | "funding_help"
  | "finance_help"
  | "site_assessment"
  | "cabling_help"
  | "system_selection"
  | "general_message";

const HELP_OPTIONS = [
  { value: "choosing_system", label: "Help choosing a system" },
  { value: "understanding_estimate", label: "Help understanding an estimate" },
  { value: "formal_quote", label: "Formal quote / installer" },
  { value: "site_assessment", label: "Site assessment" },
  { value: "funding_scope", label: "Funding / project-scope question" },
  { value: "finance_options", label: "Finance / leasing question" },
  { value: "cabling_network", label: "Network / cabling question" },
  { value: "quote_review", label: "Existing design / quote review" },
  { value: "general_question", label: "General question" },
] as const;

const DEFAULT_HELP: Record<EnquiryMode, string> = {
  project_help: "choosing_system",
  quote_help: "formal_quote",
  funding_help: "funding_scope",
  finance_help: "finance_options",
  site_assessment: "site_assessment",
  cabling_help: "cabling_network",
  system_selection: "choosing_system",
  general_message: "general_question",
};

const EXISTING_PROVIDER_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
] as const;

const ENQUIRY_PROCESS_COPY =
  "Your request goes to SiteComms for our team to review personally. We review what you send and reply with the next step we suggest. If we think particular installers, suppliers or specialists may suit the project, we can give you their public contact details and explain why. We do not disclose your enquiry, contact details, attachments or tool answers to installers, suppliers, finance providers or other project parties. You decide whether you want to contact anyone we suggest.";

const MODE_COPY: Record<EnquiryMode, { title: string; blurb: string; submit: string }> = {
  project_help: {
    title: "Send your project to SiteComms",
    blurb:
      "Give us the few details we need to reply. We’ll review the project ourselves and suggest the most useful next step or providers you may want to contact.",
    submit: "Send my project to SiteComms",
  },
  quote_help: {
    title: "Send your estimate to SiteComms",
    blurb:
      "Your estimate and project context are already included. We’ll review them and reply with the next step or providers we think are worth contacting for a formal quote.",
    submit: "Send my estimate to SiteComms",
  },
  funding_help: {
    title: "Send your funding result to SiteComms",
    blurb:
      "Your funding-check answers and result are already included. We’ll review the project scope and suggest the next practical step; no funding eligibility or approval is promised.",
    submit: "Send my funding result to SiteComms",
  },
  finance_help: {
    title: "Send your finance result to SiteComms",
    blurb:
      "Your finance-check answers and result are already included. We’ll review the project and suggest an appropriate next conversation where useful; this is not a credit assessment or approval.",
    submit: "Send my finance result to SiteComms",
  },
  site_assessment: {
    title: "Ask about a site assessment",
    blurb:
      "Send us the basic site details and we’ll review the project and suggest an appropriate next step or provider.",
    submit: "Send my project to SiteComms",
  },
  cabling_help: {
    title: "Ask about network or cabling scope",
    blurb:
      "Site-wide structured cabling is outside the calculator estimate. Send us the site details and we’ll suggest the next step or the type of provider worth contacting.",
    submit: "Send my project to SiteComms",
  },
  system_selection: {
    title: "Send your project to SiteComms",
    blurb:
      "Tell us where the project is and who to reply to. If page or tool context is already attached, you do not need to repeat it.",
    submit: "Send my project to SiteComms",
  },
  general_message: {
    title: "Send us a message",
    blurb:
      "Questions, corrections, or a proposed system you would like us to look at. We read everything.",
    submit: "Send message",
  },
};

export function ProjectEnquiryModal({
  open,
  mode,
  onClose,
  estimateSummary,
  estimateLink,
  context,
  sourceTopic,
}: {
  open: boolean;
  mode: EnquiryMode;
  onClose: () => void;
  estimateSummary?: string;
  estimateLink?: string;
  /** Structured tool/page context, visible for review before explicit form submission. */
  context?: Record<string, string>;
  /** e.g. "emergency_lockdown", "compare_schools", "finance_check" */
  sourceTopic?: string;
}) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const formStartedRef = useRef(false);
  const optionalTrackedRef = useRef(false);
  const isProject = mode !== "general_message";
  const [helpType, setHelpType] = useState<string>(DEFAULT_HELP[mode]);
  const [existingProvider, setExistingProvider] = useState<string>("");
  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      formStartedRef.current = false;
      optionalTrackedRef.current = false;
      queueMicrotask(() => {
        setDone(false);
        setError(null);
        setHelpType(DEFAULT_HELP[mode]);
        setExistingProvider("");
        setProviderName("");
      });
      document.body.style.overflow = "hidden";
      track("project_help_opened", { enquiry_type: mode, source_page: window.location.pathname });
      requestAnimationFrame(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        dialog.scrollTop = 0;
        dialog.focus({ preventScroll: true });
      });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([disabled]):not([tabindex='-1']), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      restoreFocusRef.current?.focus?.();
      restoreFocusRef.current = null;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !done) return;
    requestAnimationFrame(() => {
      dialogRef.current?.scrollTo({ top: 0, behavior: "auto" });
      dialogRef.current?.focus({ preventScroll: true });
    });
  }, [open, done]);

  if (!open) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("mode", mode);
      fd.set("helpType", helpType);
      if (existingProvider) fd.set("existingProvider", existingProvider);
      if (existingProvider === "yes" && providerName) fd.set("providerName", providerName);
      if (estimateSummary) fd.set("estimate", estimateSummary);
      if (estimateLink) fd.set("estimateLink", estimateLink);
      if (sourceTopic) fd.set("sourceTopic", sourceTopic);
      for (const [key, value] of Object.entries(context ?? {})) {
        if (value) fd.set(`ctx_${key}`, value);
      }
      fd.set("pageUrl", window.location.href);
      fd.set("referrer", document.referrer);
      for (const [key, value] of Object.entries(attributionForSubmission())) {
        fd.set(`attr_${key}`, value);
      }
      const res = await fetch("/api/inquiry", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Send failed");
      setDone(true);
      track("project_help_submitted", {
        enquiry_type: mode,
        help_type: helpType,
        existing_provider: existingProvider || "not_answered",
        source_page: window.location.pathname,
      });
    } catch (err) {
      track("project_help_failed", { enquiry_type: mode, source_page: window.location.pathname });
      setError(
        err instanceof Error && err.message && err.message !== "Send failed"
          ? err.message
          : "We couldn't submit your enquiry. Please try the form again in a few minutes.",
      );
    } finally {
      setSending(false);
    }
  }

  const { title, blurb, submit: submitLabel } = MODE_COPY[mode];
  const contextLines = Object.entries(context ?? {}).filter(([, v]) => v);
  const showHelpSelector = isProject && mode === "project_help" && !sourceTopic && !estimateSummary && contextLines.length === 0;
  const inputClass =
    "mt-1 w-full rounded-lg border border-[var(--sc-border)] px-3 py-2.5 text-sm focus:border-[var(--sc-teal)] focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sc-enquiry-title"
      aria-describedby="sc-enquiry-desc"
    >
      <div ref={dialogRef} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8" tabIndex={-1}>
        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sc-teal)]/10 text-2xl text-[var(--sc-teal)]">✓</div>
            <h3 className="mt-4 text-xl font-semibold text-[var(--sc-navy)]">Thanks, your request is with SiteComms</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
              We&apos;ll personally review what you sent and reply with the next step we suggest. If suitable providers may help, we&apos;ll send you their public contact details and explain why. We have not shared your information with them, and we will not do so.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-[var(--sc-navy)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--sc-blue-700)] hover:shadow-md transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="sc-enquiry-title" className="text-xl font-semibold text-[var(--sc-navy)]">{title}</h3>
                <p id="sc-enquiry-desc" className="mt-1 text-sm leading-relaxed text-[var(--sc-slate)]">{blurb}</p>
                {estimateSummary && (
                  <p className="mt-3 inline-flex rounded-full bg-[var(--sc-blue-50)] px-3 py-1.5 text-xs font-semibold text-[var(--sc-navy)]">
                    Your estimate: {estimateSummary}
                  </p>
                )}
                {contextLines.length > 0 && (
                  <details className="mt-3 rounded-lg bg-[var(--sc-blue-50)] px-3 py-2 text-xs leading-relaxed text-[var(--sc-slate)]">
                    <summary className="cursor-pointer font-semibold">See the project information already included</summary>
                    <dl className="mt-2 space-y-2">{contextLines.map(([key, value]) => <div key={key}><dt className="font-semibold">{key}</dt><dd>{value}</dd></div>)}</dl>
                    <p className="mt-2">This information is sent to SiteComms only when you submit the form. It is not sent to a recommended provider.</p>
                  </details>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1.5 text-[var(--sc-slate)] hover:bg-[var(--sc-blue-50)] hover:text-[var(--sc-navy)] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-[var(--sc-teal)]/30 bg-[var(--sc-blue-50)] p-4 text-xs leading-relaxed text-[var(--sc-slate)]">
              <strong className="text-[var(--sc-navy)]">Private by default.</strong> {ENQUIRY_PROCESS_COPY}
            </div>

            <form
              onSubmit={submit}
              className="mt-5 space-y-4"
              onFocusCapture={() => {
                if (formStartedRef.current) return;
                formStartedRef.current = true;
                track("project_help_form_started", { enquiry_type: mode, source_page: window.location.pathname });
              }}
            >
              <div className="hidden" aria-hidden="true">
                <label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
              </div>

              {showHelpSelector && (
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">What help do you need? *</span>
                  <select
                    required
                    value={helpType}
                    onChange={(e) => setHelpType(e.target.value)}
                    className={inputClass}
                  >
                    {HELP_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </label>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Contact name *</span>
                  <input required name="name" className={inputClass} placeholder="Jane Smith" autoComplete="name" />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Email *</span>
                  <input required name="email" type="email" className={inputClass} placeholder="you@example.com.au" autoComplete="email" />
                </label>
              </div>

              {isProject ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="font-medium text-[var(--sc-charcoal)]">Organisation / school *</span>
                      <input required name="organisation" className={inputClass} placeholder="Your school, business or organisation" autoComplete="organization" />
                    </label>
                    <label className="block text-sm">
                      <span className="font-medium text-[var(--sc-charcoal)]">Town / region *</span>
                      <input required name="location" className={inputClass} placeholder="e.g. Newcastle" />
                    </label>
                  </div>
                  <div><ProjectStateSelector name="projectState" required /></div>

                  <details
                    className="rounded-xl border border-[var(--sc-border)] bg-white p-4"
                    onToggle={(event) => {
                      if (!(event.currentTarget as HTMLDetailsElement).open || optionalTrackedRef.current) return;
                      optionalTrackedRef.current = true;
                      track("project_help_optional_details_opened", { enquiry_type: mode, source_page: window.location.pathname });
                    }}
                  >
                    <summary className="cursor-pointer text-sm font-semibold text-[var(--sc-blue-700)]">Add more project details (optional)</summary>
                    <div className="mt-4 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm">
                          <span className="font-medium text-[var(--sc-charcoal)]">Phone</span>
                          <input name="phone" type="tel" className={inputClass} placeholder="Optional" autoComplete="tel" />
                        </label>
                        <label className="block text-sm">
                          <span className="font-medium text-[var(--sc-charcoal)]">Brand / product preference</span>
                          <input name="brandPreference" className={inputClass} placeholder="Brand, model or no preference" />
                        </label>
                      </div>

                      <fieldset className="rounded-xl border border-[var(--sc-border)] p-3">
                        <legend className="px-1 text-sm font-medium text-[var(--sc-charcoal)]">
                          Already working with an installer, IT provider or consultant?
                        </legend>
                        <div className="mt-1 flex flex-wrap gap-3">
                          {EXISTING_PROVIDER_OPTIONS.map((o) => (
                            <label key={o.value} className="flex cursor-pointer items-center gap-1.5 text-sm text-[var(--sc-slate)]">
                              <input
                                type="radio"
                                name="existingProviderChoice"
                                value={o.value}
                                checked={existingProvider === o.value}
                                onChange={() => setExistingProvider(o.value)}
                                className="accent-[var(--sc-teal-strong)]"
                              />
                              {o.label}
                            </label>
                          ))}
                        </div>
                        {existingProvider === "yes" && (
                          <input
                            name="providerName"
                            value={providerName}
                            onChange={(e) => setProviderName(e.target.value)}
                            className={`${inputClass} mt-2`}
                            placeholder="Provider name (optional)"
                            aria-label="Existing provider name"
                          />
                        )}
                      </fieldset>

                      <label className="block text-sm">
                        <span className="font-medium text-[var(--sc-charcoal)]">Anything else we should know?</span>
                        <textarea name="comments" rows={3} className={inputClass} placeholder="Optional project note" />
                      </label>

                      <label className="block text-sm">
                        <span className="font-medium text-[var(--sc-charcoal)]">Attach plans / documents</span>
                        <input
                          type="file"
                          name="attachments"
                          multiple
                          accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.heic"
                          className="mt-1 w-full cursor-pointer rounded-lg border border-dashed border-[var(--sc-border)] px-3 py-2.5 text-sm text-[var(--sc-slate)] file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-[var(--sc-blue-50)] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[var(--sc-navy)] hover:border-[var(--sc-teal)]"
                        />
                        <span className="mt-1 block text-xs text-[var(--sc-slate)]">PDFs, images or plans. Up to 8MB per file and 20MB total.</span>
                      </label>
                    </div>
                  </details>
                </>
              ) : (
                <>
                  <label className="block text-sm">
                    <span className="font-medium text-[var(--sc-charcoal)]">Organisation (optional)</span>
                    <input name="organisation" className={inputClass} placeholder="Company or school (optional)" autoComplete="organization" />
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium text-[var(--sc-charcoal)]">Message *</span>
                    <textarea required name="message" rows={4} className={inputClass} placeholder="Your question, correction or project details" />
                  </label>
                </>
              )}

              {error && <p className="rounded-lg bg-[#fdf3ec] p-3 text-sm text-[#7a3413]">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-[var(--sc-teal-strong)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--sc-teal-strong-hover)] hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {sending ? "Sending…" : submitLabel}
              </button>
              <p className="text-center text-xs leading-relaxed text-[var(--sc-slate)]">
                Your request is reviewed by SiteComms only. We do not send your contact details, project information, tool answers or attachments to installers, suppliers, finance providers or other project parties.{" "}
                <Link href="/privacy" className="underline">Privacy</Link>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
