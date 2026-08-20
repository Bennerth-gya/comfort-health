'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  ShoppingBag,
  ChevronRight,
  BookOpen,
  AlertCircle,
  Eye,
} from 'lucide-react'
import Link from 'next/link'

type Article = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  coverImage: string | null
  readTime: string
  author: string
  views: number
  tags: string[]
  createdAt: string
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

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default
}

/**
 * Minimal markdown renderer — handles headings, bold, lists, tables, paragraphs.
 * Avoids external dependencies while keeping content readable.
 */
function renderMarkdown(content: string): string {
  const lines = content.split('\n')
  const result: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' | null = null

  const closeList = () => {
    if (inList) {
      result.push(listType === 'ul' ? '</ul>' : '</ol>')
      inList = false
      listType = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Headings
    if (/^### (.+)$/.test(line)) {
      closeList()
      result.push(
        `<h3 class="text-[15px] font-bold text-[#0f2318] mt-5 mb-2">${line.replace(/^### /, '')}</h3>`,
      )
      continue
    }
    if (/^## (.+)$/.test(line)) {
      closeList()
      result.push(
        `<h2 class="text-[17px] font-bold text-[#0f2318] mt-6 mb-2.5 border-l-4 border-[#15803d] pl-3">${line.replace(/^## /, '')}</h2>`,
      )
      continue
    }
    if (/^# (.+)$/.test(line)) {
      closeList()
      result.push(
        `<h1 class="text-[20px] font-bold text-[#0f2318] mt-2 mb-3">${line.replace(/^# /, '')}</h1>`,
      )
      continue
    }

    // Unordered list item
    if (/^- (.+)$/.test(line)) {
      if (!inList || listType !== 'ul') {
        closeList()
        result.push(
          '<ul class="list-disc pl-5 mb-3 space-y-1.5 marker:text-[#15803d]">',
        )
        inList = true
        listType = 'ul'
      }
      const text = applyInline(line.replace(/^- /, ''))
      result.push(
        `<li class="text-[14px] text-gray-600 leading-relaxed">${text}</li>`,
      )
      continue
    }

    // Ordered list item
    if (/^\d+\. (.+)$/.test(line)) {
      if (!inList || listType !== 'ol') {
        closeList()
        result.push(
          '<ol class="list-decimal pl-5 mb-3 space-y-1.5 marker:text-[#15803d]">',
        )
        inList = true
        listType = 'ol'
      }
      const text = applyInline(line.replace(/^\d+\. /, ''))
      result.push(
        `<li class="text-[14px] text-gray-600 leading-relaxed">${text}</li>`,
      )
      continue
    }

    // Table row (basic)
    if (/^\|.+\|$/.test(line)) {
      closeList()
      // Skip separator rows
      if (/^\|[-\s|:]+\|$/.test(line)) continue
      const cells = line
        .split('|')
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
        .map((c) => c.trim())
      const isHeader = i < lines.length - 1 && /^\|[-\s|:]+\|$/.test(lines[i + 1])
      const tag = isHeader ? 'th' : 'td'
      const cellClass = isHeader
        ? 'px-3 py-2 text-left text-[12px] font-bold text-[#0f2318] bg-[#f0fdf4]'
        : 'px-3 py-2 text-[13px] text-gray-600 border-t border-gray-100'
      const row = `<tr>${cells.map((c) => `<${tag} class="${cellClass}">${applyInline(c)}</${tag}>`).join('')}</tr>`
      if (isHeader) {
        result.push(
          `<div class="overflow-x-auto mb-4"><table class="w-full border border-gray-200 rounded-xl overflow-hidden text-sm"><thead>${row}</thead><tbody>`,
        )
      } else {
        result.push(row)
      }
      continue
    }

    // Close table body if previous was table and this line is not
    if (result.length > 0 && result[result.length - 1]?.includes('</tr>') && !line.startsWith('|')) {
      result.push('</tbody></table></div>')
    }

    // Blank line
    if (line.trim() === '') {
      closeList()
      continue
    }

    // Regular paragraph
    closeList()
    result.push(
      `<p class="text-[14px] text-gray-600 leading-relaxed mb-3">${applyInline(line)}</p>`,
    )
  }

  closeList()
  return result.join('\n')
}

/** Apply inline formatting: bold, italic, code */
function applyInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-[#0f2318]">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 text-[#0f2318] px-1 rounded text-[13px] font-mono">$1</code>')
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <div className="bg-[#0f2318] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/10" />
        <div className="flex-1 h-4 bg-white/10 rounded skeleton" />
      </div>
      <div className="bg-white px-4 pt-5 pb-4">
        <div className="h-5 w-24 skeleton rounded-full mb-3" />
        <div className="h-6 skeleton rounded w-5/6 mb-2" />
        <div className="h-6 skeleton rounded w-4/6 mb-4" />
        <div className="h-4 skeleton rounded mb-1.5" />
        <div className="h-4 skeleton rounded w-3/4 mb-4" />
      </div>
      <div className="px-4 py-5 bg-white mt-2 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 skeleton rounded" style={{ width: `${85 - i * 8}%` }} />
        ))}
      </div>
    </div>
  )
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)

  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug as string)

  useEffect(() => {
    if (slug) fetchArticle(slug)
  }, [slug])

  const fetchArticle = async (s: string) => {
    try {
      const res = await fetch(`/api/health/articles/${s}`)
      if (!res.ok) {
        setNotFound(true)
        return
      }
      const data = await res.json()
      setArticle(data.article)
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        })
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) return <LoadingSkeleton />

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#f8faf8] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-3">
          <BookOpen size={24} color="#15803d" />
        </div>
        <h1 className="text-[18px] font-bold text-[#0f2318] mb-2">
          Article not found
        </h1>
        <p className="text-gray-400 text-[13px] mb-5">
          This article may have been removed or moved.
        </p>
        <Link
          href="/health"
          className="bg-[#15803d] text-white px-5 py-3 rounded-xl font-bold text-[14px]"
        >
          Browse all articles
        </Link>
      </div>
    )
  }

  if (!article) return null

  const categoryColor = getCategoryColor(article.category)

  return (
    <div className="min-h-screen bg-[#f8faf8] relative">
      {/* Background Wallpaper */}
      {article.coverImage && (
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${article.coverImage})` }}
        />
      )}
      
      {/* Dark overlay for better text contrast if needed */}
      {article.coverImage && (
        <div className="fixed inset-0 z-0 bg-black/20" />
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className={`sticky top-0 z-40 px-4 py-3 flex items-center gap-3 transition-colors ${article.coverImage ? 'bg-[#0f2318]/90 backdrop-blur-md' : 'bg-[#0f2318]'}`}>
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white/60 text-[11px] truncate">Health Education</p>
          </div>
          <button
            onClick={handleShare}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-all relative"
            aria-label="Share article"
          >
            <Share2 size={16} color="white" />
            {copied && (
              <span className="absolute -bottom-7 right-0 bg-[#0f2318] text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap border border-white/10">
                Copied!
              </span>
            )}
          </button>
        </div>

        <div className="max-w-2xl mx-auto w-full flex-1 md:pt-6 md:pb-12 pb-8">
          
          <div className={article.coverImage ? 'bg-white/95 backdrop-blur-xl md:rounded-3xl shadow-2xl overflow-hidden min-h-screen md:min-h-0' : ''}>
            {/* Article header */}
            <div className={`px-4 pt-5 pb-4 ${article.coverImage ? 'border-b border-gray-200/60' : 'bg-white border-b border-gray-100'}`}>
              {/* Category + meta */}
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span
                  className="text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{
                    background: `${categoryColor}15`,
                    color: categoryColor,
                  }}
                >
                  {article.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} color="#9ca3af" />
                  <span className="text-[11px] text-gray-400 font-medium">
                    {article.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <Eye size={12} color="#9ca3af" />
                  <span className="text-[11px] text-gray-400">
                    {article.views.toLocaleString()} views
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-[20px] font-bold text-[#0f2318] leading-snug mb-3">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-[14px] text-gray-500 leading-relaxed mb-3">
                {article.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <div className="w-7 h-7 bg-[#f0fdf4] rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={14} color="#15803d" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#0f2318]">
                    {article.author}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString('en-GH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Article content */}
            <div className={`px-4 py-5 mt-2 ${article.coverImage ? '' : 'bg-white'}`}>
              <div
                className="health-article-content"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(article.content),
                }}
              />
            </div>

            {/* Disclaimer */}
            <div className="mx-4 mt-3 bg-[#fff7ed]/90 border border-[#fde68a] rounded-2xl px-4 py-3 flex gap-2.5">
              <AlertCircle
                size={16}
                color="#d97706"
                className="flex-shrink-0 mt-0.5"
              />
              <p className="text-[11px] text-[#92400e] leading-relaxed">
                <strong className="font-bold">Educational content only.</strong>{' '}
                This article is for informational purposes and does not replace
                professional medical advice. Consult a licensed healthcare provider
                for personal medical decisions.
              </p>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="px-4 mt-3">
                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-2">
                  Topics covered
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#f0fdf4]/80 border border-[#bbf7d0] text-[#15803d] text-[11px] font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Shop related products CTA */}
            <div className="mx-4 mt-4 bg-[#f0fdf4]/90 border border-[#bbf7d0] rounded-2xl px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag size={16} color="#15803d" />
                <p className="text-[13px] font-bold text-[#0f2318]">
                  Products related to this article
                </p>
              </div>
              <p className="text-[12px] text-[#166534] mb-3">
                Find the medicines and health products mentioned in this article in
                our pharmacy with same-day campus delivery.
              </p>
              <Link
                href={`/shop-page?q=${encodeURIComponent(article.category)}`}
                className="flex items-center justify-center gap-2 bg-[#15803d] text-white rounded-xl py-2.5 text-[13px] font-bold active:scale-[0.98] transition-all"
              >
                Shop related products
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Ask AI CTA */}
            <div className="mx-4 mt-3 mb-6 bg-[#0f2318] rounded-2xl px-4 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-bold text-[13px] mb-0.5">
                  Have more questions?
                </p>
                <p className="text-[#86efac] text-[11px]">
                  Ask Comfort AI about {article.category.toLowerCase()}
                </p>
              </div>
              <Link
                href="/ai-guide"
                className="flex-shrink-0 bg-[#15803d] text-white text-[12px] font-bold px-3 py-2 rounded-xl active:scale-95 transition-all"
              >
                Ask AI →
              </Link>
            </div>

            {/* Back to all articles */}
            <div className="px-4 pb-8">
              <Link
                href="/health"
                className="flex items-center justify-center gap-2 border border-gray-200 bg-white/80 text-[#0f2318] rounded-xl py-3 text-[13px] font-semibold active:scale-[0.98] transition-all"
              >
                <ArrowLeft size={14} />
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
