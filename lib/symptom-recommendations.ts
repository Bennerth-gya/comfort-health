import { Groq } from "groq-sdk";

export type SymptomProduct = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  price: string;
  imageUrl?: string | null;
};

export type SymptomRecommendationResult = {
  recommendations: SymptomProduct[];
  reasoning: string;
  usedGroq: boolean;
};

function normalizeSymptoms(input: string) {
  return input.toLowerCase().trim();
}

export function buildFallbackRecommendations(
  symptoms: string,
  products: SymptomProduct[],
) {
  const normalizedSymptoms = normalizeSymptoms(symptoms);
  const loweredProducts = products.map((product) => ({
    ...product,
    searchableText: `${product.name} ${product.description ?? ""} ${product.category ?? ""}`.toLowerCase(),
  }));

  const scoreProduct = (product: SymptomProduct & { searchableText: string }) => {
    let score = 0;

    if (normalizedSymptoms.includes("cold") || normalizedSymptoms.includes("flu")) {
      if (product.searchableText.includes("cold") || product.searchableText.includes("flu")) score += 3;
      if (product.searchableText.includes("cough") || product.searchableText.includes("nose") || product.searchableText.includes("syrup")) score += 2;
    }

    if (normalizedSymptoms.includes("pain") || normalizedSymptoms.includes("headache")) {
      if (product.searchableText.includes("pain") || product.searchableText.includes("relief") || product.searchableText.includes("headache")) score += 3;
    }

    if (normalizedSymptoms.includes("fever")) {
      if (product.searchableText.includes("fever") || product.searchableText.includes("pain")) score += 2;
    }

    if (normalizedSymptoms.includes("vitamin") || normalizedSymptoms.includes("immune")) {
      if (product.searchableText.includes("vitamin") || product.searchableText.includes("immune")) score += 3;
    }

    if (normalizedSymptoms.includes("stomach") || normalizedSymptoms.includes("digest")) {
      if (product.searchableText.includes("stomach") || product.searchableText.includes("digest")) score += 3;
    }

    if (product.searchableText.includes("pain") && normalizedSymptoms.includes("pain")) score += 1;

    return score;
  };

  const rankedProducts = loweredProducts
    .map((product) => ({ product, score: scoreProduct(product) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.product);

  const recommendations = rankedProducts.length > 0 ? rankedProducts : loweredProducts.slice(0, 4).map((entry) => entry);

  return {
    recommendations,
    reasoning: `I matched your symptoms against the available products and prioritized items that best fit ${symptoms.toLowerCase()}.`,
    usedGroq: false,
  };
}

export async function getSymptomRecommendations(
  symptoms: string,
  products: SymptomProduct[],
): Promise<SymptomRecommendationResult> {
  if (!symptoms.trim()) {
    return {
      recommendations: products.slice(0, 4),
      reasoning: "Please share a few symptoms so I can recommend suitable products.",
      usedGroq: false,
    };
  }

  if (!process.env.GROQ_API_KEY) {
    return buildFallbackRecommendations(symptoms, products);
  }

  try {
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You help recommend wellness products for common symptoms. Only recommend products that are available in the catalog. Return a short explanation and a JSON array of product names. Never give medical diagnosis advice.",
        },
        {
          role: "user",
          content: `Symptoms: ${symptoms}\nCatalog: ${products
            .map((product) => `${product.name} | ${product.category ?? "General"} | ${product.description ?? ""}`)
            .join("\n")}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 400,
    });

    const content = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);

    const recommendedNames = Array.isArray(parsed.recommendations)
      ? parsed.recommendations.filter((item: unknown): item is string => typeof item === "string")
      : [];

    const recommendations = products.filter((product) => recommendedNames.includes(product.name));

    return {
      recommendations: recommendations.length > 0 ? recommendations : products.slice(0, 4),
      reasoning: typeof parsed.reasoning === "string" ? parsed.reasoning : "I used Groq to recommend products based on the symptoms you shared.",
      usedGroq: true,
    };
  } catch (error) {
    console.error("Groq recommendation failed", error);
    return buildFallbackRecommendations(symptoms, products);
  }
}
