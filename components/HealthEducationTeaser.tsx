'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Heart,
} from 'lucide-react'
import Image from 'next/image'

// Category → fallback gradient when no coverImage is set
const CATEGORY_GRADIENTS: Record<string, string> = {
  Malaria: 'linear-gradient(135deg, #0f2318 0%, #14532d 60%, #166534 100%)',
  'Exam Season': 'linear-gradient(135deg, #1c1917 0%, #78350f 60%, #92400e 100%)',
  Medications: 'linear-gradient(135deg, #0c1a3a 0%, #1e3a5f 60%, #1e40af 100%)',
  "Women's Health": 'linear-gradient(135deg, #1a0a14 0%, #831843 60%, #9d174d 100%)',
  'Mental Health': 'linear-gradient(135deg, #1a0f2e 0%, #4c1d95 60%, #6d28d9 100%)',
  Nutrition: 'linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)',
  'Sexual Health': 'linear-gradient(135deg, #1a0a14 0%, #831843 60%, #9d174d 100%)',
  Fitness: 'linear-gradient(135deg, #1c1917 0%, #7c2d12 60%, #9a3412 100%)',
  'First Aid': 'linear-gradient(135deg, #0c1a3a 0%, #155e75 60%, #0891b2 100%)',
  default: 'linear-gradient(135deg, #0f2318 0%, #15803d 100%)',
}

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

const QUICK_TOPICS = [
  { label: '🌡️ Malaria', slug: 'Malaria' },
  { label: '🧠 Mental health', slug: 'Mental Health' },
  { label: '💊 Medications', slug: 'Medications' },
  { label: '🥗 Nutrition', slug: 'Nutrition' },
  { label: '❤️ Sexual health', slug: 'Sexual Health' },
]

type Article = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  coverImage: string | null
  readTime: string
  isFeatured: boolean
  views: number
}

function getCategoryGradient(category: string) {
  return CATEGORY_GRADIENTS[category] ?? CATEGORY_GRADIENTS.default
}

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default
}

// Fallback hardcoded teasers shown while loading or if no DB articles exist
const FALLBACK_TOPICS: Article[] = [
  {
    id: '1',
    category: 'Malaria',
    title: 'What to do when malaria hits at midnight',
    excerpt: 'Most students wait too long before acting. Here is exactly what to do in the first 6 hours.',
    readTime: '4 min read',
    slug: 'what-to-do-when-malaria-hits',
    coverImage: null,
    isFeatured: false,
    views: 0,
  },
  {
    id: '2',
    category: 'Exam Season',
    title: 'Is your body ready for exam season?',
    excerpt: 'The vitamins, sleep habits, and foods that top students use to stay sharp when it matters most.',
    readTime: '5 min read',
    slug: 'exam-season-health-guide',
    coverImage: null,
    isFeatured: false,
    views: 0,
  },
  {
    id: '3',
    category: 'Medications',
    title: 'Why sharing antibiotics with a friend is dangerous',
    excerpt: 'It feels helpful but it is one of the most dangerous health mistakes university students make.',
    readTime: '3 min read',
    slug: 'why-you-should-never-share-antibiotics',
    coverImage: null,
    isFeatured: false,
    views: 0,
  },
]

