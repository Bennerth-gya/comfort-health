"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Lock, ShieldCheck } from "lucide-react";
import PaystackCheckout from "@/app/components/PaystackCheckout";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";

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
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-[20px] border border-gray-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Your cart</p>
            <h1 className="mt-1.5 flex items-center gap-2 text-[22px] font-medium text-slate-900">
              Ready for checkout
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
                {cartCount}
              </span>
            </h1>
            <p className="mt-1 text-[13px] text-slate-500">
              {cartCount} item{cartCount === 1 ? "" : "s"} in your cart
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-slate-50 px-4 py-2 text-[13px] font-medium text-slate-800 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Continue shopping
          </Link>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-gray-300 bg-white px-8 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <ShoppingCart className="h-7 w-7" />
            </div>
            <h2 className="text-[18px] font-medium text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-[13px] text-slate-500">
              Browse our products and add items to your cart to begin checkout.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-[13px] font-medium text-white transition hover:bg-emerald-700"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">

            {/* Cart items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 rounded-[18px] border border-gray-200 bg-white p-5 sm:grid-cols-[100px_1fr_auto]"
                >
                  {/* Image */}
                  <div className="relative h-[90px] w-full overflow-hidden rounded-[12px] bg-emerald-50">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized={shouldUnoptimizeProductImage(item.image)}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-emerald-300">
                        <ShoppingCart className="h-7 w-7" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-[14px] font-medium text-slate-900">{item.name}</p>
                      <p className="mt-0.5 text-[12px] text-slate-400">{item.category ?? "Uncategorized"}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-gray-200 bg-slate-50 px-3 py-1.5 text-[12px] text-slate-600">
                        Unit: GHS {item.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-slate-50 px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() => decreaseQty(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 transition hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[20px] text-center text-[13px] font-medium text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQty(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 transition hover:bg-white"
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
                      className="text-[12px] font-medium text-red-600 transition hover:text-red-700"
                    >
                      Remove
                    </button>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-400">Line total</p>
                      <p className="mt-0.5 text-[16px] font-medium text-slate-900">
                        GHS {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">

              {/* Order summary */}
              <div className="rounded-[20px] border border-gray-200 bg-white p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Order summary
                </p>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-[13px] text-slate-500">
                    <span>Subtotal</span>
                    <span className="text-slate-700">GHS {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px] text-slate-500">
                    <span>Delivery</span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                      Free
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[13px] text-slate-500">
                    <span>Taxes</span>
                    <span className="text-slate-700">GHS 0.00</span>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 text-[15px] font-medium text-slate-900">
                  <span>Total</span>
                  <span>GHS {subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Pay button */}
              <PaystackCheckout
                items={cart}
                amount={subtotal}
                buttonLabel="Pay with Paystack"
                buttonClassName="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3.5 text-[14px] font-medium text-white transition hover:bg-emerald-700"
                buttonIcon={<Lock className="h-4 w-4" />}
              />

              {/* Clear cart */}
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
                className="w-full rounded-full border border-gray-200 bg-slate-50 px-5 py-3 text-[13px] font-medium text-slate-800 transition hover:bg-slate-100"
              >
                Clear cart
              </button>

              {/* Secure badge */}
              <div className="rounded-[14px] bg-emerald-50 p-4">
                <p className="flex items-center gap-2 text-[13px] font-medium text-emerald-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  Secure checkout
                </p>
                <p className="mt-1.5 text-[12px] text-emerald-700">
                  Paystack handles your payment securely and confidently.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}