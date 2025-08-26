# ---------- build (toolchain + Yarn v1 pinned) ----------
FROM node:22-alpine3.22 AS build
WORKDIR /usr/src/app

# Toolchain for native deps
RUN apk add --no-cache python3 make g++ git libc6-compat wget curl
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3

# Pin Yarn Classic
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Copy manifests & sources (ensure all workspaces are present in context)
COPY package.json yarn.lock ./
COPY packages ./packages

# Install with dev deps so TS can compile
RUN yarn install --frozen-lockfile

# Helpful: show what Yarn sees as workspaces (debug visibility)
RUN node -e "console.log('--- workspaces info ---'); try { console.log(JSON.stringify(require('child_process').execSync('yarn workspaces info', {encoding:'utf8'}), null, 2)); } catch(e){ console.log('yarn workspaces info failed', e.message) }"

# Build ALL workspaces (libs first, then apps) – Yarn v1 runs this in each ws
# Make the build fail loudly if any workspace fails.
RUN yarn workspaces run build

# (Optional) Verify the two apps produced dist output somewhere
# Adjust or keep generic; our runtime entrypoint auto-detects the final main.js anyway.
RUN test -d packages/mcp-server/dist || (echo "mcp-server: no dist/ found" && ls -R packages/mcp-server && exit 1)
RUN test -d packages/mcp-gateway/dist || (echo "mcp-gateway: no dist/ found" && ls -R packages/mcp-gateway && exit 1)

# Prune to production deps (still in build stage with toolchain available)
RUN rm -rf node_modules && yarn install --frozen-lockfile --production

# ---------- runtime (minimal) ----------
FROM node:22-alpine3.22 AS runtime
WORKDIR /usr/src/app
RUN apk add --no-cache tini

ENV NODE_ENV=production
ENV GATEWAY_PORT=3000
ENV MCP_SERVER_PORT=3333
ENV MCP_SERVER_URL=http://127.0.0.1:3333

# Copy runtime essentials
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copy manifests (keep workspace metadata) & build artifacts
COPY --from=build /usr/src/app/packages/mcp-server/package.json ./packages/mcp-server/package.json
COPY --from=build /usr/src/app/packages/mcp-gateway/package.json ./packages/mcp-gateway/package.json
COPY --from=build /usr/src/app/packages/mcp-server/dist ./packages/mcp-server/dist
COPY --from=build /usr/src/app/packages/mcp-gateway/dist ./packages/mcp-gateway/dist

# Entrypoint: auto-detect each main.js (supports dist/main.js, dist/apps/**/main.js, etc.)
RUN printf '%s\n' \
'#!/bin/sh' \
'set -e' \
'find_entry(){ base="$1"; for p in "$base/dist/main.js" "$base/dist/apps/main.js" "$base/dist/apps/"*/"main.js" "$base/dist/"*/"main.js"; do [ -f "$p" ] && { echo "$p"; return 0; }; done; p=$(find "$base/dist" -type f -name main.js 2>/dev/null | head -n1 || true); [ -n "$p" ] && { echo "$p"; return 0; }; return 1; }' \
'SERVER_JS=$(find_entry "packages/mcp-server") || { echo "[entrypoint] Could not find MCP Server main.js"; ls -R packages/mcp-server || true; exit 1; }' \
'GATEWAY_JS=$(find_entry "packages/mcp-gateway") || { echo "[entrypoint] Could not find Gateway main.js"; ls -R packages/mcp-gateway || true; exit 1; }' \
'echo "[entrypoint] Using MCP Server entry: $SERVER_JS"' \
'echo "[entrypoint] Using Gateway entry:    $GATEWAY_JS"' \
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