import { URLSearchParams } from 'url';
import { search_jobs_input_schema, SearchJobsInputArgs } from '../schemas';

// Function to create the search_jobs handler, accepting the base URL
const createSearchJobsHandler = (jobstashApiUrl: string) => {
    return async (args: SearchJobsInputArgs, _extra: any): Promise<any> => {

        try {
            const searchParams = new URLSearchParams({
                page: '1',
                limit: '20'
            });

            // Map input args to API query params
            if (args.tags && args.tags.length > 0) {
                searchParams.set('tags', args.tags.join(','));
            }
            if (args.locations && args.locations.length > 0) {
                searchParams.set('locations', args.locations.join(','));
            }
            if (args.seniority && args.seniority.length > 0) {
                searchParams.set('seniority', args.seniority.join(','));
            }
            if (args.salaryMin !== undefined) {
                searchParams.set('minSalaryRange', String(args.salaryMin));
            }
            if (args.salaryMax !== undefined) {
                searchParams.set('maxSalaryRange', String(args.salaryMax));
            }
            if (args.equity !== undefined) {
                searchParams.set('token', String(args.equity));
            }
            // contract type
            // investor
            // job category

            const apiUrl = `${jobstashApiUrl}/jobs/list?${searchParams.toString()}`;

            const apiResponse = await fetch(apiUrl, {
                method: 'GET',
                headers: { 'accept': 'application/json' }
            });

            if (!apiResponse.ok) {
                const errorText = await apiResponse.text();
                console.error(`MCP Server (search_jobs tool): JobStash API request to ${apiUrl} failed with status ${apiResponse.status}: ${errorText}`);
                // Return standard error structure
                return {
                    content: [{ type: "text", text: JSON.stringify({ error: `JobStash API request failed: ${apiResponse.statusText} - ${errorText}` }) }],
                    isError: true
                };
            }

            const responseData = await apiResponse.json();
            const jobs = responseData.data || [];
            const response = { jobs: jobs };

            // Return standard success structure
            return {
                content: [{ type: "text", text: JSON.stringify(response) }]
            };
        } catch (error: any) {
            console.error("Error processing search_jobs request:", error);
            // Return standard error structure
            return {
                content: [{ type: "text", text: JSON.stringify({ error: `Failed to process search_jobs: ${error.message}` }) }],
                isError: true
            };
        }
    };
};

export const getSearchJobsTool = (jobstashApiUrl: string) => ({
    name: "search_jobs",
    description: "Searches for JobStash jobs based on structured filters and returns a list of matching jobs.",
    inputSchema: search_jobs_input_schema.shape,
    handler: createSearchJobsHandler(jobstashApiUrl),
}); 