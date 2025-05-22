# JobStash Standard MCP Server (`@jobstash/mcp-server`)

## Overview

This package implements a standard **Model Context Protocol (MCP)** Server exposing JobStash job search capabilities. It is designed to be consumed by any MCP-compliant client application or agent seeking structured access to JobStash data.

**Note:** This server provides a low-level, structured interface. For a user-friendly interface that handles natural language queries, please refer to the separate **NL->MCP Gateway** server (`@jobstash/mcp-gateway` package) documented elsewhere in this repository.

## Architecture

This server acts as the standard MCP endpoint (MCP Host Server). Its sole purpose is to handle standard MCP protocol interactions based on predefined schemas.

**Key Characteristic:** This server does **NOT** perform Natural Language Understanding (NLU) and does **NOT** utilize Large Language Models (LLMs). Clients *must* provide structured arguments conforming to the defined tool schemas.

## Functionality

Exposes JobStash job data and search URL construction via MCP tools.
It also provides a tool to process structured data extracted from a CV to generate a relevant JobStash search URL.

### Available Tools

#### 1. `search_jobs`

*   **Description:** Searches for JobStash jobs based on structured filters and returns a list of matching job objects found on the JobStash platform.
*   **Input Schema:** Accepts a JSON object matching the `search_jobs_input_schema` defined in `src/schemas.ts`. Key filters include:
    *   `query` (string, optional): Free-text query passed to the backend.
    *   `tags` (string[], optional): Skills/keywords (e.g., `["solidity"]`).
    *   `locations` (string[], optional): Locations (e.g., `["Remote", "London"]`).
    *   `companyNames` (string[], optional): Specific companies.
    *   `seniority` (string[], optional): Experience levels (e.g., `["senior"]`).
    *   `salaryMin` (integer, optional): Minimum salary.
    *   `salaryMax` (integer, optional): Maximum salary.
    *   `equity` (boolean, optional): Equity filter.
    *   *(Refer to `src/schemas.ts` for the complete schema definition)*
*   **Output Schema:** Returns a JSON object matching `search_jobs_output_schema` defined in `src/schemas.ts`, containing:
    *   `jobs` (array): A list of job objects, each with properties like `title`, `company`, `location`, `url`, `description`, `tags`.
    *   *(Refer to `src/schemas.ts` for the complete schema definition)*

#### 2. `get_search_url`

*   **Description:** Constructs a JobStash website URL based on structured job search filters. This URL leads to the filtered search results page on `jobstash.xyz`.
*   **Input Schema:** Accepts a JSON object matching the `search_jobs_input_schema` defined in `src/schemas.ts` (the same schema used by `search_jobs`).
*   **Output Structure:** Returns a JSON object containing:
    *   `jobstashUrl` (string, uri): The fully constructed JobStash search URL.
    *   *(The exact output schema is defined within the tool handler itself.)*

#### 3. `process_cv_job_data`

*   **Description:** Takes structured job-related data (extracted from a CV by a client), maps it to standard search filters, and then constructs a JobStash website URL. This tool does *not* process the CV file itself, nor does it extract user profile information.
*   **Input Schema:** Accepts a JSON object matching the `cv_job_data_schema` defined in `src/schemas.ts`. This schema includes fields like:
    *   `jobTitles` (string[], optional): Job titles mentioned in the CV.
    *   `skills` (string[], optional): Skills extracted from the CV.
    *   `locations` (string[], optional): Locations preferred or mentioned.
    *   `seniorityKeywords` (string[], optional): Keywords indicating experience level.
    *   `companyNames` (string[], optional): Companies worked at.
    *   `educationLevel` (string, optional): Highest education level.
    *   `yearsExperience` (integer, optional): Total years of experience.
    *   *(Refer to `src/schemas.ts` for the complete `cv_job_data_schema` definition)*
*   **Output Schema:** Returns a JSON object containing:
    *   `jobstashUrl` (string, uri): The fully constructed JobStash search URL based on the processed CV data.
    *   *(The exact output schema is defined within the tool handler itself.)*

### Supported Search Filters via LLM

The LLM can understand and extract the following filter criteria from your natural language queries. These are then mapped to the JobStash API:

