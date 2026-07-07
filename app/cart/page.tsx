"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Lock, ShieldCheck } from "lucide-react";
import PaystackCheckout from "@/app/components/PaystackCheckout";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";

// Decorative barcode bars for the receipt footer — deterministic widths so
// the layout doesn't shift between renders.
const BARCODE_WIDTHS = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 1, 2, 4, 1, 1, 3, 1, 2];

export default function CartPage() {
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

  return (
    <div className="min-h-screen bg-[#F6F4EE] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#E6E1D3] bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#B8842E]">
              Comfort Health · Basket
            </p>
            <h1 className="mt-1.5 flex items-center gap-2.5 text-[22px] font-semibold tracking-tight text-[#1E2421]">
              Review your basket
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-[#123A31] px-1.5 font-mono text-[12px] font-medium text-white">
                {cartCount}
              </span>
            </h1>
            <p className="mt-1 text-[13px] text-[#6B6459]">
              {cartCount} item{cartCount === 1 ? "" : "s"} ready for checkout
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[#E6E1D3] bg-[#F6F4EE] px-4 py-2 text-[13px] font-medium text-[#1E2421] transition hover:border-[#B8842E]/40 hover:bg-[#F6ECD9]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Continue shopping
          </Link>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#D8D2C0] bg-white px-8 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-[#B8842E]/50 bg-[#F6ECD9] text-[#B8842E]">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#B8842E]">Nothing filled yet</p>
            <h2 className="mt-2 text-[18px] font-semibold text-[#1E2421]">Your basket is empty</h2>
            <p className="mt-2 text-[13px] text-[#6B6459]">
              Browse our products and add items to your basket to begin checkout.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex rounded-lg bg-[#123A31] px-6 py-3 text-[13px] font-medium text-white transition hover:bg-[#0D2B25]"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">

            {/* Cart items */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 rounded-2xl border border-[#E6E1D3] bg-white p-5 sm:grid-cols-[88px_1fr_auto]"
                >
                  {/* Image */}
                  <div className="relative h-[84px] w-full overflow-hidden rounded-xl bg-[#F6ECD9] ring-1 ring-inset ring-[#B8842E]/15">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized={shouldUnoptimizeProductImage(item.image)}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#B8842E]/50">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-[14px] font-semibold text-[#1E2421]">{item.name}</p>
                      <span className="mt-1 inline-block border-l-2 border-[#B8842E] pl-1.5 font-mono text-[11px] uppercase tracking-wide text-[#6B6459]">
                        {item.category ?? "Uncategorized"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-[#E6E1D3] bg-[#F6F4EE] px-3 py-1.5 font-mono text-[12px] text-[#1E2421]">
                        GHS {item.price.toFixed(2)} / unit
                      </span>
                      <div className="flex items-center gap-1 rounded-md border border-[#E6E1D3] bg-white px-1 py-1">
                        <button
                          type="button"
                          onClick={() => decreaseQty(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded text-[#1E2421] transition hover:bg-[#F6ECD9]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[22px] text-center font-mono text-[13px] font-medium text-[#1E2421]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQty(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded text-[#1E2421] transition hover:bg-[#F6ECD9]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right col */}
                  <div className="flex flex-col items-end justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-[12px] font-medium text-[#A6432E] transition hover:text-[#7E3122]"
                    >
                      Remove
                    </button>
                    <div className="text-right">
                      <p className="font-mono text-[10px] uppercase tracking-wide text-[#6B6459]">Line total</p>
                      <p className="mt-0.5 font-mono text-[16px] font-semibold text-[#1E2421]">
                        GHS {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">

              {/* Order summary — styled like a pharmacy receipt */}
              <div className="relative">
                <div className="pointer-events-none absolute -top-2 left-0 right-0 flex justify-between px-3">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className="h-4 w-4 rounded-full bg-[#F6F4EE]" />
                  ))}
                </div>
                <div className="rounded-2xl border border-[#E6E1D3] bg-white p-6 pt-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#B8842E]">
                    Order summary
                  </p>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between text-[13px] text-[#6B6459]">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#1E2421]">GHS {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px] text-[#6B6459]">
                      <span>Delivery</span>
                      <span className="rounded-md bg-[#F6ECD9] px-2 py-0.5 font-mono text-[11px] font-medium text-[#8C6420]">
                        Free
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[13px] text-[#6B6459]">
                      <span>Taxes</span>
                      <span className="font-mono text-[#1E2421]">GHS 0.00</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-dashed border-[#D8D2C0] pt-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6459]">Total due</span>
                    <span className="font-mono text-[19px] font-semibold text-[#1E2421]">
                      GHS {subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Decorative barcode footer */}
                  <div className="mt-6 flex h-6 items-end gap-[2px] opacity-70">
                    {BARCODE_WIDTHS.map((w, i) => (
                      <span
                        key={i}
                        className="bg-[#1E2421]"
                        style={{ width: `${w}px`, height: i % 5 === 0 ? "100%" : "70%" }}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#B0AA9C]">
                    Comfort Health · Order pending
                  </p>
                </div>
              </div>

              {/* Pay button */}
              <PaystackCheckout
                items={cart}
                amount={subtotal}
                buttonLabel="Pay with Paystack"
                buttonClassName="w-full flex items-center justify-center gap-2 rounded-lg bg-[#123A31] px-5 py-3.5 text-[14px] font-medium text-white transition hover:bg-[#0D2B25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8842E]"
                buttonIcon={<Lock className="h-4 w-4" />}
              />

              {/* Clear cart */}
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  pushToast({
                    title: "Basket cleared",
                    description: "All items have been removed from your basket.",
                    variant: "info",
                  });
                }}
                className="w-full rounded-lg border border-[#E6E1D3] bg-white px-5 py-3 text-[13px] font-medium text-[#1E2421] transition hover:bg-[#F6F4EE]"
              >
                Clear basket
              </button>

              {/* Secure badge — stamp-style */}
              <div className="flex items-start gap-3 rounded-2xl bg-[#123A31] p-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-white/40 text-white">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-medium text-white">Secure checkout</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/70">
                    Paystack encrypts and processes your payment. Comfort Health never stores your card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}