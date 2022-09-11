FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY src/carsapp/ /app

RUN npm install
EXPOSE 5000
ENTRYPOINT [ "/usr/local/bin/node" , "./app.js" ]