FROM node:18-alpine

COPY dist /app/dist
WORKDIR /app

EXPOSE 4201

CMD [ "node", "dist/console/server/main.js" ]
