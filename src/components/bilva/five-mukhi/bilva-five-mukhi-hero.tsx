"use client";

import Image from "next/image";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { FIVE_MUKHI_DATA } from "@/data/bilva/five-mukhi-rudraksha";

export function BilvaFiveMukhiHero() {
  const { hero } = FIVE_MUKHI_DATA;
  const lines = hero.headline.split("\n");

  return (
    <section className="relative w-full select-none bg-[#FAF7F2]" aria-label="Five Mukhi Rudraksha">
      <div
        className={`${BILVA_SITE_FRAME_CLASS} relative h-[420px] overflow-hidden sm:h-[500px] md:h-[560px] lg:h-[620px]`}
      >
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-[62%_48%]"
          quality={95}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent"
          aria-hidden
        />
        <div className={`relative z-10 flex h-full items-center ${BILVA_SITE_SHELL_CLASS}`}>
          <h1 className="max-w-xl font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-normal leading-[1.08] tracking-[-0.015em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
