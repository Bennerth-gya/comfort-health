import AdminShell from "@/components/AdminShell";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import HealthArticleEditClient from "./HealthArticleEditClient";

export const dynamic = "force-dynamic";

export default async function AdminHealthArticleEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminUser();

  const { id } = await params;
  const article = await prisma.healthArticle.findUnique({
    where: { id },
  });

  if (!article) {
    notFound();
  }

  // Passing the article as plain object to client component
  return (
    <AdminShell>
      <div className="ml-64 p-8">
        <HealthArticleEditClient initialArticle={article} />
      </div>
    </AdminShell>
  );
}
