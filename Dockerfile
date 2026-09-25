FROM node:24-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN mkdir .tmp \
    && chown -R node:node .tmp

USER node

CMD ["npm", "run", "start"]
