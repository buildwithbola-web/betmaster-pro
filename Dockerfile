FROM node:20-bookworm-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Install Playwright and its system dependencies for Chromium (needed for scraping)
RUN npx playwright install --with-deps chromium

# Copy the rest of the application code
COPY . .

# Build the frontend (Vite) and backend (esbuild)
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
