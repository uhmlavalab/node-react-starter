FROM node:13.12.0-alpine
WORKDIR /

COPY ./dist /

EXPOSE 80

CMD ["node", "/server/dist/server.js"]