import { FUNDING_SOURCES } from "@/lib/funding/catalogue";
import { formatContentDate } from "@/lib/content-meta";
import type { PathwayAssessment } from "@/lib/funding/types";

export function FundingSourceLinks({ ids }: { ids: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm">
      {ids.map(id => {
        const source = FUNDING_SOURCES.find(item => item.id === id);
        return source ? (
          <li key={id}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">
              {source.title}<span className="sr-only"> (official source, opens a new tab)</span>
            </a>
            <p className="mt-1 text-xs text-[var(--sc-slate)]">{source.publisher}</p>
          </li>
        ) : <li key={id}>Official evidence is currently unavailable. Check with the programme owner.</li>;
      })}
    </ul>
  );
}

export function FundingPathwayCard({ pathway, secondary = false }: { pathway: PathwayAssessment; secondary?: boolean }) {
  const noEvidence = ["withdrawn", "unavailable"].includes(pathway.freshness);
  const badge = pathway.section === "investigate"
    ? "Worth investigating"
    : pathway.section === "check_first"
      ? "Check eligibility / status"
      : pathway.section === "watchlist"
        ? "Not currently actionable"
        : "Outside the basic match";

  const source = pathway.source_ids.map(id => FUNDING_SOURCES.find(item => item.id === id)).find(Boolean);

  return (
    <article className={`rounded-xl border border-[var(--sc-border)] bg-white ${secondary ? "p-4" : "p-5 sm:p-6"}`} aria-labelledby={`result-${pathway.id}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--sc-blue-50)] px-2.5 py-1 text-xs font-bold text-[var(--sc-blue-800)]">{badge}</span>
        <span className="text-xs font-semibold text-[var(--sc-slate)]">{pathway.route_label}</span>
      </div>

      <h4 id={`result-${pathway.id}`} className="mt-3 text-lg font-bold text-[var(--sc-blue-900)]">{pathway.title}</h4>

      {!secondary && !noEvidence && (
        <>
          <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">
            <strong className="text-[var(--sc-blue-900)]">Why it may fit: </strong>{pathway.interpretation}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">
            <strong className="text-[var(--sc-blue-900)]">Next step: </strong>{pathway.next_step}
          </p>
          {source && (
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">
              View the official source<span className="sr-only"> (opens a new tab)</span>
            </a>
          )}
        </>
      )}

      {secondary && (
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{pathway.availability_label}</p>
      )}

      <details className="mt-4 text-sm text-[var(--sc-slate)]">
        <summary className="cursor-pointer font-semibold text-[var(--sc-blue-900)]">
          {secondary ? "Why this is not in the main result" : "See evidence and conditions"}
        </summary>

        <div className="mt-3 border-t border-[var(--sc-border)] pt-3">
          <p className="leading-relaxed"><strong className="text-[var(--sc-blue-900)]">Current status: </strong>{pathway.availability_label}</p>

          {noEvidence ? (
            <p className="mt-3 leading-relaxed">The evidence for this record is unavailable or withdrawn, so no current positive conclusion is shown.</p>
          ) : (
            <>
              <p className="mt-3 leading-relaxed"><strong className="text-[var(--sc-blue-900)]">Official evidence says: </strong>{pathway.facts}</p>
              {!!pathway.reasons.length && (
                <div className="mt-3">
                  <p className="font-semibold text-[var(--sc-blue-900)]">Things to confirm</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">{pathway.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>
                </div>
              )}
              {!!pathway.conditions.length && (
                <div className="mt-3">
                  <p className="font-semibold text-[var(--sc-blue-900)]">Programme conditions</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">{pathway.conditions.map(condition => <li key={condition}>{condition}</li>)}</ul>
                </div>
              )}
              {pathway.published_funding_terms && (
                <p className="mt-3 leading-relaxed"><strong className="text-[var(--sc-blue-900)]">Published programme terms: </strong>{pathway.published_funding_terms}</p>
              )}
            </>
          )}

          {secondary && !noEvidence && (
            <p className="mt-3 leading-relaxed"><strong className="text-[var(--sc-blue-900)]">Next step: </strong>{pathway.next_step}</p>
          )}

          <div className="mt-4 border-t border-[var(--sc-border)] pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-900)]">Official evidence</p>
            <FundingSourceLinks ids={pathway.source_ids} />
            <p className="mt-3 text-xs text-[var(--sc-slate)]">SiteComms source review: {formatContentDate(pathway.reviewed_at)} · next editorial check: {formatContentDate(pathway.review_due_at)}.</p>
          </div>
        </div>
      </details>
    </article>
  );
}
