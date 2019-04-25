FROM php:7.2-fpm-alpine

RUN apk --update add \
        aspell-dev \
        autoconf \
        build-base \
        ca-certificates \
        linux-headers \
        libaio-dev \
        zlib-dev \
        curl \
        g++ \
        git \
        subversion \
        freetype-dev \
        bzip2-dev \
        freetype-dev \
        icu-dev \
        gettext-dev \
        libjpeg-turbo-dev \
        imagemagick-dev \
        libmcrypt-dev \
        libpng-dev \
        libtool \
        libbz2 \
        openssl-dev \
        libstdc++ \
        libxslt-dev \
        libzip-dev \
        mysql-client \
        openldap-dev \
        imagemagick-dev \
        hiredis-dev \
        make \
        unzip \
        ffmpeg \
        wget \
    && docker-php-ext-install \
        bcmath \
        zip \
        bz2 \
        intl \
        gettext \
        exif \
        ftp \
        pdo_mysql \
        mysqli \
        simplexml \
        opcache \
        sockets \
        shmop \
        sysvmsg \
        sysvsem \
        sysvshm \
        mbstring \
        pcntl \
        xsl \
        pspell \
        iconv \
    && docker-php-ext-configure \
        gd \
        --with-freetype-dir=/usr/include/ \
        --with-jpeg-dir=/usr/include/ \
    && pecl install \
        imagick \
    && docker-php-ext-enable \
        imagick \
    && docker-php-ext-install \
        gd \
    && docker-php-ext-enable \
        opcache \
    && pecl install \
        mcrypt-1.0.1 \
    && docker-php-ext-enable \
        mcrypt \
    && apk del build-base \
        linux-headers \
        libaio-dev \
    && rm -rf /var/cache/apk/*

ENV COMPOSER_HOME /composer

ENV PATH /composer/vendor/bin:$PATH

ENV COMPOSER_ALLOW_SUPERUSER 1

RUN curl -o /tmp/composer-setup.php https://getcomposer.org/installer \
  && curl -o /tmp/composer-setup.sig https://composer.github.io/installer.sig \
  && php -r "if (hash('SHA384', file_get_contents('/tmp/composer-setup.php')) !== trim(file_get_contents('/tmp/composer-setup.sig'))) { unlink('/tmp/composer-setup.php'); echo 'Invalid installer' . PHP_EOL; exit(1); }"

RUN php /tmp/composer-setup.php --no-ansi --install-dir=/usr/local/bin --filename=composer --snapshot && rm -rf /tmp/composer-setup.php

VOLUME /var/www
WORKDIR /var/www

RUN composer global require hirak/prestissimo

RUN echo "upload_max_filesize = 10M" > /usr/local/etc/php/php.ini \
    && echo "post_max_size = 10M" >> /usr/local/etc/php/php.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/php.ini \
    && echo "memory_limit = 256M" >> /usr/local/etc/php/php.ini

COPY --chown=www-data:www-data ./src/config /var/www/html/config
COPY --chown=www-data:www-data ./src/modules /var/www/html/modules
COPY --chown=www-data:www-data ./src/templates /var/www/html/templates
COPY --chown=www-data:www-data ./src/web /var/www/html/web
COPY --chown=www-data:www-data ./src/composer.json /var/www/html/composer.json
COPY --chown=www-data:www-data ./src/craft /var/www/html/craft

RUN mkdir -p /var/www/html/storage/rebrand  \
    && mkdir -p /var/www/html/storage/runtime/mutex  \
    && mkdir -p /var/www/html/storage/logs  \
    && chown -R www-data:www-data /var/www/html/storage

RUN composer install -d /var/www/html/ \
    && chown -R www-data:www-data /var/www/html/vendor \
    && chown -R www-data:www-data /var/www/html/composer.lock

CMD php-fpm