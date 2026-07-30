FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./packages ./packages
COPY ./turbo.json ./turbo.json

COPY ./apps/ws-backend ./apps/ws-backend

RUN pnpm install

COPY . .

RUN npm run db:generate
RUN npm run build

EXPOSE 8081

CMD [ "pnpm" , "run", "start:ws" ]