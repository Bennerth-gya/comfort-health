"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useToast } from "@/app/context/toastContext";
import type { CartItem } from "@/app/context/cartContext";

export type PaystackCheckoutProps = {
  items: CartItem[];
  amount: number;
  onSuccess?: (reference: string, email: string) => void;
  buttonLabel?: string;
  buttonClassName?: string;
  buttonIcon?: ReactNode;
};

type CheckoutResponse = {
  order?: {
    reference: string;
    amount: number;
    currency: string;
  };
  data?: {
    authorization_url?: string;
  };
  error?: string;
};

function makeIdempotencyKey() {
  return globalThis.crypto?.randomUUID?.() ?? `checkout_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

const defaultButtonClassName =
  "inline-flex w-full items-center justify-center rounded-3xl bg-emerald-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300";

export default function PaystackCheckout({
  items,
  amount,
  buttonLabel = "Checkout with Paystack",
  buttonClassName = defaultButtonClassName,
  buttonIcon,
}: PaystackCheckoutProps) {
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { pushToast } = useToast();

  const checkoutItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    [items],
  );
  const idempotencyRef = useRef<{ signature: string; key: string } | null>(null);

  const getIdempotencyKey = () => {
    const signature = JSON.stringify({
      email: email.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      items: checkoutItems,
    });

    if (idempotencyRef.current?.signature !== signature) {
      idempotencyRef.current = {
        signature,
        key: makeIdempotencyKey(),
      };
    }

    return idempotencyRef.current.key;
  };

  const handleCheckout = async () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email address to continue.");
      return;
    }

    if (!customerPhone.trim()) {
      setErrorMessage("Please enter your WhatsApp number so we can update you on your order.");
      return;
    }

    if (!customerAddress.trim()) {
      setErrorMessage("Please enter your delivery address (hostel, room, hall).");
      return;
    }

    if (amount <= 0 || items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setErrorMessage(null);
    setStatusMessage("Preparing secure payment...");
    setIsLoading(true);

    try {
      const initializeResponse = await fetch("/api/paystack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          customerName: customerName.trim() || undefined,
          customerPhone: customerPhone.trim(),
          customerAddress: customerAddress.trim(),
          idempotencyKey: getIdempotencyKey(),
          items: checkoutItems,
        }),
      });

      const initializeData = (await initializeResponse.json()) as CheckoutResponse;
      if (!initializeResponse.ok) {
        throw new Error(initializeData.error || "Unable to initialize payment.");
      }

      if (!initializeData.data?.authorization_url || !initializeData.order?.reference) {
        throw new Error("Paystack did not return a payment link.");
      }

      setStatusMessage("Redirecting to Paystack checkout...");
      window.location.assign(initializeData.data.authorization_url);
    } catch (checkoutError) {
      const message = checkoutError instanceof Error
        ? checkoutError.message
        : "Unable to start payment.";
      setErrorMessage(message);
      setStatusMessage(null);
      setIsLoading(false);
      pushToast({
        title: "Payment error",
        description: message,
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-4 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="checkout-email" className="block text-sm font-semibold text-gray-900">
          Email for receipt
        </label>
        <input
          id="checkout-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-3 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
        />
      </div>

      <div>
        <label htmlFor="checkout-name" className="block text-sm font-semibold text-gray-900">
          Full name <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          id="checkout-name"
          type="text"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          placeholder="e.g. Kofi Mensah"
          className="mt-3 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
        />
      </div>

      <div>
        <label htmlFor="checkout-phone" className="block text-sm font-semibold text-gray-900">
          WhatsApp number <span className="text-red-500">*</span>
        </label>
        <p className="mt-1 text-xs text-gray-500">
          We'll send order updates to this number
        </p>
        <input
          id="checkout-phone"
          type="tel"
          value={customerPhone}
          onChange={(event) => setCustomerPhone(event.target.value)}
          placeholder="e.g. 0244 123 456"
          required
          className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
        />
      </div>

      <div>
        <label htmlFor="checkout-address" className="block text-sm font-semibold text-gray-900">
          Delivery address <span className="text-red-500">*</span>
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Hostel name, room number, hall, or building
        </p>
        <input
          id="checkout-address"
          type="text"
          value={customerAddress}
          onChange={(event) => setCustomerAddress(event.target.value)}
          placeholder="e.g. Commonwealth Hall, Room 204"
          required
          className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:bg-white"
        />
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        className={`${buttonClassName} disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {isLoading ? (
          "Processing payment..."
        ) : (
          <>
            {buttonIcon}
            {buttonLabel}
          </>
        )}
      </button>

      {statusMessage && (
        <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {statusMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
