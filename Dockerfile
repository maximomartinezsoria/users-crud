FROM node:12 as client

WORKDIR /usr/app/client/

COPY client/package*.json ./

RUN npm install

COPY client/ ./

RUN npm run build

FROM node:12

WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN npm install
COPY server/ ./

EXPOSE 8080

CMD ["npm", "start"]
