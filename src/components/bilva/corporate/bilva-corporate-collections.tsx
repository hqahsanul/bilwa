"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  CORPORATE_GIFTING_DATA,
  type CorporateGiftingPageData,
} from "@/data/bilva/corporate-gifting";

interface BilvaCorporateCollectionsProps {
  data?: CorporateGiftingPageData;
  onSelectSet: (setName: string) => void;
}

export function BilvaCorporateCollections({
  data = CORPORATE_GIFTING_DATA,
  onSelectSet,
}: BilvaCorporateCollectionsProps) {
  const { collections } = data;

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] pb-6 pt-4 sm:pb-8 sm:pt-6"
      aria-labelledby="corporate-collections-heading"
    >
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Section Header */}
        <div className="flex flex-col">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B6F3E] sm:text-[12px]">
            {collections.eyebrow}
          </span>
          <h2
            id="corporate-collections-heading"
            className="font-serif text-[clamp(1.9rem,3.4vw,2.75rem)] font-medium leading-[1.14] text-[#0A2D23] mt-1.5 mb-8 sm:mb-10 tracking-[-0.01em]"
          >
            {collections.title}
          </h2>
        </div>

        {/* 3 Set Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.sets.map((set) => (
            <article
              key={set.id}
              onClick={() => onSelectSet(set.title)}
              className="group cursor-pointer flex flex-col overflow-hidden transition-all"
            >
              {/* Product Visual Container with Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#EAE2D5] shadow-xs">
                <Image
                  src={set.imageSrc}
                  alt={set.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                />
              </div>

              {/* Title & Arrow */}
              <div className="mt-3.5 flex items-center justify-between gap-3">
                <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#0E3D36] group-hover:text-[#A67C44] transition-colors leading-snug">
                  {set.title}
                </h3>
                <span className="text-[#0E3D36] group-hover:text-[#A67C44] group-hover:translate-x-1 transition-all shrink-0">
                  <ArrowRight size={17} strokeWidth={2} />
                </span>
              </div>

              {/* Subtitle Tag */}
              <p className="font-sans text-[10.5px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6B7F76] mt-1">
                {set.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
