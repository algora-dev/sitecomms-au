import assert from "node:assert/strict";
import { assessFinanceFit } from "../src/lib/finance-check/engine.ts";

const commercial = {
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
assert.match(r.headline, /worth having|explore/i);

r = assessFinanceFit({
  ...commercial,
  projectValueBand: "250_plus",
  paymentBudget: "under_1000",
  upfrontBand: "none",
});
assert.equal(r.level, "tailored");
assert.doesNotMatch(r.headline, /reject|ineligible|declin/i);

r = assessFinanceFit({
  organisationType: "government_school",
  paymentFrequency: "weekly",
  projectValueBand: "unsure",
  siteSizeBand: "21_40",
  paymentBudget: "unsure",
  upfrontBand: "unsure",
  source: "funding",
});
assert.equal(r.level, "early");
assert.ok(r.reasons.some((x) => /school/i.test(x)));
assert.ok(r.reasons.some((x) => /funding/i.test(x)));

for (const organisationType of ["government_school", "government", "local_government"]) {
  for (const projectValueBand of ["20_40", "250_plus"]) {
    r = assessFinanceFit({ organisationType, projectValueBand, paymentFrequency: "monthly", paymentBudget: "1000_2000", upfrontBand: "none" });
    assert.equal(r.level, "early", "Known budgets do not bypass public-entity authority checks.");
    assert.match(r.eyebrow, /authority/i);
    assert.doesNotMatch(r.body, /you qualify|approved|guaranteed/i);
  }
}
r = assessFinanceFit({ paymentFrequency: "monthly", projectValueBand: "20_40", paymentBudget: "1000_2000", upfrontBand: "none" });
assert.equal(r.level, "early", "Unknown applicant cannot receive a strong readiness result.");
assert.doesNotMatch(r.reasons.join(" "), /can be offered without a deposit/i);
console.log("finance tests: all assertions passed, including public-entity governance guardrails");
