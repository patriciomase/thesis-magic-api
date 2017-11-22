FROM node:8.9.1

RUN mkdir /application

RUN npm install nodemon -g

WORKDIR /application
ADD ./package.json /application/package.json
ADD ./nodemon.json /application/nodemon.json

WORKDIR /application
RUN npm install

EXPOSE 3333

CMD NODE_ENV=local npm run debug
