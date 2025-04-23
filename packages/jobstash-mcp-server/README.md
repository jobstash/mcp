# JobStash MCP Server (`jobstash-mcp-server`)

This package contains the NestJS server responsible for providing HTTP API endpoints for the JobStash Model Context Protocol (MCP) integration. It utilizes the `@jobstash/mcp` package internally to handle the core logic of processing natural language job queries.

## Purpose

The primary goal of this server is to expose the functionality of the `@jobstash/mcp` package via a web API, allowing clients to:

1.  Convert natural language job search queries into structured parameters suitable for the JobStash API.
2.  Construct a JobStash search URL based on a natural language query.

## API Endpoints

The server exposes the following v1 endpoints:

### 1. Extract Structured Parameters

-   **Endpoint:** `POST /api/v1/structured-data/extract-params`
-   **Description:** Takes a natural language query and returns a JSON object containing structured parameters (e.g., roles, locations, skills) extracted using the MCP logic, guided by the `filters.json` configuration.
-   **Request Body:**
    ```json
    {
      "query": "Your natural language job query"
    }
    ```
-   **Example Success Response (200 OK):**
    ```json
    {
      "tags": "Software engineer",
      "locations": "London"
    }
    ```

### 2. Construct JobStash URL

-   **Endpoint:** `POST /api/v1/filtered-jobs-url`
-   **Description:** Takes a natural language query, extracts structured parameters using MCP, and constructs a JobStash search URL (`https://jobstash.xyz/jobs?...`) based on those parameters.
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

## Configuration

-   **`.env` (Root Directory):** This server relies on the `@jobstash/mcp` package, which requires the `OPENAI_API_KEY` to be set in the root `.env` file.
-   **`filters.json` (Package Directory):** This file defines the available job filters (e.g., roles, skills, experience levels) and their mapping to JobStash API parameters. The server reads this file on startup to configure the MCP parameter extraction logic.
-   **Port:** The server runs on port `3000` by default. This can be configured via the `PORT` environment variable if needed.

## Running & Testing

While you can run commands like `yarn start:dev` or `yarn test` directly within this package's directory (`packages/jobstash-mcp-server`), the recommended workflow is to use the commands from the **monorepo root directory** as described in the main [README.md](../../README.md). This ensures all dependencies are correctly handled and packages are built in the right order.

Refer to the root [README.md](../../README.md) for instructions on:
-   Installation (`yarn install`)
-   Building (`yarn build`)
-   Running the server (`yarn start:dev` from within this directory, as instructed in the root README)
-   Testing the server endpoints using the provided scripts (`scripts/test-*.mjs`).
