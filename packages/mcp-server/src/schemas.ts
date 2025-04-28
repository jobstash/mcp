// packages/mcp/src/schemas.ts
// import { z } from 'zod'; // <<< Comment out or remove standard import
import { z } from "@modelcontextprotocol/sdk/node_modules/zod"; // <<< Use SDK's Zod
import { zodToJsonSchema } from 'zod-to-json-schema';

// Simplified Input schema
export const search_jobs_input_schema = z.object({
    query: z.string().optional().describe("Keywords or job title to search for"),
    tags: z.array(z.string()).optional().describe("Specific skill tags (e.g., ['typescript', 'react'])"),
    location: z.string().optional().describe("Desired job location"),
    maxResults: z.number().int().positive().optional().default(10).describe("Maximum number of results to return")
});
  // .strict() // Temporarily remove strict
  // .describe("Input parameters for searching jobs on JobStash."); // Temporarily remove describe

// Type helper for input args
export type SearchJobsInputArgs = z.infer<typeof search_jobs_input_schema>;

// Simplified Output schema for search_jobs
export const search_jobs_output_schema = z.object({
    jobs: z.array(z.object({
        id: z.string(),
        title: z.string(),
        company: z.string(),
        location: z.string(),
        descriptionSnippet: z.string(),
        url: z.string().url()
    })).describe("List of found jobs")
      // .strict() // Temporarily remove strict
    // }).describe("List of matching jobs.") // Temporarily remove describe
  });
  // .strict() // Temporarily remove strict
  // .describe("Output containing a list of matching jobs found on JobStash.");

// Simplified Output schema for get_search_jobs_url
export const get_search_jobs_url_output_schema = z.object({
    searchUrl: z.string().url().describe("The direct URL to the JobStash search results page")
  });
  // .strict() // Temporarily remove strict
  // .describe("Output containing the URL for the filtered JobStash job search results page."); 

// --- Utility Functions (Optional) ---

// Function to convert Zod schema to JSON Schema
export function getJsonSchema(schema: z.ZodType<any, any>) {
  return zodToJsonSchema(schema, { $refStrategy: 'none' });
} 