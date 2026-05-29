import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import {
  finalizeVerifiedPayment,
  getOrder,
  isPaidOrderStatus,
  PaymentFlowError,
  type PublicOrder,
  verifyReceiptToken,
} from "@/lib/payments";
import ClearCartOnPaid from "./ClearCartOnPaid";

export const dynamic = "force-dynamic";

type OrderSuccessPageProps = {
  searchParams: Promise<{
    reference?: string | string[];
    receipt?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

async function resolveOrder(reference: string, receiptToken: string | undefined) {
  if (!verifyReceiptToken(reference, receiptToken)) {
    return {
      order: null,
      error: "For privacy, order details can only be viewed from the secure receipt link sent after checkout.",
    };
  }

  const existing = await getOrder(reference);
  if (isPaidOrderStatus(existing?.status)) {
    return { order: existing, error: null };
  }

  try {
    return {
      order: await finalizeVerifiedPayment(reference),
      error: null,
    };
  } catch (error) {
    const fallback = await getOrder(reference);
    const message =
      error instanceof PaymentFlowError || error instanceof Error
        ? error.message
        : "We could not verify this payment yet.";

    return {
      order: fallback,
      error: message,
    };
  }
}

function paymentStatusCopy(order: PublicOrder) {
  if (order.status === "paid_fulfillment_review") {
    return {
      heading: "Payment received",
      body: "Your payment was verified. We are reviewing stock for one or more items and will contact you before fulfillment.",
      note: "Paid with Paystack. Fulfillment needs review.",
    };
  }

  return {
    heading: "Payment confirmed",
    body: "Thank you for your purchase. Your payment has been verified and your order is now confirmed.",
    note: "Paid with Paystack and verified successfully.",
  };
}

function OrderSummary({ order }: { order: PublicOrder }) {
  const copy = paymentStatusCopy(order);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="rounded-[28px] border border-gray-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-800">Order reference</p>
          <p className="mt-3 break-all text-lg font-medium text-slate-900">{order.reference}</p>
          <p className="mt-4 text-sm text-slate-600">{copy.note}</p>
        </div>

        <div className="rounded-[28px] border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
          <div className="mt-5 space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm">
                <div className="relative h-16 w-16 overflow-hidden rounded-3xl bg-slate-100">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right text-sm text-slate-900">
                  GHS {item.lineTotal.toFixed(2)}
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
        <p className="mt-4 text-4xl font-semibold text-slate-950">
          GHS {order.amount.toFixed(2)}
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Confirmation for {order.email}. A receipt email is sent when email delivery is configured;
          otherwise save this page or your Paystack receipt.
        </p>
      </div>
    </div>
  );
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const query = await searchParams;
  const reference = firstParam(query.reference);
  const receiptToken = firstParam(query.receipt);
  const result = reference
    ? await resolveOrder(reference, receiptToken)
    : { order: null, error: "Missing order reference." };
  const isPaid = isPaidOrderStatus(result.order?.status);
  const copy = result.order ? paymentStatusCopy(result.order) : null;

  return (
    <div className="min-h-screen bg-[#f8faf8] px-4 py-10 sm:px-6 lg:px-8">
      {isPaid ? <ClearCartOnPaid /> : null}

      <div className="mx-auto max-w-5xl rounded-4xl border border-gray-200 bg-white px-6 py-10 shadow-sm sm:px-10">
        <div className="flex flex-col gap-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-950">
            {isPaid && copy ? copy.heading : "Payment verification pending"}
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {isPaid && copy
              ? copy.body
              : result.error ?? "We could not verify this payment yet."}
          </p>
        </div>

        {isPaid && result.order ? (
          <OrderSummary order={result.order} />
        ) : (
          <div className="mt-10 rounded-[28px] border border-gray-200 bg-slate-50 p-8 text-center">
            <p className="text-sm text-slate-600">
              {result.error ??
                "We could not find the order details for that reference. Please contact support or try again."}
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
