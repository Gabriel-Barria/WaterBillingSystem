# Usar la imagen oficial de PHP con Apache
FROM php:7.4-apache

# Copiar el código de la aplicación al directorio de Apache
COPY ./app /var/www/html/

# Instalar inotify-tools
RUN apt-get update && apt-get install -y inotify-tools

# Habilitar la extensión de MySQL
RUN docker-php-ext-install mysqli

# Instalar extensiones PHP necesarias
RUN docker-php-ext-install pdo_mysql

# Establecer permisos adecuados
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html 
