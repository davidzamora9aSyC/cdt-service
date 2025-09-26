# CDT Service

Microservicio NestJS para gestionar ofertas y operaciones de Certificados de Depósito a Término (CDT). Expone endpoints para ofertas, solicitudes, contratos, movimientos y renovaciones usando Prisma sobre PostgreSQL (esquema `cdt`).

## Requisitos

- Node.js 18+
- PostgreSQL
- Variable `DATABASE_URL` apuntando a la base compartida; Prisma utilizará el esquema `cdt`.

## Instalación

```bash
npm install
```

## Prisma

```bash
# Generar cliente
npx prisma generate

# Crear migración inicial
npx prisma migrate dev --name init
```

## Ejecución

```bash
npm run start:dev
```

## Endpoints clave

- `GET /cdt/offers` – catálogo de ofertas
- `POST /cdt/requests` – crear solicitud de CDT
- `PATCH /cdt/requests/:id/status` – actualizar estado de solicitud
- `POST /cdt/requests/:id/documents` – referenciar soportes
- `POST /cdt/contracts` – registrar contrato
- `GET /cdt/contracts/:id` – detalle del contrato con movimientos/renovaciones
- `POST /cdt/contracts/:contractId/movements` – movimientos monetarios
- `POST /cdt/contracts/:contractId/renewals` – gestionar renovaciones

DTOs disponibles en `src/**/dto` describen requerimientos de payload.
