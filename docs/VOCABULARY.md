# 📘 MCP Server Development: Key Concepts

## 🔧 Core Components

- **Host**: The primary application (e.g., Claude Desktop, IDE) that manages multiple MCP clients and enforces security policies.
- **Client**: A connector within the host that establishes a 1:1 connection with an MCP server to facilitate communication.
- **Server**: An external program that exposes specific capabilities (tools, resources, prompts) to clients via the MCP standard.
  *   **In this project (MCP Host Server):** Corresponds to the `@jobstash/mcp-server` package.

## 🧩 Server Capabilities

- **Tools**: Functions that the AI model can invoke to perform actions, such as API calls or data processing.
  *   **In this project:** `search_jobs` and `get_search_jobs_url` are the tools exposed by the MCP Host Server (`@jobstash/mcp-server`).
- **Resources**: Static or dynamic data sources (e.g., files, database entries) that provide context to the AI model.
- **Prompts**: Predefined templates or instructions that guide the AI model's behavior in specific scenarios.

## 🔗 Communication Protocol

- **Transport Mechanisms**:
  - **Stdio**: Standard input/output communication, suitable for local integrations.
    *   **In this project:** The MCP Host Server initially uses `StdioServerTransport`.
  - **HTTP with Server-Sent Events (SSE)**: Enables real-time, server-initiated updates over HTTP.
- **Message Format**: Utilizes JSON-RPC 2.0 for structured, bidirectional communication between clients and servers.

## 🛡️ Security Principles

- **User Consent**: Explicit user approval is required for data access and tool execution.
- **Data Privacy**: Sensitive information must be protected, and data sharing should comply with privacy regulations.
- **Tool Safety**: Tools should be designed to prevent unintended side effects and ensure safe execution.

## 🚀 Getting Started

- **SDKs Available**: Python, TypeScript, Java, Kotlin, C#

- **Example Implementation (Python with FastMCP)**:

```python
from fastmcp import FastMCP

mcp = FastMCP("Demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    return a + b

@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    return f"Hello, {name}!"

@mcp.prompt()
def review_code(code: str) -> str:
    return f"Please review this code:\n\n{code}"
```

## Project Specific Terms

*   **MCP Host Server:** The application that **exposes** JobStash capabilities (`search_jobs`, `get_search_jobs_url`) according to the MCP specification. Corresponds to the `@jobstash/mcp-server` package. Uses stdio transport initially.

*   **NL->MCP Gateway:** An application that acts as a bridge between natural language and MCP. Receives plain text, uses LLM for NLU, acts as an MCP Client to call the MCP Host Server, processes the response, and returns a user-friendly result via its own API (e.g., REST). Corresponds to the `@jobstash/mcp-gateway` package.

*   **MCP Client:** The component (either within the NL->MCP Gateway or an external application) that connects to the MCP Host Server via a compatible transport (e.g., StdioClientTransport) and sends `tools.call` messages.
