import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(root, rel));
const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };

const env = read(".env.example");
const robots = read("src/app/robots.ts");
const seo = read("src/lib/seo.ts");
const layout = read("src/app/layout.tsx");
const nextConfig = read("next.config.ts");
const sitemap = read("src/app/sitemap.ts");
const integrations = read("src/app/integrations/page.tsx");

check(env.includes("SITE_INDEXING_ENABLED=false"), "Missing safe-default SITE_INDEXING_ENABLED flag.");
check(env.includes("SITE_ALLOW_MODEL_TRAINING=false"), "Missing separate model-training crawler policy flag.");
check(robots.includes("siteIndexingEnabled()"), "robots.ts is not using the shared launch gate.");
check(robots.includes("sitemap:"), "Production robots response does not advertise the sitemap.");
check(robots.includes('userAgent: "OAI-SearchBot"'), "OAI-SearchBot launch rule is missing.");
check(robots.includes('userAgent: "GPTBot"'), "Separate GPTBot training-policy rule is missing.");
check(seo.includes("!siteIndexingEnabled()"), "Per-page metadata is not controlled by the launch gate.");
check(layout.includes("siteIndexingEnabled()"), "Root metadata is not controlled by the launch gate.");
check(nextConfig.includes("publicIndexingEnabled"), "HTTP X-Robots-Tag gate is not launch-aware.");
check(nextConfig.includes('source: "/api/:path*"'), "Public launch does not retain API noindex headers.");
check(integrations.includes("noindex: true"), "Integration-status page should stay explicitly noindex for this release.");
check(!sitemap.includes('{ path: "/integrations"'), "Noindex integration-status page must not be in sitemap.");
for (const route of ["/", "/schools", "/compare/schools", "/pricing", "/pricing-tool", "/funding", "/tools/funding-check", "/financing", "/tools/finance-check", "/industries/aged-care-retirement-villages"]) {
  check(sitemap.includes(`path: "${route}"`), `Sitemap missing important public route ${route}.`);
}

const indexNowKey = "e5f35406b43b495b4dacb3ea8957792b";
check(exists(`public/${indexNowKey}.txt`), "IndexNow verification key file is missing.");
if (exists(`public/${indexNowKey}.txt`)) {
  check(read(`public/${indexNowKey}.txt`).trim() === indexNowKey, "IndexNow key file content does not match the existing submission script.");
}

// Public page route inventory and literal internal-link check.
const appRoot = path.join(root, "src/app");
const pageFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "page.tsx") pageFiles.push(full);
  }
}
walk(appRoot);
const routes = new Set(pageFiles.map((file) => {
  const rel = path.relative(appRoot, path.dirname(file)).replaceAll(path.sep, "/");
  return rel ? `/${rel}` : "/";
}));

const sourceFiles = [];
function walkSource(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkSource(full);
    else if (/\.(tsx|ts)$/.test(entry.name)) sourceFiles.push(full);
  }
}
walkSource(path.join(root, "src"));
const hrefRe = /href=["'](\/[^"'?#]*)/g;
for (const file of sourceFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(hrefRe)) {
    const href = match[1].replace(/\/$/, "") || "/";
    if (href.startsWith("/api/") || href.startsWith("/insights")) continue;
    check(routes.has(href), `Broken literal internal link ${href} in ${path.relative(root, file)}.`);
  }
}

// Known intentional operator address is the only runtime NZ geographic reference allowed.
for (const file of sourceFiles) {
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  const text = fs.readFileSync(file, "utf8");
  if (/New Zealand|Christchurch|Auckland|\bNZD\b|\b5YA\b|\b10YPP\b|\bkura\b|state-integrated/i.test(text)) {
    const allowed = rel === "src/app/privacy/page.tsx" && /Christchurch 8025, New Zealand/.test(text);
    const testFixture = rel.startsWith("scripts/");
    check(allowed || testFixture, `Unexpected NZ-specific runtime/source wording in ${rel}.`);
  }
  check(!/https?:\/\/[^\s"')]*\.Australian\b/i.test(text), `Invalid .Australian URL in ${rel}.`);
}

if (failures.length) {
  console.error(`Launch-readiness static checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Launch-readiness static checks passed: ${pageFiles.length} page routes, ${sourceFiles.length} TS/TSX files.`);
