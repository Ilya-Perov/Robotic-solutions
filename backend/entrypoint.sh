#!/bin/sh
set -e

echo "→ Применяем миграции..."
python manage.py migrate --noinput

echo "→ Собираем статику..."
python manage.py collectstatic --noinput

echo "→ Запускаем Gunicorn..."
exec gunicorn prosthetics_shop.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --timeout 60 \
    --access-logfile - \
    --error-logfile -