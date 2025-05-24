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
RUN pnpm run --filter="backend-e2e" build

##################################################################################
# Start Server                                                                   #
##################################################################################
FROM grafana/k6:1.0.0 AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/backend-e2e

COPY --from=builder /app/apps/backend-e2e/node_modules ./node_modules
COPY --from=builder /app/apps/backend-e2e/dist .

EXPOSE 5665

RUN mkdir ./reports

ENTRYPOINT ["tail", "-f", "/dev/null"]
# CMD [ "run", "./index.js" ]
