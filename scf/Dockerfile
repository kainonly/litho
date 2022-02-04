FROM ccr.ccs.tencentyun.com/scf-repo/runtime-node12:latest

COPY ../dist/console /app
WORKDIR /app

EXPOSE 9000

CMD [ "node", "./server/main.js" ]
