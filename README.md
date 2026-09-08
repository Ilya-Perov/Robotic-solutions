py# Forma — магазин протезов

Полноценное приложение с каталогом протезов и формой обратной связи.

## Структура

- `src/` — React-приложение на Vite и Tailwind CSS.
- `backend/` — Django-проект с Django REST Framework.
- `backend/media/` — загружаемые изображения из каталога.
- `backend/db.sqlite3` — база данных каталога.

## Запуск backend

```bash
cd backend
python3 -m venv .venv
source .venv/scripts/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

Админка каталога: `http://localhost:8000/admin/`

API каталога: `http://localhost:8000/api/prostheses/`

API формы: `http://localhost:8000/api/send-request/`

Почта пока выводится в консоль Django. Когда будут готовы настройки компании, раскомментируйте SMTP-параметры в `backend/prosthetics_shop/settings.py`.

## Запуск frontend

Из корневой папки проекта:

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173/`. Запросы `/api` и `/media` автоматически проксируются на Django-сервер `http://localhost:8000`.

## Наполнение каталога

1. Запустите Django-сервер.
2. Откройте админку.
3. Создайте записи в разделе «Протезы» и загрузите изображения.
4. Каталог на сайте автоматически получит данные из API.

Если каталог пока пуст, сайт показывает демонстрационные карточки, чтобы интерфейс был доступен для просмотра до заполнения админки.
