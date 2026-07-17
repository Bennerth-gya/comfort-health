'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Headphones } from 'lucide-react'

const STORAGE_KEY = 'comfort_support_conv_id'

export default function SupportFab() {
  const [hasUnread, setHasUnread] = useState(false)

  useEffect(() => {
    const convId = localStorage.getItem(STORAGE_KEY)
    if (!convId) return

    const checkUnread = async () => {
      try {
        const res = await fetch(`/api/support/conversations/${convId}`)
        if (res.ok) {
          const data = await res.json()
          // Check if there are any unread messages from the pharmacist
          const unread = data.messages.some((m: any) => m.senderType === 'PHARMACIST' && !m.isRead)
          setHasUnread(unread)
        }
      } catch (e) {
        console.error('Failed to check unread support messages', e)
      }
    }
    
    checkUnread()
    
    // Check periodically
    const intervalId = setInterval(checkUnread, 10000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Link
      href="/support"
      className="fixed z-40 flex items-center justify-center rounded-full bg-white transition-transform active:scale-95"
      style={{
        bottom: 'calc(80px + env(safe-area-inset-bottom))',
        right: '16px',
        width: '52px',
        height: '52px',
        border: '2px solid #15803d',
        boxShadow: '0 4px 16px rgba(21,128,61,0.25)'
      }}
      title="Talk to a Pharmacist"
    >
      <Headphones size={22} color="#15803d" />
      {hasUnread && (
        <span 
          className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" 
          aria-hidden="true" 
        />
      )}
    </Link>
  )
}
