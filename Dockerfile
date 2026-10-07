FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Se puede cambiar desde EasyPanel como build argument
ARG NEXT_PUBLIC_GOOGLE_ENABLED=false
ENV NEXT_PUBLIC_GOOGLE_ENABLED=$NEXT_PUBLIC_GOOGLE_ENABLED
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV ENABLE_JOBS=true
COPY --from=build /app/package*.json ./
# next start necesita la config en runtime (p. ej. el límite de subidas de las acciones del servidor)
COPY --from=build /app/next.config.ts ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/scripts ./scripts
EXPOSE 3000
CMD ["sh", "-c", "node scripts/migrate.mjs && npx next start -p 3000"]
