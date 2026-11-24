"use client";

import { useState } from "react";
import Image from "next/image";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { LAKSHMI_SILVER_COIN_DATA } from "@/data/bilva/lakshmi-silver-coin";

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
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#1A1A1A]/70 bg-transparent text-[#1A1A1A] hover:bg-black/[0.04]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d={direction === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function BilvaLakshmiSilverReviews() {
  const { reviews, hero } = LAKSHMI_SILVER_COIN_DATA;
  const [index, setIndex] = useState(0);
  const count = reviews.quotes.length;
  const lines = reviews.quotes[index].split("\n");

  return (
    <section className="w-full select-none bg-[#FAF7F2] py-0" aria-labelledby="silver-reviews-heading">
      <div className={`${BILVA_SITE_FRAME_CLASS} relative overflow-hidden bg-[#F6F1E8]`}>
        <Image
          src={hero.imageSrc}
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-[88%_45%] opacity-40"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F7F3EC] via-[#F7F3EC]/88 to-[#F3EEE4]/25" aria-hidden />

        <div className={`relative z-[1] ${BILVA_SITE_SHELL_CLASS} py-12 sm:py-14`}>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C5C5C]">
            {reviews.eyebrow}
          </span>
          <h2
            id="silver-reviews-heading"
            className="mt-2 font-serif text-[clamp(2.15rem,3.6vw,2.95rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#102820]"
          >
            {reviews.title}
          </h2>

          <div className="mt-12 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 sm:mt-14 sm:gap-8">
            <ArrowButton
              direction="left"
              label="Previous review"
              onClick={() => setIndex((i) => (i === 0 ? count - 1 : i - 1))}
            />
            <div className="mx-auto w-full max-w-3xl bg-[#F4EBDD] px-8 py-7 [transform:skewX(-10deg)] sm:px-14 sm:py-8">
              <blockquote className="text-center font-serif text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold leading-snug tracking-[0.14em] text-[#163028] [transform:skewX(10deg)]">
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </blockquote>
            </div>
            <ArrowButton
              direction="right"
              label="Next review"
              onClick={() => setIndex((i) => (i >= count - 1 ? 0 : i + 1))}
            />
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {reviews.quotes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to review ${idx + 1}`}
                onClick={() => setIndex(idx)}
                className={`h-2 w-2 cursor-pointer rounded-full ${
                  index === idx ? "bg-[#1A1A1A]" : "border border-[#1A1A1A]/80 bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
