'use client'

import { useState, useEffect } from 'react'
import { Phone, X, MessageCircle, HeadphonesIcon } from 'lucide-react'

// ── CONFIGURATION ──────────────────────────────────────────
// Change these two values to your real pharmacy numbers
const PHARMACY_PHONE = '0244123456'
const PHARMACY_WHATSAPP = '233537355068'
// ──────────────────────────────────────────────────────────

export default function PharmacistSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // Delay appearance by 3 seconds after page load
  // so it does not distract from the main content immediately
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Stop the pulse animation after 8 seconds
  // It has done its job of catching attention
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  // Close the card when user taps outside of it
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#support-card') && 
          !target.closest('#support-button')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  if (!isVisible) return null

  return (
    <>
      {/* ── BACKDROP (mobile only, when card is open) ── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── SUPPORT CARD (slides up when open) ────────── */}
      <div
        id="support-card"
        className={`
          fixed bottom-24 left-4 z-50 w-[280px]
          transform transition-all duration-300 ease-out
          ${isOpen
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
          }
        `}
        style={{
          // Respect iPhone home bar
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

          {/* Card header — dark green */}
          <div className="bg-[#0f2318] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Online indicator */}
              <div className="relative">
                <div className="w-8 h-8 bg-[#15803d] rounded-full flex items-center justify-center">
                  <HeadphonesIcon size={15} color="white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#4ade80] rounded-full border-2 border-[#0f2318]" />
              </div>
              <div>
                <p className="text-white text-xs font-[700] leading-tight">
                  Comfort Health
                </p>
                <p className="text-[#4ade80] text-[10px] font-[500]">
                  Pharmacist available
                </p>
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close support panel"
            >
              <X size={13} color="white" />
            </button>
          </div>

          {/* Card body */}
          <div className="px-4 py-4">

            {/* Main message */}
            <p className="text-[#0f2318] text-sm font-[600] leading-snug mb-1">
              Need help choosing the right medication?
            </p>
            <p className="text-gray-500 text-[12px] leading-relaxed mb-4">
              Call our pharmacist directly. Explain your symptoms and 
              we'll tell you exactly what to buy — then you can order 
              it right here on the site.
            </p>

            {/* Phone number — primary CTA */}
            <a
              href={`tel:${PHARMACY_PHONE}`}
              className="
                flex items-center gap-3 w-full
                bg-[#15803d] hover:bg-[#166534] active:bg-[#14532d]
                active:scale-[0.98] transition-all duration-100
                rounded-xl px-4 py-3.5 mb-2.5
                group
              "
              onClick={() => {
                // Close the card when they tap to call
                // so it does not block the screen during the call
                setTimeout(() => setIsOpen(false), 500)
              }}
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-active:scale-110 transition-transform">
                <Phone size={15} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-[10px] font-[500] opacity-80 leading-none mb-0.5">
                  Tap to call our pharmacist
                </p>
                <p className="text-white text-base font-[800] leading-tight tracking-wide">
                  {PHARMACY_PHONE}
                </p>
              </div>
              {/* Arrow */}
              <div className="text-white/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </a>

            {/* WhatsApp — secondary option */}
            <a
              href={`https://wa.me/${PHARMACY_WHATSAPP}?text=${encodeURIComponent(
                "Hi, I need help choosing the right medication. Can you assist me?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-3 w-full
                bg-[#f0fdf4] hover:bg-[#dcfce7] active:bg-[#bbf7d0]
                active:scale-[0.98] transition-all duration-100
                rounded-xl px-4 py-3 border border-[#bbf7d0]
              "
            >
              <div className="w-8 h-8 bg-[#15803d]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={15} color="#15803d" />
              </div>
              <div className="flex-1">
                <p className="text-[#15803d] text-[10px] font-[500] opacity-80 leading-none mb-0.5">
                  Or message us on
                </p>
                <p className="text-[#0f2318] text-sm font-[700] leading-tight">
                  WhatsApp
                </p>
              </div>
              <div className="text-[#15803d]/50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </a>

          </div>

          {/* Card footer */}
          <div className="px-4 pb-3">
            <p className="text-center text-[10px] text-gray-400 leading-relaxed">
              Mon – Sat · 8:00 AM – 9:00 PM{'\n'}
              Free advice · No appointment needed
            </p>
          </div>

        </div>
      </div>

      {/* ── FLOATING TRIGGER BUTTON ────────────────────── */}
      <button
        id="support-button"
        onClick={() => {
          setIsOpen(prev => !prev)
          setShowPulse(false) // stop pulse once user engages
        }}
        className={`
          fixed bottom-[76px] left-4 z-50
          w-14 h-14 rounded-full
          bg-[#15803d] hover:bg-[#166534]
          active:scale-95 transition-all duration-150
          flex items-center justify-center
          shadow-lg shadow-green-900/30
          focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:ring-offset-2
        `}
        style={{
          // Account for bottom tab bar on mobile 
          // and iPhone home indicator
          bottom: 'calc(76px + env(safe-area-inset-bottom, 0px))'
        }}
        aria-label="Talk to our pharmacist"
        aria-expanded={isOpen}
      >
        {/* Pulse ring — shows for first 8 seconds */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#15803d] opacity-40 animate-ping" />
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#15803d] opacity-20 animate-ping" style={{ animationDelay: '0.3s' }} />
          </>
        )}

        {/* Icon — switches between headphones and X */}
        <div className={`transition-all duration-200 ${isOpen ? 'rotate-90 scale-90' : 'rotate-0 scale-100'}`}>
          {isOpen
            ? <X size={22} color="white" />
            : <Phone size={22} color="white" />
          }
        </div>

        {/* Small "HELP" label below icon */}
        {!isOpen && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-[700] text-[#15803d] whitespace-nowrap tracking-wider">
            HELP
          </span>
        )}
      </button>
    </>
  )
}
