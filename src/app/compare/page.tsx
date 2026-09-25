import { permanentRedirect } from "next/navigation";
import { SCHOOL_COMPARE_PATH } from "@/lib/content/school-compare";

/** Legacy route. next.config provides the primary 308 and preserves query parameters.
 * This fallback also preserves multi-value query parameters if the config redirect is disabled.
 */
export default async function LegacyComparePage({
  searchParams,
}: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    if (Array.isArray(value)) value.forEach(item => query.append(key, item));
    else if (value !== undefined) query.append(key, value);
  }
  permanentRedirect(`${SCHOOL_COMPARE_PATH}${query.size ? `?${query}` : ""}`);
}
