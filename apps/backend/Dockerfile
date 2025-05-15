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
RUN pnpm run build --filter="server"

##################################################################################
# Start Server                                                                   #
##################################################################################
FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner

USER runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/server

COPY --from=builder /app/apps/server/node_modules ./node_modules
COPY --from=builder --chown=runner:nodejs /app/apps/server/dist .

EXPOSE 3001

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD [ "node", "index.cjs" ]
