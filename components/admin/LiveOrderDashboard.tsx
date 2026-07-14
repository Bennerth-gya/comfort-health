"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Bell,
  BellRing,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  Truck,
  User,
  X,
} from "lucide-react";
import type { AdminOrderRecord } from "@/lib/orders-admin";
import type { OrderStatus } from "@/generated/db";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  CONFIRMED: { label: "Confirmed", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  PREPARING: { label: "Preparing", color: "bg-purple-100 text-purple-800", icon: ShoppingBag },
  ASSIGNED: { label: "Rider assigned", color: "bg-orange-100 text-orange-800", icon: User },
  OUT_FOR_DELIVERY: {
    label: "Out for delivery",
    color: "bg-teal-100 text-teal-800",
    icon: Truck,
  },
  DELIVERED: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: X },
};

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "ASSIGNED",
  ASSIGNED: "OUT_FOR_DELIVERY",
  OUT_FOR_DELIVERY: "DELIVERED",
};

const NEXT_STATUS_LABEL: Partial<Record<OrderStatus, string>> = {
  PENDING: "Confirm order",
  CONFIRMED: "Start preparing",
  PREPARING: "Assign to rider",
  ASSIGNED: "Mark picked up",
  OUT_FOR_DELIVERY: "Mark delivered",
};

type FilterKey = "ACTIVE" | "DELIVERED" | "CANCELLED" | "ALL";

