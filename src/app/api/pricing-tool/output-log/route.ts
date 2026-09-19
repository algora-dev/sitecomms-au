/** Retired automatic writer. Keep the route so old clients fail harmlessly.
 * The foundation is stateless: visiting a result must not store an assessment
 * or PDF. Historical database rows/buckets have NOT been altered or migrated.
 * Any future retention workflow needs explicit policy, minimisation, durable
 * abuse controls and server-recomputed values; do not restore the old writer.
 */
export function POST() {
  return Response.json({ error: "automatic_assessment_storage_retired" }, {
    status: 410,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}
