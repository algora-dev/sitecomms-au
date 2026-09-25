/** Content, route and source invariants; no measured supplier ratings or real enquiries. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  schoolPlatforms, schoolPlatform, schoolUseCases, comparisonSources,
  specialistPlatforms, australianStateReferences, schoolComparisonQuestions,
  SCHOOL_COMPARE_PATH, SCHOOL_COMPARE_REVIEWED, SCHOOL_COMPARE_VERSION, comparisonEvidenceRecords,
} from "../src/lib/content/school-compare.ts";
import { publicGuideRecords } from "../src/lib/agent-ready/content.ts";
import { searchBusinessContent } from "../src/lib/agent-ready/search.ts";
import { SOURCE_RECORDS } from "../src/lib/agent-ready/sources.ts";
import { CONTENT_META } from "../src/lib/content-meta.ts";
import nextConfigModule from "../next.config.ts";
// tsx/CJS interop: default import may be wrapped ({ default: config }) depending on module format.
const nextConfig = typeof nextConfigModule.redirects === "function" ? nextConfigModule : nextConfigModule.default;
const read = path => readFileSync(new URL(`../${path}`,import.meta.url),"utf8");
const page=read("src/app/compare/schools/page.tsx");
let passed=0;
async function test(label,fn){await fn(); passed++; console.log(`PASS ${label}`);}

await test("Eight distinct main approaches, SPON main, ITC not silently promoted",()=>{
  assert.equal(schoolPlatforms.length,8);
  assert.equal(new Set(schoolPlatforms.map(p=>p.id)).size,8);
  assert.equal(schoolPlatforms[0].id,"spon"); // Editorial order, not an inferred numeric rating.
  assert.ok(!schoolPlatforms.some(p=>p.id==="itc"));
  assert.throws(()=>schoolPlatform("unknown"));
});
await test("Every profile has sourced capability and procurement fields",()=>{
  for(const p of schoolPlatforms){
    for(const f of ["name","summary","bells","intercom","legacy","visual","operations","cost","auEvidence","status","scale","components","tradeoff"])
      assert.ok(p[f].length>2,`${p.id}.${f}`);
    assert.ok(p.sources.length); assert.ok(p.verify.length>=3); assert.equal(p.strengths.length,3);
    for(const id of p.sources) assert.ok(comparisonSources[id],id);
  }
});
await test("All six use-case shortlists reference supported profiles and evidence",()=>{
  assert.equal(schoolUseCases.length,6);
  for(const item of schoolUseCases){
    for(const id of item.ids) assert.ok(schoolPlatform(id));
    for(const id of item.sources) assert.ok(comparisonSources[id]);
  }
});
await test("SPON breadth is documented while Australian delivery stays explicitly unverified",()=>{
  const p=schoolPlatform("spon");
  assert.match(p.auEvidence,/has not verified an Australian distributor\/support route/);
  assert.match(p.status,/confirmation/);
  assert.match(p.scale,/manufacturer capacity statement/);
  assert.match(p.verify.join(" "),/licences/);
  assert.ok(p.sources.includes("spon-software"));
  assert.ok(!/cheapest|guaranteed savings|best in Australia/i.test(p.cost));
});
await test("Competitor strengths are not suppressed to manufacture a ranking",()=>{
  assert.match(schoolPlatform("algo").intercom,/8188 talkback/);
  assert.match(schoolPlatform("axis").visual,/C1710.*text, strobe/);
  assert.match(schoolPlatform("axis").intercom,/Two-way/);
  assert.match(schoolPlatform("frontrow").summary,/classroom AV/);
  assert.match(schoolPlatform("bodet").visual,/LED display/);
});
await test("Traditional example is not presented as current product availability",()=>{
  assert.match(schoolPlatform("traditional").summary,/discontinued/);
  assert.match(comparisonSources.monitor.limits,/Not a current bill of materials/);
  assert.match(schoolPlatform("toa").legacy,/not a 100V amplifier/);
});
await test("Five states have useful, typed evidence, not five fabricated deployments",()=>{
  assert.deepEqual(australianStateReferences.map(r=>r.code),["QLD","NSW","VIC","WA","SA"]);
  for(const ref of australianStateReferences){
    assert.ok(ref.kind && ref.limit); for(const id of ref.sources)assert.ok(comparisonSources[id]);
  }
  const vic=australianStateReferences.find(r=>r.code==="VIC");
  assert.match(vic.text,/Audac/); assert.match(vic.limit,/not a SPON/i);
  assert.match(australianStateReferences.find(r=>r.code==="WA").limit,/regional travel/);
});
await test("Incomplete retrieval and historical channel evidence remain qualified",()=>{
  assert.match(comparisonSources.macrosphere.limits,/direct page fetch was unavailable/);
  assert.match(comparisonSources["atlas-au"].kind,/Historical/);
  assert.match(comparisonSources["scp-australia"].limits,/not proof of SPON/);
});
await test("All URLs valid HTTPS; no NZ commercial evidence or mechanical localisation",()=>{
  for(const source of Object.values(comparisonSources)){
    const url=new URL(source.href); assert.equal(url.protocol,"https:");
    assert.ok(!url.hostname.endsWith(".nz")); assert.ok(!source.href.includes(".Australian"));
    assert.equal(source.reviewed_at,SCHOOL_COMPARE_REVIEWED);
    assert.ok(source.scope && source.limits);
  }
});
await test("Register and page derive from one source map without fake verified-at timestamps",()=>{
  const records=comparisonEvidenceRecords();
  assert.equal(records.length,Object.keys(comparisonSources).length);
  for(const r of records){
    assert.equal(r.source_version,SCHOOL_COMPARE_VERSION);
    assert.equal(r.evidence_status,"document_review");
    assert.ok(!("verified_at" in r));
    assert.equal(r.href,comparisonSources[r.source_id.split(":")[1]].href);
    assert.equal(r.limitations,r.limits);
  }
  assert.match(page,/schoolPlatforms\.map/); assert.match(page,/comparisonEvidenceRecords\(\)\.map/);
});
await test("Source snapshot update propagates to evidence projection",()=>{
  const old=comparisonSources.spon.scope;
  try{
    comparisonSources.spon.scope="Synthetic revised source scope for parity test";
    assert.equal(comparisonEvidenceRecords().find(r=>r.source_id==="school-comparison:spon").scope,comparisonSources.spon.scope);
  }finally{comparisonSources.spon.scope=old;}
});
await test("No price/rating data added to manufacture a winner",()=>{
  for(const p of schoolPlatforms){
    for(const key of ["score","rating","rank","price","lowest_price","market_share"])assert.ok(!(key in p));
  }
  assert.ok(!/AggregateRating|ratingValue|lowPrice|highPrice/.test(page));
  assert.match(page,/not a SPON quote/);
});
await test("Canonical metadata, public directory, search and source authority agree",()=>{
  assert.equal(SCHOOL_COMPARE_PATH,"/compare/schools");
  assert.equal(CONTENT_META[SCHOOL_COMPARE_PATH].reviewed,SCHOOL_COMPARE_REVIEWED);
  assert.equal(SOURCE_RECORDS.school_comparison.reference_path,SCHOOL_COMPARE_PATH);
  const records=publicGuideRecords().filter(r=>r.href===SCHOOL_COMPARE_PATH);
  assert.equal(records.length,1); assert.equal(records[0].reviewed_at,SCHOOL_COMPARE_REVIEWED);
  assert.ok(!publicGuideRecords().some(r=>r.href==="/compare"));
  assert.ok(searchBusinessContent({query:"SPON",limit:10}).result.items.some(r=>r.href===SCHOOL_COMPARE_PATH));
});
await test("Redirect is permanent, exact, loop-free; fallback retains repeated parameters",async()=>{
  const redirects=await nextConfig.redirects();
  const r=redirects.find(r=>r.source==="/compare");
  assert.deepEqual(r,{source:"/compare",destination:"/compare/schools",permanent:true});
  assert.ok(!redirects.some(r=>r.source==="/compare/schools"));
  const fallback=read("src/app/compare/page.tsx");
  assert.match(fallback,/Array\.isArray/); assert.match(fallback,/query\.append/);
  const sitemap=read("src/app/sitemap.ts");
  assert.match(sitemap,/path: "\/compare\/schools"/);
  assert.ok(!/path: "\/compare"/.test(sitemap));
});
await test("Legacy fragments, readable tables and progressive disclosure retained",()=>{
  for(const id of ["shortlist","capabilities","platforms","specialist","costs","school-scenario","providers","sources","itc"])
    assert.ok(page.includes(`id="${id}"`),id);
  assert.ok(specialistPlatforms.some(p=>p.id==="2n"));
  assert.match(page,/role="region"/);assert.match(page,/tabIndex=\{0\}/);
  assert.match(page,/<caption/);assert.match(page,/scope="row"/);assert.match(page,/scope="col"/);
  assert.match(page,/<details/);assert.match(page,/schoolComparisonQuestions\.map/);
});
await test("Research never submits an enquiry or enables AI protocols",()=>{
  assert.match(page,/<ProjectHelpLauncher mode="system_selection"/);
  assert.match(page,/we do not automatically forward your enquiry/);
  assert.ok(!/fetch\(|\.submit\(|\/api\//.test(page));
  assert.match(page,/href="\/contact"/);
  for(const route of ["/pricing-tool","/tools/funding-check","/tools/finance-check"])
    assert.ok(page.includes(`href="${route}"`));
});
await test("Existing preview protections and state-independent technical comparison preserved",async()=>{
  const headers=await nextConfig.headers();
  assert.ok(headers.some(r=>r.headers.some(h=>h.key==="X-Robots-Tag"&&h.value.includes("noindex"))));
  assert.match(read("src/lib/seo.ts"),/index: false/);
  assert.ok(!/ProjectStateSelector/.test(page));
  assert.match(page,/Tasmania, the ACT and Northern Territory/);
});
await test("FAQ and specialist references resolve; no fake compliance or partnership claim",()=>{
  for(const item of [...specialistPlatforms,...schoolComparisonQuestions])
    for(const id of item.sources)assert.ok(comparisonSources[id]);
  assert.match(page,/None of the organisations below is presented as a SiteComms partner/);
  assert.match(page,/not a certification of the installation/);
});
console.log(`Schools comparison checks passed: ${passed} groups; ${schoolPlatforms.length} profiles; ${Object.keys(comparisonSources).length} sources; five state reference records.`);
