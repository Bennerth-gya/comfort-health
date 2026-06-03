"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { uploadProductImageFile } from "@/lib/upload-product-image";
import { useToast } from "@/app/context/toastContext";
import { ArrowRight, Check, Pencil, Plus, Trash2, X, Upload } from "lucide-react";

type HeroSlide = {
  id: string;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  ctaText?: string | null;
  ctaUrl?: string | null;
  active: boolean;
  sortOrder: number;
};

const initialForm = {
  title: "",
  subtitle: "",
  imageUrl: "",
  ctaText: "",
  ctaUrl: "",
  active: true,
  sortOrder: 0,
};

export default function HeroSlidesClient({ initialSlides }: { initialSlides: HeroSlide[] }) {
  const { pushToast } = useToast();
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
  const [form, setForm] = useState(() => ({ ...initialForm }));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedSlide = useMemo(
    () => slides.find((slide) => slide.id === editingId) ?? null,
    [editingId, slides],
  );

  const startEditing = (slide: HeroSlide) => {
    setEditingId(slide.id);
    setForm({
      title: slide.title,
      subtitle: slide.subtitle ?? "",
      imageUrl: slide.imageUrl,
      ctaText: slide.ctaText ?? "",
      ctaUrl: slide.ctaUrl ?? "",
      active: slide.active,
      sortOrder: slide.sortOrder,
    });
    setImagePreview(slide.imageUrl);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ ...initialForm });
    setImagePreview("");
    setError(null);
  };

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > 2_000_000) {
      setError("Image must be 2MB or smaller.");
      return;
    }

    setError(null);
    setImageUploading(true);

    try {
      const url = await uploadProductImageFile(file);
      setImagePreview(url);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (uploadError) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);

      if (uploadError instanceof Error) {
        setError(uploadError.message);
      }
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError("Slide title is required.");
      return;
    }
    if (!form.imageUrl) {
      setError("Slide image is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim() || null,
        imageUrl: form.imageUrl,
        ctaText: form.ctaText.trim() || null,
        ctaUrl: form.ctaUrl.trim() || null,
        active: form.active,
        sortOrder: Number(form.sortOrder) || 0,
      };

      const response = await fetch(
        editingId ? `/api/admin/hero-slides/${editingId}` : "/api/admin/hero-slides",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to save slide");
      }

      if (editingId) {
        setSlides((prev) => prev.map((slide) => (slide.id === editingId ? data : slide)));
        pushToast({ title: "Slide updated", description: "Hero slide was updated successfully.", variant: "success" });
      } else {
        setSlides((prev) => [...prev, data]);
        pushToast({ title: "Slide created", description: "Hero slide was added successfully.", variant: "success" });
      }

      resetForm();
    } catch (saveError) {
      console.error(saveError);
      setError(saveError instanceof Error ? saveError.message : "Failed to save slide.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this slide from the hero carousel?")) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/hero-slides/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to delete slide");
      }
      setSlides((prev) => prev.filter((slide) => slide.id !== id));
      pushToast({ title: "Slide removed", description: "Hero slide was removed from the carousel.", variant: "success" });
      if (editingId === id) resetForm();
    } catch (deleteError) {
      console.error(deleteError);
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete slide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Hero slides</p>
          <p className="text-sm text-slate-500">Upload and reorder the images shown in the homepage hero carousel.</p>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Plus className="h-4 w-4" />
          Add slide
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {slides.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              No hero slides found. Use the form to add a new slide.
            </div>
          ) : (
            <div className="space-y-4">
              {slides.map((slide) => (
                <div key={slide.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{slide.title}</p>
                      <p className="mt-1 text-xs text-slate-500">Sort order: {slide.sortOrder}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(slide)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(slide.id)}
                        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="relative h-24 w-36 overflow-hidden rounded-2xl bg-slate-100">
                      <Image src={slide.imageUrl} alt={slide.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="space-y-1 text-sm text-slate-500">
                      {slide.ctaText ? <p>CTA: {slide.ctaText}</p> : null}
                      {slide.ctaUrl ? <p>Link: {slide.ctaUrl}</p> : null}
                      <p>{slide.active ? "Active" : "Inactive"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-slate-900">{editingId ? "Edit slide" : "Create new slide"}</p>
              <p className="mt-1 text-sm text-slate-500">Fill in the slide details and save.</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {editingId ? "Editing" : "New"}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Slide title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Subtitle</label>
              <textarea
                rows={3}
                value={form.subtitle}
                onChange={(e) => setForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Background image</label>
              <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500 transition hover:border-emerald-500 hover:bg-emerald-50">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                  <Upload className="h-5 w-5 text-slate-400" />
                  <span>{imageUploading ? "Uploading…" : "Upload or replace image"}</span>
                </label>
                {imagePreview ? (
                  <div className="relative mt-4 h-40 overflow-hidden rounded-2xl border border-slate-200">
                    <Image src={imagePreview} alt="Slide preview" fill className="object-cover" unoptimized />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">CTA text</label>
                <input
                  type="text"
                  value={form.ctaText}
                  onChange={(e) => setForm((prev) => ({ ...prev, ctaText: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">CTA link</label>
                <input
                  type="url"
                  value={form.ctaUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, ctaUrl: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Sort order</label>
                <input
                  type="number"
                  min={0}
                  value={form.sortOrder}
                  onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: Number(e.target.value) }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div className="flex items-end gap-2">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Active
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
                {editingId ? "Save slide" : "Create slide"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
