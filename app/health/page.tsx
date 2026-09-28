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
  { label: 'Malaria', value: 'Malaria', icon: ShieldCheck },
  { label: 'Medications', value: 'Medications', icon: Pill },
  { label: 'Mental Health', value: 'Mental Health', icon: Brain },
  { label: 'Nutrition', value: 'Nutrition', icon: Sparkles },
  { label: 'Sexual Health', value: 'Sexual Health', icon: Heart },
  { label: 'Fitness', value: 'Fitness', icon: Activity },
  { label: "Women's Health", value: "Women's Health", icon: Users },
  { label: 'First Aid', value: 'First Aid', icon: BriefcaseMedical },
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
        if (activeCategory !== 'all') {
          params.set('category', activeCategory)
        }
        const res = await fetch(`/api/health/articles?${params.toString()}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (!cancelled) {
          setArticles(Array.isArray(data.articles) ? data.articles : [])
        }
      } catch {
        if (!cancelled) setArticles([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadArticles()

    return () => {
      cancelled = true
    }
  }, [activeCategory])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (activeCategory === 'all') {
      params.delete('category')
    } else {
      params.set('category', activeCategory)
    }
    router.replace(`/health?${params.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  const lowerQuery = searchQuery.trim().toLowerCase()
  const filteredArticles = articles.filter((article) => {
    if (!lowerQuery) return true

    const haystack = [
      article.title,
      article.excerpt,
      article.category,
      article.tags?.join(' '),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(lowerQuery)
  })

  const hasVisibleArticles = filteredArticles.length > 0
  const featuredArticle =
    activeCategory === 'all' && !lowerQuery
      ? filteredArticles.find((article) => article.isFeatured) ?? filteredArticles[0]
      : undefined

  const listArticles = featuredArticle
    ? filteredArticles.filter((article) => article.id !== featuredArticle.id)
    : filteredArticles

  return (
    <>
      <div className="min-h-screen bg-[#f2f6f3] text-[#0f2318] md:hidden">
        <div className="px-4 pb-4 pt-4">
          <div className="rounded-[22px] bg-white p-4 shadow-[0_10px_22px_rgba(15,35,24,0.08)]">
            <div className="mb-3 flex items-center gap-2 text-[#0f8a67]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf9f2]">
                <BookOpenText className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">ComfortHealth Care Hub</span>
            </div>

            <h1 className="text-[2.1rem] font-black leading-[0.96] tracking-[-0.06em] text-[#0f2318]">
              Your Health.
              <br />
              Our Priority.
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#4a655d]">
              Get trusted, easy-to-understand health information to help you live a healthier,
              happier life. Explore our expert-backed articles on a wide range of health topics.
            </p>

            <div className="mt-4 flex items-center gap-3 rounded-full border border-[#dfeae3] bg-[#f7faf8] px-3 py-3 shadow-sm">
              <Search className="h-4 w-4 shrink-0 text-[#0f8a67]" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search health topics..."
                aria-label="Search health topics"
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#0f2318] outline-none placeholder:text-[#70827b]"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, label: 'Trusted Sources' },
                { icon: Stethoscope, label: 'Expert Reviewed' },
                { icon: HeartPulse, label: 'Practical Tips' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-full bg-[#f1faf4] px-2.5 py-1.5 text-[10px] font-medium text-[#0f2318]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0f8a67]">
                    <Icon className="h-3 w-3" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[22px] bg-white p-3 shadow-[0_10px_22px_rgba(15,35,24,0.08)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[1.6rem] font-black tracking-[-0.05em] text-[#0f2318]">Health Topics</h2>
              <Link href="/health?category=all" className="text-sm font-semibold text-[#0f8a67]">
                View all →
              </Link>
            </div>

            <div className="space-y-2">
              {CATEGORIES.filter((topic) => topic.value !== 'all').map((topic) => {
                const Icon = topic.icon ?? BookOpen
                const meta = getCategoryMeta(topic.label)
                const isActive = activeCategory === topic.value

                return (
                  <button
                    key={topic.value}
                    type="button"
                    onClick={() => setActiveCategory(topic.value)}
                    className="flex w-full items-center justify-between rounded-[18px] border px-3 py-3 text-left transition"
                    style={{
                      backgroundColor: isActive ? meta.bg : '#f6faf7',
                      borderColor: isActive ? meta.border : '#e3efe8',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-[14px] border"
                        style={{ backgroundColor: meta.soft, borderColor: meta.border, color: meta.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#102d21]">{topic.label}</div>
                        <div className="text-[11px] text-[#54706a]">
                          {topic.value === 'Malaria' && 'Prevention, symptoms, treatment'}
                          {topic.value === 'Medications' && 'Safety, dosage, advice'}
                          {topic.value === 'Mental Health' && 'Stress, anxiety, resilience'}
                          {topic.value === 'Nutrition' && 'Balanced meals and habits'}
                          {topic.value === 'Sexual Health' && 'STIs, hygiene, awareness'}
                          {topic.value === 'Fitness' && 'Exercise and wellness'}
                          {topic.value === "Women's Health" && 'Prenatal, hormones, care'}
                          {topic.value === 'First Aid' && 'Emergency support and safety'}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#123126]" />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5 rounded-[22px] bg-white p-3 shadow-[0_10px_22px_rgba(15,35,24,0.08)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[1.45rem] font-black tracking-[-0.05em] text-[#0f2318]">Featured Articles</h2>
              <Link href="/health" className="text-sm font-semibold text-[#0f8a67]">
                View all →
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                <ArticleSkeleton />
                <ArticleSkeleton />
              </div>
            ) : !hasVisibleArticles ? (
              <div className="rounded-[20px] border border-dashed border-[#d1e1d8] bg-[#f6faf7] p-4">
                <p className="text-base font-bold text-[#0f2318]">No articles in this category yet</p>
                <p className="mt-2 text-sm text-[#4b665e]">Try another health topic to continue exploring.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(featuredArticle ? [featuredArticle, ...listArticles] : filteredArticles).slice(0, 3).map((article) => {
                  const meta = getCategoryMeta(article.category)

                  return (
                    <Link
                      key={article.id}
                      href={`/health/${article.slug}`}
                      className="flex overflow-hidden rounded-[18px] border border-[#edf1ee] bg-[#fbfcfb]"
                    >
                      <div className="relative h-[112px] w-[118px] shrink-0">
                        <Image
                          src={article.coverImage || 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80'}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="118px"
                          unoptimized
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="rounded-full px-2 py-1 text-[9px] font-semibold"
                            style={{ backgroundColor: meta.soft, color: meta.color }}
                          >
                            {article.category}
                          </span>
                          <span className="text-[10px] text-[#5c7570]">{article.readTime}</span>
                        </div>

                        <div className="mt-2 min-w-0">
                          <h3 className="line-clamp-2 text-[15px] font-bold leading-[1.3] text-[#0f2318]">{article.title}</h3>
                          <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#4d665f]">{article.excerpt}</p>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[10px] text-[#5a7068]">
                          <div className="flex items-center gap-1">
                            <Clock3 className="h-3 w-3" />
                            <span>
                              {new Date(article.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-[#0f8a67]" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <div className="mt-5 rounded-[22px] bg-[#ecf9f1] p-4 shadow-[0_10px_22px_rgba(15,35,24,0.05)]">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0f8a67] shadow-sm">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[1.15rem] font-black tracking-[-0.04em] text-[#0f2318]">Have a health question?</p>
                <p className="text-xs text-[#46675d]">Ask Comfort AI for general guidance.</p>
              </div>
            </div>
            <Link
              href="/ai-guide"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0d5a42] px-4 py-3 text-sm font-semibold text-white"
            >
              Ask Comfort AI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 rounded-[22px] bg-white p-4 shadow-[0_10px_22px_rgba(15,35,24,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-black text-[#0f2318]">Popular Questions</h3>
              <button type="button" className="text-xs font-semibold text-[#0f8a67]">View all</button>
            </div>

            <div className="space-y-2">
              {['What are the symptoms of malaria?', 'How can I manage stress?', 'What foods boost immunity?', 'When should I seek medical help?'].map((question) => (
                <button
                  key={question}
                  type="button"
                  className="flex w-full items-center justify-between rounded-full border border-[#dfeae3] bg-[#f8fbf9] px-3 py-2.5 text-left text-xs font-medium text-[#163a2d]"
                >
                  {question}
                  <ChevronRight className="h-3.5 w-3.5 text-[#103b2d]" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="hidden min-h-screen overflow-x-hidden bg-[#f7faf8] text-[#0f2318] md:block">
        <div className="mx-auto w-full max-w-[1500px] px-4 pb-8 pt-4 md:px-8 xl:px-12">
          <section className="overflow-hidden rounded-[30px] border border-[#dfeae3] bg-[#eef6f0] shadow-[0_12px_36px_rgba(15,35,24,0.05)]">
            <div className="flex flex-col gap-5 px-5 py-5 md:px-8 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-7">
              <div className="w-full max-w-[650px] flex-1 min-w-0">
                <div className="mb-4 flex items-center gap-2 text-[#0f8a67]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                    <BookOpenText className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold">ComfortHealth Care Hub</span>
                </div>

                <div className="mb-4 flex w-full max-w-[540px] items-center gap-3 rounded-full border border-[#dfeae3] bg-white px-4 py-3 shadow-sm">
                  <Search className="h-4 w-4 shrink-0 text-[#0f8a67]" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search health topics, medicines, vitamins..."
                    aria-label="Search health topics"
                    className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#0f2318] outline-none placeholder:text-[#6d8079]"
                  />
                </div>

                <h1 className="text-[2rem] font-black tracking-[-0.05em] text-[#0f2318] sm:text-4xl md:text-5xl">
                  Your Health. Our Priority.
                </h1>

                <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#355a4d] sm:text-base md:text-lg md:leading-7">
                  Get trusted, easy-to-understand health information to help you live a healthier,
                  happier life. Explore our expert-backed articles on a wide range of health topics.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    { icon: ShieldCheck, title: 'Trusted Sources', description: 'GHS | WHO | MoH & more' },
                    { icon: Stethoscope, title: 'Expert Reviewed', description: 'Healthcare professionals' },
                    { icon: HeartPulse, title: 'Practical Tips', description: 'For everyday life' },
                  ].map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#d4e7d9] bg-white/70 px-3 py-3 backdrop-blur-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f0] text-[#0f8a67]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0f2318]">{title}</p>
                        <p className="text-xs text-[#4d675f]">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative w-full max-w-[520px] flex-1 min-w-0">
                <div
                  className="relative h-[200px] overflow-hidden rounded-[28px] border border-[#dfeae3] bg-cover bg-center shadow-[0_18px_46px_rgba(15,35,24,0.08)] sm:h-[220px] md:h-[250px]"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#022019]/10 via-transparent to-[#022019]/15" />
                  <div className="absolute bottom-3 right-3 rounded-[18px] bg-white/80 px-3 py-2 text-right shadow-md backdrop-blur-sm sm:bottom-4 sm:right-4 sm:px-4 sm:py-3">
                    <p className="font-handwritten text-[20px] leading-none text-[#0f8a67] italic sm:text-[24px] md:text-[28px]">
                      Better
                    </p>
                    <p className="font-handwritten text-[20px] leading-none text-[#0f8a67] italic sm:text-[24px] md:text-[28px]">
                      Health
                    </p>
                    <p className="font-handwritten text-[20px] leading-none text-[#0f8a67] italic sm:text-[24px] md:text-[28px]">
                      Starts with
                    </p>
                    <p className="font-handwritten text-[20px] leading-none text-[#0f8a67] italic sm:text-[24px] md:text-[28px]">
                      Knowledge
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 md:mt-10">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em] text-[#0f2318] md:text-[2rem]">
                  Explore Our Health Topics
                </h2>
                <p className="mt-2 text-base text-[#49695d]">
                  Find helpful articles and guides on the topics that matter most to you.
                </p>
              </div>
              <Link
                href="/health?category=all"
                className="hidden items-center gap-2 text-sm font-semibold text-[#0f8a67] md:inline-flex"
              >
                View all articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mb-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]">
              {CATEGORIES.map((topic) => {
                const isActive = activeCategory === topic.value
                return (
                  <button
                    key={topic.value}
                    type="button"
                    onClick={() => setActiveCategory(topic.value)}
                    aria-pressed={isActive}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? 'border-[#0f2318] bg-[#0f2318] text-white shadow-sm'
                        : 'border-[#d4e7d9] bg-[#f4faf6] text-[#1a6d52] hover:border-[#bdd7c9]'
                    }`}
                  >
                    {topic.label}
                  </button>
                )
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {CATEGORIES.filter((topic) => topic.value !== 'all').map((topic) => {
                const Icon = topic.icon ?? BookOpen
                const meta = getCategoryMeta(topic.label)
                const isActive = activeCategory === topic.value

                return (
                  <button
                    key={topic.value}
                    type="button"
                    onClick={() => setActiveCategory(topic.value)}
                    aria-pressed={isActive}
                    className="group flex items-center justify-between rounded-[22px] border p-4 text-left shadow-[0_8px_18px_rgba(15,35,24,0.03)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,35,24,0.06)] focus:outline-none focus:ring-2 focus:ring-[#0f8a67] focus:ring-offset-2"
                    style={{ backgroundColor: isActive ? '#0f2318' : meta.bg, borderColor: isActive ? '#0f2318' : '#dfeae3' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                        style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : meta.soft, borderColor: isActive ? 'rgba(255,255,255,0.16)' : meta.border, color: isActive ? '#fff' : meta.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-base font-bold ${isActive ? 'text-white' : 'text-[#123126]'}`}>{topic.label}</span>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-[#123126]'}`} />
                  </button>
                )
              })}
            </div>
          </section>

          <section className="mt-10 md:mt-12">
            <div className="mb-5 flex items-end justify-between gap-3">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[#0f2318] md:text-[2rem]">
                Featured Articles
              </h2>
              <Link href="/health" className="hidden items-center gap-2 text-sm font-semibold text-[#0f8a67] md:inline-flex">
                View all articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <ArticleSkeleton key={idx} />
                ))}
              </div>
            ) : !hasVisibleArticles ? (
              <div className="rounded-[28px] border border-dashed border-[#cfe0d5] bg-white p-5 shadow-[0_12px_24px_rgba(15,35,24,0.03)] md:p-7">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ecf8f1] text-[#0f8a67]">
                      <BookOpenText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0f2318]">No articles in this category yet</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#587167]">
                        Browse another health topic, explore our featured guides, or ask a pharmacist for personalised support.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.filter((topic) => topic.value !== activeCategory && topic.value !== 'all').slice(0, 4).map((topic) => (
                      <button
                        key={topic.value}
                        type="button"
                        onClick={() => setActiveCategory(topic.value)}
                        className="rounded-full border border-[#d4e7d9] bg-[#f4faf6] px-3 py-1.5 text-xs font-semibold text-[#1a6d52]"
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(featuredArticle ? [featuredArticle, ...listArticles].slice(0, 6) : filteredArticles.slice(0, 6)).map((article) => {
                  const meta = getCategoryMeta(article.category)

                  return (
                    <Link
                      key={article.id}
                      href={`/health/${article.slug}`}
                      className="group overflow-hidden rounded-[22px] border border-[#dfeae3] bg-white shadow-[0_10px_24px_rgba(15,35,24,0.04)] transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(15,35,24,0.08)]"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={article.coverImage || 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80'}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          unoptimized
                        />
                      </div>

                      <div className="p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span
                            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                            style={{ backgroundColor: meta.soft, color: meta.color }}
                          >
                            {article.category}
                          </span>
                          <span className="text-xs text-[#5b7168]">{article.readTime}</span>
                        </div>

                        <h3 className="text-lg font-bold leading-snug text-[#0f2318]">{article.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#4d665f]">{article.excerpt}</p>

                        <div className="mt-4 flex items-center justify-between border-t border-[#edf1ee] pt-3 text-sm text-[#5b7168]">
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4" />
                            <span>{new Date(article.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <span className="flex items-center gap-1 font-semibold text-[#0f8a67]">
                            Read more <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>

          <section className="mt-10 rounded-[30px] border border-[#dfeae3] bg-white p-4 shadow-[0_12px_30px_rgba(15,35,24,0.04)] md:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.3fr_1.2fr_1fr] lg:items-center">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="overflow-hidden rounded-[20px] border border-[#dfeae3] bg-[#eef8f2] p-2">
                  <div className="relative h-24 w-24 overflow-hidden rounded-[16px]">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80"
                      alt="Pharmacist"
                      fill
                      className="object-cover"
                      sizes="96px"
                      unoptimized
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-black tracking-[-0.04em] text-[#0f2318] sm:text-2xl">Need more personalised advice?</p>
                  <p className="mt-2 text-sm text-[#49695d] sm:text-base">Our pharmacists are here to help with your health questions.</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start">
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0f2318] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#17392b] focus:outline-none focus:ring-2 focus:ring-[#0f8a67] focus:ring-offset-2"
                >
                  Ask a Pharmacist <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-[22px] border border-[#dfeae3] bg-[#f8fbf9] p-4">
                <h3 className="text-lg font-bold text-[#0f2318]">Health Information Disclaimer</h3>
                <p className="mt-2 text-sm leading-6 text-[#4d675f]">
                  The information provided on ComfortHealth is for general educational purposes only and is not a substitute
                  for professional medical advice, diagnosis or treatment. Always consult a qualified healthcare professional for
                  medical concerns.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[26px] border border-[#dfeae3] bg-[#ecf9f1] p-5 shadow-[0_12px_24px_rgba(15,35,24,0.04)] md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0f8a67]">Need quick health guidance?</p>
                <h3 className="mt-2 text-xl font-bold text-[#0f2318] sm:text-2xl">Have a health question?</h3>
                <p className="mt-2 text-sm text-[#49695d] sm:text-base">Ask Comfort AI for general health information and learning resources.</p>
              </div>
              <Link
                href="/ai-guide"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-base font-semibold text-[#0f8a67] shadow-sm transition hover:bg-[#f5fbf8] focus:outline-none focus:ring-2 focus:ring-[#0f8a67] focus:ring-offset-2"
              >
                Ask Comfort AI <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <footer className="mt-10 rounded-t-[30px] border-t border-[#dfeae3] bg-[#f5faf6] px-2 pt-6 md:px-0">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr]">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f8a67] text-white">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-black tracking-[-0.04em] text-[#0f2318]">ComfortHealth</p>
                    <p className="text-sm text-[#587167]">Good health. With comfort.</p>
                  </div>
                </div>
                <p className="max-w-xs text-sm leading-6 text-[#49695d]">
                  Trusted health information and pharmacy support designed to help families stay well and informed.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold uppercase tracking-[0.12em] text-[#0f2318]">Navigation</h4>
                <ul className="mt-4 space-y-3 text-sm text-[#49695d]">
                  <li><Link href="/" className="hover:text-[#0f8a67]">Home</Link></li>
                  <li><Link href="/shop-page" className="hover:text-[#0f8a67]">Shop</Link></li>
                  <li><Link href="/health" className="hover:text-[#0f8a67]">Health Education</Link></li>
                  <li><Link href="/support" className="hover:text-[#0f8a67]">Pharmacist Support</Link></li>
                  <li><Link href="/contact" className="hover:text-[#0f8a67]">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-bold uppercase tracking-[0.12em] text-[#0f2318]">Health Topics</h4>
                <ul className="mt-4 space-y-3 text-sm text-[#49695d]">
                  {['Malaria', 'Mental Health', 'Nutrition', 'Sexual Health', 'Fitness', "Women's Health", 'First Aid'].map((item) => (
                    <li key={item}><Link href={`/health?category=${encodeURIComponent(item)}`} className="hover:text-[#0f8a67]">{item}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[#dfeae3] py-5 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-medium text-[#3b5d51]">Healthy people | Healthy families | A healthier Ghana</p>
              <div className="flex items-center gap-3 text-[#0f2318]">
                <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfeae3] bg-white text-sm font-bold hover:border-[#cfe0d5]">f</a>
                <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfeae3] bg-white text-sm font-bold hover:border-[#cfe0d5]">◎</a>
                <a href="#" aria-label="X" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfeae3] bg-white text-sm font-bold hover:border-[#cfe0d5]">X</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default function HealthHubPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7faf8]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f8a67] border-t-transparent" />
        </div>
      }
    >
      <HealthHubInner />
    </Suspense>
  )
}
