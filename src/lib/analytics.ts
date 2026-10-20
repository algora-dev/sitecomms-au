/**
 * Analytics abstraction (conversion optimisation pass, 20 October 2026).
 *
 * Components never call a vendor SDK directly. GA4 receives structured event
 * payloads when NEXT_PUBLIC_GA4_MEASUREMENT_ID is configured. Microsoft
 * Clarity receives the same event *name* as a custom event when its script is
 * available, which lets the production team build tool-completion/enquiry
 * funnels without duplicating analytics calls throughout the UI.
 *
 * Never send PII (names, emails, phone numbers, free-text comments) through
 * this layer. Payloads must stay limited to coarse, non-identifying facts.
 */

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (command: "event", eventName: string) => void;
  }
}

export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export function track(event: string, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  const clean: EventPayload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== "") clean[key] = value;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, clean);
  }

  // Clarity custom events intentionally receive the event name only. This is
  // enough for funnels / session filtering and prevents accidental PII or
  // overly granular project context from being copied into another vendor.
  if (typeof window.clarity === "function") {
    window.clarity("event", event);
  }

  // Keep a lightweight debug trail for QA without requiring a vendor console.
  if (process.env.NODE_ENV !== "production") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...clean });
  }
}
