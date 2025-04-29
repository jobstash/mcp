#!/usr/bin/env node
"use strict";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

async function main() {
  // Debug information
  console.log("JobStash MCP Test Client");
  console.log("------------------------");
  console.log(`Node.js version: ${process.version}`);
  console.log(`Working directory: ${process.cwd()}`);

  // Check for query argument
  const query = process.argv[2];
  if (!query) {
    console.error('Error: Please provide a job search query');
    console.error('Usage: node test-client.js "your job search query"');
    process.exit(1);
  }

  // Find the correct path for the server script
  const mcpRunnerPath = path.join(__dirname, 'mcp-runner.js');
  if (!fs.existsSync(mcpRunnerPath)) {
    console.error(`Error: Server script not found at ${mcpRunnerPath}`);
    console.error('Make sure to build the package first: yarn build');
    process.exit(1);
  }
  console.log(`Using server script: ${mcpRunnerPath}`);

  // Set JOBSTASH_BASE_URL if not already set
  if (!process.env.JOBSTASH_BASE_URL) {
    process.env.JOBSTASH_BASE_URL = 'https://jobstash.xyz/jobs';
    console.log(`JOBSTASH_BASE_URL not set, using default: ${process.env.JOBSTASH_BASE_URL}`);
  }

  // Get the path to the node executable
  const nodePath = process.execPath;
  console.log(`Using Node executable: ${nodePath}`);

  // Prepare environment for server with all variables
  const serverEnv = { ...process.env };

  // Spawn the server process with environment variables
  console.log("Spawning MCP server process...");
  const serverProcess = spawn(nodePath, [mcpRunnerPath], {
    env: serverEnv,
    stdio: ['pipe', 'pipe', 'inherit'] // pipe stdin/stdout, inherit stderr
  });

  // Create transport with the same runner path
  console.log("Creating transport to MCP server...");
  const transport = new StdioClientTransport({
    command: nodePath,
    args: [mcpRunnerPath],
    env: serverEnv
  });

  // Create client
  const client = new Client({
    name: 'jobstash-mcp-test-client',
    version: '0.1.0'
  });

  try {
    console.log("Connecting client to server...");
    await client.connect(transport);
    console.log("✓ Client connected!");

    // 1. List Tools
    console.log("Listing tools...");
    const tools = await client.listTools();
    console.log("Available tools:", tools);

    // 2. Call Tool
    const toolMessage = "Hello from Client Tool!";
    console.log(`Calling 'echo' tool with message: "${toolMessage}"`);
    const toolResult = await client.callTool({
      name: "echo",
      arguments: { message: toolMessage }
    });
    if (toolResult.content && Array.isArray(toolResult.content) && toolResult.content[0]?.type === 'text') {
      console.log("✓ Tool Response:", toolResult.content[0].text);
    } else {
      console.warn("Unexpected tool response format:", toolResult);
    }

    console.log("Client finished successfully.");
    console.log("\nTest client finished successfully.");
  } catch (error) {
    console.error("\n⚠ Error:", error);
    process.exitCode = 1;
  } finally {
    // Kill the server process
    console.log("Shutting down server process...");
    serverProcess.kill();

    // Ensure clean exit
    setTimeout(() => {
      process.exit(0);
    }, 100);
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 