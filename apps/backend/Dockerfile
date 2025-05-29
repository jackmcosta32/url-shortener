##################################################################################
# Base Setup                                                                     #
##################################################################################
FROM node:23.11.0-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

##################################################################################
# Build Stage                                                                    #
##################################################################################
FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run --filter="backend" build

##################################################################################
# Start Server                                                                   #
##################################################################################
FROM base AS runner

USER root

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner

USER runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/backend

COPY --from=builder /app/apps/backend/node_modules ./node_modules
COPY --from=builder --chown=runner:nodejs /app/apps/backend/dist .

EXPOSE "${SERVER_PORT:-3000}"

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD [ "node", "index.js" ]
