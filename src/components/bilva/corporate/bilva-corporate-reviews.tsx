"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { CORPORATE_GIFTING_DATA } from "@/data/bilva/corporate-gifting";

export function BilvaCorporateReviews() {
  const { reviews } = CORPORATE_GIFTING_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = reviews.cards.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= slideCount - 1 ? 0 : prev + 1));
  };

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] pb-10 pt-0 sm:pb-12 lg:pb-14"
      aria-labelledby="corporate-reviews-heading"
    >
      {/* Same cream + frame width as the configurator band */}
      <div className={`${BILVA_SITE_FRAME_CLASS} bg-[#F3EEE3] py-14 sm:py-16 lg:py-[4.5rem]`}>
        <div className={BILVA_SITE_SHELL_CLASS}>
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6F3E] sm:text-[12px]">
              {reviews.eyebrow}
            </span>
            <h2
              id="corporate-reviews-heading"
              className="mt-2 font-serif text-[clamp(2.1rem,3.8vw,3rem)] font-medium leading-[1.12] tracking-[-0.015em] text-[#0A2D23]"
            >
              {reviews.title}
            </h2>
          </div>

          <div className="mt-8 flex items-center gap-3 sm:mt-9 sm:gap-4">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous review"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#D9D1C4] bg-[#FAF8F5] text-[#2C4A3E] shadow-[0_2px_10px_rgba(40,55,45,0.07)] transition-colors hover:bg-white sm:h-11 sm:w-11"
            >
              <ChevronLeft size={18} strokeWidth={1.6} />
            </button>

            <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {[0, 1].map((offset) => {
                const card = reviews.cards[(currentIndex + offset) % reviews.cards.length];
                return (
                  <div
                    key={`${card.id}-${offset}`}
                    className="flex min-h-[158px] items-center justify-center rounded-[22px] border border-[#E8E1D6] bg-[#FDFCFA] px-8 py-11 text-center shadow-[0_2px_14px_rgba(40,55,45,0.035)] sm:min-h-[176px] sm:rounded-[24px] sm:px-11 sm:py-12 lg:min-h-[188px]"
                  >
                    <blockquote className="font-serif text-[clamp(1.1rem,1.9vw,1.4rem)] font-medium italic leading-relaxed tracking-[0.01em] text-[#0E3D36]">
                      {card.quote}
                    </blockquote>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next review"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#D9D1C4] bg-[#FAF8F5] text-[#2C4A3E] shadow-[0_2px_10px_rgba(40,55,45,0.07)] transition-colors hover:bg-white sm:h-11 sm:w-11"
            >
              <ChevronRight size={18} strokeWidth={1.6} />
            </button>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 sm:mt-8">
            {Array.from({ length: slideCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  currentIndex === idx ? "w-6 bg-[#0E3D36]" : "w-2 bg-[#D4DFD7] hover:bg-[#A9BCB2]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
