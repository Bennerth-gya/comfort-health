"use client";

import AdminShell from "@/components/AdminShell";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    DOSAGE_GUIDE_RANGES,
    type DosageGuideKey,
    emptyDosageGuideForm,
} from "@/lib/dosage-guide";
import { uploadProductImageFile } from "@/lib/upload-product-image";
import {
    ArrowLeft,
    Check,
    Upload,
    X,
    Package,
} from "lucide-react";

export default function AddProductClient() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [prescriptionRequired, setPrescriptionRequired] = useState(false);
    const [activeListing, setActiveListing] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [dosageGuide, setDosageGuide] = useState(emptyDosageGuideForm);

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        sku: "",
        price: "",
        quantity: "",
        lowStock: "",
        dosage: "",
        manufacturer: "",
        expiryDate: "",
    });

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const setDosageRange = (field: DosageGuideKey) =>
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDosageGuide((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file.");
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
        } catch (uploadError) {
            if (file.size > 1_000_000) {
                setError("Image must be 1MB or smaller for inline upload when object storage is unavailable.");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);

            if (uploadError instanceof Error && !uploadError.message.includes("not configured")) {
                setError(uploadError.message);
            }
        } finally {
            setImageUploading(false);
        }
    };

    const getStockStatus = () => {
        const qty = Number(form.quantity);
        const low = Number(form.lowStock);
        if (!form.quantity) return { label: "—", color: "text-gray-400", bg: "bg-gray-50 border-gray-200" };
        if (qty === 0) return { label: "Out of stock", color: "text-red-600", bg: "bg-red-50 border-red-200" };
        if (form.lowStock && qty <= low) return { label: "Low stock", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" };
        return { label: "In stock", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
    };

    const status = getStockStatus();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: parseFloat(form.price),
                    quantity: parseInt(form.quantity),
                    lowStock: form.lowStock ? parseInt(form.lowStock) : null,
                    prescriptionRequired,
                    activeListing,
                    isFeatured,
                    imageUrl: imagePreview,
                    dosageGuide,
                }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error ?? "Failed to save product");
            }
            router.push("/inventory");
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Failed to save product");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AdminShell>
            <main className="ml-64 min-h-screen p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to inventory
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-900">Add new product</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Fill in the details below to add a product to your inventory
                        </p>
                    </div>
                    <div className="flex items-center gap-3 pt-8">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            form="product-form"
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60 transition-colors"
                        >
                            <Check className="w-4 h-4" />
                            {loading ? "Saving..." : "Save product"}
                        </button>
                    </div>
                </div>

                <form id="product-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left — 2 cols */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Basic information */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-sm font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                                    Basic information
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Product name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. Panadol Extra (12 Tablets)"
                                            value={form.name}
                                            onChange={set("name")}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="Brief product description..."
                                            value={form.description}
                                            onChange={set("description")}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                Category
                                            </label>
                                            <select
                                                value={form.category}
                                                onChange={set("category")}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                                            >
                                                <option value="">Select category</option>
                                                <option>Pain Relief</option>
                                                <option>Sexual Wellness</option>
                                                <option>Women&apos;s Care</option>
                                                <option>Flu & Cold</option>
                                                <option>Vitamins & Supplements</option>
                                                <option>Skincare</option>
                                                <option>Antibiotics</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                SKU
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. CH-001"
                                                value={form.sku}
                                                onChange={set("sku")}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing & Stock */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-sm font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                                    Pricing & stock
                                </h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Price (GHS) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2 text-sm text-gray-400">₵</span>
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                value={form.price}
                                                onChange={set("price")}
                                                className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Quantity <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={form.quantity}
                                            onChange={set("quantity")}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Low stock alert
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="e.g. 10"
                                            value={form.lowStock}
                                            onChange={set("lowStock")}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pharmacy details */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-sm font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                                    Pharmacy details
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Dosage
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 500mg"
                                            value={form.dosage}
                                            onChange={set("dosage")}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Manufacturer
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. GlaxoSmithKline"
                                            value={form.manufacturer}
                                            onChange={set("manufacturer")}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Expiry date
                                        </label>
                                        <input
                                            type="date"
                                            value={form.expiryDate}
                                            onChange={set("expiryDate")}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-gray-100 pt-5">
                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Dosage by age range
                                    </h3>
                                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                        {DOSAGE_GUIDE_RANGES.map((range) => (
                                            <div key={range.key}>
                                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                                    {range.label}
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    placeholder={range.placeholder}
                                                    value={dosageGuide[range.key]}
                                                    onChange={setDosageRange(range.key)}
                                                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-6">

                            {/* Product image */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-sm font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                                    Product image
                                </h2>
                                <label className="block cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImage}
                                    />
                                    {imagePreview ? (
                                        <div className="relative h-40 rounded-lg overflow-hidden border border-gray-200">
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">Change image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
                                            <div className="flex justify-center mb-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <Upload className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <p className="text-xs font-medium text-gray-600 mb-1">
                                                Click to upload
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {imageUploading ? "Uploading…" : "PNG, JPG up to 2MB"}
                                            </p>
                                        </div>
                                    )}
                                </label>
                            </div>

                            {/* Availability toggles */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-sm font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                                    Availability
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                Prescription required
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Customers must upload a script
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setPrescriptionRequired(!prescriptionRequired)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                                                prescriptionRequired ? "bg-emerald-600" : "bg-gray-200"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                                                    prescriptionRequired ? "translate-x-6" : "translate-x-1"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                Active listing
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Show product in inventory
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setActiveListing(!activeListing)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                                                activeListing ? "bg-emerald-600" : "bg-gray-200"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                                                    activeListing ? "translate-x-6" : "translate-x-1"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                Feature on homepage
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Show this product in the featured section
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsFeatured(!isFeatured)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${
                                                isFeatured ? "bg-emerald-600" : "bg-gray-200"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                                                    isFeatured ? "translate-x-6" : "translate-x-1"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Status preview */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-sm font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                                    Status preview
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Stock status</span>
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${status.bg} ${status.color}`}
                                        >
                                            {status.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Prescription</span>
                                        <span className="text-xs font-medium text-gray-700">
                                            {prescriptionRequired ? "Required" : "Not required"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Listing</span>
                                        <span className="text-xs font-medium text-gray-700">
                                            {activeListing ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Expiry</span>
                                        <span className="text-xs font-medium text-gray-700">
                                            {form.expiryDate
                                                ? new Date(form.expiryDate).toLocaleDateString("en-US", {
                                                      month: "short",
                                                      year: "numeric",
                                                  })
                                                : "—"}
                                        </span>
                                    </div>
                                    {form.name && (
                                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
                                            {imagePreview ? (
                                                <Image
                                                    src={imagePreview}
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    unoptimized
                                                    className="h-10 w-10 rounded-lg object-cover border border-gray-100"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-gray-400" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 leading-tight">
                                                    {form.name}
                                                </p>
                                                {form.price && (
                                                    <p className="text-xs text-gray-500">
                                                        GHS {parseFloat(form.price || "0").toFixed(2)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </AdminShell>
    );
}
