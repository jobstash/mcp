import { URLSearchParams } from 'url';
import { search_jobs_input_schema, SearchJobsInputArgs } from '../schemas';
import { buildJobSearchQuery } from '../utils/filter-utils';

// Function to create the handler
const createGetSearchJobsUrlHandler = (jobstashSiteUrl: string) => {
    return async (args: SearchJobsInputArgs, _extra: any): Promise<any> => {

        try {
            const searchParams = buildJobSearchQuery(args);

            const queryString = searchParams.toString();
            const finalUrl = `${jobstashSiteUrl}/jobs?${queryString}`;

            const response = { jobstashUrl: finalUrl };

            return {
                content: [{ type: "text", text: JSON.stringify(response) }]
            };
        } catch (error: any) {
            console.error("Error processing get_search_jobs_url request:", error);
            return {
                content: [{ type: "text", text: JSON.stringify({ error: `Failed to construct JobStash URL: ${error.message}` }) }],
                isError: true
            };
        }
    };
};

export const getSearchUrlTool = (jobstashSiteUrl: string) => ({
    name: "get_search_url",
    description: "Constructs a JobStash website URL based on structured job search filters.",
    inputSchema: search_jobs_input_schema.shape,
    handler: createGetSearchJobsUrlHandler(jobstashSiteUrl),
}); 