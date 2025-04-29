import { URLSearchParams } from 'url';
import { search_jobs_input_schema, SearchJobsInputArgs } from '../schemas';

// Function to create the handler
const createGetSearchJobsUrlHandler = (jobstashBaseUrl: string) => {
    return async (args: SearchJobsInputArgs, _extra: any): Promise<any> => {
        console.log("MCP Server (get_search_jobs_url tool): Received call with validated args:", args);

        try {
            const searchParams = new URLSearchParams();
            for (const key in args) {
                // Ensure the key is a valid property of SearchJobsInputArgs
                if (Object.prototype.hasOwnProperty.call(args, key)) {
                    const typedKey = key as keyof SearchJobsInputArgs;
                    const value = args[typedKey];

                    // Map to JobStash API params (similar to search_jobs, but check jobstash-api.md)
                    let paramName = key;
                    if (typedKey === 'salaryMin') paramName = 'minSalaryRange';
                    if (typedKey === 'salaryMax') paramName = 'maxSalaryRange';
                    if (typedKey === 'equity') paramName = 'token';
                    // Add other mappings if necessary based on jobstash-api.md

                    if (value != null) { // Check for null or undefined
                        if (Array.isArray(value)) {
                            if (value.length > 0) {
                                searchParams.set(paramName, value.join(','));
                            }
                        } else {
                            searchParams.set(paramName, String(value));
                        }
                    }
                }
            }

            // Add default pagination? The example URL has them, but maybe not needed for URL generation?
            // searchParams.set('page', '1');
            // searchParams.set('limit', '20');

            const queryString = searchParams.toString();
            const finalUrl = `${jobstashBaseUrl}/list?${queryString}`; // Assuming '/list' is the correct path for browsing too
            console.log(`MCP Server (get_search_jobs_url tool): Constructed URL: ${finalUrl}`);

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

// Export a function that returns the tool configuration
export const getSearchJobsUrlTool = (jobstashBaseUrl: string) => ({
    name: "get_search_jobs_url",
    description: "Constructs a JobStash website URL based on structured job search filters.",
    inputSchema: search_jobs_input_schema.shape, 
    handler: createGetSearchJobsUrlHandler(jobstashBaseUrl),
}); 