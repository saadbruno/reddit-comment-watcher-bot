FROM node:23.4-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
CMD ["node", "index.js"]