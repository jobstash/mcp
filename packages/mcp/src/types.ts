import { z } from 'zod';

export const MCPResponseSchema = z.object({
  responseType: z.enum(['jobSearch', 'clarification', 'error']),
  content: z.string(),
  data: z.record(z.any()).optional(),
});

export type MCPResponse = z.infer<typeof MCPResponseSchema>;

// Configuration options for the MCP client
export interface MCPClientConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
} 