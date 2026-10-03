"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

// WhatsApp number comes from env — never hardcoded.
// Falls back to the primary pharmacy phone from config if env not set.
function getWhatsAppLink(message?: string) {
  // NEXT_PUBLIC_PHARMACY_PHONE is e.g. "0537355068"
  const rawPhone = process.env.NEXT_PUBLIC_PHARMACY_PHONE ?? "0537355068";
  // Convert 0XXXXXXXXX → 233XXXXXXXXX for wa.me
  const intl = rawPhone.startsWith("0")
    ? "233" + rawPhone.slice(1)
    : rawPhone.replace(/^\+/, "");
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${intl}${text}`;
}

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  /** visual variant */
  variant?: "fab" | "banner" | "inline" | "pill";
  className?: string;
}

export default function WhatsAppButton({
  message = "Hi, I need help with my order on ComfortHealth.",
  label = "Chat on WhatsApp",
  variant = "pill",
  className = "",
}: WhatsAppButtonProps) {
  const href = getWhatsAppLink(message);

  if (variant === "fab") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`fixed bottom-[84px] right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25d366] shadow-lg shadow-[#25d366]/30 transition-all duration-200 active:scale-95 hover:bg-[#1ebe5d] md:bottom-6 ${className}`}
      >
        <MessageCircle className="h-6 w-6 text-white" fill="white" />
      </Link>
    );
  }

  if (variant === "banner") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-3.5 transition-all duration-150 hover:bg-[#dcfce7] active:scale-[0.99] ${className}`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366]">
          <MessageCircle className="h-5 w-5 text-white" fill="white" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#0f2318]">Need help finding something?</p>
          <p className="text-xs text-[#15803d]">Chat with ComfortHealth on WhatsApp</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-[#25d366] px-3 py-1.5 text-xs font-bold text-white">
          Chat
        </span>
      </Link>
    );
  }

  if (variant === "inline") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 font-semibold text-[#15803d] underline-offset-2 hover:underline ${className}`}
      >
        <MessageCircle className="h-4 w-4" />
        {label}
      </Link>
    );
  }

  // Default: pill
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-10 items-center gap-2 rounded-full bg-[#25d366] px-4 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#1ebe5d] active:scale-[0.97] ${className}`}
    >
      <MessageCircle className="h-4 w-4" fill="white" />
      {label}
    </Link>
  );
}
