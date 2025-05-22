import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client as McpClient } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

@Injectable()
export class McpClientService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(McpClientService.name);
  private client: McpClient;
  private isConnected = false;
  private transport: StdioClientTransport; // Keep transport for potential reconnect

  constructor(private configService: ConfigService) { }

  async onModuleInit() {
    await this.initializeAndConnect();
  }

  async onModuleDestroy() {
    if (this.client && this.isConnected) {
      this.logger.log('MCP Client connection closing with gateway shutdown.');
      this.isConnected = false;
    }
    // Transport likely handles underlying process termination
  }

  private async initializeAndConnect(): Promise<void> {
    this.logger.log('Initializing MCP Client using configuration...');

    // Read configuration using ConfigService with defaults
    const serverCommand = this.configService.get<string>('MCP_SERVER_COMMAND', 'node');
    // Updated path to include src directory
    const defaultServerPath = '../mcp-server/dist/src/mcp-runner.js';
    const serverArgsInput = this.configService.get<string | string[]>('MCP_SERVER_ARGS', [defaultServerPath]);
    const serverArgs = typeof serverArgsInput === 'string'
      ? serverArgsInput.split(',').map(s => s.trim())
      : serverArgsInput;

    const clientName = this.configService.get<string>('MCP_CLIENT_NAME', 'mcp-gateway-client');
    const clientVersion = this.configService.get<string>('MCP_CLIENT_VERSION', '0.1.0');

    this.logger.log(`MCP Client Config - Command: ${serverCommand}, Args: ${JSON.stringify(serverArgs)}, Name: ${clientName}, Version: ${clientVersion}`);

    this.transport = new StdioClientTransport({ command: serverCommand, args: serverArgs });
    this.client = new McpClient({ name: clientName, version: clientVersion });

    try {
      this.logger.log(`Attempting to connect to MCP Host Server via stdio...`);
      await this.client.connect(this.transport);
      this.isConnected = true;
      this.logger.log('MCP Client connected successfully.');
    } catch (err) {
      this.logger.error(`Failed to connect MCP Client on startup: ${err}`, err.stack);
      this.isConnected = false;
      // Decide on error handling: throw, retry, or allow app to start but fail requests?
      // For now, we log and let requests fail if connection fails initially.
    }
  }

  getClient(): McpClient {
    // Could add a check here to ensure connected or attempt reconnect
    if (!this.isConnected) {
      this.logger.warn('MCP Client accessed but not connected.');
      // Optional: Attempt reconnect automatically
      // this.initializeAndConnect(); // Be careful with async here
    }
    if (!this.client) {
      throw new Error('MCP Client not initialized.');
    }
    return this.client;
  }

  // Optional: Expose a wrapper for callTool if desired
  async callTool(args: any): Promise<any> {
    if (!this.isConnected || !this.client) {
      this.logger.error('Attempted to call MCP tool while disconnected.');
      // TODO: Better error handling / potential auto-reconnect
      throw new Error('MCP Client is not connected.');
    }
    try {
      const result = await this.client.callTool(args);
      return result;
    } catch (error) {
      this.logger.error(`Error calling MCP tool '${args.name}': ${error.message}`, error.stack);
      // Potentially check if error is due to disconnection and update state
      throw error; // Re-throw the error to be handled by the controller
    }
  }
} 