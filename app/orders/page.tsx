"use client";

import Image from "next/image";
import Link from "next/link";
import { ClipboardList, PackageCheck } from "lucide-react";
import { useCart, type OrderRecord } from "@/app/context/cartContext";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";

const steps = ["Confirmed", "Pharmacist", "Packed", "On the way", "Delivered"];

function statusClasses(status: string) {
  if (status === "delivered" || status === "success") {
    return "bg-[#dcfce7] text-[#14532d]";
  }
  if (status === "cancelled") {
    return "bg-[#fee2e2] text-[#991b1b]";
  }
  if (status === "processing") {
    return "bg-[#dbeafe] text-[#1e40af]";
  }
  return "bg-[#fef3c7] text-[#92400e]";
}

function displayReference(reference: string, index: number) {
  return reference ? reference.slice(-8).toUpperCase() : `CH-${String(index + 1).padStart(4, "0")}`;
}

function ProgressStepper({ activeIndex = 1 }: { activeIndex?: number }) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-5 items-start">
        {steps.map((step, index) => {
          const completed = index <= activeIndex;
          return (
            <div key={step} className="relative flex flex-col items-center">
              {index < steps.length - 1 ? (
                <span
                  className={`absolute left-1/2 top-[7px] h-0.5 w-full ${
                    index < activeIndex ? "bg-[#15803d]" : "bg-[#e5e7eb]"
                  }`}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={`relative z-10 h-3.5 w-3.5 rounded-full border ${
                  completed ? "border-[#15803d] bg-[#15803d]" : "border-gray-300 bg-white"
                }`}
              />
              <span className="mt-2 max-w-[58px] text-center text-[10px] leading-tight text-gray-500">
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  index,
  active = false,
}: {
  order: OrderRecord;
  index: number;
  active?: boolean;
}) {
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(order.createdAt));
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);
  const thumbnails = order.items.slice(0, 3);
  const extraCount = Math.max(0, order.items.length - thumbnails.length);

  return (
    <article className="mb-2.5 rounded-[14px] border border-[#e5e7eb] bg-white px-4 py-3.5 md:mb-0 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-[13px] font-semibold text-[#0f2318]">
            Order #{displayReference(order.reference, index)}
          </h2>
          <p className="mt-1 text-xs leading-[1.5] text-gray-500">
            {date} · {itemCount} item{itemCount === 1 ? "" : "s"}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClasses(order.status)}`}>
          Processing
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center">
          {thumbnails.map((item) => (
            <div
              key={`${order.reference}-${item.id}`}
              className="-ml-1 first:ml-0 relative h-9 w-9 overflow-hidden rounded-md border-2 border-white bg-[#f0fdf4]"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="36px"
                  unoptimized={shouldUnoptimizeProductImage(item.image)}
                  className="object-cover"
                />
              ) : null}
            </div>
          ))}
          {extraCount > 0 ? (
            <span className="-ml-1 flex h-9 w-9 items-center justify-center rounded-md border-2 border-white bg-gray-100 text-[11px] font-bold text-gray-500">
              +{extraCount}
            </span>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[#0f2318]">
            GHS {order.amount.toFixed(2)}
          </p>
          <Link
            href="/account"
            className="mt-1 inline-flex h-[34px] items-center justify-center rounded-lg border border-[#15803d] px-3 text-[13px] font-semibold text-[#15803d]"
          >
            Track order
          </Link>
        </div>
      </div>

      {active ? <ProgressStepper /> : null}
    </article>
  );
}

export default function OrdersPage() {
  const { orders } = useCart();
  const activeOrder = orders[0];
  const pastOrders = activeOrder ? orders.slice(1) : orders;

  return (
    <div className="min-h-dvh bg-[#f8faf8] px-4 py-4 text-[#0f2318] md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-4 md:mb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-[#15803d]">
            Comfort Health
          </p>
          <h1 className="mt-1 text-[22px] font-bold md:text-3xl">Orders</h1>
          <p className="mt-1 text-sm leading-[1.5] text-gray-500">
            Track pharmacy orders and delivery progress.
          </p>
        </header>

        {orders.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-[#bbf7d0] bg-white px-6 py-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdf4] text-[#15803d]">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h2 className="text-[18px] font-bold">No orders yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-[1.5] text-gray-500">
              Completed purchases will appear here after checkout.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-[#15803d] px-5 text-sm font-bold text-white"
            >
              Shop medicines
            </Link>
          </section>
        ) : (
          <>
            {activeOrder ? (
              <section className="mb-5">
                <div className="mb-3 flex items-center gap-2">
                  <PackageCheck className="h-5 w-5 text-[#15803d]" />
                  <h2 className="text-[17px] font-bold md:text-xl">Active order</h2>
                </div>
                <OrderCard order={activeOrder} index={0} active />
              </section>
            ) : null}

            {pastOrders.length > 0 ? (
              <section>
                <h2 className="mb-3 text-[17px] font-bold md:text-xl">Past orders</h2>
                <div className="md:grid md:grid-cols-2 md:gap-4">
                  {pastOrders.map((order, index) => (
                    <OrderCard
                      key={order.reference}
                      order={order}
                      index={index + 1}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
