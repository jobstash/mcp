import { z } from 'zod';

// Basic types for job search filters
export const JobFilterSchema = z.object({
  roles: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  remote: z.boolean().optional(),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead']).optional(),
  location: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  companySize: z.array(z.string()).optional(),
  industry: z.array(z.string()).optional(),
  jobType: z.array(z.enum(['full-time', 'part-time', 'contract', 'internship'])).optional(),
});

export type JobFilter = z.infer<typeof JobFilterSchema>;

export const JobSearchParamsSchema = z.object({
  filters: JobFilterSchema.optional(),
  sort: z.enum(['relevance', 'newest', 'salary']).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type JobSearchParams = z.infer<typeof JobSearchParamsSchema>;

// Response type for the MCP server
export const MCPResponseSchema = z.object({
  responseType: z.enum(['jobSearch', 'clarification', 'error']),
  content: z.string(),
  data: z.object({
    queryParams: JobSearchParamsSchema.optional(),
    suggestions: z.array(z.string()).optional(),
  }).optional(),
  requiredActions: z.object({
    type: z.enum(['clarification', 'authentication']),
    message: z.string(),
  }).optional(),
});

export type MCPResponse = z.infer<typeof MCPResponseSchema>;

// Configuration options for the MCP client
export interface MCPClientConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
} 