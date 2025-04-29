// packages/mcp/src/schemas.ts
import { z } from 'zod';

// Simplified Input schema
export const search_jobs_input_schema = z.object({
    query: z.string().optional(),
    tags: z.array(z.string()).optional(),
    locations: z.array(z.string()).optional(),
    companyNames: z.array(z.string()).optional(),
    seniority: z.array(z.string()).optional(),
    salaryMin: z.number().int().positive().optional(),
    salaryMax: z.number().int().positive().optional(),
    equity: z.boolean().optional(),
  });
  // .strict() // Temporarily remove strict
  // .describe("Input parameters for searching jobs on JobStash."); // Temporarily remove describe

// Type helper for input args
export type SearchJobsInputArgs = z.infer<typeof search_jobs_input_schema>;

// Simplified Output schema for search_jobs
export const search_jobs_output_schema = z.object({
    jobs: z.array(z.object({
        title: z.string(),
        company: z.string(),
        location: z.string(),
        url: z.string().url(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }))
      // .strict() // Temporarily remove strict
    // }).describe("List of matching jobs.") // Temporarily remove describe
  });
  // .strict() // Temporarily remove strict
  // .describe("Output containing a list of matching jobs found on JobStash.");

// Simplified Output schema for get_search_jobs_url
export const get_search_jobs_url_output_schema = z.object({
    jobstashUrl: z.string().url()
  });
  // .strict() // Temporarily remove strict
  // .describe("Output containing the URL for the filtered JobStash job search results page."); 