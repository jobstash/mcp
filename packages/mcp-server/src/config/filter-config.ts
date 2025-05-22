import { z } from 'zod';
import { filtersJson } from './filters';

export interface FilterConfig {
    zodSchema: z.ZodTypeAny;
    llmDescription: string;
    apiValueFormatter?: (value: any) => string | undefined;
}

export const filterConfigurations: Record<string, FilterConfig> = {
    query: {
        zodSchema: z.string().optional(),
        llmDescription: "(string, optional) Any remaining free-text parts of the query.",
        apiValueFormatter: (value: string) => value ? String(value).trim() : undefined,
    },
    tags: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: getMultiSelectDescription('tags'),
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(tag => tag.toLowerCase()).join(',') : undefined,
    },
    locations: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: getMultiSelectWithSearchDescription('locations'),
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(loc => loc.toLowerCase()).join(',') : undefined,
    },
    seniority: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: getMultiSelectDescription('seniority', 'Seniority codes: 1-Junior, 2-Mid, 3-Senior, 4-Lead, 5-Head.'),
        apiValueFormatter: (value: string[] | string) => {
            if (Array.isArray(value) && value.length > 0) {
                return value.map(sen => String(sen).toLowerCase()).join(',');
            }
            if (typeof value === 'string' && value.trim() !== '') {
                return String(value).toLowerCase();
            }
            return undefined;
        },
    },
    minSalaryRange: {
        zodSchema: z.number().int().positive().optional(),
        llmDescription: "(integer, optional) Minimum desired salary mentioned.",
        apiValueFormatter: (value: number) => value !== undefined ? String(value) : undefined,
    },
    maxSalaryRange: {
        zodSchema: z.number().int().positive().optional(),
        llmDescription: "(integer, optional) Maximum desired salary mentioned.",
        apiValueFormatter: (value: number) => value !== undefined ? String(value) : undefined,
    },
    token: {
        zodSchema: z.boolean().optional(),
        llmDescription: getSingleSelectDescription('token', 'Whether the project has a cryptocurrency token (true/false).'),
        apiValueFormatter: (value: boolean) => value !== undefined ? String(value) : undefined,
    },
    commitments: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: getMultiSelectWithSearchDescription('commitments'),
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(com => com.toLowerCase()).join(',') : undefined,
    },
    investors: {
        zodSchema: z.array(z.string()).optional(),
        // Multiselect with search, but list is too long, keeping as is
        llmDescription: "(string[], optional) List of investor names or venture capital firms mentioned as backing companies.",
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(inv => inv.toLowerCase()).join(',') : undefined,
    },
    classifications: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: getMultiSelectWithSearchDescription('classifications'),
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(cls => cls.toLowerCase()).join(',') : undefined,
    },
};

function getMultiSelectDescription(filterName: string, notes?: string): string {
    let label = filtersJson[filterName].label;
    let values = filtersJson[filterName].options.map(option => `'${option.label}'`).join(', ');
    let description = `(string[], optional) List of ${label}. Must be one or more of: ${values}.`;

    if (notes) {
        description += `\n${notes}`;
    }

    return description;
}


function getMultiSelectWithSearchDescription(filterName: string): string {
    let label = filtersJson[filterName].label;
    let values = filtersJson[filterName].options.map(option => `'${option.label}'`).join(', ');
    return `(string[], optional) List of ${label}s. Can include predefined values like: ${values}, or any free text values.`;
}

function getSingleSelectDescription(filterName: string, notes?: string): string {
    let label = filtersJson[filterName].label;
    let options = filtersJson[filterName].options;
    let optionDescriptions = options.map(option => {
        let value = typeof option.value === 'boolean' ? option.value : `'${option.value}'`;
        return `${value}: ${option.label}`;
    }).join(', ');

    // Determine the type based on the first option's value type
    let type = typeof options[0]?.value === 'boolean' ? 'boolean' : 'string';

    let description = `(${type}, optional) ${label}. Possible values: ${optionDescriptions}.`;

    if (notes) {
        description += `\n${notes}`;
    }

    return description;
}