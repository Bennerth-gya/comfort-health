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
  },
  {
    id: 2,
    image: "/hero/black-computer-pharmacy.jpg",
    title: "Fast campus delivery\nwithin minutes",
    subtitle:
      "Get your medications delivered quickly and safely anywhere around campus.",
  },
  {
    id: 3,
    image: "/hero/oluman.jpg",
    title: "Your trusted online\ncampus pharmacy",
    subtitle:
      "Affordable healthcare products from trusted suppliers in Ghana.",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

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
    <section className="relative overflow-hidden rounded-[40px] bg-[#f4f8f5]">
      <div className="relative h-[550px] w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
            }`}
          >
            <div className="grid h-full grid-cols-1 items-center gap-10 px-8 lg:grid-cols-2 lg:px-16">
              
              {/* LEFT SIDE */}
              <div>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                  Trusted Campus Pharmacy
                </span>

                <h1 className="mt-6 whitespace-pre-line text-5xl font-bold leading-tight text-gray-900">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                  {slide.subtitle}
                </p>

                {/* Search removed per request */}
              </div>

              {/* RIGHT SIDE */}
              <div className="relative flex items-center justify-center">
                <Image
                  src={slide.image}
                  alt="Hero"
                  width={650}
                  height={650}
                  className="rounded-3xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
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
                ? "w-8 bg-emerald-600"
                : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}