# ---------- build (toolchain + Yarn v1 pinned) ----------
FROM node:22-alpine3.22 AS build
WORKDIR /usr/src/app

# Toolchain for native deps (bufferutil, etc.)
RUN apk add --no-cache python3 make g++ git libc6-compat wget curl
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3

# Pin Yarn Classic
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# 1) Copy manifests & sources
COPY package.json yarn.lock ./
COPY packages ./packages

# 2) Install with dev deps (to compile TS)
RUN yarn install --frozen-lockfile

# 3) Build in dependency order
RUN yarn workspace @jobstash/file-parser build
RUN yarn workspace @jobstash/mcp-server build
RUN yarn workspace @jobstash/mcp-gateway build

# 4) Sanity checks - fail fast if expected outputs are missing
RUN test -f packages/file-parser/dist/src/index.js        || (echo "file-parser build output missing" && ls -R packages/file-parser && exit 1)
RUN test -f packages/mcp-server/dist/src/mcp-runner.js    || (echo "mcp-server build output missing" && ls -R packages/mcp-server && exit 1)
RUN test -f packages/mcp-gateway/dist/main.js             || (echo "mcp-gateway build output missing" && ls -R packages/mcp-gateway && exit 1)

# 5) Reinstall prod-only deps (still in build stage with toolchain)
RUN rm -rf node_modules && yarn install --frozen-lockfile --production


# ---------- runtime (minimal) ----------
FROM node:22-alpine3.22 AS runtime
WORKDIR /usr/src/app

# Proper signal handling
RUN apk add --no-cache tini
ENV NODE_ENV=production

# Ports + wiring
ENV GATEWAY_PORT=3000
ENV MCP_SERVER_PORT=3333
ENV MCP_SERVER_URL=http://127.0.0.1:3333
# Pass OPENAI_API_KEY at runtime for the gateway

# Copy only what's needed to run
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock
COPY --from=build /usr/src/app/node_modules ./node_modules

# Workspace manifests (kept for module resolution) + built artifacts
COPY --from=build /usr/src/app/packages/file-parser/package.json ./packages/file-parser/package.json
COPY --from=build /usr/src/app/packages/mcp-server/package.json   ./packages/mcp-server/package.json
COPY --from=build /usr/src/app/packages/mcp-gateway/package.json  ./packages/mcp-gateway/package.json

COPY --from=build /usr/src/app/packages/file-parser/dist ./packages/file-parser/dist
COPY --from=build /usr/src/app/packages/mcp-server/dist  ./packages/mcp-server/dist
COPY --from=build /usr/src/app/packages/mcp-gateway/dist ./packages/mcp-gateway/dist

# Entrypoint: start both services with explicit built paths
RUN printf '%s\n' \
'#!/bin/sh' \
'set -e' \
'SERVER_JS="packages/mcp-server/dist/src/mcp-runner.js"' \
'GATEWAY_JS="packages/mcp-gateway/dist/main.js"' \
'[ -f "$SERVER_JS" ]  || { echo "[entrypoint] Missing $SERVER_JS";  ls -R packages/mcp-server || true;  exit 1; }' \
'[ -f "$GATEWAY_JS" ] || { echo "[entrypoint] Missing $GATEWAY_JS"; ls -R packages/mcp-gateway || true; exit 1; }' \
'echo "[entrypoint] Starting MCP Server on ${MCP_SERVER_PORT}..."' \
'node "$SERVER_JS" --port="${MCP_SERVER_PORT}" & MCP_PID=$!' \
'echo "[entrypoint] Starting Gateway on ${GATEWAY_PORT} (MCP at ${MCP_SERVER_URL})..."' \
'export MCP_SERVER_URL OPENAI_API_KEY' \
'node "$GATEWAY_JS" --port="${GATEWAY_PORT}" & GW_PID=$!' \
'trap "echo [entrypoint] Stopping...; kill -TERM $MCP_PID $GW_PID 2>/dev/null || true; wait" TERM INT' \
'wait -n $MCP_PID $GW_PID; EC=$?; echo "[entrypoint] A process exited with code $EC, shutting down..."; kill -TERM $MCP_PID $GW_PID 2>/dev/null || true; wait || true; exit $EC' \
> /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000 3333
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/local/bin/entrypoint.sh"]