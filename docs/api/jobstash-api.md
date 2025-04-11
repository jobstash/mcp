# JobStash API Interaction Details

This document outlines details for interacting with the JobStash API (or related middleware).

## Example Job Search Query (`/jobs/list`)

The following `curl` command demonstrates querying the `/jobs/list` endpoint:

```bash
curl -X 'GET' \
  'https://middleware.jobstash.xyz/jobs/list?publicationDate=this-week&minSalaryRange=100000&maxSalaryRange=500000&minHeadCount=1&maxHeadCount=100&minTvl=100000&maxTvl=99999999999&audits=true&hacks=false&tags=developers&chains=ethereum&chains=solana&seniority=senior&locations=remote&token=true&page=1&limit=20' \
  -H 'accept: application/json'
### Parameters Observed:

*   `publicationDate` (e.g., `this-week`)
*   `minSalaryRange` (numeric)
*   `maxSalaryRange` (numeric)
*   `minHeadCount` (numeric)
*   `maxHeadCount` (numeric)
*   `minTvl` (numeric, "Total Value Locked"?)
*   `maxTvl` (numeric)
*   `audits` (boolean)
*   `hacks` (boolean)
*   `tags` (string, potentially comma-separated or single?) - *Need clarification*
*   `chains` (string, can appear multiple times)
*   `seniority` (string, e.g., `senior`)
*   `locations` (string, e.g., `remote`)
*   `token` (boolean)
*   `page` (numeric)
*   `limit` (numeric)

## Example Response Structure (`/jobs/list`)

An example JSON response for the `/jobs/list` endpoint can be found in `docs/api/jobstash-api-response.json`.

Key top-level fields:
*   `page` (number): The current page number.
*   `count` (number): The number of results on the current page.
*   `total` (number): The total number of results available.
*   `data` (array): An array of job objects. See the example file for the detailed structure of job objects.

## API Endpoint

The base URL for the API is `https://middleware.jobstash.xyz`.

## TODO

*   [x] Confirm if `https://middleware.jobstash.xyz` is the target API or an existing middleware.
*   [ ] Obtain full API schema or documentation (if available beyond examples).
*   [x] Get example response structure for `/jobs/list`.
*   [ ] Identify endpoint and structure for fetching job details.
*   [ ] Clarify how multiple `tags` are handled in requests (the example shows `tags=developers`, but the response has a `tags` array. Can the request take multiple `tags` params like `chains`?).
*   [ ] Confirm authentication requirements (currently assuming none).

curl -X 'GET' \
  'https://middleware.jobstash.xyz/jobs/list?publicationDate=this-week&minSalaryRange=100000&maxSalaryRange=500000' \
  -H 'accept: application/json'