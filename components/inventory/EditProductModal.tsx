"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/app/context/toastContext";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { useFormValidation, commonRules } from "@/hooks/useFormValidation";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  sku?: string | null;
  price: number;
  quantity: number;
  lowStock?: number | null;
  manufacturer?: string | null;
  imageUrl?: string | null;
  activeListing?: boolean;
  isFeatured?: boolean;
};

type Props = {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSave: (updated: Product) => Promise<void> | void;
};

const CATEGORIES = [
  "Pain Relief",
  "Sexual Wellness",
  "Women's Care",
  "Flu & Cold",
  "Vitamins & Supplements",
  "General Health",
];

export default function EditProductModal({ open, product, onClose, onSave }: Props) {
  const { pushToast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const { errors, validateField, validateAll, clearErrors } = useFormValidation({
    name: [commonRules.required("Product name is required"), commonRules.minLength(2)],
    price: [commonRules.required("Price is required"), commonRules.positiveNumber()],
    quantity: [commonRules.required("Quantity is required"), commonRules.validNumber()],
    lowStock: [commonRules.validNumber()],
  });

  useEffect(() => {
    if (open && product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        sku: product.sku || "",
        price: product.price ?? 0,
        quantity: product.quantity ?? 0,
        lowStock: product.lowStock ?? null,
        manufacturer: product.manufacturer || "",
        imageUrl: product.imageUrl || "",
        activeListing: product.activeListing ?? true,
        isFeatured: product.isFeatured ?? false,
      });
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product?.id]);

  if (!open) return null;

  const handleSave = async () => {
    if (!validateAll(form)) {
      pushToast({
        title: "Validation Error",
        description: "Please fix the errors below.",
        variant: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await onSave({ ...(product as Product), ...form });
      pushToast({
        title: "Success",
        description: "Product updated successfully.",
        variant: "success",
      });
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update product";
      pushToast({
        title: "Error",
        description: message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFieldChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      validateField(field, value);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Edit Product</h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Product Name *
            </label>
            <input
              type="text"
              value={form.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onBlur={() => validateField("name", form.name)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
                errors.name
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              }`}
              placeholder="e.g., Paracetamol 500mg"
              disabled={loading}
            />
            {errors.name && (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-red-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.name}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-slate-700">SKU</label>
              <input
                type="text"
                value={form.sku || ""}
                onChange={(e) => handleFieldChange("sku", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
                placeholder="Stock keeping unit"
                disabled={loading}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <select
                value={form.category || ""}
                onChange={(e) => handleFieldChange("category", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
                disabled={loading}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Manufacturer */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Brand / Manufacturer
              </label>
              <input
                type="text"
                value={form.manufacturer || ""}
                onChange={(e) => handleFieldChange("manufacturer", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
                placeholder="e.g., Novartis, GSK"
                disabled={loading}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Price (GHS) *
              </label>
              <input
                type="number"
                value={form.price ?? ""}
                onChange={(e) =>
                  handleFieldChange("price", e.target.value === "" ? null : Number(e.target.value))
                }
                onBlur={() => validateField("price", form.price)}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
                  errors.price
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
                step="0.01"
                min="0"
                placeholder="0.00"
                disabled={loading}
              />
              {errors.price && (
                <div className="mt-1 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.price}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Quantity in Stock *
              </label>
              <input
                type="number"
                value={form.quantity ?? ""}
                onChange={(e) =>
                  handleFieldChange("quantity", e.target.value === "" ? null : Number(e.target.value))
                }
                onBlur={() => validateField("quantity", form.quantity)}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
                  errors.quantity
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
                min="0"
                placeholder="0"
                disabled={loading}
              />
              {errors.quantity && (
                <div className="mt-1 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.quantity}
                </div>
              )}
            </div>

            {/* Low Stock Alert */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Low Stock Alert
              </label>
              <input
                type="number"
                value={form.lowStock ?? ""}
                onChange={(e) =>
                  handleFieldChange("lowStock", e.target.value === "" ? null : Number(e.target.value))
                }
                onBlur={() => validateField("lowStock", form.lowStock)}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
                  errors.lowStock
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
                min="0"
                placeholder="Minimum safe stock level"
                disabled={loading}
              />
              {errors.lowStock && (
                <div className="mt-1 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.lowStock}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={form.description || ""}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
              placeholder="Product details, usage, warnings..."
              disabled={loading}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Image URL</label>
            <input
              type="url"
              value={form.imageUrl || ""}
              onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
          </div>

          {/* Active Listing */}
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
            <input
              type="checkbox"
              id="activeListing"
              checked={form.activeListing ?? true}
              onChange={(e) => handleFieldChange("activeListing", e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              disabled={loading}
            />
            <label htmlFor="activeListing" className="text-sm font-medium text-slate-700">
              Active Listing
            </label>
            <span className="text-xs text-slate-500">(Product is visible for purchase)</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
            <input
              type="checkbox"
              id="isFeatured"
              checked={form.isFeatured ?? false}
              onChange={(e) => handleFieldChange("isFeatured", e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              disabled={loading}
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">
              Feature on homepage
            </label>
            <span className="text-xs text-slate-500">(Show product in the featured products section)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}