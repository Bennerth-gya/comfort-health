import Groq, { APIError, toFile } from "groq-sdk";
import { NextResponse } from "next/server";
import {
  assertRequestBodySize,
  assertSameOrigin,
  rateLimitRequest,
  RequestSecurityError,
} from "@/lib/request-security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

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
const AUDIO_TYPE_ALIASES: Record<string, string> = {
  "audio/wave": "audio/wav",
  "audio/x-m4a": "audio/m4a",
  "audio/x-wav": "audio/wav",
  "audio/vnd.wave": "audio/wav",
};
const AUDIO_EXTENSION_TYPES: Record<string, string> = {
  flac: "audio/flac",
  m4a: "audio/m4a",
  mp3: "audio/mpeg",
  mp4: "audio/mp4",
  mpeg: "audio/mpeg",
  mpga: "audio/mpga",
  ogg: "audio/ogg",
  wav: "audio/wav",
  webm: "audio/webm",
};

function isMultipartFormData(request: Request) {
  return request.headers
    .get("content-type")
    ?.toLowerCase()
    .includes("multipart/form-data");
}

function baseMimeType(value: string) {
  return value.toLowerCase().split(";")[0]?.trim() ?? "";
}

function audioFileExtension(mimeType: string) {
  const type = baseMimeType(mimeType);

  if (type === "audio/flac") return "flac";
  if (type === "audio/m4a") return "m4a";
  if (type === "audio/mp4" || type === "video/mp4") return "mp4";
  if (type === "audio/ogg") return "ogg";
  if (type === "audio/wav") return "wav";
  if (type === "audio/mpeg" || type === "audio/mp3") return "mp3";
  return "webm";
}

function normalizedAudioMimeType(file: File) {
  const baseType = baseMimeType(file.type);
  const aliasType = AUDIO_TYPE_ALIASES[baseType] ?? baseType;

  if (SUPPORTED_AUDIO_TYPES.includes(aliasType)) {
    return aliasType;
  }

  const extension = file.name.toLowerCase().split(".").pop() ?? "";
  return AUDIO_EXTENSION_TYPES[extension] ?? "";
}

function isSupportedAudioFile(file: File) {
  return Boolean(normalizedAudioMimeType(file));
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

    const uploadMimeType = normalizedAudioMimeType(audio);
    const uploadFile = await toFile(
      await audio.arrayBuffer(),
      audio.name || `comfort-ai-voice.${audioFileExtension(uploadMimeType)}`,
      { type: uploadMimeType },
    );
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const transcription = await groq.audio.transcriptions.create({
      file: uploadFile,
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
