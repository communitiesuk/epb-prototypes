FROM node:24-slim

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 80
ENV PORT=80
ENV NODE_ENV=production

USER node

CMD ["npm", "run", "serve"]
