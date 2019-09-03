FROM node:12.9.1-slim

COPY package.json /
COPY hello.js /

RUN npm install

EXPOSE 80

CMD node /hello.js
