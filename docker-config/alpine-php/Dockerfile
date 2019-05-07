FROM php:7.2-fpm-alpine

RUN apk --update add \
        autoconf \
        build-base \
        git \
        icu-dev \
        imagemagick-dev \
        libzip-dev \
        mysql-client \
        openssl-dev \
        wget \
        unzip \
        # libstdc++ \
        # ca-certificates \
        # linux-headers \
        # libaio-dev \
        # zlib-dev \
        # subversion \
        # freetype-dev \
        # bzip2-dev \
        # freetype-dev \
        # gettext-dev \
        # libjpeg-turbo-dev \
        # libpng-dev \
        # libtool \
        # libbz2 \
        # libxslt-dev \
        # openldap-dev \
        # hiredis-dev \
        # make \
        # ffmpeg \
    && docker-php-ext-install \
        iconv \
        intl \
        mysqli \
        pdo_mysql \
        sockets \
        zip \
        # bcmath \
        # bz2 \
        # gettext \
        # exif \
        # simplexml \
        # shmop \
        # sysvmsg \
        # sysvsem \
        # sysvshm \
        # pcntl \
        # xsl \
        # pspell \
    && pecl install \
        imagick \
    && docker-php-ext-enable \
        imagick \
    && apk del build-base \
    #     linux-headers \
    #     libaio-dev \
    && rm -rf /var/cache/apk/*

ENV COMPOSER_HOME /composer

ENV PATH /composer/vendor/bin:$PATH

ENV COMPOSER_ALLOW_SUPERUSER 1

RUN curl -o /tmp/composer-setup.php https://getcomposer.org/installer \
  && curl -o /tmp/composer-setup.sig https://composer.github.io/installer.sig \
  && php -r "if (hash('SHA384', file_get_contents('/tmp/composer-setup.php')) !== trim(file_get_contents('/tmp/composer-setup.sig'))) { unlink('/tmp/composer-setup.php'); echo 'Invalid installer' . PHP_EOL; exit(1); }"

RUN php /tmp/composer-setup.php --no-ansi --install-dir=/usr/local/bin --filename=composer --snapshot && rm -rf /tmp/composer-setup.php

WORKDIR /var/www

RUN composer global require hirak/prestissimo

RUN echo "upload_max_filesize = 10M" > /usr/local/etc/php/php.ini \
    && echo "output_buffering = On" >> /usr/local/etc/php/php.ini \
    && echo "post_max_size = 10M" >> /usr/local/etc/php/php.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/php.ini \
    && echo "memory_limit = 256M" >> /usr/local/etc/php/php.ini

RUN composer create-project craftcms/craft /var/www/html

RUN chown -R www-data:www-data /var/www/html

CMD php-fpm