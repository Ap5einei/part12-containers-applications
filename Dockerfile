FROM node:20

WORKDIR /usr/src/app

COPY index.js .

CMD ["node", "index.js"]
