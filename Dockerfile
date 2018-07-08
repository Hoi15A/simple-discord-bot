FROM node:10.6.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app and install dependencies
COPY . /usr/src/app
RUN npm install

RUN apk update && apk upgrade

RUN apk add --no-cache \
        git \
        build-base \
        g++ \
        cairo-dev \
        jpeg-dev \
        pango-dev \
        freetype-dev \
        giflib-dev \
        libc6-compat

CMD [ "npm", "start" ]
