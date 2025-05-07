#!/usr/bin/env node
"use strict";

import path from 'path';

// Determine the base path depending on execution context (ts-node vs. compiled JS)
// When running as compiled JS in dist/, __dirname will be packages/mcp-server/dist
// When potentially run with ts-node from src/, __dirname would be packages/mcp-server/src
const isDist = __dirname.endsWith('dist');
const projectRoot = isDist ? path.resolve(__dirname, '../../..') : path.resolve(__dirname, '../..');

// mcp-runner.ts - Runs the JobStash MCP Host Server using Stdio transport

import { McpManager } from './server.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Basic configuration for the MCP Host Server
const mcpServerName = process.env.MCP_SERVER_NAME || 'jobstash-mcp-host';
const mcpServerVersion = process.env.MCP_SERVER_VERSION || '0.1.0';

const jobstashSiteUrl = process.env.JOBSTASH_SITE_URL;
const jobstashApiUrl = process.env.JOBSTASH_API_URL;

if (!jobstashSiteUrl) {
  console.error("Error: JOBSTASH_SITE_URL environment variable is not set. This is required.");
  process.exit(1);
}

if (!jobstashApiUrl) {
  console.error("Error: JOBSTASH_API_URL environment variable is not set. This is required.");
  process.exit(1);
}

const config = {
  name: mcpServerName,
  version: mcpServerVersion,
  jobstashSiteUrl: jobstashSiteUrl,
  jobstashApiUrl: jobstashApiUrl
};

async function runServer() {
  console.log(`Starting ${config.name} v${config.version}...`);
  console.log(`JobStash Site URL: ${config.jobstashSiteUrl}`);
  console.log(`JobStash API URL: ${config.jobstashApiUrl}`);

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