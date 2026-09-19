/** Run manually with network access. --list inventories without making requests. */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const walk = dir => readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const urls = new Map();
for (const file of walk(path.join(root,"src")).filter(p=>/\.tsx?$/.test(p))) {
  const text = readFileSync(file,"utf8");
  for (const match of text.matchAll(/(?:\bhref\s*=\s*|["']?(?:href|educationUrl)["']?\s*:\s*)["'](https?:\/\/[^"']+)["']/g)) {
    const url = new URL(match[1]); url.hash = "";
    if (!urls.has(url.href)) urls.set(url.href,new Set());
    urls.get(url.href).add(path.relative(root,file));
  }
}
const listOnly = process.argv.includes("--list");
let failures = 0;
for (const [url,files] of urls) {
  if (listOnly) { console.log(url, "<-", [...files].join(", ")); continue; }
  try {
    const response = await fetch(url,{method:"GET",redirect:"follow",signal:AbortSignal.timeout(15000)});
    if (!response.ok) failures++;
    console.log(response.status, url, "<-", [...files].join(", "));
    await response.body?.cancel();
  } catch (error) { failures++; console.log("ERR",error.message,url); }
}
console.log(`${urls.size} unique published external references inventoried${listOnly ? "; no network verification attempted" : `; ${failures} need manual review`}.`);
// A 403 may be bot protection, not a broken source. Do not automatically remove it.
if (!listOnly && failures) process.exitCode = 1;
