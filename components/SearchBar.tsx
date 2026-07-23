import Link from "next/link";
import { Search } from "lucide-react";

type SearchBarProps = {
  href?: string;
  className?: string;
};

export default function SearchBar({
  href = "/search",
  className = "",
}: SearchBarProps) {
  return (
    <Link
      href={href}
      className={`flex h-12 w-full items-center gap-2 rounded-full border-[1.5px] border-[#d1fae5] bg-white px-4 text-left text-base text-gray-400 shadow-sm transition-all duration-100 active:scale-[0.98] active:opacity-90 ${className}`}
    >
      <Search className="h-[18px] w-[18px] shrink-0 text-[#15803d]" aria-hidden="true" />
      <span>Search through medicines...</span>
    </Link>
  );
}
