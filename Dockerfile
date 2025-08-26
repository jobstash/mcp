# ---------- build (toolchain + Yarn v1 pinned) ----------
FROM node:22-alpine3.22 AS build
WORKDIR /usr/src/app

# Toolchain for native deps
RUN apk add --no-cache python3 make g++ git libc6-compat wget curl
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3

# Pin Yarn Classic
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Copy manifests first so yarn install can resolve all workspaces
COPY package.json yarn.lock ./
# Copy ALL packages (best caching if your repo isn't huge; otherwise copy package.json for each)
COPY packages ./packages

# Install with dev deps to allow building TypeScript
RUN yarn install --frozen-lockfile

# Build each workspace explicitly so failures are visible
RUN yarn workspace @jobstash/mcp-server build
RUN yarn workspace @jobstash/mcp-gateway build || \
  (echo "Gateway build failed. Check scripts and tsconfig." && exit 1)

# Sanity check: ensure both have some dist output
# (adapt these checks to your actual build layout if needed)
RUN test -d packages/mcp-server/dist || (echo "mcp-server dist not found" && ls -R packages/mcp-server && exit 1)
RUN test -d packages/mcp-gateway/dist || (echo "mcp-gateway dist not found" && ls -R packages/mcp-gateway && exit 1)

# Prune to production deps only (still in build stage where toolchain exists)
RUN rm -rf node_modules && yarn install --frozen-lockfile --production

# ---------- runtime (minimal) ----------
FROM node:22-alpine3.22 AS runtime
WORKDIR /usr/src/app

# Proper signal handling
RUN apk add --no-cache tini

ENV NODE_ENV=production
ENV GATEWAY_PORT=3000
ENV MCP_SERVER_PORT=3333
ENV MCP_SERVER_URL=http://127.0.0.1:3333

# Copy only what's needed at runtime
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copy manifests (for module resolution) and built artifacts
COPY --from=build /usr/src/app/packages/mcp-server/package.json ./packages/mcp-server/package.json
COPY --from=build /usr/src/app/packages/mcp-gateway/package.json ./packages/mcp-gateway/package.json

COPY --from=build /usr/src/app/packages/mcp-server/dist ./packages/mcp-server/dist
COPY --from=build /usr/src/app/packages/mcp-gateway/dist ./packages/mcp-gateway/dist

# Entrypoint that auto-detects dist/main.js in either standard or nested NestJS layout
RUN printf '%s\n' \
'#!/bin/sh' \
'set -e' \
'' \
'find_entry() {' \
'  base="$1";' \
'  # Try common locations' \
'  for p in \\' \
'    "$base/dist/main.js" \\' \
'    "$base/dist/apps/main.js" \\' \
'    "$base/dist/apps/"*/"main.js" \\' \
'    "$base/dist/"*/"main.js" \\' \
'  ; do' \
'    if [ -f "$p" ]; then echo "$p"; return 0; fi' \
'  done' \
'  # Fallback: search once' \
'  p=$(find "$base/dist" -type f -name main.js 2>/dev/null | head -n1 || true)' \
'  if [ -n "$p" ]; then echo "$p"; return 0; fi' \
'  return 1' \
'}' \
'' \
'SERVER_JS=$(find_entry "packages/mcp-server") || { echo "[entrypoint] Could not find MCP Server main.js under packages/mcp-server/dist"; ls -R packages/mcp-server/dist || true; exit 1; }' \
'GATEWAY_JS=$(find_entry "packages/mcp-gateway") || { echo "[entrypoint] Could not find Gateway main.js under packages/mcp-gateway/dist"; ls -R packages/mcp-gateway/dist || true; exit 1; }' \
'' \
'echo "[entrypoint] Using MCP Server entry: $SERVER_JS"' \
'echo "[entrypoint] Using Gateway entry:    $GATEWAY_JS"' \
'' \
'echo "[entrypoint] Starting MCP Server on ${MCP_SERVER_PORT}..."' \
'node "$SERVER_JS" --port="${MCP_SERVER_PORT}" & MCP_PID=$!' \
'' \
'echo "[entrypoint] Starting Gateway on ${GATEWAY_PORT} (MCP at ${MCP_SERVER_URL})..."' \
'export MCP_SERVER_URL OPENAI_API_KEY' \
'node "$GATEWAY_JS" --port="${GATEWAY_PORT}" & GW_PID=$!' \
'' \
'trap "echo [entrypoint] Stopping...; kill -TERM $MCP_PID $GW_PID 2>/dev/null || true; wait" TERM INT' \
'wait -n $MCP_PID $GW_PID' \
'EC=$?' \
'echo "[entrypoint] A process exited with code $EC, shutting down..."' \
'kill -TERM $MCP_PID $GW_PID 2>/dev/null || true' \
'wait || true' \
'exit $EC' \
> /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000 3333
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/local/bin/entrypoint.sh"]