"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { GOLD_COINS_AND_BARS_PATH } from "@/lib/bilva-collection-routes";
import { LAKSHMI_GOLD_COIN_DATA } from "@/data/bilva/lakshmi-gold-coin";

function LeafMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M11 18.5c.2-5.2 3.4-8.4 7.6-9.2-1.4 4.8-4.2 7.6-7.6 9.2Z" fill="#C4A15A" />
      <path d="M11 18.5c-.2-5.2-3.4-8.4-7.6-9.2 1.4 4.8 4.2 7.6 7.6 9.2Z" fill="#C4A15A" />
      <path d="M11 18.2V7.5" stroke="#C4A15A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function HeartButton() {
  return (
    <button
      type="button"
      aria-label="Save"
      className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#143028] shadow-[0_1px_4px_rgba(20,40,30,0.12)]"
    >
      <Heart size={15} strokeWidth={1.75} />
    </button>
  );
}

export function BilvaLakshmiGoldRelated() {
  const { related } = LAKSHMI_GOLD_COIN_DATA;
  const items = related.items;

  return (
    <section className="w-full select-none bg-[#F7F3EC]">
      <div className={`${BILVA_SITE_FRAME_CLASS} bg-[#F7F3EC] py-12 sm:py-14`}>
        <div className={BILVA_SITE_SHELL_CLASS}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#143028]">
                <span className="inline-block h-px w-5 bg-[#143028]" />
                {related.eyebrow}
              </p>
              <h2 className="mt-2 font-serif text-[clamp(2.15rem,3.5vw,2.85rem)] font-medium leading-[1.05] text-[#143028]">{related.title}</h2>
              <p className="mt-2 font-sans text-[15px] text-[#6A736C]">{related.intro}</p>
            </div>
            <div className="flex items-center gap-3 pb-1">
              <Link href={GOLD_COINS_AND_BARS_PATH} className="inline-flex items-center gap-1.5 border-b border-[#C4A15A] pb-0.5 font-sans text-[14.5px] font-medium text-[#143028]">
                {related.explore}
                <ArrowRight size={15} />
              </Link>
              <button type="button" aria-label="Previous pieces" className="ml-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#D5CFC4] text-[#143028]">
                <ChevronLeft size={16} />
              </button>
              <button type="button" aria-label="Next pieces" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#D5CFC4] text-[#143028]">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="mt-7 grid items-stretch gap-4 md:grid-cols-3">
            {items.map((item) =>
              item.featured ? (
                <article key={item.id} className="flex h-full flex-col overflow-hidden rounded-[16px] bg-[#12352A]">
                  <div className="relative min-h-[220px] flex-1">
                    <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                    <HeartButton />
                  </div>
                  <div className="flex items-center gap-2.5 px-3.5 py-3 text-white">
                    <div className="min-w-0">
                      <p className="font-sans text-[10px] font-semibold tracking-[0.18em] text-[#C4A15A]">FEATURED</p>
                      <h3 className="mt-0.5 whitespace-nowrap font-serif text-[18px] font-medium leading-none">{item.title}</h3>
                      <p className="mt-1 whitespace-nowrap font-sans text-[12px] text-white/70">{item.meta}</p>
                    </div>
                    <span className="h-9 w-px shrink-0 bg-white/30" />
                    <div className="shrink-0 text-right">
                      <p className="whitespace-nowrap font-serif text-[17px] font-semibold leading-none">{item.price}</p>
                      <p className="mt-1 font-sans text-[11px] text-white/65">{item.priceNote}</p>
                    </div>
                    <Link href={item.href} className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-white/55 px-2.5 py-1 font-sans text-[12px] font-medium text-white">
                      View details
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              ) : (
                <article key={item.id} className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[#E7E0D2] bg-white">
                  <div className="relative min-h-[200px] flex-1 bg-[#EFE8DC]">
                    <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                    <HeartButton />
                  </div>
                  <div className="px-4 pt-3.5 pb-4">
                    <h3 className="font-serif text-[20px] font-medium leading-tight text-[#143028]">{item.title}</h3>
                    <p className="mt-1 font-sans text-[13.5px] text-[#6A736C]">{item.meta}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-serif text-[22px] font-semibold leading-none text-[#143028]">{item.price}</p>
                        <p className="mt-1 font-sans text-[12px] text-[#8A8478]">{item.priceNote}</p>
                      </div>
                      <Link href={item.href} className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#E0D9CE] px-3.5 py-2 font-sans text-[13.5px] font-medium text-[#143028]">
                        View details
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[14px] bg-[#E6EDD8] px-4 py-3 font-sans text-[14.5px] text-[#143028] sm:px-5">
            <LeafMark />
            <span className="hidden h-6 w-px bg-[#C5D0BE] sm:block" />
            <span>{related.help}</span>
            <Link href={GOLD_COINS_AND_BARS_PATH} className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#1A3324] px-3.5 py-2 text-[14px] font-medium">
              {related.browse}
              <ArrowRight size={14} />
            </Link>
            <span className="hidden h-6 w-px bg-[#C5D0BE] sm:ml-2 sm:block" />
            <span className="sm:ml-1">
              {related.guidance}{" "}
              <span className="underline decoration-[#C4A15A] underline-offset-[5px]">{related.guidanceAction}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
