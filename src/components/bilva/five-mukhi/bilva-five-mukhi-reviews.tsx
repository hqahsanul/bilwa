"use client";

import { useState } from "react";
import Image from "next/image";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { FIVE_MUKHI_DATA } from "@/data/bilva/five-mukhi-rudraksha";

function ArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#1C1C1C]/80 bg-transparent text-[#1C1C1C] transition-colors hover:bg-black/[0.04] sm:h-11 sm:w-11"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d={direction === "left" ? "M10 3.5 L5.5 8 L10 12.5" : "M6 3.5 L10.5 8 L6 12.5"}
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function BilvaFiveMukhiReviews() {
  const { reviews, hero } = FIVE_MUKHI_DATA;
  const [index, setIndex] = useState(0);
  const count = reviews.quotes.length;

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] py-0"
      aria-labelledby="five-mukhi-reviews-heading"
    >
      <div className={`${BILVA_SITE_FRAME_CLASS} relative overflow-hidden bg-[#F4EFE6]`}>
        {/* Temple column photograph — faded, matching the Figma backdrop */}
        <Image
          src={hero.imageSrc}
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-[78%_42%] opacity-[0.38]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F6F1E8]/92 via-[#F6F1E8]/78 to-[#F4EFE6]/35"
          aria-hidden
        />

        <div className={`relative z-[1] ${BILVA_SITE_SHELL_CLASS} py-12 sm:py-14 lg:py-16`}>
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4A4A4A] sm:text-[12px]">
              {reviews.eyebrow}
            </span>
            <h2
              id="five-mukhi-reviews-heading"
              className="mt-1.5 font-serif text-[clamp(2.15rem,3.8vw,3.05rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#102820]"
            >
              {reviews.title}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 sm:mt-12 sm:gap-8 lg:gap-14">
            <ArrowButton
              direction="left"
              label="Previous review"
              onClick={() => setIndex((i) => (i === 0 ? count - 1 : i - 1))}
            />

            <blockquote className="text-center font-serif text-[clamp(1rem,1.7vw,1.28rem)] font-medium italic leading-snug tracking-[0.08em] text-[#102820]">
              {reviews.quotes[index]}
            </blockquote>

            <ArrowButton
              direction="right"
              label="Next review"
              onClick={() => setIndex((i) => (i >= count - 1 ? 0 : i + 1))}
            />
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 sm:mt-8">
            {reviews.quotes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to review ${idx + 1}`}
                onClick={() => setIndex(idx)}
                className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${
                  index === idx
                    ? "bg-[#102820]"
                    : "border border-[#102820]/70 bg-transparent hover:border-[#102820]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
