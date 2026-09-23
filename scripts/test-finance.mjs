import assert from "node:assert/strict";
import { assessFinanceFit } from "../src/lib/finance-check/engine.ts";
import { financeEvidenceFor, publicSchoolFinanceGuidance } from "../src/lib/finance-check/sources.ts";

const commercial = {
  projectState: "QLD",
  organisationType: "commercial",
  paymentFrequency: "monthly",
};

let r = assessFinanceFit({
  ...commercial,
  projectValueBand: "20_40",
  paymentBudget: "1000_2000",
  upfrontBand: "none",
});
assert.equal(r.level, "strong");
assert.match(r.headline, /finance pathway|finance/i);
assert.ok(r.evidence.some((x) => /NAB|Westpac|BOQ|CommBank/i.test(x.name)));

r = assessFinanceFit({
  ...commercial,
  projectValueBand: "250_plus",
  paymentBudget: "under_1000",
  upfrontBand: "none",
});
assert.equal(r.level, "tailored");
assert.doesNotMatch(r.headline, /reject|ineligible|declin/i);

r = assessFinanceFit({
  projectState: "VIC",
  organisationType: "government_school",
  paymentFrequency: "weekly",
  projectValueBand: "unsure",
  siteSizeBand: "21_40",
  paymentBudget: "unsure",
  upfrontBand: "unsure",
  source: "funding",
});
assert.equal(r.level, "early");
assert.match(r.headline, /operating lease/i);
assert.ok(r.reasons.some((x) => /state/i.test(x)));
assert.ok(r.reasons.some((x) => /funding/i.test(x)));
assert.ok(r.evidence.some((x) => /Victoria Department/i.test(x.name)));
assert.ok(r.evidence.some((x) => /Vestone/i.test(x.name)));

const wa = assessFinanceFit({
  projectState: "WA",
  organisationType: "government_school",
  paymentFrequency: "monthly",
  projectValueBand: "20_40",
  paymentBudget: "1000_2000",
  upfrontBand: "none",
});
assert.equal(wa.level, "early");
assert.match(wa.body, /must not borrow|approved department|procurement/i);
assert.ok(wa.evidence.some((x) => /WA Department/i.test(x.name)));

const sa = assessFinanceFit({
  projectState: "SA",
  organisationType: "government_school",
  paymentFrequency: "monthly",
  projectValueBand: "20_40",
  paymentBudget: "1000_2000",
  upfrontBand: "none",
});
assert.match(sa.body, /Minister/i);

const nt = publicSchoolFinanceGuidance("NT");
assert.match(nt.summary, /operating leases/i);
assert.match(nt.summary, /CE approval/i);

const tas = publicSchoolFinanceGuidance("TAS");
assert.match(tas.summary, /Secretary approval/i);

const act = publicSchoolFinanceGuidance("ACT");
assert.match(act.summary, /procurement/i);
assert.ok(act.sourceIds.includes("act_procurement"), "ACT uses the government procurement framework without inventing school-level borrowing authority.");

const schoolEvidence = financeEvidenceFor("independent_school", "NSW");
assert.ok(schoolEvidence.some((x) => /Vestone/i.test(x.name)));
assert.ok(schoolEvidence.some((x) => /Finlease/i.test(x.name)));

const careEvidence = financeEvidenceFor("aged_care", "SA");
assert.ok(careEvidence.some((x) => /ANZ/i.test(x.name)));
assert.ok(careEvidence.some((x) => /CommBank/i.test(x.name)));

for (const organisationType of ["government_school", "government", "local_government"]) {
  for (const projectValueBand of ["20_40", "250_plus"]) {
    r = assessFinanceFit({ projectState: "NSW", organisationType, projectValueBand, paymentFrequency: "monthly", paymentBudget: "1000_2000", upfrontBand: "none" });
    assert.equal(r.level, "early", "Known budgets do not bypass public-entity authority checks.");
    assert.doesNotMatch(r.body, /you qualify|approved|guaranteed/i);
  }
}

r = assessFinanceFit({ projectState: "QLD", paymentFrequency: "monthly", projectValueBand: "20_40", paymentBudget: "1000_2000", upfrontBand: "none" });
assert.equal(r.level, "early", "Unknown applicant cannot receive a strong readiness result.");
assert.doesNotMatch(r.reasons.join(" "), /guaranteed|approved/i);

console.log("finance tests: state-aware provider evidence and public-entity governance guardrails passed");
