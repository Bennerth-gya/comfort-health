// Client-side check for local environment
// Safe to use in 'use client' components
export function isLocalClient(): boolean {
  // Check the environment variable
  if (process.env.NEXT_PUBLIC_IS_LOCAL === 'true') return true
  
  // Double-check using window.location as a fallback
  // This catches cases where the env var might not work
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.startsWith('192.168.') ||
      hostname.endsWith('.local')
    )
  }
  
  return false
}
