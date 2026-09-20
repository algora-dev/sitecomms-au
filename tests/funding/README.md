# Funding fixtures

`example-request.json` is a synthetic Queensland community-project request, not an actual applicant. `example-response.json` is the corresponding source-versioned illustration at **2026-09-20T12:00:00Z**, not a live result, grant entitlement or approval. Re-run the handler for the current time; do not publish this fixture as current availability.

The executable positive/negative/date/source/HTTP tests are in `scripts/test-funding.mjs`. Source dates and programme restrictions are tested independently of the response snapshot. Do not change expected restrictions to conceal a failing test. There are no contact details, applications, customer records or secrets in these fixtures.
