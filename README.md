# Dev Setup
## 1. server ( Node js + Typescript )
```bash
cd server
```

```bash
touch .env.development
```

example development environment variables
```env
NODE_ENV=development
PORT=8080

CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_NAME=employee_db_development
```

if postgres service is no available on your machine
run to spin postgres service up
```bash
docker compose -up -d
```

## start dev servce
```bash
npm i
npm run start:dev
```

# 2. Client ( React + Typescript )

```bash
cd client
```

```bash
npm i
npm run dev
```
