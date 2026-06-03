"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";

type HeroSlide = {
  id: string;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  ctaText?: string | null;
  ctaUrl?: string | null;
};

type HeroSectionProps = {
  slides: HeroSlide[];
};

const defaultHeroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    imageUrl: "/hero/black-pharmacist.jpg",
    title: "Quality medicines,\ndelivered with care",
    subtitle:
      "Order genuine medicines and health products online and get them delivered discreetly to your campus.",
    ctaText: "Shop Now",
    ctaUrl: "/#full-catalog",
  },
  {
    id: "hero-2",
    imageUrl: "/hero/packaging.jpg",
    title: "Discrete Packaging,\nConfidential Service",
    subtitle: "Buy with confidence and remain fully private.",
    ctaText: "Order Now",
    ctaUrl: "/#full-catalog",
  },
  {
    id: "hero-3",
    imageUrl: "/hero/tablet-pharmacist.jpg",
    title: "Join our campus wellness community",
    subtitle:
      "Connect with pharmacists and get trusted health advice for student life.",
    ctaText: "Join Now",
    ctaUrl: "/#full-catalog",
  },
  {
    id: "hero-4",
    imageUrl: "/hero/delivery.jpg",
    title: "Fast, reliable delivery\nright to your doorstep",
    subtitle: "Delivered quickly and discreetly to you.",
    ctaText: "Explore Products",
    ctaUrl: "/#full-catalog",
  },
];

const AUTO_ADVANCE_MS = 9_000;

export default function HeroSection({ slides }: HeroSectionProps) {
  const availableSlides = slides.length > 0 ? slides : defaultHeroSlides;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === availableSlides.length - 1 ? 0 : prev + 1));
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [availableSlides.length]);

  const goTo = (index: number) => {
    setCurrent((index + availableSlides.length) % availableSlides.length);
  };

  const nextSlide = () => goTo(current + 1);
  const prevSlide = () => goTo(current - 1);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl">
      <div className="relative h-125 w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {availableSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative h-full w-full shrink-0"
              aria-hidden={index !== current}
            >
              <div className="absolute inset-0">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  unoptimized={shouldUnoptimizeProductImage(slide.imageUrl)}
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8 lg:px-16">
                <div className="max-w-2xl text-white">
                  <p className="mb-4 inline-flex items-center rounded-full bg-emerald-600/20 px-4 py-1 text-sm font-medium text-emerald-100">
                    Trusted Campus Pharmacy
                  </p>

                  <h1 className="whitespace-pre-line text-5xl font-bold leading-tight text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)]">
                    {slide.title}
                  </h1>

                  {slide.subtitle ? (
                    <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100/90">
                      {slide.subtitle}
                    </p>
                  ) : null}

                  {slide.ctaText ? (
                    <Link
                      href={slide.ctaUrl ?? "/#full-catalog"}
                      className="mt-8 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      {slide.ctaText}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {availableSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-3 rounded-full transition-all ${
              current === index ? "w-8 bg-green-600" : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
