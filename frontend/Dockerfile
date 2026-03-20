# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ADD THIS LINE
RUN rm -f .env.local

# RUN npm run build
RUN npm run build --webpack

EXPOSE 3000

CMD ["npm", "start"]
