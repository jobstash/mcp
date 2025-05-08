import { z } from 'zod';

// Simplified Job Search Input schema
export const search_jobs_input_schema = z.object({
  query: z.string().optional(),
  tags: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  companyNames: z.array(z.string()).optional(),
  seniority: z.array(z.string()).optional(),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  equity: z.boolean().optional(),
  commitments: z.array(z.string()).optional(), // For contract type
  investors: z.array(z.string()).optional(),
  classifications: z.array(z.string()).optional(), // For job category
});

export type SearchJobsInputArgs = z.infer<typeof search_jobs_input_schema>;

// --- CV Job Data Schema (Input for process_cv_job_data tool) ---
// Represents structured job-related information extracted from a CV by the client.
export const cv_job_data_schema = z.object({
  skills: z.array(z.string()).optional(),
  jobTitles: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  seniorityKeywords: z.array(z.string()).optional(),
  yearsExperience: z.number().int().positive().optional(),
  companyNames: z.array(z.string()).optional(),
  educationLevel: z.string().optional(),
  fullCvText: z.string().optional(), // Can be used for more nuanced mapping if needed
});

export type CvJobData = z.infer<typeof cv_job_data_schema>;
