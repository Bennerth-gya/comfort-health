'use client'

import { Phone, HeartPulse } from 'lucide-react'
import { PHARMACY_CONFIG } from '@/lib/config'

export default function SupportBannerCard() {
  return (
    <div
      style={{
        width: 'calc(100% - 24px)',
        margin: '0 12px',
        borderRadius: '16px',
        background: 'white',
        border: '1.5px solid #bbf7d0',
        boxShadow: '0 2px 12px rgba(21, 128, 61, 0.08)',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}
    >
      <div style={{ flex: 1 }}>
        <span
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '20px',
            padding: '3px 10px',
            fontSize: '10px',
            fontWeight: 600,
            color: '#15803d',
            letterSpacing: '0.06em',
            display: 'inline-flex',
            marginBottom: '6px'
          }}
        >
          PHARMACIST SUPPORT
        </span>
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#0f2318',
            lineHeight: 1.3,
            marginBottom: '4px'
          }}
          className="md:text-[15px] max-[380px]:text-[14px]"
        >
          Need help choosing the right medicine?
        </h3>
        <p
          style={{
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '10px'
          }}
        >
          Talk directly to our licensed pharmacist.
        </p>
        <a
          href={`tel:${PHARMACY_CONFIG.phone}`}
          style={{
            height: '40px',
            background: '#15803d',
            color: 'white',
            borderRadius: '10px',
            padding: '0 16px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none'
          }}
        >
          <Phone size={14} color="white" /> Call Now
        </a>
      </div>

      <div
        style={{
          width: '60px',
          height: '60px',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #15803d, #059669)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <HeartPulse size={24} color="white" strokeWidth={2} />
      </div>
    </div>
  )
}
