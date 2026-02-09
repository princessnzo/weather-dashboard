# Use Node.js 18
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .browserslistrc ./

RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY public ./public
COPY src ./src

ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV CI=false
ENV BROWSERSLIST_IGNORE_OLD_DATA=true
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