*   `query` (string, optional): Free-text search query.
*   `tags` (string[], optional): Skills, technologies, or keywords (e.g., `["typescript", "remote"]`).
*   `locations` (string[], optional): Job locations (e.g., `["london", "remote"]`).
*   `seniority` (string[] or string, optional): Experience levels (e.g., `["senior"]`, `"3"`, `["1", "5"]`). The API typically expects numeric strings if applicable.
*   `minSalaryRange` (integer, optional): Minimum desired salary.
*   `maxSalaryRange` (integer, optional): Maximum desired salary.
*   `token` (boolean, optional): Whether the project has a cryptocurrency token (true/false).
*   `commitments` (string[], optional): Job commitment types (e.g., `["full-time", "contract"]`).
*   `investors` (string[], optional): Investor names or VC firms.
*   `classifications` (string[], optional): Job categories or functional areas (e.g., `["engineering", "product"]`).

#### Filter Description Generation

The filter descriptions provided to the LLM are dynamically generated based on the following:

1. **Filter Configuration Source**: Filter configurations are sourced from a local `filters.json` file, which is a cached copy of the JobStash filters API (from `https://middleware.jobstash.xyz/jobs/filters`). This file contains the available options for each filter type.

2. **Description Building Logic**: Filter descriptions are built based on:
   - The filter type (single select, multi-select, multi-select with search, etc.)
   - Available options from the JSON file
   - Additional explanatory notes when necessary (e.g., seniority level codes)

3. **Filter Types**:
   - `getMultiSelectDescription`: For filters that accept multiple values from a fixed set (e.g., seniority)
   - `getMultiSelectWithSearchDescription`: For filters that accept multiple values including both predefined options and free text (e.g., locations)
   - `getSingleSelectDescription`: For filters that accept a single value from a fixed set (e.g., token)

This approach ensures that filter descriptions accurately reflect the current JobStash platform capabilities and provide comprehensive guidance to the LLM.

You can view all generated filter descriptions by running:
```bash
yarn print-filters
```

## Transport & Connection (Stdio)

This server is primarily exposed via **Standard Input/Output (stdio)** transport. This means it runs as a command-line process.

### Running the Server

1.  **Prerequisites:** Ensure Node.js (version specified in root `package.json`) is installed.
2.  **Build:** Build the monorepo and this package using the instructions in the root repository README (e.g., `yarn install && yarn build`).
3.  **Execute:** Run the compiled runner script from the **monorepo root directory**:
    ```bash
    node packages/mcp-server/dist/src/mcp-runner.js # Adjust path if build output differs
    ```
    The server process will start, waiting for MCP messages on its standard input and sending responses to its standard output.

### Connecting as an MCP Client (Stdio)

To interact with this server, your MCP Client application must:
1.  Use an MCP Client library compatible with the `@modelcontextprotocol/sdk`.
2.  Configure the client library to use a `StdioClientTransport`.
3.  Provide the full command required to execute the server runner (step 3 above) to the `StdioClientTransport` configuration. The transport will handle spawning the server process.

**Conceptual Client Code Snippet (using `@modelcontextprotocol/sdk/client`):**

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Command to run the server (relative to where client is run, or absolute path)
const serverCommand = 'node';
const serverArgs = ['packages/mcp-server/dist/src/mcp-runner.js']; // IMPORTANT: Adjust this path!

const transport = new StdioClientTransport({ command: serverCommand, args: serverArgs });
const client = new Client({ name: 'my-jobstash-mcp-client', version: '1.0' });

try {
  await client.connect(transport);
  console.log('Connected to JobStash MCP Server via stdio.');

  // Example: Get the URL for remote senior solidity jobs
  const urlResult = await client.callTool({
    name: 'get_search_url',
    arguments: {
      locations: ["Remote"],
      seniority: ["senior"],
      tags: ["solidity"]
    }
  });
  console.log('JobStash URL:', urlResult?.jobstashUrl); // Access result based on output schema

  // Disconnect when finished
  await client.disconnect();

} catch (error) {
  console.error("MCP Client Error:", error);
}
```

## Configuration

*   **JobStash Backend Connection:** This server requires configuration to interact with the JobStash backend (e.g., API base URL, authentication tokens). The exact mechanism (e.g., environment variables read by `mcp-runner.js`) is TBD and needs to be set up in the deployment environment where the runner script is executed.
*   **MCP Server Identification:** The `name` and `version` (e.g., `@jobstash/mcp-server`, `0.1.0`) are used for MCP identification and should be configured appropriately when the server is instantiated.

## Development & Testing

For details on setting up the development environment, building the package, and running tests, please consult the main [README.md](../../README.md) located in the root of the monorepo. 