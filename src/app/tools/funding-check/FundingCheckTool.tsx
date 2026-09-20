"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProjectStateSelector, useProjectState } from "@/components/project-state";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { FundingPathwayCard } from "@/components/funding/FundingPathwayCard";
import { assessFundingPathways } from "@/lib/funding/assessment";
import { FUNDING_FIELDS, fieldLabel, type FundingInput, type FundingField } from "@/lib/funding/questions";
import type { PathwayAssessment } from "@/lib/funding/types";
import { projectStateName } from "@/lib/jurisdictions";

const SIMPLE_SITE_OPTIONS = [
  ["government_school", "Government school"],
  ["catholic_school", "Catholic school"],
  ["independent_school", "Independent school"],
  ["early_childhood", "Early learning / preschool / childcare"],
  ["residential_aged_care", "Residential aged care home"],
  ["retirement_village", "Retirement village"],
  ["community", "Community / not-for-profit facility"],
  ["other", "Other organisation or site"],
] as const;

const SIMPLE_PROJECT_OPTIONS = [
  ["communications", "PA / paging / bells / intercom upgrade"],
  ["building", "New building, extension or major refurbishment"],
  ["accessibility", "Accessibility or hearing-related upgrade"],
  ["urgent_failure", "Urgent repair, failure or safety-related work"],
  ["maintenance", "Repair / maintenance"],
  ["unknown", "Not sure / something else"],
] as const;

const SIMPLE_STAGE_OPTIONS = [
  ["planning", "Planning / early stage"],
  ["quotes", "Getting quotes / ready to proceed"],
  ["started", "Already ordered, contracted or work has started"],
  ["completed", "Already completed / equipment purchased"],
  ["unknown", "Not sure"],
] as const;

function applicantOptions(siteType?: string) {
  if (siteType?.endsWith("_school")) return [
    ["unknown", "Not sure"],
    ["school_authority", "The school / school system / governing body"],
    ["school_parent_body", "A P&C / P&F / parents’ association"],
    ["not_for_profit", "A not-for-profit / charity / property body"],
    ["other_government", "A government organisation"],
  ] as const;
  if (siteType === "residential_aged_care" || siteType === "retirement_village") return [
    ["unknown", "Not sure"],
    ["not_for_profit", "A not-for-profit / charity operator"],
    ["private_business", "A private operator / business"],
    ["local_government", "A council / local government body"],
    ["other_government", "Another government organisation"],
  ] as const;
  if (siteType === "community") return [
    ["unknown", "Not sure"],
    ["not_for_profit", "An incorporated not-for-profit / charity"],
    ["local_government", "A council / local government body"],
    ["social_enterprise", "A social enterprise"],
    ["unincorporated_group", "An unincorporated community group"],
    ["private_business", "A private business / operator"],
  ] as const;
  return [
    ["unknown", "Not sure"],
    ["not_for_profit", "A not-for-profit / charity"],
    ["local_government", "A council / local government body"],
    ["other_government", "Another government organisation"],
    ["private_business", "A private business / operator"],
    ["social_enterprise", "A social enterprise"],
  ] as const;
}

