'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/cartContext'
import {
  ArrowLeft, Shield, Clock, Send, Headphones,
  Package, CheckCircle, ShoppingCart, RotateCcw
} from 'lucide-react'
import Image from 'next/image'

const STORAGE_KEY = 'comfort_support_conv_id'

type MsgType = 'TEXT' | 'PRODUCT_RECOMMENDATION' | 'SYSTEM_NOTICE'
type SenderType = 'STUDENT' | 'PHARMACIST' | 'SYSTEM'
type ConvStatus = 'WAITING' | 'ACTIVE' | 'RESOLVED' | 'CLOSED'

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
}

interface Conversation {
  id: string
  guestName: string
  status: ConvStatus
  messages: Message[]
}

const subjects = [
  'I have symptoms and need medication',
  'I want to know if two medicines are safe together',
  'I need advice about a prescription',
  'I want to know the right dosage',
  'Other health question',
]

function formatTime(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' })
}

function StatusBar({ status }: { status: ConvStatus }) {
  if (status === 'WAITING') return (
    <div style={{ background: '#fef3c7', borderBottom: '1px solid #fde68a', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 12, color: '#92400e', fontWeight: 600 }}>
        ⏳ Waiting for pharmacist…
      </span>
      <span className="support-dots"><span /><span /><span /></span>
    </div>
  )
  if (status === 'ACTIVE') return (
    <div style={{ background: '#f0fdf4', borderBottom: '1px solid #bbf7d0', padding: '8px 16px' }}>
      <span style={{ fontSize: 12, color: '#15803d', fontWeight: 600 }}>● Pharmacist is online</span>
    </div>
  )
  return (
    <div style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', padding: '8px 16px' }}>
      <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>Consultation ended</span>
    </div>
  )
}

