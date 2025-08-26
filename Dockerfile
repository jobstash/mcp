# ---------- build (toolchain + Yarn v1 pinned) ----------
FROM node:22-alpine3.22 AS build
WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ git libc6-compat wget curl
ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# 1) Copy manifests first for better caching
COPY package.json yarn.lock ./
COPY packages/mcp-server/package.json packages/mcp-server/package.json
COPY packages/mcp-gateway/package.json packages/mcp-gateway/package.json
# 👇 NEW: include local workspace dep so Yarn resolves it as a workspace
COPY packages/file-parser/package.json packages/file-parser/package.json

RUN yarn install --frozen-lockfile

# 2) Build
COPY . .
RUN yarn build

# 3) Prod-only deps
RUN rm -rf node_modules && yarn install --frozen-lockfile --production

# ---------- runtime ----------
FROM node:22-alpine3.22 AS runtime
WORKDIR /usr/src/app
RUN apk add --no-cache tini
ENV NODE_ENV=production
ENV GATEWAY_PORT=3000
ENV MCP_SERVER_PORT=3333
ENV MCP_SERVER_URL=http://127.0.0.1:3333

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock
COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/packages/mcp-server/package.json ./packages/mcp-server/package.json
COPY --from=build /usr/src/app/packages/mcp-gateway/package.json ./packages/mcp-gateway/package.json
COPY --from=build /usr/src/app/packages/file-parser/package.json ./packages/file-parser/package.json

COPY --from=build /usr/src/app/packages/mcp-server/dist ./packages/mcp-server/dist
COPY --from=build /usr/src/app/packages/mcp-gateway/dist ./packages/mcp-gateway/dist
# (file-parser is a lib; no dist needed unless it builds output you require at runtime)

RUN printf '%s\n' \
  '#!/bin/sh' \
  'set -e' \
  'echo "[entrypoint] Starting MCP Server on ${MCP_SERVER_PORT}..."' \
  'node packages/mcp-server/dist/main.js --port="${MCP_SERVER_PORT}" & MCP_PID=$!' \
  'echo "[entrypoint] Starting Gateway on ${GATEWAY_PORT} (MCP at ${MCP_SERVER_URL})..."' \
  'export MCP_SERVER_URL OPENAI_API_KEY' \
  'node packages/mcp-gateway/dist/main.js --port="${GATEWAY_PORT}" & GW_PID=$!' \
  'trap "kill -TERM $MCP_PID $GW_PID 2>/dev/null || true; wait" TERM INT' \
  'wait -n $MCP_PID $GW_PID; EC=$?' \
  'kill -TERM $MCP_PID $GW_PID 2>/dev/null || true; wait || true; exit $EC' \
  > /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000 3333
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/local/bin/entrypoint.sh"]