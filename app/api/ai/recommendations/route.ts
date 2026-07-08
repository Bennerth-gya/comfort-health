import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSymptomRecommendations } from "@/lib/symptom-recommendations";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { symptoms } = await request.json();

    if (typeof symptoms !== "string" || !symptoms.trim()) {
      return NextResponse.json({ error: "Please provide a short description of the symptoms." }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: { activeListing: true },
      orderBy: { createAt: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
        imageUrl: true,
      },
    });

    const result = await getSymptomRecommendations(symptoms, products.map((product) => ({
      ...product,
      price: product.price.toString(),
    })));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Recommendation API failed", error);
    return NextResponse.json({ error: "Failed to generate recommendations." }, { status: 500 });
  }
}
