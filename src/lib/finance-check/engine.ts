import type { ProjectState } from "../jurisdictions";
import {
  ORGANISATION_TYPES,
  PROJECT_VALUE_BANDS,
  RESULT_COPY,
  type FinanceResultLevel,
  type OrganisationType,
  type PaymentBudget,
  type PaymentFrequency,
  type ProjectValueBand,
  type SiteSizeBand,
  type UpfrontBand,
} from "./config";
import { financeEvidenceFor, publicSchoolFinanceGuidance, type FinanceEvidence } from "./sources";

export interface FinanceAnswers {
  projectState?: ProjectState;
  organisationType?: OrganisationType;
  projectValueBand?: ProjectValueBand;
  carriedEstimateLow?: number;
  carriedEstimateHigh?: number;
  siteSizeBand?: SiteSizeBand;
  paymentFrequency: PaymentFrequency;
  paymentBudget?: PaymentBudget;
  upfrontBand?: UpfrontBand;
  source?: "pricing" | "funding" | "financing" | "other";
  fundingResult?: string;
}

export interface FinanceResult {
  level: FinanceResultLevel;
  eyebrow: string;
  headline: string;
  body: string;
  reasons: string[];
  nextStep: string;
  organisationLabel: string;
  projectValueLabel: string;
  evidence: FinanceEvidence[];
  stateGuidance?: { title: string; summary: string };
}

function organisationLabel(value?: OrganisationType): string {
  return ORGANISATION_TYPES.find((item) => item.value === value)?.label ?? "Organisation not selected";
}

function projectValueLabel(answers: FinanceAnswers): string {
  if (answers.projectValueBand === "SiteComms_estimate" && answers.carriedEstimateLow && answers.carriedEstimateHigh) {
    return `$${answers.carriedEstimateLow.toLocaleString("en-AU")}–$${answers.carriedEstimateHigh.toLocaleString("en-AU")}`;
  }
  return PROJECT_VALUE_BANDS.find((item) => item.value === answers.projectValueBand)?.label ?? "Project value not yet known";
}

function isLargeProject(answers: FinanceAnswers): boolean {
  if (answers.projectValueBand === "100_250" || answers.projectValueBand === "250_plus") return true;
  if (answers.projectValueBand === "SiteComms_estimate" && (answers.carriedEstimateHigh ?? 0) >= 100000) return true;
  return answers.siteSizeBand === "100_plus";
}

function projectValueKnown(answers: FinanceAnswers): boolean {
  return Boolean(answers.projectValueBand && answers.projectValueBand !== "unsure");
}

function budgetKnown(answers: FinanceAnswers): boolean {
  return Boolean(answers.paymentBudget && answers.paymentBudget !== "unsure");
}

function upfrontKnown(answers: FinanceAnswers): boolean {
  return Boolean(answers.upfrontBand && answers.upfrontBand !== "unsure");
}

function publicSectorResult(answers: FinanceAnswers): FinanceResult {
  const evidence = financeEvidenceFor(answers.organisationType, answers.projectState);
  const isGovernmentSchool = answers.organisationType === "government_school";
  const guidance = isGovernmentSchool ? publicSchoolFinanceGuidance(answers.projectState) : undefined;

  return {
    level: "early",
    eyebrow: isGovernmentSchool ? "Possible route — approval rules come first" : "Authority check before finance",
    headline: isGovernmentSchool
      ? guidance?.title ?? "Confirm the approved finance or lease route first"
      : "Start with the organisation's finance and approval team",
    body: isGovernmentSchool
      ? guidance?.summary ?? "Government-school finance arrangements depend on the relevant jurisdiction and contracting authority. Confirm the permitted structure before approaching a provider."
      : "Public bodies can use finance and leasing structures, but authority, procurement and borrowing rules are organisation-specific. A commercial lender's product page does not establish that your organisation may enter the arrangement.",
    reasons: [
      isGovernmentSchool
        ? "Your state changes the governance position for a government-school finance or lease arrangement."
        : "Public-sector authority and procurement rules need to be confirmed before a lender conversation becomes meaningful.",
      projectValueKnown(answers)
        ? "You already have a useful project-value range to take into that internal approval conversation."
        : "The communications scope can be estimated first if the likely finance amount is still unclear.",
      ...(answers.source === "funding" ? ["A funding shortfall does not itself create authority to borrow or lease."] : []),
    ],
    nextStep: "Ask SiteComms to help define the project and the likely finance amount, then confirm the approved contracting route with the organisation before any finance application.",
    organisationLabel: organisationLabel(answers.organisationType),
    projectValueLabel: projectValueLabel(answers),
    evidence,
    stateGuidance: guidance ? { title: guidance.title, summary: guidance.summary } : undefined,
  };
}

