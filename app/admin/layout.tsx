import { requireAdminUser } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side guard: redirect to sign-in if not an admin.
  // This covers all pages under /admin/* on both local and production.
  await requireAdminUser()

  return <>{children}</>
}
