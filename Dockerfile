# ---------- build (toolchain + Yarn v1 pinned) ----------
FROM node:22-alpine3.22 AS build
WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ git libc6-compat wget curl
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Copy manifests & sources
COPY package.json yarn.lock ./
COPY packages ./packages

# Install with dev deps
RUN yarn install --frozen-lockfile

# Build in dependency order
RUN yarn workspace @jobstash/file-parser build
RUN yarn workspace @jobstash/mcp-server build
RUN yarn workspace @jobstash/mcp-gateway build

# Sanity checks (corrected gateway path)
RUN test -f packages/file-parser/dist/src/index.js     || (echo "file-parser build output missing" && ls -R packages/file-parser && exit 1)
RUN test -f packages/mcp-server/dist/src/mcp-runner.js || (echo "mcp-server build output missing"  && ls -R packages/mcp-server  && exit 1)
# accept either dist/main.js or dist/src/main.js (your build makes dist/src/main.js)
RUN [ -f packages/mcp-gateway/dist/main.js ] || [ -f packages/mcp-gateway/dist/src/main.js ] \
 || (echo "mcp-gateway build output missing" && ls -R packages/mcp-gateway && exit 1)

# Prune to prod deps
RUN rm -rf node_modules && yarn install --frozen-lockfile --production


# ---------- runtime ----------
FROM node:22-alpine3.22 AS runtime
WORKDIR /usr/src/app
RUN apk add --no-cache tini

ENV NODE_ENV=production
ENV GATEWAY_PORT=3000
ENV MCP_SERVER_PORT=3333
ENV MCP_SERVER_URL=http://127.0.0.1:3333

# Copy runtime files
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock
COPY --from=build /usr/src/app/node_modules ./node_modules

# Workspace manifests + builds
COPY --from=build /usr/src/app/packages/file-parser/package.json ./packages/file-parser/package.json
COPY --from=build /usr/src/app/packages/mcp-server/package.json   ./packages/mcp-server/package.json
COPY --from=build /usr/src/app/packages/mcp-gateway/package.json  ./packages/mcp-gateway/package.json

COPY --from=build /usr/src/app/packages/file-parser/dist ./packages/file-parser/dist
COPY --from=build /usr/src/app/packages/mcp-server/dist  ./packages/mcp-server/dist
COPY --from=build /usr/src/app/packages/mcp-gateway/dist ./packages/mcp-gateway/dist

RUN mkdir -p /usr/src && ln -s /usr/src/app/packages/mcp-server /usr/src/mcp-server


# Entrypoint (tries both gateway paths)
RUN printf '%s\n' \
'#!/bin/sh' \
'set -e' \
'SERVER_JS="packages/mcp-server/dist/src/mcp-runner.js"' \
'# prefer dist/main.js if it exists, else dist/src/main.js' \
'GATEWAY_JS="packages/mcp-gateway/dist/main.js"' \
'[ -f "$GATEWAY_JS" ] || GATEWAY_JS="packages/mcp-gateway/dist/src/main.js"' \
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