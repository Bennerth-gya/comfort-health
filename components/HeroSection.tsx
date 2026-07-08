"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    title: "Join our community",
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

const AUTO_ADVANCE_MS = 4_000;

function safeCtaHref(value?: string | null) {
  if (!value) return "/#full-catalog";
  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    const url = new URL(value);
    if (url.protocol === "https:") {
      return value;
    }
  } catch {
    return "/#full-catalog";
  }

  return "/#full-catalog";
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const availableSlides = slides.length > 0 ? slides : defaultHeroSlides;
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = prev === availableSlides.length - 1 ? 0 : prev + 1;
        const scroller = scrollerRef.current;

        if (scroller) {
          scroller.scrollTo({
            left: next * scroller.clientWidth,
            behavior: "smooth",
          });
        }

        return next;
      });
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [availableSlides.length]);

  const goTo = (index: number) => {
    const next = (index + availableSlides.length) % availableSlides.length;
    setCurrent(next);
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.scrollTo({
        left: next * scroller.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const next = Math.round(scroller.scrollLeft / scroller.clientWidth);
    if (next !== current) {
      setCurrent(next);
    }
  };

  return (
    <section className="relative mx-3 overflow-hidden rounded-2xl md:mx-0">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex h-40 snap-x snap-mandatory overflow-x-auto scroll-smooth md:h-80"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {availableSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative h-full w-full shrink-0 snap-start overflow-hidden"
            aria-hidden={index !== current}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              unoptimized={shouldUnoptimizeProductImage(slide.imageUrl)}
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) calc(100vw - 24px), 960px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
            <div className="relative z-10 flex h-full max-w-[74%] flex-col justify-center px-4 text-white md:max-w-xl md:px-8">
              <h1 className="line-clamp-2 whitespace-pre-line text-xl font-bold leading-tight text-white md:text-3xl">
                {slide.title}
              </h1>
              {slide.subtitle ? (
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.5] text-emerald-50 md:text-base">
                  {slide.subtitle}
                </p>
              ) : null}
              {slide.ctaText ? (
                <Link
                  href={safeCtaHref(slide.ctaUrl)}
              className="mt-3 inline-flex h-9 w-fit items-center justify-center rounded-full bg-[#15803d] px-4 text-[13px] font-semibold text-white transition-all duration-100 active:scale-[0.97] active:opacity-90"
                >
                  {slide.ctaText}
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
        {availableSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-[5px] rounded-full transition-all duration-100 ${
              current === index ? "w-[14px] bg-[#15803d]" : "w-[5px] bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
