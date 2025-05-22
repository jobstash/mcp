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

/**
 * Utility functions for working with job search filters
 */

interface FilterOption {
    label: string;
    value: string;
}

interface FilterConfig {
    options?: FilterOption[];
    [key: string]: any;
}

interface FiltersJson {
    [key: string]: FilterConfig;
}

/**
 * Extracts option values from a filter configuration
 * @param filtersJson The parsed filters.json content
 * @param filterName The name of the filter to extract options from (e.g., 'tags', 'locations', 'seniority')
 * @param maxExamples Maximum number of examples to include in the description (default: 10)
 * @returns A formatted string with example values, or undefined if no options found
 */
export function getFilterExamplesFromJson(
    filtersJson: FiltersJson,
    filterName: string,
    maxExamples: number = 10
): string | undefined {
    const filter = filtersJson[filterName];

    if (!filter || !filter.options || !Array.isArray(filter.options) || filter.options.length === 0) {
        return undefined;
    }

    // Get a subset of values for examples
    // Using a random sampling approach to get a diverse set of examples
    const allOptions = [...filter.options];
    const selectedOptions: FilterOption[] = [];

    // Select up to maxExamples options
    for (let i = 0; i < Math.min(maxExamples, allOptions.length); i++) {
        if (allOptions.length === 0) break;

        // Pick a random option
        const randomIndex = Math.floor(Math.random() * allOptions.length);
        selectedOptions.push(allOptions[randomIndex]);

        // Remove the selected option to avoid duplicates
        allOptions.splice(randomIndex, 1);
    }

    // Format the examples
    return selectedOptions
        .map(option => `'${option.label}'`)
        .join(', ');
}

/**
 * Updates a filter description with examples from the JSON data
 * @param baseDescription The base description text
 * @param examples The examples string to append
 * @returns The updated description with examples
 */
export function appendExamplesToDescription(
    baseDescription: string,
    examples?: string
): string {
    if (!examples) {
        return baseDescription;
    }

    return `${baseDescription} Examples: ${examples}.`;
} 