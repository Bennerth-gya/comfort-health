import Link from "next/link";
import { LayoutDashboard, Package, PlusCircle, ShoppingBag } from "lucide-react";

const actions = [
  {
    href: "/inventory",
    title: "Inventory",
    description: "View and manage all products and stock levels.",
    icon: Package,
  },
  {
    href: "/add-products",
    title: "Add product",
    description: "List a new medicine or health product for sale.",
    icon: PlusCircle,
  },
  {
    href: "/orders",
    title: "Orders",
    description: "Track Paystack payments and fulfillment status.",
    icon: ShoppingBag,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    description: "Return to metrics and recent product activity.",
    icon: LayoutDashboard,
  },
];

export default function DashboardQuickActions() {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-semibold text-gray-700">Quick actions</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-gray-900">{action.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
