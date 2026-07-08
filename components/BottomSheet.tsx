"use client";

import { useEffect, useRef, type ReactNode } from "react";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="md:hidden" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/40"
        aria-label="Close sheet"
        onClick={onClose}
      />
      <section
        className="safe-bottom fixed bottom-0 left-0 right-0 z-50 translate-y-0 rounded-t-[20px] bg-white pb-4 shadow-[0_-18px_50px_rgba(15,35,24,0.22)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        onTouchStart={(event) => {
          startYRef.current = event.touches[0]?.clientY ?? null;
        }}
        onTouchEnd={(event) => {
          const startY = startYRef.current;
          const endY = event.changedTouches[0]?.clientY ?? null;
          startYRef.current = null;

          if (startY !== null && endY !== null && endY - startY > 100) {
            onClose();
          }
        }}
      >
        <div className="mx-auto my-3 h-1 w-8 rounded-full bg-[#e5e7eb]" />
        {title ? (
          <h2 className="px-5 pb-3 text-[17px] font-bold text-[#0f2318]">
            {title}
          </h2>
        ) : null}
        <div className="px-4">{children}</div>
      </section>
    </div>
  );
}
