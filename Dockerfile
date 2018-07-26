FROM node:6-jessie

MAINTAINER Marco Huber <marco.huber@bgm-gmbh.de>

ENV PHANTOMJS_EXECUTABLE=/usr/src/app/node_modules/phantomjs-prebuilt/bin/phantomjs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y build-essential

COPY . /usr/src/app/
RUN npm install && npm cache clean --force

CMD echo "phantomcss running..." && tail -f /dev/null
