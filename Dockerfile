FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Копіюємо composer.json і composer.lock для оптимізації кешу
COPY composer.json composer.lock ./
# Встановлюємо залежності без автозавантаження та скриптів
RUN composer install --no-autoloader --no-scripts

# Тепер копіюємо весь код
COPY . .

# Оптимізуємо автозавантаження
RUN composer dump-autoload --optimize

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

CMD ["php-fpm"]
