'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpenText, Clock3, HeartPulse, Search } from 'lucide-react'

type Article = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  coverImage?: string | null
  readTime: string
  isFeatured: boolean
  createdAt?: string
}

const CATEGORY_OPTIONS = [
  'all',
  'Malaria',
  'Mental Health',
  'Medications',
  'Nutrition',
  'Sexual Health',
  'Fitness',
  "Women's Health",
  'First Aid',
] as const

const CATEGORY_ACCENTS: Record<string, { chip: string; badge: string; text: string }> = {
  Malaria: { chip: '#e8f7f1', badge: '#daf3ea', text: '#0f8a67' },
  Medications: { chip: '#eef3ff', badge: '#e0ebff', text: '#2f5cc7' },
  'Mental Health': { chip: '#f3ecff', badge: '#ece2ff', text: '#6a42c0' },
  Nutrition: { chip: '#fff7df', badge: '#fef1be', text: '#ad7b0a' },
  'Sexual Health': { chip: '#fff0f5', badge: '#fce5f0', text: '#bf3d6b' },
  Fitness: { chip: '#edf8ff', badge: '#dfeeff', text: '#1e6bbd' },
  "Women's Health": { chip: '#fff1ef', badge: '#ffe4df', text: '#c2513d' },
  'First Aid': { chip: '#edfefe', badge: '#dcfbfb', text: '#0e8c9a' },
  all: { chip: '#eaf7f0', badge: '#dcfce7', text: '#0f8a67' },
}

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80'

function getCategoryAccent(category: string) {
  return CATEGORY_ACCENTS[category] ?? CATEGORY_ACCENTS.all
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-32 animate-pulse rounded-full bg-[#eaf1ed]" />
      <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
        <div className="h-[260px] animate-pulse rounded-[22px] bg-[#edf4ef] md:h-[300px]" />
        <div className="space-y-3">
          <div className="h-6 w-24 animate-pulse rounded-full bg-[#edf4ef]" />
          <div className="h-7 w-3/4 animate-pulse rounded-full bg-[#edf4ef]" />
          <div className="h-4 w-full animate-pulse rounded-full bg-[#edf4ef]" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-[#edf4ef]" />
          <div className="h-11 w-36 animate-pulse rounded-full bg-[#edf4ef]" />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-56 animate-pulse rounded-[20px] bg-[#edf4ef]" />
        ))}
      </div>
    </div>
  )
}

