# backend/Dockerfile
# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy dependency files first (better Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# NestJS backend port
EXPOSE 3001

# Start backend
# CMD ["npm", "run", "start:dev"]
CMD ["npm", "run", "start:prod"]