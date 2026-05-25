"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image: "/hero/black-pharmacist.jpg",
    title: "Quality medicines,\ndelivered with care",
    subtitle:
      "Order genuine medicines and health products online and get them delivered discreetly to your campus.",
    button: "Shop Now",
  },
  {
    id: 2,
    image: "/hero/packaging.jpg",
    title: "Discrete Packaging,\nConfidential Service",
    subtitle:
      "",
    button: "Order Now",
  },
  {
    id: 3,
    image: "/hero/tablet-pharmacist.jpg",
    title: "Join our whatsapp community ",
    subtitle:
      "To interact with our pharmacists, and other health experts, and get personalized health advice.",
    button: "Join Now",
  },
  {
    id: 4,
    image: "/hero/delivery.jpg",
    title: "Fast, reliable delivery\nright to your doorstep",
    subtitle:
      "Delivered quickly and discreetly to you.",
    button: "Explore Products",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto change every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full overflow-hidden rounded-3xl">
      {/* Slides */}
      <div className="relative h-[500px] w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt="Hero"
                fill
                className="object-cover"
                priority
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

                <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100/90">
                  {slide.subtitle}
                </p>

                {/* Hero search and tags removed per request */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all ${
              current === index
                ? "w-8 bg-green-600"
                : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}