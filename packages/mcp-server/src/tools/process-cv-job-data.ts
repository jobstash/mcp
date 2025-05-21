import { URLSearchParams } from 'url';
import { cv_job_data_schema, CvJobData, SearchJobsInputArgs } from '../schemas';
import { buildJobSearchQuery } from '../utils/filter-utils'; // Import centralized utility

// Helper types for the mapping logic
type CvDataToSearchArgMapper<K extends keyof SearchJobsInputArgs> =
    (cvData: CvJobData) => SearchJobsInputArgs[K] | undefined;

type CvToSearchArgsMappers = {
    [K in keyof SearchJobsInputArgs]: CvDataToSearchArgMapper<K>;
};

/**
 * Maps CvJobData fields to SearchJobsInputArgs for URL generation.
 * Ensures compile-time safety against filterConfiguration changes.
 *
 * Key Mappings:
 * - query: Uses up to 3 unique 'cvData.jobTitles'.
 * - tags: Aggregates unique 'cvData.skills', 'seniorityKeywords', & 'cvData.educationLevel'.
 * - locations: Directly from 'cvData.locations'.
 * - seniority: From 'cvData.yearsExperience' (e.g., 0-1y: ["junior"], 2-4y: ["mid"], 5y+: ["senior"]).
 * - companyNames, minSalaryRange, maxSalaryRange, token (has crypto token), commitments, investors, classifications:
 *   Intentionally undefined (not derived from CV context by this tool).
 */
const mappers: CvToSearchArgsMappers = {
    query: (cvData) => {
        if (cvData.jobTitles && cvData.jobTitles.length > 0) {
            // Get unique titles. For simplicity, uses a Set for exact unique strings.
            const uniqueTitles = Array.from(new Set(cvData.jobTitles));
            // Limit to the first N titles (e.g., 3)
            const titlesToUse = uniqueTitles.slice(0, 3);
            if (titlesToUse.length > 0) {
                return titlesToUse.join(' ');
            }
        }
        return undefined;
    },
    tags: (cvData) => {
        let accumulatedTags: string[] = [];
        if (cvData.skills && cvData.skills.length > 0) {
            accumulatedTags.push(...cvData.skills.map(String));
        }
        if (cvData.seniorityKeywords && cvData.seniorityKeywords.length > 0) {
            accumulatedTags.push(...cvData.seniorityKeywords.map(String));
        }
        if (cvData.educationLevel) {
            accumulatedTags.push(String(cvData.educationLevel));
        }
        return accumulatedTags.length > 0 ? Array.from(new Set(accumulatedTags)) : undefined;
    },
    locations: (cvData) => cvData.locations, // Assumes CvJobData.locations is string[] | undefined
    companyNames: (_cvData) => undefined, // Corrected: Do not derive companyNames filter from CV content
    seniority: (cvData) => {
        if (cvData.yearsExperience !== undefined && cvData.yearsExperience !== null) {
            if (cvData.yearsExperience >= 5) return ['senior'];
            if (cvData.yearsExperience >= 2) return ['mid'];
            return ['junior']; // Includes 0, 1
        }
        return undefined;
    },
    // Renamed from salaryMin to minSalaryRange
    minSalaryRange: (_cvData) => undefined,
    // Renamed from salaryMax to maxSalaryRange
    maxSalaryRange: (_cvData) => undefined,
    // Renamed from equity to token; this tool does not map CV data to 'token' (has crypto token)
    token: (_cvData) => undefined,
    commitments: (_cvData) => undefined,
    investors: (_cvData) => undefined,
    classifications: (_cvData) => undefined,
};

const createProcessCvJobDataHandler = (jobstashSiteUrl: string) => {
    return async (args: CvJobData, _extra: any): Promise<any> => {
        try {
            const searchJobArgs = {} as Partial<SearchJobsInputArgs>;
            const cvDataInput = args; // Alias for clarity

            // Iterate over the keys of our mappers (which must match SearchJobsInputArgs keys)
            for (const key of Object.keys(mappers) as (keyof SearchJobsInputArgs)[]) {
                const mapper = mappers[key];
                const value = mapper(cvDataInput);
                if (value !== undefined) {
                    // Type assertion needed because searchJobArgs is Partial initially
                    (searchJobArgs as SearchJobsInputArgs)[key] = value;
                }
            }

            const baseUrlForUtil = jobstashSiteUrl.endsWith('/jobs') ? jobstashSiteUrl : `${jobstashSiteUrl}/jobs`;
            const searchParams: URLSearchParams = buildJobSearchQuery(searchJobArgs as SearchJobsInputArgs);
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