FROM node:14-alpine

COPY dist/console /app
WORKDIR /app

EXPOSE 9000

CMD [ "node", "./server/main.js" ]
