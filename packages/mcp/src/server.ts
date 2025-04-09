import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from 'zod';
import { MCPResponse } from './types.js';
import { createJobSearchPrompt } from './prompts.js';
import { OpenAI } from 'openai';

export interface JobStashMcpServerConfig {
  name: string;
  version: string;
  openaiApiKey: string;
  model?: string;
}

export class JobStashMcpServer {
  private server: McpServer;
  private openai: OpenAI;
  private model: string;

  constructor(config: JobStashMcpServerConfig) {
    this.server = new McpServer({
      name: config.name,
      version: config.version
    });

    this.openai = new OpenAI({
      apiKey: config.openaiApiKey
    });

    this.model = config.model || 'gpt-4o';
    
    this.setupPrompts();
    this.setupTools();
  }

  private setupPrompts() {
    // Job search prompt
    this.server.prompt(
      "jobSearch",
      { query: z.string() },
      ({ query }) => {
        const prompt = createJobSearchPrompt(query);
        return {
          messages: prompt.messages.map(msg => {
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
      async ({ query }) => {
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
                content: `Extract job search parameters from this query: "${query}"`
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
            content: `I've processed your job search request for ${query}`,
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

  /**
   * Connect the server to a transport
   */
  async connect(transport: any) {
    return this.server.connect(transport);
  }

  /**
   * Get the underlying MCP server instance
   */
  getServer() {
    return this.server;
  }
} 