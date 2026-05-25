"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import PaystackCheckout from "@/app/components/PaystackCheckout";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    saveOrder,
  } = useCart();
  const router = useRouter();
  const { pushToast } = useToast();

  const handlePaymentSuccess = (reference: string, email: string) => {
    saveOrder({
      reference,
      email,
      amount: subtotal,
      currency: "GHS",
      items: cart,
      createdAt: new Date().toISOString(),
      status: "success",
    });

    clearCart();
    pushToast({
      title: "Order confirmed",
      description: "Your order has been saved successfully.",
      variant: "success",
    });
    router.push(`/order-success?reference=${encodeURIComponent(reference)}`);
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-4xl border border-gray-200 bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Your cart</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Ready for checkout</h1>
            <p className="mt-2 text-sm text-slate-600">
              {cartCount} item{cartCount === 1 ? "" : "s"} in your cart.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" /> Continue shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-4xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">Your cart is empty</h2>
            <p className="mt-3 text-sm text-slate-600">Browse our products and add items to your cart to begin checkout.</p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[1.7fr_0.9fr]">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 rounded-[28px] border border-gray-200 bg-white p-5 sm:grid-cols-[120px_1fr_auto]"
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-3xl bg-gray-100">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400">No image</div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.category ?? "Uncategorized"}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-3xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                        Unit price: GHS {item.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-2 py-2">
                        <button
                          type="button"
                          onClick={() => decreaseQty(item.id)}
                          className="h-9 w-9 rounded-full text-slate-600 transition hover:bg-slate-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQty(item.id)}
                          className="h-9 w-9 rounded-full text-slate-600 transition hover:bg-slate-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-between gap-3 text-right sm:items-end">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Remove
                    </button>
                    <div>
                      <p className="text-sm text-slate-500">Line total</p>
                      <p className="mt-1 text-lg font-semibold text-slate-950">
                        GHS {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Order summary</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>GHS {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Delivery</span>
                    <span>GHS 0.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Taxes</span>
                    <span>GHS 0.00</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-lg font-semibold text-slate-950">
                  <span>Total</span>
                  <span>GHS {subtotal.toFixed(2)}</span>
                </div>
              </div>

              <PaystackCheckout
                items={cart}
                amount={subtotal}
                onSuccess={handlePaymentSuccess}
                buttonLabel="Pay with Paystack"
              />

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
                className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Clear cart
              </button>

              <div className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">
                <p className="font-semibold">Secure checkout</p>
                <p className="mt-2 text-slate-700">Paystack handles your payment securely and confidently.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
