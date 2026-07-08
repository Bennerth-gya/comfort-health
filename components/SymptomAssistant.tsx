"use client";

import { useState } from "react";
import Link from "next/link";

type RecommendationItem = {
  id: string;
  name: string;
  category?: string | null;
  price: string;
  description?: string | null;
  imageUrl?: string | null;
};

type RecommendationResponse = {
  recommendations?: RecommendationItem[];
  reasoning?: string;
  usedGroq?: boolean;
  error?: string;
};

export default function SymptomAssistant() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Array<{ id: string; name: string; category?: string | null; price: string; description?: string | null; imageUrl?: string | null }>>([]);
  const [reasoning, setReasoning] = useState("");
  const [usedGroq, setUsedGroq] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setRecommendations([]);
    setReasoning("");
    setUsedGroq(false);

    try {
      const response = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      const rawText = await response.text();
      let data: RecommendationResponse | null = null;

      if (rawText) {
        try {
          data = JSON.parse(rawText) as RecommendationResponse;
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        setReasoning(data?.error ?? "I could not prepare recommendations right now. Please try again in a moment.");
        return;
      }

      setRecommendations(data?.recommendations ?? []);
      setReasoning(data?.reasoning ?? "");
      setUsedGroq(Boolean(data?.usedGroq));
    } catch (error) {
      console.error(error);
      setReasoning("I could not prepare recommendations right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-[32px] border border-emerald-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">AI health guide</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Tell us how you feel and we’ll suggest suitable products</h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            Describe symptoms like fever, pain, cough, or stomach issues and we’ll match them with products from the catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={symptoms}
            onChange={(event) => setSymptoms(event.target.value)}
            rows={4}
            placeholder="Example: I have a fever, headache, and blocked nose"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none ring-0 focus:border-emerald-500"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Checking..." : "Get recommendations"}
            </button>
            <p className="text-sm text-gray-500">This is a wellness guide, not a diagnosis.</p>
          </div>
        </form>

        {reasoning ? (
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-medium">Why these suggestions?</p>
            <p className="mt-1">{reasoning}</p>
            {usedGroq ? <p className="mt-2 text-xs text-emerald-700">Enhanced by Groq AI.</p> : null}
          </div>
        ) : null}

        {recommendations.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {recommendations.map((product) => (
              <div key={product.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{product.category ?? "Wellness"}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-700">GH¢{product.price}</span>
                </div>
                {product.description ? <p className="mt-3 text-sm text-gray-600">{product.description}</p> : null}
                <Link href={`/products/${product.id}`} className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                  View product →
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
