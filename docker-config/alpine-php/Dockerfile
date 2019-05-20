FROM php:7.2-fpm-alpine

### ALPINE PACKAGES
RUN apk --update add \
  autoconf \
  build-base \
  git \
  icu-dev \
  imagemagick-dev \
  libzip-dev \
  mysql-client \
  openssl-dev \
  tzdata \
  wget \
  unzip \
  ### PHP PACKAGES
  && docker-php-ext-install \
  iconv \
  intl \
  mysqli \
  pdo_mysql \
  sockets \
  sysvmsg sysvsem sysvshm \
  zip \
  ### PHP INSTALL USING PECL
  && pecl install \
  imagick \
  ### PHP INSTALL USING DOCKER
  && docker-php-ext-enable \
  imagick \
  && apk del build-base \
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

RUN echo "upload_max_filesize = 40M" > /usr/local/etc/php/php.ini \
  && echo "output_buffering = On" >> /usr/local/etc/php/php.ini \
  && echo "post_max_size = 40M" >> /usr/local/etc/php/php.ini \
  && echo "max_execution_time = 300000" >> /usr/local/etc/php/php.ini \
  && echo "memory_limit = 256M" >> /usr/local/etc/php/php.ini

RUN composer create-project craftcms/craft /var/www/html

### turns off backing up DB when updating as this can break the install
RUN sed -i "/'defaultWeekStartDay' => 1,/a 'backupDbOnUpdate' => false," ./html/config/general.php

RUN chown -R www-data:www-data /var/www/html

CMD php-fpm