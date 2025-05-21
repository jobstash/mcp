# Plan: Dynamic Filter Configuration Refactoring (Runtime Fetching)

**Objective:** Refactor the filter configuration mechanism to dynamically incorporate options and relevant examples from the live `https://middleware.jobstash.xyz/jobs/filters` endpoint **at runtime**. This will improve the accuracy of `llmDescription` in `filter-config.ts`, reduce manual maintenance, and ensure the LLM receives up-to-date guidance for constructing search queries.

---

## Phase 1: Runtime Data Fetching and Configuration Initialization

**File:** `packages/mcp-server/src/config/filter-config-loader.ts` (New or Heavily Modified Module)
*   *Alternatively, this logic could be integrated into a service responsible for providing application configuration.*

**Changes:**

1.  **Create a module/service for fetching and processing filter options:**
    *   This module will be responsible for making an HTTP GET request to `https://middleware.jobstash.xyz/jobs/filters` when the `mcp-server` initializes or when the configuration is first accessed.
    *   **HTTP Client:** Use a suitable HTTP client library (e.g., `axios`, `node-fetch`, or built-in `http/https` module).
    *   **Error Handling:** Implement robust error handling for the HTTP request (e.g., timeouts, network errors, non-2xx responses). Log errors clearly.
    *   **Data Transformation:**
        *   Define an interface/type for the expected JSON response from the endpoint.
        *   Transform the fetched data into a structured format suitable for populating `llmDescription` parts (e.g., extracting `options` for `MULTI_SELECT`/`SINGLE_SELECT`, min/max for `RANGE`).
        *   Handle cases where specific filters might be missing from the endpoint response.
    *   **Caching Mechanism:**
        *   Implement an in-memory cache for the fetched and transformed filter options.
        *   Define a cache duration (e.g., 1 hour, 6 hours) to avoid excessive calls to the middleware endpoint. The cache should be refreshed periodically or on demand.
    *   **Fallback Mechanism:**
        *   If the initial fetch fails or the endpoint is unavailable, the system should gracefully fall back to using pre-defined static `llmDescription` values (the current ones or a minimal set) to ensure the server can still function. Log a warning in this scenario.
        *   Consider storing a "last known good" version of fetched options locally (e.g., in a temporary file, not version controlled) that can be used if the live endpoint is down at startup, and then attempt to refresh later.

**File:** `packages/mcp-server/src/config/filter-config.ts`

**Changes:**

1.  **Dynamic Initialization of `filterConfigurations`:**
    *   The `filterConfigurations` object will now be populated (at least its `llmDescription` parts) using the data fetched by the `filter-config-loader.ts` (or equivalent service).
    *   This might involve making `filterConfigurations` a function that returns a promise, or having an initialization function that populates it.
    *   **Asynchronous Nature:** Accessing the fully initialized `filterConfigurations` might become an asynchronous operation throughout the application where it's used. This needs to be handled carefully (e.g., ensuring config is loaded before dependent services start or by making dependent functions async).

2.  **Constructing `llmDescription`:**
    *   The logic for creating hybrid `llmDescription` strings (static part + dynamic part) will reside here, using the data provided by the loader.
    *   **Example for `seniority` (using data from the loader):**
        ```typescript
        // Assuming getDynamicOptions('seniority') returns { options: ["1", "2", "3", "4", "5"] } or undefined
        const seniorityData = getDynamicOptions('seniority');
        const seniorityOptionsExample = seniorityData?.options?.slice(0, 3).join("', '") || "1', '2', '3"; // Fallback example
        // ...
        seniority: {
            schemaKey: 'seniority',
            zodSchema: z.array(z.string()).optional(),
            llmDescription: `(string[], optional) List of experience levels (typically 1-5). Use numeric string values. Example valid values from live config: ['${seniorityOptionsExample}'].`,
            apiParamKey: 'seniority',
            // ...
        },
        ```
    *   Similar logic for `tags`, `salary`, `locations`, `commitments`, `classifications`, `publicationDate`, etc., with appropriate fallbacks if dynamic data for a specific filter is unavailable.

3.  **Static Definitions:**
    *   `schemaKey`, `zodSchema`, `apiParamKey`, and `apiValueFormatter` for each filter will remain statically defined.
    *   The core static part of `llmDescription` (explaining purpose and type) will also remain.

**File:** `packages/mcp-server/src/main.ts` (or server entry point)

**Changes:**

1.  Ensure that the dynamic filter configuration loading process is initiated during server startup.
2.  If the configuration loading is asynchronous, ensure that the server does not start accepting requests or that dependent services are not initialized until the essential configuration (even if it's fallback) is ready.

---

## Phase 2: Testing and Documentation

1.  **Testing:**
    *   **Unit Tests:** For the `filter-config-loader.ts` to test fetching, transformation, caching, and error handling logic (mocking the HTTP endpoint).
    *   **Integration Tests:** Verify that `filter-config.ts` correctly uses the loaded data.
    *   **Functional Testing:**
        *   Test server startup with the live middleware endpoint available and unavailable (to check fallback mechanisms).
        *   Test cache refresh logic.
        *   Send queries to `mcp-server` to ensure the LLM correctly interprets the dynamically augmented `llmDescription` values.
2.  **Documentation (`README.md` or similar in `packages/mcp-server`):**
    *   Document the runtime fetching mechanism for filter options.
    *   Explain the role of `filter-config-loader.ts` (or equivalent).
    *   Detail the caching strategy and duration.
    *   Describe the fallback behavior if the live endpoint is down.
    *   Mention the dependency on the `https://middleware.jobstash.xyz/jobs/filters` endpoint at runtime.

---

**Rollback Plan:**

*   Revert changes in `packages/mcp-server/src/config/filter-config.ts` to remove dynamic loading and revert to fully static `llmDescription` values.
*   Remove the `packages/mcp-server/src/config/filter-config-loader.ts` module (or revert the service that handles this).
*   Adjust server startup logic in `main.ts` if changes were made for async initialization.

--- 