import Groq, { APIError } from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  assertJsonContentType,
  assertSameOrigin,
  rateLimitRequest,
  readJsonRequest,
  RequestSecurityError,
} from "@/lib/request-security";

export const dynamic = "force-dynamic";

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type Recommendation = {
  productId: string;
  reason: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function sanitizeMessages(value: unknown): ClientMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((message): message is Record<string, unknown> => isRecord(message))
    .map(
      (message): ClientMessage => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: typeof message.content === "string" ? message.content.trim() : "",
      }),
    )
    .filter((message) => message.content.length > 0)
    .slice(-10)
    .map(
      (message): ClientMessage => ({
      ...message,
      content: message.content.slice(0, 1500),
      }),
    );
}

function parseRecommendations(rawText: string): Recommendation[] {
  const [, rawJson = ""] = rawText.split("RECOMMENDATIONS_JSON:");
  const jsonStart = rawJson.indexOf("[");
  const jsonEnd = rawJson.lastIndexOf("]");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawJson.slice(jsonStart, jsonEnd + 1)) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is Record<string, unknown> => isRecord(item))
      .map((item) => ({
        productId: typeof item.productId === "string" ? item.productId : "",
        reason: typeof item.reason === "string" ? item.reason : "",
      }))
      .filter((item) => item.productId && item.reason)
      .slice(0, 4);
  } catch {
    return [];
  }
}

async function createCompletion(
  groq: Groq,
  messages: ChatCompletionMessageParam[],
) {
  try {
    return await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
      temperature: 0.5,
      max_tokens: 800,
    });
  } catch (error) {
    if (error instanceof APIError && error.status === 400) {
      return groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.5,
        max_tokens: 800,
      });
    }

    throw error;
  }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    assertJsonContentType(request);
    await rateLimitRequest(request, "ai-guide:chat", {
      limit: 20,
      windowMs: 60_000,
    });

    const body = await readJsonRequest(request, 24_000);
    const messages = sanitizeMessages(isRecord(body) ? body.messages : undefined);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Please send at least one message." },
        { status: 400 },
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const products = await prisma.product.findMany({
      where: {
        activeListing: true,
        quantity: { gt: 0 },
      },
      orderBy: { createAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: true,
        imageUrl: true,
        prescriptionRequired: true,
      },
      take: 50,
    });

    if (products.length === 0) {
      return NextResponse.json({
        message:
          "I could not find any available products in the pharmacy catalogue right now. Please check back soon or contact the pharmacy team.",
        recommendations: [],
      });
    }

    const productContext = products
      .map(
        (product) =>
          `ID: ${product.id} | Name: ${product.name} | Category: ${
            product.category ?? "General"
          } | Price: GHS ${product.price.toString()} | Prescription required: ${
            product.prescriptionRequired ? "yes" : "no"
          } | Description: ${product.description ?? "No description"}`,
      )
      .join("\n");

    const systemPrompt = `
You are Comfort AI, a friendly pharmacy health guide for Comfort Health - a campus pharmacy delivery platform in Ghana. Your job is to listen to a user's symptoms and recommend the most relevant products from the pharmacy's current catalogue.

RULES:
1. You are NOT a doctor. Never diagnose. Never prescribe dosages beyond what's on the product label. Always add a brief safety note for serious symptoms.
2. Only recommend products from the catalogue below. Never invent products.
3. Always recommend 2-4 products maximum per response. Keep it focused.
4. Be warm, friendly, and brief. Write in simple English - users are mainly Ghanaian university students.
5. If symptoms sound serious (high fever >3 days, chest pain, difficulty breathing, severe pain), strongly recommend seeing a doctor or campus clinic and do not just push products.
6. Prefer non-prescription products when they fit the user's symptoms.
7. After your text message, output a JSON block of recommended products using EXACTLY this format and nothing else after it:

RECOMMENDATIONS_JSON:
[
  {
    "productId": "the product id from the catalogue",
    "reason": "one sentence explaining why this helps their symptom"
  }
]

CURRENT PHARMACY CATALOGUE:
${productContext}
`;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await createCompletion(groq, [
      { role: "system", content: systemPrompt },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ]);

    const rawText = completion.choices[0]?.message?.content ?? "";
    const [messageText = rawText] = rawText.split("RECOMMENDATIONS_JSON:");
    const parsedRecommendations = parseRecommendations(rawText);
    const productById = new Map(products.map((product) => [product.id, product]));
    const seenProducts = new Set<string>();

    const recommendations = parsedRecommendations.flatMap((item) => {
      if (seenProducts.has(item.productId)) {
        return [];
      }

      const product = productById.get(item.productId);
      if (!product) {
        return [];
      }

      seenProducts.add(item.productId);

      return [
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          category: product.category ?? "General",
          imageUrl: product.imageUrl,
          prescriptionRequired: product.prescriptionRequired,
          reason: item.reason,
        },
      ];
    });

    return NextResponse.json({
      message: messageText.trim(),
      recommendations,
    });
  } catch (error) {
    console.error("AI guide request failed", error);

    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Failed to generate AI health guide response." },
      { status: 500 },
    );
  }
}
