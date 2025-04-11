#!/usr/bin/env node

import { McpManager } from './server';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

async function main() {
  // Check for required environment variable
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  // Create server (now McpManager)
  const server = new McpManager({
    name: 'jobstash-mcp-cli',
    version: '0.1.0',
    supportedFilters: [],
  });

  // Create transport
  const transport = new StdioServerTransport();

  console.log('Starting JobStash MCP server...');
  
  try {
    // Connect server to transport
    await server.connect(transport);
    console.log('Server connected to stdio transport');
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 