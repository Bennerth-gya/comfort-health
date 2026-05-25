import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function GET(request: Request) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { error: "PAYSTACK_SECRET_KEY is not configured." },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const reference = url.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { error: "Missing reference query parameter." },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.message || "Unable to verify Paystack transaction.", data },
      { status: response.status }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
