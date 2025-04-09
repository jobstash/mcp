#!/bin/bash

# Load environment variables from .env if it exists
if [ -f ".env" ]; then
  echo "Loading environment variables from .env file..."
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check if OPENAI_API_KEY is set
if [ -z "$OPENAI_API_KEY" ]; then
  echo "Error: OPENAI_API_KEY environment variable is not set."
  echo "Please set it with: export OPENAI_API_KEY=your_api_key_here"
  exit 1
fi

# Check if an argument was provided
if [ -z "$1" ]; then
  echo "Error: Please provide a job search query."
  echo "Usage: ./demo.sh \"your job search query\""
  exit 1
fi

# Make sure the package is built
echo "Building the MCP package..."
yarn workspace @jobstash/mcp build

# Run the test client with the provided query
echo -e "\nRunning MCP demo with query: \"$1\"\n"
OPENAI_API_KEY="$OPENAI_API_KEY" node packages/mcp/dist/test-client.js "$1" 