export function assessFinanceFit(answers: FinanceAnswers): FinanceResult {
  const publicOrganisation = answers.organisationType === "government_school"
    || answers.organisationType === "government"
    || answers.organisationType === "local_government";
  if (publicOrganisation) return publicSectorResult(answers);

  let level: FinanceResultLevel;
  if (!answers.organisationType || answers.organisationType === "other") {
    level = "early";
  } else if (isLargeProject(answers)) {
    level = "tailored";
  } else if (projectValueKnown(answers) && budgetKnown(answers) && upfrontKnown(answers)) {
    level = "strong";
  } else if (projectValueKnown(answers) && (budgetKnown(answers) || upfrontKnown(answers))) {
    level = "good";
  } else {
    level = "early";
  }

  const reasons: string[] = [];
  if (projectValueKnown(answers)) {
    reasons.push("You have a useful project-value starting point for a finance conversation.");
  } else if (answers.siteSizeBand && answers.siteSizeBand !== "unsure") {
    reasons.push("You have provided a rough site size even though the project value is not known yet.");
  } else {
    reasons.push("The project cost is still open, so the first discussion may be about defining the likely finance amount.");
  }

  if (budgetKnown(answers)) {
    reasons.push("You have indicated the regular payment range that feels workable within your budget.");
  } else {
    reasons.push("You do not need to know the exact regular payment yet; a provider can explain the available structures.");
  }

  if (answers.upfrontBand === "none") {
    reasons.push("You prefer no upfront contribution. Australian providers publicly advertise zero-deposit or high-percentage equipment finance for some qualifying transactions, but the provider decides whether that structure is available.");
  } else if (upfrontKnown(answers)) {
    reasons.push("You have indicated that an upfront contribution may be available if it helps structure the transaction.");
  }

  if (answers.source === "funding") {
    reasons.push("You came from funding planning. Keep any grant or capital-program conditions separate from a finance enquiry and confirm that combining the two is permitted.");
  }

  const isSchool = answers.organisationType === "catholic_school" || answers.organisationType === "independent_school";
  if (isSchool) {
    reasons.push("Australian specialist providers publicly offer equipment and technology finance to non-government schools, subject to provider assessment and the school's own governance approvals.");
  }

  if (answers.organisationType === "tertiary" || answers.organisationType === "healthcare" || answers.organisationType === "aged_care") {
    reasons.push("Sector-specific equipment finance is publicly available in Australia, but the legal applicant and provider assessment still determine the actual structure.");
  }

  const copy = RESULT_COPY[level];
  return {
    level,
    eyebrow: copy.eyebrow,
    headline: copy.headline,
    body: copy.body,
    reasons,
    nextStep: "Tell SiteComms about the project. We can review the communications scope and suggest a finance/provider route to investigate. If we suggest a provider, we give you its public contact details; your enquiry is not forwarded automatically.",
    organisationLabel: organisationLabel(answers.organisationType),
    projectValueLabel: projectValueLabel(answers),
    evidence: financeEvidenceFor(answers.organisationType, answers.projectState),
  };
}
