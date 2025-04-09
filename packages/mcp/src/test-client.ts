#!/usr/bin/env node

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// For CommonJS compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Check for query argument
  const query = process.argv[2];
  if (!query) {
    console.error('Error: Please provide a job search query');
    console.error('Usage: node test-client.js "your job search query"');
    process.exit(1);
  }

  // Check if cli.js exists
  const cliPath = path.join(__dirname, 'cli.js');
  if (!fs.existsSync(cliPath)) {
    console.error(`Error: Server script not found at ${cliPath}`);
    console.error('Make sure to build the package first: npm run build');
    process.exit(1);
  }

  // Ensure OPENAI_API_KEY is available from process.env
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  // Get the path to the node executable
  const nodePath = process.execPath;

  // Prepare environment for server
  const serverEnv = {
    ...process.env,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || ''
  };

  // Spawn the server process with explicit environment variables
  const serverProcess = spawn(nodePath, [cliPath], {
    env: serverEnv,
    stdio: ['pipe', 'pipe', 'inherit'] // pipe stdin/stdout, inherit stderr
  });

  // Create transport with explicit environment
  const transport = new StdioClientTransport({
    command: nodePath,
    args: [cliPath],
    env: { OPENAI_API_KEY: process.env.OPENAI_API_KEY || '' }
  });

  // Create client
  const client = new Client({
    name: 'jobstash-mcp-test-client',
    version: '0.1.0'
  });

  try {
    // Connect client to transport
    await client.connect(transport);
    console.log('Connected to MCP server');

    // Call the processJobQuery tool
    console.log(`Processing query: "${query}"`);
    const result = await client.callTool({
      name: 'processJobQuery',
      arguments: { query }
    });

    if (result && typeof result === 'object' && 'content' in result) {
      const content = result.content;
      if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
        const text = 'text' in content[0] ? String(content[0].text) : '';
        if (text) {
          const response = JSON.parse(text);
          console.log('\nProcessed Result:');
          console.log(JSON.stringify(response, null, 2));
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Kill the server process
    serverProcess.kill();
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 