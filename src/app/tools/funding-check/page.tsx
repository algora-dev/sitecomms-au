import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import { buildMetadata } from "@/lib/seo";
import { reviewedLabel } from "@/lib/content-meta";
import FundingCheckTool from "./FundingCheckTool";
export const metadata = buildMetadata({ title: "Australian Funding Pathway Checker — Schools, Aged Care and Community Sites", description: "Find researched funding and project-approval routes by state, site, ownership, project stage and the communications features you need. QLD, NSW, VIC, WA and SA coverage.", path: "/tools/funding-check" });
export default function FundingCheckPage() {
  return <div>
    <AuthorityHero eyebrow="Australian project funding" title="See whether your project has a funding path"
      description="Choose your state, site type, who owns or runs it, the project stage and the communications features you need. We’ll show the funding routes worth checking and the official sources."
      tags={["Queensland", "NSW", "Victoria", "WA", "South Australia", "Selected national routes"]}
      primaryCta={{ label: "Check a project", href: "#funding-tool" }} secondaryCta={{ label: "Read the state funding guides", href: "/funding" }}
      reviewed={reviewedLabel("/tools/funding-check")} note="A quick funding-pathway check — no grant terminology required" />
    <div className="sc-container max-w-4xl pb-16 pt-5">
      <FundingCheckTool />
      <section className="mt-10 text-sm leading-relaxed text-[var(--sc-slate)]"><h2 className="text-xl font-bold text-[var(--sc-blue-900)]">Before you commit to any expenditure</h2>
        <p className="mt-3">A grant, a school budget, approval for works and finance are different mechanisms. Use the <Link href="/funding" className="font-semibold underline">funding guide</Link> to understand the distinction, and check the official scheme’s current rules before signing, paying a deposit or placing an order.</p>
        <p className="mt-3">School, care and community safety obligations do not wait for a grant. Address urgent risks through your organisation’s responsible people and procedures; SiteComms does not certify life-safety, clinical or regulatory compliance.</p>
      </section>
    </div>
  </div>;
}
