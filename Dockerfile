FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y postgresql-client

RUN npm install -g npm@6
COPY . /usr/src/app
RUN npm install
EXPOSE 8080
CMD ["npm start"]
