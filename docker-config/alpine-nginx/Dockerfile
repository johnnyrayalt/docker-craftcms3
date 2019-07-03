FROM nginx:1.17.1-alpine

COPY ./docker-config/alpine-nginx/default.conf /etc/nginx/conf.d/default.conf

RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1