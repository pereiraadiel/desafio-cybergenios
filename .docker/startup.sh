#!/bin/sh
npx prisma generate
yarn migrate:dev
yarn seed:dev
yarn start:dev