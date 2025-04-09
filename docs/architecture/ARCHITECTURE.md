# JobStash MCP Architecture

## Overview

This document outlines the architecture for the JobStash MCP (Model Context Protocol) integration. The project follows a modular approach with separate packages for core functionality.

## Project Structure

We're adopting a modular approach similar to Flutter/Dart packages:

```
/
├── packages/               # Modular packages (libraries)
│   └── mcp/                # MCP implementation as a standalone module
│       ├── src/
│       │   ├── client/     # MCP client implementation
│       │   ├── handlers/   # Protocol handlers
│       │   ├── types/      # TypeScript type definitions
│       │   ├── utils/      # Utility functions
│       │   └── index.ts    # Package entry point
│       ├── tests/          # MCP package tests
│       └── package.json    # MCP package dependencies
│
├── server/                 # Main application server
│   ├── src/
│   │   ├── api/            # API endpoints
│   │   │   ├── controllers/# Request handlers
│   │   │   ├── middlewares/# Request processing 
│   │   │   ├── routes/     # API route definitions
│   │   │   └── validators/ # Input validation
│   │   ├── services/       # Business logic
│   │   │   ├── jobstash/   # JobStash API integration
│   │   │   └── openai/     # OpenAI API integration
│   │   ├── config/         # App configuration
│   │   ├── models/         # Data models
│   │   ├── utils/          # Helper utilities
│   │   └── app.ts          # Application entry point
│   ├── tests/              # Server tests
│   └── package.json        # Server dependencies
│
└── package.json            # Root package.json for workspace
```

## Architecture Layers

### 1. MCP Package

Responsible for implementing the Model Context Protocol, agnostic of the specific JobStash implementation.

#### Components:
- **Client**: Handles MCP protocol communication
- **Handlers**: Processes different MCP message types
- **Types**: Type definitions for MCP protocol
- **Utils**: Helper functions for MCP operations

### 2. Server Application

The main server that uses the MCP package to provide JobStash functionality.

#### Components:
- **API Layer**: HTTP endpoints and request handling
- **Service Layer**: Business logic and external API integrations
- **Configuration**: Environment and app settings
- **Models**: Data structures for business objects

## Workflow

1. **User Request Flow**:
   ```
   User Request → Server API → JobStash Service → MCP Package → OpenAI → Response
   ```

2. **CV Processing Flow**:
   ```
   File Upload → Server API → CV Parser Service → OpenAI → JobStash Service → Response
   ```

## Module Responsibilities

### MCP Package
- Implement Model Context Protocol
- Handle prompt formatting
- Manage context windows
- Communicate with LLM APIs

### Server
- HTTP request handling
- Authentication
- JobStash API integration
- Business logic for job matching
- CV parsing and processing
- Response formatting for clients

## Key Interfaces

### MCP Client Interface
```typescript
interface MCPClient {
  processQuery(query: string, context?: any): Promise<MCPResponse>;
  handleFile(file: Buffer, fileType: string): Promise<MCPResponse>;
  addContext(context: any): void;
}
```

### JobStash Service Interface
```typescript
interface JobStashService {
  searchJobs(params: JobSearchParams): Promise<JobListing[]>;
  getJobDetails(jobId: string): Promise<JobDetails>;
  getFilterOptions(): Promise<FilterOptions>;
}
```

## Development Approach

1. **Independent Package Development**:
   - Develop and test the MCP package independently
   - Define clear interfaces between components
   - Use dependency injection for service composition

2. **Integration**:
   - Server implements MCP package
   - Services handle business-specific logic
   - Controllers map HTTP to business operations

3. **Testing Strategy**:
   - Unit tests for each component
   - Integration tests for service interactions
   - End-to-end tests for complete flows

## Deployment Architecture

```
Client Browser → Server Application → JobStash API
                                    → OpenAI API
```

## Future Extensibility

The modular architecture allows for:
- Replacing the MCP implementation without affecting the server
- Adding new services without changing existing ones
- Supporting multiple LLM providers
- Integrating with different job platforms beyond JobStash 