# Установка

---

Скачать репозиторий

```
git clone https://github.com/traaaaaaader/frontend-test-task-npcirs.git
```

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

1. Перейди в папку сервера:

```
cd fullstack-test-task-npcirs/server
```

2. Запусти в Docker

```
docker-compose up -d
```

---

## Установка и запуск клиента

1. Перейди в папку клиента:

```
cd fullstack-test-task-npcirs/client
```

2. Установи зависимости

```
npm install
bun install
```

3. Запусти клиент

```
npm run dev
bun dev
```
