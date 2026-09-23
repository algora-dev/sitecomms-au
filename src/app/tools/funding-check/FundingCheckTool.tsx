"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProjectStateSelector, useProjectState } from "@/components/project-state";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { FundingPathwayCard } from "@/components/funding/FundingPathwayCard";
import { assessFundingPathways } from "@/lib/funding/assessment";
import {
  FUNDING_FEATURES,
  FUNDING_FIELDS,
  featureLabel,
  fieldLabel,
  type FundingFeature,
  type FundingInput,
  type FundingField,
} from "@/lib/funding/questions";
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

const SIMPLE_STAGE_OPTIONS = [
  ["planning", "Planning / early stage"],
  ["quotes", "Getting quotes — nothing committed yet"],
  ["committed", "Order, deposit or contract already committed"],
  ["started", "Work already started"],
  ["completed", "Work completed / equipment purchased"],
  ["unknown", "Not sure"],
] as const;

function applicantOptions(siteType?: string) {
  if (siteType?.endsWith("_school")) return [
    ["school_authority", "The school / school system / governing body"],
    ["school_parent_body", "A P&C / P&F / parents’ association"],
    ["not_for_profit", "A not-for-profit / charity / property body"],
    ["other_government", "Another government body"],
    ["unknown", "Not sure"],
  ] as const;
  if (siteType === "residential_aged_care" || siteType === "retirement_village") return [
    ["not_for_profit", "A not-for-profit / charity operator"],
    ["private_business", "A private operator / business"],
    ["local_government", "A council / local government body"],
    ["other_government", "Another government organisation"],
    ["unknown", "Not sure"],
  ] as const;
  if (siteType === "community") return [
    ["not_for_profit", "An incorporated not-for-profit / charity"],
    ["local_government", "A council / local government body"],
    ["social_enterprise", "A social enterprise"],
    ["unincorporated_group", "An unincorporated community group"],
    ["private_business", "A private business / operator"],
    ["unknown", "Not sure"],
  ] as const;
  return [
    ["not_for_profit", "A not-for-profit / charity"],
    ["local_government", "A council / local government body"],
    ["other_government", "Another government organisation"],
    ["private_business", "A private business / operator"],
    ["social_enterprise", "A social enterprise"],
    ["unknown", "Not sure"],
  ] as const;
}

