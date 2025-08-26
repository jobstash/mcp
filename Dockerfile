# ---------- build (toolchain + Yarn v1 pinned) ----------
FROM node:22-alpine3.22 AS build
WORKDIR /usr/src/app

# Toolchain for native deps (bufferutil, etc.)
RUN apk add --no-cache python3 make g++ git libc6-compat wget curl
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3

# Use Corepack, but PIN Yarn Classic explicitly to avoid Yarn 4
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# 1) Install (with dev) to build
# Copy only manifests first to leverage Docker layer caching
COPY package.json yarn.lock ./
# If you have workspace-level package.json files, copy them too for better caching
COPY packages/mcp-server/package.json packages/mcp-server/package.json
COPY packages/mcp-gateway/package.json packages/mcp-gateway/package.json

RUN yarn install --frozen-lockfile

# 2) Build
# Now bring in the full source
COPY . .
RUN yarn build

# 3) Reinstall prod-only deps (still in build stage with toolchain)
RUN rm -rf node_modules && yarn install --frozen-lockfile --production

# ---------- runtime (no compilers, no installs, no yarn) ----------
FROM node:22-alpine3.22 AS runtime
WORKDIR /usr/src/app

# Add tini for proper signal handling
RUN apk add --no-cache tini

ENV NODE_ENV=production
# Ports (can be overridden at runtime)
ENV GATEWAY_PORT=3000
ENV MCP_SERVER_PORT=3333

# The gateway will need to know where the MCP server is.
# By default we point it to localhost inside the same container.
# If your gateway reads a different env var, map this accordingly.
ENV MCP_SERVER_URL=http://127.0.0.1:3333

# If the gateway uses OpenAI, pass OPENAI_API_KEY at runtime: -e OPENAI_API_KEY=sk-...
# ENV OPENAI_API_KEY= # <- don't bake secrets

# Only copy what you need to run
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copy package manifests (kept for module resolution / metadata)
COPY --from=build /usr/src/app/packages/mcp-server/package.json ./packages/mcp-server/package.json
COPY --from=build /usr/src/app/packages/mcp-gateway/package.json ./packages/mcp-gateway/package.json

# Copy built artifacts
COPY --from=build /usr/src/app/packages/mcp-server/dist ./packages/mcp-server/dist
COPY --from=build /usr/src/app/packages/mcp-gateway/dist ./packages/mcp-gateway/dist

# Minimal entrypoint that runs both servers and surfaces logs.
# - Starts MCP Server first, then Gateway.
# - If either process exits, container exits non-zero.
RUN printf '%s\n' \
  '#!/bin/sh' \
  'set -e' \
  '' \
  'echo "[entrypoint] Starting MCP Server on ${MCP_SERVER_PORT}..."' \
  'node packages/mcp-server/dist/main.js --port="${MCP_SERVER_PORT}" & ' \
  'MCP_PID=$!' \
  '' \
  'echo "[entrypoint] Starting Gateway on ${GATEWAY_PORT} (MCP at ${MCP_SERVER_URL})..."' \
  'export MCP_SERVER_URL' \
  'export OPENAI_API_KEY' \
  'node packages/mcp-gateway/dist/main.js --port="${GATEWAY_PORT}" & ' \
  'GW_PID=$!' \
  '' \
  'trap "echo [entrypoint] Stopping...; kill -TERM $MCP_PID $GW_PID 2>/dev/null || true; wait" TERM INT' \
  '' \
  'wait -n $MCP_PID $GW_PID' \
  'EXIT_CODE=$?' \
  'echo "[entrypoint] One of the processes exited with code ${EXIT_CODE}. Shutting down..."' \
  'kill -TERM $MCP_PID $GW_PID 2>/dev/null || true' \
  'wait || true' \
  'exit ${EXIT_CODE}' \
  > /usr/local/bin/entrypoint.sh \
  && chmod +x /usr/local/bin/entrypoint.sh

# Expose both ports
EXPOSE 3000 3333

# Use tini as PID 1
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/local/bin/entrypoint.sh"]