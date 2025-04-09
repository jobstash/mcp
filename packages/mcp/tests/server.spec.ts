import { JobStashMcpServer } from '../src/server';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";

// Mock OpenAI API
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      filters: {
                        roles: ["developer"],
                        skills: ["solidity", "blockchain"],
                        remote: true,
                        experienceLevel: "senior"
                      }
                    })
                  }
                }
              ]
            })
          }
        }
      };
    })
  };
});

// Mock MCP server
jest.mock('@modelcontextprotocol/sdk/server/mcp', () => {
  return {
    McpServer: jest.fn().mockImplementation(() => {
      return {
        prompt: jest.fn(),
        tool: jest.fn(),
        connect: jest.fn()
      };
    })
  };
});

// Mock StdioServerTransport
jest.mock('@modelcontextprotocol/sdk/server/stdio', () => {
  return {
    StdioServerTransport: jest.fn().mockImplementation(() => ({}))
  };
});

describe('JobStashMcpServer', () => {
  let server;

  beforeEach(() => {
    server = new JobStashMcpServer({
      name: 'test-server',
      version: '1.0.0',
      openaiApiKey: 'test-key'
    });
  });

  it('should initialize correctly', () => {
    expect(server).toBeDefined();
  });

  it('should connect to a transport', async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    expect(server.getServer().connect).toHaveBeenCalledWith(transport);
  });
}); 