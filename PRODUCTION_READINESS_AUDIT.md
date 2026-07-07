# Comfi Health Production Readiness Audit

Audit date: 2026-07-02  
Previous audit: 2026-06-05  
Scope: Next.js App Router routes, route handlers, components, auth/admin flow, Paystack flow, Resend/email flow, Prisma schema, deployment config, and validation commands.

## Executive Verdict

**Final verdict: Not ready for live customer payments — conditionally ready for staging with Paystack test keys.**

The codebase builds, lints, and tests cleanly. Several critical issues from the 2026-06-05 audit are **resolved** (see [Resolved Since Last Audit](#resolved-since-last-audit)). Core payment security (server-side pricing, Paystack verification, webhook signatures, HMAC receipt links) and admin authorization (`User.role === ADMIN` in the database) are in place.

**Launch blockers that remain are operational, not code-quality:**

1. Production env vars, migrations, and hosting must be configured on the target platform.
2. Paystack webhook must be registered and smoke-tested on the production URL.
3. Upstash Redis should be configured before relying on rate limits in serverless production.
4. End-to-end smoke tests from [`PRE_LAUNCH_CHECKLIST.md`](./PRE_LAUNCH_CHECKLIST.md) must pass.
5. Customer account isolation is still absent — acceptable for guest checkout only; not acceptable if customer dashboards are required.

| Launch stage | Ready when |
|---|---|
| **Staging / test payments** | Infra configured, `npm run db:deploy`, Paystack test webhook, Phase 7 smoke tests pass |
| **Live payments** | Above + Paystack live keys + monitoring + regional pharmacy compliance review |

## Validation Results

Commands run on 2026-07-02 against the current working tree:

| Check | Result |
|---|---|
| `npm test` | Passed: 6 files, 15 tests |
| `npx prisma validate` | Passed |
| `npm run lint` | Passed (0 warnings) |
| `npm run build` | Passed (Next.js 16.2.7 production build) |

CI (`.github/workflows/ci.yml`) runs `prisma generate` → lint → test → build on push/PR to `main` / `master`. There is **no automated deploy workflow** yet.

## Resolved Since Last Audit

The following items from the 2026-06-05 audit are **fixed** in the current codebase:

| ID | Issue | Resolution |
|---|---|---|
| C1 | Real Resend key in `.env.example` | Placeholder `re_replace_me` in `.env.example` |
| C2 | Public `/api/emails` relay | Route removed; only purpose-built mail in `lib/email.ts` |
| C3 | No `user.role === "ADMIN"` model | `User` model + `UserRole` enum; `lib/auth.ts` checks DB role |
| C4 | Dashboard links visible to non-admins | `AdminHeaderLink` renders only for admins |
| H2 | Duplicated payment crypto helpers | Single source: `lib/payment-security.ts` (re-exported from `lib/payments.ts`; tests cover it) |
| H4 | Homepage fetched entire catalog | Bounded queries: `take: 20` catalog + separate featured query |
| H5 | Admin low-stock filter incorrect | Field comparison via Prisma `quantity <= lowStock` in admin API; raw SQL on inventory page |
| H6 | Inventory showed fake expiry dates | Uses `product.expiryDate` from database |
| H7 | Rx products addable to cart | UI blocks add/buy; server rejects at checkout |
| H8 | Hero CTA unsafe protocols | `lib/validation.ts` allows `/…` paths or `https:` only |
| M1 | `POST /api/products` mixed with public GET | `GET /api/products` is read-only; mutations under `/api/admin/products` |
| M2 | Product detail API had no rate limit | `rateLimitRequest` on `GET /api/products/[id]` |
| M8 | Lint warnings in `HeroSlidesClient.tsx` | Lint passes with 0 warnings |
| M9 | `/shop-page` was a stub | Full searchable catalog with pagination |
| — | Stack sign-in redirected to `/dashboard` | `afterSignIn` / `afterSignUp` → `/` in `stack/client.tsx` |
| M7 | Stale Prisma client under `app/generated/` | Generated client lives at `generated/db/` only |

## Critical Issues (Remaining)

### C1. Customer Data Isolation Is Not Modeled

Files: `prisma/schema.prisma`, `lib/payments.ts`, `app/order-success/page.tsx`

**Problem:** Orders are guest/email-based. The `User` table stores admin/staff roles but there is no `customerId` on `Order`, and no customer order history, profile, address, or prescription APIs.

**Risk:** The platform cannot enforce "User A can only see User A's data" for customer-facing dashboards. Receipt links are protected by HMAC tokens, which is sufficient for guest checkout but not for account-based experiences.

**Recommended fix:** Add `customerId` on `Order` and scope customer queries with `WHERE customerId = session.user.id` before exposing any customer dashboard.

**Launch impact:** Blocker only if customer accounts are in scope. **Not a blocker** for guest checkout + signed receipt links.

### C2. Rate Limiting Is Weak Without Upstash

Files: `lib/rate-limit.ts`, `lib/request-security.ts`

**Problem:** Without `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, rate limits use in-memory buckets per instance. With `RATE_LIMIT_TRUST_PROXY_HEADERS=false`, all clients share the identifier `"shared"`.

**Risk:** Attackers can bypass per-instance limits on serverless; legitimate users may hit global throttles on a single instance.

**Recommended fix:** Configure Upstash before production traffic. Optionally require Upstash in `assertProductionEnv()` and set `RATE_LIMIT_TRUST_PROXY_HEADERS=true` when the host sets trusted forwarding headers.

**Launch impact:** Blocker for production at meaningful traffic. Acceptable for a low-traffic staging deploy.

## High Priority Issues

### H1. Payment Order Rows Are Created Before Verification

File: `lib/payments.ts` (~line 297+)

**Problem:** A pending `Order` (and `PaymentTransaction`) is created before Paystack initialization and before successful verification. Paid state and stock decrement happen after server-side verification.

**Risk:** Abandoned or failed checkouts leave `pending` rows in admin order lists and reporting.

**Recommended fix:** Introduce a `CheckoutSession` model, or filter admin views to paid orders only. Document the current behavior for support staff.

### H2. No Production Error Monitoring

**Problem:** No Sentry, Datadog, or equivalent is wired. Failed webhooks, checkout errors, and email failures are only visible in host logs.

**Risk:** Payment or fulfillment incidents may go unnoticed.

**Recommended fix:** Add error reporting before live payments. Alert on Paystack webhook failures and checkout 5xx rates.

### H3. Health Check Does Not Verify Dependencies

File: `app/api/health/route.ts`

**Problem:** Returns `{ status: "ok" }` without pinging Postgres or Redis.

**Risk:** Load balancers may route traffic to instances with a broken database connection.

**Recommended fix:** Add optional DB `SELECT 1` (and Upstash ping if configured) with a degraded status response.

### H4. Sign-In Page Exposes Admin Setup Details In Production

File: `app/sign-in/SignInClient.tsx`

**Problem:** When `reason=not-admin`, the page shows the user's Stack ID and a SQL `UPDATE` snippet for promoting to admin.

**Risk:** Information disclosure on a public URL; useful in dev, unnecessary in production.

**Recommended fix:** Gate the debug block behind `NODE_ENV !== "production"` or remove it for production builds.

### H5. Admin Bootstrap Still Depends On Env Allowlist

Files: `lib/auth.ts`, `lib/admin-access.ts`

**Problem:** Admin role is stored in the DB (`User.role === ADMIN`), but first-time promotion still uses `ADMIN_USER_IDS` / `ADMIN_EMAILS`. On DB errors, `isAdminUser` falls back to the env allowlist.

**Risk:** Operational coupling to env vars; fallback could grant admin if DB is down and user is allowlisted.

**Recommended fix:** Treat DB role as source of truth after bootstrap. Remove allowlist fallback on DB errors in production, or fail closed.

### H6. Prescription Workflow Is Incomplete

Files: `app/products/ProductDetailsClient.tsx`, `lib/payments.ts`

**Problem:** Rx-required products are blocked in UI and at checkout, but there is no prescription upload, pharmacist review, or fulfillment workflow.

**Risk:** Acceptable only if Rx products are not sold online yet. Required before enabling `prescriptionRequired` products in production.

### H7. CSP Still Allows Inline Scripts

File: `next.config.ts`

**Problem:** Production CSP includes `script-src 'self' 'unsafe-inline' …` for Stack Auth and Paystack compatibility.

**Risk:** Higher XSS impact if an injection bug appears.

**Recommended fix:** Move to nonce/hash-based CSP when compatible with third-party scripts.

## Medium Priority Issues

### M1. Global Product SKU Uniqueness

File: `prisma/schema.prisma` — `sku @unique`

**Problem:** SKU is globally unique, not unique per seller (`userId`).

**Risk:** Two admins cannot share the same manufacturer SKU. Fine for single-tenant; problematic for multi-seller.

### M2. Hero Slides Are Global

Files: `prisma/schema.prisma`, `app/api/admin/hero-slides/*`

**Problem:** No owner/tenant field. Any admin manages global storefront slides.

**Risk:** Acceptable for a single-tenant store; unsafe for multi-admin separation.

### M3. Upload Validation Trusts MIME Metadata

Files: `app/api/admin/uploads/route.ts`, `lib/storage.ts`

**Problem:** Server checks `file.type` and size, not magic bytes or image decoding.

**Risk:** Mislabeled non-image content could be stored in public object storage.

### M4. Image/CSP Policy Is Broad

Files: `next.config.ts`, `lib/image-url.ts`

**Problem:** CSP allows `img-src https:`; remote product images may bypass Next image optimization.

**Risk:** Privacy and performance exposure from arbitrary remote hosts.

### M5. Proxy Middleware Checks Session Only, Not Role

File: `proxy.ts`

**Problem:** Admin page paths require a Stack session cookie but not `ADMIN` role. Server components call `requireAdminUser()` afterward.

**Risk:** Non-admins with a session briefly hit admin routes before redirect. APIs are not covered by proxy at all (they rely on handler checks).

### M6. Documentation Drift

Files: `PRE_LAUNCH_CHECKLIST.md`, `DEPLOYMENT.md`

**Problem:** Checklist references 5 migrations (there are 9). `DEPLOYMENT.md` uses outdated env names (`NEXTAUTH_*`, `AWS_*`, `RESEND_FROM_EMAIL`).

**Risk:** Deploy mistakes from following stale docs.

### M7. No Automated Deploy Pipeline

**Problem:** CI validates code but does not deploy. Deploy is manual.

**Risk:** Human error during releases.

## Authentication And Authorization Audit

**Current state:**

- Stack Auth in `stack/client.tsx` and `stack/server.tsx`.
- `User` table with `UserRole` enum (`USER` | `ADMIN`); migration `20260605234952_add_user_role_model`.
- `isAdminUser()` provisions users on first login and checks `existing.role === UserRole.ADMIN`.
- Env allowlist (`ADMIN_USER_IDS` / `ADMIN_EMAILS`) promotes users to `ADMIN` on login.
- Admin pages call `requireAdminUser()`; admin APIs call `getAdminUserOrNull()`.
- Proxy checks Stack session cookie on admin **page** paths only.
- No server actions.

**Remaining gaps:**

- Sign-in debug UI exposes user ID in production (`SignInClient.tsx`).
- `safeRedirectPath` defaults to `/dashboard` when `after` param is invalid — non-admins bounce through admin redirect flow.
- Proxy does not enforce role (server-side checks compensate).

**Admin invariant (implemented):**

```ts
// lib/auth.ts — enforced via DB role after provisioning
return existing.role === UserRole.ADMIN;
```

## Dashboard Visibility Audit

| Surface | Status | Notes |
|---|---|---|
| Public header | **Pass** | `AdminHeaderLink` renders Dashboard only for admins |
| Admin sidebar | OK | Rendered inside admin pages after `requireAdminUser()` |
| Dashboard quick actions | OK | Contained inside `/dashboard` |
| Mobile menu | N/A | No mobile nav |
| Stack redirect | **Pass** | After sign-in/sign-up → `/` |

## User Isolation Audit

| Data Type | Current Behavior | Isolation Status |
|---|---|---|
| Admin products | Filtered by `userId` | OK |
| Admin orders | Filtered by `sellerId: user.id` | OK |
| Public products | Active listings only | OK |
| Receipts/order success | Reference + HMAC receipt token | Link-based, not account-based |
| Customer orders | No `customerId`; email on order | Missing for accounts |
| Prescriptions | No model/API | Missing |
| Addresses/profile/medical records | No model/API | Missing |
| Hero slides | Global | OK for single-tenant |

## Route Protection Matrix

| Route | Type | Protection | Notes |
|---|---|---|---|
| `/` | Public | None | Bounded product queries (`take: 20`) |
| `/cart` | Public | None | Client cart / localStorage |
| `/products/[id]` | Public | Active listing check | |
| `/shop-page` | Public | None | Search + pagination |
| `/privacy`, `/terms` | Public | None | Static |
| `/sign-in` | Public | Stack UI | Admin-oriented; exposes setup info when blocked |
| `/handler/[...stack]` | Auth | Stack handler | |
| `/order-success` | Signed link | Receipt HMAC | Finalizes payment if unpaid |
| `/dashboard`, `/inventory`, `/orders`, `/add-products` | Admin | `requireAdminUser()` + proxy session | DB role check |
| `/inventory/hero-slides` | Admin | Same | Global hero content |
| `GET /api/health` | Public | None | Shallow OK check |
| `GET /api/products` | Public | Rate limit | Read-only |
| `GET /api/products/[id]` | Public | Rate limit + active listing | |
| `GET /api/products/public` | Public | Rate limit | Overlaps with `/api/products` |
| `GET/POST /api/admin/products` | Admin | Rate limit + `getAdminUserOrNull()` | POST creates products |
| `GET/PATCH/DELETE /api/admin/products/[id]` | Admin | Admin + ownership | |
| `POST /api/admin/uploads` | Admin | Origin + rate limit + admin | MIME check only |
| `GET/POST/PATCH/DELETE /api/admin/hero-slides/*` | Admin | Admin + origin/rate limit on mutations | Global slides |
| `POST /api/paystack` | Public mutation | Origin + JSON + rate limit | Server-side pricing |
| `GET /api/paystack/verify` | Signed link | Receipt token + rate limit | |
| `POST /api/paystack/webhook` | External | Paystack signature + rate limit | |
| ~~`POST /api/emails`~~ | — | **Removed** | Was critical; no longer exists |

## Payment Audit

**Strengths:**

- Checkout validates JSON, same origin, and rate limits.
- Server computes prices from database, not client amounts.
- Paystack verification is server-side.
- Webhook validates `x-paystack-signature`.
- Finalization verifies reference, status, amount, and currency.
- Stock decrement uses conditional `updateMany` (`quantity >= item.quantity`).
- Receipt links are HMAC-signed via `lib/payment-security.ts`.

**Remaining risks:**

- Pending order rows before verification (H1).
- Receipt email failure is swallowed (orders still complete; needs monitoring).
- No delivery address, phone, or fulfillment workflow.

## Email Audit

**Strengths:**

- Purpose-built `sendOrderReceiptEmail` in `lib/email.ts`.
- Missing Resend config does not block paid order finalization.
- No public email relay endpoint.

**Remaining risks:**

- No tests for email payload generation without sending.
- Rotate Resend keys if a real key was ever committed to git history (even if `.env.example` is now clean).

## Database Audit

**Current schema strengths:**

- `User` model with `UserRole` enum.
- Decimal money columns (`@db.Decimal(12, 2)`).
- Unique payment/order references.
- Product/order indexes for admin and storefront queries.
- Trigram search migration (`20260608230000_add_product_search_trgm`).
- Order items cascade on delete.

**Migrations (9 total):**

1. `20260517173657_init`
2. `20260520195000_add_product_details`
3. `20260527220000_add_orders_and_product_indexes`
4. `20260528100000_harden_payments_and_indexes`
5. `20260531164759_comfort_health`
6. `20260603142244_add_hero_slide`
7. `20260605234952_add_user_role_model`
8. `20260608230000_add_product_search_trgm`
9. `20260614153000_add_product_dosage_guide`

**Recommended future improvements:**

```prisma
model Order {
  customerId String?
  customer   User?   @relation(fields: [customerId], references: [id])
  @@index([customerId, createdAt])
}

// Optional: per-seller SKU
@@unique([userId, sku])
```

## Security Audit Summary

| Area | Status |
|---|---|
| Secrets in repo | OK in `.env.example` (placeholders); verify git history if keys were ever committed |
| Admin authorization | OK — DB `UserRole.ADMIN` + env bootstrap |
| Admin APIs | Protected via `getAdminUserOrNull()` |
| Customer isolation | Missing — OK for guest checkout only |
| CSRF/origin | Good on JSON mutations |
| XSS | React escaping + CSP; `unsafe-inline` scripts; hero CTA restricted |
| Open redirect | Sign-in `after` blocks external paths |
| Rate limiting | Present; production-strength requires Upstash |
| Webhooks | Paystack signature validation |
| Data validation | Zod on products, payments, admin inputs |
| Raw SQL | Parameterized `$queryRaw`; static `$executeRawUnsafe` only |

## Environment Variables

**Required for production startup** (`lib/env.ts` + `instrumentation.ts`):

- `DATABASE_POOL_URL` or `DATABASE_URL`
- `STACK_SECRET_SERVER_KEY`
- `NEXT_PUBLIC_STACK_PROJECT_ID`
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
- `PAYSTACK_SECRET_KEY`
- `ORDER_RECEIPT_SECRET` (must differ from `PAYSTACK_SECRET_KEY`)
- `ADMIN_USER_IDS` and/or `ADMIN_EMAILS`
- `APP_URL`
- `NEXT_PUBLIC_APP_URL`

**Strongly recommended for production:**

- `DATABASE_DIRECT_URL` or `DATABASE_URL_UNPOOLED` (migrations; Neon)
- `ALLOWED_ORIGINS`
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
- `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_URL`
- `S3_ENDPOINT` / `S3_REGION` if not default AWS

**Optional:**

- `RESEND_API_KEY`, `EMAIL_FROM`
- `RATE_LIMIT_TRUST_PROXY_HEADERS`
- `DB_POOL_MAX`, `DB_IDLE_TIMEOUT_MS`, `DB_CONNECTION_TIMEOUT_MS`
- `S3_FORCE_PATH_STYLE`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` (redirect checkout does not require it)

## Deployment Readiness Checklist

| Subsystem | Status | Notes |
|---|---|---|
| Build | **Ready** | `npm run build` passes |
| Tests | **Ready** | 15 unit tests; add integration tests for routes |
| Lint | **Ready** | 0 warnings |
| Env hygiene | **Ready** | Placeholders in `.env.example`; verify git history |
| Auth | **Ready** | DB roles + env bootstrap |
| Admin UI visibility | **Ready** | Admin-only header link |
| Admin APIs | **Ready** | Protected with role checks |
| Customer isolation | **Gap** | OK for guest checkout; not for customer accounts |
| Payments | **Needs ops** | Strong verification; pending rows + smoke tests |
| Webhooks | **Ready (code)** | Register and test in Paystack dashboard |
| Emails | **Ready** | No public relay; Resend optional |
| Database | **Ready (code)** | Run `npm run db:deploy` on production |
| Rate limiting | **Needs Upstash** | In-memory fallback not production-grade |
| Storage | **Needs config** | S3 required for prod uploads; MIME validation could be stronger |
| Monitoring | **Gap** | No Sentry/metrics |
| Healthcare workflows | **Partial** | Rx blocked; no review pipeline |
| CI/CD | **Partial** | CI only; no deploy workflow |

## Architecture Review

**Strengths:**

- Small App Router surface (~30 routes).
- Shared auth helpers across admin pages and APIs.
- Server-only modules for Prisma, payments, email, storage.
- Payment finalization is transactional.
- Production env validation centralized.
- Generated Prisma client outside `app/` (`generated/db/`).
- Shop search extracted to `lib/shop-products.ts`.

**Concerns:**

- No dedicated data-access layer; Prisma queries spread across pages and routes.
- Dual admin bootstrap (env allowlist + DB role).
- Duplicate public product endpoints (`/api/products` vs `/api/products/public`).
- Customer and medical data domains not modeled.
- Direct Stack + Paystack + Resend integration (no Hexclave payments/emails layer).

## Launch Scores

| Category | Score (2026-06-05) | Score (2026-07-02) |
|---|---:|---:|
| Security | 4/10 | **7/10** |
| Performance | 6/10 | **7/10** |
| Scalability | 6/10 | **6/10** |
| Code Quality | 7/10 | **8/10** |
| Deployment Readiness | 7/10 | **6.5/10** (code ready; ops incomplete) |

**Overall:** Not ready for live payments; ready to proceed with staging deploy after infra setup.

## Required Tasks Before Launch

### Before staging deploy

1. Complete [`PRE_LAUNCH_CHECKLIST.md`](./PRE_LAUNCH_CHECKLIST.md) Phases 1–3 (accounts, env vars, `npm run db:deploy`).
2. Register Paystack **test** webhook on staging domain.
3. Configure Upstash Redis on staging.
4. Configure S3-compatible storage for image uploads.
5. Run Phase 7 smoke tests (storefront, test payment, admin denial, health check).

### Before live payments

6. Switch to Paystack **live** keys on the host only when staging is green.
7. Add error monitoring (Sentry or equivalent) and alert on webhook/checkout failures.
8. Gate or remove admin setup debug UI on `/sign-in` in production.
9. Decide on guest-only vs customer accounts; add `customerId` if accounts are required.
10. Decide on Rx product policy; do not sell Rx online until review workflow exists.
11. Consider requiring Upstash in `assertProductionEnv()` for production.
12. Add DB check to `/api/health` (optional but recommended).
13. Update `PRE_LAUNCH_CHECKLIST.md` migration count (9) and align `DEPLOYMENT.md` env names.
14. Add a deploy workflow (Vercel/Railway) or document manual deploy steps.

### Nice to have

15. Consolidate duplicate public product API routes.
16. Introduce `CheckoutSession` or filter admin orders to paid-only.
17. Add route-handler integration tests (admin denial, Paystack mismatch, receipt token).
18. Strengthen upload validation with magic-byte checks.
19. Tighten CSP when Stack/Paystack support nonce-based scripts.
