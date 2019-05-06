FROM httpd:2.4-alpine

RUN apk update; \
    apk upgrade;
COPY ./docker-config/alpine-apache/server.crt /etc/ssl/server.crt
COPY ./docker-config/alpine-apache/server.key /etc/ssl/server.key
COPY ./docker-config/alpine-apache/my-httpd.conf /usr/local/apache2/conf/httpd.conf

# RUN echo "Include /usr/local/apache2/conf/vhost.conf" \
#     >> /usr/local/apache2/conf/httpd.conf