# Project Issues and Workarounds

## Module Resolution (@jobstash/mcp)

*   Runtime module resolution fails for `@modelcontextprotocol/sdk` imports when using standard paths and the base company `tsconfig.json`.
*   MCP requires `"esModuleInterop": true` in `tsconfig.json` (deviating from guideline) for correct CommonJS module imports (e.g., `path`, `fs`).
*   MCP requires `.js` extensions on `@modelcontextprotocol/sdk` imports (deviating from guideline) to fix the SDK runtime resolution failure.