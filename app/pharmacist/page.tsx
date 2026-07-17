'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, Send, Clock, CheckCircle, Package } from 'lucide-react'

// Types
type ConvStatus = 'WAITING' | 'ACTIVE' | 'RESOLVED' | 'CLOSED'
type MsgType = 'TEXT' | 'PRODUCT_RECOMMENDATION' | 'SYSTEM_NOTICE'
type SenderType = 'STUDENT' | 'PHARMACIST' | 'SYSTEM'

interface Message {
  id: string
  content: string
  senderType: SenderType
  senderName: string
  createdAt: string
  messageType: MsgType
  productId?: string | null
  productName?: string | null
  productPrice?: number | null
  productImage?: string | null
  isRead: boolean
}

interface Conversation {
  id: string
  guestName: string
  guestPhone?: string
  subject: string
  status: ConvStatus
  lastMessageAt: string
  messages: Message[]
  _count?: { messages: number }
}

interface Product {
  id: string
  name: string
  price: string | number
  imageUrl: string | null
  category: string | null
}

const QUICK_REPLIES = [
  "Thank you for reaching out! Let me help you.",
  "Could you tell me your age and weight?",
  "How long have you had these symptoms?",
  "Do you have any allergies to medication?",
  "Please see a doctor if symptoms worsen.",
  "Stay hydrated and get plenty of rest."
]

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function PharmacistDashboard() {
  const router = useRouter()
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Dashboard state
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<ConvStatus | 'ALL'>('ALL')
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  
  // Product search state
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sseRef = useRef<EventSource | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const selectedConv = conversations.find(c => c.id === selectedId)

  // Play notification sound
  const playNotification = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') ctx.resume()
      
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1) // E5
      
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
      
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.5)
    } catch (e) {
      console.error('Audio play error:', e)
    }
  }, [])

  // Initialize notifications
  useEffect(() => {
    if (isAuthenticated && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [isAuthenticated])

  // Fetch initial conversations
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/support/conversations')
      if (res.ok) {
        const data = await res.json()
        setConversations(data)
      } else if (res.status === 401) {
        setIsAuthenticated(false)
      }
    } catch (e) {
      console.error('Failed to fetch conversations', e)
    }
  }, [])

  // SSE Connection
  useEffect(() => {
    if (!isAuthenticated) return

    fetchConversations()

    // Assuming we use a global stream, or we poll. Since global stream isn't fully implemented in the backend (I don't see it), let's poll globally every 3 seconds as requested.
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/support/conversations')
        if (res.ok) {
          const freshData: Conversation[] = await res.json()
          
          setConversations(prev => {
            let hasNewMsg = false
            const merged = [...freshData] // simple full replace since it's just 50 recent
            
            // Check for notifications
            const currentUnread = freshData.reduce((acc, c) => acc + (c._count?.messages || 0), 0)
            const prevUnread = prev.reduce((acc, c) => acc + (c._count?.messages || 0), 0)
            
            if (currentUnread > prevUnread) {
              hasNewMsg = true
            }

            if (hasNewMsg) {
              playNotification()
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('New Message — Comfort Health Support')
              }
            }
            
            return merged
          })
        }
      } catch (e) {}
    }, 3000)

    return () => clearInterval(pollInterval)
  }, [isAuthenticated, fetchConversations, playNotification])

  // Fetch full conversation when selected
  useEffect(() => {
    if (!selectedId) return
    const fetchFullConv = async () => {
      try {
        const res = await fetch(`/api/support/conversations/${selectedId}`)
        if (res.ok) {
          const fullConv = await res.json()
          setConversations(prev => prev.map(c => c.id === selectedId ? { ...c, messages: fullConv.messages, _count: { messages: 0 } } : c))
          scrollToBottom()
        }
      } catch (e) {}
    }
    fetchFullConv()
  }, [selectedId])

  // Scroll to bottom when selected conv messages change
  useEffect(() => {
    if (selectedId) scrollToBottom()
  }, [selectedConv?.messages, selectedId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    try {
      const res = await fetch('/api/support/pharmacist/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (res.ok) {
        setIsAuthenticated(true)
      } else {
        setLoginError('Incorrect password')
      }
    } catch {
      setLoginError('Connection error')
    } finally {
      setLoginLoading(false)
    }
  }

  // Search Products
  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([])
      return
    }
    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const res = await fetch(`/api/support/products/search?q=${encodeURIComponent(searchQuery)}`)
        if (res.ok) {
          setProducts(await res.json())
        }
      } catch (e) {}
      finally { setIsSearching(false) }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Send text message
  async function handleSend() {
    if (!input.trim() || !selectedId || sending) return
    setSending(true)
    const text = input.trim()
    setInput('')
    try {
      const res = await fetch('/api/support/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedId,
          content: text,
          senderType: 'PHARMACIST',
          senderName: 'Comfort Health Pharmacist',
          messageType: 'TEXT'
        })
      })
      if (res.ok) {
        const msg = await res.json()
        setConversations(prev => prev.map(c => c.id === selectedId ? {
          ...c,
          status: c.status === 'WAITING' ? 'ACTIVE' : c.status,
          messages: [...(c.messages || []), msg]
        } : c))
      }
    } catch {}
    finally { setSending(false) }
  }

  // Send product recommendation
  async function handleRecommend(prod: Product) {
    if (!selectedId) return
    setSearchQuery('')
    setProducts([])
    try {
      const res = await fetch('/api/support/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedId,
          content: "I recommend this product for your condition:",
          senderType: 'PHARMACIST',
          senderName: 'Comfort Health Pharmacist',
          messageType: 'PRODUCT_RECOMMENDATION',
          productId: prod.id,
          productName: prod.name,
          productPrice: Number(prod.price),
          productImage: prod.imageUrl
        })
      })
      if (res.ok) {
        const msg = await res.json()
        setConversations(prev => prev.map(c => c.id === selectedId ? {
          ...c,
          status: c.status === 'WAITING' ? 'ACTIVE' : c.status,
          messages: [...(c.messages || []), msg]
        } : c))
      }
    } catch {}
  }

  // Mark as resolved
  async function handleResolve() {
    if (!selectedId) return
    try {
      const res = await fetch(`/api/support/conversations/${selectedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RESOLVED' })
      })
      if (res.ok) {
        setConversations(prev => prev.map(c => c.id === selectedId ? { ...c, status: 'RESOLVED' } : c))
      }
    } catch {}
  }

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', height: '100dvh', background: '#f8faf8', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 380, border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, background: '#15803d', borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <CheckCircle color="#fff" size={24} />
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0f2318', margin: 0 }}>Pharmacist Portal</h1>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Comfort Health Consultations</p>
          </div>
          
          <input 
            type="password" 
            placeholder="Enter pharmacist password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', height: 48, border: '1px solid #d1d5db', borderRadius: 12, padding: '0 16px', fontSize: 16, marginBottom: 16, outline: 'none' }}
          />
          {loginError && <p style={{ color: '#dc2626', fontSize: 13, margin: '-8px 0 16px' }}>{loginError}</p>}
          
          <button 
            type="submit" 
            disabled={loginLoading}
            style={{ width: '100%', height: 48, background: '#15803d', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
          >
            {loginLoading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>
      </div>
    )
  }

  // Dashboard layout
  const filteredConvs = conversations.filter(c => filter === 'ALL' ? true : c.status === filter)
  const waitingCount = conversations.filter(c => c.status === 'WAITING').length
  const activeCount = conversations.filter(c => c.status === 'ACTIVE').length
  const todayCount = conversations.filter(c => new Date(c.lastMessageAt).toDateString() === new Date().toDateString()).length

  return (
    <div style={{ display: 'flex', height: '100dvh', background: '#f8faf8', overflow: 'hidden' }}>
      
      {/* LEFT PANEL */}
      <div style={{ width: 320, background: '#fff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ background: '#1a2e22', padding: '16px 20px', color: '#fff' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Comfort Health — Pharmacist</h2>
        </div>
        
        {/* Stats */}
        <div style={{ padding: 16, display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: '#fef3c7', borderRadius: 8, padding: 8, textAlign: 'center' }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#92400e', margin: 0 }}>{waitingCount}</p>
            <p style={{ fontSize: 10, color: '#b45309', margin: 0, fontWeight: 600 }}>WAITING</p>
          </div>
          <div style={{ flex: 1, background: '#dcfce7', borderRadius: 8, padding: 8, textAlign: 'center' }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#166534', margin: 0 }}>{activeCount}</p>
            <p style={{ fontSize: 10, color: '#15803d', margin: 0, fontWeight: 600 }}>ACTIVE</p>
          </div>
          <div style={{ flex: 1, background: '#dbeafe', borderRadius: 8, padding: 8, textAlign: 'center' }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#1e40af', margin: 0 }}>{todayCount}</p>
            <p style={{ fontSize: 10, color: '#2563eb', margin: 0, fontWeight: 600 }}>TODAY</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '0 16px' }}>
          {(['ALL', 'WAITING', 'ACTIVE', 'RESOLVED'] as const).map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              style={{ flex: 1, background: 'none', border: 'none', padding: '12px 0', fontSize: 11, fontWeight: 700, color: filter === f ? '#15803d' : '#6b7280', borderBottom: filter === f ? '2px solid #15803d' : '2px solid transparent', cursor: 'pointer' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Conversation List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredConvs.map(c => (
            <div 
              key={c.id} 
              onClick={() => setSelectedId(c.id)}
              style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: selectedId === c.id ? '#f0fdf4' : '#fff', cursor: 'pointer', position: 'relative' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0f2318', margin: 0 }}>{c.guestName || 'Anonymous'}</p>
                <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>{formatTimeAgo(c.lastMessageAt)}</p>
              </div>
              <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {c.messages?.[0]?.content || c.subject || 'No messages'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: c.status === 'WAITING' ? '#fef3c7' : c.status === 'ACTIVE' ? '#dcfce7' : '#f3f4f6', color: c.status === 'WAITING' ? '#92400e' : c.status === 'ACTIVE' ? '#166534' : '#6b7280' }}>
                  {c.status}
                </span>
                {(c._count?.messages || 0) > 0 && (
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {c._count?.messages}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8faf8' }}>
        {!selectedConv ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14 }}>
            Select a conversation to start chatting
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ height: 56, background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f2318', margin: 0 }}>{selectedConv.guestName}</h3>
                <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{selectedConv.subject}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 4, background: selectedConv.status === 'WAITING' ? '#fef3c7' : selectedConv.status === 'ACTIVE' ? '#dcfce7' : '#f3f4f6', color: selectedConv.status === 'WAITING' ? '#92400e' : selectedConv.status === 'ACTIVE' ? '#166534' : '#6b7280' }}>
                  {selectedConv.status}
                </span>
                {selectedConv.status !== 'RESOLVED' && (
                  <button onClick={handleResolve} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {(selectedConv.messages || []).map((msg, i) => {
                if (msg.senderType === 'SYSTEM') return (
                  <div key={msg.id || i} style={{ textAlign: 'center', margin: '8px 0' }}>
                    <span style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>{msg.content}</span>
                  </div>
                )
                
                const isPharm = msg.senderType === 'PHARMACIST'
                
                return (
                  <div key={msg.id || i} style={{ display: 'flex', flexDirection: 'column', alignItems: isPharm ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                    {!isPharm && <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, marginBottom: 2, marginLeft: 4 }}>{msg.senderName}</span>}
                    
                    {msg.messageType === 'PRODUCT_RECOMMENDATION' ? (
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 12, marginTop: 6, maxWidth: 300 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#15803d', marginBottom: 8 }}>💊 Recommended Product</p>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          {msg.productImage ? (
                            <Image src={msg.productImage} alt={msg.productName || ''} width={40} height={40} style={{ borderRadius: 8, objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={18} color="#15803d" /></div>
                          )}
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: '#0f2318', margin: 0 }}>{msg.productName}</p>
                            <p style={{ fontSize: 14, fontWeight: 700, color: '#15803d', margin: 0 }}>GHS {Number(msg.productPrice).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        background: isPharm ? '#15803d' : '#fff',
                        color: isPharm ? '#fff' : '#0f2318',
                        border: isPharm ? 'none' : '1px solid #e5e7eb',
                        borderRadius: 16,
                        borderBottomRightRadius: isPharm ? 4 : 16,
                        borderBottomLeftRadius: isPharm ? 16 : 4,
                        padding: '10px 14px',
                        maxWidth: '75%',
                        fontSize: 14,
                        lineHeight: 1.5,
                      }}>
                        {msg.content}
                      </div>
                    )}
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            {selectedConv.status !== 'RESOLVED' && (
              <div style={{ background: '#fff', borderTop: '1px solid #e5e7eb', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                
                {/* Quick Replies */}
                <div style={{ display: 'flex', overflowX: 'auto', gap: 8, paddingBottom: 4, scrollbarWidth: 'none' }}>
                  {QUICK_REPLIES.map((reply, i) => (
                    <button 
                      key={i} 
                      onClick={() => setInput(reply)}
                      style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: '6px 12px', fontSize: 11, color: '#15803d', cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                {/* Product Search */}
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: 8, padding: '0 12px', height: 36 }}>
                    <Search size={14} color="#6b7280" />
                    <input 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search products to recommend..."
                      style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', padding: '0 8px', fontSize: 13 }}
                    />
                  </div>
                  
                  {products.length > 0 && (
                    <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 -4px 6px -1px rgb(0 0 0 / 0.1)', marginBottom: 8, maxHeight: 200, overflowY: 'auto', zIndex: 10 }}>
                      {products.map(p => (
                        <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {p.imageUrl ? (
                              <Image src={p.imageUrl} alt={p.name} width={32} height={32} style={{ borderRadius: 6, objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: 32, height: 32, borderRadius: 6, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={14} color="#9ca3af" /></div>
                            )}
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 600, color: '#0f2318', margin: 0 }}>{p.name}</p>
                              <p style={{ fontSize: 12, color: '#15803d', margin: 0, fontWeight: 700 }}>GHS {Number(p.price).toFixed(2)}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleRecommend(p)}
                            style={{ background: '#15803d', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                          >
                            Recommend →
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Textarea & Send */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                  <textarea 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="Type your response to the student..."
                    rows={3}
                    style={{ flex: 1, border: '1px solid #d1d5db', borderRadius: 12, padding: '12px', fontSize: 15, resize: 'none', outline: 'none' }}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={sending || !input.trim()}
                    style={{ background: '#15803d', color: '#fff', border: 'none', borderRadius: 12, height: 44, padding: '0 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: !input.trim() ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    Send <Send size={16} />
                  </button>
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