export default function HealthEducationTeaser() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>(FALLBACK_TOPICS)
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Fetch real articles on mount
  useEffect(() => {
    fetch('/api/health/articles?limit=6')
      .then((r) => r.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles)
          setCurrent(0)
        }
      })
      .catch(() => {
        // keep fallback
      })
  }, [])

  const topic = articles[current] ?? FALLBACK_TOPICS[0]

  useEffect(() => {
    if (isPaused || articles.length <= 1) return
    const timer = setInterval(() => {
      goToNext()
    }, 5000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, isPaused, articles.length])

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % articles.length)
      setIsTransitioning(false)
    }, 200)
  }

  const goToPrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? articles.length - 1 : prev - 1))
      setIsTransitioning(false)
    }, 200)
  }

  const goToArticle = () => {
    router.push(`/health/${topic.slug}`)
  }

  const hasCoverImage = !!topic.coverImage
  const fallbackGradient = getCategoryGradient(topic.category)

  return (
    <section className="px-3 mb-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Heart size={15} color="#15803d" fill="#15803d" />
          <span className="text-[14px] font-bold text-[#0f2318]">
            Health Education
          </span>
        </div>
        <button
          onClick={() => router.push('/health')}
          className="text-[12px] font-semibold text-[#15803d] flex items-center gap-1 min-h-[44px]"
        >
          All articles
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Main teaser card */}
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{ minHeight: '220px', background: hasCoverImage ? 'transparent' : fallbackGradient }}
        onClick={goToArticle}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="button"
        aria-label={`Read article: ${topic.title}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && goToArticle()}
      >
        {/* Cover image layer */}
        {hasCoverImage && (
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          >
            <Image
              src={topic.coverImage!}
              alt={topic.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority={current === 0}
            />
          </div>
        )}

        {/* Dark gradient overlay — always present for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hasCoverImage
              ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)',
          }}
        />

        {/* Subtle circle pattern for no-image cards */}
        {!hasCoverImage && (
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white" />
            <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-white" />
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border border-white" />
          </div>
        )}

        {/* Content */}
        <div
          className="relative px-5 py-5 transition-opacity duration-200 flex flex-col justify-end"
          style={{ opacity: isTransitioning ? 0 : 1, minHeight: '220px' }}
        >
          {/* Top row — category badge */}
          <div className="mb-auto">
            <span
              className="text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest inline-block"
              style={{
                background: 'rgba(255,255,255,0.18)',
                color: getCategoryColor(topic.category),
                border: `1px solid ${getCategoryColor(topic.category)}60`,
                backdropFilter: 'blur(4px)',
              }}
            >
              {topic.category.toUpperCase()}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-white text-[18px] font-bold leading-snug mb-2 max-w-[280px] drop-shadow-lg mt-3">
            {topic.title}
          </h2>

          {/* Teaser text */}
          <p className="text-white/75 text-[12px] leading-relaxed mb-4 max-w-[270px] drop-shadow line-clamp-2">
            {topic.excerpt}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            {/* CTA Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToArticle()
              }}
              className="flex items-center gap-2 bg-white text-[#0f2318] px-4 py-2.5 rounded-xl text-[12px] font-bold active:scale-[0.97] transition-all shadow-lg shadow-black/30"
              aria-label={`Read: ${topic.title}`}
            >
              Read full article
              <ArrowRight size={13} />
            </button>

            {/* Read time */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)' }}
            >
              <Clock size={11} color="rgba(255,255,255,0.7)" />
              <span className="text-white/70 text-[10px] font-medium">
                {topic.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation arrows (only show if >1 article) */}
        {articles.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
              aria-label="Previous article"
            >
              <ChevronLeft size={14} color="white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
              aria-label="Next article"
            >
              <ChevronRight size={14} color="white" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {articles.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrent(i)
                }}
                className="transition-all duration-300"
                aria-label={`Go to slide ${i + 1}`}
              >
                <div
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '20px' : '6px',
                    background: i === current ? 'white' : 'rgba(255,255,255,0.35)',
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick topic pills */}
      <div className="flex gap-2 mt-2.5 overflow-x-auto scrollbar-hide pb-1">
        {QUICK_TOPICS.map((t) => (
          <button
            key={t.slug}
            onClick={() => router.push(`/health?category=${encodeURIComponent(t.slug)}`)}
            className="flex-shrink-0 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#0f2318] active:bg-gray-50 transition-all whitespace-nowrap"
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={() => router.push('/health')}
          className="flex-shrink-0 bg-[#f0fdf4] border border-[#bbf7d0] rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#15803d] active:bg-[#dcfce7] transition-all whitespace-nowrap flex items-center gap-1"
        >
          <BookOpen size={10} />
          View all
        </button>
      </div>
    </section>
  )
}
