FROM node:lts-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY nuxt.config.ts prisma ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --production

COPY . .

RUN pnpm build

FROM node:lts-alpine AS runner

ARG VERSION
ARG BUILD_TIME

WORKDIR /app

COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production
ENV NUXT_APP_VERSION=$VERSION

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]