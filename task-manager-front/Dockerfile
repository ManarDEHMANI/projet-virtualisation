# ---------- Stage 1: Build Angular ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build production
RUN npm run build -- --configuration=production

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:1.25-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app
# ⚠️ Si Angular 17+ → probablement /browser
COPY --from=builder /app/dist/task-manager-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
