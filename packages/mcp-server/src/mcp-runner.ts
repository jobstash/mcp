#!/usr/bin/env node
"use strict";

// mcp-runner.ts - Runs the JobStash MCP Host Server using Stdio transport

import { McpManager } from './server';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Basic configuration for the MCP Host Server
// TODO: Enhance configuration loading (e.g., from env vars) for backend connection details
const config = {
  name: process.env.MCP_SERVER_NAME || 'jobstash-mcp-host',
  version: process.env.MCP_SERVER_VERSION || '0.1.0',
  jobstashBaseUrl: process.env.JOBSTASH_BASE_URL // Example: Read backend URL from env
};

async function runServer() {
  console.log(`Starting ${config.name} v${config.version}...`);

  try {
    // 1. Instantiate the manager (which initializes the McpServer)
    const manager = new McpManager(config);
    console.log("McpManager initialized.");

    // 2. Create the stdio transport
    const transport = new StdioServerTransport();
    console.log("StdioServerTransport created.");

    // 3. Connect the server to the transport and start listening
    // The '.connect()' method in McpManager likely handles attaching the server
    // to the transport and starting the necessary listeners for stdio.
    await manager.connect(transport);
    console.log("MCP Host Server connected to stdio transport. Listening for messages...");

    // Keep the process running until terminated externally or by the transport
    // (The transport likely handles the process lifetime)

  } catch (error) {
    console.error("Failed to start MCP Host Server:", error);
    process.exit(1);
  }
}

runServer();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log("\nReceived SIGINT. Shutting down MCP Host Server...");
  // Perform any cleanup if necessary (transport might handle it)
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log("\nReceived SIGTERM. Shutting down MCP Host Server...");
  // Perform any cleanup if necessary
  process.exit(0);
}); 