# JobStash MCP Integration

This monorepo contains the JobStash integration with the Model Context Protocol (MCP). It allows users to search for crypto jobs using natural language queries.

## Project Structure

```
/
├── packages/               # Modular packages
│   ├── mcp/                # MCP implementation as a standalone module
│   └── jobstash-mcp-server/ # NestJS server implementing MCP endpoints
├── scripts/                # Utility and testing scripts
├── .env                    # Environment variables (needs OpenAI key)
└── package.json            # Root package.json for workspace
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- OpenAI API key (set in `.env` file)

### Installation

```bash
# Clone the repository
git clone https://github.com/jobstash/mcp.git
cd mcp

# Create .env file from example and add your key
cp .env.example .env
# Add your OPENAI_API_KEY to the .env file

# Install dependencies for all packages
yarn install
```

### Build

```bash
# Build all packages (@jobstash/mcp and jobstash-mcp-server)
yarn build
```

### Running the MCP Client Demo

This demo uses the `@jobstash/mcp` package directly to process a query.

```bash
# Ensure .env file exists and OPENAI_API_KEY is set
# Run the demo script with a job search query
./demo.sh "Looking for a senior Solidity developer role in a remote position"
```

### Running the MCP Server

This starts the NestJS server which provides API endpoints.

```bash
# Run the server in development mode (watches for changes)
# Make sure you are in the root directory
cd packages/jobstash-mcp-server
yarn start:dev
# Server will run on http://localhost:3000 by default
```

### Testing the Server Endpoints

These scripts send requests to the running MCP server. Ensure the server is running before executing these. Run these from the **root** directory.

```bash
# Test structured data extraction endpoint (/api/v1/structured-data/extract-params)
node scripts/test-structured-data.mjs "Software engineer in London"

# Test JobStash URL construction endpoint (/api/v1/query)
node scripts/test-url-construction.mjs "Remote solidity developer"
```


## Project Status

This project is in active development. Here's what's implemented so far:

- ✅ MCP package (`@jobstash/mcp`) with OpenAI integration
- ✅ NestJS Server (`jobstash-mcp-server`) implementing MCP logic
  - ✅ Endpoint for natural language to structured job parameters conversion
  - ✅ Endpoint for constructing JobStash search URLs from queries
- ✅ Demo script for `@jobstash/mcp` package
- ✅ Test scripts for server endpoints
- ✅ Basic unit tests (some require environment setup)

Coming soon:
- Full integration with JobStash API for actual job fetching
- Web chat interface
- CV parsing functionality

## Development

See the [PROJECT_PLAN.md](PROJECT_PLAN.md) for the roadmap and details on planned features.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for details on the system design.

## License

MIT 