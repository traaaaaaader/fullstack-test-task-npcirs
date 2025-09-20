# Установка

---

## Установка и запуск сервера

### Переменные окружения

В папке `server` наодится файл `.env` со следующими переменными:

```env
PORT=5000
ORIGIN=http://localhost:5173

DB_HOST=cinema_db
DB_PORT=5432
DB_NAME=cinema_db
DB_USER=admin
DB_PASSWORD=admin
```

### Установка и запуск сервера

1. Скачать репозиторий

```
git clone https://github.com/traaaaaaader/frontend-test-task-npcirs.git
```

2. Перейди в папку сервера:

```
cd fullstack-test-task-npcirs/server
```

3. Запусти в Docker

```
docker-compose up -d
```

---

## Установка и запуск клиента
