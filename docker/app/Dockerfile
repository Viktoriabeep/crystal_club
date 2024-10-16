FROM php:8.3-fpm

ARG LOCAL_USER

WORKDIR /var/www/html

RUN apt-get update
RUN apt-get install -y libonig-dev libxml2-dev zip unzip git \
    libcurl4-openssl-dev \
    libpng-dev libjpeg-dev libfreetype6-dev libwebp-dev zlib1g-dev \
    libpq-dev libzip-dev curl \
    supervisor systemctl nano

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

RUN docker-php-ext-install ctype curl gd pcntl pdo_pgsql pgsql zip
RUN pecl install redis && docker-php-ext-enable redis

RUN useradd -m $LOCAL_USER
RUN usermod -aG root $LOCAL_USER
RUN usermod -aG www-data $LOCAL_USER

COPY ./app/fpm/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./app/php/local.ini /usr/local/etc/php/conf.d/local.ini
COPY ./app/supervisor/* /etc/supervisor/conf.d/
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
