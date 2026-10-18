"use client";

import {
  ArrowLeft,
  HeartPulse,
  Mic,
  Send,
  ShoppingCart,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useCart } from "@/app/context/cartContext";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";
import { useSession } from "next-auth/react";
import PharmacyCallChooser from "@/components/PharmacyCallChooser";

type MessageRole = "user" | "assistant";

type RecommendedProduct = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string | null;
  prescriptionRequired?: boolean | null;
  reason: string;
};

type Message = {
  id: string;
  role: MessageRole;
  content: string;
  recommendations?: RecommendedProduct[];
  timestamp: Date;
};

type AiGuideResponse = {
  message?: string;
  recommendations?: RecommendedProduct[];
  error?: string;
};

type SpeechRecognitionResultLike = {
  isFinal?: boolean;
  [index: number]: {
    transcript?: string;
  } | undefined;
};

type SpeechRecognitionEventLike = {
  resultIndex?: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike | undefined;
  };
};

type SpeechRecognitionErrorEventLike = {
  error?: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type TranscriptionResponse = {
  text?: string;
  error?: string;
};

const OPENING_MESSAGE: Message = {
  id: "opening-message",
  role: "assistant",
  content:
    "Hi, I'm Comfort AI. Tell me what's bothering you and I'll help you explore suitable options from our pharmacy.\n\nWhat would you like help with today?",
  timestamp: new Date(0),
};

const QUICK_QUESTIONS = [
  "I have a headache",
  "Fever and chills",
  "Stomach pain",
  "Cough and cold",
  "I need vitamins",
  "I feel weak",
];

const DISCLAIMER_SESSION_KEY = "disclaimer_seen";
const AUDIO_MIME_TYPE_OPTIONS = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/ogg",
  "audio/mp4",
];
const MAX_RECORDED_AUDIO_MS = 20_000;

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getStringCandidate(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function userInitials(user: unknown) {
  if (!user || typeof user !== "object") {
    return "U";
  }

  const record = user as Record<string, unknown>;
  const primaryEmail = record.primaryEmail;
  const emailFromObject =
    primaryEmail && typeof primaryEmail === "object" && "email" in primaryEmail
      ? getStringCandidate((primaryEmail as { email?: unknown }).email)
      : null;

  const value =
    getStringCandidate(record.displayName) ??
    getStringCandidate(record.name) ??
    emailFromObject ??
    getStringCandidate(record.email) ??
    getStringCandidate(record.primary_email);

  if (!value) {
    return "U";
  }

  const namePart = value.includes("@") ? value.split("@")[0] ?? value : value;
  const parts = namePart
    .split(/[\s._-]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return namePart.slice(0, 2).toUpperCase();
}

function categoryEmoji(category?: string | null) {
  const value = (category ?? "").toLowerCase();

  if (value.includes("vitamin") || value.includes("supplement")) return "💊";
  if (value.includes("cold") || value.includes("flu") || value.includes("cough")) return "🤧";
  if (value.includes("pain")) return "🩹";
  if (value.includes("stomach") || value.includes("digest")) return "🌿";
  return "💚";
}

function formatPrice(price: number) {
  return `GHS ${Number(price || 0).toFixed(2)}`;
}

function supportedAudioMimeType() {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }

  return (
    AUDIO_MIME_TYPE_OPTIONS.find((mimeType) =>
      MediaRecorder.isTypeSupported(mimeType),
    ) ?? ""
  );
}

function audioFileExtension(mimeType: string) {
  const type = mimeType.toLowerCase().split(";")[0]?.trim();

  if (type === "audio/ogg") return "ogg";
  if (type === "audio/mp4") return "mp4";
  if (type === "audio/wav") return "wav";
  if (type === "audio/mpeg" || type === "audio/mp3") return "mp3";
  return "webm";
}

function getSpeechRecognitionConstructor() {
  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
}

function mergeVoiceText(base: string, transcript: string) {
  const normalizedTranscript = transcript.replace(/\s+/g, " ").trim();
  const normalizedBase = base.replace(/\s+/g, " ").trim();

  if (!normalizedBase) {
    return normalizedTranscript;
  }

  if (!normalizedTranscript) {
    return normalizedBase;
  }

  return `${normalizedBase} ${normalizedTranscript}`.trim();
}

function speechRecognitionErrorMessage(error?: string) {
  if (error === "not-allowed" || error === "service-not-allowed") {
    return "Microphone permission was blocked.";
  }

  if (error === "no-speech") {
    return "I could not hear anything clearly.";
  }

  if (error === "network") {
    return "Voice input needs a network connection.";
  }

  return "Voice input could not start.";
}

function recordingErrorMessage(error: unknown) {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError" || error.name === "SecurityError") {
      return "Microphone permission was blocked.";
    }

    if (error.name === "NotFoundError") {
      return "No microphone was found.";
    }
  }

  if (!window.isSecureContext) {
    return "Voice input needs HTTPS or localhost.";
  }

  return "Voice recording could not start.";
}

