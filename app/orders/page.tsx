import AdminShell from "@/components/AdminShell";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AlertTriangle, CheckCircle2, Clock, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GHS",
  minimumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function statusMeta(status: string) {
  if (status === "paid") {
    return {
      label: "Paid",
      className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
      Icon: CheckCircle2,
    };
  }

  if (status === "paid_fulfillment_review") {
    return {
      label: "Paid, review stock",
      className: "bg-amber-50 text-amber-700 ring-amber-100",
      Icon: AlertTriangle,
    };
  }

  if (status.includes("failed") || status.includes("mismatch")) {
    return {
      label: "Needs attention",
      className: "bg-red-50 text-red-700 ring-red-100",
      Icon: AlertTriangle,
    };
  }

  return {
    label: "Pending",
    className: "bg-slate-50 text-slate-700 ring-slate-100",
    Icon: Clock,
  };
}

export default async function OrdersPage() {
  const user = await requireAdminUser();

  const orders = await prisma.order.findMany({
    where: { sellerId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      items: true,
      payment: true,
    },
  });

  return (
    <AdminShell className="min-h-screen bg-slate-50 text-slate-950">
      <main className="ml-64 min-h-screen p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Orders</h1>
            <p className="mt-2 text-sm text-slate-500">
              Review recent Paystack orders and fulfillment status.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Recent orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-semibold text-slate-700">No orders yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Paid orders will appear here after checkout.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    <th className="px-5 py-3">Reference</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Items</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Created</th>
                    <th className="px-5 py-3">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => {
                    const status = statusMeta(order.status);
                    const Icon = status.Icon;

                    return (
                      <tr key={order.id} className="hover:bg-slate-50/80">
                        <td className="max-w-[220px] px-5 py-4">
                          <p className="truncate font-mono text-xs text-slate-700">
                            {order.reference}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-slate-700">{order.email}</td>
                        <td className="px-5 py-4 text-slate-700">
                          {order.items.length} item{order.items.length === 1 ? "" : "s"}
                        </td>
                        <td className="px-5 py-4 font-semibold text-slate-900">
                          {currencyFormatter.format(Number(order.amount))}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${status.className}`}>
                            <Icon className="h-3.5 w-3.5" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {dateFormatter.format(order.createdAt)}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {order.payment?.status ?? "pending"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </AdminShell>
  );
}
