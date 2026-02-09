# Stage 1: Build - Use Node.js 18 LTS
FROM node:18.20.3-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Use npm install with legacy peer deps for consistency
RUN npm install --legacy-peer-deps --no-audit --no-fund --only=production

# Stage 2: Run
FROM node:18.20.3-alpine
WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

# Copy package files and built modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy application source
COPY server.js ./

# Set permissions
RUN chown -R appuser:nodejs /app
USER appuser

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); const req = http.request({host: 'localhost', port: 5001, path: '/api/health', timeout: 2000}, (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => process.exit(1)); req.end();"

# Start the application
CMD ["node", "server.js"]
