import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { URLSearchParams } from 'url';
// import { z } from 'zod'; // <<< Comment out or remove standard import
import { z } from "@modelcontextprotocol/sdk/node_modules/zod"; // <<< Use SDK's Zod

import { 
    search_jobs_input_schema, 
    search_jobs_output_schema,
    get_search_jobs_url_output_schema,
    type SearchJobsInputArgs
} from './schemas.js';


// Define the interface directly if not imported
export interface McpManagerConfig {
  name: string;
  version: string;
  jobstashBaseUrl?: string; // Config for JobStash interaction
}

export class McpManager {
  private server: McpServer;
  private jobstashBaseUrl: string;

  constructor(config: McpManagerConfig) {
    // Configure JobStash base URL, default if not provided
    this.jobstashBaseUrl = config.jobstashBaseUrl || 'https://jobstash.xyz/jobs';

    // Initialize MCP Server
    this.server = new McpServer({
      name: config.name,
      version: config.version
    });

    this.setupTools(); // Use setupTools again
  }



  private setupTools() {
    console.log("Registering MCP tools...");

    
    const calculateBmiInputSchema = z.object({
      weightKg: z.number(),
      heightM: z.number()
    });
    
    const calculateBmiOutputSchema = z.object({
      bmi: z.number()
    });
    
    this.server.tool(
      "calculate-bmi",
      "Calculates Body Mass Index.",
      {
        inputSchema: calculateBmiInputSchema,
        outputSchema: calculateBmiOutputSchema
      },
      async (args: any, _extra) => {
        console.log("Received args:", args);
    
        if (typeof args?.weightKg !== 'number' || typeof args?.heightM !== 'number' || args.heightM <= 0) {
           console.error("MCP Server: Invalid arguments for calculate-bmi:", args);
           return {
            content: [{ type: "text", text: "Error: Invalid arguments. Requires positive heightM and numeric weightKg." }],
            isError: true
          };
        }
    
        const bmi = args.weightKg / (args.heightM * args.heightM);
        console.log("MCP Server: Calculated BMI:", bmi);
    
        const response = { bmi };
        try {
          calculateBmiOutputSchema.parse(response);
          return {
            content: [{ type: "text", text: JSON.stringify(response) }]
          };
        } catch (error: any) {
           console.error("MCP Server: BMI Output schema validation failed:", error);
           return {
             content: [{ type: "text", text: JSON.stringify({ error: `Internal error: Output validation failed: ${error.message}`}) }],
             isError: true
           }
        }
      }
    );

    // --- Register search_jobs tool ---
    this.server.tool(
      "search_jobs",
      "Searches for jobs based on query, tags, location.",
      {
        inputSchema: search_jobs_input_schema,
        outputSchema: search_jobs_output_schema
      },
      async (_context: any, extra: any) => {
        const parseResult = await search_jobs_input_schema.safeParseAsync(extra);

        if (!parseResult.success) {
          console.error("MCP Server: Invalid arguments for search_jobs:", parseResult.error);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({ error: `Invalid arguments: ${parseResult.error.message}` })
            }],
            isError: true
          };
        }
        const args = parseResult.data;

        console.log("MCP Server: Received search_jobs call with validated args:", args);
        
        // try {
        //   const mockJobs = [
        //     {
        //       title: "Mock Solidity Developer",
        //       company: "MockChain Inc.",
        //       location: args.locations ? args.locations.join(', ') : "Remote",
        //       url: "https://jobstash.xyz/jobs/mock1",
        //       description: "Develop mock smart contracts.",
        //       tags: args.tags || ["solidity", "blockchain"]
        //     },
        //     {
        //       title: "Mock Frontend Engineer",
        //       company: "Mock DApp Solutions",
        //       location: "Remote",
        //       url: "https://jobstash.xyz/jobs/mock2",
        //       description: "Build mock user interfaces.",
        //       tags: ["react", "web3"]
        //     }
        //   ];
        //   const response = { jobs: mockJobs };

        //   search_jobs_output_schema.parse(response);

        //   console.log("MCP Server: Returning job list as text.");
        //   return {
        //     content: [{ 
        //       type: "text", 
        //       text: JSON.stringify(response) 
        //     }]
        //   };
        // } catch (error: any) {
        //   console.error("Error processing search_jobs request:", error);
        //   return {
        //     content: [{ 
        //       type: "text", 
        //       text: JSON.stringify({ error: `Failed to process search_jobs: ${error.message}` })
        //     }],
        //     isError: true
        //   };
        // }
      }
    );

    // --- Register get_search_jobs_url tool ---
    this.server.tool(
      "get_search_jobs_url",
      "Generates a JobStash URL for given search criteria.",
      {
        inputSchema: z.object({}).optional(),
        outputSchema: get_search_jobs_url_output_schema
      },
      async (_context: any, extra: any) => {
        const parseResult = await search_jobs_input_schema.safeParseAsync(extra);

        if (!parseResult.success) {
          console.error("MCP Server: Invalid arguments for get_search_jobs_url:", parseResult.error);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({ error: `Invalid arguments: ${parseResult.error.message}` })
            }],
            isError: true
          };
        }
        const args = parseResult.data;

        console.log("MCP Server: Received get_search_jobs_url call with validated args:", args);
        
        try {
          const searchParams = new URLSearchParams();
          for (const key in args) {
            const typedKey = key as keyof SearchJobsInputArgs;
            if (args.hasOwnProperty(typedKey) && args[typedKey] != null) {
              const value = args[typedKey];
              if (Array.isArray(value)) {
                if (value.length > 0) {
                  searchParams.set(key, value.join(','));
                }
              } else {
                searchParams.set(key, String(value));
              }
            }
          }
          const queryString = searchParams.toString();
          const finalUrl = `${this.jobstashBaseUrl}?${queryString}`;
          console.log(`MCP Server: Constructed URL: ${finalUrl}`);

          const response = { jobstashUrl: finalUrl };

          get_search_jobs_url_output_schema.parse(response);
          
          console.log("MCP Server: Returning URL as text.");
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(response) 
            }]
          };
        } catch (error: any) {
          console.error("Error processing get_search_jobs_url request:", error);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({ error: `Failed to construct JobStash URL: ${error.message}` })
            }],
            isError: true
          };
        }
      }
    );

 
  }

  /**
   * Connect the server to a transport
   * @param {any} transport The MCP transport instance.
   */
  async connect(transport: any) {
    return this.server.connect(transport);
  }

  /**
   * Get the underlying MCP server instance
   * @returns {McpServer} The McpServer instance.
   */
  getServer(): McpServer {
    return this.server;
  }
} 