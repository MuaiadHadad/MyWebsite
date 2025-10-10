# Use Node.js 20 Debian slim for reliable builds in Docker
FROM node:20-bookworm-slim AS base

# Install dependencies only when needed
FROM base AS deps

# Keep packages minimal
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install pnpm with specific version
RUN npm install -g pnpm@9.12.0

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies including devDependencies explicitly
RUN pnpm install --prod=false --frozen-lockfile || pnpm install --prod=false

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.12.0

# Copy node_modules from deps and app source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application (standalone)
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid 1001 nextjs

# Install curl for healthchecks
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Adjust permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the server produced by Next.js standalone output
CMD ["node", "server.js"]