export default function FundingCheckTool() {
  const state = useProjectState();
  const [answers, setAnswers] = useState<FundingInput>({ features: [] });
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
    const updateClock = () => setClock(new Date().toISOString());
    const interval = window.setInterval(updateClock, 60_000);
    document.addEventListener("visibilitychange", updateClock);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", updateClock);
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

  function toggleFeature(feature: FundingFeature) {
    setAnswers(previous => {
      const current = previous.features ?? [];
      const features = current.includes(feature)
        ? current.filter(item => item !== feature)
        : [...current, feature];
      return { ...previous, features };
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
    if (!answers.applicant_type || !answers.stage) {
      setFormError("Choose who owns or runs the site and the project stage. Use “Not sure” if needed.");
      return;
    }
    if (!answers.features?.length) {
      setFormError("Choose at least one thing you want the communications system to do.");
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

  function select(field: FundingField, options: readonly (readonly [string, string])[]) {
    const definition = FUNDING_FIELDS[field];
    return (
      <div key={field}>
        <label htmlFor={`funding-${field}`} className="block text-sm font-semibold leading-relaxed text-[var(--sc-blue-900)]">
          {definition.label} *
        </label>
        <select
          id={`funding-${field}`}
          value={answers[field] ?? ""}
          required
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
  const mainPathways = [...strong, ...possible];

  const resultHeadline = strong.length
    ? "Yes — there are funding avenues worth checking."
    : possible.length
      ? "There may be a funding avenue for this project."
      : "No clear current funding avenue was identified.";

  const resultIntro = strong.length
    ? "Based on the basics you supplied, the routes below are the strongest researched matches. They still need to be confirmed with the programme owner."
    : possible.length
      ? "One or more researched routes may be relevant, but a programme condition or current-status point needs checking before you rely on it."
      : "We did not find a current route in the reviewed catalogue that clearly matches these answers. You can still ask SiteComms to review the project or check the official funding guides.";

  const selectedFeatureLabels = (answers.features ?? []).map(featureLabel);
  const enquiryContext: Record<string, string> | undefined = assessment ? {
    funding_assessment: "Funding pathway shortlist only — no grant eligibility, award or approval determined.",
    project_state: projectStateName(state),
    catalogue: assessment.result.catalogue_version,
    assessed_at: assessment.generated_at,
    site_and_applicant: `${fieldLabel("site_type", answers.site_type ?? "")} / ${fieldLabel("applicant_type", answers.applicant_type ?? "")}`,
    project_stage: fieldLabel("stage", answers.stage ?? ""),
    system_features: selectedFeatureLabels.join("; "),
    reviewed_pathways: mainPathways.map(pathway => `${pathway.id}: ${pathway.availability}; ${pathway.match}`).join("; "),
  } : undefined;

  return (
    <div id="funding-tool" className="scroll-mt-24">
      <form onSubmit={submit} className="sc-card bg-white p-5 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">
          Step {step + 1} of 2 · about one minute
        </p>
        <h2 ref={heading} tabIndex={-1} className="mt-2 text-2xl font-bold text-[var(--sc-blue-900)]">
          {step === 0 ? "Where is the project?" : "What do you need the system to do?"}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
          {step === 0
            ? "Choose the state and the type of site. That determines which funding research is relevant."
            : "Tell us who owns or runs the site, where the project is up to, and the functions you need. You do not need to know grant terminology or the exact product."}
        </p>

        {step === 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <ProjectStateSelector
              required
              name="funding-state"
              label="State or territory"
              wrapperClassName=""
              labelClassName="block text-sm font-semibold leading-relaxed text-[var(--sc-blue-900)]"
              selectClassName="mt-2 w-full min-w-0 rounded-lg border border-[var(--sc-border)] bg-white px-3 py-3 text-sm text-[var(--sc-blue-900)]"
            />
            {select("site_type", SIMPLE_SITE_OPTIONS)}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {select("applicant_type", applicantOptions(answers.site_type))}
              {select("stage", SIMPLE_STAGE_OPTIONS)}
            </div>

            <fieldset className="mt-7">
              <legend className="text-sm font-semibold leading-relaxed text-[var(--sc-blue-900)]">
                What do you want the communications system to do? *
              </legend>
              <p className="mt-1 text-sm leading-relaxed text-[var(--sc-slate)]">Select everything that applies. Broad answers are fine.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {FUNDING_FEATURES.map(([value, label]) => {
                  const checked = answers.features?.includes(value) ?? false;
                  return (
                    <label key={value} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${checked ? "border-[var(--sc-blue-700)] bg-[var(--sc-blue-50)]" : "border-[var(--sc-border)] bg-white"}`}>
                      <input
                        type="checkbox"
                        name="funding-features"
                        value={value}
                        checked={checked}
                        onChange={() => toggleFeature(value)}
                        className="mt-0.5 h-4 w-4 shrink-0"
                      />
                      <span className="text-sm font-medium leading-relaxed text-[var(--sc-blue-900)]">{label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}

        {formError && <p role="alert" className="mt-5 rounded-lg border border-[var(--sc-border)] p-3 text-sm font-semibold">{formError}</p>}

        <div className="mt-7 flex flex-wrap gap-3">
          {step > 0 && <button type="button" onClick={() => move(step - 1)} className="sc-btn-secondary">Back</button>}
          <button type="submit" className="sc-btn-primary">{step === 0 ? "Continue" : "Check funding options"}</button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">
          No contact details are required. This is a quick pathway check, not a funding application or final eligibility decision.
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
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--sc-blue-700)]">Your funding result</p>
            <h2 id="funding-result-heading" ref={resultHeading} tabIndex={-1} className="mt-3 text-2xl font-bold leading-tight text-[var(--sc-blue-900)]">
              {resultHeadline}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">{resultIntro}</p>
            <p className="mt-4 text-sm font-semibold text-[var(--sc-blue-900)]">
              {projectStateName(state)} · {fieldLabel("site_type", answers.site_type ?? "")} · {fieldLabel("stage", answers.stage ?? "")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Selected communications features">
              {selectedFeatureLabels.map(label => (
                <span key={label} className="rounded-full border border-[var(--sc-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--sc-blue-900)]">{label}</span>
              ))}
            </div>
            <button type="button" className="mt-5 text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2" onClick={() => { setSubmitted(null); move(0); }}>
              Change my answers
            </button>
          </div>

          {mainPathways.length > 0 && (
            <section className="mt-8">
              <h3 className="text-xl font-bold text-[var(--sc-blue-900)]">Funding avenues to check</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
                These are the routes most relevant to your answers. Open the official source for the programme rules, or ask SiteComms to help you turn the communications requirement into a project scope.
              </p>
              <div className="mt-5 space-y-5">
                {mainPathways.map(pathway => <FundingPathwayCard key={pathway.id} pathway={pathway} />)}
              </div>
            </section>
          )}

          <section id="project-enquiry" className="sc-card mt-8 bg-[var(--sc-blue-50)] p-6">
            <h3 className="text-xl font-bold text-[var(--sc-blue-900)]">Want SiteComms to help with the next step?</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
              Send us the requirement and we can review the communications scope and point you toward suitable providers. Running this checker does not send anything automatically.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ProjectHelpLauncher
                mode="funding_help"
                sourceTopic="funding_pathways"
                buttonLabel="Ask SiteComms for help"
                context={enquiryContext}
                className="sc-btn-primary"
              />
              <Link href="/funding" className="sc-btn-secondary">View funding guides</Link>
            </div>
          </section>

          {(secondary.length > 0 || excluded.length > 0) && (
            <details className="sc-card mt-6 bg-white p-5">
              <summary className="cursor-pointer font-bold text-[var(--sc-blue-900)]">Other reviewed routes</summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">
                These routes are closed, monitoring-only, repayable, or do not match the basic information you supplied. They are kept here for transparency, not as your main result.
              </p>
              <div className="mt-5 space-y-5">
                {[...secondary, ...excluded].map(pathway => <FundingPathwayCard key={pathway.id} pathway={pathway} secondary />)}
              </div>
            </details>
          )}

          <details className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5 text-sm leading-relaxed text-[var(--sc-slate)]">
            <summary className="cursor-pointer font-semibold text-[var(--sc-blue-900)]">How to read this result</summary>
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
