# Multi-stage Dockerfile for optimized image size

# Stage 1: Build stage
FROM node:22-alpine AS builder

# Set the Label for the Docker image
LABEL stage="builder"

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci --only=production=false

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Production stage
FROM node:22-alpine AS production

# Set the Label for the Docker image
LABEL app="backend"
LABEL stage="production"

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Change ownership of the app directory to the non-root user
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]