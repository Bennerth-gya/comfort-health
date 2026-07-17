'use client'

import { useState, useEffect } from 'react'
import { Package, Trash2, RefreshCw,
         CheckCircle, XCircle, Clock, PlusCircle } from 'lucide-react'
import AdminShell from "@/components/AdminShell";

type ProductRequest = {
  id: string
  name: string
  productName: string
  reason: string | null
  status: 'PENDING' | 'NOTED' | 'ADDED' | 'UNAVAILABLE'
  isRead: boolean
  createdAt: string
}

const STATUS_CONFIG = {
  PENDING: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock
  },
  NOTED: {
    label: 'Noted',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle
  },
  ADDED: {
    label: 'Added to shop',
    color: 'bg-green-100 text-green-800',
    icon: PlusCircle
  },
  UNAVAILABLE: {
    label: 'Unavailable',
    color: 'bg-red-100 text-red-800',
    icon: XCircle
  },
}

export default function AdminProductRequestsPage() {
  const [requests, setRequests] = useState<ProductRequest[]>([])
  const [counts, setCounts] = useState<{productName: string; _count: {productName: number}}[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('PENDING')

  const fetchRequests = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/product-requests')
    const data = await res.json()
    setRequests(data.requests || [])
    setCounts(data.counts || [])
    setLoading(false)
  }

  useEffect(() => { fetchRequests() }, [])

  const updateRequest = async (id: string, status: string) => {
    await fetch(`/api/admin/product-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, isRead: true })
    })
    fetchRequests()
  }

  const deleteRequest = async (id: string) => {
    if (!confirm('Delete this request?')) return
    await fetch(`/api/admin/product-requests/${id}`, { method: 'DELETE' })
    fetchRequests()
  }

  const pendingCount = requests.filter(r => r.status === 'PENDING').length
  const filtered = filter === 'ALL'
    ? requests
    : requests.filter(r => r.status === filter)

  return (
    <AdminShell>
      <main className="ml-64 min-h-screen">
        <div className="p-4 md:p-6 max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#0f2318] flex items-center gap-2">
                <Package size={24} color="#15803d" />
                Product Requests
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {pendingCount} new requests · {requests.length} total
              </p>
            </div>
            <button
              onClick={fetchRequests}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          {/* Most requested products */}
          {counts.length > 0 && (
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 mb-5">
              <p className="text-[12px] font-bold text-[#14532d] uppercase tracking-wider mb-3">
                Most requested products
              </p>
              <div className="flex flex-wrap gap-2">
                {counts.slice(0, 8).map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-white border border-[#bbf7d0] rounded-full px-3 py-1"
                  >
                    <span className="text-[12px] font-semibold text-[#0f2318]">
                      {c.productName}
                    </span>
                    <span className="text-[10px] bg-[#15803d] text-white font-bold px-1.5 py-0.5 rounded-full">
                      {c._count.productName}×
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filter tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
            {(['PENDING', 'NOTED', 'ADDED', 'UNAVAILABLE', 'ALL'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all
                  ${filter === f
                    ? 'bg-[#15803d] text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                  }`}
              >
                {f === 'ALL' ? 'All' : STATUS_CONFIG[f as keyof typeof STATUS_CONFIG]?.label}
                {f === 'PENDING' && pendingCount > 0 && (
                  <span className="ml-1.5 bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No requests in this category</p>
            </div>
          )}

          {/* Request cards */}
          <div className="flex flex-col gap-3">
            {filtered.map(request => {
              const config = STATUS_CONFIG[request.status]
              const StatusIcon = config.icon

              return (
                <div
                  key={request.id}
                  className={`bg-white rounded-xl border p-4
                    ${!request.isRead ? 'border-[#15803d]/30' : 'border-gray-200'}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#0f2318] text-sm">
                          {request.productName}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${config.color}`}>
                          <StatusIcon size={10} />
                          {config.label}
                        </span>
                        {!request.isRead && (
                          <span className="text-[9px] bg-[#15803d] text-white px-1.5 py-0.5 rounded-full font-semibold">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Requested by {request.name} · {new Date(request.createdAt).toLocaleDateString('en-GH')}
                      </p>
                      {request.reason && (
                        <p className="text-[12px] text-gray-600 mt-1.5 italic">
                          "{request.reason}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status action buttons */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 flex-wrap">
                    {request.status !== 'NOTED' && (
                      <button
                        onClick={() => updateRequest(request.id, 'NOTED')}
                        className="text-[11px] px-2.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-semibold"
                      >
                        Mark noted
                      </button>
                    )}
                    {request.status !== 'ADDED' && (
                      <button
                        onClick={() => updateRequest(request.id, 'ADDED')}
                        className="text-[11px] px-2.5 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg font-semibold"
                      >
                        ✓ Added to shop
                      </button>
                    )}
                    {request.status !== 'UNAVAILABLE' && (
                      <button
                        onClick={() => updateRequest(request.id, 'UNAVAILABLE')}
                        className="text-[11px] px-2.5 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg font-semibold"
                      >
                        Unavailable
                      </button>
                    )}
                    <button
                      onClick={() => deleteRequest(request.id)}
                      className="text-[11px] px-2.5 py-1.5 border border-red-200 text-red-500 rounded-lg font-medium ml-auto"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </main>
    </AdminShell>
  )
}
