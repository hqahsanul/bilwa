"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

import { HERO_SLIDES, type BilvaHeroSlide } from "@/data/bilva/hero";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";

export function BilvaHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = HERO_SLIDES;
  const currentSlide = slides[currentIndex] as BilvaHeroSlide;
  const totalSlides = slides.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Autoplay timer with smooth segmented progress
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 7000;
    const stepTime = 100;
    const increment = (stepTime / intervalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Keyboard arrow navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 50) {
      goToNext();
    } else if (deltaX < -50) {
      goToPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="bilva-section relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Bilwa Signature Collection Hero"
    >
      {/* Same max-w-7xl column as navbar / signature / legacy / footer */}
      <div
        className={cn(
          BILVA_SITE_FRAME_CLASS,
          "relative overflow-hidden h-[min(72svh,640px)] min-h-[440px] max-h-[640px] sm:h-[calc(100svh-110px)] sm:min-h-[520px] sm:max-h-[780px] lg:max-h-[860px] flex flex-col justify-start pt-20 pb-24 sm:justify-center sm:pt-0 sm:pb-0",
        )}
      >
      {/* 1. BACKGROUND PHOTO — clipped to content column */}
      <div className="absolute inset-0 pointer-events-none">
        {slides.map((s, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={s.imageSrc}
                  alt={s.imageAlt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-right"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />

                {/* Very subtle left-side fade to let text sit cleanly on the warm stone background of the photo */}
                <div className="absolute inset-y-0 left-0 w-[55%] lg:w-[48%] bg-gradient-to-r from-[#FAF7F2]/90 via-[#FAF7F2]/30 to-transparent pointer-events-none" />

                {/* Mobile: stronger overlay for legibility */}
                <div className="absolute inset-0 bg-[#FAF7F2]/65 sm:hidden pointer-events-none" />

                {/* Gentle vignette on bottom for bottom control bar contrast */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. VERTICAL 'SIGNATURE SERIES' BADGE (Pinned to top-right of column) */}
      <div className="absolute top-5 sm:top-10 right-3 sm:right-8 lg:right-12 z-30 flex flex-col items-center select-none pointer-events-none">
        <span className="w-[1px] h-5 sm:h-6 bg-[#B6914C] mb-1.5 sm:mb-2 opacity-90" />
        <span className="text-[9px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] sm:tracking-[0.28em] text-[#B6914C] uppercase [writing-mode:vertical-rl] drop-shadow-xs">
          {currentSlide.seriesTag}
        </span>
      </div>

      {/* 3. MAIN EDITORIAL CONTENT (Left Column) */}
      <div className="relative w-full px-4 sm:px-8 lg:px-12 z-10">
        <div className="max-w-[520px] lg:max-w-[580px]">
          {/* Eyebrow in warm gold mustard */}
          <div className="mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-[12.5px] font-sans font-semibold tracking-[0.24em] text-[#B6914C] uppercase">
              {currentSlide.eyebrow}
            </span>
          </div>

          {/* Headline in Deep Green Serif */}
          <h1 className="font-serif text-[32px] sm:text-[48px] lg:text-[58px] xl:text-[64px] leading-[1.1] tracking-[-0.015em] text-[#0A2D23] font-semibold mb-3 sm:mb-5">
            <span>{currentSlide.headlineLine1}</span>
            <br />
            <span>{currentSlide.headlineLine2}</span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-[14.5px] sm:text-[16px] text-[#334D44] font-normal leading-relaxed max-w-md mb-6 sm:mb-8">
            <span>{currentSlide.descriptionLine1}</span>
            <br className="hidden sm:inline" />
            <span>{currentSlide.descriptionLine2}</span>
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7">
            {/* Primary Emerald Button */}
            <a
              href={currentSlide.primaryCtaHref}
              className="inline-flex items-center justify-center rounded-[3px] bg-[#064E3B] hover:bg-[#033629] active:scale-[0.98] text-[#FFFFFF] px-6 sm:px-7 py-3 sm:py-3.5 text-[13.5px] sm:text-[14px] font-sans font-medium tracking-[0.02em] transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>{currentSlide.primaryCtaText}</span>
            </a>

            {/* Secondary Underlined Heritage Link */}
            <a
              href={currentSlide.secondaryCtaHref}
              className="inline-flex items-center gap-2 text-[14.5px] font-medium text-[#0A2D23] hover:text-[#B6914C] transition-colors py-1 group cursor-pointer"
            >
              <span className="border-b border-[#0A2D23] group-hover:border-[#B6914C] transition-colors pb-0.5">
                {currentSlide.secondaryCtaText}
              </span>
              <span className="text-[16px] leading-none transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. EXACT BOTTOM CONTROLS ROW */}
      <div className="absolute bottom-4 sm:bottom-7 left-0 right-0 z-20 pointer-events-none">
        <div className="px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-2 max-sm:gap-1">
          {/* Left Controls: Slide Number + 3 Segmented Pill Bars */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-5 min-w-0">
            <span className="font-sans text-[11px] sm:text-[13px] tracking-wider text-[#0A2D23] font-semibold shrink-0">
              {currentSlide.number} / 0{totalSlides}
            </span>

            {/* 3 Segmented Progress Bars (Active is warm gold, inactive is soft sage) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {slides.map((s, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className="relative h-1 w-8 sm:w-14 rounded-full bg-[#CAD5CF] overflow-hidden cursor-pointer transition-colors shrink-0"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {isCurrent ? (
                      <div
                        className="absolute top-0 left-0 bottom-0 bg-[#C29648] transition-all duration-100 ease-linear rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    ) : (
                      <div
                        className={`w-full h-full rounded-full transition-colors ${
                          idx < currentIndex ? "bg-[#C29648]/80" : "bg-transparent"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Controls: 'UP NEXT / The art of silver' + Circular Arrow Buttons */}
          <div className="pointer-events-auto flex items-center gap-3 sm:gap-5">
            {/* UP NEXT Text (Hidden on mobile < sm, visible on tablet and desktop) */}
            <button
              onClick={goToNext}
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 transition-opacity cursor-pointer group hover:opacity-90"
              aria-label={`Next: ${currentSlide.upNextTitle}`}
            >
              <span className="text-white/75 font-sans text-[11px] font-medium tracking-[0.18em] uppercase drop-shadow-xs">
                UP NEXT
              </span>
              <span className="text-white/40 text-[11px] font-light">/</span>
              <span className="text-white font-sans text-[13px] sm:text-[13.5px] font-medium tracking-[0.02em] drop-shadow-xs">
                {currentSlide.upNextTitle}
              </span>
            </button>

            {/* Circular Arrow Buttons with Thin White Circular Border */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                aria-label="Previous slide"
                className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/75 bg-white/5 hover:bg-white/20 hover:border-white text-white transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-[1px]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                aria-label="Next slide"
                className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/75 bg-white/5 hover:bg-white/20 hover:border-white text-white transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-[1px]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}