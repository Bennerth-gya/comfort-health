"use client";

import { MessageCircleHeart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TOOLTIP_STORAGE_KEY = "fab_tooltip_seen";

export default function AiFab() {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHidingTooltip, setIsHidingTooltip] = useState(false);

  useEffect(() => {
    let shouldShowTooltip = false;

    try {
      if (window.localStorage.getItem(TOOLTIP_STORAGE_KEY)) {
        return;
      }

      window.localStorage.setItem(TOOLTIP_STORAGE_KEY, "true");
      shouldShowTooltip = true;
    } catch {
      shouldShowTooltip = true;
    }

    const showTimer = window.setTimeout(() => {
      setShowTooltip(shouldShowTooltip);
    }, 0);

    const fadeTimer = window.setTimeout(() => {
      setIsHidingTooltip(true);
    }, 4600);

    const hideTimer = window.setTimeout(() => {
      setShowTooltip(false);
      setIsHidingTooltip(false);
    }, 5000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip ? (
        <div
          className={`ai-fab-tooltip absolute bottom-[72px] right-0 w-[180px] rounded-xl bg-white px-3 py-2.5 text-left shadow-md transition-opacity duration-300 ${
            isHidingTooltip ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-[11px] font-bold leading-tight text-[#1a2e22]">
            Not sure what to buy?
          </p>
          <p className="mt-1 text-[10px] leading-snug text-gray-500">
            Describe your symptoms and get matched to the right medicine.
          </p>
          <span className="absolute -bottom-2 right-5 h-4 w-4 rotate-45 bg-white" />
        </div>
      ) : null}

      <div className="relative h-[58px] w-[58px]">
        <span className="ai-fab-pulse absolute inset-0 rounded-full bg-[#15803d]/30" />
        <button
          type="button"
          aria-label="Open Comfort AI health guide"
          onClick={() => router.push("/ai-guide")}
          className="relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-gradient-to-br from-[#15803d] to-[#059669] text-white transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          style={{ boxShadow: "0 4px 20px rgba(21,128,61,0.45)" }}
        >
          <MessageCircleHeart className="h-[26px] w-[26px]" aria-hidden="true" />
          <span className="absolute -right-0.5 -top-0.5 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-red-600 text-[8px] font-bold leading-none text-white">
            AI
          </span>
        </button>
      </div>

      <style>{`
        @keyframes ai-fab-pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.55);
            opacity: 0;
          }
        }

        .ai-fab-pulse {
          animation: ai-fab-pulse 2s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-fab-pulse {
            animation: none;
            display: none;
          }

          .ai-fab-tooltip {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
