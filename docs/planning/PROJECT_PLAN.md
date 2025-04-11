# JobStash MCP Integration Project Plan

## Project Overview
Create a Model Context Protocol (MCP) server to interface with JobStash API, allowing users to find relevant crypto job postings through natural language queries and CV parsing.

## Tech Stack
- TypeScript
- Node.js
- OpenAI models
- JobStash API

## Architecture Approach
We'll use a modular architecture with separate packages:
- MCP package: Implements the Model Context Protocol (reusable)
- Server application: Provides the JobStash-specific implementation

## Milestones & Tasks

### 1. Project Setup
- [x] Initialize monorepo structure
- [x] Set up package workspaces
- [x] Configure TypeScript for both packages
- [x] Set up environment configuration
- [x] Configure linting and formatting
- [x] Set up testing framework
- [ ] Document API requirements from JobStash middleware
- [x] Create project documentation

### 2. Milestone 1: MCP Package Development
- [x] Research Model Context Protocol specification
- [x] Define MCP interfaces and types
- [x] Implement MCP client
  - [x] Create base client structure
  - [x] Implement context handling
  - [x] Develop prompt formatting
  - [x] Add OpenAI integration
- [x] Build protocol handlers
  - [x] Text query handler
  - [ ] File processing handler
- [x] Create utility functions
- [x] Implement error handling
- [x] Write tests for MCP package
- [x] Create documentation for MCP package

### 3. Milestone 2: Server Core & UI-less Prototype
- [x] Setup NestJS Server (`jobstash-mcp-server`)
- [x] Refactor MCP package (`@jobstash/mcp`)
  - [x] Rename `JobStashMcpServer` to `McpManager`.
  - [x] Make `McpManager` configurable via server-provided filter definitions (derived from `filters.json`).
  - [x] Implement `getStructuredData` method in `McpManager` using configured filter definitions and env API key.
- [x] Integrate `McpManager` into Server (`jobstash-mcp-server`)
  - [x] Add `@jobstash/mcp` dependency.
  - [x] Create `McpManagerProviderService` to read/process `filters.json` and instantiate `McpManager`.
  - [x] Configure necessary modules (`McpManagerProviderModule`).
- [x] Implement Server Endpoints
  - [x] Create `QueryController` and `POST /api/v1/query` endpoint.
  - [x] Create `StructuredDataController` and `POST /api/v1/structured-data/extract-params` for testing extraction.
- [ ] Implement Core Logic in `QueryController`
  - [x] Use `McpManagerProviderService` to call `McpManager.getStructuredData`.
- [ ] Implement `mapToJobstashParams` (Mapper: Structured Data -> JobStash API Params).
- [ ] Restore/Fix `JobstashService` and `JobstashModule` for JobStash API calls.
- [ ] Implement `formatJobstashResponse` (Formatter: JobStash Response -> Client Response).
- [ ] Implement URL Construction Logic in `QueryController`
  - [x] Use `McpManagerProviderService` to call `McpManager.getStructuredData`.
  - [ ] Implement logic to map structured data to JobStash website URL query parameters.
  - [ ] Return the constructed JobStash website URL.
- [ ] Testing
  - [x] Test parameter extraction via `/api/v1/structured-data/extract-params` using script/curl.
  - [ ] Implement unit/integration tests for URL construction.
  - [ ] Test end-to-end flow via `/api/v1/query`.
- [ ] Documentation / Optimization
  - [ ] Document findings, optimize prompts/mapping.

### 4. Milestone 3: Simple Text Chat Interface
- [ ] Design simple chat UI for website embedding
- [ ] Create chat API endpoints
- [ ] Implement session management
- [ ] Develop job results API
- [ ] Create redirection logic from chat to job results
- [ ] Add pagination for job results
- [ ] Implement basic filtering options
- [ ] Create documentation for website integration
- [ ] Test user flows
- [ ] Optimize response times and UX

### 5. Milestone 4: CV Parsing Capability
- [ ] Research CV parsing strategies with LLMs
- [ ] Implement file upload API
- [ ] Create CV parsing service using OpenAI
- [ ] Extract key skills, experience, and job preferences
- [ ] Develop matching algorithm between CV data and job requirements
- [ ] Create job recommendation ranking system
- [ ] Implement personalized job suggestions
- [ ] Add storage for user preferences (optional)
- [ ] Test with various CV formats
- [ ] Optimize parsing accuracy

### 6. Integration & Deployment
- [ ] Set up CI/CD pipeline
- [ ] Create container configuration
- [ ] Write deployment documentation
- [ ] Implement monitoring and alerting
- [ ] Create backup and recovery plan
- [ ] Deploy to staging environment
- [ ] Perform integration testing
- [ ] Deploy to production
- [ ] Create user documentation

### 7. Testing & Quality Assurance
- [x] Develop unit tests for MCP package
- [ ] Develop unit tests for server application
- [ ] Create integration tests
- [ ] Perform load testing
- [ ] Security testing
- [ ] User acceptance testing
- [ ] Bug fixing and refinement

## Timeline Estimates
- Project Setup: 1 week
- Milestone 1 (MCP Package): 2 weeks
- Milestone 2 (Server Core & UI-less Prototype): 2 weeks
- Milestone 3 (Simple Text Chat): 2 weeks
- Milestone 4 (CV Parsing): 3 weeks
- Integration & Deployment: 1-2 weeks
- Testing & QA: Ongoing

## Resources Required
- Access to JobStash API documentation and credentials
- OpenAI API keys
- Development and staging environments
- Testing data (sample CVs, job search queries)

## Risks & Mitigation
- **API Changes**: Maintain close communication with JobStash team
- **LLM Costs**: Implement caching and optimization strategies
- **Data Privacy**: Ensure CV data is handled according to privacy regulations
- **Performance Issues**: Monitor and optimize API calls and LLM usage 