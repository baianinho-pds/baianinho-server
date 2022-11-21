FROM node:16-alpine

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
ENV PORT 3001

RUN npm cache clean -force && npm install