function playAlertTone() {
  try {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    oscillator.frequency.setValueAtTime(660, context.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
  } catch {
    // Audio may be blocked until user interaction.
  }
}

function timeSince(date: string) {
  const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
}

function customerLabel(order: AdminOrderRecord) {
  return order.customerName || order.email.split("@")[0] || "Customer";
}

export default function LiveOrderDashboard() {
  const [orders, setOrders] = useState<AdminOrderRecord[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderRecord | null>(null);
  const [riderForm, setRiderForm] = useState({ name: "", phone: "", apiKey: "" });
  const [showRiderModal, setShowRiderModal] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("ACTIVE");
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const connect = () => {
      const eventSource = new EventSource("/api/admin/orders/stream");
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => setIsConnected(true);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data) as {
          type?: string;
          orders?: AdminOrderRecord[];
          pendingCount?: number;
          hasNewOrder?: boolean;
        };

        if (data.type !== "orders_update") {
          return;
        }

        setOrders(data.orders ?? []);
        setPendingCount(data.pendingCount ?? 0);

        if (data.hasNewOrder) {
          playAlertTone();
          setHasAlert(true);

          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("New Comfort Health order", {
              body: `${data.pendingCount ?? 0} order(s) waiting for confirmation`,
            });
          }
        }
      };

      eventSource.onerror = () => {
        setIsConnected(false);
        eventSource.close();
        window.setTimeout(connect, 3000);
      };
    };

    connect();

    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      void Notification.requestPermission();
    }

    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  const updateStatus = async (
    orderId: string,
    newStatus: OrderStatus,
    extra: Record<string, string> = {},
  ) => {
    const response = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, ...extra }),
    });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { order?: AdminOrderRecord };
    if (payload.order) {
      setOrders((current) =>
        current.map((order) => (order.id === orderId ? payload.order! : order)),
      );
    }

    setShowRiderModal(false);
    setRiderForm({ name: "", phone: "", apiKey: "" });
  };

  const handleStatusClick = (order: AdminOrderRecord) => {
    const next = NEXT_STATUS[order.fulfillmentStatus];
    if (!next) {
      return;
    }

    if (next === "ASSIGNED") {
      setSelectedOrder(order);
      setShowRiderModal(true);
      return;
    }

    void updateStatus(order.id, next);
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "ACTIVE") {
      return (
        order.fulfillmentStatus === "PENDING" ||
        order.fulfillmentStatus === "CONFIRMED" ||
        order.fulfillmentStatus === "PREPARING" ||
        order.fulfillmentStatus === "ASSIGNED" ||
        order.fulfillmentStatus === "OUT_FOR_DELIVERY"
      );
    }
    if (filter === "DELIVERED") return order.fulfillmentStatus === "DELIVERED";
    if (filter === "CANCELLED") return order.fulfillmentStatus === "CANCELLED";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f2318]">Live Orders</h1>
          <div className="mt-1 flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                isConnected ? "animate-pulse bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-xs text-gray-500">
              {isConnected ? "Connected — watching for new orders" : "Reconnecting..."}
            </span>
          </div>
        </div>

        {pendingCount > 0 ? (
          <button
            type="button"
            onClick={() => setHasAlert(false)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              hasAlert ? "animate-bounce bg-red-500 text-white" : "bg-[#15803d] text-white"
            }`}
          >
            {hasAlert ? <BellRing size={16} /> : <Bell size={16} />}
            {pendingCount} pending
          </button>
        ) : null}
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {(["ACTIVE", "DELIVERED", "CANCELLED", "ALL"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === value
                ? "bg-[#15803d] text-white"
                : "border border-gray-200 bg-white text-gray-600"
            }`}
          >
            {value.charAt(0) + value.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No orders yet</p>
          <p className="text-sm">New orders will appear here automatically</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredOrders.map((order) => {
            const config = STATUS_CONFIG[order.fulfillmentStatus];
            const StatusIcon = config?.icon ?? AlertCircle;
            const nextStatus = NEXT_STATUS[order.fulfillmentStatus];
            const nextLabel = NEXT_STATUS_LABEL[order.fulfillmentStatus];
            const orderLabel = order.reference.slice(-6).toUpperCase();
            const customer = customerLabel(order);

            return (
              <div
                key={order.id}
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
                  order.fulfillmentStatus === "CONFIRMED"
                    ? "border-yellow-300 ring-2 ring-yellow-200"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                  <div>
                    <span className="text-sm font-bold text-[#0f2318]">#{orderLabel}</span>
                    <span className="ml-2 text-xs text-gray-400">{timeSince(order.createdAt)}</span>
                  </div>
                  <span
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${config.color}`}
                  >
                    <StatusIcon size={11} />
                    {config.label}
                  </span>
                </div>

                <div className="space-y-1.5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <User size={13} className="text-gray-400" />
                    <span className="text-sm font-semibold text-[#0f2318]">{customer}</span>
                  </div>
                  {order.customerPhone ? (
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-gray-400" />
                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-[#15803d]"
                      >
                        {order.customerPhone}
                      </a>
                    </div>
                  ) : null}
                  {order.customerAddress ? (
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{order.customerAddress}</span>
                    </div>
                  ) : null}
                </div>

                <div className="border-b border-gray-100 px-4 pb-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between py-0.5 text-sm">
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-[#0f2318]">
                        GHS {item.lineTotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="mt-2 flex justify-between border-t border-dashed border-gray-200 pt-2">
                    <span className="text-sm font-bold">Total</span>
                    <span className="text-sm font-bold text-[#15803d]">
                      GHS {order.amount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {order.riderName ? (
                  <div className="border-b border-orange-100 bg-orange-50 px-4 py-2">
                    <span className="text-xs font-medium text-orange-700">
                      Rider: {order.riderName} · {order.riderPhone}
                    </span>
                  </div>
                ) : null}

                {nextStatus && nextLabel ? (
                  <div className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleStatusClick(order)}
                      className={`w-full rounded-xl py-2.5 text-sm font-bold text-white transition active:scale-[0.98] ${
                        order.fulfillmentStatus === "CONFIRMED"
                          ? "bg-yellow-500"
                          : order.fulfillmentStatus === "OUT_FOR_DELIVERY"
                            ? "bg-[#15803d]"
                            : "bg-[#0f2318]"
                      }`}
                    >
                      {nextLabel}
                    </button>
                  </div>
                ) : null}

                {order.customerPhone ? (
                  <div className="px-4 pb-3">
                    <a
                      href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hi ${customer}, your Comfort Health order #${orderLabel} is ${config.label.toLowerCase()}. Thank you!`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#15803d] py-2 text-sm font-semibold text-[#15803d]"
                    >
                      WhatsApp customer
                    </a>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {showRiderModal && selectedOrder ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 md:items-center">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <h2 className="mb-4 text-lg font-bold">Assign Delivery Rider</h2>
            <div className="space-y-3">
              <input
                placeholder="Rider full name"
                value={riderForm.name}
                onChange={(event) =>
                  setRiderForm((current) => ({ ...current, name: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#15803d]"
              />
              <input
                placeholder="Rider WhatsApp number (233XXXXXXXXX)"
                value={riderForm.phone}
                onChange={(event) =>
                  setRiderForm((current) => ({ ...current, phone: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#15803d]"
              />
              <input
                placeholder="Rider CallMeBot API key"
                value={riderForm.apiKey}
                onChange={(event) =>
                  setRiderForm((current) => ({ ...current, apiKey: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#15803d]"
              />
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setShowRiderModal(false)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  void updateStatus(selectedOrder.id, "ASSIGNED", {
                    riderName: riderForm.name,
                    riderPhone: riderForm.phone,
                    riderApiKey: riderForm.apiKey,
                  })
                }
                className="flex-1 rounded-xl bg-[#15803d] py-2.5 text-sm font-bold text-white"
              >
                Assign & notify rider
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
