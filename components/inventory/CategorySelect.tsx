"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export const PRESET_CATEGORIES = [
  "Pain Relief",
  "Sexual Wellness",
  "Women's Care",
  "Flu & Cold",
  "Vitamins & Supplements",
  "Skincare",
  "Antibiotics",
  "General Health",
  "Other",
] as const;

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Extra CSS class for the outer wrapper */
  className?: string;
  /** Class forwarded to the select / input element */
  inputClassName?: string;
};

export default function CategorySelect({
  value,
  onChange,
  disabled = false,
  className = "",
  inputClassName = "",
}: Props) {
  const isCustom =
    value !== "" && !PRESET_CATEGORIES.includes(value as (typeof PRESET_CATEGORIES)[number]);

  const [creatingNew, setCreatingNew] = useState(isCustom);
  const [customValue, setCustomValue] = useState(isCustom ? value : "");

  const baseInput =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50 bg-white";

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    if (v === "__new__") {
      setCreatingNew(true);
      setCustomValue("");
      onChange("");
    } else {
      setCreatingNew(false);
      setCustomValue("");
      onChange(v);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value);
    onChange(e.target.value);
  };

  const cancelCustom = () => {
    setCreatingNew(false);
    setCustomValue("");
    onChange("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Preset dropdown — hide if user is typing a new one */}
      {!creatingNew && (
        <select
          value={value}
          onChange={handleSelectChange}
          disabled={disabled}
          className={`${baseInput} ${inputClassName}`}
        >
          <option value="">Select category</option>
          {PRESET_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="__new__">＋ Create new category…</option>
        </select>
      )}

      {/* Custom category input */}
      {creatingNew && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Plus className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-emerald-500" />
            <input
              type="text"
              autoFocus
              value={customValue}
              onChange={handleCustomChange}
              disabled={disabled}
              placeholder="Type a new category name…"
              className={`${baseInput} pl-8 ${inputClassName}`}
            />
          </div>
          <button
            type="button"
            onClick={cancelCustom}
            disabled={disabled}
            title="Back to preset categories"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Helper text when creating */}
      {creatingNew && (
        <p className="text-[11px] text-emerald-600 font-medium">
          New category will be saved with this product.{" "}
          <button
            type="button"
            onClick={cancelCustom}
            className="underline text-slate-400 hover:text-slate-600"
          >
            Back to list
          </button>
        </p>
      )}
    </div>
  );
}
