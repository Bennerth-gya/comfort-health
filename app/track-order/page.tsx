"use client";

import { useState } from "react";
import { Search, Package, CheckCircle2, Truck, Clock, XCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "ASSIGNED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";

type TrackedOrder = {
  reference: string;
  customerName: string;
  maskedPhone: string | null;
  amount: number;
  currency: string;
  paymentMethod: string;
  fulfillmentStatus: OrderStatus;
  statusLabel: string;
  validationStatus: string;
  estimatedTime: number | null;
  createdAt: string;
  deliveredAt: string | null;
  statusHistory: Array<{ status: string; label: string; note: string | null; createdAt: string }>;
  items: Array<{ name: string; quantity: number; unitPrice: number; lineTotal: number; imageUrl: string | null }>;
};

const STATUS_STEPS: OrderStatus[] = ["PENDING", "CONFIRMED", "PREPARING", "ASSIGNED", "OUT_FOR_DELIVERY", "DELIVERED"];

function statusIndex(s: OrderStatus) {
  const idx = STATUS_STEPS.indexOf(s);
  return idx === -1 ? 0 : idx;
}

function StatusIcon({ status }: { status: OrderStatus }) {
  if (status === "DELIVERED") return <CheckCircle2 className="h-5 w-5 text-[#15803d]" />;
  if (status === "CANCELLED") return <XCircle className="h-5 w-5 text-red-500" />;
  if (status === "OUT_FOR_DELIVERY") return <Truck className="h-5 w-5 text-[#15803d]" />;
  return <Clock className="h-5 w-5 text-amber-500" />;
}

function StatusBadge({ status, label }: { status: OrderStatus; label: string }) {
  const colors: Record<string, string> = {
    DELIVERED: "bg-[#dcfce7] text-[#14532d]",
    CANCELLED: "bg-red-50 text-red-700",
    OUT_FOR_DELIVERY: "bg-blue-50 text-blue-700",
    CONFIRMED: "bg-[#dcfce7] text-[#14532d]",
    PREPARING: "bg-amber-50 text-amber-700",
    ASSIGNED: "bg-blue-50 text-blue-700",
    PENDING: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${colors[status] ?? "bg-gray-100 text-gray-700"}`}>
      <StatusIcon status={status} />
      {label}
    </span>
  );
}

export default function TrackOrderPage() {
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "error">("idle");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimRef = ref.trim();
    if (!trimRef) return;

    setStatus("loading");
    setErrorMsg("");
    setOrder(null);

    try {
      const params = new URLSearchParams({ ref: trimRef });
      if (phone.trim()) params.set("phone", phone.trim());

      const res = await fetch(`/api/orders/track?${params.toString()}`);
      const data = await res.json() as { order?: TrackedOrder; error?: string };

      if (!res.ok || !data.order) {
        setErrorMsg(data.error ?? "Order not found.");
        setStatus("error");
        return;
      }

      setOrder(data.order);
      setStatus("found");
    } catch {
      setErrorMsg("Unable to connect. Please check your internet and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f2318]">
            <Package className="h-7 w-7 text-[#4ade80]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0f2318] md:text-3xl">Track Your Order</h1>
          <p className="mt-2 text-sm leading-[1.6] text-gray-500">
            Enter your order reference number to see the current status.
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleTrack} className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm md:p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="track-ref" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Order Reference *
              </label>
              <input
                id="track-ref"
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="e.g. ABC12345"
                maxLength={32}
                required
                className="w-full rounded-xl border border-gray-200 bg-[#f8faf8] px-4 py-3 text-[16px] text-[#0f2318] placeholder:text-gray-400 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/10 transition"
              />
              <p className="mt-1 text-xs text-gray-400">Found in your order confirmation message or WhatsApp notification</p>
            </div>
            <div>
              <label htmlFor="track-phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Phone Number <span className="normal-case font-normal text-gray-400">(optional — for extra security)</span>
              </label>
              <input
                id="track-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Last 4 digits or full number"
                maxLength={15}
                className="w-full rounded-xl border border-gray-200 bg-[#f8faf8] px-4 py-3 text-[16px] text-[#0f2318] placeholder:text-gray-400 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/10 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || !ref.trim()}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803d] py-3.5 text-sm font-bold text-white transition hover:bg-[#166534] active:scale-[0.98] disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {status === "loading" ? "Searching..." : "Track Order"}
          </button>
        </form>

        {/* Error */}
        {status === "error" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Order result */}
        {status === "found" && order && (
          <div className="mt-6 space-y-4">
            {/* Status card */}
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Order</p>
                  <p className="mt-0.5 text-lg font-bold text-[#0f2318]">#{order.reference}</p>
                  {order.customerName && (
                    <p className="text-sm text-gray-500">{order.customerName}</p>
                  )}
                </div>
                <StatusBadge status={order.fulfillmentStatus} label={order.statusLabel} />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500">
                <span>Total: <strong className="text-[#0f2318]">{order.currency} {order.amount.toFixed(2)}</strong></span>
                <span>{order.paymentMethod === "PAY_ON_DELIVERY" ? "Pay on Delivery" : order.paymentMethod}</span>
              </div>

              {/* Progress bar */}
              {order.fulfillmentStatus !== "CANCELLED" && (
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    {STATUS_STEPS.map((step, i) => {
                      const current = statusIndex(order.fulfillmentStatus);
                      const done = i <= current;
                      const labels = ["Received", "Confirmed", "Preparing", "Assigned", "On the way", "Delivered"];
                      return (
                        <div key={step} className="relative flex flex-1 flex-col items-center">
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`absolute left-1/2 top-2.5 h-0.5 w-full transition-all ${done && i < current ? "bg-[#15803d]" : "bg-gray-200"}`} aria-hidden="true" />
                          )}
                          <div className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${done ? "border-[#15803d] bg-[#15803d]" : "border-gray-300 bg-white"}`}>
                            {done && <CheckCircle2 className="h-3 w-3 text-white" />}
                          </div>
                          <span className="mt-1.5 text-center text-[9px] font-medium leading-tight text-gray-500 max-w-[40px]">{labels[i]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Status history toggle */}
              {order.statusHistory.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex w-full items-center justify-between text-sm font-semibold text-[#15803d]"
                  >
                    Status history
                    {showHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {showHistory && (
                    <div className="mt-3 space-y-3">
                      {order.statusHistory.map((h, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <div className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-[#15803d]" />
                          <div>
                            <p className="font-semibold text-[#0f2318]">{h.label}</p>
                            {h.note && <p className="text-gray-500">{h.note}</p>}
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(h.createdAt).toLocaleString("en-GH")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Items */}
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-bold text-[#0f2318]">Items ordered</h2>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.imageUrl && (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#f0fdf4]">
                        <Image src={item.imageUrl} alt={item.name} fill sizes="40px" className="object-cover" unoptimized />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#0f2318]">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#0f2318]">{order.currency} {item.lineTotal.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Help CTA */}
            <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-4 text-center">
              <p className="text-sm text-[#0f2318]">Questions about your order?</p>
              <Link
                href="/support"
                className="mt-2 inline-flex h-9 items-center gap-1.5 rounded-full bg-[#15803d] px-4 text-sm font-semibold text-white"
              >
                Contact Support
              </Link>
            </div>
          </div>
        )}

        {/* Tip for order placed via WhatsApp notification */}
        {status === "idle" && (
          <p className="mt-4 text-center text-xs text-gray-400">
            Your order reference was included in the WhatsApp or SMS confirmation you received after placing your order.
          </p>
        )}
      </div>
    </div>
  );
}
