FROM node:23-alpine3.19
LABEL maintainer="Sakari Marttinen <sakkenino@gmail.com>"
EXPOSE 3000

WORKDIR /app

COPY package.json package-lock.json .
RUN npm install

COPY . .

CMD node bot.js
