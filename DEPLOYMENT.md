# Deployment checklist and staging runbook for Comfi

This document is a concise, actionable guide to get `comfi` production-ready and to operate a staging environment.

## Minimal prerequisites
- Codebase builds locally: `npm ci && npm run build`
- Tests pass: `npm test`
- `prisma migrate` and `prisma generate` are runnable against CI/staging DB
- Secrets management available (GitHub Secrets, Vault, or environment platform)

## Local environment setup

### 1. Install dependencies
```bash
npm ci
npx prisma generate
```

### 2. Set up PostgreSQL database (choose one)

**Option A: Local Docker (fastest for development)**
```bash
docker run --name comfi-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=comfi \
  -p 5432:5432 \
  -d postgres:16
```

**Option B: Managed services (recommended for staging/production)**
- **Neon** (serverless): `npx create-db` or create at https://console.neon.tech
- **Railway**: https://railway.app/ (includes free tier)
- **Vercel Postgres**: https://vercel.com/docs/storage/postgres
- **AWS RDS**: via CloudFormation or Terraform (see IaC section)

### 3. Configure `.env.local`
Create or update `.env.local` in the project root:

```bash
# Database (replace with your actual connection string)
DATABASE_URL=postgresql://postgres:password@localhost:5432/comfi
# Optional: use a separate pooled connection for serverless
DATABASE_POOL_URL=postgresql://postgres:password@localhost:5432/comfi

# Stack Auth (from https://app.stack-auth.com)
NEXT_PUBLIC_STACK_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=<your-publishable-key>
STACK_SECRET_SERVER_KEY=<your-secret-key>

# Paystack (from https://dashboard.paystack.com)
PAYSTACK_SECRET_KEY=sk_test_<your-test-key>
NEXT_PUBLIC_PAYSTACK_KEY=pk_test_<your-test-key>
ORDER_RECEIPT_SECRET=<random-secret-for-order-signing>

# Email (Resend)
RESEND_API_KEY=<your-resend-key>
RESEND_FROM_EMAIL=noreply@yourdomain.com

# AWS S3 (if using S3 for product images)
AWS_S3_BUCKET=<your-bucket-name>
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
AWS_REGION=us-east-1

# Redis (if using Upstash for rate limiting)
UPSTASH_REDIS_REST_URL=<your-redis-url>
UPSTASH_REDIS_REST_TOKEN=<your-redis-token>
```

### 4. Run database migrations
```bash
npm run db:migrate
```
This creates tables and applies all pending migrations from `prisma/migrations/`.

### 5. (Optional) Seed the database
If a seed script exists in `prisma/seed.ts`:
```bash
npx prisma db seed
```

### 6. Start development server
```bash
npm run dev
```
App runs at `http://localhost:3000`.

### 7. (Optional) Run tests locally
```bash
npm test        # run once
npm run test:watch  # watch mode
```

---

### Troubleshooting local setup
- **`DATABASE_URL` not set**: Check `.env.local` or use `DATABASE_POOL_URL` for serverless.
- **Prisma client not generated**: Run `npx prisma generate` before `npm run dev`.
- **Port 5432 in use**: Change Docker port `-p 5433:5432` or kill the existing process.
- **Migrations fail**: Check DB user permissions; ensure you can connect with `psql` or a client.

---

## Required production items (high priority)
- **API contract**: Backend team provides OpenAPI/contract tests and versioning.
- **Auth & sessions**: OAuth/JWT/session strategy documented and tested.
- **Database**: Managed Postgres with backups, point-in-time restore, and a tested migration strategy.
- **Payments**: Paystack keys and webhooks verified in staging; PCI scope minimized.
- **Secrets**: Store `DATABASE_URL`, `PAYSTACK_SECRET_KEY`, `RESEND_API_KEY`, S3 credentials, `NEXTAUTH_SECRET`, and any `NEXT_PUBLIC_` client keys in secrets store.

