"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { FIVE_MUKHI_DATA } from "@/data/bilva/five-mukhi-rudraksha";

export function BilvaFiveMukhiRelated() {
  const { related } = FIVE_MUKHI_DATA;

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] py-0"
      aria-labelledby="related-rudraksha-heading"
    >
      <div className={`${BILVA_SITE_FRAME_CLASS} bg-[#FAF7F2] py-12 sm:py-14 lg:py-16`}>
        <div className={BILVA_SITE_SHELL_CLASS}>
          <h2
            id="related-rudraksha-heading"
            className="font-serif text-[clamp(2rem,3.5vw,2.85rem)] font-medium leading-[1.14] tracking-[-0.01em] text-[#0A2D23]"
          >
            {related.title}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-6 lg:mt-10 lg:gap-8">
            {related.items.map((item) => (
              <article key={item.id} className="group flex flex-col">
                <Link
                  href={item.href}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE2D5]"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    quality={90}
                  />
                </Link>
                <h3 className="mt-3.5 font-serif text-[20px] font-semibold leading-snug text-[#0E3D36] sm:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-1 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6B7F76]">
                  {item.subtitle}
                </p>
                <Link
                  href={item.href}
                  className="mt-2.5 inline-flex items-center gap-1.5 font-sans text-[14.5px] font-medium text-[#0E3D36] transition-colors hover:text-[#A67C44]"
                >
                  View Product
                  <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
