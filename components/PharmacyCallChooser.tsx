'use client'

import { type CSSProperties, type ReactNode, useEffect, useId, useState } from 'react'
import { Phone, X } from 'lucide-react'
import { PHARMACY_CONFIG } from '@/lib/config'

type PharmacyCallChooserProps = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  title?: string
  description?: string
  onCallStart?: () => void
}

export default function PharmacyCallChooser({
  children,
  className,
  style,
  title = 'Choose a number to call',
  description = 'If one line does not connect, try the other line.',
  onCallStart,
}: PharmacyCallChooserProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function handleCallStart() {
    onCallStart?.()
    setTimeout(() => setIsOpen(false), 500)
  }

  return (
    <>
      <button
        type="button"
        className={['appearance-none border-0', className].filter(Boolean).join(' ')}
        style={{ font: 'inherit', ...style }}
        onClick={() => setIsOpen(true)}
      >
        {children ?? 'Call pharmacist'}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center px-4 pb-4 pt-12 md:items-center md:pb-12"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close call options"
            onClick={() => setIsOpen(false)}
          />

          <section className="safe-bottom relative w-full max-w-sm rounded-2xl border border-[#d1fae5] bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id={titleId} className="text-[17px] font-bold text-[#0f2318]">
                  {title}
                </h2>
                <p id={descriptionId} className="mt-1 text-[12px] leading-relaxed text-gray-500">
                  {description}
                </p>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                aria-label="Close call options"
                onClick={() => setIsOpen(false)}
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-2">
              {PHARMACY_CONFIG.phoneNumbers.map((number) => (
                <a
                  key={number.phone}
                  href={`tel:${number.phone}`}
                  onClick={handleCallStart}
                  className="flex min-h-14 items-center gap-3 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-3 text-left transition active:scale-[0.98] md:hover:bg-[#dcfce7]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#15803d] text-white">
                    <Phone size={16} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#15803d]">
                      {number.label}
                    </span>
                    <span className="block text-base font-extrabold leading-tight text-[#0f2318]">
                      {number.display}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}
