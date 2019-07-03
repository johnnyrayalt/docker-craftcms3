### STAGE 1
FROM php:7.2-fpm-alpine as base

### ALPINE PACKAGES NEEDED TO INSTALL COMPOSER AND CRAFT
RUN apk add --no-cahce \
  autoconf \
  build-base \
  git \
  icu-dev \
  libzip-dev \
  libcrypto1.1 libssl1.1 libstdc++ \
  ncurses-libs \
  wget \
  unzip \
  # zlib \
  ### PHP INSTALL USING DOCKER
  && docker-php-ext-install \
  iconv \
  intl \
  sysvmsg sysvsem sysvshm \
  zip \
  ### DELETE BUILD SPECIFIC PACKAGES
  && apk del build-base

ENV COMPOSER_HOME /composer

ENV PATH /composer/vendor/bin:$PATH

ENV COMPOSER_ALLOW_SUPERUSER 1

RUN curl -o /tmp/composer-setup.php https://getcomposer.org/installer \
  && curl -o /tmp/composer-setup.sig https://composer.github.io/installer.sig \
  && php -r "if (hash('SHA384', file_get_contents('/tmp/composer-setup.php')) !== trim(file_get_contents('/tmp/composer-setup.sig'))) { unlink('/tmp/composer-setup.php'); echo 'Invalid installer' . PHP_EOL; exit(1); }"

RUN php /tmp/composer-setup.php --no-ansi --install-dir=/usr/local/bin --filename=composer --snapshot && rm -rf /tmp/composer-setup.php

WORKDIR /var/www

RUN composer global require hirak/prestissimo

RUN echo "upload_max_filesize = 40M" > /usr/local/etc/php/php.ini \
  && echo "output_buffering = On" >> /usr/local/etc/php/php.ini \
  && echo "post_max_size = 40M" >> /usr/local/etc/php/php.ini \
  && echo "max_execution_time = 300000" >> /usr/local/etc/php/php.ini \
  && echo "memory_limit = 256M" >> /usr/local/etc/php/php.ini

RUN composer create-project craftcms/craft /var/www/html

COPY --chown=www-data:www-data ./docker-config/alpine-php/front-end/templates /var/www/html/templates
COPY --chown=www-data:www-data ./docker-config/alpine-php/front-end/src /var/www/html/src
COPY --chown=www-data:www-data ./docker-config/alpine-php/front-end/public /var/www/html/public


### turns off backing up DB when updating as this can break the install
RUN sed -i "/'defaultWeekStartDay' => 1,/a 'backupDbOnUpdate' => false," ./html/config/general.php

RUN chown -R www-data:www-data /var/www/html

### STAGE 2
FROM php:7.2-fpm-alpine

### ALPINE PACKAGES NEEDED TO RUN CRAFT
RUN apk add --no-cache \
  autoconf \
  build-base \
  imagemagick-dev \
  libzip-dev \
  tzdata \
  unzip \
  ### PHP INSTALL USING PECL
  && pecl install \
  imagick \
  ### PHP INSTALL USING DOCKER
  && docker-php-ext-install \
  pdo_mysql \
  sockets \
  zip \
  ### PHP ENABLE FOR DOCKER
  && docker-php-ext-enable \
  imagick \
  ### DELETE BUILD SPECIFIC PACKAGES
  && apk del build-base

COPY --from=base /var/www /var/www

RUN chown -R www-data:www-data /var/www/html

CMD ["php-fpm"]