FROM node:20

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
