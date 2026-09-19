"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { publicGuideRecords } from "@/lib/agent-ready/content";
import { searchBusinessContent } from "@/lib/agent-ready/search";

/** Ordinary links are server-rendered on the first view; JavaScript only adds filtering. */
export function GuideDirectory() {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(5);
  const result = useMemo(() => query.trim() ? searchBusinessContent({ query, limit }) : null, [query, limit]);
  const items = result ? result.result.items : publicGuideRecords();
  return <>
    <div className="sc-card mt-8 bg-[var(--sc-blue-50)] p-5">
      <label htmlFor="guide-search" className="block text-sm font-semibold text-[var(--sc-blue-900)]">Find a planning guide</label>
      <input id="guide-search" type="search" maxLength={200} value={query}
        onChange={event => { setQuery(event.target.value); setLimit(5); }}
        placeholder="Try cabling, aged care, pricing or funding"
        aria-describedby="guide-search-help"
        className="mt-2 w-full rounded-lg border border-[var(--sc-border)] bg-white px-3 py-3 text-sm text-[var(--sc-blue-900)]" />
      <p id="guide-search-help" className="mt-2 text-xs text-[var(--sc-slate)]">Searches the guide titles and descriptions shown below. No chat or contact details required.</p>
      {result && <p className="mt-2 text-sm text-[var(--sc-slate)]" role="status">{result.summary}</p>}
    </div>
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {items.map(guide => <Link key={guide.id} href={guide.href} className="sc-card group p-6">
        <h2 className="font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">{guide.title} <span aria-hidden>→</span></h2>
        <p className="mt-2 text-sm text-[var(--sc-slate)]">{guide.desc}</p>
      </Link>)}
    </div>
    {result?.result.next_offset !== null && result && limit < 10 && <button type="button" className="sc-btn-secondary mt-5" onClick={() => setLimit(10)}>Show more matching guides</button>}
    {result && <button type="button" className="sc-btn-secondary mt-5 ml-2" onClick={() => setQuery("")}>Browse all guides</button>}
  </>;
}
