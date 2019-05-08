FROM nginx:1.15-alpine

COPY ./docker-config/alpine-nginx/default.conf /etc/nginx/conf.d/default.conf

RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1
