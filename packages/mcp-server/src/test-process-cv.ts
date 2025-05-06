#!/usr/bin/env node
"use strict";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from 'path';
import fs from 'fs';

async function main() {
    const mcpRunnerPath = path.join(__dirname, 'mcp-runner.js');
    if (!fs.existsSync(mcpRunnerPath)) {
        console.error(`Error: Server script not found at ${mcpRunnerPath}`);
        console.error('Make sure to build the package first: npm run build');
        process.exit(1);
    }

    const nodePath = process.execPath;
    const serverEnv = { ...process.env };

    const transport = new StdioClientTransport({
        command: nodePath,
        args: [mcpRunnerPath],
        env: serverEnv,
        stderr: 'inherit'
    });

    const client = new Client({
        name: 'jobstash-mcp-test-cv-client',
        version: '0.1.0'
    });

    try {
        await client.connect(transport);
        console.log('✅🤝 Connected to MCP server for CV processing test');

        // Define Mock CvJobData 
        // (This is the data that the Gateway's NLU would extract from CV text)
        const mockCvData: any /* Replace 'any' with CvJobData type if imported */ = {
            skills: ["typescript", "nestjs", "react"],
            jobTitles: ["Senior Software Engineer", "Backend Developer"],
            locations: ["Remote", "Berlin"],
            seniorityKeywords: ["senior", "lead"],
            yearsExperience: 6,
            // companyNames: ["Tech Corp"],
            // educationLevel: "Master's",
            // fullCvText: "Optional full text..." 
        };

        console.log(`\nCalling 'process_cv_job_data' with arguments:`);
        console.log(JSON.stringify(mockCvData, null, 2));

        const result = await client.callTool({
            name: 'process_cv_job_data',
            arguments: mockCvData
        });

        console.log('\nResponse from "process_cv_job_data":');
        if (result && typeof result === 'object' && 'content' in result) {
            const content = result.content;
            if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
                const text = 'text' in content[0] ? String(content[0].text) : '';
                if (text) {
                    try {
                        const response = JSON.parse(text);
                        console.log(JSON.stringify(response, null, 2));
                    } catch (e) {
                        console.error('Error parsing response:', e);
                        console.log('Raw response:', text);
                    }
                }
            }
        } else {
            console.log("Unexpected result format:", result);
        }

        console.log("\nCV Processing Test completed successfully.");

    } catch (error) {
        console.error('Error during CV processing test:', error);
        process.exit(1);
    } finally {
        // Ensure clean exit
        setTimeout(() => {
            // Transport should handle killing the server, but exit client script
            process.exit(0);
        }, 100);
    }
}

main().catch(error => {
    console.error('Unhandled error in CV processing test script:', error);
    process.exit(1);
}); 