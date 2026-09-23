import type { ProjectState } from "../jurisdictions";
import type { OrganisationType } from "./config";

export type FinanceEvidenceKind = "provider" | "governance";

export interface FinanceEvidence {
  id: string;
  name: string;
  url: string;
  kind: FinanceEvidenceKind;
  note: string;
  reviewed: string;
}

export const FINANCE_EVIDENCE: Record<string, FinanceEvidence> = {
  nab_equipment: {
    id: "nab_equipment",
    name: "NAB — business vehicle and equipment loan",
    url: "https://www.nab.com.au/business/loans-and-finance/vehicle-or-equipment/vehicle-and-equipment-loan",
    kind: "provider",
    note: "NAB publicly offers equipment finance for business equipment including computers and fit-outs, subject to lending criteria.",
    reviewed: "2026-09-23",
  },
  westpac_equipment: {
    id: "westpac_equipment",
    name: "Westpac — vehicle and equipment finance",
    url: "https://www.westpac.com.au/business-banking/loans-finance/vehicle-equipment-finance/",
    kind: "provider",
    note: "Westpac publicly offers business equipment loans, finance leases and hire purchase in Australia, subject to eligibility and credit criteria.",
    reviewed: "2026-09-23",
  },
  commbank_technology: {
    id: "commbank_technology",
    name: "CommBank — technology equipment finance",
    url: "https://www.commbank.com.au/business/loans-and-finance/car-and-equipment-finance/technology-equipment-finance.html",
    kind: "provider",
    note: "CommBank publicly offers technology leasing with flexible terms and lists audio-visual and office technology among financeable equipment categories.",
    reviewed: "2026-09-23",
  },
  boq_equipment: {
    id: "boq_equipment",
    name: "BOQ — equipment and vehicle finance",
    url: "https://www.boq.com.au/business/loan-and-finance/equipment-and-vehicle-finance/",
    kind: "provider",
    note: "BOQ publicly offers equipment loans, finance leases, commercial hire purchase and related business equipment-finance structures.",
    reviewed: "2026-09-23",
  },
  vestone_education: {
    id: "vestone_education",
    name: "Vestone Capital — school equipment finance",
    url: "https://vestonecapital.com/school-equipment-finance/",
    kind: "provider",
    note: "Vestone publicly describes education equipment finance for independent, Catholic and government schools and universities, including AV and technology equipment.",
    reviewed: "2026-09-23",
  },
  vestone_vic_public: {
    id: "vestone_vic_public",
    name: "Vestone Capital — Victorian public-school operating leases",
    url: "https://vestonecapital.com/equipment-finance-for-victorian-public-schools/",
    kind: "provider",
    note: "Vestone states it is a preferred supplier for operating-lease facilities for ICT products to Victorian government schools under contract CW48447.",
    reviewed: "2026-09-23",
  },
  finlease_education: {
    id: "finlease_education",
    name: "Finlease — technology finance for education",
    url: "https://finlease.com.au/finance/technology-equipment-finance/technology-finance-education/",
    kind: "provider",
    note: "Finlease publicly markets technology-finance and rental solutions for schools and education organisations and describes nationwide operations.",
    reviewed: "2026-09-23",
  },
  anz_health: {
    id: "anz_health",
    name: "ANZ — health business banking",
    url: "https://www.anz.com.au/business/industries/health/",
    kind: "provider",
    note: "ANZ publicly describes equipment loans and tailored finance for healthcare sectors including aged care, retirement living and childcare.",
    reviewed: "2026-09-23",
  },
  commbank_health: {
    id: "commbank_health",
    name: "CommBank — medical equipment finance",
    url: "https://www.commbank.com.au/business/loans-and-finance/car-and-equipment-finance/medical-equipment-finance.html",
    kind: "provider",
    note: "CommBank publicly offers healthcare equipment finance for technology, fit-outs and other equipment, subject to credit approval and asset suitability.",
    reviewed: "2026-09-23",
  },
  act_procurement: {
    id: "act_procurement",
    name: "Procurement ACT — ACT Government procurement framework",
    url: "https://www.procurement.act.gov.au/policy-and-resources/legislation",
    kind: "governance",
    note: "ACT procurement law expressly includes acquisition by purchase, lease or rent, but the public source reviewed does not establish school-level authority to borrow or enter a particular finance arrangement.",
    reviewed: "2026-09-23",
  },
  qld_school: {
    id: "qld_school",
    name: "Queensland Department of Education — state-school device financing models",
    url: "https://education.qld.gov.au/parents-and-carers/school-information/student-device-programs/one-to-one-models",
    kind: "governance",
    note: "Queensland public guidance shows school-provided financing and lease/hire arrangements can exist in a state-school context, but it does not establish general authority for a school to borrow for communications equipment.",
    reviewed: "2026-09-23",
  },
  nsw_school: {
    id: "nsw_school",
    name: "NSW Department of Education — financial management policy",
    url: "https://education.nsw.gov.au/policy-library/policies/pd-2020-0472",
    kind: "governance",
    note: "NSW publishes a current school financial-management policy and identifies separate lease-accounting procedures; detailed school procedures are staff-only, so an external checker cannot establish school-level authority.",
    reviewed: "2026-09-23",
  },
  vic_school: {
    id: "vic_school",
    name: "Victoria Department of Education — school asset and lease policy",
    url: "https://www2.education.vic.gov.au/pal/asset-and-inventory-management-finance-manual-section-13/policy",
    kind: "governance",
    note: "Victorian government schools may enter operating leases, while school councils do not have authority to borrow and cannot enter finance leases.",
    reviewed: "2026-09-23",
  },
  wa_school: {
    id: "wa_school",
    name: "WA Department of Education — councils and boards procedures",
    url: "https://www.education.wa.edu.au/web/policies/-/councils-and-boards-in-public-schools-procedures",
    kind: "governance",
    note: "WA public-school council/board governance requires a statement that the council or board will not borrow money or obtain credit; procurement and department approval routes therefore matter.",
    reviewed: "2026-09-23",
  },
  sa_school: {
    id: "sa_school",
    name: "SA Department for Education — School Governance Administrative Instruction",
    url: "https://www.education.sa.gov.au/docs/psp/governing-council/governing-council/school-governance-administrative-instruction.pdf",
    kind: "governance",
    note: "South Australian governing councils can borrow only with the Minister's written consent, so an ordinary commercial finance application is not automatically a school-level option.",
    reviewed: "2026-09-23",
  },
  nt_school: {
    id: "nt_school",
    name: "NT Department of Education and Training — FARMS manual",
    url: "https://education.nt.gov.au/media/docs/policies/resource-management/farms-manual/financial-and-resource-management-for-schools-farms-manual-updated.pdf",
    kind: "governance",
    note: "NT public-school guidance treats finance leases as borrowing requiring CE approval unless an approved exception applies; operating leases are not treated as borrowing.",
    reviewed: "2026-09-23",
  },
  tas_school: {
    id: "tas_school",
    name: "Tasmania DECYP — Ministerial Instruction No 12 for School Associations",
    url: "https://publicdocumentcentre.education.tas.gov.au/library/Document%20Centre/School-Associations-Ministerial-Instruction-No-12.pdf",
    kind: "governance",
    note: "Tasmanian school associations need Secretary approval before borrowing money and before entering contracts over specified thresholds.",
    reviewed: "2026-09-23",
  },
};

