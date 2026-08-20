import AdminShell from "@/components/AdminShell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Edit2, Eye, FilePlus2, PlusCircle } from "lucide-react";
import { requireAdminUser } from "@/lib/auth";
import HealthArticleDeleteButton from "./HealthArticleDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminHealthArticlesPage() {
  await requireAdminUser();

  const articles = await prisma.healthArticle.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell>
      <div className="ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Health Articles</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage educational content and Cloudinary background image URLs.
            </p>
          </div>
          <Link
            href="/admin/health/new"
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            <PlusCircle size={16} />
            New Article
          </Link>
        </div>

        <section className="mb-6 rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FilePlus2 size={22} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Add Health Article
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Draft new health education content for the public health section.
                </p>
              </div>
            </div>
            <Link
              href="/admin/health/new"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <PlusCircle size={16} />
              Add Article
            </Link>
          </div>
        </section>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      {article.coverImage ? (
                        <div
                          className="h-10 w-10 rounded-lg bg-cover bg-center border border-gray-100 flex-shrink-0"
                          style={{ backgroundImage: `url(${article.coverImage})` }}
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
                          <BookOpen size={18} />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-slate-900 truncate max-w-[300px]">
                          {article.title}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[300px]">
                          {article.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {article.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        article.isPublished
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {article.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/health/${article.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-emerald-600 transition"
                        title="View live"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/health/${article.id}`}
                        className="text-slate-400 hover:text-emerald-600 transition"
                        title="Edit article"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <HealthArticleDeleteButton
                        articleId={article.id}
                        title={article.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
