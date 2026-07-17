import type { ReactNode } from 'react'

// Isolated layout — no AppChrome, no nav, no bottom bar
export default function PharmacistLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
