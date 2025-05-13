import { URLSearchParams } from 'url';
import { SearchJobsInputArgs } from '../schemas';
import { filterConfigurations } from '../config/filter-config';

/**
 * Builds URLSearchParams from SearchJobsInputArgs for a JobStash query.
 * This function uses 'filterConfigurations' (from 'config/filter-config.ts')
 * to map input argument keys to their final API parameter names and to format
 * their values appropriately for the URL.
 *
 * @param args - Standardized job search arguments (SearchJobsInputArgs).
 * @returns A URLSearchParams object representing the configured query.
 */
export const buildJobSearchQuery = (args: SearchJobsInputArgs): URLSearchParams => {
    const searchParams = new URLSearchParams();

    for (const key in args) {
        if (Object.prototype.hasOwnProperty.call(args, key)) {
            const schemaKey = key as keyof SearchJobsInputArgs;
            const valueFromArgs = args[schemaKey];

            if (valueFromArgs !== undefined && valueFromArgs !== null && filterConfigurations[schemaKey]) {
                const config = filterConfigurations[schemaKey];
                let apiValue: string | undefined;

                if (config.apiValueFormatter) {
                    apiValue = config.apiValueFormatter(valueFromArgs);
                } else if (Array.isArray(valueFromArgs)) {
                    // Default for arrays if no formatter: join with comma
                    // This assumes elements are strings or will be stringified correctly by join.
                    // The specific formatters in filter-config.ts are more robust for toLowerCase etc.
                    if (valueFromArgs.length > 0) {
                        apiValue = valueFromArgs.join(',');
                    }
                } else {
                    // Default for non-arrays: convert to string
                    apiValue = String(valueFromArgs);
                }

                if (apiValue !== undefined) {
                    searchParams.set(config.apiParamKey, apiValue);
                }
            }
        }
    }
    return searchParams;
}; 