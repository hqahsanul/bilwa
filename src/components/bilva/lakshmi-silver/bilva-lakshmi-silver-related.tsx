"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { LAKSHMI_SILVER_COIN_DATA } from "@/data/bilva/lakshmi-silver-coin";

export function BilvaLakshmiSilverRelated() {
  const { related } = LAKSHMI_SILVER_COIN_DATA;

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] py-14 sm:py-16 lg:py-20"
      aria-labelledby="silver-related-heading"
    >
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Eyebrow */}
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6F3E]">
          {related.eyebrow}
        </span>

        {/* Title */}
        <h2
          id="silver-related-heading"
          className="mt-2 font-serif text-[clamp(2.1rem,3.4vw,2.85rem)] font-medium leading-[1.12] tracking-[-0.015em] text-[#12352A]"
        >
          {related.title}
        </h2>

        {/* Gold accent bar matching Figma */}
        <div className="mt-3.5 mb-8 h-[2px] w-12 bg-[#C4A66B] sm:mb-10" aria-hidden />

        {/* 3 Related Items Grid with Parallelogram Clipped Images */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {related.items.map((item) => (
            <article key={item.id} className="group">
              <Link
                href={item.href}
                className="relative block aspect-[16/10] w-full overflow-hidden bg-[#E7E1D6] transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{
                  clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
                }}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </Link>

              {/* Title with right-aligned Arrow */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <h3 className="font-serif text-[18px] sm:text-[19px] font-semibold leading-snug text-[#12352A]">
                  {item.title}
                </h3>
                <ArrowRight
                  size={17}
                  strokeWidth={1.5}
                  className="shrink-0 text-[#12352A] transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>

              {/* Subtitle / Specifications */}
              <p className="mt-1 font-sans text-[13px] text-[#5C6B62]">{item.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
