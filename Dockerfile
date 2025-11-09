# Multi-stage Dockerfile for Lanka Web Application

# Stage 1: Build Frontend
FROM node:23-alpine AS frontend-build

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies (production only)
RUN npm ci  --legacy-peer-deps

# Copy frontend source
COPY frontend/ ./

# Build argument for API URL
ARG REACT_APP_API_URL=http://localhost:4000
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the React application
RUN npm run build

# Stage 2: Setup Backend
FROM node:23-alpine AS backend-setup

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies (production only)
RUN npm ci  --legacy-peer-deps

# Copy backend source
COPY backend/ ./

# Stage 3: Production
FROM node:23-alpine

WORKDIR /app

# Install serve to host the frontend build
RUN npm install -g concurrently serve

# Copy backend from backend-setup stage
COPY --from=backend-setup /app/backend ./backend

# Copy frontend build from frontend-build stage
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Copy root package.json for running both services
COPY package.json ./

# Create a simple startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'concurrently "cd /app/backend && node index.js" "serve -s /app/frontend/build -l 3000"' >> /app/start.sh && \
    chmod +x /app/start.sh

# Expose ports
EXPOSE 3000 4000

# Start both frontend and backend
CMD ["/app/start.sh"]
