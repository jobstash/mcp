#!/usr/bin/env node
"use strict";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from 'path';
import fs from 'fs';

async function main() {
  const query = process.argv[2];
  if (!query) {
    console.error('Error: Please provide a job search query');
    console.error('Usage: node test-client.js "your job search query"');
    process.exit(1);
  }

  const mcpRunnerPath = path.join(__dirname, 'mcp-runner.js');
  if (!fs.existsSync(mcpRunnerPath)) {
    console.error(`Error: Server script not found at ${mcpRunnerPath}`);
    console.error('Make sure to build the package first: npm run build');
    process.exit(1);
  }

  const nodePath = process.execPath;
  const serverEnv = { ...process.env };

  // ❌ No manual spawn here anymore!

  // Create transport — will spawn the server automatically
  const transport = new StdioClientTransport({
    command: nodePath,
    args: [mcpRunnerPath],
    env: serverEnv,
    stderr: 'inherit' // <= ADD THIS
  });
  
  const client = new Client({
    name: 'jobstash-mcp-test-client',
    version: '0.1.0'
  });

  try {
    await client.connect(transport);
    console.log('✅🤝Connected to MCP server');

    const searchParams = {
      query: query,
      tags: extractKeywords(query)
    };

    console.log(`Processing search: ${JSON.stringify(searchParams, null, 2)}`);
    const result = await client.callTool({
      name: 'search_jobs',
      arguments: { ...searchParams }
    });

    if (result && typeof result === 'object' && 'content' in result) {
      const content = result.content;
      if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
        const text = 'text' in content[0] ? String(content[0].text) : '';
        if (text) {
          try {
            const response = JSON.parse(text);
            console.log('\nSearch Results:');
            console.log(JSON.stringify(response, null, 2));
          } catch (e) {
            console.error('Error parsing response:', e);
            console.log('Raw response:', text);
          }
        }
      }
    }

    console.log("\nGetting JobStash URL...");
    const urlResult = await client.callTool({
      name: 'get_search_jobs_url',
      arguments: { ...searchParams }
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

    console.log("\nDemo completed successfully.");

    setTimeout(() => {
      process.exit(0);
    }, 100);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Helper function
function extractKeywords(query) {
  const commonTechKeywords = [
    'javascript', 'typescript', 'react', 'node', 'solidity',
    'blockchain', 'web3', 'smart contract', 'defi', 'crypto',
    'frontend', 'backend', 'fullstack'
  ];
  const lowerQuery = query.toLowerCase();
  return commonTechKeywords.filter(keyword => lowerQuery.includes(keyword.toLowerCase()));
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
