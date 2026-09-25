import type { ReactNode } from "react";
import AuthorityHero from "./AuthorityHero";
import ContinuePlanning from "./ContinuePlanning";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";

/** Uses the existing authority-page design; all guide text is server rendered. */
export default function PlanningArticle({ path, title, description, children }: {
  path: string; title: string; description: string; children: ReactNode;
}) {
  const schemas = [articleSchema({ headline: title, description, url: `${site.url}${path}`, datePublished: publishedDate(path), dateModified: reviewedDate(path) }),
    breadcrumbSchema([{ name: "SiteComms Australia", url: site.url }, { name: "Guides", url: `${site.url}/guides` }, { name: title, url: `${site.url}${path}` }])];
  return <div>
    <AuthorityHero eyebrow="Australian project planning" title={title} description={description}
      tags={["Project scope", "Australian evidence", "Practical next steps"]}
      primaryCta={{ label: "Estimate the modelled system", href: "/pricing-tool" }}
      secondaryCta={{ label: "Compare architectures", href: "/compare/schools" }}
      reviewed={reviewedLabel(path)} note="Planning guidance, not a compliance or funding decision"
      breadcrumb={[{ name: "Guides", href: "/guides" }, { name: title }]} />
    <article className="sc-container max-w-[850px] py-8 sc-prose">{children}</article>
    <div className="sc-container max-w-5xl pb-12"><ContinuePlanning items={[
      { title: "Plan by state", desc: "Keep the project location and approval questions together.", href: "/states" },
      { title: path === "/guides/compare-pa-system-quotes" ? "Define the school project brief" : "Compare system proposals", desc: "Ask each supplier to quote the same requirements.", href: path === "/guides/compare-pa-system-quotes" ? "/guides/school-pa-paging-requirements" : "/guides/compare-pa-system-quotes" },
      { title: "Get help with the next step", desc: "SiteComms reviews your enquiry and suggests suitable providers for you to contact.", href: "/contact" },
    ]} /></div>
    {schemas.map((data, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />)}
  </div>;
}
