# JobStash MCP Integration

This monorepo enables searching JobStash via natural language, using a two-server Model Context Protocol (MCP) architecture.

1.  **`@jobstash/mcp-server`**: Core MCP Host Server providing structured tools (`get_search_url`, `search_jobs`).
2.  **`@jobstash/mcp-gateway`**: NestJS Gateway translating natural language (via LLM) to MCP calls.

## Project Structure

```
/
├── packages/
│   ├── mcp-server/     # Core MCP Host Server
│   └── mcp-gateway/    # NestJS NL->MCP Gateway
├── docs/                 # Planning, Architecture docs
├── .env                  # Required: OPENAI_API_KEY
└── package.json          # Workspace root
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- OpenAI API key (set in `.env` file)

### Installation

```bash
# Clone, cd mcp
git clone <repo-url> && cd mcp

# Create .env if it doesn't exist (add OPENAI_API_KEY)
# Example: echo "OPENAI_API_KEY=sk-..." > .env

# Install all dependencies
yarn install
```

### Build

```bash
# Build both packages
yarn build
# Or individually: yarn workspace @jobstash/mcp-server build, yarn workspace @jobstash/mcp-gateway build
```

## Running

Both servers need to run concurrently for the full NL->MCP flow.

1.  **Start MCP Server (Server 1):**
    ```bash
    # From workspace root
    node packages/mcp-server/dist/mcp-runner.js
    ```

2.  **Start Gateway (Server 2):**
    ```bash
    # From workspace root, in a new terminal
    yarn workspace @jobstash/mcp-gateway start:dev
    # Gateway runs on http://localhost:3000 by default
    ```

## Testing

-   **MCP Server E2E (via test client):**
    ```bash
    # From workspace root
    yarn workspace @jobstash/mcp-server test:client "your query here"
    ```
-   **Gateway Unit/Integration Tests:**
    ```bash
    # From workspace root
    yarn workspace @jobstash/mcp-gateway test
    ```
-   **Gateway E2E Tests (Requires separate test setup/db if applicable):**
    ```bash
    # From workspace root
    yarn workspace @jobstash/mcp-gateway test:e2e
    ```
-   **Manual Gateway Test (Servers running):**
    ```bash
    curl -X POST http://localhost:3000/api/v1/search-url -H "Content-Type: application/json" -d '{ "query": "senior dev remote" }'
    curl -X POST http://localhost:3000/api/v1/search-jobs -H "Content-Type: application/json" -d '{ "query": "senior dev remote" }'
    ```

## Project Status

- ✅ MCP Server (`@jobstash/mcp-server`) implemented with `search_jobs` and `get_search_url` tools.
- ✅ Gateway (`@jobstash/mcp-gateway`) implemented.
- ✅ Gateway `/api/v1/search-url` endpoint functional (NL -> URL).
- ⏳ Gateway `/api/v1/search-jobs` endpoint initial implementation complete (NL -> Job List).
- ⬜ CV Parsing capability blocked.
- ⬜ Frontend Integration blocked.

See `/docs` for planning and architecture details.

## License

MIT 