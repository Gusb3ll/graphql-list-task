FROM node:16 AS builder

WORKDIR /usr/app

COPY . .

COPY prisma ./prisma/
COPY package.json yarn.lock ./

RUN yarn install

RUN yarn build

FROM node:16

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/tsconfig*.json ./
COPY --from=builder /usr/app/package.json ./
COPY --from=builder /usr/app/prisma ./prisma
COPY --from=builder /usr/app/dist ./dist

EXPOSE 3333

CMD ["yarn", "start"]
