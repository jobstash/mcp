import { McpManager } from '../src/server';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"; // Import the actual type
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  search_jobs_input_schema,
  search_jobs_output_schema,
  get_search_jobs_url_output_schema
} from '../src/schemas'; // Import schemas

// Mock MCP server instance methods we want to spy on
const mockMcpServerInstance = {
  prompt: jest.fn(),
  tool: jest.fn(),
  connect: jest.fn(),
};

// Mock MCP Server constructor to return our mock instance
jest.mock('@modelcontextprotocol/sdk/server/mcp', () => {
  return {
    McpServer: jest.fn().mockImplementation(() => mockMcpServerInstance)
  };
});

// Mock StdioServerTransport (can likely be removed if not testing connect directly)
jest.mock('@modelcontextprotocol/sdk/server/stdio', () => {
  return {
    StdioServerTransport: jest.fn().mockImplementation(() => ({}))
  };
});

describe('McpManager (MCP Host Server)', () => {
  let manager: McpManager;
  const testConfig = {
    name: 'test-mcp-host',
    version: '1.0.0',
    jobstashBaseUrl: 'https://test.jobstash.xyz/jobs'
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Instantiate the manager with the new config
    manager = new McpManager(testConfig);
  });

  it('should initialize correctly and create an McpServer instance', () => {
    expect(manager).toBeDefined();
    expect(McpServer).toHaveBeenCalledWith({
      name: testConfig.name,
      version: testConfig.version
    });
  });

  it('should register the search_jobs tool correctly', () => {
    // Check if McpServer.tool was called for 'search_jobs'
    expect(mockMcpServerInstance.tool).toHaveBeenCalledWith(
      "search_jobs",
      expect.any(String), // Description
      expect.objectContaining({ // Options object with schemas
        inputSchema: search_jobs_input_schema,
        outputSchema: search_jobs_output_schema,
      }),
      expect.any(Function) // Implementation callback
    );
  });

  it('should register the get_search_jobs_url tool correctly', () => {
    // Check if McpServer.tool was called for 'get_search_jobs_url'
    expect(mockMcpServerInstance.tool).toHaveBeenCalledWith(
      "get_search_jobs_url",
      expect.any(String), // Description
      expect.objectContaining({ // Options object with schemas
        inputSchema: search_jobs_input_schema, // Should reuse input schema
        outputSchema: get_search_jobs_url_output_schema,
      }),
      expect.any(Function) // Implementation callback
    );
  });

  // Optional: Test the implementation callback logic
  describe('Tool Callbacks', () => {
    let searchJobsCallback: Function;
    let getUrlCallback: Function;

    beforeEach(() => {
      // Find the callbacks registered with the mock
      const toolCalls = mockMcpServerInstance.tool.mock.calls;
      searchJobsCallback = toolCalls.find(call => call[0] === 'search_jobs')?.[3];
      getUrlCallback = toolCalls.find(call => call[0] === 'get_search_jobs_url')?.[3];

      if (!searchJobsCallback || !getUrlCallback) {
         throw new Error("Tool callbacks not registered correctly in mock.");
      }
    });

    it('get_search_jobs_url callback should construct URL correctly', async () => {
        const mockArgs = { locations: ["Remote"], tags: ["react"] };
        // Simulate the structure the SDK provides to the callback ({ args: ... })
        const mockExtra = { args: mockArgs };
        const result = await getUrlCallback({}, mockExtra); // Pass dummy context and mock extra

        expect(result).toBeDefined();
        expect(result.jobstashUrl).toBe(`${testConfig.jobstashBaseUrl}?locations=Remote&tags=react`);
    });

     it('search_jobs callback should return mock job list structure', async () => {
        const mockArgs = { tags: ["solidity"] };
        const mockExtra = { args: mockArgs };
        const result = await searchJobsCallback({}, mockExtra);

        expect(result).toBeDefined();
        expect(result.jobs).toBeInstanceOf(Array);
        expect(result.jobs.length).toBeGreaterThan(0);
        expect(result.jobs[0]).toHaveProperty('title');
        expect(result.jobs[0]).toHaveProperty('company');
        expect(result.jobs[0]).toHaveProperty('url');
        // TODO: Add more specific checks based on actual backend interaction mocking later
    });
  });

  // Test connecting (optional, depends on transport needs)
  it('should connect to a transport via the McpServer instance', async () => {
    const transport = new StdioServerTransport(); // Use the mock instance
    await manager.connect(transport);
    expect(mockMcpServerInstance.connect).toHaveBeenCalledWith(transport);
  });
}); 