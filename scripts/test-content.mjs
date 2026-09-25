import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { schoolPlatforms, schoolUseCases, comparisonSources, SCHOOL_COMPARE_REVIEWED } from "../src/lib/content/school-compare.ts";
import { CONTENT_META } from "../src/lib/content-meta.ts";
assert.equal(schoolPlatforms.length,8);
const ids=new Set(schoolPlatforms.map(p=>p.id));
assert.equal(ids.size,8);
assert.ok(!ids.has("itc") && ids.has("spon"));
for (const platform of schoolPlatforms) {
  for (const field of ["summary","bells","intercom","legacy","visual","operations","cost","auEvidence","status"]) assert.ok(platform[field]?.length>10,`${platform.id}: ${field}`);
  assert.ok(platform.verify.length>=2);
  for (const id of platform.sources) assert.ok(comparisonSources[id],id);
}
for (const source of Object.values(comparisonSources)) {
  assert.equal(new URL(source.href).protocol,"https:");
  assert.ok(source.kind.length>10);
  assert.ok(!source.href.includes(".Australian"));
}
for (const useCase of schoolUseCases) for (const id of useCase.ids) assert.ok(ids.has(id),`Unknown use-case option ${id}`);
assert.match(schoolPlatforms.find(p=>p.id==="spon").auEvidence,/has not verified/i);
assert.match(schoolPlatforms.find(p=>p.id==="spon").status,/confirmation/i);
const research=JSON.parse(readFileSync(new URL("../docs/comparison-research.json",import.meta.url),"utf8"));
assert.equal(research.reviewed,SCHOOL_COMPARE_REVIEWED);
assert.deepEqual(research.sources,comparisonSources,"Research register must match the rendered source data.");
for (const route of ["/states","/guides/school-pa-paging-requirements","/guides/compare-pa-system-quotes"]) {
  assert.equal(CONTENT_META[route].published,"2026-09-19");
  assert.equal(CONTENT_META[route].reviewed, route === "/states" ? "2026-09-20" : "2026-09-19");
}
console.log(`Content tests passed: ${schoolPlatforms.length} school profiles, ${schoolUseCases.length} use cases, ${Object.keys(comparisonSources).length} school comparison sources and three new dated routes.`);
