import Groq, { APIError } from "groq-sdk";
import { NextResponse } from "next/server";
import {
  assertRequestBodySize,
  assertSameOrigin,
  rateLimitRequest,
  RequestSecurityError,
} from "@/lib/request-security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 8 * 1024 * 1024;
const SUPPORTED_AUDIO_TYPES = [
  "audio/flac",
  "audio/mp3",
  "audio/mp4",
  "audio/mpeg",
  "audio/mpga",
  "audio/m4a",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
  "video/mp4",
  "video/webm",
];

function isMultipartFormData(request: Request) {
  return request.headers
    .get("content-type")
    ?.toLowerCase()
    .includes("multipart/form-data");
}

function baseMimeType(value: string) {
  return value.toLowerCase().split(";")[0]?.trim() ?? "";
}

function isSupportedAudioFile(file: File) {
  return SUPPORTED_AUDIO_TYPES.includes(baseMimeType(file.type));
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    assertRequestBodySize(request, MAX_AUDIO_BYTES + 16_384);

    if (!isMultipartFormData(request)) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data." },
        { status: 415 },
      );
    }

    await rateLimitRequest(request, "ai-guide:transcribe", {
      limit: 10,
      windowMs: 60_000,
    });

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const audio = formData.get("audio");

    if (!(audio instanceof File)) {
      return NextResponse.json(
        { error: "Please upload an audio file." },
        { status: 400 },
      );
    }

    if (audio.size === 0) {
      return NextResponse.json(
        { error: "The audio recording is empty." },
        { status: 400 },
      );
    }

    if (audio.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: "Audio recording is too large." },
        { status: 413 },
      );
    }

    if (!isSupportedAudioFile(audio)) {
      return NextResponse.json(
        { error: "Unsupported audio format." },
        { status: 415 },
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const transcription = await groq.audio.transcriptions.create({
      file: audio,
      model: "whisper-large-v3-turbo",
      language: "en",
      response_format: "json",
      temperature: 0,
      prompt:
        "Health symptoms and pharmacy product requests in Ghanaian English.",
    });
    const text = transcription.text.trim();

    if (!text) {
      return NextResponse.json(
        { error: "I could not hear anything clearly. Please try again." },
        { status: 422 },
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI guide transcription failed", error);

    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof APIError) {
      return NextResponse.json(
        { error: "Voice transcription failed. Please try again." },
        { status: error.status >= 400 && error.status < 500 ? 400 : 502 },
      );
    }

    return NextResponse.json(
      { error: "Failed to transcribe voice input." },
      { status: 500 },
    );
  }
}
