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

export interface FinanceAnswers {
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

export function assessFinanceFit(answers: FinanceAnswers): FinanceResult {
  const publicOrganisation = answers.organisationType === "government_school"
    || answers.organisationType === "government"
    || answers.organisationType === "local_government";
  if (publicOrganisation) {
    return {
      level: "early",
      eyebrow: "Confirm authority before exploring finance",
      headline: "Start with your organisation’s finance and approval team",
      body: "A known budget does not establish authority to borrow, lease or enter a supplier payment arrangement. This version has not checked your jurisdiction’s rules. Confirm the permitted structure and required approvals before approaching a provider.",
      reasons: [
        "Government schools and public organisations need an organisation-specific governance check; this is not a credit or eligibility result.",
        "Confirm who can approve the commitment, which procurement process applies and whether ongoing payments are permitted.",
        ...(answers.source === "funding" ? ["A funding shortfall does not itself establish authority to use finance."] : []),
      ],
      nextStep: "Confirm the approval route with the project owner. SiteComms can help clarify the communications scope, but cannot determine borrowing powers or finance approval.",
      organisationLabel: organisationLabel(answers.organisationType),
      projectValueLabel: projectValueLabel(answers),
    };
  }
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
    reasons.push("You prefer no upfront contribution. This is a preference, not confirmation that a provider can offer that structure.");
  } else if (upfrontKnown(answers)) {
    reasons.push("You have indicated that an upfront contribution may be available if it helps structure the transaction.");
  }

  if (answers.source === "funding") {
    reasons.push("You came from funding planning. Keep any funding conditions separate from a finance enquiry and check that combining the two would be permitted.");
  }

  const isSchool = answers.organisationType === "government_school" || answers.organisationType === "catholic_school" || answers.organisationType === "independent_school";
  if (isSchool) {
    reasons.push("School finance arrangements can have additional governance, accounting or approval requirements, so the exact structure should be checked with the school and finance provider.");
  }

  if (answers.organisationType === "tertiary" || answers.organisationType === "healthcare" || answers.organisationType === "aged_care") {
    reasons.push("Confirm the legal applicant and whether it is publicly controlled; sector selection alone does not establish authority to finance equipment.");
  }
  const copy = RESULT_COPY[level];
  return {
    level,
    eyebrow: copy.eyebrow,
    headline: copy.headline,
    body: copy.body,
    reasons,
    nextStep: "Tell SiteComms about the project for a scope review and a suitable next step. Where a provider is suggested, we reply with public contact details; we do not forward your enquiry.",
    organisationLabel: organisationLabel(answers.organisationType),
    projectValueLabel: projectValueLabel(answers),
  };
}
