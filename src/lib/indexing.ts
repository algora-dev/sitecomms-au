/**
 * Single launch/indexing switch.
 *
 * Keep false on preview/staging. Set SITE_INDEXING_ENABLED=true in the
 * production build environment only after launch QA. This is intentionally
 * server-side and is not exposed to the browser bundle.
 */
export function siteIndexingEnabled(): boolean {
  return process.env.SITE_INDEXING_ENABLED === "true";
}

/**
 * Model-training policy is separate from search discovery. Search crawling
 * can be enabled while GPTBot remains disallowed.
 */
export function modelTrainingCrawlerEnabled(): boolean {
  return process.env.SITE_ALLOW_MODEL_TRAINING === "true";
}
