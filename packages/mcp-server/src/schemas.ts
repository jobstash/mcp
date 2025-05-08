import { z } from 'zod';
import { filterConfigurations } from './config/filter-config';

const schemaShape: Record<string, z.ZodTypeAny> = {};
for (const key in filterConfigurations) {
  schemaShape[filterConfigurations[key].schemaKey] = filterConfigurations[key].zodSchema;
}

export const search_jobs_input_schema = z.object(schemaShape);

export type SearchJobsInputArgs = z.infer<typeof search_jobs_input_schema>;

// --- CV Job Data Schema (Input for process_cv_job_data tool) ---
export const cv_job_data_schema = z.object({
  skills: z.array(z.string()).optional(),
  jobTitles: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  seniorityKeywords: z.array(z.string()).optional(),
  yearsExperience: z.number().int().positive().optional(),
  companyNames: z.array(z.string()).optional(),
  educationLevel: z.string().optional(),
  fullCvText: z.string().optional(),
});

export type CvJobData = z.infer<typeof cv_job_data_schema>;
