import Groq, { APIError } from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat";
import type { Prisma as PrismaTypes } from "@/generated/db";
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
export const runtime = "nodejs";
export const maxDuration = 30;

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type Recommendation = {
  productId: string;
  reason: string;
};

const MAX_CATALOGUE_PRODUCTS = 50;
const MAX_DIRECT_MATCH_PRODUCTS = 35;

const PRODUCT_SELECT = {
  id: true,
  name: true,
  description: true,
  price: true,
  category: true,
  imageUrl: true,
  prescriptionRequired: true,
  quantity: true,
  dosage: true,
  manufacturer: true,
  isFeatured: true,
  featuredRank: true,
} satisfies PrismaTypes.ProductSelect;

type AiProduct = PrismaTypes.ProductGetPayload<{
  select: typeof PRODUCT_SELECT;
}>;

const QUERY_STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "because",
  "been",
  "being",
  "could",
  "does",
  "dont",
  "feel",
  "feeling",
  "from",
  "have",
  "help",
  "here",
  "into",
  "just",
  "like",
  "need",
  "please",
  "some",
  "that",
  "them",
  "then",
  "there",
  "this",
  "want",
  "what",
  "when",
  "with",
  "your",
]);

const SYMPTOM_SEARCH_EXPANSIONS: Record<string, string[]> = {
  ache: ["pain", "relief"],
  allergy: ["allergy", "antihistamine", "cetirizine", "loratadine"],
  allergies: ["allergy", "antihistamine", "cetirizine", "loratadine"],
  catarrh: ["cold", "flu", "cough"],
  chills: ["fever", "cold", "flu"],
  cold: ["cold", "flu", "cough", "catarrh"],
  cough: ["cough", "cold", "flu", "syrup"],
  diarrhea: ["diarrhea", "stomach", "digest", "rehydration"],
  diarrhoea: ["diarrhea", "stomach", "digest", "rehydration"],
  fever: ["fever", "pain", "paracetamol", "cold", "flu"],
  flu: ["flu", "cold", "cough", "fever"],
  headache: ["headache", "pain", "relief", "paracetamol", "ibuprofen"],
  headaches: ["headache", "pain", "relief", "paracetamol", "ibuprofen"],
  immune: ["immune", "vitamin", "supplement"],
  immunity: ["immune", "vitamin", "supplement"],
  nausea: ["nausea", "stomach", "digest"],
  pain: ["pain", "relief", "paracetamol", "ibuprofen"],
  pains: ["pain", "relief", "paracetamol", "ibuprofen"],
  sore: ["sore", "throat", "cough", "cold"],
  stomach: ["stomach", "digest", "antacid", "diarrhea", "rehydration"],
  throat: ["throat", "cough", "cold"],
  tired: ["vitamin", "supplement", "energy"],
  vitamin: ["vitamin", "supplement", "immune"],
  vitamins: ["vitamin", "supplement", "immune"],
  weak: ["vitamin", "supplement", "energy"],
  weakness: ["vitamin", "supplement", "energy"],
};

const COMFORT_HEALTH_CONTEXT = `
COMFORT HEALTH PROJECT CONTEXT:
- Comfort Health is a Ghana-focused campus pharmacy and wellness shopping app.
- Users browse pharmacy products, chat with Comfort AI, add recommendations to cart, and checkout in Ghana cedis (GHS).
- Product data comes from the app's Prisma/PostgreSQL catalogue. Only active, in-stock products are included in the prompt.
- Checkout is handled by Paystack. Do not claim payment is complete unless the app confirms it.
- Product recommendations must use the exact product IDs from the catalogue context so the UI can attach add-to-cart cards.
`;

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

function latestUserContent(messages: ClientMessage[]) {
  return (
    [...messages]
      .reverse()
      .find((message) => message.role === "user")
      ?.content.trim() ?? ""
  );
}

function truncateForPrompt(value: string | null | undefined, maxLength: number) {
  const normalized = value?.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "";
  }

  return normalized.length > maxLength
    ? `${normalized.slice(0, maxLength - 1)}...`
    : normalized;
}

function tokenizeRetrievalQuery(value: string) {
  const baseTokens = value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !QUERY_STOP_WORDS.has(token));

  const expandedTokens = baseTokens.flatMap((token) => [
    token,
    ...(SYMPTOM_SEARCH_EXPANSIONS[token] ?? []),
  ]);

  return Array.from(new Set(expandedTokens)).slice(0, 14);
}

function productSearchFilter(token: string): PrismaTypes.ProductWhereInput {
  const contains = { contains: token, mode: "insensitive" as const };

  return {
    OR: [
      { name: contains },
      { description: contains },
      { category: contains },
      { manufacturer: contains },
      { dosage: contains },
      { sku: contains },
    ],
  };
}

