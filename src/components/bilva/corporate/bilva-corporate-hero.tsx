"use client";

import Image from "next/image";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { CORPORATE_GIFTING_DATA } from "@/data/bilva/corporate-gifting";

export function BilvaCorporateHero() {
  const { hero } = CORPORATE_GIFTING_DATA;
  const headlineLines = hero.headline.split("\n");
  const eyebrowLines = hero.eyebrow.split("\n");

  return (
    <section
      className="relative w-full select-none bg-[#FAF7F2]"
      aria-label="Corporate Signature Collection"
    >
      {/* Shell-width media frame — matches homepage hero / site column */}
      <div
        className={`${BILVA_SITE_FRAME_CLASS} relative h-[460px] overflow-hidden sm:h-[520px] md:h-[580px] lg:h-[640px]`}
      >
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-[48%_58%]"
          quality={95}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-black/18 to-transparent sm:from-black/42 sm:via-black/10"
          aria-hidden
        />

        <div className={`relative z-10 flex h-full items-center ${BILVA_SITE_SHELL_CLASS}`}>
          <div className="max-w-xl py-8 sm:py-12">
            <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.015em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              {headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="mt-5 flex flex-col items-start gap-2.5 sm:mt-7">
              <span className="block h-px w-10 bg-white/90 sm:w-14" aria-hidden />
              <p className="font-sans text-[10px] font-semibold uppercase leading-tight tracking-[0.22em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] sm:text-[11px]">
                {eyebrowLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}