import 'server-only'

// Check if running on localhost
// NEXT_PUBLIC_IS_LOCAL is only set in local .env.local
// It is never set on Vercel
export function isLocalEnvironment(): boolean {
  return process.env.NEXT_PUBLIC_IS_LOCAL === 'true'
}

// Check if a user ID belongs to an admin
export function isAdminUser(userId: string | null | undefined): boolean {
  if (!userId) return false
  
  const adminIds = process.env.ADMIN_USER_IDS?.split(',')
    .map(id => id.trim())
    .filter(Boolean) || []
    
  return adminIds.includes(userId)
}

// Check if current environment allows admin access
// Admin access requires BOTH:
// 1. Running locally (NEXT_PUBLIC_IS_LOCAL=true)
// OR
// 2. User is explicitly in the ADMIN_USER_IDS list
export function canAccessAdmin(userId?: string | null): boolean {
  // If running locally, allow access regardless of user
  if (isLocalEnvironment()) return true
  
  // On production, only allow if user ID is in admin list
  if (userId && isAdminUser(userId)) return true
  
  return false
}
