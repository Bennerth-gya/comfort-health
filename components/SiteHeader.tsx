import "server-only";

import { Suspense } from "react";
import SiteHeaderClient from "@/components/SiteHeaderClient";
import { AdminHeaderLink } from "@/components/AdminHeaderLink";

export default function SiteHeader() {
  return (
    <SiteHeaderClient
      adminNode={
        <Suspense fallback={null}>
          <AdminHeaderLink />
        </Suspense>
      }
    />
  );
}
