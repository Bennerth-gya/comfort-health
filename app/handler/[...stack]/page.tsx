import { StackHandler } from "@stackframe/stack";
import { Suspense } from "react";

function HandlerFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8faf8] text-sm text-slate-600">
      Loading authentication…
    </div>
  );
}

export default function Handler() {
  return (
    <Suspense fallback={<HandlerFallback />}>
      <StackHandler fullPage />
    </Suspense>
  );
}
