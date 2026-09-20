"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
import Link from "next/link";
import { createProjectStateStore } from "@/lib/project-state-store";
import { usePathname, useSearchParams } from "next/navigation";
import { JURISDICTIONS, PROJECT_STATE_KEY, parseProjectState, projectStateFromFundingPath, projectStateName, withProjectState, type ProjectState } from "@/lib/jurisdictions";

const EVENT = "sitecomms:project-state";
const preferenceStore = createProjectStateStore(() => window.localStorage);
const getSnapshot = preferenceStore.getSnapshot;
function getServerSnapshot(): string { return ""; }
function subscribe(callback: () => void): () => void {
  const onStorage = (event: StorageEvent) => { if (event.key === PROJECT_STATE_KEY || event.key === null) callback(); };
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener(EVENT, callback); window.removeEventListener("storage", onStorage); };
}
export function setProjectState(value: unknown): void {
  preferenceStore.set(value);
  window.dispatchEvent(new Event(EVENT));
}
export function useProjectState(): ProjectState | undefined {
  return parseProjectState(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
}
/** Explicit query wins; otherwise a named funding guide sets the context. No geolocation or redirect. */
export function ProjectStateBoot() {
  const params = useSearchParams();
  const pathname = usePathname();
  const incoming = params.get("state");
  useEffect(() => {
    if (parseProjectState(incoming)) setProjectState(incoming);
    else if (incoming === "AU") setProjectState(undefined);
    else {
      const routeState = projectStateFromFundingPath(pathname ?? "");
      if (routeState) setProjectState(routeState);
    }
  }, [incoming, pathname]);
  return null;
}
export function ProjectStateSelector({ compact = false, required = false, name, label = "Project state or territory", labelClassName, selectClassName, wrapperClassName }: {
  compact?: boolean; required?: boolean; name?: string; label?: string; labelClassName?: string; selectClassName?: string; wrapperClassName?: string;
}) {
  const id = useId();
  const state = useProjectState();
  return (
    <div className={wrapperClassName ?? (compact ? "flex flex-wrap items-center gap-2" : "space-y-2")}>
      <label htmlFor={id} className={labelClassName ?? "text-sm font-medium text-[var(--sc-blue-900)]"}>{label}{required ? " *" : ""}</label>
      <select id={id} name={name} value={state ?? ""} required={required}
        onChange={(event) => setProjectState(event.target.value)}
        className={selectClassName ?? `rounded-lg border border-[var(--sc-border)] bg-white px-3 py-2 text-sm text-[var(--sc-blue-900)] ${compact ? "max-w-full" : "w-full"}`}>
        <option value="">{required ? "Select the project location" : "Australia-wide / not selected"}</option>
        {JURISDICTIONS.map((item) => <option key={item.code} value={item.code}>{item.name} ({item.code})</option>)}
      </select>
    </div>
  );
}
export function ProjectStatePanel({ purpose = "planning" }: { purpose?: "planning" | "pricing" | "funding" | "finance" }) {
  const state = useProjectState();
  const note = purpose === "pricing"
    ? "The calculator uses the same AUD planning assumptions in every state. Travel, regional access and site-wide cabling need a separate project quote."
    : purpose === "funding"
      ? "The funding checker uses this state with the legal applicant and project scope. QLD, NSW, VIC, WA and SA have reviewed state routes; other jurisdictions have selected national records only. Location is not proof of funding eligibility."
      : purpose === "finance"
        ? "Location is carried into your enquiry. This version does not check state borrowing rules, lender eligibility or approval. Public organisations must confirm their authority to enter an arrangement."
        : "Use one national guide library, with your project location remembered for tools and enquiries. Change or clear it at any time; no location detection is used.";
  return (
    <aside className="sc-card my-6 bg-[var(--sc-blue-50)] p-5" aria-label="Project location context">
      <ProjectStateSelector />
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{note}</p>
      <p className="mt-2 text-xs text-[var(--sc-slate)]" role="status">Project context: {projectStateName(state)}.</p>
      {purpose !== "planning" && <Link href={withProjectState("/states", state)} className="mt-3 inline-block text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">State and territory planning</Link>}
    </aside>
  );
}
export function StateAwareLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const state = useProjectState();
  return <Link href={withProjectState(href, state)} className={className}>{children}</Link>;
}
