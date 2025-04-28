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
  console.log("Node.js version:", process.version);
  console.log("Working directory:", process.cwd());
  
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
    // Connect client to transport
    console.log("Connecting to MCP server...");
    await client.connect(transport);
    console.log('✓ Connected to MCP server');

    // --- Ensure we are calling calculate-bmi ---
    const toolName = "calculate-bmi";
    const toolArgs = { weightKg: 70, heightM: 1.75 }; // Example arguments

    console.log(`\nCalling ${toolName} with arguments:`, toolArgs);

    const result = await client.callTool({
      name: toolName,
      arguments: toolArgs
    });

    console.log("\n✓ Tool call successful:");
    console.log("Raw result:", result);

    // --- Parse and display BMI result ---
    if (result.content && result.content[0]?.type === 'text') {
        try {
          const parsedContent = JSON.parse(result.content[0].text);
          if (parsedContent.error) {
            console.error(`Tool Error: ${parsedContent.error}`);
          } else if (typeof parsedContent.bmi === 'number') {
            console.log(`BMI Result: ${parsedContent.bmi}`);
          } else {
            console.warn("Result content received, but BMI value not found.", parsedContent);
          }
        } catch (e) {
          console.warn("Could not parse result content as JSON: ", result.content[0].text);
        }
    } else {
        console.warn("Result content is not in the expected text format.");
    }

    // Now call the get_search_jobs_url tool with the same structured arguments
    console.log("\nGetting JobStash URL with arguments:", toolArgs);
    const urlResult = await client.callTool({
      name: 'get_search_jobs_url',
      arguments: toolArgs
    });

    if (urlResult && typeof urlResult === 'object' && 'content' in urlResult) {
      const content = urlResult.content;
      if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
        const text = 'text' in content[0] ? String(content[0].text) : '';
        if (text) {
          try {
            const response = JSON.parse(text);
            console.log('\nJobStash URL:');
            console.log(response.jobstashUrl);
          } catch (e) {
            console.error('Error parsing URL response:', e);
            console.log('Raw response:', text);
          }
        }
      }
    }
    
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

// Helper function to extract keywords from the query
function extractKeywords(query: string): string[] {
  // Very simple extractor that looks for common tech words
  const commonTechKeywords = [
    'javascript', 'typescript', 'react', 'node', 'solidity',
    'blockchain', 'web3', 'smart contract', 'defi', 'crypto',
    'frontend', 'backend', 'fullstack'
  ];
  
  // Convert query to lowercase for case-insensitive matching
  const lowerQuery = query.toLowerCase();
  
  // Find matching keywords
  return commonTechKeywords.filter(keyword => 
    lowerQuery.includes(keyword.toLowerCase())
  );
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 