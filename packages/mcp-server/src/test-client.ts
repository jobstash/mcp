#!/usr/bin/env node
"use strict";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from 'path';
import fs from 'fs';

async function main() {
  const argv = process.argv.slice(2);
  let cliArgs = [...argv]; // Use a mutable copy for processing
  let toolToTest = "";
  let queryFromCli = ""; // Store the query string from CLI

  const toolArgIndex = cliArgs.findIndex(arg => arg === '--tool');

  if (toolArgIndex !== -1) {
    // Found --tool
    if (cliArgs[toolArgIndex + 1]) {
      toolToTest = cliArgs[toolArgIndex + 1];
      cliArgs.splice(toolArgIndex, 2); // Remove --tool and its value from cliArgs
    } else {
      console.error("Error: --tool flag requires a tool name.");
      console.error('Supported tools: search_jobs, get_search_url');
      console.error('Usage: node test-client.js --tool <tool_name>');
      console.error('Usage: node test-client.js "your job search query"');
      process.exit(1);
    }
  }

  // Any remaining positional argument is considered the query string
  if (cliArgs.length > 0) {
    queryFromCli = cliArgs[0];
  }

  // Validate arguments based on mode
  if (!toolToTest && !queryFromCli) {
    // If --tool is NOT specified (default mode), queryFromCli is mandatory.
    console.error('Error: Please provide a job search query when not using --tool.');
    console.error('Usage: node test-client.js "your job search query"');
    console.error('Usage: node test-client.js --tool <search_jobs|get_search_url>');
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

    const specificNluArgsForTesting = { // Arguments for targeted tool testing
      tags: ["solidity"],
      locations: ["Remote"],
      seniority: ["senior"]
    };

    if (toolToTest) {
      // --- Specific tool testing mode ---
      console.log(`Targeted test for tool: ${toolToTest}`);

      if (toolToTest === 'search_jobs') {
        console.log(`\nCalling search_jobs with specific NLU-like arguments: ${JSON.stringify(specificNluArgsForTesting, null, 2)}`);
        const result = await client.callTool({
          name: 'search_jobs',
          arguments: { ...specificNluArgsForTesting }
        });
        // Result processing for search_jobs
        if (result && typeof result === 'object' && 'content' in result) {
          const content = result.content;
          if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
            const text = 'text' in content[0] ? String(content[0].text) : '';
            if (text) {
              try {
                const response = JSON.parse(text);
                console.log('\nSearch Results (from search_jobs):');
                console.log(JSON.stringify(response, null, 2));
              } catch (e) {
                console.error('Error parsing search_jobs response:', e);
                console.log('Raw search_jobs response:', text);
              }
            }
          }
        }
      } else if (toolToTest === 'get_search_url') {
        console.log(`\nCalling get_search_url with specific NLU-like arguments: ${JSON.stringify(specificNluArgsForTesting, null, 2)}`);
        const urlResult = await client.callTool({
          name: 'get_search_url',
          arguments: { ...specificNluArgsForTesting }
        });
        // Result processing for get_search_url
        if (urlResult && typeof urlResult === 'object' && 'content' in urlResult) {
          const content = urlResult.content;
          if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
            const text = 'text' in content[0] ? String(content[0].text) : '';
            if (text) {
              try {
                const response = JSON.parse(text);
                console.log('\nJobStash URL (from get_search_url):');
                console.log(response.jobstashUrl);
              } catch (e) {
                console.error('Error parsing get_search_url response:', e);
                console.log('Raw get_search_url response:', text);
              }
            }
          }
        }
      } else {
        console.warn(`Warning: Unknown tool specified for targeted test: '${toolToTest}'. Supported: search_jobs, get_search_url`);
      }
    } else {
      // --- Default mode: test with query string from CLI ---
      console.log(`Running default test sequence with query: "${queryFromCli}"`);
      const defaultSearchParams = {
        query: queryFromCli,
        tags: extractKeywords(queryFromCli)
      };

      // Call search_jobs
      console.log(`\nCalling search_jobs with default arguments: ${JSON.stringify(defaultSearchParams, null, 2)}`);
      const result = await client.callTool({
        name: 'search_jobs',
        arguments: { ...defaultSearchParams }
      });
      if (result && typeof result === 'object' && 'content' in result) {
        const content = result.content;
        if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
          const text = 'text' in content[0] ? String(content[0].text) : '';
          if (text) {
            try {
              const response = JSON.parse(text);
              console.log('\nSearch Results (from search_jobs):');
              console.log(JSON.stringify(response, null, 2));
            } catch (e) {
              console.error('Error parsing search_jobs response:', e);
              console.log('Raw search_jobs response:', text);
            }
          }
        }
      }

      // Call get_search_url
      console.log(`\nCalling get_search_url with default arguments: ${JSON.stringify(defaultSearchParams, null, 2)}`);
      const urlResult = await client.callTool({
        name: 'get_search_url',
        arguments: { ...defaultSearchParams }
      });
      if (urlResult && typeof urlResult === 'object' && 'content' in urlResult) {
        const content = urlResult.content;
        if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
          const text = 'text' in content[0] ? String(content[0].text) : '';
          if (text) {
            try {
              const response = JSON.parse(text);
              console.log('\nJobStash URL (from get_search_url):');
              console.log(response.jobstashUrl);
            } catch (e) {
              console.error('Error parsing get_search_url response:', e);
              console.log('Raw get_search_url response:', text);
            }
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
