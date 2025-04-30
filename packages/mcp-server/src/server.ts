import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getSearchJobsTool } from "./tools/search-jobs";
import { getSearchUrlTool } from "./tools/get-search-url";

export interface McpManagerConfig {
  name: string;
  version: string;
  jobstashBaseUrl?: string;
}

export class McpManager {
  private server: McpServer;
  private jobstashBaseUrl: string;

  constructor(config: McpManagerConfig) {
    this.jobstashBaseUrl = config.jobstashBaseUrl || 'https://jobstash.xyz';

    this.server = new McpServer({
      name: config.name,
      version: config.version
    });

    this.setupTools();
  }

  private setupTools() {
    console.log("Registering MCP tools...");

    // --- Register search_jobs tool using the imported factory ---
    const searchJobsToolConfig = getSearchJobsTool(this.jobstashBaseUrl);
    this.server.tool(
      searchJobsToolConfig.name,
      searchJobsToolConfig.description,
      searchJobsToolConfig.inputSchema,
      searchJobsToolConfig.handler
    );

    console.log(`Registered tool: ${searchJobsToolConfig.name}`);

    // --- Register get_search_url tool --- 
    const getSearchUrlToolConfig = getSearchUrlTool(this.jobstashBaseUrl);
    this.server.tool(
      getSearchUrlToolConfig.name,
      getSearchUrlToolConfig.description,
      getSearchUrlToolConfig.inputSchema,
      getSearchUrlToolConfig.handler
    );
    console.log(`Registered tool: ${getSearchUrlToolConfig.name}`);

  }

  async connect(transport: any) {
    return this.server.connect(transport);
  }

  getServer(): McpServer {
    return this.server;
  }
} 