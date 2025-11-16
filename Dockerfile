FROM php:8.2-cli

WORKDIR /app

COPY db ./db
COPY php ./php
COPY imgs ./imgs

EXPOSE 9191

CMD ["php", "-S", "0.0.0.0:9191", "-t", "/app"]

