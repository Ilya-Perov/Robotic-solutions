#!/bin/sh
set -e

echo "→ Выравниваем права на volume..."
chown -R appuser:appuser /app/media /app/staticfiles /app/data

echo "→ Ожидаем доступности базы данных..."

# Проверка PostgreSQL
if [ -n "$DB_PASSWORD" ]; then
    until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "\q" 2>/dev/null; do
        echo "   PostgreSQL недоступна, ждем..."
        sleep 1
    done
    echo "✓ PostgreSQL доступна"
fi

# Проверка SQLite (для development)
if [ -f "/app/data/db.sqlite3" ]; then
    echo "✓ SQLite база найдена"
fi

echo "→ Применяем миграции..."
gosu appuser python manage.py migrate --noinput

echo "→ Собираем статику..."
gosu appuser python manage.py collectstatic --noinput --clear

echo "→ Запускаем Gunicorn..."
exec gosu appuser gunicorn prosthetics_shop.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --worker-class sync \
    --worker-tmp-dir /dev/shm \
    --timeout 60 \
    --access-logfile - \
    --error-logfile - \
    --log-level info