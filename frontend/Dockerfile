# frontend/Dockerfile
FROM node:20

WORKDIR /app

# ✅ ADD THESE TWO LINES
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm install

COPY . .

# ADD THIS LINE
RUN rm -f .env.local

# RUN npm run build
RUN npm run build --webpack

EXPOSE 3000

# CMD ["npm", "start"]
CMD ["npm", "run", "start:prod"]
