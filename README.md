# Template starter

Monorepo-style project with:

- Server (Express + Prisma) at the repo root
- Client (Vue 3 + Vite + PrimeVue) in `client/`

The server serves the built client from `client/dist` in production.

## Prerequisites

- Node.js 20.x (engines enforced)
- npm 10+
- A database for Prisma (e.g., PostgreSQL or SQLite)

## Environment Variables

Create a `.env` file in the project root with at least:

```
DATABASE_URL=your_database_connection_string
NODE_ENV=development
# Optional in production (comma-separated):
ALLOWED_ORIGINS=https://your-domain.com,https://admin.your-domain.com
```

## Install

Install dependencies for both server (root) and client:

```bash
npm run install:all
```

If you prefer manual installation:

```bash
npm ci --include=dev
npm --prefix client ci --include=dev
```

## Development

Run server and client concurrently:

```bash
npm run dev
```

- Server: `tsx watch src/index.ts` on port 3000 (by default)
- Client: Vite dev server on port 5173

## Build

Build both server and client:

```bash
npm run build
```

Artifacts:

- Server output: `dist/`
- Client output: `client/dist/`

## Start (Production)

Start the compiled server (serves static client from `client/dist`):

```bash
npm start
```

## Prisma

Common Prisma commands:

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema changes (dev)
npm run prisma:schema

# Run migrations (prod/CI)
npx prisma migrate deploy

# Seed (if applicable)
npm run prisma:seed

# Prisma Studio
npm run prisma:studio
```

## NPM Scripts (root)

- `install:server`: Install server deps at root
- `install:client`: Install client deps in `client/`
- `install:all`: Install both (recommended)
- `dev`: Run server + client concurrently
- `dev:server`: Server only (watch mode)
- `dev:client`: Client only (Vite)
- `build`: Build server + client
- `build:server`: TypeScript compile (server)
- `build:client`: Vite build (client)
- `start`: Start production server (serves `client/dist`)

## Local Troubleshooting

- If client build fails with `vite: not found`, ensure client devDependencies are installed:
  ```bash
  npm --prefix client ci --include=dev
  ```
- If CORS errors occur in production, set `ALLOWED_ORIGINS` with your domain(s).

## Deployment (DigitalOcean App Platform)

Recommended settings:

- Build Command:
  ```bash
  npm run install:all && npm run build
  ```
- Run Command: (use Procfile or set explicitly)
  ```bash
  npm start
  ```
- Files:
  - `Procfile` at repo root with:
    ```
    web: node dist/index.js
    ```
- Env Vars:
  - `NODE_ENV=production`
  - `DATABASE_URL=...`
  - Optional: `ALLOWED_ORIGINS=https://your-domain.com`
- Optional migration on boot:
  - Add to `package.json`:
    ```json
    {
      "scripts": {
        "prestart": "npx prisma migrate deploy"
      }
    }
    ```

## Project Structure

```
.
├─ src/                 # Server source (Express routes/controllers)
├─ dist/                # Server build output
├─ client/              # Vue app
│  ├─ src/
│  └─ dist/             # Client build output
├─ prisma/              # Prisma schema, migrations, seed
├─ Procfile             # Deployment start definition (web process)
├─ package.json         # Root scripts and deps
└─ README.md
```

## Notes

- The server statically serves `client/dist` and routes non-`/api` paths to `index.html` for SPA routing.
- For local API calls from the client during dev, consider adding a Vite proxy if needed.
