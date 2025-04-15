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

### 3. Milestone 2: Server Core & URL Construction
- [x] Setup NestJS Server (`jobstash-mcp-server`)
- [x] Refactor MCP package (`@jobstash/mcp`)
  - [x] Rename `JobStashMcpServer` to `McpManager`.
  - [x] Configure `McpManager` to use relevant filter list defined by server.
  - [x] Implement `getStructuredData` method in `McpManager` using configured filter list and env API key.
- [x] Integrate `McpManager` into Server (`jobstash-mcp-server`)
  - [x] Add `@jobstash/mcp` dependency.
  - [x] Create `McpManagerProviderService` to define relevant filter list and instantiate `McpManager`.
  - [x] Configure necessary modules (`McpManagerProviderModule`).
- [x] Implement Server Endpoints
  - [x] Create `QueryController` and `POST /api/v1/query` endpoint.
  - [x] Create `StructuredDataController` and `POST /api/v1/structured-data/extract-params` for testing extraction.
- [x] Implement URL Construction Logic in `QueryController`
  - [x] Use `McpManagerProviderService` to call `McpManager.getStructuredData`.
  - [x] Implement logic (`buildUrlQueryString`) to map structured data to JobStash website URL query parameters.
  - [x] Return the constructed JobStash website URL (`https://jobstash.xyz/jobs?...`).
- [ ] Refinement & Testing
  - [x] Test parameter extraction via `/api/v1/structured-data/extract-params`.
  - [x] Test end-to-end URL construction via `/api/v1/query` using script.
  - [ ] Improve LLM parameter extraction consistency (e.g., ensure "Senior" consistently maps to `seniority`, now it's flaky, some times is returned as job_title).
  - [ ] Consider dynamic filter configuration using `filters.json` structure (instead of hardcoded list in provider).
  - [ ] Implement unit/integration tests for `QueryController` / URL construction.
  - [ ] Enhance error handling.
  - [ ] Perform security testing for the endpoints.
- [ ] Documentation & Handoff
  - [ ] Add/Update README with setup, env vars, usage instructions.
  - [ ] Await decisions on UI integration and deployment strategy.

### 3. Milestone 3: CV Parsing Capability
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
- [ ] Write unit and integration tests for CV parsing capabilities

### 4. Milestone 4: Integration & Deployment
- [ ] Integrate server endpoint (/api/v1/query) into JobStash website search bar
- [ ] Set up CI/CD pipeline
- [ ] Create container configuration
- [ ] Write deployment documentation
- [ ] Implement monitoring and alerting
- [ ] Create backup and recovery plan
- [ ] Deploy to staging environment
- [ ] Perform integration testing
- [ ] Perform load testing
- [ ] User acceptance testing (Website integration)
- [ ] Deploy to production
- [ ] Create user documentation
- [ ] Bug fixing and refinement

### 5. Milestone 5: AI Agent Integration
- [ ] Create OpenAPI specification for the server endpoints
- [ ] Implement MCP manifest.json following plugin standards
- [ ] Create discovery endpoint (/.well-known/ai-plugin.json)
- [ ] Implement authentication for external services
- [ ] Add rate limiting and usage tracking
- [ ] Create comprehensive documentation for AI integration
  - [ ] Add examples for different AI platforms
  - [ ] Document authentication flow
  - [ ] Include usage guidelines
- [ ] Test integration with various AI agents
- [ ] Implement versioning strategy for API endpoints
- [ ] Security testing for external access

## Timeline Estimates
- Project Setup: 1 week
- Milestone 1 (MCP Package): 2 weeks
- Milestone 2 (Server Core & URL Construction): 2 weeks
- Milestone 3 (CV Parsing): 3 weeks
- Milestone 4 (Integration & Deployment): 1-2 weeks
- Milestone 5 (AI Agent Integration): 1-2 weeks

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