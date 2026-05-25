import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: Request) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { error: "PAYSTACK_SECRET_KEY is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { email, amount, reference, items } = body ?? {};

  if (!email || !amount || !reference) {
    return NextResponse.json(
      { error: "Request must include email, amount, and reference." },
      { status: 400 }
    );
  }

  const payload = {
    email,
    amount: Math.round(Number(amount) * 100),
    currency: "GHS",
    reference,
    metadata: {
      source: "Comfi Health checkout",
      items: Array.isArray(items) ? items : [],
    },
  };

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.message || "Failed to initialize Paystack transaction.", data },
      { status: response.status }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
