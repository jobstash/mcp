import { cv_job_data_schema, CvJobData, SearchJobsInputArgs } from '../schemas';
import { buildJobSearchQuery } from '../utils/filter-utils'; // Import centralized utility

const createProcessCvJobDataHandler = (jobstashSiteUrl: string) => {
    return async (args: CvJobData, _extra: any): Promise<any> => {
        try {
            // 1. Map CvJobData to SearchJobsInputArgs
            const searchJobArgs: SearchJobsInputArgs = {};

            if (args.skills && args.skills.length > 0) {
                searchJobArgs.tags = [...(searchJobArgs.tags || []), ...args.skills];
            }
            if (args.jobTitles && args.jobTitles.length > 0) {
                // Consider making this more robust, e.g., taking the most prominent title or adding all to tags
                searchJobArgs.query = args.jobTitles.join(' ');
            }
            if (args.locations && args.locations.length > 0) {
                searchJobArgs.locations = args.locations;
            }

            if (args.companyNames && args.companyNames.length > 0) { // Added mapping for companyNames
                searchJobArgs.companyNames = args.companyNames;
            }

            if (args.seniorityKeywords && args.seniorityKeywords.length > 0) {
                // For now, add to tags. Could be mapped to seniority array more intelligently later.
                searchJobArgs.tags = [...(searchJobArgs.tags || []), ...args.seniorityKeywords];
            }

            if (args.yearsExperience !== undefined && args.yearsExperience !== null) {
                if (args.yearsExperience >= 5) {
                    searchJobArgs.seniority = ['senior'];
                } else if (args.yearsExperience >= 2) {
                    searchJobArgs.seniority = ['mid'];
                } else { // Includes 0, 1
                    searchJobArgs.seniority = ['junior'];
                }
            }

            if (args.educationLevel) { // Added mapping for educationLevel to tags
                searchJobArgs.tags = [...(searchJobArgs.tags || []), args.educationLevel];
            }

            // Ensure tags are unique if multiple sources contribute to them
            if (searchJobArgs.tags) {
                searchJobArgs.tags = Array.from(new Set(searchJobArgs.tags));
            }

            // 2. Generate JobStash URL using the centralized utility
            // The buildJobSearchQuery function expects the full base URL (including /jobs)
            // and then it appends the query string.
            // The jobstashSiteUrl passed to this handler typically doesn't include /jobs.
            const baseUrlForUtil = jobstashSiteUrl.endsWith('/jobs') ? jobstashSiteUrl : `${jobstashSiteUrl}/jobs`;

            const searchParams: URLSearchParams = buildJobSearchQuery(searchJobArgs);
            const queryString = searchParams.toString();
            const finalUrl = queryString ? `${baseUrlForUtil}?${queryString}` : baseUrlForUtil;
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

export const getProcessCvJobDataTool = (jobstashSiteUrl: string) => ({
    name: "process_cv_job_data",
    description: "Processes structured job-related data extracted from a CV and returns a JobStash search URL.",
    inputSchema: cv_job_data_schema.shape,
    handler: createProcessCvJobDataHandler(jobstashSiteUrl),
}); 