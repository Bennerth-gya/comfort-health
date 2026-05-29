"use client";

import { useState } from "react";
import { useToast } from "@/app/context/toastContext";
import { AlertTriangle, Loader2, X } from "lucide-react";

type Props = {
  open: boolean;
  productName?: string;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
};

export default function ConfirmDeleteModal({
  open,
  productName,
  onConfirm,
  onClose,
}: Props) {
  const { pushToast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      pushToast({
        title: "Success",
        description: "Product deleted successfully.",
        variant: "success",
      });
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete product";
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">Delete Product?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">&quot;{productName}&quot;</span>? This
              action can be undone by restoring the listing from soft-delete.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
