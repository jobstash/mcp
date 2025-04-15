## 1. Introduction & Goal

The objective is to enable AI agents and applications to programmatically search the Jobstash job board using the **Model Context Protocol (MCP)**. This involves creating a standardized interface for AI interaction with Jobstash's job data.

## 2. Proposed Architecture

We propose a two-server architecture to achieve this goal. This separates the standard MCP interaction logic from the natural language processing component.

1.  **Server 1: Jobstash MCP Server:** Exposes Jobstash capabilities via the standard MCP protocol.
2.  **Server 2: Natural Language (NL) to MCP Gateway:** Provides a user-friendly interface that translates natural language into structured MCP calls to Server 1.


```
+-------------------+       +------------------------+      +-------------------+      +-------------------+
|   User / Simple   | ----> | Server 2 (NL->MCP GW)  | ---> |                   | ---> | Jobstash Backend  |
|   Application     |       | (Plain Text API)       |      |                   |      |                   |
+-------------------+       | - Uses LLM for NLU     |      |                   |      +-------------------+
| Acts as MCP Client|       |                        |      |                   |
+-------------------+       +------------------------+      | Server 1          |       
+-------------------+                                       |(Jobstash MCP Srv) |       
| External MCP      |                                       |                   |       
| Client / Host App | ------------------------------------->|                   |
+-------------------+                                       |                   |
| (API / DB)        |                                       +-------------------+
+-------------------+
```

## 3. Component Details


### 3.1. Server 1: Jobstash MCP Server

* **Role:** This server acts as the standard **MCP Server** for Jobstash. Its purpose is to expose Jobstash's job search functionality in a structured, machine-readable way according to the MCP specification.
* **Functionality:**
    * Listens for and handles standard MCP connections and protocol messages (likely via HTTP/SSE).
    * Defines and exposes MCP **Tools**, starting with a `search_jobs` tool. This definition includes the tool's `name`, a `description` (for AI clients to understand its purpose), and precise `input_schema` and `output_schema` (JSON Schema) defining the structure for arguments and results.
    * Receives **structured** `tools.call` requests from authenticated MCP clients.
    * Maps the validated, structured arguments from the request to calls against the Jobstash backend (API or database).
    * Crucially, **this server does not use an LLM**. It processes requests based on the predefined logic for the called tool and the structured data provided.
    * Formats the results from the Jobstash backend into the structured format specified by the tool's output schema.
    * Sends the structured MCP response back to the requesting MCP client.
* **Accessibility:** Intended to be accessible by any standard MCP Client, including Server 2 and potentially external clients, requiring appropriate authentication.

### 3.2. Server 2: Natural Language (NL) to MCP Gateway

* **Role:** This server acts as a bridge between natural language user queries and the structured world of the MCP Server. It effectively functions as an "AI Agent Facade" for Jobstash search. Internally, it utilizes an **MCP Client** component to communicate with Server 1.
* **Technology:** Node.js (TypeScript recommended), LLM client library (for interacting with providers like OpenAI, Anthropic, Google AI), Node.js MCP Client SDK/library.
* **Functionality:**
    * Exposes a simple API (e.g., REST) that accepts **plain text** user queries (e.g., "find senior remote solidity jobs").
    * Uses an **LLM** to understand the plain text request, identify the user's intent (e.g., to search jobs), extract relevant parameters (skills, location, experience), and **translate** these into a **structured JSON object** that conforms to the `search_jobs` input schema defined by Server 1.
    * Uses its internal MCP Client component to connect and authenticate with Server 1.
    * Sends the structured `tools.call` request (generated via the LLM) to Server 1.
    * Receives the structured MCP response (containing the job list) back from Server 1.
    * Processes the structured response, potentially using an LLM again to summarize or format the results into a user-friendly natural language response or simplified JSON.
    * Returns this final, processed response to the original requester.
* **Accessibility:** Provides an easy-to-use entry point for users or applications that don't have their own MCP Host/Client setup. Requires its own authentication if exposed publicly.

## 4. Interaction Flow Example (Job Search)

1.  User sends plain text query to Server 2's API.
2.  Server 2 uses an LLM to translate the query into a structured MCP `tools.call` request for the `search_jobs` tool on Server 1.
3.  Server 2 (as MCP Client) sends this structured request to Server 1.
4.  Server 1 executes the `search_jobs` logic against the Jobstash backend using the provided structured arguments.
5.  Server 1 returns a structured MCP response (job list) to Server 2.
6.  Server 2 receives the structured response and processes it (e.g., summarizes with LLM).
7.  Server 2 returns the final, user-friendly response to the User.


## 5. Benefits of this Architecture

* **Reusability (Server 1):** The core MCP Server is standard and can be used by any MCP-compliant client.
* **Separation of Concerns:** Isolates standard protocol logic (Server 1) from complex NLU/LLM logic (Server 2).
* **Flexibility:** Provides both a standard MCP interface and an easy-to-use natural language interface.
