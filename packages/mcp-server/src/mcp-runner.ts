#!/usr/bin/env node
"use strict";

// mcp-runner.ts - Runs the JobStash MCP Host Server using Stdio transport

import { McpManager } from './server.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Basic configuration for the MCP Host Server
const config = {
  name: process.env.MCP_SERVER_NAME || 'jobstash-mcp-host',
  version: process.env.MCP_SERVER_VERSION || '0.1.0',
  jobstashBaseUrl: process.env.JOBSTASH_BASE_URL || 'https://jobstash.xyz/jobs'
};

async function runServer() {
  console.log(`Starting ${config.name} v${config.version}...`);
  console.log(`Base URL: ${config.jobstashBaseUrl}`);

  try {
    // 1. Instantiate the manager (which initializes the McpServer)
    console.log("Initializing McpManager...");
    const manager = new McpManager(config);
    console.log("McpManager initialized.");

    // 2. Create the stdio transport
    console.log("Creating StdioServerTransport...");
    const transport = new StdioServerTransport();
    console.log("StdioServerTransport created.");

    // 3. Connect the server to the transport and start listening
    console.log("Connecting to transport...");
    await manager.connect(transport);
    console.log("MCP Host Server connected to stdio transport. Listening for messages...");

  } catch (error) {
    console.error("Failed to start MCP Host Server:", error);
    process.exit(1);
  }
}

runServer();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log("\nReceived SIGINT. Shutting down MCP Host Server...");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log("\nReceived SIGTERM. Shutting down MCP Host Server...");
  process.exit(0);
}); 