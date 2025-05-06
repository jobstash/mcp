# Feature Plan: CV Parsing

## 1. Goal

-   **Gateway API:** Upload CV file -> Get `{ jobstashUrl, userProfile }`.
-   **MCP Tool:** Process structured CV *job data* -> Get `{ jobstashUrl }`.

## 2. Architecture

-   **Gateway (`@jobstash/mcp-gateway`):
    -   Handles `POST /api/v1/cv/parse` (multipart/form-data).
    -   Parses CV file (PDF/DOCX -> Text) via OpenAI API.
    -   Performs NLU (Text -> `CvJobData` + `UserProfile`) using internal `NluService`.
    -   Calls `process_cv_job_data` MCP tool with `CvJobData`.
    -   Receives `jobstashUrl` from MCP tool.
    -   Assembles and returns final `{ jobstashUrl, userProfile }` response.
-   **MCP Server (`@jobstash/mcp-server`):
    -   Defines `cv_job_data_schema` (structure of job-related info from CV).
    -   Adds new tool `process_cv_job_data`.
        -   Input: Object matching `cv_job_data_schema`.
        -   Action: Maps structured `CvJobData` -> `SearchJobsInputArgs`, calls URL generation logic.
        -   Output: `{ jobstashUrl }`.
    -   Keeps existing `get_search_url` tool.

## 3. Key Implementation Steps

1.  **MCP Server:** Define `cv_job_data_schema`. Implement `process_cv_job_data` tool (handler, mapping). Register tool. Create dedicated test script (`test-process-cv.ts`) and run it.
2.  **Gateway:** Define `UserProfile` DTO. Update `NluService` for dual extraction. Create `cv-parsing` module (controller, service) to handle file upload, parsing, NLU, MCP call, and response. Update `app.module.ts`.
3.  **Testing:** Unit tests for mapping, NLU, service orchestration. E2E tests for API with mocks.

## 4. Challenges & Considerations

-   Defining the optimal `cv_job_data_schema`.
-   Reliability/cost of PDF->Text parsing.
-   Reliability/cost of NLU for dual extraction.
-   Complexity of mapping `CvJobData` -> `SearchJobsInputArgs`.

---

## File-by-File Implementation Plan

**Phase 1: MCP Server (`@jobstash/mcp-server`)**

1.  **`packages/mcp-server/src/schemas.ts` (Modify):**
    *   Define `cv_job_data_schema` (Zod schema) for structured job data extracted from CV (e.g., skills, roles, locations, seniorityKeywords).
    *   Define `CvJobData` type (`z.infer`).
2.  **`packages/mcp-server/src/tools/process-cv-job-data.ts` (Create):**
    *   Create handler `createProcessCvJobDataHandler(jobstashBaseUrl)` taking `args: CvJobData`.
    *   Implement logic to map `CvJobData` fields to `SearchJobsInputArgs` fields.
    *   Reuse/call internal URL generation logic (same as `get_search_url`) with mapped args.
    *   Return standard MCP response: `{ content: [{ type: "text", text: JSON.stringify({ jobstashUrl: ... }) }] }`.
    *   Export `getProcessCvJobDataTool`: name=`process_cv_job_data`, description, inputSchema=`cv_job_data_schema.shape`, handler.
3.  **`packages/mcp-server/src/server.ts` (Modify):**
    *   Import `getProcessCvJobDataTool`.
    *   Register the new tool in `McpManager`.
4.  **`packages/mcp-server/src/test-process-cv.ts` (Create):**
    *   Create a standalone test client script (similar to `test-client.ts` structure).
    *   Define mock `CvJobData` object(s).
    *   Connect to the MCP server.
    *   Call the `process_cv_job_data` tool with mock data.
    *   Print the response and verify its structure.
5.  **`packages/mcp-server/package.json` (Modify):**
    *   Add a new script (e.g., `"test:cv": "npm run build && node ./dist/test-process-cv.js"`) to run the dedicated test.

**Phase 2: Gateway (`@jobstash/mcp-gateway`)**

6.  **`packages/mcp-gateway/src/common/dtos/user-profile.dto.ts` (Create):**
    *   Define the `UserProfile` interface/class according to the required structure.
7.  **`packages/mcp-gateway/src/nlu/nlu.service.ts` (Modify):**
    *   Create/adapt method `extractCvData(cvText: string): Promise<{ cvJobData: CvJobData, userProfile: UserProfile }>` (import `CvJobData` type definition or mirror it).
    *   Develop/adapt OpenAI system prompt for dual extraction targeting `CvJobData` and `UserProfile` schemas.
    *   Implement OpenAI call and response parsing.
8.  **`packages/mcp-gateway/src/cv-parsing/cv-parsing.module.ts` (Create):**
    *   Create basic NestJS module. Import `NluModule`, `McpClientModule`, potentially `MulterModule`. Declare `CvParsingController`, `CvParsingService`.
9.  **`packages/mcp-gateway/src/cv-parsing/cv-parsing.service.ts` (Create):**
    *   Inject `NluService`, `McpClientService`, `Logger`.
    *   Implement `handleCvUpload(file: Express.Multer.File)`:
        *   Calls internal `parseCvFile(file.buffer)` -> `cvText`.
        *   Calls `nluService.extractCvData(cvText)` -> `{ cvJobData, userProfile }`.
        *   Calls `mcpClientService.callTool({ name: 'process_cv_job_data', arguments: cvJobData })`.
        *   Parses MCP response -> `jobstashUrl`.
        *   Returns `{ jobstashUrl, userProfile }`.
    *   Implement `parseCvFile(buffer: Buffer): Promise<string>` (Placeholder initially, needs OpenAI API integration for parsing PDF/DOCX).
10. **`packages/mcp-gateway/src/cv-parsing/cv-parsing.controller.ts` (Create):**
    *   Create basic NestJS controller for `POST /api/v1/cv/parse`.
    *   Inject `CvParsingService`.
    *   Implement endpoint handler using `@UploadedFile()` and `@UseInterceptors(FileInterceptor('cv', { /* options like limits, storage */ }))` to receive the file.
    *   Add file validation (size, type).
    *   Call service method and return result.
11. **`packages/mcp-gateway/src/app.module.ts` (Modify):**
    *   Import and add `CvParsingModule` to the `imports` array.

**Phase 3: Testing & Refinement**

12. **Unit Tests:** Add tests for mapping logic (`process-cv-job-data.ts`), NLU dual extraction (`nlu.service.spec.ts`), Gateway service orchestration (`cv-parsing.service.spec.ts`), and Gateway controller (`cv-parsing.controller.spec.ts`).
13. **E2E Test:** Create `cv-parsing.e2e-spec.ts` for the Gateway endpoint, mocking parsing, NLU, and MCP calls.
14. **Refine:** Implement actual PDF/DOCX parsing in `CvParsingService`. Refine NLU prompts. Refine mapping logic. 