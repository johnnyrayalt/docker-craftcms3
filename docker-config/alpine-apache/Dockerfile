FROM httpd:2.4-alpine

RUN apk update; \
    apk upgrade;

COPY ./docker-config/alpine-apache/vhost.conf /usr/local/apache2/conf/vhost.conf

RUN echo "Include /usr/local/apache2/conf/vhost.conf" \
    >> /usr/local/apache2/conf/httpd.conf