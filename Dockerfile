FROM node:24-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN mkdir .tmp \
    && chown -R node:node .tmp

USER node

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
