# JobStash MCP Integration

This monorepo contains the JobStash integration with the Model Context Protocol (MCP). It allows users to search for crypto jobs using natural language queries.

## Project Structure

```
/
├── packages/               # Modular packages (libraries)
│   └── mcp/                # MCP implementation as a standalone module
├── server/                 # (Coming soon) Main application server
└── package.json            # Root package.json for workspace
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/jobstash/mcp.git
cd mcp

# Install dependencies
yarn install
```

### Build

```bash
# Build all packages
yarn build
```

### Running the MCP Client Demo

```bash
# Set your OpenAI API key
export OPENAI_API_KEY=your_api_key_here

# Run the test client with a job search query
node packages/mcp/dist/test-client.js "Looking for a senior Solidity developer role in a remote position"
```

## Project Status

This project is in active development. Here's what's implemented so far:

- ✅ MCP package with OpenAI integration
- ✅ Natural language to structured job parameters conversion
- ✅ Testing utilities

Coming soon:
- Server integration with JobStash API
- Web chat interface
- CV parsing functionality

## Development

See the [PROJECT_PLAN.md](PROJECT_PLAN.md) for the roadmap and details on planned features.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for details on the system design.

## License

ISC 