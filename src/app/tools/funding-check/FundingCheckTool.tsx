"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProjectStateSelector, useProjectState } from "@/components/project-state";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { FundingPathwayCard } from "@/components/funding/FundingPathwayCard";
import { assessFundingPathways } from "@/lib/funding/assessment";
import { FUNDING_FIELDS, REQUIRED_FUNDING_FIELDS, relevantDetailFields, fieldLabel, type FundingInput, type FundingField } from "@/lib/funding/questions";
import type { PathwayAssessment } from "@/lib/funding/types";
import { projectStateName } from "@/lib/jurisdictions";

const sections: { key: PathwayAssessment["section"]; title: string; note: string; badge?: string; badgeClass?: string }[] = [
  { key: "investigate", title: "Strong funding opportunities for your answers", badge: "Strong opportunity", badgeClass: "bg-emerald-100 text-emerald-900", note: "The basic scope is relevant to this limited catalogue. The authority must still decide applicant eligibility, costs, approval and any award." },
  { key: "check_first", title: "Worth clarifying — possible routes", badge: "Possible opportunity", badgeClass: "bg-amber-100 text-amber-900", note: "Missing information, a restricted application route or an overdue review prevents a stronger conclusion." },
  { key: "watchlist", title: "Closed rounds, programme monitoring and loan signposts", badge: "Monitor only", badgeClass: "bg-slate-200 text-slate-800", note: "These are not grants currently available to you. Loans are repayable and will need a separate finance assessment." },
  { key: "not_a_match", title: "Why other reviewed routes do not fit these answers", note: "These boundaries explain the limited shortlist; they are not a determination of all funding available in Australia." },
];
export default function FundingCheckTool() {
  const state = useProjectState();
  const [answers, setAnswers] = useState<FundingInput>({});
  const [detailState, setDetailState] = useState(state);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<{ fingerprint: string; time: string } | null>(null);
  const [clock, setClock] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const effectiveAnswers: FundingInput = detailState === state ? answers : Object.fromEntries(Object.entries(answers).filter(([key]) => REQUIRED_FUNDING_FIELDS.includes(key as FundingField)));
  const inputs: FundingInput = { ...effectiveAnswers, ...(state ? { state } : {}) };
  const fingerprint = JSON.stringify(inputs);
  const active = submitted?.fingerprint === fingerprint;
  const assessment = active ? assessFundingPathways(inputs, { now: new Date(clock ?? submitted!.time) }) : null;
  // Refresh date-sensitive status on long-lived tabs; never change source reviewed dates.
  useEffect(() => {
    if (!submitted) return;
    const update = () => setClock(new Date().toISOString());
    const interval = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    return () => { window.clearInterval(interval); document.removeEventListener("visibilitychange", update); };
  }, [submitted]);
  function update(field: FundingField, value: string) {
    setAnswers(previous => {
      // Changing the organisation/scope invalidates conditional answers rather than reusing stale context.
      const next = detailState !== state || ["site_type", "applicant_type", "project_focus"].includes(field)
        ? Object.fromEntries(Object.entries(previous).filter(([key]) => REQUIRED_FUNDING_FIELDS.includes(key as FundingField) || key === "stage"))
        : { ...previous };
      return { ...next, [field]: value };
    });
    setDetailState(state);
    setFormError("");
  }
  function move(next: number) { setStep(next); setFormError(""); requestAnimationFrame(() => heading.current?.focus()); }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!state || !answers.site_type) { move(0); setFormError("Choose the project state and site type first."); return; }
    if (step < 2) { move(step + 1); return; }
    const time = new Date().toISOString();
    const checked = assessFundingPathways(inputs, { now: new Date(time) });
    if (checked.result.issues.length) {
      setFormError(checked.result.issues.map(issue => issue.message).join(" "));
      return;
    }
    setSubmitted({ fingerprint, time }); setClock(time); setFormError("");
    requestAnimationFrame(() => resultHeading.current?.focus());
  }
  function select(field: FundingField, required = false) {
    const definition = FUNDING_FIELDS[field];
    return <div key={field}>
      <label htmlFor={`funding-${field}`} className="block text-sm font-semibold leading-relaxed text-[var(--sc-blue-900)]">{definition.label}{required ? " *" : ""}</label>
      <select id={`funding-${field}`} value={effectiveAnswers[field] ?? (required ? "" : "unknown")} required={required}
        onChange={event => update(field, event.target.value)}
        className="mt-2 w-full min-w-0 rounded-lg border border-[var(--sc-border)] bg-white px-3 py-3 text-sm text-[var(--sc-blue-900)]">
        {required && <option value="">Choose an answer</option>}
        {definition.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </div>;
  }
  const enquiryContext: Record<string, string> | undefined = assessment ? {
    funding_assessment: "Pathway research only — no eligibility, award or application approval determined.",
    project_state: projectStateName(state),
    catalogue: assessment.result.catalogue_version,
    assessed_at: assessment.generated_at,
    site_and_applicant: `${fieldLabel("site_type", answers.site_type ?? "")} / ${fieldLabel("applicant_type", answers.applicant_type ?? "")}`,
    scope_and_stage: `${fieldLabel("project_focus", answers.project_focus ?? "")} / ${fieldLabel("stage", answers.stage ?? "")}`,
    reviewed_pathways: assessment.result.pathways.filter(p => p.section !== "not_a_match").map(p => `${p.id}: ${p.availability}; ${p.match}`).join("; "),
    unresolved_conditions: "Review the pathway conditions and official sources. SiteComms does not apply for or approve funding.",
    ...Object.fromEntries(relevantDetailFields(inputs).filter(field => effectiveAnswers[field] && effectiveAnswers[field] !== "unknown").map(field => [`funding_${field}`, fieldLabel(field, effectiveAnswers[field]!)])),
  } : undefined;
  return <div id="funding-tool" className="scroll-mt-24">
    <form onSubmit={submit} className="sc-card bg-white p-5 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">Step {step + 1} of 3 · no contact details needed</p>
      <h2 ref={heading} tabIndex={-1} className="mt-2 text-2xl font-bold text-[var(--sc-blue-900)]">{["Your location and site", "The applicant and project", "Check the details that change the route"][step]}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Use “not sure” rather than guessing. We do not ask for names, medical records, bank details or an address. Your project state is remembered; the other answers are not saved by this tool.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {step === 0 && <><ProjectStateSelector required name="funding-state" label="Project state or territory" wrapperClassName="" labelClassName="block text-sm font-semibold leading-relaxed text-[var(--sc-blue-900)]" selectClassName="mt-2 w-full min-w-0 rounded-lg border border-[var(--sc-border)] bg-white px-3 py-3 text-sm text-[var(--sc-blue-900)]" />{select("site_type", true)}</>}
        {step === 1 && <>{select("applicant_type", true)}{select("project_focus", true)}{select("stage", true)}<p className="self-end text-sm leading-relaxed text-[var(--sc-slate)]">A school, its parents’ association, the property owner and a service operator can be different legal applicants. Select the organisation actually seeking support.</p></>}
        {step === 2 && relevantDetailFields(inputs).map(field => select(field))}
      </div>
      {step === 2 && <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">Additional evidence may be required by the funder. A planning estimate is not a supplier quote, and the tool will not estimate an award or reduce your project cost by a speculative grant.</p>}
      {formError && <p role="alert" className="mt-5 rounded-lg border border-[var(--sc-border)] p-3 text-sm font-semibold">{formError}</p>}
      <div className="mt-7 flex flex-wrap gap-3">
        {step > 0 && <button type="button" onClick={() => move(step - 1)} className="sc-btn-secondary">Back</button>}
        <button type="submit" className="sc-btn-primary">{step < 2 ? "Continue" : "Find researched pathways"}</button>
      </div>
      {submitted && !active && <p className="mt-4 text-sm text-[var(--sc-slate)]" role="status">Your details or saved state changed. Previous results are hidden; review your answers and run the assessment again.</p>}
    </form>
    {assessment && <section className="mt-10" aria-labelledby="funding-result-heading">
      <h2 id="funding-result-heading" ref={resultHeading} tabIndex={-1} className="text-2xl font-bold text-[var(--sc-blue-900)]">Your funding review result</h2>
      <p className="mt-2 text-sm text-[var(--sc-slate)]">Based on the answers you just provided. No funding eligibility or approval has been determined.</p>
      <div className="sc-card mt-5 border-t-4 border-[var(--sc-blue-700)] bg-[var(--sc-blue-50)] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-blue-700)]">Your result</p>
        <p className="mt-3 text-lg font-bold leading-relaxed text-[var(--sc-blue-900)]">{assessment.summary}</p>
        <p className="mt-3 text-sm font-medium text-[var(--sc-slate)]">{projectStateName(state)} · {fieldLabel("site_type", answers.site_type ?? "")} · {fieldLabel("applicant_type", answers.applicant_type ?? "")}</p>
        <div className="mt-5 rounded-xl border border-[var(--sc-border)] bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-blue-700)]">Your next step</p>
          {(() => { const top = assessment.result.pathways.find(p => p.section === "investigate"); return <>
            {top && <p className="mt-2 text-sm font-bold text-[var(--sc-blue-900)]">{top.title}</p>}
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{top ? top.next_step : "Review the possible routes and their conditions below, then confirm details with the programme owner or send a SiteComms enquiry."}</p>
          </>; })()}
        </div>
        <p className="mt-3 text-xs text-[var(--sc-slate)]">Assessment time: {assessment.generated_at.replace("T", " ").replace(/\.\d+Z$/, " UTC")}. This time is not a new source-verification date.</p>
        <button type="button" className="mt-4 text-sm font-semibold text-[var(--sc-blue-700)] underline" onClick={() => { setSubmitted(null); move(0); }}>Review or change my answers</button>
      </div>
      <details className="sc-card mt-5 bg-white p-5">
        <summary className="cursor-pointer text-sm font-bold text-[var(--sc-blue-900)]">What this result covers, and what it does not determine</summary>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{assessment.result.coverage_note}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">No funding eligibility, approval or award amount has been determined. Published programme caps are limits, not expected awards. The full route-by-route evidence, conditions and official sources are listed below.</p>
      </details>
      {sections.map(section => {
        const pathways = assessment.result.pathways.filter(p => p.section === section.key);
        if (!pathways.length) return null;
        const contents = <><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{section.note}</p><div className="mt-5 space-y-5">{pathways.map(pathway => <FundingPathwayCard key={pathway.id} pathway={pathway} />)}</div></>;
        return section.key === "not_a_match" ? <details key={section.key} className="mt-8 rounded-xl border border-[var(--sc-border)] p-5"><summary className="cursor-pointer text-lg font-bold text-[var(--sc-blue-900)]">{section.title} ({pathways.length})</summary>{contents}</details>
          : <section key={section.key} className="mt-9"><h3 className="flex flex-wrap items-center gap-3 text-xl font-bold text-[var(--sc-blue-900)]">{section.title}{section.badge && <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${section.badgeClass}`}>{section.badge} · {pathways.length}</span>}</h3>{contents}</section>;
      })}
      <details className="sc-card mt-8 p-6 text-sm leading-relaxed text-[var(--sc-slate)]"><summary className="cursor-pointer font-bold text-[var(--sc-blue-900)]">What this review does not do</summary><ul className="mt-3 list-disc space-y-2 pl-5">{assessment.limitations.map(item => <li key={item}>{item}</li>)}</ul></details>
      <section id="project-enquiry" className="sc-card mt-8 bg-[var(--sc-blue-50)] p-6">
        <h3 className="text-xl font-bold text-[var(--sc-blue-900)]">Turn the requirement into a practical project scope</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Review an enquiry to SiteComms with this context. We review your requirement and reply with suitable providers’ public contact details; we do not forward your enquiry to them. A provider may help define the technical scope and quote, but cannot be assumed to secure funding.</p>
        <div className="mt-5 flex flex-wrap gap-3"><ProjectHelpLauncher mode="funding_help" sourceTopic="funding_pathways" buttonLabel="Review a SiteComms project enquiry" context={enquiryContext} className="sc-btn-primary" /><Link href="/guides/compare-pa-system-quotes" className="sc-btn-secondary">Prepare comparable quotes</Link></div>
      </section>
    </section>}
    <noscript><p className="sc-card mt-6 p-5">The interactive checker needs JavaScript. The <a href="/funding" className="underline">funding guide and state pages</a> provide the same programme evidence and official contact routes without running the tool.</p></noscript>
  </div>;
}
