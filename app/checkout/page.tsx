"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Phone,
  MapPin,
  User,
  ChevronRight,
  ArrowLeft,
  Loader2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import OrderSuccessScreen, { type OrderSuccessResult } from "@/components/OrderSuccessScreen";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    deliveryNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [orderResult, setOrderResult] = useState<OrderSuccessResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.customerName.trim() || form.customerName.trim().length < 2) {
      newErrors.customerName = "Please enter your full name";
    }

    if (!form.customerPhone.trim()) {
      newErrors.customerPhone = "Please enter your phone number";
    } else {
      const phoneRegex = /^(\+233|233|0)[2-9][0-9]{8}$/;
      if (!phoneRegex.test(form.customerPhone.replace(/\s/g, ""))) {
        newErrors.customerPhone = "Enter a valid Ghana number (e.g. 0244123456)";
      }
    }

    if (!form.customerAddress.trim() || form.customerAddress.trim().length < 5) {
      newErrors.customerAddress = "Please enter your delivery address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    if (cart.length === 0) {
      setErrorMessage("Your cart is empty");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          customerPhone: form.customerPhone,
          customerAddress: form.customerAddress,
          deliveryNotes: form.deliveryNotes,
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          userId: null, // Add Stack Auth user ID here if available in the future
        }),
      });

      const data = (await res.json()) as { error?: string } & Partial<OrderSuccessResult>;

      if (!res.ok || !data.orderId || !data.orderRef || typeof data.total !== "number" || !data.estimatedTime) {
        setErrorMessage(data.error || "Failed to place order");
        setStatus("error");
        return;
      }

      setOrderResult({
        orderId: data.orderId,
        orderRef: data.orderRef,
        total: data.total,
        estimatedTime: data.estimatedTime,
      });
      setStatus("success");
      clearCart();
    } catch {
      setErrorMessage("No internet connection. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success" && orderResult) {
    return <OrderSuccessScreen orderResult={orderResult} form={form} />;
  }

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <div className="sticky top-0 z-40 bg-[#0f2318] px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={18} color="white" />
        </button>
        <h1 className="text-white font-bold text-[16px] flex-1">Complete your order</h1>
        <ShoppingBag size={20} color="#4ade80" />
      </div>

      <div className="px-4 py-5 flex flex-col gap-5 max-w-lg mx-auto pb-32">
        <div className="flex items-center gap-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl px-4 py-3">
          <div className="w-10 h-10 bg-[#15803d] rounded-xl flex items-center justify-center flex-shrink-0">
            <ShoppingBag size={18} color="white" />
          </div>
          <div>
            <p className="font-bold text-[#0f2318] text-[14px] leading-tight">Pay on Delivery</p>
            <p className="text-[#166534] text-[12px] leading-relaxed">
              No payment needed now. Pay cash when your order arrives.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-[#f8faf8]">
            <p className="font-bold text-[#0f2318] text-[14px]">Your details</p>
            <p className="text-gray-400 text-[12px] mt-0.5">
              We need these to confirm and deliver your order
            </p>
          </div>

          <div className="px-4 py-4 flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Full name *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User size={16} color="#9ca3af" />
                </div>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => updateField("customerName", e.target.value)}
                  placeholder="e.g. Kwame Mensah"
                  maxLength={60}
                  style={{ fontSize: "16px" }}
                  className={`
                    w-full pl-9 pr-4 py-3 rounded-xl border text-[#0f2318]
                    placeholder:text-gray-400 bg-[#f8faf8]
                    outline-none transition-all
                    ${
                      errors.customerName
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-gray-200 focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/10"
                    }
                  `}
                />
              </div>
              {errors.customerName && (
                <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  {errors.customerName}
                </p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Phone number *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Phone size={16} color="#9ca3af" />
                </div>
                <input
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) => updateField("customerPhone", e.target.value)}
                  placeholder="e.g. 0244123456"
                  maxLength={15}
                  style={{ fontSize: "16px" }}
                  className={`
                    w-full pl-9 pr-4 py-3 rounded-xl border text-[#0f2318]
                    placeholder:text-gray-400 bg-[#f8faf8]
                    outline-none transition-all
                    ${
                      errors.customerPhone
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-gray-200 focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/10"
                    }
                  `}
                />
              </div>
              <p className="text-[11px] text-[#15803d] mt-1 font-medium flex items-center gap-1">
                <Phone size={10} />
                We will call this number to confirm your order before dispatching
              </p>
              {errors.customerPhone && (
                <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                  <AlertCircle size={11} />
                  {errors.customerPhone}
                </p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Delivery address *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3.5">
                  <MapPin size={16} color="#9ca3af" />
                </div>
                <textarea
                  value={form.customerAddress}
                  onChange={(e) => updateField("customerAddress", e.target.value)}
                  placeholder="e.g. UMaT Campus, Block C, Room 12, Tarkwa"
                  rows={2}
                  maxLength={200}
                  style={{ fontSize: "16px" }}
                  className={`
                    w-full pl-9 pr-4 py-3 rounded-xl border text-[#0f2318]
                    placeholder:text-gray-400 bg-[#f8faf8] resize-none
                    outline-none transition-all
                    ${
                      errors.customerAddress
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-gray-200 focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/10"
                    }
                  `}
                />
              </div>
              {errors.customerAddress && (
                <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  {errors.customerAddress}
                </p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Additional notes
                <span className="normal-case font-normal ml-1 text-gray-400">(optional)</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3.5">
                  <FileText size={16} color="#9ca3af" />
                </div>
                <textarea
                  value={form.deliveryNotes}
                  onChange={(e) => updateField("deliveryNotes", e.target.value)}
                  placeholder="e.g. Call me when you arrive, I am in the library..."
                  rows={2}
                  maxLength={300}
                  style={{ fontSize: "16px" }}
                  className="
                    w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200
                    text-[#0f2318] placeholder:text-gray-400 bg-[#f8faf8]
                    resize-none outline-none focus:border-[#15803d]
                    focus:ring-2 focus:ring-[#15803d]/10 transition-all
                  "
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-[#f8faf8]">
            <p className="font-bold text-[#0f2318] text-[14px]">Order summary</p>
          </div>
          <div className="px-4 py-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-[13px] font-semibold text-[#0f2318]">{item.name}</p>
                  <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="text-[13px] font-bold text-[#15803d]">
                  GHS {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="flex justify-between items-center py-2 mt-1">
              <p className="text-[13px] text-gray-500">Delivery fee</p>
              <p className="text-[13px] font-semibold text-[#15803d]">Free</p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-1">
              <p className="text-[15px] font-bold text-[#0f2318]">Total</p>
              <p className="text-[18px] font-extrabold text-[#15803d]">GHS {subtotal.toFixed(2)}</p>
            </div>

            <p className="text-[11px] text-gray-400 text-center mt-2">
              Pay this amount in cash when your order arrives
            </p>
          </div>
        </div>

        {status === "error" && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
            <AlertCircle size={16} color="#ef4444" className="flex-shrink-0 mt-0.5" />
            <p className="text-red-600 text-[13px] leading-relaxed">{errorMessage}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 pb-safe">
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={status === "loading" || cart.length === 0}
          className="
            w-full flex items-center justify-center gap-2
            bg-[#15803d] hover:bg-[#166534]
            active:scale-[0.98] active:bg-[#14532d]
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-100
            rounded-2xl py-4 text-white
            text-[16px] font-extrabold shadow-lg shadow-green-900/20
          "
        >
          {status === "loading" ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Placing your order...
            </>
          ) : (
            <>
              Place Order — GHS {subtotal.toFixed(2)}
              <ChevronRight size={20} />
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-2">
          By placing this order you agree to our terms of service
        </p>
      </div>
    </div>
  );
}
