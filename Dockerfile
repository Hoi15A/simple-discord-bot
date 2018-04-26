FROM node:9.11.1-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app and install dependencies
COPY . /usr/src/app
RUN npm install

RUN apk update && apk upgrade && apk add git


CMD [ "npm", "start" ]
