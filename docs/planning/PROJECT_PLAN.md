# JobStash MCP Integration Project Plan - Revised

## Project Overview
Create a Model Context Protocol (MCP) server to interface with JobStash API, allowing users to find relevant crypto job postings through natural language queries and CV parsing. This server will be integrated into the JobStash website and potentially made accessible for other AI agents.

## Tech Stack
- TypeScript
- Node.js
- OpenAI models
- JobStash API

## Architecture Approach
Modular architecture with separate packages:
- MCP package: `@jobstash/mcp` (Implements the Model Context Protocol, reusable)
- Server application: `jobstash-mcp-server` (Provides the JobStash-specific implementation)

## Remaining Milestones & Tasks

### 1. Refinement & Testing (Server Core - `jobstash-mcp-server` & `@jobstash/mcp`)
- [ ] Improve LLM parameter extraction consistency (e.g., ensure "Senior" consistently maps to `seniority`, currently flaky).
- [ ] Consider dynamic filter configuration using /jobs/filters endpoint

### 2. CV Parsing Capability (Blocked - Waiting David on PDF parsing tech)
- [ ] TODO 

### 3. Frontend Integration (Blocked - Waiting Design)
- [ ] TODO

### 4. MCP Server Publication (AI Agent Integration)
- [ ] TODO

 