"use client";

import Image from "next/image";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { LAKSHMI_SILVER_COIN_DATA } from "@/data/bilva/lakshmi-silver-coin";

export function BilvaLakshmiSilverHero() {
  const { hero } = LAKSHMI_SILVER_COIN_DATA;
  const lines = hero.headline.split("\n");

  return (
    <section className="relative w-full select-none bg-[#FAF7F2]" aria-label="Lakshmi Silver Coin">
      <div
        className={`${BILVA_SITE_FRAME_CLASS} relative h-[440px] overflow-hidden sm:h-[520px] md:h-[580px] lg:h-[640px]`}
      >
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-[68%_center]"
          quality={95}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-black/18 to-transparent"
          aria-hidden
        />
        <div className={`relative z-10 flex h-full items-center ${BILVA_SITE_SHELL_CLASS}`}>
          <div className="max-w-xl">
            <h1 className="font-serif text-[clamp(2.4rem,4.8vw,3.85rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div className="mt-5 flex flex-col items-start gap-2.5">
              <span className="block h-px w-12 bg-[#C5A059]" aria-hidden />
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white sm:text-[12px]">
                {hero.eyebrow}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
