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

// Type helper for input args
export type SearchJobsInputArgs = z.infer<typeof search_jobs_input_schema>;
