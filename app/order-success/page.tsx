"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/app/context/cartContext";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") ?? "";
  const { getOrderByReference } = useCart();
  const order = reference ? getOrderByReference(reference) : undefined;

  return (
    <div className="min-h-screen bg-[#f8faf8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-4xl border border-gray-200 bg-white px-6 py-10 shadow-sm sm:px-10">
        <div className="flex flex-col gap-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-950">Payment confirmed</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Thank you for your purchase. Your payment has been verified and your order is now confirmed.
          </p>
        </div>

        {order ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-gray-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-800">Order reference</p>
                <p className="mt-3 break-all text-lg font-medium text-slate-900">{order.reference}</p>
                <p className="mt-4 text-sm text-slate-600">Paid with Paystack and verified successfully.</p>
              </div>

              <div className="rounded-[28px] border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
                <div className="mt-5 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm">
                      <div className="h-16 w-16 overflow-hidden rounded-3xl bg-slate-100">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                        <p className="mt-1 text-sm text-slate-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right text-sm text-slate-900">
                        GHS {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3 text-slate-900">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-semibold">Paid amount</span>
              </div>
              <p className="mt-4 text-4xl font-semibold text-slate-950">GHS {order.amount.toFixed(2)}</p>
              <p className="mt-3 text-sm text-slate-600">Receipt was sent to {order.email}</p>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-[28px] border border-gray-200 bg-slate-50 p-8 text-center">
            <p className="text-sm text-slate-600">
              We couldn't find the order details for that reference. Please visit your orders page or try again.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to shop
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View cart
          </Link>
        </div>
      </div>
    </div>
  );
}
