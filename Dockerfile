FROM node:argon

MAINTAINER Marco Huber <marco.huber@bgm-gmbh.de>

ENV PHANTOMJS_EXECUTABLE=/usr/src/app/node_modules/phantomjs-prebuilt/bin/phantomjs

VOLUME $PWD/tests:/usr/src/app/tests

RUN apt-get update; apt-get install -y npm 

CMD echo "phantomcss running..." && tail -f /dev/null
