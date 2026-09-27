FROM node:22-bookworm-slim AS dependencies

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /workspace

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/contracts/package.json packages/contracts/package.json
RUN npm ci

FROM dependencies AS build

COPY apps/web apps/web
COPY packages/contracts packages/contracts
RUN npm run build --workspace @pullup/web

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
WORKDIR /app

RUN useradd --create-home --uid 10001 pullup
COPY --from=build --chown=pullup:pullup /workspace/apps/web/.next/standalone ./
COPY --from=build --chown=pullup:pullup /workspace/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=pullup:pullup /workspace/apps/web/public ./apps/web/public

USER pullup
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
