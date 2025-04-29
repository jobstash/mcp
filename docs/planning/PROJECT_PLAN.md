# JobStash MCP Integration Project Plan - Revised

## Project Overview
Create a system allowing users and AI agents to interact with the JobStash API using natural language queries and potentially CV parsing. This involves a standard MCP Server for programmatic access and a Gateway server for natural language processing.

## Tech Stack
- TypeScript
- Node.js
- NestJS (@jobstash/mcp-gateway)
- OpenAI models (or other LLMs)
- JobStash API

## Architecture Approach
Two-server architecture:
- **`@jobstash/mcp-server`**: The core MCP Host Server. Provides structured MCP tools (`search_jobs`, `get_search_jobs_url`) for interacting with the JobStash backend API. Does not use LLMs. (Phase 1 - Complete)
- **`@jobstash/mcp-gateway`**: The NL -> MCP Gateway (NestJS). Accepts plain text queries, uses an LLM for NLU, acts as an MCP Client to call `@jobstash/mcp-server`, and returns results. (Phase 2 - In Progress)

## Remaining Milestones & Tasks

### 1. Implement NL -> MCP Gateway (`@jobstash/mcp-gateway`)
- [ ] Set up NestJS service/controller for plain text input (e.g., `/get-jobstash-url`).
- [ ] Implement LLM call for Natural Language Understanding (plain text -> structured parameters matching MCP tool schemas).
- [ ] Implement MCP Client logic to connect to `@jobstash/mcp-server`.
- [ ] Implement logic to call `get_search_jobs_url` tool on `@jobstash/mcp-server` using structured parameters.
- [ ] Return the resulting JobStash URL via the Gateway's REST API.
- [ ] *Optional:* Implement logic to call `search_jobs` tool similarly.

### 2. Refinement & Testing
- [ ] Test the Gateway end-to-end flow (plain text -> URL/Jobs).
- [ ] Improve LLM parameter extraction consistency (in the Gateway).
- [ ] Consider dynamic filter configuration using `/jobs/filters` endpoint (in `@jobstash/mcp-server`).
- [ ] Finalize unit/integration tests for `@jobstash/mcp-server`.
- [ ] Add tests for `@jobstash/mcp-gateway`.

### 3. CV Parsing Capability (Blocked - Waiting David on PDF parsing tech)
- [ ] Define flow: CV -> Parse -> NLU (Gateway) -> Structured Search (MCP Server).
- [ ] Implement parsing logic (once unblocked).
- [ ] Implement NLU for parsed CV data within the Gateway.

### 4. Frontend Integration (Blocked - Waiting Design)
- [ ] Integrate Gateway API calls into the JobStash frontend.

### 5. MCP Server Publication (AI Agent Integration)
- [ ] Finalize documentation for `@jobstash/mcp-server`.
- [ ] Consider deployment/publication strategy for external AI agent access.

 