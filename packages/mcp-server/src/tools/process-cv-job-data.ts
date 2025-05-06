import { URLSearchParams } from 'url';
import { cv_job_data_schema, CvJobData, SearchJobsInputArgs } from '../schemas';

// Placeholder for potential shared URL building logic if we refactor get-search-url.ts
// For now, we can duplicate or adapt the logic here.
function buildJobStashUrl(jobstashBaseUrl: string, params: SearchJobsInputArgs): string {
    const searchParams = new URLSearchParams();

    // Map SearchJobsInputArgs to query parameters
    if (params.query) {
        searchParams.set('query', params.query);
    }
    if (params.tags && params.tags.length > 0) {
        searchParams.set('tags', params.tags.join(','));
    }
    if (params.locations && params.locations.length > 0) {
        searchParams.set('locations', params.locations.join(','));
    }
    if (params.companyNames && params.companyNames.length > 0) {
        searchParams.set('companyNames', params.companyNames.join(','));
    }
    if (params.seniority && params.seniority.length > 0) {
        searchParams.set('seniority', params.seniority.join(','));
    }
    if (params.salaryMin !== undefined) {
        searchParams.set('minSalaryRange', String(params.salaryMin));
    }
    if (params.salaryMax !== undefined) {
        searchParams.set('maxSalaryRange', String(params.salaryMax));
    }
    if (params.equity !== undefined) {
        searchParams.set('token', String(params.equity));
    }

    const queryString = searchParams.toString();
    return `${jobstashBaseUrl}/jobs?${queryString}`;
}

const createProcessCvJobDataHandler = (jobstashBaseUrl: string) => {
    return async (args: CvJobData, _extra: any): Promise<any> => {
        try {
            // 1. Map CvJobData to SearchJobsInputArgs
            const searchJobArgs: SearchJobsInputArgs = {};

            // Example mapping logic (to be refined):
            if (args.skills && args.skills.length > 0) {
                searchJobArgs.tags = [...(searchJobArgs.tags || []), ...args.skills];
            }
            if (args.jobTitles && args.jobTitles.length > 0) {
                searchJobArgs.query = args.jobTitles.join(' '); // Simple concatenation for query
            }
            if (args.locations && args.locations.length > 0) {
                searchJobArgs.locations = args.locations;
            }
            if (args.seniorityKeywords && args.seniorityKeywords.length > 0) {
                // This needs a more robust mapping to standard seniority terms
                // For now, just pass them as tags or part of the query
                searchJobArgs.tags = [...(searchJobArgs.tags || []), ...args.seniorityKeywords];
            }
            if (args.yearsExperience) {
                // Example: map years to a seniority tag - very basic
                if (args.yearsExperience >= 5) {
                    searchJobArgs.seniority = ['senior'];
                } else if (args.yearsExperience >= 2) {
                    searchJobArgs.seniority = ['mid'];
                } else {
                    searchJobArgs.seniority = ['junior'];
                }
            }
            // ... map other CvJobData fields as needed (companyNames, educationLevel)
            // Consider how fullCvText might be used if direct fields aren't enough

            // 2. Generate JobStash URL using the mapped arguments
            const finalUrl = buildJobStashUrl(jobstashBaseUrl, searchJobArgs);
            const response = { jobstashUrl: finalUrl };

            return {
                content: [{ type: "text", text: JSON.stringify(response) }]
            };
        } catch (error: any) {
            console.error("Error processing cv_job_data request:", error);
            return {
                content: [{ type: "text", text: JSON.stringify({ error: `Failed to process CV data: ${error.message}` }) }],
                isError: true
            };
        }
    };
};

export const getProcessCvJobDataTool = (jobstashBaseUrl: string) => ({
    name: "process_cv_job_data",
    description: "Processes structured job-related data extracted from a CV and returns a JobStash search URL.",
    inputSchema: cv_job_data_schema.shape,
    handler: createProcessCvJobDataHandler(jobstashBaseUrl),
}); 