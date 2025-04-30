// packages/mcp-gateway/src/mcp-client/mcp-client.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Client as McpClient } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { McpClientService } from './mcp-client.service';

// --- Mock MCP Client SDK ---
const mockMcpClientInstance = {
  connect: jest.fn(),
  callTool: jest.fn(),
  // disconnect: jest.fn(), // Method doesn't exist in actual client
};
const mockStdioTransportInstance = {}; // Instance is simple for now

jest.mock('@modelcontextprotocol/sdk/client/index.js', () => ({
  Client: jest.fn().mockImplementation(() => mockMcpClientInstance),
}));
jest.mock('@modelcontextprotocol/sdk/client/stdio.js', () => ({
  StdioClientTransport: jest.fn().mockImplementation(() => mockStdioTransportInstance),
}));

const MockedMcpClient = McpClient as jest.MockedClass<typeof McpClient>;
const MockedStdioTransport = StdioClientTransport as jest.MockedClass<typeof StdioClientTransport>;


// --- Mock ConfigService ---
const mockConfigGet = jest.fn();
const MockConfigServiceProvider = {
  provide: ConfigService,
  useValue: {
    get: mockConfigGet,
  },
};

describe('McpClientService', () => {
  let service: McpClientService;
  let configService: ConfigService;

  // Default config values for tests
  const defaultServerCommand = 'node-test';
  const defaultServerArgs = ['path/to/runner-test.js'];
  const defaultClientName = 'test-client';
  const defaultClientVersion = '0.0.1-test';

  beforeEach(async () => {
    // Reset mocks
    jest.clearAllMocks();
    mockMcpClientInstance.connect.mockResolvedValue(undefined); // Default success
    mockMcpClientInstance.callTool.mockResolvedValue({ success: true }); // Default success

    // Setup default mock config implementation
    mockConfigGet.mockImplementation((key: string, defaultValue?: any) => {
      switch (key) {
        case 'MCP_SERVER_COMMAND': return defaultServerCommand;
        case 'MCP_SERVER_ARGS': return defaultServerArgs;
        case 'MCP_CLIENT_NAME': return defaultClientName;
        case 'MCP_CLIENT_VERSION': return defaultClientVersion;
        default: return defaultValue;
      }
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [McpClientService, MockConfigServiceProvider],
    }).compile();

    service = module.get<McpClientService>(McpClientService);
    configService = module.get<ConfigService>(ConfigService);

    // Wait for initialization which happens in onModuleInit
    await service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should read configuration from ConfigService', () => {
      expect(mockConfigGet).toHaveBeenCalledWith('MCP_SERVER_COMMAND', 'node');
      expect(mockConfigGet).toHaveBeenCalledWith('MCP_SERVER_ARGS', ['../mcp-server/dist/mcp-runner.js']);
      expect(mockConfigGet).toHaveBeenCalledWith('MCP_CLIENT_NAME', 'mcp-gateway-client');
      expect(mockConfigGet).toHaveBeenCalledWith('MCP_CLIENT_VERSION', '0.1.0');
    });

    it('should initialize StdioClientTransport with config', () => {
      expect(MockedStdioTransport).toHaveBeenCalledWith({
        command: defaultServerCommand,
        args: defaultServerArgs
      });
    });

    it('should initialize McpClient with config', () => {
      expect(MockedMcpClient).toHaveBeenCalledWith({
        name: defaultClientName,
        version: defaultClientVersion
      });
    });

    it('should attempt to connect the client', () => {
      expect(mockMcpClientInstance.connect).toHaveBeenCalledTimes(1);
      expect(mockMcpClientInstance.connect).toHaveBeenCalledWith(mockStdioTransportInstance);
    });

    it('should handle connection errors on init', async () => {
      // Reset module to test failed connection scenario
      jest.clearAllMocks();
      mockMcpClientInstance.connect.mockRejectedValueOnce(new Error('Connection Failed'));

      const module: TestingModule = await Test.createTestingModule({
        providers: [McpClientService, MockConfigServiceProvider],
      }).compile();
      service = module.get<McpClientService>(McpClientService);

      await service.onModuleInit(); // Should not throw, but log error

      // Check that connection was attempted but failed (isConnected remains false)
      expect(mockMcpClientInstance.connect).toHaveBeenCalledTimes(1);
      // Access private property for test verification (use carefully)
      expect((service as any).isConnected).toBe(false);
    });

    it('should set isConnected to true on successful connection', () => {
      // Default beforeEach already sets up successful connection
      expect((service as any).isConnected).toBe(true);
    });

    it('should handle MCP_SERVER_ARGS as comma-separated string', async () => {
      // ... existing code ...
    });
  });

  describe('callTool', () => {
    const toolArgs = { name: 'test_tool', arguments: { key: 'value' } };

    it('should throw error if client is not connected', async () => {
      // Simulate not connected state
      (service as any).isConnected = false;
      await expect(service.callTool(toolArgs)).rejects.toThrow('MCP Client is not connected.');
      expect(mockMcpClientInstance.callTool).not.toHaveBeenCalled();
    });

    it('should call the underlying client.callTool with arguments if connected', async () => {
      await service.callTool(toolArgs);
      expect(mockMcpClientInstance.callTool).toHaveBeenCalledTimes(1);
      expect(mockMcpClientInstance.callTool).toHaveBeenCalledWith(toolArgs);
    });

    it('should return the result from client.callTool', async () => {
      const expectedResult = { data: 'test result' };
      mockMcpClientInstance.callTool.mockResolvedValueOnce(expectedResult);
      const result = await service.callTool(toolArgs);
      expect(result).toEqual(expectedResult);
    });

    it('should re-throw errors from client.callTool', async () => {
      const toolError = new Error('Tool execution failed');
      mockMcpClientInstance.callTool.mockRejectedValueOnce(toolError);
      await expect(service.callTool(toolArgs)).rejects.toThrow(toolError);
    });
  });

  describe('onModuleDestroy', () => {
    it('should reset isConnected flag if connected', async () => {
      expect((service as any).isConnected).toBe(true); // Verify initial state
      await service.onModuleDestroy();
      expect((service as any).isConnected).toBe(false);
    });

    it('should not attempt disconnect (as method doesnt exist)', async () => {
      // No mock for disconnect, just ensure no error and flag reset
      await service.onModuleDestroy();
      expect((service as any).isConnected).toBe(false);
    });
  });

  describe('getClient', () => {
    it('should return the client instance', () => {
      expect(service.getClient()).toBeDefined();
      // Check if it's the mocked instance
      expect(service.getClient()).toEqual(mockMcpClientInstance);
    });

    it('should throw error if client not initialized (edge case)', () => {
      (service as any).client = null; // Simulate uninitialized state
      expect(() => service.getClient()).toThrow('MCP Client not initialized.');
    });

    it('should log warning if called when not connected', () => {
      const loggerSpy = jest.spyOn((service as any).logger, 'warn');
      (service as any).isConnected = false;
      service.getClient();
      expect(loggerSpy).toHaveBeenCalledWith('MCP Client accessed but not connected.');
      loggerSpy.mockRestore();
    });
  });
}); 