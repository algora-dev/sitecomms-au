import type { CalculatorState } from "../pricing/types";
import { JURISDICTIONS } from "../jurisdictions";
import type { InputIssue } from "./contracts";

/** Bounds match the existing human tool. These are input limits, not design guarantees. */
export const INPUT_LIMITS = { areas: 99, speakersPerArea: 99, controlStations: 5, briefCharacters: 4000, bodyBytes: 16384 } as const;
export const TIERS = ["A", "B", "C", "unsure"] as const;
export const PACKAGES = ["essential", "safety", "interactive"] as const;
export const TWO_WAY_MODES = ["package", "none", "some", "all"] as const;
export const ENTRY_TYPES = ["voice", "video"] as const;
export const AREA_KEYS = ["standardIndoor", "largeIndoor", "outdoor", "largeOutdoor", "entry"] as const;
export const SPEAKER_KEYS = ["largeIndoor", "outdoor", "largeOutdoor"] as const;
const countSchema = (max: number, min = 0) => ({ type: "integer", minimum: min, maximum: max });
const shape = (properties: Record<string, unknown>, required = Object.keys(properties)) => ({ type: "object", additionalProperties: false, properties, required });

export const CALCULATOR_INPUT_SCHEMA = shape({
  tier: { type: "string", enum: TIERS },
  areas: shape(Object.fromEntries(AREA_KEYS.map(k => [k, countSchema(INPUT_LIMITS.areas)]))),
  speakers: shape(Object.fromEntries(SPEAKER_KEYS.map(k => [k, { anyOf: [{ type: "null" }, countSchema(INPUT_LIMITS.speakersPerArea, 1)] }]))),
  featurePackage: { type: "string", enum: PACKAGES },
  fineTune: shape({ twoWayMode: { type: "string", enum: TWO_WAY_MODES }, twoWayQty: countSchema(INPUT_LIMITS.areas),
    entryIntercom: { type: "string", enum: ENTRY_TYPES }, additionalControlStations: countSchema(INPUT_LIMITS.controlStations), monitoring: { type: "boolean" } }),
});
export const ASSESSMENT_INPUT_SCHEMA = shape({
  intent: { type: "string", enum: ["pricing", "funding", "finance"] },
  configuration: CALCULATOR_INPUT_SCHEMA,
  project_state: { anyOf: [{ type: "string", enum: JURISDICTIONS.map(j => j.code) }, { type: "null" }] },
  quantity_basis: { type: "string", enum: ["approximate", "customer_supplied", "unspecified"] },
  requested_outcome: { type: "string", enum: ["budget_estimate", "qualification", "formal_quote"] },
  brief: { type: "string", maxLength: INPUT_LIMITS.briefCharacters },
}, ["intent"]);

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
export function checkObject(value: unknown, field: string, allowed: readonly string[], required: readonly string[], issues: InputIssue[]): value is Record<string, unknown> {
  if (!isRecord(value)) { issues.push({ field, code: value === undefined ? "missing" : "invalid", message: "Supply an object with the documented fields." }); return false; }
  for (const key of Object.keys(value)) if (!allowed.includes(key)) issues.push({ field: field ? `${field}.${key}` : key, code: "unknown_field", message: "This field is not supported." });
  for (const key of required) if (!Object.hasOwn(value, key) || value[key] === undefined) issues.push({ field: field ? `${field}.${key}` : key, code: "missing", message: "Supply this field explicitly; unknown values are not treated as zero." });
  return true;
}
function checkEnum(value: unknown, field: string, values: readonly unknown[], issues: InputIssue[]) {
  if (value !== undefined && !values.includes(value)) issues.push({ field, code: "invalid", message: `Choose one of: ${values.join(", ")}.` });
}
function checkCount(value: unknown, field: string, max: number, issues: InputIssue[], min = 0) {
  if (value !== undefined && (typeof value !== "number" || !Number.isSafeInteger(value) || value < min || value > max)) issues.push({ field, code: "invalid", message: `Supply a whole number from ${min} to ${max}; larger or uncertain designs need review.` });
}
export function validateCalculatorState(input: unknown): { value: CalculatorState | null; issues: InputIssue[] } {
  const issues: InputIssue[] = [];
  const keys = ["tier", "areas", "speakers", "featurePackage", "fineTune"];
  if (!checkObject(input, "configuration", keys, keys, issues)) return { value: null, issues };
  checkEnum(input.tier, "configuration.tier", TIERS, issues);
  checkEnum(input.featurePackage, "configuration.featurePackage", PACKAGES, issues);
  if (checkObject(input.areas, "configuration.areas", AREA_KEYS, AREA_KEYS, issues)) {
    for (const k of AREA_KEYS) checkCount(input.areas[k], `configuration.areas.${k}`, INPUT_LIMITS.areas, issues);
  }
  if (checkObject(input.speakers, "configuration.speakers", SPEAKER_KEYS, SPEAKER_KEYS, issues)) {
    for (const k of SPEAKER_KEYS) if (input.speakers[k] !== null) checkCount(input.speakers[k], `configuration.speakers.${k}`, INPUT_LIMITS.speakersPerArea, issues, 1);
  }
  const ftKeys = ["twoWayMode", "twoWayQty", "entryIntercom", "additionalControlStations", "monitoring"];
  if (checkObject(input.fineTune, "configuration.fineTune", ftKeys, ftKeys, issues)) {
    const ft = input.fineTune;
    checkEnum(ft.twoWayMode, "configuration.fineTune.twoWayMode", TWO_WAY_MODES, issues);
    checkEnum(ft.entryIntercom, "configuration.fineTune.entryIntercom", ENTRY_TYPES, issues);
    checkCount(ft.twoWayQty, "configuration.fineTune.twoWayQty", INPUT_LIMITS.areas, issues);
    checkCount(ft.additionalControlStations, "configuration.fineTune.additionalControlStations", INPUT_LIMITS.controlStations, issues);
    if (ft.monitoring !== undefined && typeof ft.monitoring !== "boolean") issues.push({ field: "configuration.fineTune.monitoring", code: "invalid", message: "Supply true or false, not a text value." });
    if (ft.twoWayMode === "some" && isRecord(input.areas) && typeof ft.twoWayQty === "number" && typeof input.areas.standardIndoor === "number" && ft.twoWayQty > input.areas.standardIndoor) issues.push({ field: "configuration.fineTune.twoWayQty", code: "conflict", message: "Selected two-way rooms cannot exceed the standard indoor room count." });
  }
  // Direct calls can contain undefined values even though JSON cannot.
  for (const [prefix, object] of [["configuration", input], ["configuration.areas", input.areas], ["configuration.speakers", input.speakers], ["configuration.fineTune", input.fineTune]] as const) {
    if (isRecord(object)) for (const [key, v] of Object.entries(object)) if (v === undefined) issues.push({ field: `${prefix}.${key}`, code: "missing", message: "Supply a value explicitly." });
  }
  return { value: issues.length ? null : structuredClone(input) as unknown as CalculatorState, issues };
}

/** Both old doubly-encoded links and plain JSON are accepted, never shallow-merged. */
export function parseCalculatorConfig(raw: string | null): ReturnType<typeof validateCalculatorState> {
  if (raw === null || raw.length > INPUT_LIMITS.bodyBytes) return { value: null, issues: [{ field: "cfg", code: "invalid", message: "The saved configuration is missing or too large." }] };
  try {
    const json = raw.trim().startsWith("{") ? raw : decodeURIComponent(raw);
    return validateCalculatorState(JSON.parse(json));
  } catch {
    return { value: null, issues: [{ field: "cfg", code: "invalid", message: "The saved configuration could not be read. Please enter the site details again." }] };
  }
}
