'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag } from 'lucide-react'

interface CartIconProps {
  itemCount: number
}

export default function CartIcon({ itemCount }: CartIconProps) {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevCount, setPrevCount] = useState(itemCount)
  const [flyParticles, setFlyParticles] = useState<{
    id: number
    x: number
    y: number
  }[]>([])
  const iconRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (itemCount > prevCount) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)

      const newParticle = {
        id: Date.now(),
        x: Math.random() * 20 - 10,
        y: Math.random() * 10,
      }
      setFlyParticles((prev) => [...prev, newParticle])
      setTimeout(() => {
        setFlyParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 800)
    }

    setPrevCount(itemCount)
  }, [itemCount, prevCount])

  return (
    <>
      <style>{`
        @keyframes cartShake {
          0% { transform: rotate(0deg) scale(1); }
          15% { transform: rotate(-15deg) scale(1.2); }
          30% { transform: rotate(10deg) scale(1.15); }
          45% { transform: rotate(-8deg) scale(1.1); }
          60% { transform: rotate(5deg) scale(1.05); }
          75% { transform: rotate(-3deg) scale(1.02); }
          100% { transform: rotate(0deg) scale(1); }
        }

        @keyframes badgePop {
          0% { transform: scale(1); }
          30% { transform: scale(1.6); }
          50% { transform: scale(0.9); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        @keyframes particleFly {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.3);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .cart-shake {
          animation: cartShake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }

        .badge-pop {
          animation: badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .particle {
          animation: particleFly 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .ripple {
          animation: ripple 0.6s ease-out forwards;
        }
      `}</style>

      <button
        ref={iconRef}
        onClick={() => router.push('/cart')}
        className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        {isAnimating && (
          <span className="absolute inset-0 rounded-full bg-[#4ade80]/30 ripple" />
        )}

        <span className={isAnimating ? 'cart-shake' : ''}>
          <ShoppingBag size={22} color="white" strokeWidth={2} />
        </span>

        {itemCount > 0 && (
          <span
            key={itemCount}
            className={`
              absolute -top-1 -right-1
              min-w-[18px] h-[18px] px-1
              bg-[#22c55e] text-white
              text-[10px] font-800
              rounded-full
              flex items-center justify-center
              border-2 border-[#1a2e22]
              leading-none
              badge-pop
            `}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}

        {flyParticles.map((particle) => (
          <span
            key={particle.id}
            className="absolute particle pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(${particle.x}px, ${particle.y}px)`,
            }}
          >
            <span className="block w-2 h-2 rounded-full bg-[#4ade80]" />
          </span>
        ))}
      </button>
    </>
  )
}
