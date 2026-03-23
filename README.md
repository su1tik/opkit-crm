# OpKit CRM - Fullstack Task Management (React + NestJS)

Тестовое задание для Circle Creative Buro. Мини-CRM с real-time обновлением задач.

## Стек технологий

- **Backend:** NestJS, TypeScript, Prisma ORM, PostgreSQL.
- **Real-time:** WebSockets (Socket.io).
- **Frontend:** React, Vite, TypeScript, Zustand (State Management), Axios.
- **Infrastructure:** Docker Compose (PostgreSQL, Redis).

## Особенности реализации

- **Auth:** JWT-авторизация с защитой роутов через Guard. Пароли хешируются через `bcrypt`.
- **Clean Architecture:** Четкое разделение на слои (DTO, Services, Controllers, Gateways).
- **Real-time:** При изменении статуса задачи сервер транслирует событие всем подключенным клиентам. Фронтенд обновляет стейт без перезагрузки.
- **Type Safety:** Полная типизация на фронте и бэке.

## Как запустить

### 1. База данных

В корне проекта запустите Docker:

```bash
docker-compose up -d
```

### 2. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```
