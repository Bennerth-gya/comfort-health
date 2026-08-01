'use client'

import { useState } from 'react'
import {
  PackageSearch,
  Send,
  CheckCircle,
  ChevronRight,
  Loader2,
  Pill,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'

interface SearchEmptyStateProps {
  searchQuery: string
  onClearSearch?: () => void
}

export default function SearchEmptyState({
  searchQuery,
  onClearSearch,
}: SearchEmptyStateProps) {
  const [name, setName] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const productName = searchQuery.trim()

  const handleRequest = async () => {
    setErrorMsg('')

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('Please enter your name')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/product-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          productName,
          reason:
            reason.trim() ||
            `Searched for "${productName}" on Comfort Health but it was not available.`,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('No internet connection. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="relative mb-5">
          <div className="w-20 h-20 bg-[#f0fdf4] rounded-full flex items-center justify-center">
            <CheckCircle size={36} color="#15803d" strokeWidth={2} />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#15803d]/10 animate-ping" />
        </div>

        <h2 className="text-[20px] font-800 text-[#0f2318] mb-2 leading-tight">
          Request received! 💊
        </h2>
        <p className="text-gray-500 text-[14px] leading-relaxed mb-2 max-w-xs">
          We have noted your request for{' '}
          <span className="font-700 text-[#0f2318]">{productName}</span>.
          Our pharmacist will try to add it as soon as possible.
        </p>
        <p className="text-[#15803d] text-[13px] font-600 mb-8">
          We will notify you when it is available.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#15803d] text-white rounded-2xl py-3.5 text-[14px] font-700 active:scale-[0.98] transition-all"
          >
            Browse available products
            <ChevronRight size={16} />
          </Link>
          {onClearSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="flex items-center justify-center gap-2 bg-white text-[#0f2318] rounded-2xl py-3 text-[13px] font-600 border border-gray-200 active:scale-[0.98] transition-all"
            >
              <ArrowLeft size={14} />
              Search for something else
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-4 py-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center">
            <PackageSearch size={40} color="#15803d" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#fef9c3] rounded-full flex items-center justify-center border-2 border-white">
            <Pill size={14} color="#ca8a04" />
          </div>
          <div className="absolute -bottom-1 -left-2 w-7 h-7 bg-[#fce7f3] rounded-full flex items-center justify-center border-2 border-white">
            <Pill size={12} color="#db2777" />
          </div>
        </div>

        <h2 className="text-[20px] font-800 text-[#0f2318] leading-tight mb-2">
          We don't have{' '}
          <span className="text-[#15803d]">"{productName}"</span> yet
        </h2>
        <p className="text-gray-500 text-[13px] leading-relaxed max-w-xs">
          But we want to stock exactly what you need. Request it below and our pharmacist will try to add it as soon as possible.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-[11px] font-600 text-gray-400 uppercase tracking-wider">
          Request this product
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        <div className="bg-[#f0fdf4] border-b border-[#e0f2e9] px-4 py-3 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#15803d] rounded-xl flex items-center justify-center">
            <Pill size={14} color="white" />
          </div>
          <div>
            <p className="text-[13px] font-700 text-[#0f2318] leading-tight">{productName}</p>
            <p className="text-[11px] text-[#15803d] font-500">Tap below to request this product</p>
          </div>
        </div>

        <div className="px-4 py-4 flex flex-col gap-3">
          <div>
            <label className="text-[11px] font-600 text-gray-500 uppercase tracking-wider mb-1.5 block">
              Your name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kwame Mensah"
              maxLength={50}
              style={{ fontSize: '16px' }}
              className={`w-full px-4 py-3 rounded-xl border text-[#0f2318] placeholder:text-gray-400 bg-[#f8faf8] outline-none transition-all ${
                errorMsg && !name.trim()
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-gray-200 focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/10'
              }`}
            />
          </div>

          <div>
            <label className="text-[11px] font-600 text-gray-500 uppercase tracking-wider mb-1.5 block">
              Why do you need it?
              <span className="normal-case font-400 ml-1 text-gray-400">(optional)</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={`e.g. I need ${productName} for my allergies and can never find it nearby...`}
              rows={2}
              maxLength={200}
              style={{ fontSize: '16px' }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0f2318] placeholder:text-gray-400 bg-[#f8faf8] resize-none outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/10 transition-all"
            />
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
              <p className="text-red-600 text-[12px] font-500">{errorMsg}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleRequest}
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] active:scale-[0.98] active:bg-[#14532d] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-100 rounded-xl py-3.5 text-white text-[14px] font-700"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending request...
              </>
            ) : (
              <>
                <Send size={15} />
                Request {productName}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-[#f8faf8] rounded-2xl border border-gray-100 px-4 py-4">
        <p className="text-[12px] text-gray-500 mb-3 font-500">
          While you wait, browse what we currently have:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'Paracetamol',
            'Aspirin',
            'Amoxicillin',
            'Vitamin C',
            'Cetirizine',
          ].map((suggestion) => (
            <Link
              key={suggestion}
              href={`/search?q=${encodeURIComponent(suggestion)}`}
              className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-[12px] font-500 text-[#0f2318] active:bg-gray-50 transition-all"
            >
              {suggestion}
            </Link>
          ))}
          <Link
            href="/shop-page"
            className="bg-[#15803d] rounded-full px-3 py-1.5 text-[12px] font-600 text-white active:bg-[#166534] transition-all flex items-center gap-1"
          >
            View all
            <ChevronRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  )
}
