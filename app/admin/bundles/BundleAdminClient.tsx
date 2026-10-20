"use client";

import { useRef, useState } from "react";
import {
  Plus, Pencil, Trash2, Package, ChevronDown, ChevronUp,
  X, Check, Loader2, Upload, ImageOff,
} from "lucide-react";
import Image from "next/image";

type Product = { id: string; name: string; price: number; category: string | null; quantity: number; imageUrl: string | null };
type BundleItem = { id: string; quantity: number; sortOrder: number; product: Product };
type Bundle = {
  id: string; name: string; slug: string; description: string | null; imageUrl: string | null;
  price: number; compareAt: number | null; isActive: boolean; isFeatured: boolean;
  sortOrder: number; category: string | null; items: BundleItem[];
};

const CATEGORY_OPTIONS = [
  { value: "", label: "No category" },
  { value: "hostel", label: "Daily Essentials" },
  { value: "first-aid", label: "First Aid" },
  { value: "exam", label: "Focus & Energy" },
  { value: "personal-care", label: "Personal Care" },
  { value: "women", label: "Women's Care" },
  { value: "wellness", label: "Wellness" },
];

const ALLOWED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── Bundle Cover Image Uploader ───────────────────────────────────────────────
function BundleCoverImageField({
  currentUrl,
  onUrlChange,
}: {
  currentUrl: string;
  onUrlChange: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // Local object URL for immediate preview before upload completes
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!ALLOWED_TYPES.has(file.type.toLowerCase())) {
      setUploadError("Only JPEG, PNG, and WebP images are allowed.");
      return;
    }
    // Validate size
    if (file.size > MAX_BYTES) {
      setUploadError("Image must be 5 MB or smaller.");
      return;
    }

    setUploadError(null);

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewObjectUrl(objectUrl);

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/bundles/upload-image", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Upload failed.");
      }
      // Switch from local preview to permanent URL
      onUrlChange(data.url);
      URL.revokeObjectURL(objectUrl);
      setPreviewObjectUrl(null);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
      // Revert preview on error
      URL.revokeObjectURL(objectUrl);
      setPreviewObjectUrl(null);
    } finally {
      setUploading(false);
      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const displayUrl = previewObjectUrl || currentUrl;

  return (
    <div className="md:col-span-2">
      <label className="block text-xs font-semibold text-gray-500 mb-2">
        Bundle Cover Image
      </label>

      {/* Preview area */}
      <div className="relative mb-3 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50" style={{ aspectRatio: "16/9", maxHeight: 220 }}>
        {displayUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayUrl}
              alt="Bundle cover preview"
              className="h-full w-full object-cover"
            />
            {/* Remove button */}
            {!uploading && (
              <button
                type="button"
                onClick={() => { onUrlChange(""); setUploadError(null); }}
                title="Remove image"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            {/* Upload overlay while uploading */}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
            <ImageOff className="h-10 w-10" />
            <p className="text-xs">No cover image</p>
          </div>
        )}
      </div>

      {/* Upload / change button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:border-[#15803d] hover:text-[#15803d] disabled:opacity-60"
        >
          {uploading ? (
            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading…</>
          ) : (
            <><Upload className="h-3.5 w-3.5" /> {displayUrl ? "Change image" : "Upload image"}</>
          )}
        </button>
        <span className="text-[11px] text-gray-400">JPEG, PNG, WebP · max 5 MB</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>

      {uploadError && (
        <p className="mt-1.5 text-xs font-semibold text-red-600">{uploadError}</p>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function BundleAdminClient({
  initialBundles,
  allProducts,
}: {
  initialBundles: Bundle[];
  allProducts: Product[];
}) {
  const [bundles, setBundles] = useState<Bundle[]>(initialBundles);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const emptyForm = {
    name: "", slug: "", description: "", imageUrl: "",
    price: "", compareAt: "", isActive: true, isFeatured: false,
    sortOrder: 0, category: "", items: [] as Array<{ productId: string; quantity: number }>,
  };
  const [form, setForm] = useState(emptyForm);

  const openNew = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
  const openEdit = (bundle: Bundle) => {
    setForm({
      name: bundle.name, slug: bundle.slug, description: bundle.description ?? "",
      imageUrl: bundle.imageUrl ?? "", price: String(bundle.price),
      compareAt: bundle.compareAt ? String(bundle.compareAt) : "",
      isActive: bundle.isActive, isFeatured: bundle.isFeatured,
      sortOrder: bundle.sortOrder, category: bundle.category ?? "",
      items: bundle.items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
    });
    setEditingId(bundle.id);
    setShowForm(true);
  };

  const addItem = (productId: string) => {
    if (!productId || form.items.find((i) => i.productId === productId)) return;
    setForm((f) => ({ ...f, items: [...f.items, { productId, quantity: 1 }] }));
  };
  const removeItem = (productId: string) =>
    setForm((f) => ({ ...f, items: f.items.filter((i) => i.productId !== productId) }));
  const updateItemQty = (productId: string, quantity: number) =>
    setForm((f) => ({ ...f, items: f.items.map((i) => i.productId === productId ? { ...i, quantity } : i) }));

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name, slug: form.slug || slugify(form.name),
        description: form.description || null, imageUrl: form.imageUrl || null,
        price: Number(form.price), compareAt: form.compareAt ? Number(form.compareAt) : null,
        isActive: form.isActive, isFeatured: form.isFeatured,
        sortOrder: form.sortOrder, category: form.category || null,
      };
      let bundleId = editingId;
      if (editingId) {
        await fetch(`/api/admin/bundles/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        const res = await fetch("/api/admin/bundles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const data = await res.json() as { bundle: Bundle };
        bundleId = data.bundle.id;
      }
      // Save items
      if (bundleId) {
        await fetch(`/api/admin/bundles/${bundleId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: form.items.map((item, i) => ({ productId: item.productId, quantity: item.quantity, sortOrder: i })) }),
        });
      }
      // Reload
      const res2 = await fetch("/api/admin/bundles");
      const data2 = await res2.json() as { bundles: Bundle[] };
      setBundles(data2.bundles.map((b: Bundle) => ({ ...b, price: Number(b.price), compareAt: b.compareAt ? Number(b.compareAt) : null })));
      setShowForm(false);
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/bundles/${id}`, { method: "DELETE" });
    setBundles((prev) => prev.filter((b) => b.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#15803d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#166534]"
        >
          <Plus className="h-4 w-4" /> New Bundle
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">{editingId ? "Edit Bundle" : "New Bundle"}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Name *</label>
              <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: f.slug || slugify(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Slug *</label>
              <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono" value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
              <textarea className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" rows={2} value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>

            {/* ── Bundle Cover Image ── */}
            <BundleCoverImageField
              currentUrl={form.imageUrl}
              onUrlChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
            />

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Price (GHS) *</label>
              <input type="number" step="0.01" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Compare-at Price (GHS)</label>
              <input type="number" step="0.01" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.compareAt}
                onChange={(e) => setForm((f) => ({ ...f, compareAt: e.target.value }))} placeholder="Optional" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
              <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Sort Order</label>
              <input type="number" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.sortOrder}
                onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))} />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} />
                Featured
              </label>
            </div>
          </div>

          {/* Items */}
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-500 mb-2">Bundle Items</label>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm mb-3"
              onChange={(e) => { addItem(e.target.value); e.target.value = ""; }} defaultValue="">
              <option value="">+ Add a product…</option>
              {allProducts.filter((p) => !form.items.find((i) => i.productId === p.id)).map((p) => (
                <option key={p.id} value={p.id}>{p.name} — GHS {p.price.toFixed(2)}</option>
              ))}
            </select>
            {form.items.length > 0 && (
              <div className="space-y-2">
                {form.items.map((item) => {
                  const product = allProducts.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                      <span className="flex-1 text-sm text-gray-800 truncate">{product.name}</span>
                      <input type="number" min={1} className="w-16 rounded border border-gray-200 px-2 py-1 text-sm text-center" value={item.quantity}
                        onChange={(e) => updateItemQty(item.productId, Math.max(1, Number(e.target.value)))} />
                      <button type="button" onClick={() => removeItem(item.productId)} className="text-gray-400 hover:text-red-500">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-5 flex gap-3">
            <button type="button" onClick={handleSave} disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-[#15803d] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {saving ? "Saving…" : "Save Bundle"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {bundles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
          <Package className="mx-auto mb-3 h-8 w-8 opacity-40" />
          <p className="text-sm">No bundles yet. Create your first bundle above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                {/* Thumbnail */}
                {bundle.imageUrl ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image src={bundle.imageUrl} alt={bundle.name} fill sizes="56px" className="object-cover" unoptimized />
                  </div>
                ) : (
                  <Package className="h-8 w-8 shrink-0 text-[#15803d]" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{bundle.name}</p>
                    {!bundle.isActive && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500">INACTIVE</span>}
                    {bundle.isFeatured && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">FEATURED</span>}
                    {bundle.imageUrl && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">HAS IMAGE</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">/{bundle.slug} · GHS {bundle.price.toFixed(2)} · {bundle.items.length} items</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setExpandedId(expandedId === bundle.id ? null : bundle.id)}
                    className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-gray-700">
                    {expandedId === bundle.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  <button type="button" onClick={() => openEdit(bundle)} className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-[#15803d]">
                    <Pencil className="h-4 w-4" />
                  </button>
                  {deleteId === bundle.id ? (
                    <>
                      <button type="button" onClick={() => handleDelete(bundle.id)}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">Confirm</button>
                      <button type="button" onClick={() => setDeleteId(null)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-500">Cancel</button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setDeleteId(bundle.id)} className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              {expandedId === bundle.id && (
                <div className="border-t border-gray-100 px-4 py-3">
                  {bundle.imageUrl && (
                    <div className="mb-3 relative w-full overflow-hidden rounded-lg bg-gray-100" style={{ aspectRatio: "16/9", maxHeight: 160 }}>
                      <Image src={bundle.imageUrl} alt={bundle.name} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" unoptimized />
                    </div>
                  )}
                  <p className="text-xs font-semibold text-gray-500 mb-2">Items ({bundle.items.length})</p>
                  <div className="space-y-2">
                    {bundle.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.product.imageUrl && (
                          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <Image src={item.product.imageUrl} alt={item.product.name} fill sizes="32px" className="object-cover" unoptimized />
                          </div>
                        )}
                        <p className="flex-1 text-sm text-gray-700">{item.product.name} <span className="text-gray-400">× {item.quantity}</span></p>
                        <p className="text-xs text-gray-500">GHS {item.product.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
