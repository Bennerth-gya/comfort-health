"use client";

import {
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react";
import type { ToastMessage } from "@/app/context/toastContext";

type ToastContainerProps = {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
};

export default function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-6 z-50 flex w-auto flex-col gap-3 sm:right-6">
      {toasts.map((toast) => {
        const isSuccess = toast.variant === "success";
        const isError = toast.variant === "error";
        return (
          <div
            key={toast.id}
            className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-xl"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                  isSuccess
                    ? "bg-emerald-100 text-emerald-700"
                    : isError
                    ? "bg-red-100 text-red-700"
                    : "bg-sky-100 text-sky-700"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isError ? (
                  <XCircle className="h-5 w-5" />
                ) : (
                  <Info className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">{toast.title}</p>
                <p className="mt-1 text-sm text-gray-600">{toast.description}</p>
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-full p-1 text-gray-400 transition hover:text-gray-700"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
