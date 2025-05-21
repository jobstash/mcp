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
            const paramNameForAPI = key as keyof SearchJobsInputArgs;
            const valueFromArgs = args[paramNameForAPI];

            if (valueFromArgs !== undefined && valueFromArgs !== null && filterConfigurations[paramNameForAPI]) {
                const config = filterConfigurations[paramNameForAPI];
                let apiValue: string | undefined;

                if (config.apiValueFormatter) {
                    apiValue = config.apiValueFormatter(valueFromArgs);
                } else if (Array.isArray(valueFromArgs)) {
                    if (valueFromArgs.length > 0) {
                        apiValue = valueFromArgs.join(',');
                    }
                } else {
                    apiValue = String(valueFromArgs);
                }

                if (apiValue !== undefined) {
                    searchParams.set(paramNameForAPI, apiValue);
                }
            }
        }
    }
    return searchParams;
}; 