## Environment variables (example)
- `DATABASE_URL` (production DB)
- `NEXTAUTH_URL` (if using NextAuth or similar)
- `PAYSTACK_SECRET_KEY` (server-side)
- `NEXT_PUBLIC_PAYSTACK_KEY` (client-side publishable key)
- `RESEND_API_KEY` or equivalent
- `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (if using S3)
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (if used)

## CI/CD recommendations (GitHub Actions)
- Keep `build` + `test` required for PRs (see `.github/workflows/ci.yml`).
- Protect `main` branch; require PRs and review approvals.
- Deploy main → staging automatically, main tags/releases → production (canary/blue-green).
- Require a manual approval job before production deploy.

## Hosting options (pick one)
- Vercel (recommended for Next.js): handles builds, edge functions, image optimization, TLS, and default CI integration.
- Self-hosted container (Docker → Kubernetes or ECS): use Dockerfile, push to registry, deploy with IaC (Terraform) + GitHub Actions.
- Traditional VM: build on CI, rsync/SSH or use CI runner + systemd service.

## Example quick GitHub Actions flow
- `pull_request`: run lint, test, build (fail early)
- `push` to `main`: run full pipeline and create an artifact
- `deploy` job: run after `build`; gated by `environment: staging` or `production` approvals

## Staging runbook (concise)
1. Merge feature branch to `staging` (or push to `main` if using branch-per-environment).
2. CI builds and deploys to the staging host (Vercel or infra). Wait for successful workflow.
3. Run smoke tests: visit `/health` (implement if missing), create test order, exercise payment flow in sandbox, verify emails.
4. Run database migrations on staging: `npm run db:migrate` (or `prisma migrate deploy`) as part of CI with a backup.
5. Validate observability: logs, Sentry/Resend/metrics available.
6. If tests fail, rollback: redeploy previous artifact (Vercel has rollback; for custom infra, re-deploy previous image tag).

## Production deployment runbook (concise)
1. Create a release candidate (tag) and open a PR to `main` if not merged.
2. Run CI in `main` — require all checks passing. Manual approval required for production job.
3. Take DB backup and/or snapshot. Ensure migrations are reversible when possible.
4. Run production migrations (prefer `prisma migrate deploy`) in a maintenance window if needed.
5. Deploy artifact to production; monitor deploy logs.
6. Run post-deploy smoke checks (health endpoint, a sample read/write, payment flow dry-run where possible).
7. If incident, follow rollback: redeploy previous artifact, restore DB from backup if necessary.

## Health checks & monitoring
- Add a simple `/health` or `/api/health` endpoint returning service, DB, and cache status.
- Configure Sentry or equivalent for error reporting.
- Configure Prometheus/Grafana, or use hosted metrics (Datadog, New Relic).
- Set alerts for high error rate, high latency, or high CPU/memory.

## Security & compliance
- Run dependency scans (Snyk, GitHub Dependabot) and SCA in CI.
- Add a WAF or cloud provider managed protection.
- Rate limit sensitive endpoints; implement CSRF protection where needed.
- For payments: log minimal transaction data; ensure webhook secrets are validated.

## Rollback & incident basics
- Keep last successful artifact available in the registry or via Vercel history.
- Have playbooks for: database restore, rolling back deployment, revoking compromised secrets.
- Maintain a public/status page or internal incident channel.

## Post-deploy checklist
- Confirm build and deploy job finished green.
- Run integration smoke tests (end-to-end flows).
- Verify error rate is normal, and critical metrics are within SLO.
- Check logs for exceptions in the last 15 minutes.

---

If you want, I can:
- Add a production-ready GitHub Actions `deploy` job for Vercel (requires `VERCEL_TOKEN` and `VERCEL_ORG_ID/PROJECT_ID`).
- Scaffold a Terraform skeleton (IaC) for a simple AWS deployment (RDS, S3, ECS/EC2) and a `Makefile` for local ops.
- Add a simple `/api/health` endpoint and a small smoke-test script.

Which of these would you like me to implement next?