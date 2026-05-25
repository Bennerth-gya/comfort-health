"use client";

import { useState } from "react";
import { useToast } from "@/app/context/toastContext";
import type { CartItem } from "@/app/context/cartContext";

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

function loadPaystackSdk() {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Paystack can only be loaded in the browser."));
      return;
    }

    if ((window as any).PaystackPop) {
      resolve();
      return;
    }

    const existing = document.querySelector(
      'script[src="https://js.paystack.co/v1/inline.js"]'
    );

    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Paystack SDK."))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack SDK."));
    document.body.appendChild(script);
  });
}

export type PaystackCheckoutProps = {
  items: CartItem[];
  amount: number;
  onSuccess: (reference: string, email: string) => void;
  buttonLabel?: string;
};

export default function PaystackCheckout({
  items,
  amount,
  onSuccess,
  buttonLabel = "Checkout with Paystack",
}: PaystackCheckoutProps) {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { pushToast } = useToast();

  const formattedItems = items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  const handleCheckout = async () => {
    if (!PAYSTACK_PUBLIC_KEY) {
      setErrorMessage("Missing Paystack public key. Set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address to continue.");
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
      await loadPaystackSdk();

      const reference = `comfi_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
      const initializeResponse = await fetch("/api/paystack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          reference,
          items: formattedItems,
        }),
      });

      const initializeData = await initializeResponse.json();
      if (!initializeResponse.ok) {
        throw new Error(initializeData.error || "Unable to initialize payment.");
      }

      const paystackReference = initializeData.data?.reference || reference;

      if (!(window as any).PaystackPop) {
        throw new Error("Paystack SDK did not load correctly.");
      }

      const handler = (window as any).PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: Math.round(amount * 100),
        currency: "GHS",
        reference: paystackReference,
        metadata: {
          items: formattedItems,
          source: "Comfi Health",
        },
        callback: (response: { reference: string }) => {
          setStatusMessage("Verifying payment...");

          // Use an async IIFE to handle async operations
          (async () => {
            try {
              const verifyResponse = await fetch(
                `/api/paystack/verify?reference=${encodeURIComponent(
                  response.reference
                )}`
              );
              const verifyData = await verifyResponse.json();

              if (
                !verifyResponse.ok ||
                verifyData?.status !== true ||
                verifyData?.data?.status !== "success"
              ) {
                throw new Error(
                  verifyData?.message || "Payment could not be verified."
                );
              }

              pushToast({
                title: "Payment completed",
                description: "Your order has been confirmed.",
                variant: "success",
              });

              onSuccess(response.reference, email.trim());
            } catch (verifyError) {
              const message = verifyError instanceof Error
                ? verifyError.message
                : "Unable to verify payment.";
              setErrorMessage(message);
              pushToast({
                title: "Payment verification failed",
                description: message,
                variant: "error",
              });
            } finally {
              setIsLoading(false);
              setStatusMessage(null);
            }
          })();
        },
        onClose: () => {
          setErrorMessage("Payment was cancelled. You can try again.");
          setStatusMessage(null);
          setIsLoading(false);
          pushToast({
            title: "Payment cancelled",
            description: "Your checkout was cancelled.",
            variant: "info",
          });
        },
      });

      handler.openIframe();
      setStatusMessage("Opening Paystack checkout...");
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

      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
      >
        {isLoading ? "Processing payment..." : buttonLabel}
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

      {!PAYSTACK_PUBLIC_KEY && (
        <div className="rounded-3xl bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
          Missing <code className="font-mono">NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY</code> environment variable.
        </div>
      )}
    </div>
  );
}
