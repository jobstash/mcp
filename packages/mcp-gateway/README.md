# JobStash NL->MCP Gateway (`@jobstash/mcp-gateway`)

This package contains the NestJS server responsible for providing a user-friendly HTTP API that translates natural language job queries into structured MCP calls.

## Purpose

This server acts as the NL->MCP Gateway (Server 2 in the project architecture). Its primary goal is to bridge the gap between simple, natural language requests and the standardized, structured interface provided by the **MCP Host Server** (`@jobstash/mcp-server`).

It allows clients to:

1.  Submit a plain text job search query.
2.  Receive a constructed JobStash search URL or potentially a summarized list of jobs, without needing to understand the MCP protocol itself.

Internally, this server uses:
*   An LLM (like OpenAI) to perform Natural Language Understanding (NLU) on the input query.
*   An MCP Client component to communicate with the `@jobstash/mcp-server` via its MCP transport (e.g., stdio).
*   For CV parsing, it utilizes the `@jobstash/file-parser` package to extract text from uploaded CV files.

## API Endpoints

The server exposes the following v1 endpoints:

### 1. Get Search URL (via NL)

-   **Endpoint:** `POST /api/v1/search-url`
-   **Description:** Takes a natural language query, uses an LLM to extract structured parameters, calls the `get_search_url` tool on the MCP Host Server via MCP, and returns the resulting JobStash search URL.
-   **Request Body:**
    ```json
    {
      "query": "Your natural language job query"
    }
    ```
-   **Example Success Response (200 OK):**
    ```json
    {
      "jobstashUrl": "https://jobstash.xyz/jobs?locations=Remote"
    }
    ```

### 2. Search Jobs (via NL)

-   **Endpoint:** `POST /api/v1/search-jobs`
-   **Description:** Takes a natural language query, uses an LLM to extract structured parameters, calls the `search_jobs` tool on the MCP Host Server via MCP, and returns the list of matching jobs.
-   **Request Body:**
    ```json
    {
      "query": "Your natural language job query"
    }
    ```
-   **Example Success Response (200 OK):**
    ```json
    {
      "jobs": [
        {
          "title": "Senior Solidity Engineer",
          "company": "Web3 Co",
          "location": "Remote",
          "url": "https://jobstash.xyz/job/123",
          "description": "...",
          "tags": ["solidity", "blockchain"]
        }
        // ... other jobs
      ]
    }
    ```

### 3. Extract Structured Parameters (NLU Only)

-   **Endpoint:** `POST /api/v1/structured-data/extract-params`
-   **Description:** Takes a natural language query and returns a JSON object containing structured parameters extracted using the LLM NLU logic, guided by `filters.json`. **Note:** This endpoint only performs the NLU step and does *not* interact with the MCP Host Server.
-   **Request Body:**
    ```json
    {
      "query": "Your natural language job query"
    }
    ```
-   **Example Success Response (200 OK):**
    ```json
    {
      "tags": ["Software engineer"],
      "locations": ["London"]
    }
    ```

### 4. Parse CV and Get JobStash URL

-   **Endpoint:** `POST /api/v1/cv/parse`
-   **Description:** Accepts a CV file (e.g., PDF, DOCX, TXT), parses it to extract text content, performs NLU to derive structured job parameters and user profile information, calls the `process_cv_job_data` tool on the MCP Host Server, and returns a JobStash search URL along with the extracted user profile.
-   **Request:** `multipart/form-data` containing the CV file. The file should be sent under a field named `cv`.
    -   Example `curl` command:
        ```bash
        curl -X POST -F "cv=@/path/to/your/cv.pdf" http://localhost:3000/api/v1/cv/parse
        ```
-   **Example Success Response (200 OK):**
    ```json
    {
      "jobstashUrl": "https://jobstash.xyz/jobs?skills=typescript&skills=nestjs&locations=Remote",
      "userProfile": {
        "fullName": "Jane Doe",
        "email": "jane.doe@example.com",
        "phone": "123-456-7890",
        "links": ["https://linkedin.com/in/janedoe", "https://github.com/janedoe"],
        "summary": "Experienced software engineer...",
        // ... other potential profile fields
      }
    }
    ```
-   **Notes:**
    -   The actual fields in `userProfile` will depend on the NLU extraction capabilities.
    -   File parsing is handled by the `@jobstash/file-parser` package, which may use services like OpenAI Assistants API for complex file types. Ensure `OPENAI_API_KEY` and `OPENAI_ASSISTANT_ID_PARSER` are configured in the root `.env` if using OpenAI-based parsing.

## Configuration

-   **`.env` (Root Directory):**
    -   Requires `OPENAI_API_KEY` (or other LLM provider keys) for the NLU step.
    -   Requires `OPENAI_ASSISTANT_ID_PARSER` if using the default OpenAI-based file parser from `@jobstash/file-parser` for CVs.
    -   May require additional variables for configuring the MCP Client connection to the MCP Host Server (e.g., path to the runner script for stdio transport).
-   **`filters.json` (Package Directory):** Defines available job filters to guide the LLM during NLU for text-based queries.
-   **Port:** Runs on port `3000` by default (configurable via `PORT` env var).

## Running & Testing

This server requires the **MCP Host Server (`@jobstash/mcp-server`)** to be running separately for the `/api/v1/search-url` and `/api/v1/search-jobs` endpoints to function correctly.

Refer to the root [README.md](../../README.md) for instructions on setup, build, running this gateway server, and testing its endpoints.
