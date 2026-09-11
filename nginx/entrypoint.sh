#!/bin/sh
set -e

CERT=/etc/letsencrypt/live/grandbiotech.ru/fullchain.pem

if [ -f "$CERT" ]; then
    echo "→ Сертификат найден, используем HTTPS-конфиг"
    cp /etc/nginx/templates-available/default.conf /etc/nginx/conf.d/default.conf
else
    echo "→ Сертификата нет, стартуем с HTTP-конфигом (ACME challenge)"
    cp /etc/nginx/templates-available/default.http.conf /etc/nginx/conf.d/default.conf
fi

nginx -t

exec "$@"