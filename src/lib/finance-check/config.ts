export const ORGANISATION_TYPES = [
  { value: "government_school", label: "Government school", group: "Education" },
  { value: "catholic_school", label: "Catholic school", group: "Education" },
  { value: "independent_school", label: "Independent school", group: "Education" },
  { value: "tertiary", label: "University / TAFE / tertiary", group: "Education" },
  { value: "early_learning", label: "Early childhood / childcare", group: "Education" },
  { value: "aged_care", label: "Aged care / retirement village", group: "Health & care" },
  { value: "healthcare", label: "Healthcare / medical", group: "Health & care" },
  { value: "government", label: "Government / public-sector organisation", group: "Public sector" },
  { value: "local_government", label: "Local government / council", group: "Public sector" },
  { value: "commercial", label: "Office / commercial business", group: "Commercial & other" },
  { value: "industrial", label: "Warehouse / industrial / manufacturing", group: "Commercial & other" },
  { value: "hospitality_events", label: "Hospitality / venue / events", group: "Commercial & other" },
  { value: "nonprofit", label: "Charity / not-for-profit", group: "Commercial & other" },
  { value: "other", label: "Other organisation", group: "Commercial & other" },
] as const;

export type OrganisationType = (typeof ORGANISATION_TYPES)[number]["value"];

export const PROJECT_VALUE_BANDS = [
  { value: "under_10", label: "Under $10,000", low: 0, high: 10000 },
  { value: "10_20", label: "$10,000 – $20,000", low: 10000, high: 20000 },
  { value: "20_40", label: "$20,000 – $40,000", low: 20000, high: 40000 },
  { value: "40_60", label: "$40,000 – $60,000", low: 40000, high: 60000 },
  { value: "60_100", label: "$60,000 – $100,000", low: 60000, high: 100000 },
  { value: "100_250", label: "$100,000 – $250,000", low: 100000, high: 250000 },
  { value: "250_plus", label: "$250,000+", low: 250000, high: null },
  { value: "unsure", label: "I’m not sure yet", low: null, high: null },
] as const;

export type ProjectValueBand = (typeof PROJECT_VALUE_BANDS)[number]["value"] | "SiteComms_estimate";

export const SITE_SIZE_BANDS = [
  { value: "1_10", label: "1–10 areas" },
  { value: "11_20", label: "11–20 areas" },
  { value: "21_40", label: "21–40 areas" },
  { value: "41_75", label: "41–75 areas" },
  { value: "76_100", label: "76–100 areas" },
  { value: "100_plus", label: "100+ areas" },
  { value: "unsure", label: "Not sure" },
] as const;

export type SiteSizeBand = (typeof SITE_SIZE_BANDS)[number]["value"];

export const WEEKLY_BUDGETS = [
  { value: "under_250", label: "Under $250 / week" },
  { value: "250_500", label: "$250–$500 / week" },
  { value: "500_1000", label: "$500–$1,000 / week" },
  { value: "1000_2000", label: "$1,000–$2,000 / week" },
  { value: "2000_plus", label: "$2,000+ / week" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const MONTHLY_BUDGETS = [
  { value: "under_1000", label: "Under $1,000 / month" },
  { value: "1000_2000", label: "$1,000–$2,000 / month" },
  { value: "2000_4000", label: "$2,000–$4,000 / month" },
  { value: "4000_8000", label: "$4,000–$8,000 / month" },
  { value: "8000_plus", label: "$8,000+ / month" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export type PaymentFrequency = "weekly" | "monthly";
export type PaymentBudget =
  | (typeof WEEKLY_BUDGETS)[number]["value"]
  | (typeof MONTHLY_BUDGETS)[number]["value"];

export const UPFRONT_BANDS = [
  { value: "none", label: "Nothing upfront" },
  { value: "up_to_10", label: "Up to 10%" },
  { value: "10_20", label: "10–20%" },
  { value: "20_30", label: "20–30%" },
  { value: "30_50", label: "30–50%" },
  { value: "50_plus", label: "50%+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export type UpfrontBand = (typeof UPFRONT_BANDS)[number]["value"];

export const RESULT_COPY = {
  strong: {
    eyebrow: "Strong possibility worth exploring",
    headline: "A finance pathway looks realistic enough to discuss",
    body:
      "Your answers fit the kind of equipment-finance conversation Australian lenders and technology-finance providers publicly support. This is not an approval, but there is enough information for a useful next step with a specialist.",
  },
  good: {
    eyebrow: "A finance pathway may be available",
    headline: "There is a reasonable finance conversation to have",
    body:
      "Your project has enough shape to explore equipment finance or leasing. A provider would still need to assess the organisation, equipment, transaction and credit position before offering terms.",
  },
  tailored: {
    eyebrow: "Tailored finance pathway",
    headline: "This project is better suited to a specialist finance discussion",
    body:
      "Larger projects often need a tailored structure rather than a simple online estimate. That does not rule finance out; it means the provider needs to understand the equipment, installation scope, organisation and payment structure.",
  },
  early: {
    eyebrow: "Finance may still be worth exploring",
    headline: "You can start the conversation before every number is final",
    body:
      "The project is still early or some information is open, but finance can still be discussed. SiteComms can help firm up the communications scope before you approach a provider.",
  },
} as const;

export type FinanceResultLevel = keyof typeof RESULT_COPY;

export const DISCLAIMER =
  "SiteComms does not provide finance, financial advice, credit assessment or approval. This checker is preliminary guidance only. It does not assess creditworthiness, affordability, rates, tax treatment or formal authority to borrow or lease. Public-sector rules are summarised from reviewed public sources and should be confirmed with the relevant organisation. Actual finance availability and terms are determined by the finance provider.";
