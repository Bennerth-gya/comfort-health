"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

type HealthArticleDeleteButtonProps = {
  articleId: string;
  title: string;
};

export default function HealthArticleDeleteButton({
  articleId,
  title,
}: HealthArticleDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${title}"?\n\nThis will remove the article from the health section.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/health/${articleId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to delete article.");
      }

      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Failed to delete article."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      title="Delete article"
      aria-label={`Delete ${title}`}
    >
      {isDeleting ? (
        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
      ) : (
        <Trash2 size={18} aria-hidden="true" />
      )}
    </button>
  );
}
