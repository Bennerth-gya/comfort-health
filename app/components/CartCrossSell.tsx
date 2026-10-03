"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";

type CrossSellProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string | null;
};

export default function CartCrossSell({
  cartProductIds,
}: {
  cartProductIds: string[];
}) {
  const { addToCart } = useCart();
  const { pushToast } = useToast();
  const [products, setProducts] = useState<CrossSellProduct[]>([]);
  const [added, setAdded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/products/public")
      .then((r) => r.json())
      .then((data: unknown) => {
        const list: CrossSellProduct[] = Array.isArray(data) ? (data as CrossSellProduct[]) : [];
        // Exclude items already in cart, take first 8
        setProducts(list.filter((p) => !cartProductIds.includes(p.id)).slice(0, 8));
      })
      .catch(() => {/* silently ignore */});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleAdd = (p: CrossSellProduct) => {
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.imageUrl ?? "",
      category: p.category,
      quantity: 1,
    });
    setAdded((prev) => ({ ...prev, [p.id]: true }));
    pushToast({ title: "Added to cart", description: p.name, variant: "success" });
    setTimeout(() => setAdded((prev) => ({ ...prev, [p.id]: false })), 2000);
  };

  if (products.length === 0) return null;

  return (
    <section className="border-t border-[#e5e7eb] bg-[#f8faf8] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#15803d]">
              Complete your order
            </p>
            <h2 className="mt-0.5 text-[15px] font-bold text-[#0f2318]">
              You might also need
            </h2>
          </div>
          <Link
            href="/shop-page"
            className="text-xs font-semibold text-[#15803d] hover:underline"
          >
            Browse all
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex w-36 shrink-0 flex-col rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden shadow-sm"
            >
              <Link href={`/products/${p.id}`} className="relative block h-28 bg-[#f0fdf4]">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="144px"
                    className="object-cover"
                    unoptimized={shouldUnoptimizeProductImage(p.imageUrl)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ShoppingBag className="h-7 w-7 text-[#15803d]/30" />
                  </div>
                )}
              </Link>
              <div className="flex flex-1 flex-col gap-1 p-2.5">
                <p className="line-clamp-2 text-[11px] font-semibold leading-tight text-[#0f2318]">
                  {p.name}
                </p>
                <p className="text-xs font-bold text-[#15803d]">
                  GHS {Number(p.price).toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={() => handleAdd(p)}
                  disabled={added[p.id]}
                  className="mt-auto flex w-full items-center justify-center gap-1 rounded-lg bg-[#0f2318] py-1.5 text-[11px] font-bold text-white transition active:scale-[0.97] disabled:bg-[#15803d]"
                >
                  {added[p.id] ? "✓ Added" : "+ Add"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
