This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# comfort-health

## Production launch notes

Before accepting real orders, configure these environment variables in your host:

- `DATABASE_URL`
- `DATABASE_POOL_URL` when your database provider exposes a pooled connection endpoint
- `APP_URL` and `NEXT_PUBLIC_APP_URL`
- `ALLOWED_ORIGINS`
- `NEXT_PUBLIC_STACK_PROJECT_ID`
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
- `STACK_SECRET_SERVER_KEY`
- `ADMIN_USER_IDS` and/or `ADMIN_EMAILS`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_SECRET_KEY`
- `ORDER_RECEIPT_SECRET`

Run database migrations before deploying:

```bash
npx prisma migrate deploy
```

Register the Paystack webhook URL:

```text
https://your-domain.com/api/paystack/webhook
```

For production abuse protection, put checkout and admin APIs behind host-level or Redis-backed rate limiting. The included in-process limiter is only a last line of defense for a single running server instance.

## CI and health checks

- GitHub Actions runs `prisma generate`, lint, tests, and build on push/PR.
- Health endpoint: `GET /api/health`
- Production startup validates required env vars (admin allowlist, receipt secret, database, Paystack).

## Production services

| Service | Env vars | Purpose |
|---------|----------|---------|
| Upstash Redis | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Distributed API rate limiting |
| S3-compatible storage | `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_URL` | Product image uploads (`POST /api/admin/uploads`) |
| Resend | `RESEND_API_KEY`, `EMAIL_FROM` | Order confirmation emails after successful payment |

Without Upstash, rate limits fall back to per-instance memory (fine for local dev only).
Without S3, admins can still use inline base64 images in non-production environments.
Without Resend, orders complete normally but no email is sent.
