# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /test-app
COPY . .
ENV HOST=0.0.0.0
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000
