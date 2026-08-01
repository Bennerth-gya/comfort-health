'use client'

import { useEffect, useRef } from 'react'

interface FlyToCartProps {
  trigger: boolean
  sourceRef: React.RefObject<HTMLElement | null>
  onComplete?: () => void
}

export default function FlyToCart({
  trigger,
  sourceRef,
  onComplete,
}: FlyToCartProps) {
  const flyingDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trigger || !sourceRef.current || !flyingDotRef.current) return

    const sourceRect = sourceRef.current.getBoundingClientRect()
    const cartIcon = document.querySelector('[aria-label*="Shopping cart"]')
    if (!cartIcon) return
    const cartRect = cartIcon.getBoundingClientRect()

    const dot = flyingDotRef.current
    const startX = sourceRect.left + sourceRect.width / 2
    const startY = sourceRect.top + sourceRect.height / 2
    const endX = cartRect.left + cartRect.width / 2
    const endY = cartRect.top + cartRect.height / 2

    dot.style.display = 'block'
    dot.style.left = `${startX}px`
    dot.style.top = `${startY}px`
    dot.style.opacity = '1'
    dot.style.transform = 'scale(1)'

    const animation = dot.animate(
      [
        {
          left: `${startX}px`,
          top: `${startY}px`,
          opacity: 1,
          transform: 'scale(1)',
          offset: 0,
        },
        {
          left: `${startX + (endX - startX) * 0.3}px`,
          top: `${Math.min(startY, endY) - 60}px`,
          opacity: 1,
          transform: 'scale(0.8)',
          offset: 0.4,
        },
        {
          left: `${endX}px`,
          top: `${endY}px`,
          opacity: 0,
          transform: 'scale(0.2)',
          offset: 1,
        },
      ],
      {
        duration: 600,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
      },
    )

    animation.onfinish = () => {
      dot.style.display = 'none'
      onComplete?.()
    }
  }, [trigger, sourceRef, onComplete])

  return (
    <div
      ref={flyingDotRef}
      className="fixed z-[9999] w-5 h-5 rounded-full bg-[#15803d] border-2 border-[#4ade80] pointer-events-none hidden"
      style={{ position: 'fixed', display: 'none' }}
    />
  )
}
