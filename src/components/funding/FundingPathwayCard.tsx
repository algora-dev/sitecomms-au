import { FUNDING_SOURCES } from "@/lib/funding/catalogue";
import { formatContentDate } from "@/lib/content-meta";
import type { PathwayAssessment } from "@/lib/funding/types";

export function FundingSourceLinks({ ids }: { ids: readonly string[] }) {
  return <div className="mt-5 border-t border-[var(--sc-border)] pt-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-900)]">Official evidence</p>
    <ul className="mt-2 space-y-2 text-sm">
      {ids.map(id => {
        const source = FUNDING_SOURCES.find(s => s.id === id);
        return source ? <li key={id}>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">{source.title}<span className="sr-only"> (official source, opens a new tab)</span></a>
          <p className="mt-1 text-xs text-[var(--sc-slate)]">{source.publisher} · {source.section}</p>
          <p className="mt-1 text-xs text-[var(--sc-slate)]">Reviewed {formatContentDate(source.reviewed)} · Recheck due {formatContentDate(source.review_due)}</p>
          {source.evidence_note && <p className="mt-1 text-xs leading-relaxed text-[var(--sc-slate)]">Review limitation: {source.evidence_note}</p>}
        </li> : <li key={id}>Required evidence unavailable. Check with the programme owner.</li>;
      })}
    </ul>
  </div>;
}
export function FundingPathwayCard({ pathway }: { pathway: PathwayAssessment }) {
  const noEvidence = ["withdrawn", "unavailable"].includes(pathway.freshness);
  return <article className="sc-card bg-white p-5 sm:p-6" aria-labelledby={`result-${pathway.id}`}>
    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">{pathway.route_label}</p>
    <h4 id={`result-${pathway.id}`} className="mt-2 text-lg font-bold text-[var(--sc-blue-900)]">{pathway.title}</h4>
    <p className="mt-3 rounded-lg bg-[var(--sc-blue-50)] px-3 py-2 text-sm font-semibold text-[var(--sc-blue-900)]">{pathway.availability_label}</p>
    {noEvidence ? <p className="mt-4 text-sm text-[var(--sc-slate)]">The evidence for this record is unavailable or withdrawn. Its former factual guidance is not being presented as current.</p> : <>
      <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]"><strong className="text-[var(--sc-blue-900)]">What the official source establishes: </strong>{pathway.facts}</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]"><strong className="text-[var(--sc-blue-900)]">SiteComms’ relevance assessment: </strong>{pathway.interpretation}</p>
    </>}
    {!noEvidence && pathway.published_funding_terms && <p className="mt-4 rounded-lg border border-[var(--sc-border)] p-3 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Published programme terms, not your award: </strong>{pathway.published_funding_terms}</p>}
    <div className="mt-4 text-sm text-[var(--sc-slate)]">
      <p className="font-semibold text-[var(--sc-blue-900)]">What needs attention for your project</p>
      <ul className="mt-2 list-disc space-y-2 pl-5">{pathway.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>
    </div>
    {!noEvidence && <details className="mt-4 rounded-lg border border-[var(--sc-border)] p-3 text-sm text-[var(--sc-slate)]">
      <summary className="cursor-pointer font-semibold text-[var(--sc-blue-900)]">Other material conditions</summary>
      <ul className="mt-3 list-disc space-y-2 pl-5">{pathway.conditions.map(c => <li key={c}>{c}</li>)}</ul>
    </details>}
    <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]"><strong className="text-[var(--sc-blue-900)]">Next step: </strong>{pathway.next_step}</p>
    <p className="mt-4 text-xs text-[var(--sc-slate)]">Source review: {formatContentDate(pathway.reviewed_at)}. Next editorial check due: {formatContentDate(pathway.review_due_at)}. Not a live funder check.</p>
    <FundingSourceLinks ids={pathway.source_ids} />
  </article>;
}
