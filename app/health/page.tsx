'use client'

import Image from 'next/image'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowRight,
  BookOpenText,
  Brain,
  BriefcaseMedical,
  ChevronRight,
  Clock3,
  Heart,
  HeartPulse,
  Pill,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Activity,
  BookOpen,
  MessageSquareText,
} from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Malaria', value: 'Malaria', icon: ShieldCheck, sub: 'Prevention, symptoms, treatment' },
  { label: 'Medications', value: 'Medications', icon: Pill, sub: 'Safety, dosage, advice' },
  { label: 'Mental Health', value: 'Mental Health', icon: Brain, sub: 'Stress, anxiety, resilience' },
  { label: 'Nutrition', value: 'Nutrition', icon: Sparkles, sub: 'Balanced meals and habits' },
  { label: 'Sexual Health', value: 'Sexual Health', icon: Heart, sub: 'STIs, hygiene, awareness' },
  { label: 'Fitness', value: 'Fitness', icon: Activity, sub: 'Exercise and wellness' },
  { label: "Women's Health", value: "Women's Health", icon: Users, sub: 'Prenatal, hormones, care' },
  { label: 'First Aid', value: 'First Aid', icon: BriefcaseMedical, sub: 'Emergency support and safety' },
]

const CATEGORY_META: Record<string, { bg: string; soft: string; border: string; color: string }> = {
  Malaria: { bg: '#e8f7f1', soft: '#daf3ea', border: '#c9ebdc', color: '#0f8a67' },
  Medications: { bg: '#eef3ff', soft: '#e0ebff', border: '#d2defd', color: '#2f5cc7' },
  'Mental Health': { bg: '#f3ecff', soft: '#ece2ff', border: '#e4d7ff', color: '#6a42c0' },
  Nutrition: { bg: '#fff7df', soft: '#fef1be', border: '#f7df88', color: '#ad7b0a' },
  'Sexual Health': { bg: '#fff0f5', soft: '#fce5f0', border: '#f8d4e5', color: '#bf3d6b' },
  Fitness: { bg: '#edf8ff', soft: '#dfeeff', border: '#d0ebff', color: '#1e6bbd' },
  "Women's Health": { bg: '#fff1ef', soft: '#ffe4df', border: '#f9d0c6', color: '#c2513d' },
  'First Aid': { bg: '#edfefe', soft: '#dcfbfb', border: '#c2f2f2', color: '#0e8c9a' },
  default: { bg: '#edfdf4', soft: '#e0f7ea', border: '#caefd8', color: '#0f8a67' },
}

type Article = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  coverImage?: string | null
  readTime: string
  author: string
  isFeatured: boolean
  views: number
  createdAt: string
  tags?: string[]
}

function getCategoryMeta(category: string) {
  return CATEGORY_META[category] ?? CATEGORY_META.default
}

function ArticleSkeleton() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#e6efe8] bg-white p-4 shadow-[0_8px_24px_rgba(15,35,24,0.03)]">
      <div className="mb-3 flex gap-2">
        <div className="h-6 w-20 animate-pulse rounded-full bg-[#edf4f0]" />
        <div className="h-6 w-14 animate-pulse rounded-full bg-[#edf4f0]" />
      </div>
      <div className="mb-2 h-4 w-5/6 animate-pulse rounded-full bg-[#edf4f0]" />
      <div className="mb-2 h-4 w-4/5 animate-pulse rounded-full bg-[#edf4f0]" />
      <div className="h-4 w-2/3 animate-pulse rounded-full bg-[#edf4f0]" />
    </div>
  )
}

function HealthHubInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'all'

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let cancelled = false
    const loadArticles = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (activeCategory !== 'all') params.set('category', activeCategory)
        const res = await fetch(`/api/health/articles?${params.toString()}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (!cancelled) setArticles(Array.isArray(data.articles) ? data.articles : [])
      } catch {
        if (!cancelled) setArticles([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void loadArticles()
    return () => { cancelled = true }
  }, [activeCategory])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (activeCategory === 'all') params.delete('category')
    else params.set('category', activeCategory)
    router.replace(`/health?${params.toString()}`, { scroll: false })
  }, [activeCategory, router, searchParams])

  const lowerQuery = searchQuery.trim().toLowerCase()
  const filteredArticles = articles.filter((article) => {
    if (!lowerQuery) return true
    const haystack = [article.title, article.excerpt, article.category, article.tags?.join(' ')].filter(Boolean).join(' ').toLowerCase()
    return haystack.includes(lowerQuery)
  })

  const hasVisibleArticles = filteredArticles.length > 0
  const featuredArticle = activeCategory === 'all' && !lowerQuery
    ? filteredArticles.find((article) => article.isFeatured) ?? filteredArticles[0]
    : undefined
  const listArticles = featuredArticle
    ? filteredArticles.filter((article) => article.id !== featuredArticle.id)
    : filteredArticles

  return (
    <div className="min-h-screen bg-[#f7faf8] text-[#0f2318]">
      <div className="mx-auto w-full max-w-[1500px] px-4 pb-8 pt-4 md:px-8 xl:px-12">
        {/* Hero Header */}
        <section className="overflow-hidden rounded-[26px] md:rounded-[30px] border border-[#dfeae3] bg-[#eef6f0] p-5 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-[650px] flex-1">
              <div className="mb-3 flex items-center gap-2 text-[#0f8a67]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                  <BookOpenText className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold">ComfortHealth Care Hub</span>
              </div>
              <h1 className="text-3xl font-black tracking-[-0.05em] text-[#0f2318] sm:text-4xl md:text-5xl">
                Your Health. Our Priority.
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#355a4d] sm:text-base">
                Get trusted, easy-to-understand health information to help you live a healthier, happier life.
              </p>
              <div className="mt-4 flex max-w-[540px] items-center gap-3 rounded-full border border-[#dfeae3] bg-white px-4 py-3 shadow-sm">
                <Search className="h-4 w-4 shrink-0 text-[#0f8a67]" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search health topics, medicines, vitamins..."
                  aria-label="Search health topics"
                  className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-[#6d8079]"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, label: 'Trusted Sources' },
                  { icon: Stethoscope, label: 'Expert Reviewed' },
                  { icon: HeartPulse, label: 'Practical Tips' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 rounded-full border border-[#d4e7d9] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#0f2318]">
                    <Icon className="h-3.5 w-3.5 text-[#0f8a67]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden h-[220px] w-full max-w-[480px] overflow-hidden rounded-[28px] border border-[#dfeae3] bg-cover bg-center lg:block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80')" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#022019]/20 via-transparent to-[#022019]/20" />
              <div className="absolute bottom-4 right-4 rounded-[18px] bg-white/85 px-4 py-3 text-right shadow-md backdrop-blur-sm">
                <p className="text-xl font-bold italic text-[#0f8a67]">Better Health</p>
                <p className="text-sm font-medium text-[#355a4d]">Starts with Knowledge</p>
              </div>
            </div>
          </div>
        </section>

        {/* Health Topics */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#0f2318] md:text-3xl">Explore Health Topics</h2>
            <button onClick={() => setActiveCategory('all')} className="text-sm font-semibold text-[#0f8a67]">View all →</button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4 [-ms-overflow-style:none] [scrollbar-width:none]">
            {CATEGORIES.map((topic) => {
              const isActive = activeCategory === topic.value
              return (
                <button
                  key={topic.value}
                  type="button"
                  onClick={() => setActiveCategory(topic.value)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive ? 'border-[#0f2318] bg-[#0f2318] text-white shadow-sm' : 'border-[#d4e7d9] bg-[#f4faf6] text-[#1a6d52] hover:border-[#bdd7c9]'
                  }`}
                >
                  {topic.label}
                </button>
              )
            })}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.filter((t) => t.value !== 'all').map((topic) => {
              const Icon = topic.icon ?? BookOpen
              const meta = getCategoryMeta(topic.label)
              const isActive = activeCategory === topic.value
              return (
                <button
                  key={topic.value}
                  type="button"
                  onClick={() => setActiveCategory(topic.value)}
                  className="flex items-center justify-between rounded-[22px] border p-4 text-left shadow-sm transition hover:-translate-y-0.5"
                  style={{ backgroundColor: isActive ? '#0f2318' : meta.bg, borderColor: isActive ? '#0f2318' : '#dfeae3' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border" style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : meta.soft, borderColor: isActive ? 'transparent' : meta.border, color: isActive ? '#fff' : meta.color }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-[#123126]'}`}>{topic.label}</div>
                      <div className={`text-[11px] ${isActive ? 'text-white/80' : 'text-[#54706a]'}`}>{topic.sub}</div>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#123126]'}`} />
                </button>
              )
            })}
          </div>
        </section>

        {/* Featured & Articles List */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#0f2318] md:text-3xl">Featured Articles</h2>
          </div>
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => <ArticleSkeleton key={idx} />)}
            </div>
          ) : !hasVisibleArticles ? (
            <div className="rounded-[24px] border border-dashed border-[#cfe0d5] bg-white p-6 text-center">
              <h3 className="text-xl font-bold text-[#0f2318]">No articles found</h3>
              <p className="mt-2 text-sm text-[#587167]">Try another health topic or search query to continue exploring.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(featuredArticle ? [featuredArticle, ...listArticles].slice(0, 6) : filteredArticles.slice(0, 6)).map((article) => {
                const meta = getCategoryMeta(article.category)
                return (
                  <Link key={article.id} href={`/health/${article.slug}`} className="group overflow-hidden rounded-[22px] border border-[#dfeae3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="relative h-44 w-full">
                      <Image
                        src={article.coverImage || 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80'}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: meta.soft, color: meta.color }}>
                          {article.category}
                        </span>
                        <span className="text-xs text-[#5b7168]">{article.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold leading-snug text-[#0f2318] line-clamp-2">{article.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#4d665f] line-clamp-2">{article.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-[#edf1ee] pt-3 text-xs text-[#5b7168]">
                        <div className="flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" />
                          <span>{new Date(article.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <span className="flex items-center gap-1 font-semibold text-[#0f8a67]">
                          Read <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* Support & AI Banner */}
        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[26px] border border-[#dfeae3] bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8f2] text-[#0f8a67] mb-3">
                <Stethoscope className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f2318]">Need personalised medical advice?</h3>
              <p className="mt-2 text-sm text-[#49695d]">Our qualified pharmacists are available to assist with your specific healthcare questions.</p>
            </div>
            <Link href="/support" className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f2318] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#17392b]">
              Ask a Pharmacist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[26px] border border-[#dfeae3] bg-[#ecf9f1] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0f8a67] mb-3 shadow-sm">
                <MessageSquareText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f2318]">Ask Comfort AI</h3>
              <p className="mt-2 text-sm text-[#49695d]">Get quick responses and recommendations for everyday wellness products.</p>
            </div>
            <Link href="/ai-guide" className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f8a67] shadow-sm transition hover:bg-[#f5fbf8]">
              Start Chatting <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Disclaimer & Footer */}
        <footer className="mt-12 rounded-[26px] border-t border-[#dfeae3] bg-[#f5faf6] p-6">
          <div className="mb-6 rounded-[20px] border border-[#dfeae3] bg-white p-4 text-xs leading-6 text-[#4d675f]">
            <strong>Disclaimer:</strong> The content provided on ComfortHealth is for general educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
          </div>
          <div className="flex flex-col gap-4 border-t border-[#dfeae3] pt-4 sm:flex-row sm:items-center sm:justify-between text-xs text-[#587167]">
            <p>© {new Date().getFullYear()} ComfortHealth. Good health. With comfort.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-[#0f8a67]">Privacy</Link>
              <Link href="/terms" className="hover:text-[#0f8a67]">Terms</Link>
              <Link href="/support" className="hover:text-[#0f8a67]">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default function HealthHubPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#f7faf8]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f8a67] border-t-transparent" />
      </div>
    }>
      <HealthHubInner />
    </Suspense>
  )
}
