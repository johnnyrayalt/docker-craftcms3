FROM httpd:2.4-alpine

RUN apk update; \
    apk upgrade;

COPY ./docker-config/alpine-apache/apache.conf /usr/local/apache2/conf/apache.conf

RUN echo "Include /usr/local/apache2/conf/apache.conf" \
    >> /usr/local/apache2/conf/httpd.conf