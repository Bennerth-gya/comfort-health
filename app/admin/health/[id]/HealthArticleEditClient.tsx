"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  readTime: string;
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
};

export default function HealthArticleEditClient({
  initialArticle,
}: {
  initialArticle: Article;
}) {
  const router = useRouter();
  const [article, setArticle] = useState<Article>(initialArticle);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...article,
        coverImage: article.coverImage?.trim() || null,
      };
      const res = await fetch(`/api/admin/health/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to save article");
      }
      
      router.refresh();
      router.push("/admin/health");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/admin/health/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Image upload failed.");
      }

      setArticle((current) => ({ ...current, coverImage: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/health"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 hover:bg-gray-50 transition"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Article</h1>
            <p className="mt-1 text-sm text-slate-500">{article.title}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  value={article.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Excerpt</label>
                <textarea
                  value={article.excerpt}
                  onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Markdown Content</label>
                <textarea
                  value={article.content}
                  onChange={(e) => setArticle({ ...article, content: e.target.value })}
                  rows={15}
                  className="w-full font-mono rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Background Image</h2>
            
            <div className="mb-4">
              {article.coverImage ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => setArticle({ ...article, coverImage: null })}
                    className="absolute right-2 top-2 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-red-600 shadow backdrop-blur-sm hover:bg-white"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-slate-500">
                  <ImageIcon size={24} className="mb-2 text-slate-400" />
                  <span className="text-xs">No background image</span>
                </div>
              )}
            </div>

            <div>
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition">
                {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                {uploadingImage ? "Uploading..." : "Upload New Image"}
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
              </label>
              <p className="mt-2 text-center text-xs text-slate-500">
                Recommended: 1920x1080 (16:9 ratio), max 2MB.
              </p>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Cloudinary image URL
              </label>
              <input
                type="url"
                value={article.coverImage ?? ""}
                placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
                onChange={(e) =>
                  setArticle({ ...article, coverImage: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
                <select
                  value={article.category}
                  onChange={(e) => setArticle({ ...article, category: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Malaria">Malaria</option>
                  <option value="Medications">Medications</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Sexual Health">Sexual Health</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Women's Health">Women's Health</option>
                  <option value="First Aid">First Aid</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Author</label>
                <input
                  type="text"
                  value={article.author}
                  onChange={(e) => setArticle({ ...article, author: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Read Time</label>
                <input
                  type="text"
                  value={article.readTime}
                  onChange={(e) => setArticle({ ...article, readTime: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900">Published</label>
                <input
                  type="checkbox"
                  checked={article.isPublished}
                  onChange={(e) => setArticle({ ...article, isPublished: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900">Featured</label>
                <input
                  type="checkbox"
                  checked={article.isFeatured}
                  onChange={(e) => setArticle({ ...article, isFeatured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
