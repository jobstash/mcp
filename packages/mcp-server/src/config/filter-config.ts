import { z } from 'zod';

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
        llmDescription: "(string[], optional) List of skills, technologies, or keywords mentioned.",
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(tag => tag.toLowerCase()).join(',') : undefined,
    },
    locations: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of locations mentioned. Use 'Remote' if remote work is specified.",
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(loc => loc.toLowerCase()).join(',') : undefined,
    },
    seniority: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[] or string, optional) List of experience levels mentioned (e.g., 'junior', 'senior', 'lead', or 1-5). API expects numeric strings if applicable.",
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
        llmDescription: "(boolean, optional) Whether the project has a cryptocurrency token (true/false).",
        apiValueFormatter: (value: boolean) => value !== undefined ? String(value) : undefined,
    },
    commitments: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of job commitment types (e.g., 'full-time', 'part-time', 'contract').",
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(com => com.toLowerCase()).join(',') : undefined,
    },
    investors: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of investor names or venture capital firms mentioned as backing companies.",
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(inv => inv.toLowerCase()).join(',') : undefined,
    },
    classifications: {
        zodSchema: z.array(z.string()).optional(),
        llmDescription: "(string[], optional) List of job categories or functional areas (e.g., 'engineering', 'product', 'marketing').",
        apiValueFormatter: (value: string[]) => value && value.length > 0 ? value.map(cls => cls.toLowerCase()).join(',') : undefined,
    },
}; 