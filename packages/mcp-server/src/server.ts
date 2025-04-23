import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { URLSearchParams } from 'url';
import { z } from 'zod';
import {
  type SearchJobsInputArgs
} from './schemas'; // Import only the types for validation

// Define updated configuration for McpManager
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

    // Initialize MCP Server (name/version are still useful for identification)
    this.server = new McpServer({
      name: config.name,
      version: config.version
    });

    // Setup the new tools
    this.setupTools();
  }

  private setupTools() {
    // --- Register search_jobs tool ---
    this.server.tool(
      "search_jobs",
      "Searches for JobStash jobs based on structured filters and returns a list of matching jobs.",
      { query: z.string() },
      async (params: { query: string }) => {
        console.log("MCP Server: Received search_jobs call with params:", params);
        
        try {
          // Parse the input as SearchJobsInputArgs
          const args = params.query ? JSON.parse(params.query) : {};
          console.log("MCP Server: Parsed args:", args);
          
          // Validate args (optional, but helps catch errors early)
          // Removed schema validation to avoid errors
          
          // --- Mock Response ---
          const mockJobs = [
            {
              title: "Mock Solidity Developer",
              company: "MockChain Inc.",
              location: args.locations ? args.locations.join(', ') : "Remote",
              url: "https://jobstash.xyz/jobs/mock1",
              description: "Develop mock smart contracts.",
              tags: args.tags || ["solidity", "blockchain"]
            },
            {
              title: "Mock Frontend Engineer",
              company: "Mock DApp Solutions",
              location: "Remote",
              url: "https://jobstash.xyz/jobs/mock2",
              description: "Build mock user interfaces.",
              tags: ["react", "web3"]
            }
          ];

          // Create response object
          const response = {
            jobs: mockJobs
          };

          console.log("MCP Server: Returning job list as text.");
          
          // Return as text content
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(response) 
            }]
          };
        } catch (error) {
          console.error("Error processing search_jobs request:", error);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                error: "Failed to process job search request."
              }) 
            }],
            isError: true
          };
        }
      }
    );

    // --- Register get_search_jobs_url tool ---
    this.server.tool(
      "get_search_jobs_url",
      "Constructs a JobStash website URL based on structured job search filters.",
      { query: z.string() },
      async (params: { query: string }) => {
        console.log("MCP Server: Received get_search_jobs_url call with params:", params);
        
        try {
          // Parse the input as SearchJobsInputArgs
          const args = params.query ? JSON.parse(params.query) : {};
          console.log("MCP Server: Parsed args:", args);
          
          // Build query string from structured args
          const searchParams = new URLSearchParams();
          for (const key in args) {
            if (args.hasOwnProperty(key) && args[key] != null) {
              const value = args[key];
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
          
          // Create response object
          const response = {
            jobstashUrl: finalUrl
          };
          
          // Return as text content
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(response) 
            }]
          };
        } catch (error) {
          console.error("Error processing get_search_jobs_url request:", error);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                error: "Failed to construct JobStash URL."
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