# Robo-решения — роботизированные платформы

Полноценное приложение с каталогом роботизированных надводных платформ, страницей постов и формой обратной связи.

## Что делает проект

- **Каталог платформ** — компактные роботизированные надводные платформы для экологического мониторинга и поддержки спасательных операций. У каждой платформы: описание, характеристики (масса, скорость, автономность, запас хода, нагрузка, класс защиты), список сменных модулей и галерея изображений.
- **Посты** — новости и истории команды. Карточка с картинкой и подписью, при клике открывается модалка с полным текстом.
- **Форма обратной связи** — заявки с сайта отправляются на почту (пока в консоль Django).
- **Ссылки на фото** — изображения хранятся как прямые URL на внешний хостинг (Imgur, GitHub raw и т.д.), а не как загружаемые файлы.

## Стек

- **Frontend** — React 18, Vite, Tailwind CSS, React Router (HashRouter), lucide-react.
- **Backend** — Django 5, Django REST Framework, django-cors-headers, django-environ, django-filter.
- **База данных** — PostgreSQL 16 (в Docker).
- **Веб-сервер** — nginx, раздаёт статику и проксирует запросы к backend и frontend.
- **SSL** — certbot (Let's Encrypt).
- **Контейнеризация** — Docker Compose.

## Структура

```
.
├── backend/
│   ├── catalog/              # приложение с моделями Robot и Post
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── robo_solutions/       # настройки Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── dockerfile
│   ├── entrypoint.sh
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── assets/
│   ├── dockerfile
│   ├── vite.config.js
│   └── package.json
├── nginx/
│   ├── default.conf
│   ├── default.http.conf
│   ├── dockerfile
│   └── entrypoint.sh
├── docker-compose.yml
├── .env
└── README.md
```

## Запуск через Docker (рекомендуется)

### 1. Создайте `.env` в корне проекта

```dotenv
DJANGO_SECRET_KEY=django-insecure-your-secret-key-change-this-in-production-12345xyz
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,*.local
DJANGO_LOG_LEVEL=INFO
DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost,http://127.0.0.1

DB_NAME=robo_solutions_db
DB_USER=postgres
DB_PASSWORD=postgres123
DB_HOST=db
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:5173,http://localhost

EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=noreply@robo-solutions.ru
```

> ВАЖНО: `.env` должен быть сохранён в **UTF-8 без BOM** и с **LF** (не CRLF). Иначе `psycopg2` упадёт с `UnicodeDecodeError` при подключении к PostgreSQL.

### 2. Соберите и запустите

```bash
docker compose build
docker compose up -d
```

### 3. Примените миграции и создайте суперпользователя

```bash
docker compose exec backend python manage.py makemigrations catalog
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

### 4. Откройте

- Сайт: `http://localhost/`
- Админка: `http://localhost/admin/`
- API каталога: `http://localhost/api/robots/`
- API постов: `http://localhost/api/posts/`
- API формы: `http://localhost/api/send-request/`
- Health-check: `http://localhost/api/health/`

## Запуск для локальной разработки

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/Scripts/activate    # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

В `backend/.env` укажите `DB_HOST=127.0.0.1` (если PostgreSQL проброшен на хост) или работайте через Docker.

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

> Если `psycopg2` падает с `UnicodeDecodeError`, убедитесь, что `.env` сохранён в UTF-8 без BOM и без CRLF. При необходимости задайте `PGUSER` и `PGPASSWORD` явно.

### Frontend

Из корневой папки:

```bash
cd frontend
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173/`. Запросы `/api` и `/media` проксируются на `http://localhost:8000` (см. `vite.config.js`).

## Наполнение каталога и постов

1. Запустите сервер (`docker compose up -d` или `python manage.py runserver`).
2. Откройте админку: `http://localhost/admin/`.
3. **Роботизированные платформы** — раздел «Роботизированные платформы»:
   - Заполните название, краткое и полное описание, категорию.
   - Укажите характеристики: длину, ширину, массу, скорость, автономность, запас хода, нагрузку, дальность управления, ёмкость АКБ, класс защиты, температуру, ветер.
   - Отметьте поддерживаемые модули: видеокамера, датчики качества воды, свето-звуковой маяк, буксировка.
   - В поле `image_url` вставьте **прямую** ссылку на фото (например, `https://i.imgur.com/abc.jpg`).
   - В поле `gallery` — JSON-массив ссылок: `["https://i.imgur.com/1.jpg", "https://i.imgur.com/2.jpg"]`.
4. **Посты** — раздел «Посты»:
   - Заголовок, краткое и полное описание.
   - `image_url` — прямая ссылка на фото.
   - Дата публикации, флаг «Опубликовано», порядок.

Сайт автоматически получит данные через API.

## Про ссылки на фото

Изображения не загружаются на сервер — они хранятся как **прямые URL** на внешний хостинг. Подойдут:

| Хостинг | Формат ссылки |
|---|---|
| Imgur | `https://i.imgur.com/abc123.jpg` |
| GitHub raw | `https://raw.githubusercontent.com/user/repo/main/photo.jpg` |
| Dropbox | `https://www.dropbox.com/s/abc/photo.jpg?raw=1` |
| Google Drive | `https://drive.google.com/uc?export=view&id=FILE_ID` |
| Свой сервер | `https://your-domain.ru/media/photo.jpg` |

Важно: ссылка должна вести **на сам файл**, а не на страницу просмотра. Проверить можно так:

```bash
curl -I "https://i.imgur.com/abc123.jpg"
```

Должно быть `Content-Type: image/jpeg` или `image/png`.

## Остановка и очистка

```bash
docker compose down              # остановить
docker compose down -v           # остановить и удалить volumes (БД и media)
docker compose logs -f backend   # смотреть логи
```

## Продакшен

Для продакшена:

1. Установите `DJANGO_DEBUG=False` в `.env`.
2. Сгенерируйте надёжный `DJANGO_SECRET_KEY`:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
3. Настройте `DJANGO_ALLOWED_HOSTS` и `DJANGO_CSRF_TRUSTED_ORIGINS` под ваш домен.
4. Настройте `CORS_ALLOWED_ORIGINS` под фронтенд-домен.
5. Настройте SMTP для почты (переменные `EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`).
6. Получите SSL-сертификат через certbot:
   ```bash
   docker compose run --rm certbot certonly --webroot \
     -w /var/www/certbot -d your-domain.ru -d www.your-domain.ru \
     --email your@email.ru --agree-tos --no-eff-email
   ```
7. Убедитесь, что в `nginx/default.conf` пути к сертификатам указывают на ваш домен.

## Особенности

- Все команды `manage.py` запускайте **через Docker**: `docker compose exec backend python manage.py ...`. Это гарантирует единое окружение и отсутствие проблем с кодировками Windows.
- `frontend/.dockerignore` не должен исключать `src/assets/*.png` — иначе сборка упадёт с `Could not resolve`.
- Имена файлов в `import` должны совпадать по регистру с реальными файлами. Linux-сборка регистрозависимая.
- Все `.sh`-файлы должны иметь LF-окончания строк. В `dockerfile` стоит `sed -i 's/\r$//'` для страховки.