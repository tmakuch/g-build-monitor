FROM node:14-alpine
WORKDIR /usr/local/srv

COPY . .
RUN npm i