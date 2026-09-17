// Single source of truth for all pricing. No component should hard-code prices.
// Provisional Australian planning values must be approved by T3 Labs before launch.

import type { EntryIntercomType, Tier } from "./types";

export const estimateLowMultiplier = 0.8;
export const estimateHighMultiplier = 1;

export const pricingConfig = {
  reviewedAt: "2026-09-17",
  reviewedAtLabel: "17 September 2026",
  headendPrice: 4895,
  estimateLowMultiplier,
  estimateHighMultiplier,
  monitoringAnnualPrice: 525, // optional service: indicative SiteComms model assumption, not a market-wide package
  fireInterfacePrice: 1535,
  endpointWarningThreshold: 30,
  /**
   * Site-wide structured cabling is excluded from all estimates.
   * Generic wording: the calculator serves schools, aged care, industrial and
   * commercial sites - do not apply school procurement rules to everyone.
   */
  cablingDisclaimer:
    "Site-wide structured cabling is excluded from your estimate and must be scoped separately by an appropriate ICT / cabling contractor. If suitable cabling already exists near each device location, the estimates apply as shown.",
  cablingDisclaimerSchool:
    "For Australian state-school projects, confirm the current education authority requirements for approved ICT installation contractors with the school property / IT team.",

  areas: {
    standardIndoor: {
      label: "Standard indoor rooms",
      example: "Classrooms, offices, meeting rooms, wards, staff rooms",
      info: "Any standard-sized room needing one speaker. A school classroom, a hospital ward, a meeting room - if it is a room, it counts here.",
      priceA: 525,
      priceB: 555,
      speakersPerArea: 1,
    },
    largeIndoor: {
      label: "Large indoor spaces",
      example: "Assembly halls, gymnasiums, large common areas, workshops",
      info: "Bigger indoor spaces need multiple ceiling speakers spread out for even coverage.",
      priceA: 525, // per ceiling speaker
      priceB: 555,
      speakersPerArea: 4,
    },
    outdoor: {
      label: "Outdoor areas",
      example: "Courtyards, car parks, loading areas, yards, playgrounds",
      info: "Covered or sheltered outdoor areas using weatherproof horn speakers.",
      priceA: 525, // per horn speaker
      priceB: 555,
      speakersPerArea: 2,
    },
    largeOutdoor: {
      label: "Large outdoor / sports areas",
      example: "Sports fields, large yards, large open grounds",
      info: "Large open outdoor areas using pole-mounted horn speakers for long-range coverage.",
      priceA: 770, // per pole-mounted horn
      priceB: 850,
      speakersPerArea: 2,
    },
  },

  intercoms: {
    voicePanel: { label: "Voice intercom", priceA: 525, priceB: 525 },
    videoPanel: { label: "Video intercom", priceA: 710, priceB: 710 },
    twoWayButton: { priceA: 230, priceB: 230 },
    additionalControlStation: { priceA: 1500, priceB: 1500 },
  },

  defaults: {
    largeIndoorSpeakers: 4,
    outdoorHorns: 2,
    largeOutdoorHorns: 2,
    entryIntercomType: "voice" as EntryIntercomType,
  },
} as const;

/* Tier C prices identically to tier B: site-wide cabling is excluded from all
   estimates and handled by the cabling disclaimer + partner referral instead. */
export function unitPrice(priceA: number, priceB: number, tier: Tier): number {
  if (tier === "A") return priceA;
  return priceB;
}

export function formatAUD(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

/** Rounded display for the sticky footer, e.g. 14585 -> $14.5k */
export function formatK(n: number): string {
  const k = n / 1000;
  return "$" + (Math.round(k * 10) / 10).toFixed(1).replace(/\.0$/, "") + "k";
}
