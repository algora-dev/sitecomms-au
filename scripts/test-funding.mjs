/** Source-derived regression fixtures, not live eligibility tests. No real applications or enquiries. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { performance } from "node:perf_hooks";
import { FUNDING_PATHWAYS as paths, FUNDING_SOURCES as sources, PRIORITY_FUNDING_STATES } from "../src/lib/funding/catalogue.ts";
import { assessFundingPathways as assess, assertFundingResult, pathwayAvailability, fundingPublicationStatus } from "../src/lib/funding/assessment.ts";
import { FUNDING_FIELDS, FUNDING_INPUT_SCHEMA, relevantDetailFields } from "../src/lib/funding/questions.ts";
import { CAPABILITIES } from "../src/lib/agent-ready/capabilities.ts";
import { InputValidationError } from "../src/lib/agent-ready/contracts.ts";
import { POST as httpFunding } from "../src/app/api/business/v1/funding/route.ts";
import { handleCapabilityHttp } from "../src/lib/agent-ready/http.server.ts";
import { STATE_FUNDING_GUIDES } from "../src/lib/funding/guides.ts";
import { publicGuideRecords } from "../src/lib/agent-ready/content.ts";
import { CONTENT_META } from "../src/lib/content-meta.ts";
const now = new Date("2026-09-20T12:00:00Z");
const input = (patch = {}) => ({ state: "QLD", site_type: "community", applicant_type: "not_for_profit", project_focus: "communications", stage: "planning", tenure: "owned", community_benefit: "yes", ...patch });
const result = (patch = {}, ctx = {}) => assess(input(patch), { now, ...ctx });
const get = (id, patch = {}, ctx = {}) => { const p = result(patch, ctx).result.pathways.find(p => p.id === id); assert.ok(p, id); return p; };
const nonGov = { site_type: "independent_school", applicant_type: "school_authority", building_component: "yes" };
const gov = { site_type: "government_school", applicant_type: "school_authority" };
const early = { state: "SA", site_type: "early_childhood", early_service_type: "non_profit", adds_places: "yes", funded_preschool: "yes", building_component: "yes" };
const care = { site_type: "residential_aged_care", applicant_type: "private_business", registered_care_provider: "yes", targeted_care_need: "yes" };
const inclusion = { state: "SA", project_focus: "accessibility", accessibility_evidence: "yes", core_service: "no", gaming: "no", already_grant_funded: "no" };
let passed = 0;
async function test(name, fn) { await fn(); passed++; console.log(`PASS ${name}`); }
await test("Catalogue has five priority states, 25 uniquely identified routes and 33 official sources", () => {
  assert.deepEqual(PRIORITY_FUNDING_STATES, ["QLD", "NSW", "VIC", "WA", "SA"]);
  assert.equal(paths.length, 25); assert.equal(sources.length, 33);
  assert.equal(new Set(paths.map(p => p.id)).size, paths.length); assert.equal(new Set(sources.map(s => s.id)).size, sources.length);
  for (const source of sources) { assert.equal(new URL(source.url).protocol, "https:"); assert.equal(source.reviewed, "2026-09-20"); assert.ok(source.section); assert.ok(source.review_due > source.reviewed); assert.ok(!("verified_at" in source)); }
  for (const p of paths) for (const id of p.source_ids) assert.ok(sources.some(s => s.id === id), id);
});
await test("Every predicate uses existing schema values rather than a private shadow enum", () => {
  for (const p of paths) for (const rule of p.rules) {
    assert.ok(FUNDING_FIELDS[rule.field]); for (const allowed of rule.allowed) assert.ok(FUNDING_FIELDS[rule.field].options.some(o => o[0] === allowed), `${p.id}:${rule.field}:${allowed}`);
  }
  assert.deepEqual(FUNDING_INPUT_SCHEMA.properties.state.enum, FUNDING_FIELDS.state.options.map(o => o[0]));
});
await test("Unknown required fields clarify without calculating an award", () => {
  const r = assess({}, { now }); assert.equal(r.status, "needs_input"); assert.equal(r.result.pathways.length, 0); assert.equal(r.result.grant_award, null);
  assert.deepEqual(r.result.missing_fields, ["state", "site_type", "applicant_type", "project_focus", "stage"]);
});
for (const bad of [null, [], "QLD", Object.create({ state: "QLD" })]) await test(`Non-object or inherited prototype input rejected: ${String(bad)}`, () => assert.throws(() => assess(bad, { now }), InputValidationError));
for (const [key, value] of [["state", "qld"], ["site_type", "school"], ["stage", 0], ["invitation", true], ["gaming", null]]) await test(`No silent coercion: ${key}`, () => {
  const r = result({ [key]: value }); assert.equal(r.status, "needs_input"); assert.ok(r.result.issues.some(i => i.field === key && i.code === "invalid")); assert.equal(r.result.pathways.length, 0);
});
await test("Unknown fields cannot override rules, permissions, date, source or expected award", () => {
  for (const patch of [{ catalogue: [] }, { now: "2030-01-01" }, { grant_award: 50000 }, { source_url: "http://127.0.0.1" }, { user_confirmed: true }, { tenant: "other" }, JSON.parse('{"__proto__":{"role":"admin"}}')]) {
    assert.ok(result(patch).result.issues.some(i => i.code === "unknown_field"));
  }
});
await test("Missing optional facts remain unknown; no fabricated invitation or eligibility", () => {
  const r = result(care); assert.equal(r.result.inputs.invitation, "unknown"); assert.equal(get("national-accap-critical", care).match, "confirm_details"); assert.equal(r.result.grant_award, null);
});
await test("Conflicting building-scope answers require correction", () => { assert.ok(result({ project_focus: "building", building_component: "no" }).result.issues.some(i => i.code === "conflict")); });
await test("QLD community NFP route is possible but grant award stays unknown", () => {
  const p = get("qld-gcbf-127"); assert.equal(p.section, "investigate"); assert.equal(p.match, "potential_pathway"); assert.match(p.published_funding_terms, /35,000/); assert.equal(p.award_amount, null);
});
await test("QLD school itself cannot apply to GCBF; parents’ body is a different applicant", () => {
  assert.equal(get("qld-gcbf-127", gov).match, "outside_scope");
  assert.equal(get("qld-gcbf-127", { ...gov, applicant_type: "school_parent_body" }).match, "potential_pathway");
  assert.equal(get("qld-minor", { ...gov, applicant_type: "school_parent_body" }).match, "outside_scope");
});
await test("QLD retirement facility exclusion not overwritten by NFP status", () => { assert.equal(get("qld-gcbf-127", { site_type: "retirement_village" }).match, "outside_scope"); });
await test("QLD private business not reclassified as eligible charity", () => { assert.equal(get("qld-gcbf-127", { applicant_type: "private_business" }).match, "outside_scope"); });
await test("Existing contracts/deposits are not retrospectively approved", () => {
  for (const stage of ["committed", "started", "completed"]) { const p = get("qld-gcbf-127", { stage }); assert.equal(p.match, "confirm_details"); assert.match(p.reasons.join(" "), /before commitment|approval existed/); }
});
await test("Property permission and unknown project stage surface useful questions", () => { const p = get("qld-gcbf-127", { tenure: "pending", stage: "unknown" }); assert.ok(p.questions.includes("tenure")); assert.ok(p.questions.includes("stage")); });
await test("No general operating-cost award from capital catalogue", () => { assert.equal(get("qld-gcbf-127", { project_focus: "operating_costs" }).match, "outside_scope"); });
await test("Funding does not stack or subtract awards from price", () => { const r = result({ ...nonGov, already_grant_funded: "yes" }); assert.equal(r.result.grant_award, null); for (const p of r.result.pathways) assert.equal(p.award_amount, null); });
await test("Commonwealth standalone equipment restriction is explicit; exceptions need BGA review", () => {
  const p = get("national-cgp", { ...nonGov, building_component: "no" }); assert.equal(p.match, "confirm_details"); assert.match(p.conditions.join(" "), /equipment.*unless/);
  assert.equal(get("national-cgp", nonGov).match, "potential_pathway");
});
await test("Early childhood and government schools do not receive non-government CGP match", () => { for (const site_type of ["early_childhood", "government_school"]) assert.ok(!result({ site_type }).result.pathways.some(p => p.id === "national-cgp")); });
await test("NSW government works remain approval, not grant allocation", () => { const p = get("nsw-works", { ...gov, state: "NSW" }); assert.equal(p.route_type, "project_approval"); assert.equal(p.award_amount, null); });
await test("NSW BGAS conflicting official status never becomes open", () => { const p = get("nsw-bgas", { ...nonGov, state: "NSW" }); assert.equal(p.availability, "confirm_status"); assert.equal(p.section, "check_first"); });
await test("NSW CBP2026 closure and staged process preserved", () => { const p = get("nsw-cbp-2026", { state: "NSW" }); assert.equal(p.availability, "closed"); assert.equal(p.section, "watchlist"); assert.match(p.conditions.join(" "), /shortlisted/); });
await test("NSW stale Open badge does not reopen the 2025 early-learning round", () => { const p = get("nsw-belp", { state: "NSW", site_type: "early_childhood" }); assert.equal(p.availability, "closed"); assert.notEqual(p.section, "investigate"); });
const nswIE = { state: "NSW", site_type: "early_childhood", project_focus: "accessibility", eligible_nsw_preschool: "yes", accessibility_evidence: "yes", child_adjustment: "yes" };
await test("NSW child-based access stream needs correct preschool and specialised scope", () => {
  assert.equal(get("nsw-ie-child-2026", nswIE).match, "potential_pathway");
  assert.equal(get("nsw-ie-child-2026", { ...nswIE, eligible_nsw_preschool: "no" }).match, "outside_scope");
  assert.equal(get("nsw-ie-child-2026", { ...nswIE, project_focus: "communications" }).match, "outside_scope");
});
await test("NSW before-application rule is not silently changed to before-approval", () => { assert.match(get("nsw-ie-child-2026", { ...nswIE, stage: "committed" }).reasons.join(" "), /not the same as a before-approval/); });
await test("VIC school-funded route is not a grant; published capital round is closed", () => {
  assert.equal(get("vic-school-funded", { ...gov, state: "VIC" }).route_type, "project_approval");
  assert.equal(get("vic-capital-works", { ...gov, state: "VIC" }).availability, "closed");
});
await test("VIC school PA renewal is not a specialist hearing adjustment", () => {
  assert.equal(get("vic-hearing-access", { ...gov, state: "VIC" }).match, "outside_scope");
  assert.equal(get("vic-hearing-access", { ...gov, state: "VIC", project_focus: "accessibility", accessibility_evidence: "yes", hearing_evidence: "yes" }).match, "potential_pathway");
});
await test("VIC separate Catholic and independent closed streams stay distinct", () => {
  for (const sector of ["catholic", "independent"]) { const r = result({ ...nonGov, state: "VIC", site_type: `${sector}_school` }); assert.ok(r.result.pathways.some(p => p.id === `vic-building-${sector}` && p.availability === "closed")); assert.ok(!r.result.pathways.some(p => p.id === `vic-building-${sector === "catholic" ? "independent" : "catholic"}`)); }
});
await test("VIC Building Blocks is closed and does not treat for-profit service as eligible", () => {
  assert.equal(get("vic-blocks-improvement", { ...early, state: "VIC" }).availability, "closed");
  assert.equal(get("vic-blocks-improvement", { ...early, state: "VIC", applicant_type: "private_business", early_service_type: "for_profit" }).match, "outside_scope");
});
await test("WA Direct to Market preserves procurement classification", () => { const p = get("wa-direct-market", { ...gov, state: "WA" }); assert.equal(p.route_type, "procurement"); assert.match(p.route_label, /not new funding/); });
await test("WA loan always remains finance signpost, not available grant award", () => { const p = get("wa-school-loan", { ...nonGov, state: "WA" }); assert.equal(p.route_type, "concessional_loan"); assert.equal(p.section, "watchlist"); });
await test("Lotterywest core-service and public-benefit restrictions are not ignored", () => {
  assert.equal(get("wa-lotterywest", { state: "WA", core_service: "yes" }).match, "confirm_details");
  assert.equal(get("wa-lotterywest", { state: "WA", core_service: "no", community_benefit: "no" }).match, "outside_scope");
  assert.equal(get("wa-lotterywest", { state: "WA", core_service: "no" }).match, "potential_pathway");
});
await test("SA govt budget guidance does not invent a grant or threshold", () => { const p = get("sa-school-planning", { ...gov, state: "SA" }); assert.equal(p.route_type, "project_approval"); assert.match(p.conditions.join(" "), /do not establish.*grant/); });
await test("SA Flying Start requires additional places and eligible operator, not ordinary replacement", () => {
  assert.equal(get("sa-flying-start", early).match, "potential_pathway");
  assert.equal(get("sa-flying-start", { ...early, adds_places: "no" }).match, "outside_scope");
  for (const early_service_type of ["government", "for_profit", "family_day_care"]) assert.equal(get("sa-flying-start", { ...early, early_service_type }).match, "outside_scope");
  assert.equal(get("sa-flying-start", { ...early, early_service_type: "unknown" }).match, "confirm_details");
});
await test("SA published funding share is not applied to communications estimate", () => { const p = get("sa-flying-start", early); assert.match(p.published_funding_terms, /not 50% back/); assert.equal(p.award_amount, null); });
await test("SA Julia Farr access route preserves exclusions", () => {
  assert.equal(get("sa-julia-farr", inclusion).match, "potential_pathway");
  for (const patch of [{ gaming: "yes" }, { already_grant_funded: "yes" }, { site_type: "government_school", applicant_type: "school_authority" }, { site_type: "tertiary", applicant_type: "other_government" }, { project_focus: "communications" }]) assert.equal(get("sa-julia-farr", { ...inclusion, ...patch }).match, "outside_scope");
  assert.equal(get("sa-julia-farr", { ...inclusion, gaming: "unknown" }).match, "confirm_details");
});
await test("SA institution exclusion does not silently equate a venue with every separate legal applicant", () => {
  for (const site_type of ["government_school", "tertiary", "early_childhood"]) assert.equal(get("sa-julia-farr", { ...inclusion, site_type }).match, "confirm_details");
});
await test("QLD sponsored and government legal forms need confirmation rather than an invented blanket decision", () => {
  for (const applicant_type of ["local_government", "other_government", "unincorporated_group"]) assert.equal(get("qld-gcbf-127", { applicant_type }).match, "confirm_details");
});
await test("SA school loan round remains closed and repayable", () => { const p = get("sa-school-loans", { ...nonGov, state: "SA" }); assert.equal(p.availability, "closed"); assert.equal(p.route_type, "concessional_loan"); });
await test("ACCAP is never a retirement-village entitlement", () => { assert.ok(!result({ ...care, site_type: "retirement_village" }).result.pathways.some(p => p.id.startsWith("national-accap"))); });
await test("ACCAP Critical Infrastructure end date is not general open access", () => {
  for (const invitation of ["unknown", "no", "yes"]) { const p = get("national-accap-critical", { ...care, invitation }); assert.equal(p.availability, "invitation_only"); assert.equal(p.section, "check_first"); assert.equal(p.award_amount, null); }
});
await test("National-only states are supported honestly, including SA in deep coverage", () => {
  for (const state of ["ACT", "NT", "TAS"]) { const r = result({ ...nonGov, state }); assert.equal(r.result.coverage, "national_only"); assert.deepEqual(r.result.pathways.map(p => p.id), ["national-cgp"]); }
  assert.equal(result({ ...nonGov, state: "SA" }).result.coverage, "five_state_review");
});
await test("No-match is not a claim that no Australian funding exists", () => { const r = result({ state: "VIC", site_type: "commercial", applicant_type: "private_business" }); assert.equal(r.result.pathways.length, 0); assert.match(r.limitations.join(" "), /not that funding does not exist/); });
const qld = paths.find(p => p.id === "qld-gcbf-127"), sa = paths.find(p => p.id === "sa-julia-farr"), ie = paths.find(p => p.id === "nsw-ie-child-2026");
await test("QLD opening date is not an invented precise midnight opening time", () => { assert.equal(qld.opens, undefined); assert.equal(pathwayAvailability(qld, new Date("2026-08-30T12:00:00Z")).availability, "not_yet_open"); });
await test("QLD date-only closing day respects Brisbane local date, not UTC midnight", () => {
  assert.equal(pathwayAvailability(qld, new Date("2026-09-27T13:59:00Z")).availability, "open_at_review");
  assert.equal(pathwayAvailability(qld, new Date("2026-09-27T14:00:00Z")).availability, "closing_today");
  assert.equal(pathwayAvailability(qld, new Date("2026-09-28T14:00:00Z")).availability, "closed");
});
await test("SA October cut-off accounts for Adelaide daylight saving", () => {
  assert.equal(pathwayAvailability(sa, new Date("2026-10-16T02:29:59Z")).availability, "open_at_review");
  assert.equal(pathwayAvailability(sa, new Date("2026-10-16T02:30:00Z")).availability, "closed");
});
await test("NSW child-based October cut-off accounts for Sydney daylight saving", () => {
  assert.equal(pathwayAvailability(ie, new Date("2026-10-16T05:59:59Z")).availability, "open_at_review");
  assert.equal(pathwayAvailability(ie, new Date("2026-10-16T06:00:00Z")).availability, "closed");
});
await test("Stale sources never receive a fresh or confidently open result", () => {
  const p = get("qld-gcbf-127", {}, { now: new Date("2026-09-27T08:00:00Z") }); assert.equal(p.freshness, "stale"); assert.equal(p.section, "check_first"); assert.match(p.availability_label, /unconfirmed/);
});
await test("Missing required source suppresses affected conclusion and factual projection", () => { const p = get("qld-gcbf-127", {}, { sources: sources.filter(s => s.id !== "qld-gcbf") }); assert.equal(p.match, "unavailable"); assert.equal(p.published_funding_terms, null); assert.match(p.facts, /not available/); });
await test("Source withdrawal is not disguised as no matching programme", () => { const p = get("qld-gcbf-127", {}, { catalogue: paths.map(p => p.id === qld.id ? { ...p, publication: "withdrawn" } : p) }); assert.equal(p.freshness, "withdrawn"); assert.equal(p.match, "unavailable"); });
await test("Invalid/future source review dates cannot manufacture freshness", () => {
  for (const change of [{ reviewed: "2026-02-30" }, { review_due: "garbage" }, { reviewed: "2027-01-01" }, { review_due: "2026-01-01" }]) {
    assert.equal(get(qld.id, {}, { sources: sources.map(s => s.id === "qld-gcbf" ? { ...s, ...change } : s) }).freshness, "unavailable");
  }
});
await test("Whole catalogue outage differs from a supported no-match", () => { assert.equal(result({}, { unavailable: true }).status, "unavailable"); assert.equal(result({}, { catalogue: [] }).status, "unavailable"); });
await test("Generated time does not reset source review or rule version", () => { const a = result(), b = result({}, { now: new Date("2026-09-21T12:00:00Z") }); assert.notEqual(a.generated_at, b.generated_at); assert.deepEqual(a.sources, b.sources); assert.equal(a.result.rule_version, b.result.rule_version); });
await test("Source update and withdrawal are shared by page/assessment status function", () => {
  for (const date of [now, new Date("2026-09-29T00:00:00Z")]) { const r = get(qld.id, {}, { now: date }); assert.equal(fundingPublicationStatus(qld, date).freshness, r.freshness); if (r.availability === "closed") assert.match(fundingPublicationStatus(qld, date).label, /deadline passed/); }
});
await test("No grant upgrade to a quote, awarded amount or money total", () => {
  const bad = structuredClone(result()); bad.result.grant_award = 10000; assert.throws(() => assertFundingResult(bad));
  const other = structuredClone(result()); other.result.pathways[0].award_amount = 10000; assert.throws(() => assertFundingResult(other));
});
await test("Conditional questions avoid collecting names, contact details or medical data", () => {
  assert.ok(relevantDetailFields({ ...care, state: "QLD" }).includes("invitation")); assert.ok(!relevantDetailFields(input()).includes("invitation"));
  assert.ok(!Object.keys(FUNDING_FIELDS).some(k => /email|name|phone|diagnosis|address|student|resident_name/.test(k)));
});
await test("No network, storage, model, enquiry or grant application during assessment", () => {
  const previous = globalThis.fetch; let calls = 0; globalThis.fetch = () => { calls++; throw new Error("No network permitted"); };
  try { for (const state of PRIORITY_FUNDING_STATES) result({ ...care, state }); assert.equal(calls, 0); } finally { globalThis.fetch = previous; }
});
await test("Five state pages and shared guide search refer to real reviewed routes", () => {
  assert.equal(STATE_FUNDING_GUIDES.length, 5);
  for (const guide of STATE_FUNDING_GUIDES) {
    const route = `/funding/${guide.slug}`; assert.equal(CONTENT_META[route].reviewed, "2026-09-20"); assert.ok(publicGuideRecords().some(r => r.href === route));
    assert.match(readFileSync(new URL(`../src/app${route}/page.tsx`, import.meta.url), "utf8"), /force-dynamic/);
    for (const section of guide.sections) for (const id of section.source_ids) assert.ok(sources.some(s => s.id === id));
  }
});
await test("Form and registry invoke the shared domain handler, with no ad hoc fetch", () => {
  assert.equal(CAPABILITIES.assess_funding_pathways.handler, assess);
  const ui = readFileSync(new URL("../src/app/tools/funding-check/FundingCheckTool.tsx", import.meta.url), "utf8");
  assert.match(ui, /assessFundingPathways\(inputs/); assert.match(ui, /fingerprint/); assert.match(ui, /visibilitychange/); assert.match(ui, /detailState === state/); assert.match(ui, /ProjectHelpLauncher/); assert.ok(!ui.includes('fetch('));
});
const oldEnv = Object.fromEntries(["SC_AGENT_READY_HTTP_ENABLED", "SC_AGENT_READY_HTTP_KEY", "SC_AGENT_READY_LOG_EVENTS"].map(k => [k, process.env[k]]));
const key = randomBytes(32).toString("hex");
const request = (body = input(), extra = {}) => new Request("https://sitecomms.example/api/business/v1/funding", { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${key}` }, body: JSON.stringify(body), ...extra });
try {
  await test("Funding HTTP adapter disabled by default and still unavailable with a key only", async () => { delete process.env.SC_AGENT_READY_HTTP_ENABLED; process.env.SC_AGENT_READY_HTTP_KEY = key; assert.equal((await httpFunding(request())).status, 404); });
  process.env.SC_AGENT_READY_HTTP_ENABLED = "true"; process.env.SC_AGENT_READY_HTTP_KEY = key;
  await test("Funding actual route/core parity under the same clock/source versions", async () => {
    const response = await httpFunding(request()); assert.equal(response.status, 200); assert.match(response.headers.get("cache-control"), /no-store/);
    const actual = await response.json(), expected = assess(input(), { now: new Date(actual.generated_at) });
    assert.deepEqual(actual, expected);
  });
  await test("Funding HTTP rejects forged approval fields and unsupported values", async () => { assert.equal((await httpFunding(request(input({ approved: true })))).status, 400); assert.equal((await httpFunding(request(input({ state: "XX" })))).status, 400); });
  await test("Funding HTTP returns domain clarification for missing fields", async () => { const response = await httpFunding(request({ state: "QLD" })); assert.equal(response.status, 200); assert.equal((await response.json()).status, "needs_input"); });
  await test("Funding API rejects invalid JSON, unauthorised browser and wrong method", async () => {
    assert.equal((await httpFunding(request(input(), { body: "{" }))).status, 400);
    assert.equal((await httpFunding(request(input(), { headers: { "content-type": "application/json" } }))).status, 401);
    assert.equal((await httpFunding(request(input(), { headers: { "content-type": "application/json", authorization: `Bearer ${key}`, origin: "https://sitecomms.example" } }))).status, 403);
    assert.equal((await handleCapabilityHttp(new Request("https://sitecomms.example/api/business/v1/funding", { headers: { authorization: `Bearer ${key}` } }), "assess_funding_pathways")).status, 405);
  });
  await test("Funding API rejects oversized streamed body rather than running unlimited work", async () => { assert.equal((await httpFunding(request(input(), { body: JSON.stringify({ brief: "a".repeat(50000) }) }))).status, 413); });
  await test("Redacted capability events omit assessment fields and credentials", async () => {
    const old = console.info, logs = []; process.env.SC_AGENT_READY_LOG_EVENTS = "true"; console.info = value => logs.push(value);
    try { await httpFunding(request(input({ project_focus: "accessibility" }))); } finally { console.info = old; process.env.SC_AGENT_READY_LOG_EVENTS = "false"; }
    assert.equal(logs.length, 1); assert.ok(!logs[0].includes(key)); assert.ok(!logs[0].includes("accessibility")); assert.ok(!logs[0].includes("inputs"));
  });
} finally { for (const [k, v] of Object.entries(oldEnv)) if (v === undefined) delete process.env[k]; else process.env[k] = v; }
await test("Lotterywest uncertain NFP legal forms require confirmation, not automatic exclusion or approval", () => {
  for (const applicant_type of ["unincorporated_group", "school_parent_body", "social_enterprise"]) assert.equal(get("wa-lotterywest", { state: "WA", core_service: "no", applicant_type }).match, "confirm_details");
  for (const applicant_type of ["private_business", "individual", "other_government"]) assert.equal(get("wa-lotterywest", { state: "WA", core_service: "no", applicant_type }).match, "outside_scope");
});
await test("Flying Start commitment timing refers to application, not an invented approval date", () => {
  assert.equal(paths.find(p => p.id === "sa-flying-start").avoid_retrospective, "before_application");
  assert.match(get("sa-flying-start", { ...early, stage: "committed" }).reasons.join(" "), /not the same as a before-approval/);
});
await test("All entity/state combinations maintain classification and stable source IDs", () => {
  for (const [state] of FUNDING_FIELDS.state.options) for (const [site_type] of FUNDING_FIELDS.site_type.options) for (const [applicant_type] of FUNDING_FIELDS.applicant_type.options) {
    const r = result({ state, site_type, applicant_type }); assertFundingResult(r); assert.equal(r.result.grant_award, null);
    for (const p of r.result.pathways) assert.ok(paths.some(record => record.id === p.id && (record.jurisdictions.includes(state) || record.jurisdictions.includes("national"))));
  }
});
const timings = [];
for (let i = 0; i < 500; i++) { const start = performance.now(); result({ ...nonGov, state: "VIC" }); timings.push(performance.now() - start); }
timings.sort((a, b) => a - b);
console.log(`Funding: ${passed} named test groups passed; exhaustive state/site/applicant sweep = ${FUNDING_FIELDS.state.options.length * FUNDING_FIELDS.site_type.options.length * FUNDING_FIELDS.applicant_type.options.length} cases.`);
console.log(`Core-only warm single-process timing, n=500, concurrency=1: p50=${timings[250].toFixed(3)}ms p95=${timings[475].toFixed(3)}ms. Not framework, browser, external-client or production performance.`);
console.log("No real enquiries, funding applications, model calls, external clients or database writes. Browser/deployed integration remains a separate verification gate.");
