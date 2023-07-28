FROM node:18-alpine as builder
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production

FROM node:18-bullseye-slim as runner
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
WORKDIR /app
COPY --from=builder --chown=node:node /build/package*.json ./
COPY --from=builder --chown=node:node /build/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /build/dist/ ./dist/

CMD ["node", "dist/main.js"]