function productSearchText(product: AiProduct) {
  return [
    product.name,
    product.description,
    product.category,
    product.manufacturer,
    product.dosage,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function scoreRetrievedProduct(product: AiProduct, tokens: string[]) {
  const text = productSearchText(product);
  const name = product.name.toLowerCase();
  const category = product.category?.toLowerCase() ?? "";

  return tokens.reduce((score, token) => {
    if (name.includes(token)) return score + 5;
    if (category.includes(token)) return score + 3;
    if (text.includes(token)) return score + 2;
    return score;
  }, product.isFeatured ? 1 : 0);
}

async function getRelevantProducts(messages: ClientMessage[]) {
  const query = latestUserContent(messages);
  const tokens = tokenizeRetrievalQuery(query);
  const baseWhere = {
    activeListing: true,
    quantity: { gt: 0 },
  } satisfies PrismaTypes.ProductWhereInput;

  const directMatches =
    tokens.length > 0
      ? await prisma.product.findMany({
          where: {
            ...baseWhere,
            OR: tokens.map(productSearchFilter),
          },
          orderBy: [
            { isFeatured: "desc" },
            { featuredRank: "asc" },
            { createAt: "desc" },
          ],
          select: PRODUCT_SELECT,
          take: MAX_DIRECT_MATCH_PRODUCTS,
        })
      : [];

  const rankedMatches = directMatches
    .map((product) => ({
      product,
      score: scoreRetrievedProduct(product, tokens),
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product);

  const fallbackProducts = await prisma.product.findMany({
    where: {
      ...baseWhere,
      id:
        rankedMatches.length > 0
          ? { notIn: rankedMatches.map((product) => product.id) }
          : undefined,
    },
    orderBy: [
      { isFeatured: "desc" },
      { featuredRank: "asc" },
      { createAt: "desc" },
    ],
    select: PRODUCT_SELECT,
    take: Math.max(0, MAX_CATALOGUE_PRODUCTS - rankedMatches.length),
  });

  return [...rankedMatches, ...fallbackProducts].slice(0, MAX_CATALOGUE_PRODUCTS);
}

async function getProductsForAiGuide(messages: ClientMessage[]) {
  try {
    return {
      products: await getRelevantProducts(messages),
      catalogueAvailable: true,
    };
  } catch (error) {
    console.error("AI guide product retrieval failed", error);

    return {
      products: [],
      catalogueAvailable: false,
    };
  }
}

function buildProductContext(products: AiProduct[]) {
  return products
    .map((product) => {
      const description =
        truncateForPrompt(product.description, 220) || "No description";
      const dosage = truncateForPrompt(product.dosage, 120) || "Not provided";
      const manufacturer =
        truncateForPrompt(product.manufacturer, 80) || "Not provided";

      return `ID: ${product.id} | Name: ${product.name} | Category: ${
        product.category ?? "General"
      } | Price: GHS ${product.price.toString()} | Stock: ${
        product.quantity
      } | Prescription required: ${
        product.prescriptionRequired ? "yes" : "no"
      } | Manufacturer: ${manufacturer} | Label/dosage info: ${dosage} | Description: ${description}`;
    })
    .join("\n");
}

function buildSystemPrompt(products: AiProduct[], catalogueAvailable: boolean) {
  const productContext =
    products.length > 0
      ? buildProductContext(products)
      : catalogueAvailable
        ? "No active, in-stock products are available right now."
        : "The product catalogue is temporarily unavailable. Do not recommend products.";
  const recommendationRule =
    products.length > 0
      ? "Always recommend 2-4 products maximum per response. Keep it focused."
      : "Do not recommend products while the catalogue is empty or unavailable. Give safe general guidance and output an empty recommendations JSON array.";

  return `
You are Comfort AI, a friendly pharmacy health guide for Comfort Health. Your job is to listen to a user's symptoms and recommend the most relevant products from the pharmacy's current catalogue when that catalogue is available.

${COMFORT_HEALTH_CONTEXT}

RULES:
1. You are NOT a doctor. Never diagnose. Never prescribe dosages beyond what's on the product label. Always add a brief safety note for serious symptoms.
2. Only recommend products from the catalogue below. Never invent products.
3. ${recommendationRule}
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

If there are no catalogue products to recommend, output exactly:

RECOMMENDATIONS_JSON:
[]

CURRENT PHARMACY CATALOGUE:
${productContext}
`;
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

    const { products, catalogueAvailable } = await getProductsForAiGuide(messages);
    const systemPrompt = buildSystemPrompt(products, catalogueAvailable);

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

    if (error instanceof APIError) {
      return NextResponse.json(
        {
          error:
            error.status >= 400 && error.status < 500
              ? "The AI service rejected this request. Please check the Groq API key configured on Vercel."
              : "The AI service is temporarily unavailable. Please try again.",
        },
        { status: error.status >= 400 && error.status < 500 ? 400 : 502 },
      );
    }

    return NextResponse.json(
      { error: "Failed to generate AI health guide response." },
      { status: 500 },
    );
  }
}
