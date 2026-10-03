import AdminShell from "@/components/AdminShell";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BundleAdminClient from "./BundleAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminBundlesPage() {
  await requireAdminUser();

  const [bundles, products] = await Promise.all([
    prisma.bundle.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          include: {
            product: { select: { id: true, name: true, price: true, imageUrl: true, quantity: true, category: true } },
          },
        },
      },
    }),
    prisma.product.findMany({
      where: { activeListing: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, price: true, category: true, quantity: true, imageUrl: true },
    }),
  ]);

  return (
    <AdminShell>
      <main className="ml-64 min-h-screen p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Bundles</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage curated product bundles for students.</p>
        </div>
        <BundleAdminClient
          initialBundles={bundles.map((b) => ({
            ...b,
            price: Number(b.price),
            compareAt: b.compareAt ? Number(b.compareAt) : null,
            items: b.items.map((item) => ({
              ...item,
              product: { ...item.product, price: Number(item.product.price) },
            })),
          }))}
          allProducts={products.map((p) => ({ ...p, price: Number(p.price) }))}
        />
      </main>
    </AdminShell>
  );
}
