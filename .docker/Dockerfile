FROM node:14-alpine

WORKDIR /app

ADD ./package.json /app

RUN npm i --silent

ADD ./.env.dev /app/.env

ADD . .