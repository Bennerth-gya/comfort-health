"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import {
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  X,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "Malaria",
  "Medications",
  "Mental Health",
  "Nutrition",
  "Sexual Health",
  "First Aid",
  "Women's Health",
  "Fitness",
  "General Health",
];

// ── Inline image uploader (no extra component file needed) ───────────────────
function HealthImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5 MB.");
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setUploadError("Only JPEG, PNG, WebP or GIF are allowed.");
      return;
    }

    setUploadError("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/admin/health/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setUploadError(data.error ?? "Upload failed.");
        return;
      }

      onChange(data.url);
    } catch {
      setUploadError("Network error — please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) doUpload(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (isUploading) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50">
        <Loader2 size={24} className="animate-spin text-emerald-600" />
        <p className="text-sm font-medium text-emerald-700">Uploading image…</p>
      </div>
    );
  }

  if (value) {
    return (
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          <img src={value} alt="Cover preview" className="h-48 w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity hover:opacity-100">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-800"
            >
              <Upload size={12} /> Change
            </button>
            <button
              type="button"
              onClick={() => { onChange(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
              className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white"
            >
              <X size={12} /> Remove
            </button>
          </div>
          <div className="absolute right-2 top-2 rounded-full bg-emerald-600 p-1">
            <CheckCircle size={12} color="white" />
          </div>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) doUpload(f); }} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Cloudinary image URL
          </label>
          <input
            type="url"
            value={value}
            placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`flex h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all ${
          isDragging
            ? "border-emerald-500 bg-emerald-50"
            : "border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50/50"
        }`}
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDragging ? "bg-emerald-600" : "bg-gray-100"}`}>
          <ImageIcon size={20} className={isDragging ? "text-white" : "text-gray-400"} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">
            {isDragging ? "Drop image here" : "Upload cover image"}
          </p>
          <p className="text-xs text-slate-400">Drag & drop or click · JPEG, PNG, WebP · Max 5 MB</p>
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <AlertCircle size={14} className="text-red-500" />
          <p className="text-xs text-red-600">{uploadError}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">or paste URL</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <input
        type="url"
        value={value}
        placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) doUpload(f); }}
      />
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function NewHealthArticlePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "General Health",
    excerpt: "",
    content: "",
    coverImage: "",
    readTime: "5 min read",
    author: "Comfort Health Team",
    isPublished: false,
    isFeatured: false,
    tags: "",
  });

  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setForm((prev) => ({ ...prev, title, slug }));
  };

  const handleSave = async () => {
    setErrorMsg("");
    if (!form.title.trim()) { setErrorMsg("Title is required."); return; }
    if (!form.excerpt.trim()) { setErrorMsg("Excerpt is required."); return; }
    if (!form.content.trim()) { setErrorMsg("Content is required."); return; }

    setStatus("saving");
    try {
      const res = await fetch("/api/admin/health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          coverImage: form.coverImage.trim() || null,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Failed to save article.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setTimeout(() => router.push("/admin/health"), 1200);
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
  };

  const field = (key: keyof typeof form) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  return (
    <AdminShell>
      <div className="ml-64 min-h-screen bg-slate-50">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/health"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={17} />
            </Link>
            <h1 className="text-xl font-bold text-slate-900">New Health Article</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={status === "saving" || status === "success"}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition"
          >
            {status === "saving" ? (
              <><Loader2 size={15} className="animate-spin" /> Saving…</>
            ) : status === "success" ? (
              <><CheckCircle size={15} /> Saved!</>
            ) : (
              <><Save size={15} /> Save Article</>
            )}
          </button>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6 p-8">
          {/* Left column — main content */}
          <div className="col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. What to do when malaria hits at midnight"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">URL Slug (auto-generated)</label>
                  <input
                    type="text"
                    {...field("slug")}
                    placeholder="what-to-do-when-malaria-hits"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <p className="mt-1 text-xs text-slate-400">Article URL: /health/{form.slug || "your-slug"}</p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Excerpt * <span className="font-normal text-slate-400">(shown in article list)</span>
                  </label>
                  <textarea
                    {...field("excerpt")}
                    rows={2}
                    maxLength={300}
                    placeholder="A brief description of what this article covers…"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <p className="mt-0.5 text-right text-xs text-slate-400">{form.excerpt.length}/300</p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Article Content * <span className="font-normal text-slate-400">(supports markdown)</span>
                  </label>
                  <textarea
                    {...field("content")}
                    rows={18}
                    placeholder={`# Article heading\n\nWrite your content here…\n\n## Section heading\n\nParagraph text.\n\n- Bullet point 1\n- Bullet point 2`}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Use # headings, **bold**, - bullets
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — settings & image */}
          <div className="space-y-6">
            {/* Background image */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">Background Image</h2>
              <HealthImageUploader
                value={form.coverImage}
                onChange={(url) => setForm((prev) => ({ ...prev, coverImage: url }))}
              />
            </div>

            {/* Settings */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
                  <select
                    {...field("category")}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Author</label>
                  <input
                    type="text"
                    {...field("author")}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Read Time</label>
                  <input
                    type="text"
                    {...field("readTime")}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Tags <span className="font-normal text-slate-400">(comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    {...field("tags")}
                    placeholder="malaria, fever, treatment"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-900">Published</label>
                    <input
                      type="checkbox"
                      checked={form.isPublished}
                      onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                    />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">Visible to all users</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-900">Featured</label>
                    <p className="text-xs text-slate-400">Pinned to the health hub</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error banner */}
        {errorMsg && (
          <div className="mx-auto mb-8 flex max-w-5xl items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-red-500" />
            <p className="text-sm text-red-600">{errorMsg}</p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
