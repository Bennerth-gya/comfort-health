import AdminShell from "@/components/AdminShell";
import LiveOrderDashboard from "@/components/admin/LiveOrderDashboard";
import { requireAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  await requireAdminUser();

  return (
    <AdminShell>
      <main className="ml-64 min-h-screen p-4 md:p-6">
        <LiveOrderDashboard />
      </main>
    </AdminShell>
  );
}