export default function FundingCheckTool() {
  const state = useProjectState();
  const [answers, setAnswers] = useState<FundingInput>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<{ fingerprint: string; time: string } | null>(null);
  const [clock, setClock] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);

  const inputs: FundingInput = { ...answers, ...(state ? { state } : {}) };
  const fingerprint = JSON.stringify(inputs);
  const active = submitted?.fingerprint === fingerprint;
  const assessment = active ? assessFundingPathways(inputs, { now: new Date(clock ?? submitted!.time) }) : null;

  useEffect(() => {
    if (!submitted) return;
    const update = () => setClock(new Date().toISOString());
    const interval = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, [submitted]);

  function update(field: FundingField, value: string) {
    setAnswers(previous => {
      const next = { ...previous, [field]: value };
      if (field === "site_type") delete next.applicant_type;
      return next;
    });
    setFormError("");
  }

  function move(next: number) {
    setStep(next);
    setFormError("");
    requestAnimationFrame(() => heading.current?.focus());
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!state || !answers.site_type) {
      move(0);
      setFormError("Choose the project state and site type first.");
      return;
    }
    if (step === 0) {
      move(1);
      return;
    }
    if (!answers.applicant_type || !answers.project_focus || !answers.stage) {
      setFormError("Choose an answer for the three project questions. Use “Not sure” if you do not know.");
      return;
    }

    const time = new Date().toISOString();
    const checked = assessFundingPathways(inputs, { now: new Date(time) });
    if (checked.result.issues.length) {
      setFormError(checked.result.issues.map(issue => issue.message).join(" "));
      return;
    }
    setSubmitted({ fingerprint, time });
    setClock(time);
    setFormError("");
    requestAnimationFrame(() => resultHeading.current?.focus());
  }

  function select(
    field: FundingField,
    options: readonly (readonly [string, string])[],
    required = true,
  ) {
    const definition = FUNDING_FIELDS[field];
    return (
      <div key={field}>
        <label htmlFor={`funding-${field}`} className="block text-sm font-semibold leading-relaxed text-[var(--sc-blue-900)]">
          {definition.label}{required ? " *" : ""}
        </label>
        <select
          id={`funding-${field}`}
          value={answers[field] ?? ""}
          required={required}
          onChange={event => update(field, event.target.value)}
          className="mt-2 w-full min-w-0 rounded-lg border border-[var(--sc-border)] bg-white px-3 py-3 text-sm text-[var(--sc-blue-900)]"
        >
          <option value="">Choose an answer</option>
          {options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
    );
  }

  const strong = assessment?.result.pathways.filter(pathway => pathway.section === "investigate") ?? [];
  const possible = assessment?.result.pathways.filter(pathway => pathway.section === "check_first") ?? [];
  const secondary = assessment?.result.pathways.filter(pathway => pathway.section === "watchlist") ?? [];
  const excluded = assessment?.result.pathways.filter(pathway => pathway.section === "not_a_match") ?? [];

  const resultHeadline = strong.length
    ? `Yes — ${strong.length === 1 ? "a funding pathway" : `${strong.length} funding pathways`} may be worth pursuing.`
    : possible.length
      ? `Possibly — ${possible.length === 1 ? "a funding pathway needs" : `${possible.length} funding pathways need`} a quick eligibility check.`
      : "No clear active funding path was identified from the programmes currently reviewed.";

  const resultIntro = strong.length
    ? "Your answers line up with the basic scope of the pathway shown below. The funder still makes the final eligibility and approval decision."
    : possible.length
      ? "There is a route worth checking, but one or more programme conditions or current-status points still need confirmation."
      : "That does not mean funding does not exist. It means this reviewed catalogue did not identify a current route that clearly fits the answers provided.";

  const enquiryContext: Record<string, string> | undefined = assessment ? {
    funding_assessment: "Funding pathway shortlist only — no grant eligibility, award or approval determined.",
    project_state: projectStateName(state),
    catalogue: assessment.result.catalogue_version,
    assessed_at: assessment.generated_at,
    site_and_applicant: `${fieldLabel("site_type", answers.site_type ?? "")} / ${fieldLabel("applicant_type", answers.applicant_type ?? "")}`,
    scope_and_stage: `${fieldLabel("project_focus", answers.project_focus ?? "")} / ${fieldLabel("stage", answers.stage ?? "")}`,
    reviewed_pathways: assessment.result.pathways
      .filter(pathway => pathway.section === "investigate" || pathway.section === "check_first")
      .map(pathway => `${pathway.id}: ${pathway.availability}; ${pathway.match}`)
      .join("; "),
  } : undefined;

  return (
    <div id="funding-tool" className="scroll-mt-24">
      <form onSubmit={submit} className="sc-card bg-white p-5 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">
          Step {step + 1} of 2 · about one minute
        </p>
        <h2 ref={heading} tabIndex={-1} className="mt-2 text-2xl font-bold text-[var(--sc-blue-900)]">
          {step === 0 ? "Where is the project?" : "Tell us the basics"}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
          {step === 0
            ? "Choose the state and the type of site. That is enough to narrow the research before we ask three simple project questions."
            : "You do not need to know grant terminology. Choose the closest answer, or “Not sure” where available."}
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {step === 0 && (
            <>
              <ProjectStateSelector
                required
                name="funding-state"
                label="State or territory"
                wrapperClassName=""
                labelClassName="block text-sm font-semibold leading-relaxed text-[var(--sc-blue-900)]"
                selectClassName="mt-2 w-full min-w-0 rounded-lg border border-[var(--sc-border)] bg-white px-3 py-3 text-sm text-[var(--sc-blue-900)]"
              />
              {select("site_type", SIMPLE_SITE_OPTIONS)}
            </>
          )}

          {step === 1 && (
            <>
              {select("applicant_type", applicantOptions(answers.site_type))}
              {select("project_focus", SIMPLE_PROJECT_OPTIONS)}
              {select("stage", SIMPLE_STAGE_OPTIONS)}
            </>
          )}
        </div>

        {formError && <p role="alert" className="mt-5 rounded-lg border border-[var(--sc-border)] p-3 text-sm font-semibold">{formError}</p>}

        <div className="mt-7 flex flex-wrap gap-3">
          {step > 0 && <button type="button" onClick={() => move(step - 1)} className="sc-btn-secondary">Back</button>}
          <button type="submit" className="sc-btn-primary">{step === 0 ? "Continue" : "Show my funding options"}</button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">
          No contact details are required. This tool identifies researched funding pathways; it does not submit an application or decide eligibility.
        </p>

        {submitted && !active && (
          <p className="mt-4 text-sm text-[var(--sc-slate)]" role="status">
            Your answers changed, so the previous result is hidden. Run the check again when you are ready.
          </p>
        )}
      </form>

      {assessment && (
        <section className="mt-10" aria-labelledby="funding-result-heading">
          <div className="sc-card border-t-4 border-[var(--sc-blue-700)] bg-[var(--sc-blue-50)] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-blue-700)]">Your result</p>
            <h2 id="funding-result-heading" ref={resultHeading} tabIndex={-1} className="mt-3 text-2xl font-bold leading-tight text-[var(--sc-blue-900)]">
              {resultHeadline}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">{resultIntro}</p>
            <p className="mt-4 text-sm font-semibold text-[var(--sc-blue-900)]">
              {projectStateName(state)} · {fieldLabel("site_type", answers.site_type ?? "")}
            </p>
            <button type="button" className="mt-5 text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2" onClick={() => { setSubmitted(null); move(0); }}>
              Change my answers
            </button>
          </div>

          {(strong.length > 0 || possible.length > 0) && (
            <section className="mt-8">
              <h3 className="text-xl font-bold text-[var(--sc-blue-900)]">Funding paths to look at</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
                Start with these. Each result shows why it may fit, the official source and the simplest next action.
              </p>
              <div className="mt-5 space-y-5">
                {[...strong, ...possible].map(pathway => <FundingPathwayCard key={pathway.id} pathway={pathway} />)}
              </div>
            </section>
          )}

          <section id="project-enquiry" className="sc-card mt-8 bg-[var(--sc-blue-50)] p-6">
            <h3 className="text-xl font-bold text-[var(--sc-blue-900)]">Want help turning this into a project?</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
              Send SiteComms the requirement and we can review the communications scope and point you toward suitable providers. We do not approve funding or forward your enquiry to providers automatically.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ProjectHelpLauncher
                mode="funding_help"
                sourceTopic="funding_pathways"
                buttonLabel="Send SiteComms my project"
                context={enquiryContext}
                className="sc-btn-primary"
              />
              <Link href="/funding" className="sc-btn-secondary">Read the funding guide</Link>
            </div>
          </section>

          {(secondary.length > 0 || excluded.length > 0) && (
            <details className="sc-card mt-6 bg-white p-5">
              <summary className="cursor-pointer font-bold text-[var(--sc-blue-900)]">Other reviewed routes ({secondary.length + excluded.length})</summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">
                These are closed, monitoring-only, repayable, or outside the basic scope of your answers. They are kept here for transparency rather than placed in the main result.
              </p>
              <div className="mt-5 space-y-5">
                {[...secondary, ...excluded].map(pathway => <FundingPathwayCard key={pathway.id} pathway={pathway} secondary />)}
              </div>
            </details>
          )}

          <details className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5 text-sm leading-relaxed text-[var(--sc-slate)]">
            <summary className="cursor-pointer font-semibold text-[var(--sc-blue-900)]">Important limitations</summary>
            <p className="mt-3">{assessment.result.coverage_note}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">{assessment.limitations.map(item => <li key={item}>{item}</li>)}</ul>
          </details>
        </section>
      )}

      <noscript>
        <p className="sc-card mt-6 p-5">The interactive checker needs JavaScript. The <a href="/funding" className="underline">funding guide and state pages</a> provide the same programme evidence and official contact routes without running the tool.</p>
      </noscript>
    </div>
  );
}
