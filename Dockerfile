FROM dhi.io/node:26-dev AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir /tmp/app-tmp

# ------------------------------------------------------------------------------

FROM dhi.io/node:26

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .
COPY --from=builder --chown=node:node /tmp/app-tmp .tmp 

USER node

ENV NODE_ENV=production

CMD ["node", "./node_modules/govuk-prototype-kit/bin/cli", "start"]
