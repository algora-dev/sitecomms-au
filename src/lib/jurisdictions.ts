/** Project location is context, not a pricing multiplier or a funding decision. */
export const JURISDICTIONS = [
  { code: "ACT", name: "Australian Capital Territory", slug: "australian-capital-territory", educationUrl: "https://www.act.gov.au/education-and-training" },
  { code: "NSW", name: "New South Wales", slug: "new-south-wales", educationUrl: "https://education.nsw.gov.au/" },
  { code: "NT", name: "Northern Territory", slug: "northern-territory", educationUrl: "https://education.nt.gov.au/" },
  { code: "QLD", name: "Queensland", slug: "queensland", educationUrl: "https://education.qld.gov.au/" },
  { code: "SA", name: "South Australia", slug: "south-australia", educationUrl: "https://www.education.sa.gov.au/" },
  { code: "TAS", name: "Tasmania", slug: "tasmania", educationUrl: "https://www.decyp.tas.gov.au/" },
  { code: "VIC", name: "Victoria", slug: "victoria", educationUrl: "https://www.education.vic.gov.au/" },
  { code: "WA", name: "Western Australia", slug: "western-australia", educationUrl: "https://www.education.wa.edu.au/" },
] as const;
export type ProjectState = typeof JURISDICTIONS[number]["code"];
export const PROJECT_STATE_KEY = "sitecomms.project-state.v1";
export function parseProjectState(value: unknown): ProjectState | undefined {
  if (typeof value !== "string") return undefined;
  const code = value.trim().toUpperCase();
  return JURISDICTIONS.find((item) => item.code === code)?.code;
}
export function projectStateName(value: unknown): string {
  return JURISDICTIONS.find((item) => item.code === parseProjectState(value))?.name ?? "Australia-wide";
}
/** Preserve existing tool configuration and hash, without creating open redirects. */
export function withProjectState(href: string, state?: ProjectState): string {
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("\\")) return href;
  const url = new URL(href, "https://sitecomms.invalid");
  if (state) url.searchParams.set("state", state);
  else url.searchParams.delete("state");
  return `${url.pathname}${url.search}${url.hash}`;
}

/** A named funding guide supplies project context; this does not infer location or authorise a programme. */
export function projectStateFromFundingPath(pathname: string): ProjectState | undefined {
  const match = /^\/funding\/([a-z-]+)\/?$/.exec(pathname);
  return match ? JURISDICTIONS.find(item => item.slug === match[1])?.code : undefined;
}
