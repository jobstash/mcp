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
├── docs/                 # Project documentation
├── .env                  # Required: OPENAI_API_KEY
└── package.json          # Workspace root
```

## Architecture Overview

The system uses a two-server architecture to separate natural language processing from the core MCP interaction:

1.  **`@jobstash/mcp-server`:** The Jobstash MCP Server.
    *   **Role:** Acts as a standard MCP Server, exposing Jobstash's job search functionality via structured, machine-readable tools (like `search_jobs` and `get_search_url`) according to the MCP specification.
    *   **Key Functionality:** It directly interacts with the Jobstash backend (API/DB) based on structured requests from MCP clients. **This server does not use an LLM.**
2.  **`@jobstash/mcp-gateway`:** The Natural Language (NL) to MCP Gateway.
    *   **Role:** Serves as a bridge, translating user-friendly natural language queries into structured MCP calls to the `@jobstash/mcp-server`.
    *   **Key Functionality:** Exposes a simple API (e.g., REST) for plain text queries. It uses an LLM to understand these queries, extract parameters, and then acts as an MCP client to communicate with the `@jobstash/mcp-server`.

### Visual Overview

```
+-------------------+       +------------------------+      +-------------------+      +-------------------+
|   User / Simple   | ----> | Gateway (NL->MCP GW)   | ---> |                   | ---> | Jobstash Backend  |
|   Application     |       | (Plain Text API)       |      |                   |      |                   |
+-------------------+       | - Uses LLM for NLU     |      |                   |      +-------------------+
| Acts as MCP Client|       |                        |      |                   |
+-------------------+       +------------------------+      | Mcp Server        |
+-------------------+                                       |(Jobstash MCP Srv) |
| External MCP      |                                       |                   |
| Client / Host App | ------------------------------------->|                   |
+-------------------+                                       |                   |
| (API / DB)        |                                       +-------------------+
+-------------------+
```

### Interaction Flow (Example: Job Search)

1.  A user sends a plain text query (e.g., "senior dev remote") to the Gateway's API.
2.  The Gateway uses an LLM to translate this query into a structured MCP `tools.call` request for the Mcp Server.
3.  The Gateway (acting as an MCP Client) sends this structured request to the Mcp Server.
4.  The Mcp Server executes the job search logic against the Jobstash backend using the structured arguments.
5.  The Mcp Server returns a structured MCP response (e.g., a list of jobs) to the Gateway.
6.  The Gateway processes this response (potentially summarizing it with an LLM) and returns a user-friendly result to the user.

### Benefits of this Architecture

*   **Reusability:** The `@jobstash/mcp-server` is standard and can be used by any MCP-compliant client.
*   **Separation of Concerns:** Isolates the MCP protocol logic (Mcp Server) from the NLU/LLM logic (Gateway).
*   **Flexibility:** Provides both a standard MCP interface for programmatic access and an easy-to-use natural language interface.

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