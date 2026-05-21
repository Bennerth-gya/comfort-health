"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

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
    image: "/hero/black-computer-pharmacy.jpg",
    title: "Fast campus delivery\nwithin minutes",
    subtitle:
      "Get your medications delivered quickly and safely anywhere around campus.",
    button: "Order Now",
  },
  {
    id: 3,
    image: "/hero/oluman.jpg",
    title: "Your trusted online\ncampus pharmacy",
    subtitle:
      "Affordable healthcare products from trusted suppliers in Ghana.",
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
    <section className="relative w-full overflow-hidden rounded-3xl bg-[#f4f8f5]">
      {/* Slides */}
      <div className="relative h-[500px] w-800px mx-auto">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
            }`}
          >
            <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-10 items-center px-8 lg:px-16">
              
              {/* LEFT TEXT */}
              <div className="z-20">
                <p className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                  Trusted Campus Pharmacy
                </p>

                <h1 className="whitespace-pre-line text-5xl font-bold leading-tight text-gray-900">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                  {slide.subtitle}
                </p>

                {/* Search Box */}
                <div className="mt-8 flex max-w-xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <input
                    type="text"
                    placeholder="Search medicines, vitamins, health products..."
                    className="w-full px-5 py-4 text-sm outline-none text-gray-600"
                  />

                  <button className="flex items-center gap-2 bg-green-600 px-6 text-sm font-semibold text-white hover:bg-green-700">
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    "Panadol",
                    "Condoms",
                    "Vitamin C",
                    "Cough Syrup",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative flex items-center justify-center">
                <Image
                  src={slide.image}
                  alt="Hero"
                  width={650}
                  height={650}
                  className="object-contain"
                  priority
                />
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