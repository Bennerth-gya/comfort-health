'use client'

import { useState, useEffect } from 'react'
import { Star, Check, Trash2, Eye, EyeOff,
         RefreshCw, MessageSquareHeart } from 'lucide-react'
import AdminShell from "@/components/AdminShell";

type Review = {
  id: string
  name: string
  rating: number
  message: string
  isApproved: boolean
  isRead: boolean
  createdAt: string
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending')

  const fetchReviews = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/reviews')
    const data = await res.json()
    setReviews(data.reviews || [])
    setLoading(false)
  }

  useEffect(() => { fetchReviews() }, [])

  const updateReview = async (
    id: string,
    updates: { isApproved?: boolean; isRead?: boolean }
  ) => {
    await fetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    fetchReviews()
  }

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review permanently?')) return
    await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
    fetchReviews()
  }

  const filtered = reviews.filter(r => {
    if (filter === 'pending') return !r.isApproved
    if (filter === 'approved') return r.isApproved
    return true
  })

  const pendingCount = reviews.filter(r => !r.isApproved).length

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star
          key={s}
          size={12}
          fill={s <= rating ? '#fbbf24' : 'none'}
          color={s <= rating ? '#fbbf24' : '#d1d5db'}
        />
      ))}
    </div>
  )

  return (
    <AdminShell>
      <main className="ml-64 min-h-screen">
        <div className="p-4 md:p-6 max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#0f2318] flex items-center gap-2">
                <MessageSquareHeart size={24} color="#15803d" />
                Customer Reviews
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {pendingCount} pending approval
              </p>
            </div>
            <button
              onClick={fetchReviews}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-5">
            {(['pending', 'approved', 'all'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all
                  ${filter === f
                    ? 'bg-[#15803d] text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                  }`}
              >
                {f}
                {f === 'pending' && pendingCount > 0 && (
                  <span className="ml-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <MessageSquareHeart size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No reviews yet</p>
              <p className="text-sm">Reviews from customers will appear here</p>
            </div>
          )}

          {/* Review cards */}
          <div className="flex flex-col gap-3">
            {filtered.map(review => (
              <div
                key={review.id}
                className={`bg-white rounded-xl border p-4 
                  ${!review.isRead ? 'border-[#15803d]/30 bg-[#f0fdf4]/30' : 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-[#0f2318] text-sm">
                        {review.name}
                      </span>
                      {renderStars(review.rating)}
                      {!review.isRead && (
                        <span className="text-[9px] bg-[#15803d] text-white px-1.5 py-0.5 rounded-full font-semibold">
                          NEW
                        </span>
                      )}
                      {review.isApproved && (
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">
                          APPROVED
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {review.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2">
                      {new Date(review.createdAt).toLocaleString('en-GH')}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  {!review.isApproved ? (
                    <button
                      onClick={() => updateReview(review.id, {
                        isApproved: true,
                        isRead: true
                      })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#15803d] text-white rounded-lg text-xs font-semibold"
                    >
                      <Check size={12} />
                      Approve & publish
                    </button>
                  ) : (
                    <button
                      onClick={() => updateReview(review.id, {
                        isApproved: false
                      })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold"
                    >
                      <EyeOff size={12} />
                      Unpublish
                    </button>
                  )}
                  {!review.isRead && (
                    <button
                      onClick={() => updateReview(review.id, { isRead: true })}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium"
                    >
                      <Eye size={12} />
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-500 rounded-lg text-xs font-medium ml-auto"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </AdminShell>
  )
}