function ProductCard({ msg }: { msg: Message }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (!msg.productId || !msg.productName || !msg.productPrice) return
    addToCart({
      id: msg.productId,
      name: msg.productName,
      price: msg.productPrice,
      image: msg.productImage ?? '',
      quantity: 1,
    })
    setAdded(true)
  }

  return (
    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 12, marginTop: 6, maxWidth: 280 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: '#15803d', marginBottom: 8 }}>💊 Recommended for you</p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        {msg.productImage ? (
          <Image src={msg.productImage} alt={msg.productName ?? ''} width={40} height={40}
            style={{ borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Package size={18} color="#15803d" />
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#0f2318', margin: 0 }}>{msg.productName}</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#15803d', margin: 0 }}>
            GHS {msg.productPrice?.toFixed(2)}
          </p>
        </div>
      </div>
      <button onClick={handleAdd} disabled={added}
        style={{ width: '100%', height: 38, background: added ? '#6b7280' : '#15803d', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: added ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        {added ? <><CheckCircle size={14} /> Added to Cart</> : <><ShoppingCart size={14} /> Add to Cart — GHS {msg.productPrice?.toFixed(2)}</>}
      </button>
    </div>
  )
}

function WaitingState({ isOpen }: { isOpen: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', textAlign: 'center', gap: 16 }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f0fdf4', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Clock size={24} color="#15803d" />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#0f2318', margin: '0 0 6px' }}>Your message has been received</p>
        {isOpen
          ? <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>A pharmacist will join shortly. Average response time is 5–10 minutes during pharmacy hours.</p>
          : <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>Our pharmacist is currently offline. Your message has been saved and a pharmacist will respond when we open. You will receive a WhatsApp reply at the number you provided.</p>}
      </div>
      <div style={{ background: '#f0fdf4', borderRadius: 10, padding: 12, width: '100%', maxWidth: 300 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#15803d', margin: '0 0 6px' }}>Pharmacy Hours</p>
        <p style={{ fontSize: 11, color: '#4b5563', margin: '2px 0' }}>Monday – Friday: 8am – 8pm</p>
        <p style={{ fontSize: 11, color: '#4b5563', margin: '2px 0' }}>Saturday: 9am – 6pm</p>
        <p style={{ fontSize: 11, color: '#4b5563', margin: '2px 0' }}>Sunday: 10am – 4pm</p>
        <p style={{ fontSize: 10, color: '#9ca3af', margin: '4px 0 0' }}>All times Ghana (GMT)</p>
      </div>
    </div>
  )
}

export default function SupportPage() {
  const router = useRouter()
  const [conv, setConv] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [status, setStatus] = useState<ConvStatus>('WAITING')
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [isOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sseRef = useRef<EventSource | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState(subjects[0])
  const [firstMessage, setFirstMessage] = useState('')
  const [formError, setFormError] = useState('')

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const connectSSE = useCallback((convId: string) => {
    if (sseRef.current) sseRef.current.close()
    const es = new EventSource(`/api/support/stream/${convId}`)
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        if (data.type === 'new_messages') {
          setMessages(prev => {
            const existingIds = new Set(prev.map(m => m.id))
            const fresh = (data.messages as Message[]).filter(m => !existingIds.has(m.id))
            return fresh.length > 0 ? [...prev, ...fresh] : prev
          })
        }
        if (data.type === 'status_update') {
          setStatus(data.status)
        }
      } catch { /* ignore */ }
    }
    sseRef.current = es
  }, [])

  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_KEY)
    if (!savedId) return
    setLoading(true)
    fetch(`/api/support/conversations/${savedId}`)
      .then(r => r.ok ? r.json() : null)
      .then((data: Conversation | null) => {
        if (data) {
          setConv(data)
          setMessages(data.messages)
          setStatus(data.status)
          connectSSE(data.id)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      })
      .catch(() => localStorage.removeItem(STORAGE_KEY))
      .finally(() => setLoading(false))
    return () => sseRef.current?.close()
  }, [connectSSE])

  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  async function handleStart(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    if (!name.trim()) return setFormError('Please enter your name.')
    if (firstMessage.trim().length < 20) return setFormError('Please describe your situation in at least 20 characters.')
    setLoading(true)
    try {
      const res = await fetch('/api/support/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName: name, guestPhone: phone, subject, firstMessage }),
      })
      const data: Conversation = await res.json()
      localStorage.setItem(STORAGE_KEY, data.id)
      setConv(data)
      setMessages(data.messages)
      setStatus('WAITING')
      connectSSE(data.id)
    } catch {
      setFormError('Could not connect. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSend() {
    if (!input.trim() || !conv || sending) return
    setSending(true)
    const text = input.trim()
    setInput('')
    try {
      const res = await fetch('/api/support/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: conv.id,
          content: text,
          senderType: 'STUDENT',
          senderName: conv.guestName,
        }),
      })
      const msg: Message = await res.json()
      setMessages(prev => {
        if (prev.find(m => m.id === msg.id)) return prev
        return [...prev, msg]
      })
    } catch { /* retry later */ }
    finally { setSending(false) }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  function startNew() {
    sseRef.current?.close()
    localStorage.removeItem(STORAGE_KEY)
    setConv(null); setMessages([]); setName(''); setPhone(''); setSubject(subjects[0]); setFirstMessage('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#f8faf8' }}>
      {/* Header */}
      <div style={{ background: '#1a2e22', height: 56, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12, flexShrink: 0, paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, display: 'flex' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Headphones size={16} color="#fff" />
          </div>
          <div>
            <p style={{ color: '#fff', fontSize: 14, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Pharmacist Support</p>
            <p style={{ color: '#4ade80', fontSize: 11, margin: 0 }}>● Online · responds within minutes</p>
          </div>
        </div>
        {conv && (
          <button onClick={startNew} title="Start new consultation"
            style={{ background: 'none', border: '1px solid #254532', borderRadius: 8, color: '#4ade80', cursor: 'pointer', padding: '4px 8px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
            <RotateCcw size={12} /> New
          </button>
        )}
      </div>

      {/* Info Banner */}
      <div style={{ background: '#f0fdf4', borderBottom: '1px solid #bbf7d0', padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', flexShrink: 0 }}>
        <Shield size={20} color="#15803d" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0f2318', margin: '0 0 2px' }}>Talk to a Real Pharmacist</p>
          <p style={{ fontSize: 12, color: '#4b5563', margin: 0, lineHeight: 1.5 }}>
            Describe your symptoms and our licensed pharmacist will recommend the right medication from our pharmacy for you.
          </p>
        </div>
      </div>

      {loading && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Loading…</p>
        </div>
      )}

      {/* Start Form */}
      {!conv && !loading && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px' }}>
          <form onSubmit={handleStart} style={{ background: '#fff', maxWidth: 420, margin: '0 auto', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24 }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#0f2318', margin: '0 0 4px' }}>Start a Consultation</p>
            <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 20px' }}>Free · Confidential · Answered by a licensed pharmacist</p>

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Full name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required
              style={{ width: '100%', height: 44, border: '1px solid #d1d5db', borderRadius: 10, padding: '0 12px', fontSize: 15, marginBottom: 14, boxSizing: 'border-box', outline: 'none' }} />

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>WhatsApp number (optional)</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0244123456"
              style={{ width: '100%', height: 44, border: '1px solid #d1d5db', borderRadius: 10, padding: '0 12px', fontSize: 15, marginBottom: 14, boxSizing: 'border-box', outline: 'none' }} />

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>What is your concern? *</label>
            <select value={subject} onChange={e => setSubject(e.target.value)}
              style={{ width: '100%', height: 44, border: '1px solid #d1d5db', borderRadius: 10, padding: '0 12px', fontSize: 14, marginBottom: 14, boxSizing: 'border-box', background: '#fff' }}>
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Describe your situation *</label>
            <textarea value={firstMessage} onChange={e => setFirstMessage(e.target.value)}
              placeholder="Example: I have had a headache and fever since yesterday morning. I also feel weak. What should I take?" rows={4} required minLength={20}
              style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 10, padding: '10px 12px', fontSize: 15, marginBottom: 16, boxSizing: 'border-box', resize: 'none', outline: 'none', lineHeight: 1.5 }} />

            {formError && <p style={{ color: '#dc2626', fontSize: 12, margin: '-8px 0 12px' }}>{formError}</p>}

            <button type="submit" disabled={loading}
              style={{ width: '100%', height: 48, background: '#15803d', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Connecting you to a pharmacist…' : 'Start Consultation →'}
            </button>
          </form>
        </div>
      )}

      {/* Chat Interface */}
      {conv && !loading && (
        <>
          <StatusBar status={status} />
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
            {status === 'WAITING' && messages.length <= 1 && (
              <WaitingState isOpen={isOpen} />
            )}
            {messages.map(msg => {
              if (msg.senderType === 'SYSTEM') return (
                <div key={msg.id} style={{ textAlign: 'center', margin: '8px 0' }}>
                  <span style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>{msg.content}</span>
                </div>
              )
              const isStudent = msg.senderType === 'STUDENT'
              return (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isStudent ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                  {!isStudent && <span style={{ fontSize: 10, color: '#15803d', fontWeight: 600, marginBottom: 2, marginLeft: 4 }}>Pharmacist</span>}
                  {msg.messageType === 'PRODUCT_RECOMMENDATION' ? (
                    <ProductCard msg={msg} />
                  ) : (
                    <div style={{
                      background: isStudent ? '#15803d' : '#fff',
                      color: isStudent ? '#fff' : '#0f2318',
                      border: isStudent ? 'none' : '1px solid #e5e7eb',
                      borderRadius: 16,
                      borderBottomRightRadius: isStudent ? 4 : 16,
                      borderBottomLeftRadius: isStudent ? 16 : 4,
                      padding: '8px 12px',
                      maxWidth: '78%',
                      fontSize: 14,
                      lineHeight: 1.5,
                    }}>
                      {msg.content}
                    </div>
                  )}
                  <span style={{ fontSize: 10, color: '#9ca3af', marginTop: 2, marginLeft: 4, marginRight: 4 }}>{formatTime(msg.createdAt)}</span>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {status !== 'RESOLVED' && status !== 'CLOSED' && (
            <div style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '8px 12px', paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder="Type your message to the pharmacist…" rows={1}
                  style={{ flex: 1, border: '1.5px solid #d1fae5', borderRadius: 12, padding: '10px 12px', fontSize: 16, resize: 'none', outline: 'none', lineHeight: 1.5, maxHeight: 120, overflowY: 'auto', background: '#f0fdf4' }} />
                <button onClick={handleSend} disabled={sending || !input.trim()}
                  style={{ width: 44, height: 44, borderRadius: '50%', background: '#15803d', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: !input.trim() ? 0.5 : 1 }}>
                  <Send size={18} color="#fff" />
                </button>
              </div>
              <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', margin: '6px 0 0' }}>🔒 Your consultation is private and confidential</p>
            </div>
          )}
        </>
      )}

      <style>{`
        .support-dots { display: inline-flex; gap: 3px; align-items: center; margin-left: 4px; }
        .support-dots span { width: 4px; height: 4px; border-radius: 50%; background: #92400e; animation: support-dot-bounce 1.2s infinite; }
        .support-dots span:nth-child(2) { animation-delay: 0.2s; }
        .support-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes support-dot-bounce { 0%,80%,100% { opacity: 0.3; } 40% { opacity: 1; } }
      `}</style>
    </div>
  )
}
