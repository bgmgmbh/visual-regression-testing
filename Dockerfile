FROM node:argon

MAINTAINER Marco Huber <marco.huber@bgm-gmbh.de>

ENV PHANTOMJS_EXECUTABLE=/usr/src/app/node_modules/phantomjs-prebuilt/bin/phantomjs

CMD echo "phantomcss running..." && tail -f /dev/null
