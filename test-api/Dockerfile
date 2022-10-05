# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /test-api
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start:prod"]
EXPOSE 3000
