# Stage 1: Build the React application
FROM node:22.2.0-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the server with Node.js
FROM node:22.2.0-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app /app

# Install production dependencies
RUN npm install --production

# Expose port 3000 (or any port your app uses)
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]