export default function AiGuidePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart } = useCart();
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [addedProducts, setAddedProducts] = useState<Record<string, boolean>>({});
  const [chatToast, setChatToast] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const voiceBaseInputRef = useRef("");
  const finalSpeechTranscriptRef = useRef("");
  const speechHeardRef = useRef(false);
  const speechRecognitionHadErrorRef = useRef(false);
  const recorderStopTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    let shouldShowDisclaimer = true;

    try {
      if (window.sessionStorage.getItem(DISCLAIMER_SESSION_KEY)) {
        shouldShowDisclaimer = false;
      } else {
        window.sessionStorage.setItem(DISCLAIMER_SESSION_KEY, "true");
      }
    } catch {
      shouldShowDisclaimer = true;
    }

    const timer = window.setTimeout(() => {
      setShowDisclaimer(shouldShowDisclaimer);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      const recorder = mediaRecorderRef.current;

      if (recorder && recorder.state !== "inactive") {
        recorder.onstop = null;
        recorder.stop();
      }

      audioStreamRef.current?.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;

      if (recorderStopTimerRef.current) {
        window.clearTimeout(recorderStopTimerRef.current);
      }

      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    setChatToast(message);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setChatToast(null);
    }, 2000);
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: createId("user"),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });
      const data = (await response.json()) as AiGuideResponse;

      if (!response.ok) {
        throw new Error(data.error ?? "AI guide request failed.");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId("assistant"),
          role: "assistant",
          content:
            data.message?.replace(/\*/g, "").trim() ??
            "I found a few products that may help. Please check the labels and speak with a pharmacist if symptoms persist.",
          recommendations: Array.isArray(data.recommendations)
            ? data.recommendations.map((product) => ({
                ...product,
                reason: product.reason.replace(/\*/g, "").trim(),
              }))
            : [],
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [
        ...current,
        {
          id: createId("assistant-error"),
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function stopAudioStream() {
    audioStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioStreamRef.current = null;
  }

  function clearRecorderStopTimer() {
    if (recorderStopTimerRef.current) {
      window.clearTimeout(recorderStopTimerRef.current);
      recorderStopTimerRef.current = null;
    }
  }

  function stopVoiceRecording() {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      clearRecorderStopTimer();
      recorder.stop();
      return;
    }

    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
  }

  async function transcribeVoiceBlob(blob: Blob) {
    const formData = new FormData();
    const mimeType = blob.type || "audio/webm";

    formData.append(
      "audio",
      blob,
      `comfort-ai-voice.${audioFileExtension(mimeType)}`,
    );

    const response = await fetch("/api/ai-guide/transcribe", {
      method: "POST",
      body: formData,
    });
    const data = (await response.json().catch(() => ({}))) as TranscriptionResponse;

    if (!response.ok) {
      throw new Error(data.error ?? "Voice transcription failed.");
    }

    return data.text?.trim() ?? "";
  }

  async function startRecordedVoiceInput() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      return false;
    }

    try {
      voiceBaseInputRef.current = input;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = supportedAudioMimeType();
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );

      audioChunksRef.current = [];
      audioStreamRef.current = stream;
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        clearRecorderStopTimer();
        showToast("Voice recording failed.");
        setIsRecording(false);
        mediaRecorderRef.current = null;
        stopAudioStream();
      };

      recorder.onstop = () => {
        clearRecorderStopTimer();
        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || mimeType || "audio/webm",
        });

        setIsRecording(false);
        mediaRecorderRef.current = null;
        stopAudioStream();

        if (audioBlob.size === 0) {
          showToast("I could not hear anything clearly.");
          return;
        }

        setIsTranscribing(true);
        void transcribeVoiceBlob(audioBlob)
          .then((transcript) => {
            if (!transcript) {
              showToast("I could not hear anything clearly.");
              return;
            }

            setInput(mergeVoiceText(voiceBaseInputRef.current, transcript));
            showToast("Voice captured");
          })
          .catch((error) => {
            console.error(error);
            showToast(
              error instanceof Error
                ? error.message
                : "Voice transcription failed.",
            );
          })
          .finally(() => {
            setIsTranscribing(false);
          });
      };

      recorder.start(1000);
      setIsRecording(true);
      showToast("Listening... tap the mic again when done.");
      recorderStopTimerRef.current = window.setTimeout(() => {
        if (recorder.state !== "inactive") {
          recorder.stop();
          showToast("Transcribing voice...");
        }
      }, MAX_RECORDED_AUDIO_MS);
      return true;
    } catch (error) {
      console.error(error);
      clearRecorderStopTimer();
      mediaRecorderRef.current = null;
      stopAudioStream();
      setIsRecording(false);
      showToast(recordingErrorMessage(error));
      return true;
    }
  }

  function startBrowserSpeechRecognition() {
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      return false;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = navigator.language?.startsWith("en")
        ? navigator.language
        : "en-US";
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      voiceBaseInputRef.current = input;
      finalSpeechTranscriptRef.current = "";
      speechHeardRef.current = false;
      speechRecognitionHadErrorRef.current = false;
      recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let index = 0; index < event.results.length; index += 1) {
          const result = event.results[index];
          const transcript = result?.[0]?.transcript?.trim();

          if (!transcript) {
            continue;
          }

          speechHeardRef.current = true;

          if (result?.isFinal) {
            finalTranscript = mergeVoiceText(finalTranscript, transcript);
          } else {
            interimTranscript = mergeVoiceText(interimTranscript, transcript);
          }
        }

        finalSpeechTranscriptRef.current = finalTranscript;
        const visibleTranscript = mergeVoiceText(finalTranscript, interimTranscript);

        if (visibleTranscript) {
          setInput(mergeVoiceText(voiceBaseInputRef.current, visibleTranscript));
        }
      };
      recognition.onerror = (event) => {
        speechRecognitionHadErrorRef.current = true;
        showToast(speechRecognitionErrorMessage(event.error));
        setIsRecording(false);
        recognitionRef.current = null;
      };
      recognition.onend = () => {
        setIsRecording(false);
        recognitionRef.current = null;

        if (speechHeardRef.current) {
          showToast("Voice captured");
        } else if (!speechRecognitionHadErrorRef.current) {
          showToast("I could not hear anything clearly.");
        }
      };

      recognitionRef.current = recognition;
      setIsRecording(true);
      showToast("Listening... speak now.");
      recognition.start();
      return true;
    } catch {
      setIsRecording(false);
      recognitionRef.current = null;
      return false;
    }
  }

  async function startVoiceInput() {
    if (isTranscribing) {
      return;
    }

    if (isRecording) {
      stopVoiceRecording();
      return;
    }

    if (startBrowserSpeechRecognition()) {
      return;
    }

    const startedRecorder = await startRecordedVoiceInput();

    if (startedRecorder) {
      return;
    }

    showToast("Voice input is not supported in this browser.");
  }

  function handleAddToCart(product: RecommendedProduct, messageId: string) {
    if (product.prescriptionRequired) {
      showToast("Prescription review required");
      return;
    }

    const productKey = `${messageId}:${product.id}`;

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.imageUrl ?? "",
      category: product.category,
      quantity: 1,
    });

    setAddedProducts((current) => ({ ...current, [productKey]: true }));
    showToast("Added to cart");

    window.setTimeout(() => {
      setAddedProducts((current) => ({ ...current, [productKey]: false }));
    }, 2000);
  }

  const initials = userInitials(session?.user);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f4f7f2] text-[#183326]">
      <nav className="flex h-17 flex-none items-center bg-[#163d2b] px-4 shadow-sm">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3">
          <button
            type="button"
            aria-label="Back to shop"
            onClick={() => router.push("/")}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#b7e5c0] transition hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex min-w-0 items-center justify-center gap-2">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f8e9] text-[#17633c]">
              <HeartPulse className="h-4 w-4" aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#163d2b] bg-[#83c780]" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold leading-tight text-white">
                Comfort AI
              </p>
              <p className="truncate text-[11px] leading-tight text-[#b7e5c0]">
                Your pharmacy health guide
              </p>
            </div>
          </div>

          <span className="hidden items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-medium text-[#e3f2df] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#83c780]" />
            Here to help
          </span>
        </div>
      </nav>

      <div className="flex flex-none items-center justify-between gap-3 border-b border-[#eadfca] bg-[#fffaf0] px-4 py-2.5 sm:px-6">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-[#72532a]">
            <ShieldCheck size={16} aria-hidden="true" />
            <p className="truncate text-xs font-medium sm:text-sm">
              Prefer advice from a pharmacist?
            </p>
          </div>
          <PharmacyCallChooser
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-[#72532a] transition hover:bg-[#f5ecd9] sm:px-4"
          >
            <span className="inline-flex items-center gap-1.5"><Phone size={13} aria-hidden="true" /> Call pharmacist</span>
          </PharmacyCallChooser>
        </div>
      </div>

      {showDisclaimer ? (
        <div className="mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-5xl gap-2 rounded-xl border border-[#eadfca] bg-[#fffaf0] px-3.5 py-2.5 text-xs leading-snug text-[#72532a]">
          <span className="text-sm" aria-hidden="true">
            ⚠️
          </span>
          <p>
            Wellness guide only. This is not a medical diagnosis. Always consult a
            licensed pharmacist or doctor for serious conditions.
          </p>
        </div>
      ) : null}

      <main
        aria-live="polite"
        className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-6 sm:px-6 sm:pt-8"
      >
        <div className="mx-auto max-w-3xl">
          <header className="mb-7 border-b border-[#dce7dc] pb-6 sm:mb-9 sm:pb-7">
            <div className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase text-[#39734d]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              A little support, whenever you need it
            </div>
            <h1 className="max-w-xl text-[28px] font-semibold leading-[1.12] text-[#183326] sm:text-[36px]">
              Let’s find a helpful next step.
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#627267] sm:text-[15px]">
              Share how you’re feeling. Comfort AI can help you explore pharmacy options and when to speak with a professional.
            </p>
          </header>

          <div className="flex flex-col gap-4">
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
              >
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                    isUser
                        ? "bg-[#dcebdc] text-[#285c3a]"
                        : "bg-[#dcebdc] text-[#285c3a]"
                  }`}
                  aria-hidden="true"
                >
                  {isUser ? (
                    initials
                  ) : (
                    <HeartPulse className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </div>

                <div
                    className={`max-w-[88%] wrap-break-word px-4 py-3.5 text-sm leading-[1.7] sm:max-w-[82%] sm:px-5 ${
                    isUser
                        ? "rounded-[20px] rounded-br-[5px] bg-[#24643f] text-white shadow-sm"
                        : "rounded-[20px] rounded-bl-[5px] border border-[#dce7dc] bg-white text-[#243b2e] shadow-[0_3px_16px_rgba(32,68,44,0.04)]"
                  }`}
                >
                  {!isUser ? (
                    <p className="mb-1 text-[10px] font-bold uppercase text-[#53815d]">
                      Comfort AI
                    </p>
                  ) : null}
                  <p className="whitespace-pre-line">{message.content}</p>

                  {!isUser && message.recommendations?.length ? (
                    <div className="mt-4 space-y-2.5">
                      {message.recommendations.map((product) => {
                        const productKey = `${message.id}:${product.id}`;
                        const wasAdded = Boolean(addedProducts[productKey]);
                        const addDisabled =
                          wasAdded || Boolean(product.prescriptionRequired);

                        return (
                          <div
                            key={product.id}
                            className="overflow-hidden rounded-xl border border-[#d3e4d2] bg-[#f6faf3] p-3 shadow-[0_2px_8px_rgba(32,68,44,0.04)] transition-colors hover:border-[#a8c8aa]"
                          >
                            <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-[#e1e9dc] bg-white text-5xl">
                              {product.imageUrl ? (
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  width={160}
                                  height={160}
                                  unoptimized={shouldUnoptimizeProductImage(
                                    product.imageUrl,
                                  )}
                                  className="h-full w-full object-contain p-3"
                                />
                              ) : (
                                <span aria-hidden="true">
                                  {categoryEmoji(product.category)}
                                </span>
                              )}
                            </div>

                            <div className="mt-3 min-w-0">
                              <p className="text-sm font-semibold leading-snug text-[#244d32]">
                                {product.name}
                              </p>
                              <p className="mt-1.5 text-xs leading-relaxed text-[#52745a]">
                                {product.reason}
                              </p>
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                              <p className="text-[13px] font-bold text-[#24643f]">
                                {formatPrice(product.price)}
                              </p>
                              <button
                                type="button"
                                disabled={addDisabled}
                                onClick={() => handleAddToCart(product, message.id)}
                                className={`min-h-9 rounded-lg px-3 py-2 text-xs font-semibold text-white transition disabled:cursor-not-allowed ${
                                  wasAdded
                                    ? "bg-[#059669]"
                                    : product.prescriptionRequired
                                      ? "bg-gray-400"
                                      : "bg-[#24643f] hover:bg-[#194b2d]"
                                }`}
                              >
                                {wasAdded
                                  ? "✓ Added"
                                  : product.prescriptionRequired
                                    ? "Prescription"
                                    : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}

          {isLoading ? (
            <div className="flex items-end gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dcebdc] text-[#285c3a]">
                <HeartPulse className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
              <div
                role="status"
                aria-label="Comfort AI is typing"
                className="flex max-w-[80%] items-center gap-1 rounded-[20px] rounded-bl-[5px] border border-[#dce7dc] bg-white px-4 py-3.5"
              >
                <span className="ai-guide-dot h-1.5 w-1.5 rounded-full bg-[#15803d]" />
                <span className="ai-guide-dot h-1.5 w-1.5 rounded-full bg-[#15803d] [animation-delay:0.2s]" />
                <span className="ai-guide-dot h-1.5 w-1.5 rounded-full bg-[#15803d] [animation-delay:0.4s]" />
              </div>
            </div>
          ) : null}

          <div ref={chatEndRef} />
          </div>
        </div>
      </main>

      <div className="z-30 flex-none border-t border-[#dce7dc] bg-white px-4 pb-3 pt-3 shadow-[0_-8px_24px_rgba(32,68,44,0.05)] safe-bottom sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2">
            <p className="mb-1.5 text-[10px] font-semibold uppercase text-[#738276]">Try asking</p>
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setInput(question);
                    void sendMessage(question);
                  }}
                  className="shrink-0 rounded-full border border-[#d4e7d5] bg-[#f5faf2] px-3.5 py-2 text-xs font-medium text-[#315c3d] transition hover:bg-[#e8f2e4] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-1 rounded-2xl border border-[#cbdccc] bg-[#f8faf6] px-1.5 shadow-inner focus-within:border-[#6a9a70]">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Tell me how you’re feeling..."
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[#183326] outline-none placeholder:text-[#859188]"
              />

              <button
                type="button"
                aria-label={isRecording ? "Stop voice input" : "Voice input"}
                disabled={isTranscribing}
                onClick={() => void startVoiceInput()}
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#315c3d] transition hover:bg-[#e8f2e4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Mic className="h-4 w-4" aria-hidden="true" />
                {isRecording ? (
                  <span className="ai-guide-recording absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                ) : isTranscribing ? (
                  <span className="ai-guide-transcribing absolute right-1 top-1 h-2 w-2 rounded-full bg-[#15803d]" />
                ) : null}
              </button>

              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#24643f] text-white transition hover:bg-[#194b2d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-[10px] text-[#7b887e]">
            Product suggestions are not a diagnosis or a substitute for medical advice.
          </p>
        </div>
      </div>

      {chatToast ? (
        <div className="fixed bottom-32 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#183326] px-4 py-2 text-xs font-semibold text-white shadow-lg">
          <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
          {chatToast}
        </div>
      ) : null}

      <style>{`
        @keyframes ai-guide-dot-bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
        }

        @keyframes ai-guide-recording-pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.9);
            opacity: 0.2;
          }
        }

        .ai-guide-dot {
          animation: ai-guide-dot-bounce 1s infinite ease-in-out;
        }

        .ai-guide-recording {
          animation: ai-guide-recording-pulse 0.9s infinite ease-out;
        }

        .ai-guide-transcribing {
          animation: ai-guide-recording-pulse 1s infinite ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-guide-dot,
          .ai-guide-recording,
          .ai-guide-transcribing {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
