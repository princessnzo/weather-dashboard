# Stage 1: Build - Use Node.js 18 LTS
FROM node:18.20.3-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund --only=production


FROM node:18.20.3-alpine
WORKDIR /app


RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./


COPY server.js ./


RUN chown -R appuser:nodejs /app
USER appuser


EXPOSE 5001


HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); const req = http.request({host: 'localhost', port: 5001, path: '/api/health', timeout: 2000}, (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => process.exit(1)); req.end();"

# Start the application
CMD ["node", "server.js"]
