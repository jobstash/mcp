# JobStash MCP Package

This package implements the Model Context Protocol (MCP) for JobStash. It provides a server that can process natural language job search queries and convert them into structured parameters for the JobStash API.

## Features

- Process natural language job search queries
- Extract structured parameters (roles, skills, locations, etc.)
- Configurable OpenAI LLM integration
- MCP standard compatibility

## Installation

```bash
npm install @jobstash/mcp
# or
yarn add @jobstash/mcp
```

## Usage

### Basic Usage

```typescript
import { JobStashMcpServer } from '@jobstash/mcp';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server
const server = new JobStashMcpServer({
  name: 'my-jobstash-mcp-server',
  version: '1.0.0',
  openaiApiKey: process.env.OPENAI_API_KEY
});

// Create transport
const transport = new StdioServerTransport();

// Connect server to transport
await server.connect(transport);
```

### With HTTP Transport

```typescript
import express from 'express';
import { JobStashMcpServer } from '@jobstash/mcp';
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const app = express();
const transports = {};

// Create server
const server = new JobStashMcpServer({
  name: 'my-jobstash-mcp-server',
  version: '1.0.0',
  openaiApiKey: process.env.OPENAI_API_KEY
});

app.get("/sse", async (_, res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(3000);
```

## Testing

### Using the demo script

From the root of the monorepo, you can use the demo.sh script to quickly test the MCP functionality:

```bash
# Create a .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_api_key_here" > .env

# Run the demo script with a job search query
./demo.sh "Looking for a senior React developer in Berlin"
```

### Run unit tests

```bash
# Run all tests
yarn test

# Run with coverage
yarn test --coverage
```

## Development

```bash
# Install dependencies
yarn install

# Build
yarn build

# Run tests
yarn test

# Start in dev mode
yarn dev
```

## License

MIT 