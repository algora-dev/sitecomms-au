import type { Metadata } from "next";
import Link from "next/link";
import { GuideDirectory } from "@/components/content/GuideDirectory";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guides: IP Paging, PA, Bells & Funding Australia",
  description:
    "Practical Australian guides to paging system architecture, replacing old PA systems, installed pricing and school communications funding pathways.",
  path: "/guides",
});



export default function GuidesPage() {
  return (
    <div className="sc-container max-w-4xl py-16">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Practical guides</h1>
      <p className="mt-4 max-w-3xl text-lg text-[var(--sc-slate)]">
        Plain-language resources for planning, pricing and reviewing paging, PA, bell, intercom and emergency communication systems in Australia.
      </p>
      <GuideDirectory />
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/pricing-tool" className="sc-btn-primary">Get a ballpark price</Link>
        <Link href="/tools/funding-check" className="sc-btn-secondary">View funding pathways</Link>
      </div>
    </div>
  );
}
