# Comfi Health

Campus pharmacy storefront built with Next.js 16, Prisma, Stack Auth, and Paystack.

## Local development

```bash
npm install

# Create or update .env.local with your credentials (never commit this file).
# For Neon, use a pooled URL for the app and a direct URL for Prisma tooling:
# DATABASE_POOL_URL="postgresql://...-pooler.../neondb?sslmode=require"
# DATABASE_DIRECT_URL="postgresql://.../neondb?sslmode=require"

npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Neon database

This repo is ready for Neon Postgres:

- Runtime database access uses `DATABASE_POOL_URL` first, then `DATABASE_URL` in `lib/prisma.ts`.
- Prisma CLI commands load `.env.local` and prefer `DATABASE_DIRECT_URL`, then `DATABASE_URL_UNPOOLED`; if only a Neon pooled URL is present, Prisma tooling derives the direct host by removing `-pooler` and adds `connect_timeout=15` for idle Neon computes.
- In Neon Console → Connect, copy the pooled URL with connection pooling enabled for `DATABASE_POOL_URL`; copy the direct URL with pooling disabled for `DATABASE_DIRECT_URL`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:migrate` | Run local Prisma migrations |
| `npm run db:deploy` | Apply migrations in production/CI |
| `npm run db:status` | Check migration status |
| `npm run start` | Run production build |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |

## Deploying to production

**Start here:** [PRE_LAUNCH_CHECKLIST.md](./PRE_LAUNCH_CHECKLIST.md) — ordered steps for env vars, database, Paystack webhook, and smoke tests.

Summary:

1. Configure environment variables on your host.
2. Run `npm run db:deploy` against production Postgres.
3. Register Paystack webhook: `https://your-domain.com/api/paystack/webhook`.
4. Set `ADMIN_USER_IDS` / `ADMIN_EMAILS` after your first Stack Auth admin sign-in.

## Production services

| Service | Env vars | Purpose |
|---------|----------|---------|
| Neon Postgres | `DATABASE_POOL_URL`, `DATABASE_DIRECT_URL` or `DATABASE_URL_UNPOOLED` | App database and Prisma migrations |
| Upstash Redis | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Distributed API rate limiting |
| S3-compatible storage | `S3_*` | Product image uploads |
| Resend | `RESEND_API_KEY`, `EMAIL_FROM` | Order confirmation emails |

Without Upstash, rate limits fall back to per-instance memory (local dev only).  
Without S3, base64 image uploads work in development only.  
Without Resend, orders still complete; no email is sent.

## CI

GitHub Actions runs `prisma generate`, lint, tests, and build on push/PR to `main` / `master`.

- Health endpoint: `GET /api/health`
- Production startup validates required env vars via `instrumentation.ts` and `lib/env.ts`
