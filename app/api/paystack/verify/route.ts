import { NextResponse } from "next/server";
import { finalizeVerifiedPayment, PaymentFlowError, verifyReceiptToken } from "@/lib/payments";
import { rateLimitRequest, RequestSecurityError } from "@/lib/request-security";

export async function GET(request: Request) {
  try {
    await rateLimitRequest(request, "paystack:verify", { limit: 30, windowMs: 60_000 });

    const url = new URL(request.url);
    const reference = url.searchParams.get("reference");
    const receiptToken = url.searchParams.get("receipt");

    if (!reference) {
      return NextResponse.json(
        { error: "Missing reference query parameter." },
        { status: 400 },
      );
    }

    if (!verifyReceiptToken(reference, receiptToken)) {
      return NextResponse.json(
        { error: "Invalid receipt token." },
        { status: 403 },
      );
    }

    const order = await finalizeVerifiedPayment(reference);
    return NextResponse.json({ status: true, order }, { status: 200 });
  } catch (error) {
    console.error("Failed to verify Paystack transaction", error);

    if (error instanceof PaymentFlowError || error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Unable to verify Paystack transaction." },
      { status: 500 },
    );
  }
}
