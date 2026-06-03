import AdminShell from "@/components/AdminShell";
import DashboardQuickActions from "@/components/DashboardQuickActions";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const user = await requireAdminUser();
    const userId = user.id;

    const [totalProducts, recent, stockPreview, lowStockRows, valueRows] = await Promise.all([
        prisma.product.count({ where: { userId } }),
        prisma.product.findMany({
            where: { userId },
            orderBy: { createAt: "desc" },
            take: 5,
        }),
        prisma.product.findMany({
            where: { userId },
            orderBy: { createAt: "desc" },
            take: 5,
            select: {
                quantity: true,
                name: true,
            },
        }),
        prisma.$queryRaw<Array<{ count: number }>>`
            SELECT COUNT(*)::int AS count
            FROM "product"
            WHERE "userId" = ${userId}
              AND "lowStock" IS NOT NULL
              AND "quantity" > 0
              AND "quantity" <= "lowStock"
        `,
        prisma.$queryRaw<Array<{ value: string | null }>>`
            SELECT COALESCE(SUM("price" * "quantity"), 0)::text AS value
            FROM "product"
            WHERE "userId" = ${userId}
        `,
    ]);

    const lowStock = lowStockRows[0]?.count ?? 0;
    const totalValue = Number(valueRows[0]?.value ?? 0);

    const formattedValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GHS",
        maximumFractionDigits: 0,
    }).format(totalValue);

    return (
        <AdminShell>
            <main className="ml-64 min-h-screen p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500">
                        Welcome back! Here is an overview of your inventory
                    </p>
                </div>

                <DashboardQuickActions />

                {/* Top row: Key Metrics + New Products */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Key Metrics Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-sm font-semibold text-gray-700 mb-6">
                            Key metrics
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Total Products */}
                            <div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {totalProducts}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Total Products</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs text-green-600">
                                        +{totalProducts}
                                    </span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>
                            {/* Total Value */}
                            <div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {formattedValue}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Total Value</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs text-green-600">
                                        +{formattedValue}
                                    </span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>
                            {/* Low Stock */}
                            <div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {lowStock}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Low Stock</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs text-green-600">
                                        +{lowStock}
                                    </span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* New Products Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4">
                            New products
                        </h2>
                        {recent.length > 0 ? (
                            <div className="space-y-3">
                                {recent.map((product, i) => (
                                    <div key={product.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                                            <span className="text-sm text-gray-700 font-medium">
                                                {product.name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "GHS",
                                            }).format(Number(product.price))}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No new products yet.</p>
                        )}
                    </div>
                </div>

                {/* Bottom row: Stock Levels + Efficiency */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Stock Levels Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4">
                            Stock levels
                        </h2>
                        {stockPreview.length > 0 ? (
                            <div className="space-y-3">
                                {stockPreview.map((product, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                                            <span className="text-sm text-gray-700">{product.name}</span>
                                        </div>
                                        <span className="text-sm text-amber-500 font-medium">
                                            {product.quantity} units
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No stock data available.</p>
                        )}
                    </div>

                    {/* Efficiency Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4">
                            Efficiency
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Stock health</span>
                                    <span>
                                        {totalProducts > 0
                                            ? Math.round(
                                                ((totalProducts - lowStock) /
                                                    totalProducts) *
                                                    100
                                              )
                                            : 100}
                                        %
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{
                                            width:
                                                totalProducts > 0
                                                    ? `${Math.round(
                                                          ((totalProducts - lowStock) /
                                                              totalProducts) *
                                                              100
                                                      )}%`
                                                    : "100%",
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Low stock items</span>
                                    <span>{lowStock} items</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-amber-400 h-2 rounded-full"
                                        style={{
                                            width:
                                                totalProducts > 0
                                                    ? `${Math.round(
                                                          (lowStock / totalProducts) * 100
                                                      )}%`
                                                    : "0%",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="pt-2 border-t border-gray-100">
                                <p className="text-xs text-gray-500">Total inventory value</p>
                                <p className="text-xl font-bold text-gray-900 mt-1">
                                    {formattedValue}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AdminShell>
    );
}
