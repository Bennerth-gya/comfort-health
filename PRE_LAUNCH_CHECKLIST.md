# Comfi Health — pre-launch checklist

Use this in order. Check each box before accepting real customer payments.

**Local setup:** create `.env.local` and fill in real values there only.

---

## Phase 0 — Secret hygiene (do this first if `.env.example` ever had real keys)

If Google OAuth or Paystack keys were ever committed to git (even in `.env.example`):

- [ ] **Google OAuth:** [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → rotate the **client secret**; update host + `.env.local`
- [ ] **Paystack:** [Paystack dashboard](https://dashboard.paystack.com) → Settings → API Keys → **roll** test/live secret keys; update host + `.env.local`
- [ ] Generate a new `ORDER_RECEIPT_SECRET`: `openssl rand -hex 32`
- [ ] Confirm `.env.local` is **not** tracked: `git check-ignore -v .env.local` should show a match
- [ ] Scrub git history if keys were pushed to a public remote (GitHub secret scanning, `git filter-repo`, or new keys only)

---

## Phase 1 — Accounts & infrastructure

- [ ] **Postgres** provisioned (Neon recommended; Supabase/Railway also work)
- [ ] If using Neon: copy a pooled connection string for app runtime and a direct connection string for Prisma migrations
- [ ] **Hosting** chosen (Vercel, Railway, Fly.io, etc.) with Node 20+
- [ ] **Google OAuth client** created; redirect URIs include `https://your-domain.com/api/auth/callback/google` + `http://localhost:3000/api/auth/callback/google` for dev
- [ ] **Paystack** account verified; decide test vs live keys for this deploy
- [ ] **Upstash Redis** database created (recommended for production rate limits)
- [ ] **S3-compatible storage** (R2 / S3) + public CDN URL for product images
- [ ] **Resend** (optional) domain verified for `EMAIL_FROM`

---

## Phase 2 — Environment variables on host

Set all of these in the hosting dashboard (not in git). Match the names in this checklist and the README.

### Required (app will fail startup in production without these)

- [ ] `DATABASE_POOL_URL` for app runtime, or `DATABASE_URL` if your provider has only one Postgres URL
- [ ] `DATABASE_DIRECT_URL` or `DATABASE_URL_UNPOOLED` for Prisma migrations/admin tasks (recommended for Neon; Prisma tooling can derive the direct host from a Neon pooled URL if this is missing)
- [ ] `AUTH_SECRET`
- [ ] `AUTH_GOOGLE_ID`
- [ ] `AUTH_GOOGLE_SECRET`
- [ ] `PAYSTACK_SECRET_KEY`
- [ ] `ORDER_RECEIPT_SECRET` (must ≠ `PAYSTACK_SECRET_KEY`)
- [ ] `ADMIN_USER_IDS` and/or `ADMIN_EMAILS` (Google sign-ins are matched by email)

### Required for correct URLs & API security

- [ ] `APP_URL` = `https://your-production-domain.com` (no trailing slash)
- [ ] `NEXT_PUBLIC_APP_URL` = same as `APP_URL`
- [ ] `ALLOWED_ORIGINS` = same origin (comma-separate if you have multiple)

### Strongly recommended for production

- [ ] `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
- [ ] `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_URL`
- [ ] `S3_ENDPOINT` / `S3_REGION` if not default AWS
- [ ] Set `S3_PUBLIC_URL` at **build time** too if you use Next image optimization for CDN hostnames

### Optional

- [ ] `RESEND_API_KEY` + `EMAIL_FROM`
- [ ] `RATE_LIMIT_TRUST_PROXY_HEADERS=true` only if your host sets trusted `X-Forwarded-For` / `CF-Connecting-IP`
- [ ] `DB_POOL_MAX`, `DB_IDLE_TIMEOUT_MS`, `DB_CONNECTION_TIMEOUT_MS` tuned for your plan

### Paystack note

`NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is documented for hosted/inline flows; this app uses **redirect checkout** (`authorization_url`). You may still set it for future use.

---

## Phase 3 — Database

For Neon, use the direct, non-pooled URL for migration commands when available. The app itself should use the pooled URL (`DATABASE_POOL_URL`) to handle concurrent web requests.

- [ ] From CI machine or host shell with database env vars set:
  ```bash
  npm run db:status
  npm run db:deploy
  ```
- [ ] Confirm migrations applied (5 migrations under `prisma/migrations/`)
- [ ] **Do not** run `prisma/seed.ts` on production unless intentional

---

## Phase 4 — Paystack

- [ ] Webhook URL registered in Paystack dashboard:
  ```text
  https://your-domain.com/api/paystack/webhook
  ```
- [ ] Test webhook delivers `charge.success` (Paystack dashboard → Webhooks → test)
- [ ] Callback URL uses your domain (`APP_URL` drives order-success redirect)
- [ ] For **live** money: switch to `pk_live_` / `sk_live_` keys on host only when ready

---

## Phase 5 — NextAuth (Google)

- [ ] Production domain added to the Google OAuth client's authorized redirect URIs
- [ ] Callback route works: `https://your-domain.com/api/auth/callback/google`
- [ ] Sign-in works: `https://your-domain.com/sign-in`
- [ ] Admin Google address listed in `ADMIN_EMAILS` (non-admins are sent to `/sign-in?reason=not-admin`)

---

## Phase 6 — Deploy application

- [ ] `npm run build` succeeds locally with production-like env (or rely on CI)
- [ ] Deploy latest `main` / release branch
- [ ] `postinstall` runs `prisma generate` on host
- [ ] Production runtime passes `assertProductionEnv()` (see `instrumentation.ts`)

---

## Phase 7 — Smoke tests (production URL)

### Storefront

- [ ] Homepage loads (hero, products, no black screen)
- [ ] Product detail page loads images
- [ ] Add to cart → cart page → enter email → Pay with Paystack

### Payment (use Paystack **test** card first)

- [ ] Checkout redirects to Paystack
- [ ] Complete payment → redirect to `/order-success?reference=...&receipt=...`
- [ ] Order shows paid; stock decremented in admin inventory
- [ ] Webhook received (check Paystack logs + `payment_transaction` row)

### Admin

- [ ] Non-admin user cannot access `/dashboard` (403 or redirect)
- [ ] Admin can sign in, open inventory, add/edit product
- [ ] Image upload works (`POST /api/admin/uploads`) with S3 configured
- [ ] Sign out / session behavior acceptable

### Health & ops

- [ ] `GET /api/health` returns `{ "status": "ok" }`
- [ ] Logs accessible on host for failed checkouts / webhooks

---

## Phase 8 — Post-launch monitoring (first 48 hours)

- [ ] Watch Paystack dashboard for failed charges
- [ ] Watch host logs for `Failed to process Paystack webhook`
- [ ] Confirm rate limiting not blocking real users (429s on `/api/paystack`)
- [ ] Backup strategy for Postgres (provider snapshots)

---

## Quick reference

| Check | Command / URL |
|-------|----------------|
| Tests | `npm test` |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Health | `GET /api/health` |
| Migrations | `npx prisma migrate deploy` |

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs generate → lint → test → build on push/PR to `main` / `master`.

---

## Launch verdict

| Stage | Ready when |
|-------|------------|
| **Staging / test payments** | Phases 0–7 complete with Paystack **test** keys |
| **Live payments** | Above + Paystack **live** keys + legal/compliance review for pharmacy sales in your region |
