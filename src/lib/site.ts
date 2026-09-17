export const site = {
  name: "SiteComms Australia",
  legalName: "SiteComms Australia",
  operator: "T3 Labs",
  locale: "en-AU",
  country: "AU",
  currency: "AUD",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sitecomms.com.au",
  description:
    "Australian information and planning resource for IP paging, PA, bell, intercom and integrated communication systems, including pricing and finance/leasing tools.",
} as const;

export const locale = {
  market: "AU",
  currency: "AUD",
  gstLabel: "GST",
  countryName: "Australia",
} as const;

export const authors = {
  shaun: {
    name: "Shaun Carter",
    role: "Editor",
    note: "Reviews technical, pricing and specification content for SiteComms Australia.",
  },
} as const;

export const tagline = "Connected communication for complex sites";