const STATE_SCHOOL_SOURCE: Partial<Record<ProjectState, string>> = {
  ACT: "act_procurement",
  QLD: "qld_school",
  NSW: "nsw_school",
  VIC: "vic_school",
  WA: "wa_school",
  SA: "sa_school",
  NT: "nt_school",
  TAS: "tas_school",
};

export interface PublicSchoolFinanceGuidance {
  title: string;
  summary: string;
  sourceIds: string[];
}

export function publicSchoolFinanceGuidance(state?: ProjectState): PublicSchoolFinanceGuidance {
  if (state === "VIC") {
    return {
      title: "Operating lease may be a real route — finance lease is not",
      summary: "Victorian government schools can enter operating leases under the Department's finance policy, but school councils cannot borrow money or enter finance leases. Confirm the approved operating-lease/procurement route for the proposed communications equipment.",
      sourceIds: ["vic_school", "vestone_vic_public"],
    };
  }
  if (state === "WA") {
    return {
      title: "Use an approved department/procurement route",
      summary: "WA public-school councils and boards are not to borrow money or obtain credit. A standard business loan should therefore not be treated as a school-controlled option; confirm any approved lease or procurement structure with the Department.",
      sourceIds: ["wa_school"],
    };
  }
  if (state === "SA") {
    return {
      title: "Borrowing needs specific approval",
      summary: "South Australian governing councils can borrow only with the Minister's written consent. Finance may still be worth discussing, but only after the school confirms the permitted approval and procurement route.",
      sourceIds: ["sa_school"],
    };
  }
  if (state === "NT") {
    return {
      title: "Lease structure matters",
      summary: "Northern Territory school bodies may use operating leases without CE approval, while finance leases are treated as borrowing and usually require CE approval unless a documented exception applies. Communications equipment should be checked against the current FARMS rules before proceeding.",
      sourceIds: ["nt_school"],
    };
  }
  if (state === "TAS") {
    return {
      title: "School-association approval rules apply",
      summary: "Tasmanian school associations must seek Secretary approval before borrowing and for certain contracts. Confirm whether the school, association or Department would be the contracting party before approaching a lender.",
      sourceIds: ["tas_school"],
    };
  }
  if (state === "QLD") {
    return {
      title: "Confirm the permitted school finance structure first",
      summary: "Queensland public material shows lease/hire arrangements can exist in state-school contexts, but the public evidence reviewed does not establish a general school-level right to borrow for communications equipment. Confirm the Department's finance/procurement route before treating commercial finance as available.",
      sourceIds: ["qld_school"],
    };
  }
  if (state === "NSW") {
    return {
      title: "Confirm the Department's internal lease/finance procedure",
      summary: "NSW has current school financial-management and lease-accounting procedures, but the detailed school rules are staff-only. The public evidence is not enough to treat an ordinary business finance product as automatically available to a government school.",
      sourceIds: ["nsw_school"],
    };
  }
  if (state === "ACT") {
    return {
      title: "Use the ACT Government procurement route",
      summary: "ACT procurement law recognises purchase, lease and rental as procurement methods for Territory entities. The public evidence reviewed does not establish that an individual public school can independently borrow or sign a particular finance arrangement, so confirm the Education Directorate contracting and approval route before approaching a lender.",
      sourceIds: ["act_procurement"],
    };
  }
  return {
    title: "Confirm public-sector authority before approaching a lender",
    summary: "SiteComms has not established a sufficiently specific public rule for this jurisdiction. Government schools should confirm their Directorate/Department finance, procurement and lease authority before treating commercial equipment finance as available.",
    sourceIds: [],
  };
}

function providerIdsForOrganisation(organisationType?: OrganisationType): string[] {
  switch (organisationType) {
    case "catholic_school":
    case "independent_school":
    case "tertiary":
      return ["vestone_education", "finlease_education", "commbank_technology"];
    case "government_school":
      return ["vestone_education", "finlease_education"];
    case "aged_care":
    case "healthcare":
    case "early_learning":
      return ["anz_health", "commbank_health", "nab_equipment"];
    case "commercial":
    case "industrial":
    case "hospitality_events":
    case "nonprofit":
    case "other":
    case "government":
    case "local_government":
    default:
      return ["nab_equipment", "westpac_equipment", "boq_equipment", "commbank_technology"];
  }
}

export function financeEvidenceFor(organisationType?: OrganisationType, state?: ProjectState): FinanceEvidence[] {
  const ids: string[] = [];
  if (organisationType === "government_school") {
    const stateSource = state ? STATE_SCHOOL_SOURCE[state] : undefined;
    if (stateSource) ids.push(stateSource);
    if (state === "VIC") ids.push("vestone_vic_public");
  }
  ids.push(...providerIdsForOrganisation(organisationType));
  return Array.from(new Set(ids)).map((id) => FINANCE_EVIDENCE[id]).filter(Boolean);
}
