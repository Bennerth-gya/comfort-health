"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Phone,
  Clock,
  MapPin,
  ShoppingBag,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export interface OrderSuccessResult {
  orderId: string;
  orderRef: string;
  total: number;
  estimatedTime: string;
}

export interface OrderSuccessForm {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

interface OrderSuccessScreenProps {
  orderResult: OrderSuccessResult;
  form: OrderSuccessForm;
}

export default function OrderSuccessScreen({ orderResult, form }: OrderSuccessScreenProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Animate the steps in one by one
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const firstName = form.customerName.split(" ")[0] ?? form.customerName;

  return (
    <div className="min-h-screen bg-[#f8faf8] flex flex-col">

      {/* Top section — dark green success header */}
      <div className="bg-[#0f2318] pt-16 pb-10 px-6 flex flex-col items-center">

        {/* Animated checkmark */}
        <div
          className="transition-all duration-500"
          style={{
            transform: step >= 1 ? "scale(1)" : "scale(0.5)",
            opacity: step >= 1 ? 1 : 0,
          }}
        >
          <div className="relative">
            {/* Outer pulse ring */}
            <div className="absolute inset-0 rounded-full bg-[#4ade80]/20 animate-ping" />
            {/* Inner circle */}
            <div className="w-20 h-20 bg-[#15803d] rounded-full flex items-center justify-center relative">
              <CheckCircle size={40} color="white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Order confirmed text */}
        <div
          className="mt-5 text-center transition-all duration-500"
          style={{
            transform: step >= 1 ? "translateY(0)" : "translateY(16px)",
            opacity: step >= 1 ? 1 : 0,
            transitionDelay: "200ms",
          }}
        >
          <h1 className="text-white text-[22px] font-bold leading-tight">
            Order Placed! 🎉
          </h1>
          <p className="text-[#4ade80] text-[14px] mt-1 font-medium">
            Order #{orderResult.orderRef}
          </p>
        </div>

        {/* Thank you message */}
        <div
          className="mt-3 text-center transition-all duration-500"
          style={{
            transform: step >= 1 ? "translateY(0)" : "translateY(16px)",
            opacity: step >= 1 ? 1 : 0,
            transitionDelay: "300ms",
          }}
        >
          <p className="text-[#86efac] text-[13px] leading-relaxed max-w-xs">
            Thank you {firstName}! Your order has been received and is being processed.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-5 flex flex-col gap-4 max-w-lg mx-auto w-full pb-8">

        {/* WHAT HAPPENS NEXT */}
        <div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500"
          style={{
            transform: step >= 2 ? "translateY(0)" : "translateY(16px)",
            opacity: step >= 2 ? 1 : 0,
            transitionDelay: "300ms",
          }}
        >
          <div className="px-4 py-3 bg-[#f0fdf4] border-b border-[#e0f2e9]">
            <p className="font-bold text-[#0f2318] text-[14px]">What happens next</p>
          </div>

          <div className="px-4 py-4">
            {/* Step 1 — Call */}
            <div className="flex gap-3 mb-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#15803d] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={14} color="white" />
                </div>
                <div className="w-0.5 h-6 bg-[#bbf7d0] mt-1" />
              </div>
              <div className="pb-4">
                <p className="font-bold text-[#0f2318] text-[13px] leading-tight">
                  We will call you to confirm
                </p>
                <p className="text-gray-500 text-[12px] mt-0.5 leading-relaxed">
                  Our pharmacist will call{" "}
                  <span className="font-bold text-[#0f2318]">{form.customerPhone}</span>{" "}
                  shortly to verify your order before we dispatch it.
                </p>
              </div>
            </div>

            {/* Step 2 — Prepare */}
            <div className="flex gap-3 mb-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#15803d] rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={14} color="white" />
                </div>
                <div className="w-0.5 h-6 bg-[#bbf7d0] mt-1" />
              </div>
              <div className="pb-4">
                <p className="font-bold text-[#0f2318] text-[13px] leading-tight">
                  We prepare your order
                </p>
                <p className="text-gray-500 text-[12px] mt-0.5 leading-relaxed">
                  Once confirmed, our pharmacist carefully packs your medications for delivery.
                </p>
              </div>
            </div>

            {/* Step 3 — Deliver */}
            <div className="flex gap-3 mb-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#15803d] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={14} color="white" />
                </div>
                <div className="w-0.5 h-6 bg-[#bbf7d0] mt-1" />
              </div>
              <div className="pb-4">
                <p className="font-bold text-[#0f2318] text-[13px] leading-tight">
                  Delivered in {orderResult.estimatedTime}
                </p>
                <p className="text-gray-500 text-[12px] mt-0.5 leading-relaxed">
                  Your order is delivered discreetly to your location.
                </p>
              </div>
            </div>

            {/* Step 4 — Pay */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#15803d] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} color="white" />
                </div>
              </div>
              <div>
                <p className="font-bold text-[#0f2318] text-[13px] leading-tight">Pay on arrival</p>
                <p className="text-gray-500 text-[12px] mt-0.5 leading-relaxed">
                  Pay{" "}
                  <span className="font-bold text-[#15803d]">
                    GHS {orderResult.total.toFixed(2)}
                  </span>{" "}
                  in cash when your order arrives at{" "}
                  <span className="font-semibold text-[#0f2318]">{form.customerAddress}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Keep phone nearby alert */}
        <div
          className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl px-4 py-4 transition-all duration-500"
          style={{
            transform: step >= 2 ? "translateY(0)" : "translateY(16px)",
            opacity: step >= 2 ? 1 : 0,
            transitionDelay: "500ms",
          }}
        >
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 bg-[#fbbf24] rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone size={16} color="white" />
            </div>
            <div>
              <p className="font-bold text-[#78350f] text-[13px] leading-tight mb-1">
                Keep your phone nearby
              </p>
              <p className="text-[#92400e] text-[12px] leading-relaxed">
                We will call{" "}
                <span className="font-extrabold">{form.customerPhone}</span>{" "}
                within the next few minutes to confirm your order. Please pick up so we can
                dispatch your medications quickly.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp confirmation notice */}
        <div
          className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl px-4 py-3 transition-all duration-500"
          style={{
            transform: step >= 3 ? "translateY(0)" : "translateY(16px)",
            opacity: step >= 3 ? 1 : 0,
            transitionDelay: "600ms",
          }}
        >
          <div className="flex items-center gap-3">
            <MessageCircle size={18} color="#15803d" />
            <p className="text-[12px] text-[#166534] leading-relaxed">
              A WhatsApp confirmation has been sent to your number with your order details.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="flex flex-col gap-3 mt-2 transition-all duration-500"
          style={{
            transform: step >= 3 ? "translateY(0)" : "translateY(16px)",
            opacity: step >= 3 ? 1 : 0,
            transitionDelay: "700ms",
          }}
        >
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 bg-[#15803d] text-white rounded-2xl py-4 text-[15px] font-bold active:scale-[0.98] transition-all shadow-lg shadow-green-900/20"
          >
            Continue shopping
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="w-full flex items-center justify-center gap-2 bg-white text-[#0f2318] rounded-2xl py-3.5 text-[14px] font-semibold border border-gray-200 active:scale-[0.98] transition-all"
          >
            <ShoppingBag size={16} />
            View my orders
          </button>
        </div>
      </div>
    </div>
  );
}
