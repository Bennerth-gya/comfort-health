'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  BookOpen,
  Clock,
  ChevronRight,
  Heart,
  TrendingUp,
  Pill,
} from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: '🌡️ Malaria', value: 'Malaria' },
  { label: '💊 Medications', value: 'Medications' },
  { label: '🧠 Mental Health', value: 'Mental Health' },
  { label: '🥗 Nutrition', value: 'Nutrition' },
  { label: '❤️ Sexual Health', value: 'Sexual Health' },
  { label: '💪 Fitness', value: 'Fitness' },
  { label: "👩 Women's Health", value: "Women's Health" },
  { label: '🩹 First Aid', value: 'First Aid' },
]

const CATEGORY_COLORS: Record<string, string> = {
  Malaria: '#dc2626',
  Medications: '#2563eb',
  'Mental Health': '#7c3aed',
  Nutrition: '#16a34a',
  'Sexual Health': '#db2777',
  Fitness: '#ea580c',
  "Women's Health": '#e11d48',
  'First Aid': '#0891b2',
  default: '#15803d',
}

type Article = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  readTime: string
  author: string
  isFeatured: boolean
  views: number
  createdAt: string
}

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default
}

function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden p-4 space-y-2.5">
      <div className="flex gap-2">
        <div className="h-5 w-20 skeleton rounded-full" />
        <div className="h-5 w-16 skeleton rounded-full" />
      </div>
      <div className="h-4 skeleton rounded w-5/6" />
      <div className="h-3.5 skeleton rounded" />
      <div className="h-3.5 skeleton rounded w-4/5" />
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
    fetchArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  // Keep URL in sync with active category
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

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeCategory !== 'all') {
        params.set('category', activeCategory)
      }
      const res = await fetch(`/api/health/articles?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setArticles(data.articles ?? [])
    } catch {
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter((a) =>
    searchQuery
      ? a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true,
  )

  const featuredArticle =
    activeCategory === 'all' && !searchQuery
      ? filteredArticles.find((a) => a.isFeatured)
      : undefined
  const listArticles = featuredArticle
    ? filteredArticles.filter((a) => !a.isFeatured)
    : filteredArticles

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0f2318]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-bold text-[16px] leading-tight">
              Health Education
            </h1>
            <p className="text-[#4ade80] text-[11px] font-medium">
              Knowledge built for students
            </p>
          </div>
          <Heart size={18} color="#4ade80" fill="#4ade80" />
        </div>

        {/* Search bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-xl px-3 py-2.5">
            <Search size={15} color="rgba(255,255,255,0.6)" />
            <input
              type="text"
              id="health-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search health topics..."
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-[16px] outline-none"
              aria-label="Search health articles"
            />
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide bg-white border-b border-gray-100 sticky top-[108px] z-30">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            id={`health-cat-${cat.value.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setActiveCategory(cat.value)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 whitespace-nowrap ${
              activeCategory === cat.value
                ? 'bg-[#0f2318] text-white'
                : 'bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 max-w-2xl mx-auto">
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Featured article */}
        {!loading && featuredArticle && (
          <Link href={`/health/${featuredArticle.slug}`}>
            <div className="bg-[#0f2318] rounded-2xl overflow-hidden active:scale-[0.99] transition-all">
              <div className="px-5 py-5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={12} color="#4ade80" />
                  <span className="text-[10px] font-bold text-[#4ade80] tracking-wider uppercase">
                    Featured Article
                  </span>
                </div>
                <h2 className="text-white text-[17px] font-bold leading-snug mb-2">
                  {featuredArticle.title}
                </h2>
                <p className="text-white/60 text-[12px] leading-relaxed mb-4 line-clamp-2">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{
                        background: `${getCategoryColor(featuredArticle.category)}20`,
                        color: getCategoryColor(featuredArticle.category),
                      }}
                    >
                      {featuredArticle.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock size={11} color="rgba(255,255,255,0.4)" />
                      <span className="text-[11px] text-white/40">
                        {featuredArticle.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#4ade80]">
                    <span className="text-[12px] font-bold">Read</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article count */}
        {!loading && (
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-gray-500 font-medium">
              {filteredArticles.length} article
              {filteredArticles.length !== 1 ? 's' : ''}
              {activeCategory !== 'all' ? ` in ${activeCategory}` : ''}
            </p>
            <div className="flex items-center gap-1">
              <BookOpen size={12} color="#9ca3af" />
              <span className="text-[11px] text-gray-400">Free to read</span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-3">
              <BookOpen size={24} color="#15803d" />
            </div>
            <p className="font-bold text-[#0f2318] text-[15px] mb-1">
              No articles yet
            </p>
            <p className="text-gray-400 text-[13px]">
              Check back soon — new content is added weekly
            </p>
          </div>
        )}

        {/* Articles list */}
        {!loading && listArticles.length > 0 && (
          <div className="flex flex-col gap-3">
            {listArticles.map((article) => (
              <Link key={article.id} href={`/health/${article.slug}`}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.99] transition-all">
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${getCategoryColor(article.category)}15`,
                          color: getCategoryColor(article.category),
                        }}
                      >
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock size={10} color="#9ca3af" />
                        <span className="text-[10px] text-gray-400">
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-[14px] font-bold text-[#0f2318] leading-snug mb-1.5">
                      {article.title}
                    </h3>
                    <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">
                        By {article.author}
                      </span>
                      <div className="flex items-center gap-1 text-[#15803d]">
                        <span className="text-[12px] font-semibold">
                          Read more
                        </span>
                        <ChevronRight size={13} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* AI Guide CTA */}
        <div className="bg-[#0f2318] rounded-2xl px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-white font-bold text-[13px] leading-tight mb-0.5">
              Still have questions?
            </p>
            <p className="text-[#86efac] text-[11px]">
              Ask Comfort AI for personalised health guidance
            </p>
          </div>
          <Link
            href="/ai-guide"
            className="flex-shrink-0 bg-[#15803d] text-white text-[12px] font-bold px-3 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Pill size={13} />
            Ask AI
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function HealthHubPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#15803d] border-t-transparent animate-spin" />
        </div>
      }
    >
      <HealthHubInner />
    </Suspense>
  )
}
