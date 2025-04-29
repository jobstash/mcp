# MCP Refactoring Plan (Concise)

**Goal:** Split into Server 1 (MCP Host Server, `@jobstash/mcp-server`) and Server 2 (NL->MCP Gateway, `@jobstash/mcp-gateway`).

---

## Phase 1: Refactor `@jobstash/mcp-server` (MCP Host Server)

1.  **[x] Schemas:** Define `search_jobs` input/output JSON Schemas (`packages/mcp-server/src/types.ts` or `packages/mcp-server/src/schemas.ts`).
2.  **[x] `McpManager` (`packages/mcp-server/src/server.ts`):**
    *   Remove `getStructuredData`, `processJobQuery`.
    *   Remove `OpenAI` client, config, dependency.
    *   Register `search_jobs` tool (using schemas).
    *   Implement `search_jobs` callback: structured args -> JobStash backend -> structured results.
    *   Update `McpManagerConfig` for JobStash backend interaction.
3.  **[x] Remove Files:** Delete `packages/mcp-server/src/prompts.ts`, `packages/mcp-server/src/parameter-extractor.ts`.
4.  **[x] Cleanup `types.ts`:** Remove unused types (e.g., `MCPResponse`) from `packages/mcp-server/src/types.ts` (or delete file).
5.  **[ ] Tests (`packages/mcp-server/tests/server.spec.ts`):** Remove OpenAI mocks. Test `search_jobs` registration, mock/verify backend call & output.
6.  **[x] MCP Runner (`packages/mcp-server/src/mcp-runner.ts`):** Create script to instantiate `McpManager`, connect `McpServer` via `StdioServerTransport`.
7.  **[ ] Docs (`packages/mcp-server/README.md`):** Update role, `search_jobs` details, runner usage.
8.  **[x] Dependencies (`packages/mcp-server/package.json`):** Remove `openai`. Ensure `@modelcontextprotocol/sdk`.

---

## Phase 2: Refactor `@jobstash/mcp-gateway` (NL->MCP Gateway)

1.  **Dependencies:** Add MCP Client SDK. Ensure LLM SDK (`openai`).
2.  **Logic (Controllers/Services):**
    *   Remove direct `McpManager` usage from `@jobstash/mcp-server`.
    *   Implement NLU: plain text query -> LLM -> structured `search_jobs` args.
    *   Implement MCP Client: connect to MCP Host Server -> call `search_jobs` tool -> get structured response.
    *   Process MCP Response: extract data -> format (optional LLM) -> return via REST API.
    *   Adapt `/api/v1/structured-data/extract-params` to *only* perform NLU step.
3.  **Config:** Add MCP Client connection info. Ensure LLM config.
4.  **Tests:** Mock LLM calls. Mock MCP Client interactions (connect, tool call, response).
5.  **Docs (`packages/mcp-gateway/README.md`):** Update role, API details, MCP Host Server dependency, config vars.
6.  **Dependencies (`packages/mcp-gateway/package.json`):** Remove direct `@jobstash/mcp-server` usage if possible (prefer MCP client).

--- 