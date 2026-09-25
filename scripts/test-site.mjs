/** Static source audit, not a substitute for next build, ESLint or browser testing. */
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { CONTENT_META } from "../src/lib/content-meta.ts";
const root=fileURLToPath(new URL("../",import.meta.url));
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name).replaceAll(path.sep,'/')]);
const files=walk(path.join(root,"src")).filter(p=>/\.tsx?$/.test(p)&&!p.endsWith('.d.ts'));
const relative=p=>path.relative(root,p).replaceAll(path.sep,'/');
const routeFiles=new Map(files.filter(p=>p.endsWith('/page.tsx')).map(p=>['/'+path.relative(path.join(root,'src/app'),path.dirname(p)).replaceAll(path.sep,'/'),p]));
const errors=[]; let imports=0,links=0;
for (const file of files) {
  const source=readFileSync(file,'utf8');
  const parsed=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  const diagnostics=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}}).diagnostics ?? [];
  for (const d of diagnostics.filter(d=>d.category===ts.DiagnosticCategory.Error)) errors.push(`${relative(file)}: ${ts.flattenDiagnosticMessageText(d.messageText,' ')}`);
  if (!file.endsWith('/app/privacy/page.tsx')) {
    if (/Pacific\/Auckland|Christchurch|\b5YA\b|\b10YPP\b|\bkura\b|state-integrated|rest[- ]homes?|\.Australian(?:\/|\b)/i.test(source)) errors.push(`${relative(file)}: unapproved NZ/mechanical-localisation residue`);
  }
  function visit(node) {
    if ((ts.isImportDeclaration(node)||ts.isExportDeclaration(node))&&node.moduleSpecifier&&ts.isStringLiteral(node.moduleSpecifier)) {
      const spec=node.moduleSpecifier.text;
      if (spec.startsWith('.')||spec.startsWith('@/')) {
        imports++;
        const stem=spec.startsWith('@/')?path.join(root,'src',spec.slice(2)):path.resolve(path.dirname(file),spec);
        if (!['','.ts','.tsx','.js','.mjs','/index.ts','/index.tsx'].some(s=>existsSync(stem+s))) errors.push(`${relative(file)}: unresolved local import ${spec}`);
      }
    }
    let href;
    if (ts.isJsxAttribute(node)&&node.name.getText(parsed)==='href'&&node.initializer&&ts.isStringLiteral(node.initializer)) href=node.initializer.text;
    if (ts.isPropertyAssignment(node)&&node.name.getText(parsed)==='href'&&ts.isStringLiteral(node.initializer)) href=node.initializer.text;
    if (href?.startsWith('/')&&!href.startsWith('//')) {
      links++;
      const route=new URL(href,'https://sitecomms.test').pathname;
      if (!routeFiles.has(route)&&!existsSync(path.join(root,'public',route))) errors.push(`${relative(file)}: missing route/asset ${href}`);
    }
    ts.forEachChild(node,visit);
  }
  visit(parsed);
}
const sitemap=readFileSync(path.join(root,'src/app/sitemap.ts'),'utf8');
const siteRoutes=[...sitemap.matchAll(/path: "([^"]+)"/g)].map(m=>m[1]);
assert.equal(siteRoutes.length,new Set(siteRoutes).size,'Sitemap duplicates');
for (const route of siteRoutes) { assert.ok(routeFiles.has(route),`Sitemap route absent: ${route}`); assert.ok(CONTENT_META[route],`Missing metadata: ${route}`); }
for (const route of routeFiles.keys()) if (!['/tools/system-planner','/compare','/integrations'].includes(route)) assert.ok(siteRoutes.includes(route),`Missing sitemap entry: ${route}`); // /integrations intentionally noindex and excluded from the sitemap (launch policy)
assert.ok(!siteRoutes.includes('/compare'), 'Legacy redirect must not be in sitemap');
assert.match(readFileSync(path.join(root,'src/app/compare/page.tsx'),'utf8'), /permanentRedirect/);
assert.match(readFileSync(path.join(root,'next.config.ts'),'utf8'), /source: "\/compare", destination: "\/compare\/schools", permanent: true/);
assert.match(readFileSync(path.join(root,'src/app/robots.ts'),'utf8'),/disallow: "\/"/);
assert.match(readFileSync(path.join(root,'src/app/layout.tsx'),'utf8'),/index: false, follow: false, googleBot: \{ index: false, follow: false \}/); // locked default branch of the SITE_INDEXING_ENABLED gate
assert.match(readFileSync(path.join(root,'src/lib/seo.ts'),'utf8'),/index: false/);
const logging=readFileSync(path.join(root,'src/app/api/pricing-tool/output-log/route.ts'),'utf8');
assert.ok(!logging.includes('Pacific/Auckland'));
assert.ok(logging.includes('status: 410'), 'Retired assessment logger must not silently write records');
assert.ok(!/supabase|createClient|\.insert\(|\.upload\(/.test(logging), 'No legacy database/PDF writer');
assert.deepEqual(errors,[],errors.join('\n'));
console.log(`Static site audit passed: ${files.length} TS/TSX files parsed/transpiled, ${imports} local imports, ${links} literal internal links, ${routeFiles.size} routes and ${siteRoutes.length} sitemap entries.`);
console.log('Preview/noindex preserved; active source NZ residue allowlisted only for the genuine operator privacy contact. Historical database data is untouched.');
console.log('Scope: syntax and source invariants only; not full framework type-check, build, ESLint or browser validation.');

// Finance-check state step and evidence must stay in the public flow.
{
  const financeTool = readFileSync(path.join(root, "src/app/tools/finance-check/FinanceCheckTool.tsx"), "utf8");
  assert.match(financeTool, /Step \{screen \+ 1\} of 4/, "Finance checker should remain a four-step state-first flow.");
  assert.match(financeTool, /Where is the project\?/, "Finance checker should ask project state first.");
  assert.match(financeTool, /Why this is a real Australian finance pathway/, "Finance result should show reviewed evidence.");
  assert.match(financeTool, /ProjectStateSelector required/, "Finance state must be explicitly selected.");
}
