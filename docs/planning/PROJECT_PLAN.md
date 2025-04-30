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
- **`@jobstash/mcp-server`**: The core MCP Host Server. Provides structured MCP tools (`search_jobs`, `get_search_url`) for interacting with the JobStash backend API. Does not use LLMs. (Phase 1 - Complete)
- **`@jobstash/mcp-gateway`**: The NL -> MCP Gateway (NestJS). Accepts plain text queries, uses an LLM for NLU, acts as an MCP Client to call `@jobstash/mcp-server`, and returns results. (Phase 2 - Complete)

## Remaining Milestones & Tasks

### 1. Implement NL -> MCP Gateway (`@jobstash/mcp-gateway`) - COMPLETE
- [x] Set up NestJS service/controller for plain text input (e.g., `/api/v1/search-url`).
- [x] Implement LLM call for Natural Language Understanding (plain text -> structured parameters matching MCP tool schemas).
- [x] Implement MCP Client logic to connect to `@jobstash/mcp-server`.
- [x] Implement logic to call `get_search_url` tool on `@jobstash/mcp-server` using structured parameters.
- [x] Return the resulting JobStash URL via the Gateway's REST API.

### 2. Dynamic Filter Configuration (`@jobstash/mcp-server`)
- [ ] Investigate fetching filter definitions from a JobStash endpoint (e.g., `/public/jobs/filters`) at server startup.
- [ ] Explore feasibility of dynamically generating the `search_jobs_input_schema` (Zod schema in `schemas.ts`) based on fetched filters.
- [ ] Implement dynamic schema generation if feasible.
- [ ] Update `@jobstash/mcp-server` tool registration/handling if schema becomes dynamic.

### 3. Implement CV Parsing Capability (`@jobstash/mcp-gateway`)
- [ ] Define API endpoint in Gateway to accept CV file uploads.
- [ ] Implement logic to call OpenAI API (or similar) for parsing CV content (text extraction).
- [ ] Implement NLU within the Gateway to extract structured job search parameters (skills, experience, etc.) from the parsed CV text.
- [ ] Define flow for using extracted parameters (e.g., call `get_search_url` on Server 1 with CV parameters? Or perhaps call `search_jobs` if we re-introduce it later?).
- [ ] Determine response format for the CV parsing endpoint.

### 4. Frontend Integration (Blocked - Waiting Design)
- [ ] Integrate Gateway API calls (`/search-url`, potentially CV upload endpoint) into the JobStash frontend.

### 5. MCP Server Publication (AI Agent Integration)
- [ ] Finalize documentation for `@jobstash/mcp-server`.
- [ ] Consider deployment/publication strategy for external AI agent access.

 