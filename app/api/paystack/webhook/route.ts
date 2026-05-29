import { NextResponse } from "next/server";
import {
  finalizeVerifiedPayment,
  PaymentFlowError,
  verifyPaystackWebhookSignature,
} from "@/lib/payments";
import { rateLimitRequest, readRequestText, RequestSecurityError } from "@/lib/request-security";
import { PaystackWebhookSchema, validationMessage } from "@/lib/validation";

type PaystackWebhookEvent = {
  event?: string;
  data?: {
    reference?: string;
    status?: string;
    amount?: number;
    currency?: string;
    id?: number | string;
    paid_at?: string | null;
    gateway_response?: string;
  };
};

export async function POST(request: Request) {
  let body: string;

  try {
    body = await readRequestText(request, 256_000);
  } catch (error) {
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Invalid webhook request" }, { status: 400 });
  }

  const signature = request.headers.get("x-paystack-signature");

  if (!verifyPaystackWebhookSignature(body, signature)) {
    return NextResponse.json({ error: "Invalid Paystack signature" }, { status: 401 });
  }

  try {
    await rateLimitRequest(request, "paystack:webhook", { limit: 120, windowMs: 60_000 });
  } catch (error) {
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  let event: PaystackWebhookEvent;
  try {
    const parsed = PaystackWebhookSchema.safeParse(JSON.parse(body));
    if (!parsed.success) {
      return NextResponse.json(
        { error: validationMessage(parsed.error) },
        { status: 400 },
      );
    }

    event = parsed.data as PaystackWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook body" }, { status: 400 });
  }

  if (event.event !== "charge.success" || !event.data?.reference) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    await finalizeVerifiedPayment(event.data.reference);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to process Paystack webhook", error);

    if (error instanceof PaymentFlowError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
