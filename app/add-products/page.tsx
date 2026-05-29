import { requireAdminUser } from "@/lib/auth";
import AddProductClient from "./AddProductClient";

export const dynamic = "force-dynamic";

export default async function AddProductPage() {
  await requireAdminUser();

  return <AddProductClient />;
}