export default function HealthEducationTeaser() {
  const [articles, setArticles] = useState<Article[]>([])
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/health/articles?limit=12')
        if (!response.ok) {
          throw new Error('Unable to load health articles')
        }

        const data = await response.json()

        if (isMounted) {
          setArticles(Array.isArray(data.articles) ? data.articles : [])
        }
      } catch (loadError) {
        if (isMounted) {
          setArticles([])
          setError(loadError instanceof Error ? loadError.message : 'Health education is temporarily unavailable.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') {
      return articles
    }

    return articles.filter((article) => article.category === activeCategory)
  }, [activeCategory, articles])

  const featuredArticle = filteredArticles.find((article) => article.isFeatured) ?? filteredArticles[0]
  const supportingArticles = filteredArticles.filter((article) => article.id !== featuredArticle?.id).slice(0, 3)

  const displayCategoryLabels = useMemo(() => {
    const uniqueCategories = Array.from(new Set(articles.map((article) => article.category))).filter(Boolean)
    return CATEGORY_OPTIONS.filter((option) => option === 'all' || uniqueCategories.includes(option)).slice(0, 8)
  }, [articles])

  return (
    <section className="mb-5 px-3 md:mb-6 md:px-0" aria-label="Health education">
      <div className="mb-3 flex items-start justify-between gap-3 md:mb-4">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2 text-[#15803d]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ecfdf5] text-[#15803d]">
              <HeartPulse className="h-4 w-4" />
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#15803d] md:text-[13px]">
              Health Education
            </span>
          </div>
          <h2 className="text-[17px] font-bold leading-tight text-[#0f2318] md:text-[22px]">
            Practical health information from ComfortHealth
          </h2>
        </div>

        <Link
          href="/health"
          className="inline-flex items-center gap-1 rounded-full px-2 py-2 text-[12px] font-semibold text-[#15803d] transition-colors hover:text-[#0f5e37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
        >
          View all articles
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mb-5">
        {CATEGORY_OPTIONS.filter((option) => option === 'all' || displayCategoryLabels.includes(option)).map((option) => {
          const isActive = activeCategory === option

          return (
            <button
              key={option}
              type="button"
              onClick={() => setActiveCategory(option)}
              aria-pressed={isActive}
              className="shrink-0 rounded-full border px-3 py-2 text-[12px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2 md:text-sm"
              style={{
                backgroundColor: isActive ? '#15803d' : '#ffffff',
                borderColor: isActive ? '#15803d' : '#dfeae3',
                color: isActive ? '#ffffff' : '#0f2318',
                boxShadow: isActive ? '0 8px 18px rgba(21, 128, 61, 0.12)' : 'none',
              }}
            >
              {option === 'all' ? 'All' : option}
            </button>
          )
        })}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="rounded-[22px] border border-[#e5eee8] bg-white p-5 shadow-[0_10px_24px_rgba(15,35,24,0.03)]">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ecfdf5] text-[#15803d]">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f2318]">Health education is temporarily unavailable.</h3>
              <p className="mt-2 text-sm leading-6 text-[#4d675f]">Please try again shortly.</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#15803d] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="rounded-[22px] border border-dashed border-[#cfe0d5] bg-white p-5 shadow-[0_10px_24px_rgba(15,35,24,0.03)]">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ecfdf5] text-[#15803d]">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f2318]">No articles yet</h3>
              <p className="mt-2 text-sm leading-6 text-[#4d675f]">New health education content is added regularly.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {featuredArticle ? (
            <article className="overflow-hidden rounded-[20px] border border-[#e5eee8] bg-white p-3.5 shadow-xs">
              <div className="flex flex-row items-center justify-between gap-3">
                <div className="flex-1 min-w-0 pr-1">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: getCategoryAccent(featuredArticle.category).badge,
                        color: getCategoryAccent(featuredArticle.category).text,
                      }}
                    >
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold leading-snug text-[#0f2318] line-clamp-2">
                    {featuredArticle.title}
                  </h3>

                  <p className="mt-1 text-xs text-[#4b665e] line-clamp-2">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4d675f]">
                      <Clock3 className="h-3.5 w-3.5 text-[#15803d]" />
                      {featuredArticle.readTime}
                    </span>

                    <Link
                      href={`/health/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803d] hover:underline"
                    >
                      Read article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="relative h-28 w-28 sm:h-32 sm:w-36 md:h-40 md:w-52 shrink-0 overflow-hidden rounded-xl border border-gray-100 shadow-2xs">
                  <Image
                    src={featuredArticle.coverImage || DEFAULT_FALLBACK_IMAGE}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 120px, 220px"
                    unoptimized
                  />
                </div>
              </div>
            </article>
          ) : null}

          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-bold text-[#0f2318] md:text-[17px]">Popular health topics</h3>
              <Link href="/health" className="text-[12px] font-semibold text-[#15803d] md:text-[13px]">
                Explore all
              </Link>
            </div>

            {supportingArticles.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-3">
                {supportingArticles.map((article) => {
                  const accent = getCategoryAccent(article.category)

                  return (
                    <Link
                      key={article.id}
                      href={`/health/${article.slug}`}
                      className="group overflow-hidden rounded-[20px] border border-[#e5eee8] bg-white shadow-[0_8px_18px_rgba(15,35,24,0.025)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,35,24,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={article.coverImage || DEFAULT_FALLBACK_IMAGE}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(max-width: 767px) 100vw, 33vw"
                          unoptimized
                        />
                      </div>

                      <div className="p-3.5">
                        <div className="mb-2">
                          <span
                            className="inline-block rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em]"
                            style={{
                              backgroundColor: accent.badge,
                              color: accent.text,
                            }}
                          >
                            {article.category}
                          </span>
                        </div>

                        <h4 className="text-[15px] font-bold leading-snug text-[#0f2318] md:text-base">
                          {article.title}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-[#4d675f] line-clamp-2">{article.excerpt}</p>

                        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#edf1ee] pt-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#4d675f]">
                            <Clock3 className="h-3.5 w-3.5 text-[#15803d]" />
                            {article.readTime}
                          </span>

                          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#15803d]">
                            Read article
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-[20px] border border-dashed border-[#cfe0d5] bg-white p-4 text-sm text-[#4d675f]">
                No articles in this category yet.
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
