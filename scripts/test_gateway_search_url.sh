#!/bin/bash

# Configuration
GATEWAY_ENDPOINT="http://localhost:3000/api/v1/search-url"

# Test Queries (Natural Language)
queries=(
    "Senior remote software engineer jobs"
    "Find React, NodeJS, and TypeScript positions with a salary between 100k and 150k per year"
    "Show me engineering roles with a token opportunity"
    "Are there any contract jobs available in New York City?"
    "Search for Solidity and DeFi roles from companies backed by Andreessen Horowitz or Paradigm"
    "I'm looking for a full-time product manager role, mid to senior level, in Berlin or remote, with a company funded by Coinbase Ventures. Required skills are Full-stack development and API design."
    "List all jobs paying at least \$80,000 annually"
    "Find positions that explicitly do not offer stock options or equity"
    "python and django developer opportunities in london, uk"
    "Lead JavaScript or Web3 developer roles, worldwide or remote, with salary up to 200k, must include equity"
)

echo "Starting JobStash URL Generation Test..."
echo "Gateway Endpoint: ${GATEWAY_ENDPOINT}"

# Execution Loop
for i in "${!queries[@]}"; do
    query="${queries[$i]}"
    echo # Blank line for separation before new format
    echo "Query $((i+1)): ${query}"

    json_payload=$(printf '{ "query": "%s" }' "${query}")

    response_json=$(curl -s -X POST "${GATEWAY_ENDPOINT}" \
                         -H "Content-Type: application/json" \
                         -d "${json_payload}")

    if [ -z "${response_json}" ]; then
        echo ">>> ERROR: No response from server"
    else
        if command -v jq &> /dev/null; then
            jobstash_url=$(echo "${response_json}" | jq -r '.jobstashUrl')
            if [ "${jobstash_url}" == "null" ] || [ -z "${jobstash_url}" ]; then
                error_message=$(echo "${response_json}" | jq -r '.error // .message // "ERROR: Failed to extract URL or URL empty"')
                echo ">>> ${error_message}"
            else
                echo ">>> ${jobstash_url}"
            fi
        else
            echo ">>> ERROR: jq is not installed. Cannot parse response."
        fi
    fi
    echo "_____"
done

echo "Test completed." 