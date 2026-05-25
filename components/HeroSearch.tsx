"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export const DRUG_TAGS = [
  "Panadol",
  "Condoms",
  "Vitamin C",
  "Cough Syrup",
];

type HeroSearchProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

export default function HeroSearch({
  placeholder = "Search medicines...",
  onSearch,
}: HeroSearchProps) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (onSearch) onSearch(value);
  };

  return (
    <div className="mt-8">
      <div className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-14 flex-1 px-5 outline-none"
        />

        <button
          onClick={submit}
          className="flex items-center gap-2 bg-emerald-600 px-8 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {DRUG_TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
