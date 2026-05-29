import { NextResponse } from "next/server";
import { createPaystackCheckout, PaymentFlowError } from "@/lib/payments";
import {
  assertJsonContentType,
  assertSameOrigin,
  rateLimitRequest,
  readJsonRequest,
  RequestSecurityError,
} from "@/lib/request-security";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    assertJsonContentType(request);
    await rateLimitRequest(request, "paystack:init", { limit: 12, windowMs: 60_000 });

    const checkout = await createPaystackCheckout(
      request,
      await readJsonRequest(request, 32_000),
    );

    return NextResponse.json(
      {
        order: checkout.order,
        data: checkout.paystack,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to initialize Paystack transaction", error);

    if (error instanceof PaymentFlowError || error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Failed to initialize Paystack transaction." },
      { status: 500 },
    );
  }
}
