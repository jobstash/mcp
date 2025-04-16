// packages/mcp/src/schemas.ts
import { z } from 'zod';

// Input schema - used by both tools
export const search_jobs_input_schema = z.object({
    // Optional free-text query
    query: z.string().optional().describe("Optional free-text query to refine search (passed to backend if supported)."),
    // List of skills or keywords
    tags: z.array(z.string()).optional().describe("List of skills or keywords (e.g., ['solidity', 'foundry'])"),
    // List of desired locations
    locations: z.array(z.string()).optional().describe("List of desired locations (e.g., ['Remote', 'London']). Use 'Remote' for remote jobs."),
    // List of specific company names
    companyNames: z.array(z.string()).optional().describe("List of specific company names to filter by."),
    // List of desired experience levels
    seniority: z.array(z.string()).optional().describe("List of desired experience levels (e.g., ['junior', 'senior'])."),
    // Minimum desired salary
    salaryMin: z.number().int().positive().optional().describe("Minimum desired salary (numeric value)."),
    // Maximum desired salary
    salaryMax: z.number().int().positive().optional().describe("Maximum desired salary (numeric value)."),
    // Filter for jobs offering equity
    equity: z.boolean().optional().describe("Filter for jobs offering equity (true/false)."),
    // Add other relevant filters supported by JobStash backend
  }).strict() // Disallow properties not explicitly defined
  .describe("Input parameters for searching jobs on JobStash.");

// Type helper for input args
export type SearchJobsInputArgs = z.infer<typeof search_jobs_input_schema>;

// Output schema for search_jobs (returns job list)
export const search_jobs_output_schema = z.object({
    jobs: z.array(z.object({
        title: z.string().describe("Job title"),
        company: z.string().describe("Company name"),
        location: z.string().describe("Job location description (e.g., 'Remote', 'London, UK')"),
        url: z.string().url().describe("Direct URL to the job posting"),
        description: z.string().optional().describe("Short description or snippet of the job details"),
        tags: z.array(z.string()).optional().describe("Relevant skills or tags"),
        // Add other relevant job properties from JobStash backend
      }).strict() // Ensure individual job objects don't have extra properties
    ).describe("List of matching jobs.")
  }).strict() // Disallow properties other than 'jobs'
  .describe("Output containing a list of matching jobs found on JobStash.");

// Output schema for get_search_jobs_url (returns URL)
export const get_search_jobs_url_output_schema = z.object({
    jobstashUrl: z.string().url().describe("The fully constructed URL to the JobStash website displaying the filtered job results.")
  }).strict() // Disallow properties other than 'jobstashUrl'
  .describe("Output containing the URL for the filtered JobStash job search results page."); 