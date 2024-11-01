# Use a Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /src

# Copy the lock and package file
COPY package.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application files
COPY . ./

# Expose the application port
EXPOSE 8082

# Start the application
CMD ["npm", "run", "start"]
# http://ollama-api:11434