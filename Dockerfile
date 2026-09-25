FROM node:24-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 80 443

CMD ["npm", "run", "start"]
