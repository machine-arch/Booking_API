FROM node:16-alpine

WORKDIR /app/web_api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3000

COPY . .
RUN npm run build

CMD ["node", "dist/main.js"]