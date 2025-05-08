import { z } from 'zod';

export interface FilterConfig {
    schemaKey: string;
    zodSchema: z.ZodTypeAny;
    llmDescription: string;
    apiParamKey: string;
    apiValueFormatter?: (value: any) => string | undefined;
}

export const filterConfigurations: Record<string, FilterConfig> = {
    query: {
        schemaKey: 'query',
        zodSchema: z.string().optional(),
        llmDescription: "(string, optional) Any remaining free-text parts of the query.",
        apiParamKey: 'query',
        apiValueFormatter: (value: string) => value ? String(value).trim() : undefined,
    },
    tags: {
        schemaKey: 'tags',
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of skills, technologies, or keywords mentioned.",
        apiParamKey: 'tags',
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(tag => tag.toLowerCase()).join(',') : undefined,
    },
    locations: {
        schemaKey: 'locations',
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of locations mentioned. Use 'Remote' if remote work is specified.",
        apiParamKey: 'locations',
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(loc => loc.toLowerCase()).join(',') : undefined,
    },
    seniority: {
        schemaKey: 'seniority',
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of experience levels mentioned (e.g., 'junior', 'senior', 'lead').",
        apiParamKey: 'seniority',
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(sen => sen.toLowerCase()).join(',') : undefined,
    },
    salaryMin: {
        schemaKey: 'salaryMin',
        zodSchema: z.number().int().positive().optional(),
        llmDescription: "(integer, optional) Minimum desired salary mentioned.",
        apiParamKey: 'minSalaryRange',
        apiValueFormatter: (value: number) => value !== undefined ? String(value) : undefined,
    },
    salaryMax: {
        schemaKey: 'salaryMax',
        zodSchema: z.number().int().positive().optional(),
        llmDescription: "(integer, optional) Maximum desired salary mentioned.",
        apiParamKey: 'maxSalaryRange',
        apiValueFormatter: (value: number) => value !== undefined ? String(value) : undefined,
    },
    equity: {
        schemaKey: 'equity',
        zodSchema: z.boolean().optional(),
        llmDescription: "(boolean, optional) Whether the user mentioned requiring equity.",
        apiParamKey: 'token',
        apiValueFormatter: (value: boolean) => value !== undefined ? String(value) : undefined,
    },
    commitments: {
        schemaKey: 'commitments',
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of job commitment types (e.g., 'full-time', 'part-time', 'contract').",
        apiParamKey: 'commitments',
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(com => com.toLowerCase()).join(',') : undefined,
    },
    investors: {
        schemaKey: 'investors',
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of investor names or venture capital firms mentioned as backing companies.",
        apiParamKey: 'investors',
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(inv => inv.toLowerCase()).join(',') : undefined,
    },
    classifications: {
        schemaKey: 'classifications',
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of job categories or functional areas (e.g., 'engineering', 'product', 'marketing').",
        apiParamKey: 'classifications',
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(cls => cls.toLowerCase()).join(',') : undefined,
    },
}; 