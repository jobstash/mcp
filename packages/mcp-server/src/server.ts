import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { URLSearchParams } from 'url';
import {
  search_jobs_input_schema,
  search_jobs_output_schema,
  get_search_jobs_url_output_schema,
  type SearchJobsInputArgs
} from './schemas'; // Import the new schemas

// Define updated configuration for McpManager
export interface McpManagerConfig {
  name: string;
  version: string;
  jobstashBaseUrl?: string; // Config for JobStash interaction
}

// Define a type for the input arguments based on the schema (optional but good practice)
// type SearchJobsInput = { ... } // Removed old type def

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
      {
        inputSchema: search_jobs_input_schema,
        outputSchema: search_jobs_output_schema,
      },
      // Implementation callback for search_jobs
      async (
        _schemaContext: any, // First arg is context/schemas (unused for now)
        extra: any // Use 'any' for now
      ) => {
        const args: SearchJobsInputArgs = extra.args; // Assuming args are here
        console.log("MCP Server: Received search_jobs call with args:", args);

        // --- Placeholder for JobStash Backend Interaction ---
        // TODO: Implement actual logic to query JobStash backend (API/DB)
        // using the structured 'args' object.
        // Example: const jobsFromBackend = await fetchJobsFromJobStash(args);

        // --- Mock Response (Conforming to output schema) ---
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

        console.log("MCP Server: Returning mock job list.");
        return {
          jobs: mockJobs // Must match search_jobs_output_schema
        };
      }
    );

    // --- Register get_search_jobs_url tool ---
    this.server.tool(
      "get_search_jobs_url",
      "Constructs a JobStash website URL based on structured job search filters.",
      {
        inputSchema: search_jobs_input_schema, // Re-use the same input schema
        outputSchema: get_search_jobs_url_output_schema,
      },
      // Implementation callback for get_search_jobs_url
      async (
        _schemaContext: any, // First arg is context/schemas (unused for now)
        extra: any // Use 'any' for now
      ) => {
        const args: SearchJobsInputArgs = extra.args; // Assuming args are here
        console.log("MCP Server: Received get_search_jobs_url call with args:", args);

        // Build query string from structured args (similar to old logic)
        const searchParams = new URLSearchParams();
        for (const key in args) {
          // Type assertion is less critical now with Zod inference, but safe
          const typedKey = key as keyof SearchJobsInputArgs;
          if (args.hasOwnProperty(typedKey) && args[typedKey] != null) {
            const value = args[typedKey];
            if (Array.isArray(value)) {
              if (value.length > 0) {
                searchParams.set(key, value.join(','));
              }
            } else {
              // Ensure boolean values are converted to strings if needed by JobStash URL params
              searchParams.set(key, String(value));
            }
          }
        }
        const queryString = searchParams.toString();
        const finalUrl = `${this.jobstashBaseUrl}?${queryString}`;

        console.log(`MCP Server: Constructed URL: ${finalUrl}`);
        return {
          jobstashUrl: finalUrl // Must match get_search_jobs_url_output_schema
        };
      }
    );
  }

  /**
   * Connect the server to a transport
   * @param {any} transport The MCP transport instance.
   */
  async connect(transport: any) { // Add type hint for transport if available from SDK
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