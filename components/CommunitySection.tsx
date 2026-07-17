'use client'

import { useState } from 'react'
import { Star, Send, Package, MessageSquareHeart,
         CheckCircle, ChevronRight, Loader2 } from 'lucide-react'

// ── STAR RATING COMPONENT ─────────────────────────────────
function StarRating({
  value,
  onChange
}: {
  value: number
  onChange: (rating: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="p-1 transition-transform active:scale-90"
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            size={26}
            className="transition-colors duration-100"
            fill={(hovered || value) >= star ? '#fbbf24' : 'none'}
            color={(hovered || value) >= star ? '#fbbf24' : '#d1d5db'}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  )
}

// ── REVIEW FORM ───────────────────────────────────────────
function ReviewForm() {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const maxChars = 500

  const handleSubmit = async () => {
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg('Please enter your name')
      return
    }
    if (rating === 0) {
      setErrorMsg('Please tap a star to rate your experience')
      return
    }
    if (message.trim().length < 10) {
      setErrorMsg('Please write a bit more about your experience')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, message })
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong')
        setStatus('error')
        return
      }

      setStatus('success')
      // Reset form
      setName('')
      setRating(0)
      setMessage('')

    } catch {
      setErrorMsg('No internet connection. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <div className="w-14 h-14 bg-[#f0fdf4] rounded-full flex items-center justify-center">
          <CheckCircle size={28} color="#15803d" />
        </div>
        <div className="text-center">
          <p className="font-[700] text-[#0f2318] text-[15px] mb-1">
            Thank you! 🎉
          </p>
          <p className="text-gray-500 text-[12px] leading-relaxed">
            Your review has been submitted and will appear 
            on the site after our team approves it.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-[#15803d] text-[12px] font-[600] underline underline-offset-2"
        >
          Write another review
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Name input */}
      <div>
        <label className="text-[11px] font-[600] text-gray-500 uppercase tracking-wider mb-1.5 block">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Kwame A."
          maxLength={50}
          className="
            w-full border border-gray-200 rounded-xl
            px-4 py-3 text-[14px] text-[#0f2318]
            placeholder:text-gray-400 font-[500]
            outline-none focus:border-[#15803d] 
            focus:ring-2 focus:ring-[#15803d]/10
            transition-all bg-[#f8faf8]
          "
          style={{ fontSize: '16px' }}
        />
      </div>

      {/* Star rating */}
      <div>
        <label className="text-[11px] font-[600] text-gray-500 uppercase tracking-wider mb-1.5 block">
          Your rating
        </label>
        <div className="flex items-center gap-3">
          <StarRating value={rating} onChange={setRating} />
          {rating > 0 && (
            <span className="text-[12px] text-gray-500 font-[500]">
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Message textarea */}
      <div>
        <label className="text-[11px] font-[600] text-gray-500 uppercase tracking-wider mb-1.5 block">
          Your experience
        </label>
        <textarea
          value={message}
          onChange={e => {
            if (e.target.value.length <= maxChars) {
              setMessage(e.target.value)
            }
          }}
          placeholder="Tell other students about your experience with Comfort Health..."
          rows={3}
          className="
            w-full border border-gray-200 rounded-xl
            px-4 py-3 text-[14px] text-[#0f2318]
            placeholder:text-gray-400 font-[400]
            outline-none focus:border-[#15803d]
            focus:ring-2 focus:ring-[#15803d]/10
            transition-all resize-none bg-[#f8faf8]
          "
          style={{ fontSize: '16px' }}
        />
        <p className="text-[10px] text-gray-400 text-right mt-1">
          {message.length}/{maxChars}
        </p>
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
          <p className="text-red-600 text-[12px] font-[500]">{errorMsg}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        className="
          w-full flex items-center justify-center gap-2
          bg-[#15803d] hover:bg-[#166534] 
          active:scale-[0.98] active:bg-[#14532d]
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-100
          rounded-xl py-3.5 text-white
          text-[14px] font-[700]
        "
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={15} />
            Share my experience
          </>
        )}
      </button>

    </div>
  )
}

// ── PRODUCT REQUEST FORM ──────────────────────────────────
function ProductRequestForm() {
  const [name, setName] = useState('')
  const [productName, setProductName] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg('Please enter your name')
      return
    }
    if (!productName.trim()) {
      setErrorMsg('Please enter the medicine or product name')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/product-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, productName, reason })
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong')
        setStatus('error')
        return
      }

      setStatus('success')
      setName('')
      setProductName('')
      setReason('')

    } catch {
      setErrorMsg('No internet connection. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <div className="w-14 h-14 bg-[#f0fdf4] rounded-full flex items-center justify-center">
          <CheckCircle size={28} color="#15803d" />
        </div>
        <div className="text-center">
          <p className="font-[700] text-[#0f2318] text-[15px] mb-1">
            Request received! 💊
          </p>
          <p className="text-gray-500 text-[12px] leading-relaxed">
            We will review your request and try to 
            add it to our pharmacy as soon as possible.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-[#15803d] text-[12px] font-[600] underline underline-offset-2"
        >
          Request another product
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Name input */}
      <div>
        <label className="text-[11px] font-[600] text-gray-500 uppercase tracking-wider mb-1.5 block">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Ama Serwaa"
          maxLength={50}
          className="
            w-full border border-gray-200 rounded-xl
            px-4 py-3 text-[14px] text-[#0f2318]
            placeholder:text-gray-400 font-[500]
            outline-none focus:border-[#15803d]
            focus:ring-2 focus:ring-[#15803d]/10
            transition-all bg-[#f8faf8]
          "
          style={{ fontSize: '16px' }}
        />
      </div>

      {/* Product name input */}
      <div>
        <label className="text-[11px] font-[600] text-gray-500 uppercase tracking-wider mb-1.5 block">
          Medicine or product name
        </label>
        <input
          type="text"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          placeholder="e.g. Ibuprofen, Strepsils, Cetirizine..."
          maxLength={100}
          className="
            w-full border border-gray-200 rounded-xl
            px-4 py-3 text-[14px] text-[#0f2318]
            placeholder:text-gray-400 font-[500]
            outline-none focus:border-[#15803d]
            focus:ring-2 focus:ring-[#15803d]/10
            transition-all bg-[#f8faf8]
          "
          style={{ fontSize: '16px' }}
        />
      </div>

      {/* Reason — optional */}
      <div>
        <label className="text-[11px] font-[600] text-gray-500 uppercase tracking-wider mb-1.5 block">
          Why do you need it? 
          <span className="normal-case font-[400] ml-1 text-gray-400">
            (optional)
          </span>
        </label>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="e.g. I need it for allergies and I can never find it nearby..."
          rows={2}
          maxLength={300}
          className="
            w-full border border-gray-200 rounded-xl
            px-4 py-3 text-[14px] text-[#0f2318]
            placeholder:text-gray-400 font-[400]
            outline-none focus:border-[#15803d]
            focus:ring-2 focus:ring-[#15803d]/10
            transition-all resize-none bg-[#f8faf8]
          "
          style={{ fontSize: '16px' }}
        />
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
          <p className="text-red-600 text-[12px] font-[500]">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        className="
          w-full flex items-center justify-center gap-2
          bg-[#0f2318] hover:bg-[#1a3d2a]
          active:scale-[0.98]
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-100
          rounded-xl py-3.5 text-white
          text-[14px] font-[700]
        "
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending request...
          </>
        ) : (
          <>
            <Package size={15} />
            Request this product
          </>
        )}
      </button>

    </div>
  )
}

// ── MAIN COMMUNITY SECTION COMPONENT ─────────────────────
export default function CommunitySection() {
  const [activeTab, setActiveTab] = useState<'review' | 'request'>('review')

  return (
    <section className="px-3 py-2 mb-4">

      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[17px] font-[700] text-[#0f2318] leading-tight">
            Community
          </h2>
          <p className="text-[12px] text-gray-500 mt-0.5">
            Share your experience or request a product
          </p>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquareHeart size={16} color="#15803d" />
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex bg-[#f0fdf4] rounded-xl p-1 mb-4 border border-[#e0f2e9]">
        <button
          onClick={() => setActiveTab('review')}
          className={`
            flex-1 flex items-center justify-center gap-1.5
            py-2.5 rounded-lg text-[13px] font-[600]
            transition-all duration-200
            ${activeTab === 'review'
              ? 'bg-white text-[#0f2318] shadow-sm border border-gray-100'
              : 'text-[#15803d] hover:text-[#0f2318]'
            }
          `}
        >
          <Star size={13} fill={activeTab === 'review' ? '#fbbf24' : 'none'} color={activeTab === 'review' ? '#fbbf24' : '#15803d'} />
          Share experience
        </button>
        <button
          onClick={() => setActiveTab('request')}
          className={`
            flex-1 flex items-center justify-center gap-1.5
            py-2.5 rounded-lg text-[13px] font-[600]
            transition-all duration-200
            ${activeTab === 'request'
              ? 'bg-white text-[#0f2318] shadow-sm border border-gray-100'
              : 'text-[#15803d] hover:text-[#0f2318]'
            }
          `}
        >
          <Package size={13} color={activeTab === 'request' ? '#0f2318' : '#15803d'} />
          Request a product
        </button>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

        {/* Tab content header */}
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
          {activeTab === 'review' ? (
            <>
              <div className="w-9 h-9 bg-[#fffbeb] rounded-xl flex items-center justify-center flex-shrink-0">
                <Star size={18} fill="#fbbf24" color="#fbbf24" />
              </div>
              <div>
                <p className="text-[13px] font-[700] text-[#0f2318] leading-tight">
                  Share your experience
                </p>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                  Help other students know what to expect
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-9 h-9 bg-[#f0fdf4] rounded-xl flex items-center justify-center flex-shrink-0">
                <Package size={18} color="#15803d" />
              </div>
              <div>
                <p className="text-[13px] font-[700] text-[#0f2318] leading-tight">
                  Request a medicine or product
                </p>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                  Can't find what you need? Let us know
                </p>
              </div>
            </>
          )}
        </div>

        {/* Active form */}
        {activeTab === 'review'
          ? <ReviewForm />
          : <ProductRequestForm />
        }

      </div>

    </section>
  )
}
