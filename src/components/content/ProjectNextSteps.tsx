import Link from "next/link";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import type { EnquiryMode } from "@/components/enquiry/ProjectEnquiryModal";

export default function ProjectNextSteps({
  sourceTopic,
  mode = "project_help",
  title = "Get a more specific answer for your project",
  intro = "Use any of the planning tools without contacting a supplier, or send the project straight to SiteComms for a human review.",
  context,
}: {
  sourceTopic: string;
  mode?: EnquiryMode;
  title?: string;
  intro?: string;
  context?: Record<string, string>;
}) {
  return (
    <section className="sc-container max-w-[1150px] py-6" aria-labelledby={`${sourceTopic}-next-steps-heading`}>
      <div className="rounded-2xl border border-[var(--sc-border)] bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Choose your next step</p>
          <h2 id={`${sourceTopic}-next-steps-heading`} className="mt-2 text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            {title}
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">{intro}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Link href="/pricing-tool" className="group rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 no-underline transition hover:border-[var(--sc-blue-300)]">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">1 · Price</p>
            <h3 className="mt-2 font-semibold text-[var(--sc-blue-900)]">Get a ballpark installed range</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Enter the site and coverage areas to get an immediate planning estimate.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-[var(--sc-blue-700)] group-hover:underline">Use pricing tool →</span>
          </Link>

          <Link href="/tools/funding-check" className="group rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 no-underline transition hover:border-[var(--sc-blue-300)]">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">2 · Funding</p>
            <h3 className="mt-2 font-semibold text-[var(--sc-blue-900)]">Check researched funding pathways</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Check selected Australian routes by state, organisation and project scope.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-[var(--sc-blue-700)] group-hover:underline">Check funding →</span>
          </Link>

          <Link href="/tools/finance-check" className="group rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 no-underline transition hover:border-[var(--sc-blue-300)]">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">3 · Finance</p>
            <h3 className="mt-2 font-semibold text-[var(--sc-blue-900)]">See whether finance is worth discussing</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A preparation check for equipment finance or leasing, not a credit approval.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-[var(--sc-blue-700)] group-hover:underline">Check finance fit →</span>
          </Link>

          <div className="rounded-2xl border border-[var(--sc-teal)] bg-[var(--sc-blue-50)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-teal-strong)]">Or skip the tools</p>
            <h3 className="mt-2 font-semibold text-[var(--sc-blue-900)]">Ask SiteComms to review the project</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">We review what you send and reply with the next steps or providers we think may be worth contacting.</p>
            <ProjectHelpLauncher
              mode={mode}
              sourceTopic={sourceTopic}
              buttonLabel="Ask SiteComms to review my project"
              className="sc-btn-primary mt-4 inline-flex cursor-pointer"
              context={context}
            />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] px-4 py-3 text-sm leading-relaxed text-[var(--sc-slate)]">
          <strong className="text-[var(--sc-blue-900)]">Your project stays with SiteComms.</strong> We do not automatically forward your enquiry, contact details, attachments or tool answers to installers or suppliers. We reply to you with our suggested next step and, where useful, public provider contact details. You decide whether to contact anyone. If you ask for help after using a tool, its result can be included so you do not have to explain the project again.
        </div>
      </div>
    </section>
  );
}
