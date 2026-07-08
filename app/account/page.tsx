import Link from "next/link";
import {
  Bell,
  BookHeart,
  ChevronRight,
  HeartPulse,
  HelpCircle,
  Info,
  LogOut,
  MapPin,
  MessageCircleHeart,
  Pill,
  Shield,
  Truck,
} from "lucide-react";
import { getCurrentUserOrNull } from "@/lib/auth";

export const dynamic = "force-dynamic";

type MenuItem = {
  label: string;
  href: string;
  icon: typeof Truck;
  danger?: boolean;
};

const menuGroups: { title: string; items: MenuItem[] }[] = [
  {
    title: "Orders and Delivery",
    items: [
      { label: "My orders", href: "/orders", icon: Truck },
      { label: "Delivery addresses", href: "/account", icon: MapPin },
      { label: "Prescription history", href: "/account", icon: BookHeart },
    ],
  },
  {
    title: "Health",
    items: [
      { label: "Saved medicines", href: "/account", icon: Pill },
      { label: "AI chat history", href: "/ai-guide", icon: MessageCircleHeart },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help center", href: "/account", icon: HelpCircle },
      { label: "Contact pharmacist", href: "/ai-guide", icon: HeartPulse },
      { label: "About Comfort Health", href: "/account", icon: Info },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Notifications", href: "/account", icon: Bell },
      { label: "Privacy settings", href: "/privacy", icon: Shield },
      { label: "Sign out", href: "/handler/sign-out", icon: LogOut, danger: true },
    ],
  },
];

function readString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return null;
}

function readEmail(record: Record<string, unknown>) {
  const primary = record.primaryEmail;
  if (typeof primary === "string") return primary;
  if (primary && typeof primary === "object" && "email" in primary) {
    const email = (primary as { email?: unknown }).email;
    if (typeof email === "string") return email;
  }
  return readString(record, ["email", "primary_email"]);
}

function initialsFor(name: string, email: string | null) {
  const source = name || email || "Comfort Health";
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "CH";
}

export default async function AccountPage() {
  const user = await getCurrentUserOrNull();
  const record = (user ?? {}) as Record<string, unknown>;
  const email = readEmail(record);
  const name = readString(record, ["displayName", "name", "fullName"]) ?? "Guest customer";
  const initials = initialsFor(name, email);

  return (
    <div className="min-h-dvh bg-[#f8faf8] text-[#0f2318]">
      <section className="border-b border-[#bbf7d0] bg-[#f0fdf4] px-4 py-5 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#15803d] text-base font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[17px] font-bold">{name}</h1>
            <p className="truncate text-[13px] leading-[1.5] text-gray-500">
              {email ?? "Sign in to sync your account"}
            </p>
          </div>
          <Link
            href={user ? "/handler/account-settings" : "/sign-in"}
            className="flex h-8 shrink-0 items-center rounded-lg border border-[#bbf7d0] bg-white px-3 text-xs font-semibold text-[#15803d]"
          >
            Edit profile
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-6 md:px-6 md:py-8">
        <aside className="hidden rounded-2xl border border-[#e5e7eb] bg-white p-5 md:block md:self-start">
          <div className="flex items-center gap-3 border-b border-[#f3f4f6] pb-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#15803d] text-base font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold">{name}</h1>
              <p className="truncate text-sm text-gray-500">{email ?? "Not signed in"}</p>
            </div>
          </div>
          <nav className="mt-5 space-y-1" aria-label="Account sections">
            {menuGroups.flatMap((group) => group.items).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition hover:bg-emerald-50 ${
                    item.danger ? "text-red-500" : "text-[#0f2318]"
                  }`}
                >
                  <Icon className="h-5 w-5 text-[#15803d]" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="md:min-w-0">
          <section className="hidden rounded-2xl border border-[#e5e7eb] bg-white p-6 md:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#15803d]">
              Account overview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0f2318]">
              Manage your Comfort Health profile
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-[1.7] text-gray-500">
              Review orders, delivery details, AI guide history, privacy, and support options from one place.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Orders", value: "Track purchases", icon: Truck },
                { label: "Health", value: "Saved medicines", icon: Pill },
                { label: "Support", value: "Pharmacist help", icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-xl border border-[#e5e7eb] p-4">
                    <Icon className="h-5 w-5 text-[#15803d]" />
                    <p className="mt-3 text-sm font-bold">{item.label}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="md:mt-6 md:grid md:grid-cols-2 md:gap-4">
            {menuGroups.map((group) => (
              <section key={group.title} className="md:rounded-2xl md:border md:border-[#e5e7eb] md:bg-white md:p-2">
                <h2 className="px-4 pb-2 pt-5 text-xs font-bold uppercase tracking-wide text-gray-400 md:px-3 md:pt-3">
                  {group.title}
                </h2>
                <div className="bg-white md:bg-transparent">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex h-[52px] items-center gap-3 border-b border-[#f3f4f6] px-4 last:border-b-0 md:rounded-xl md:border-b-0 md:px-3 md:hover:bg-emerald-50"
                      >
                        <Icon className={`h-5 w-5 ${item.danger ? "text-red-500" : "text-[#15803d]"}`} />
                        <span className={`min-w-0 flex-1 text-[15px] ${item.danger ? "text-red-500" : "text-[#0f2318]"}`}>
                          {item.label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-300" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <p className="pb-6 pt-5 text-center text-xs text-gray-400 md:pb-0">
            Comfort Health v1.0
          </p>
        </main>
      </div>
    </div>
  );
}
