import AdminShell from "@/components/AdminShell";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import HeroSlidesClient from "@/components/inventory/HeroSlidesClient";

export const dynamic = "force-dynamic";

export default async function HeroSlidesPage() {
  await requireAdminUser();

  const slides = await prisma.heroSlide.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell className="min-h-screen bg-slate-50 text-slate-950">
      <div className="ml-64 min-h-screen px-8 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Hero slides</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Configure the images and text shown in the homepage hero carousel.
            </p>
          </div>
        </div>
        <HeroSlidesClient initialSlides={slides} />
      </div>
    </AdminShell>
  );
}
