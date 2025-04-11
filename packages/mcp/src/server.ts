import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from 'zod';
import { MCPResponse } from './types';
import { createJobSearchPrompt } from './prompts';
import { OpenAI } from 'openai';

export interface McpManagerConfig {
  name: string;
  version: string;
  supportedFilters: any[];
  model?: string;
}

export class McpManager {
  private server: McpServer;
  private openai: OpenAI;
  private model: string;
  private supportedFilters: any[];

  constructor(config: McpManagerConfig) {
    // Read OpenAI key and model from environment variables
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new Error('Configuration error: OPENAI_API_KEY environment variable not set.');
    }
    this.openai = new OpenAI({
      apiKey: openaiApiKey,
    });
    this.model = process.env.OPENAI_MODEL || config.model || 'gpt-4o'; // Allow override from env or config, default gpt-4o
    this.supportedFilters = config.supportedFilters;

    this.server = new McpServer({
      name: config.name,
      version: config.version
    });

    this.setupPrompts();
    this.setupTools();
  }

  private setupPrompts() {
    // Job search prompt
    this.server.prompt(
      "jobSearch",
      { query: z.string() },
      (params: { query: string }) => {
        const prompt = createJobSearchPrompt(params.query);
        return {
          messages: prompt.messages.map((msg: any) => {
            // Ensure role is either user or assistant (MCP requires)
            const role = msg.role === "user" || msg.role === "assistant" 
              ? msg.role 
              : "user";
            
            return {
              role,
              content: msg.content
            };
          })
        };
      }
    );
  }

  private setupTools() {
    // Process natural language query into structured job search parameters
    this.server.tool(
      "processJobQuery",
      { query: z.string() },
      async (params: { query: string }) => {
        try {
          // Use LLM to extract job search parameters from the query
          const completion = await this.openai.chat.completions.create({
            model: this.model,
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant that extracts job search parameters from user queries. Return a JSON object with filter parameters such as roles, skills, remote, experienceLevel, etc."
              },
              {
                role: "user",
                content: `Extract job search parameters from this query: "${params.query}"`
              }
            ],
            response_format: { type: "json_object" }
          });

          const content = completion.choices[0].message.content;
          if (!content) {
            throw new Error("Failed to extract parameters from query");
          }

          const parsedContent = JSON.parse(content);
          
          // Create response with parsed parameters and natural language response
          const response: MCPResponse = {
            responseType: 'jobSearch',
            content: `I've processed your job search request for ${params.query}`,
            data: {
              queryParams: parsedContent,
              suggestions: []
            }
          };

          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(response) 
            }]
          };
        } catch (error) {
          console.error('Error processing job query:', error);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                responseType: 'error',
                content: `I had trouble understanding your request. Could you please rephrase it?`
              }) 
            }],
            isError: true
          };
        }
      }
    );
  }

  // New method to get structured data directly
  public async getStructuredData(
    userQuery: string,
  ): Promise<Record<string, any>> {
    // Dynamically generate the prompt based on filter data
    let promptInstructions = 'Extract parameters from user queries for a job search API. Return a JSON object.\n';
    promptInstructions += 'Use the specific keys provided for each filter.\n';

    this.supportedFilters.forEach((filter) => {
      const keyToUse = filter.paramKey || filter.name;
      promptInstructions += `- Filter '${filter.name}' (key: ${keyToUse}): `;
      if (filter.kind === 'select' && filter.options && filter.options.length > 0) {
        const optionValues = filter.options.map(opt => opt.value ?? opt.label).filter(Boolean).join(', ');
        promptInstructions += `Extract one or more relevant values if mentioned, choosing from: [${optionValues}]. Return as a string or array of strings.\n`;
      } else if (filter.kind === 'range' && filter.value) {
        const minKey = filter.value.lowest?.paramKey || `min${keyToUse.charAt(0).toUpperCase() + keyToUse.slice(1)}`;
        const maxKey = filter.value.highest?.paramKey || `max${keyToUse.charAt(0).toUpperCase() + keyToUse.slice(1)}`;
        promptInstructions += `If a range or specific value is mentioned, extract numeric values for '${minKey}' and/or '${maxKey}'.\n`;
      } else if (filter.kind === 'boolean') {
        promptInstructions += `Extract a boolean (true/false) value.\n`;
      } else {
        promptInstructions += `Extract relevant information as a string or number.\n`;
      }
    });

    promptInstructions += 'If a filter is not mentioned in the query, omit its key from the JSON object.';

    const systemPrompt = promptInstructions;

    console.log(`Using dynamically generated prompt for query: "${userQuery}"`);
    // console.log(`System prompt: ${systemPrompt}`); // Optional: Log prompt for debugging

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Extract job search parameters from this query: "${userQuery}"`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        console.error('OpenAI response content is empty.');
        throw new Error(
          'Failed to extract parameters from query: Empty response from AI.',
        );
      }

      let parsedContent: Record<string, any>;
      try {
        parsedContent = JSON.parse(content);
      } catch (parseError) {
        console.error('Failed to parse OpenAI response as JSON:', content);
        throw new Error(
          'Failed to parse parameters from AI response (Invalid JSON).',
        );
      }

      console.log('Extracted parameters:', JSON.stringify(parsedContent));
      return parsedContent;

    } catch (error) {
      console.error('Error getting structured data from OpenAI:', error);
      if (error instanceof OpenAI.APIError) {
        console.error(`OpenAI API Error: ${error.status} ${error.name}`);
      }
      throw new Error(
        `Failed to get structured data via OpenAI: ${error.message}`,
      );
    }
  }

  /**
   * Connect the server to a transport
   * @param {any} transport
   */
  async connect(transport) {
    return this.server.connect(transport);
  }

  /**
   * Get the underlying MCP server instance
   */
  getServer() {
    return this.server;
  }
} 