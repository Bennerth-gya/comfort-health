"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Minus, Plus, ShieldCheck, ShoppingCart, Trash2, ShoppingBag } from "lucide-react";
import PaystackCheckout from "@/app/components/PaystackCheckout";
import { type CartItem, useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";

function CartItemRow({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: {
  item: CartItem;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}) {
  const startXRef = useRef<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  return (
    <>
      <div className="relative overflow-hidden border-b border-[#f3f4f6] md:hidden">
        <button
          type="button"
          onClick={onRemove}
          className="absolute bottom-0 right-0 top-0 flex w-24 items-center justify-center bg-red-500 text-sm font-semibold text-white"
        >
          Remove
        </button>
        <div
          className="flex gap-3 bg-[#f8faf8] px-4 py-3.5 transition-transform duration-150"
          style={{ transform: `translateX(${swipeOffset}px)` }}
          onTouchStart={(event) => {
            startXRef.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchMove={(event) => {
            const startX = startXRef.current;
            const nextX = event.touches[0]?.clientX ?? null;
            if (startX === null || nextX === null) return;
            const delta = nextX - startX;
            if (delta < 0) {
              setSwipeOffset(Math.max(delta, -96));
            }
          }}
          onTouchEnd={() => {
            setSwipeOffset((current) => (current < -80 ? -88 : 0));
            startXRef.current = null;
          }}
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] bg-[#f0fdf4]">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="64px"
                unoptimized={shouldUnoptimizeProductImage(item.image)}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#15803d]">
                <ShoppingCart className="h-5 w-5" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-bold leading-snug text-[#0f2318]">
              {item.name}
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              {item.category ?? "Uncategorized"}
            </p>
            <p className="mt-1 text-sm font-bold text-[#15803d]">
              GHS {item.price.toFixed(2)}
            </p>
            <button
              type="button"
              onClick={onRemove}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-600 transition hover:text-red-700"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
          <div className="flex shrink-0 flex-col items-end justify-between gap-2">
            <div className="flex items-center rounded-lg border border-[#e5e7eb] bg-white">
              <button
                type="button"
                onClick={onDecrease}
                className="flex h-8 w-8 items-center justify-center text-gray-600 active:bg-gray-50"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-7 text-center text-xs font-bold text-[#0f2318]">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={onIncrease}
                className="flex h-8 w-8 items-center justify-center text-gray-600 active:bg-gray-50"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-right text-xs font-semibold text-[#0f2318]">
              GHS {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-[88px_minmax(0,1fr)_auto] gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-5 md:grid">
        <div className="relative h-[88px] w-[88px] overflow-hidden rounded-xl bg-[#f0fdf4]">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="88px"
              unoptimized={shouldUnoptimizeProductImage(item.image)}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#15803d]">
              <ShoppingCart className="h-6 w-6" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-[#0f2318]">{item.name}</p>
          <p className="mt-1 text-xs text-gray-500">{item.category ?? "Uncategorized"}</p>
          <p className="mt-3 text-sm font-bold text-[#15803d]">
            GHS {item.price.toFixed(2)} / unit
          </p>
          <div className="mt-3 flex w-fit items-center rounded-lg border border-[#e5e7eb] bg-white">
            <button
              type="button"
              onClick={onDecrease}
              className="flex h-9 w-9 items-center justify-center rounded-l-lg text-gray-600 transition hover:bg-emerald-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-8 text-center text-sm font-bold text-[#0f2318]">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={onIncrease}
              className="flex h-9 w-9 items-center justify-center rounded-r-lg text-gray-600 transition hover:bg-emerald-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-4">
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-gray-400">Line total</p>
            <p className="mt-1 text-base font-bold text-[#0f2318]">
              GHS {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function SummaryRows({ subtotal }: { subtotal: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span className="font-semibold text-[#0f2318]">GHS {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Delivery fee</span>
        <span className="font-semibold text-[#15803d]">
          {subtotal > 50 ? "Free" : "GHS 0.00"}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-3">
        <span className="text-base font-bold text-[#0f2318]">Total</span>
        <span className="text-base font-bold text-[#0f2318]">
          GHS {subtotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    subtotal,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();
  const { pushToast } = useToast();

  const scrollToCheckout = () => {
    document.getElementById("checkout-panel")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item.id);
    pushToast({
      title: "Item removed",
      description: `${item.name} has been removed from your cart.`,
      variant: "info",
    });
  };

  return (
    <div className="min-h-dvh bg-[#f8faf8] pb-[calc(96px+env(safe-area-inset-bottom,16px))] text-[#0f2318] md:pb-8">
      <div className="mx-auto max-w-7xl md:px-6 md:py-8">
        <header className="bg-[#0f2318] px-4 py-3 flex items-center gap-3 text-white md:px-0">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition active:scale-[0.97]"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-700">My Cart ({cartCount} item{cartCount === 1 ? "" : "s"})</h1>
            <p className="mt-1 text-sm text-white/70">
              {cart.length} product{cart.length === 1 ? "" : "s"} in your bag
            </p>
          </div>
        </header>

        {cart.length === 0 ? (
          <section className="mx-4 rounded-2xl border border-dashed border-[#bbf7d0] bg-white px-6 py-14 text-center md:mx-0">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdf4] text-[#15803d]">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <h2 className="text-[18px] font-bold text-[#0f2318]">Your cart is empty</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-[1.5] text-gray-500">
              Browse medicines and wellness products to begin checkout.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-[#15803d] px-5 text-sm font-bold text-white transition active:scale-[0.97] md:hover:bg-[#166534]"
            >
              Start shopping
            </Link>
          </section>
        ) : (
          <div className="md:grid md:grid-cols-[65fr_35fr] md:gap-6">
            <section className="md:min-w-0 pb-32">
              <div className="bg-white md:space-y-3 md:bg-transparent">
                {cart.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onDecrease={() => decreaseQty(item.id)}
                    onIncrease={() => increaseQty(item.id)}
                    onRemove={() => handleRemoveItem(item)}
                  />
                ))}
              </div>
              <Link
                href="/"
                className="mx-4 mt-4 hidden text-sm font-semibold text-[#15803d] md:inline-flex md:hover:underline"
              >
                Continue shopping
              </Link>
            </section>

            <aside className="mt-3 px-4 md:sticky md:top-24 md:mt-0 md:self-start md:px-0">
              <div className="rounded-[14px] bg-[#f9fafb] p-4 md:rounded-2xl md:border md:border-[#e5e7eb] md:bg-white md:p-6">
                <h2 className="text-base font-bold text-[#0f2318] md:text-lg">
                  Order summary
                </h2>
                <div className="mt-4">
                  <SummaryRows subtotal={subtotal} />
                </div>
              </div>

              <div id="checkout-panel" className="mt-4 scroll-mt-24">
                {/* PAYSTACK_DISABLED — will re-enable after approval
                <PaystackCheckout
                  items={cart}
                  amount={subtotal}
                  buttonLabel={`Checkout - GHS ${subtotal.toFixed(2)}`}
                  buttonClassName="w-full flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#15803d] px-5 py-3.5 text-[14px] font-bold text-white transition active:scale-[0.98] hover:bg-[#166534] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d]"
                  buttonIcon={<Lock className="h-4 w-4" />}
                />
                */}
                <Link
                  href="/checkout"
                  className="
                    w-full flex min-h-11 items-center justify-center gap-2
                    bg-[#15803d] text-white rounded-xl px-5 py-3.5
                    text-[14px] font-bold active:scale-[0.98] hover:bg-[#166534]
                    transition-all shadow-lg shadow-green-900/20
                  "
                >
                  <ShoppingBag className="h-4 w-4" />
                  Proceed to checkout — GHS {subtotal.toFixed(2)}
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  clearCart();
                  pushToast({
                    title: "Cart cleared",
                    description: "All items have been removed from your cart.",
                    variant: "info",
                  });
                }}
                className="mt-3 hidden w-full min-h-11 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-5 text-sm font-semibold text-[#0f2318] transition hover:bg-gray-50 md:flex"
              >
                Clear cart
              </button>

              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#0f2318] p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Secure checkout</p>
                  <p className="mt-1 text-xs leading-[1.6] text-white/70">
                    Pay on delivery is enabled. You only pay when your order arrives.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {cart.length > 0 ? (
        <Link
          href="/checkout"
          className="safe-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white px-4 py-3 md:hidden"
        >
          <span className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#15803d] px-4 py-3 text-[16px] font-800 text-white shadow-lg shadow-green-900/20 transition active:scale-[0.98]">
            Proceed to checkout — GHS {subtotal.toFixed(2)}
          </span>
        </Link>
      ) : null}
    </div>
  );
}
