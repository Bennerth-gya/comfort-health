"use client";

import { isAuthPath } from "@/lib/admin-routes";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname || pathname === "/" || pathname === "/ai-guide" || isAuthPath(pathname)) {
    return null;
  }

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      aria-label="Go back"
      onClick={handleBack}
      className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
    >
      <ArrowLeft className="h-5 w-5 text-gray-700" />
    </button>
  );
}
