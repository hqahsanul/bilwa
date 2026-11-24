"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Info, Store, UserRound } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { LAKSHMI_GOLD_COIN_DATA } from "@/data/bilva/lakshmi-gold-coin";

function OliveSprig({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 280 200" className={className} fill="none" aria-hidden>
      <path d="M248 16C190 48 132 92 46 168" stroke="#CDB892" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M214 28c18-2 28 8 30 18-16 2-28-4-30-18Z" fill="#D5E2CE" />
      <path d="M196 46c-16 6-22 18-16 28 14-2 24-12 16-28Z" fill="#C5D6BE" />
      <path d="M176 40c14 6 26 4 34-6-8 16-22 22-36 16 0-4 0-8 2-10Z" fill="#E3EDDE" />
      <path d="M168 64c-18 4-26 16-20 28 16 0 28-10 20-28Z" fill="#B7CDB0" />
      <path d="M150 58c16 8 30 6 36-8-10 16-26 22-40 14 1-2 2-4 4-6Z" fill="#D7E4D0" />
      <path d="M138 84c-16 8-20 20-12 30 14-2 24-14 12-30Z" fill="#C9D9C2" />
      <path d="M118 78c14 10 28 8 34-8-8 16-24 22-38 12 1-2 2-3 4-4Z" fill="#E7F0E2" />
      <path d="M108 104c-14 10-16 22-8 30 12-4 20-14 8-30Z" fill="#AFC7A8" />
      <path d="M86 98c12 12 26 10 32-6-8 14-22 20-36 10 1-2 2-3 4-4Z" fill="#D3E0CC" />
      <path d="M74 124c-12 10-12 20-4 28 10-4 16-14 4-28Z" fill="#C3D4BC" />
      <path d="M56 118c10 12 22 12 28-4-6 12-18 16-30 8 0-2 1-3 2-4Z" fill="#E4EEE0" />
    </svg>
  );
}

function CardBranch() {
  return (
    <svg viewBox="0 0 170 150" className="pointer-events-none absolute top-1 right-1 h-[7.5rem] w-[8.5rem]" fill="none" aria-hidden>
      <path d="M24 132C62 100 100 64 156 18" stroke="#E3D7C2" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M132 26c16 2 24 12 22 22-14 0-24-8-22-22Z" fill="#E7F0E3" />
      <path d="M118 40c-14 8-16 20-8 28 12-4 20-14 8-28Z" fill="#DCE8D6" />
      <path d="M108 34c12 10 24 8 28-6-8 12-20 16-32 8 1-1 2-2 4-2Z" fill="#F3F7F0" />
      <path d="M96 58c-12 8-14 18-6 26 10-2 18-12 6-26Z" fill="#E3EEE0" />
      <path d="M82 52c10 10 22 10 26-4-6 12-18 16-30 8 1-2 2-3 4-4Z" fill="#F4F8F2" />
      <path d="M72 76c-10 8-10 18-2 24 8-4 14-12 2-24Z" fill="#D7E4D2" />
      <path d="M58 70c8 10 18 10 22-4-6 10-16 14-26 6 1-1 2-2 4-2Z" fill="#EEF4EA" />
      <path d="M132 48c6 14 2 22-8 24" stroke="#D5C8B0" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

export function BilvaLakshmiGoldReviews() {
  const { reviews } = LAKSHMI_GOLD_COIN_DATA;
  const [index, setIndex] = useState(0);
  const count = reviews.cards.length;
  const visible = [reviews.cards[index], reviews.cards[(index + 1) % count]];
  const title = reviews.title.split("\n");

  return (
    <section className="relative w-full select-none overflow-hidden bg-[#F7F3EC]">
      <OliveSprig className="pointer-events-none absolute top-0 right-0 h-36 w-52 sm:h-44 sm:w-64" />
      <OliveSprig className="pointer-events-none absolute -bottom-3 -left-4 h-24 w-32 rotate-180" />

      <div className={`${BILVA_SITE_FRAME_CLASS} relative z-[1] py-10 sm:py-14`}>
        <div className={`${BILVA_SITE_SHELL_CLASS} grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12`}>
          <div className="pt-1">
            <p className="flex items-center gap-3 font-sans text-[13px] font-semibold uppercase tracking-[0.22em] text-[#1A3324]">
              {reviews.eyebrow}
              <span className="h-px w-16 bg-[#C4A15A]" />
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2.9rem,3.6vw,3.45rem)] font-medium leading-[0.98] text-[#143028]">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-[20rem] font-sans text-[18px] leading-[1.45] text-[#3E4E46]">{reviews.intro}</p>
            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-[#E6DDD0] text-[#143028]">
                <Store size={18} strokeWidth={1.6} />
              </span>
              <span className="h-8 w-px bg-[#E4DCCE]" />
              <p className="font-serif text-[17.5px] italic leading-snug text-[#143028]">{reviews.source}</p>
            </div>
            <p className="mt-3.5 inline-flex items-start gap-2 font-sans text-[15px] leading-snug text-[#6A736C]">
              <Info size={16} className="mt-0.5 shrink-0" strokeWidth={1.6} />
              {reviews.sourceNote}
            </p>
          </div>

          <div className="min-w-0">
            <div className="grid items-stretch gap-3.5 md:grid-cols-[1.45fr_0.7fr]">
              {visible.map((card, cardIndex) => {
                const lead = cardIndex === 0;
                return (
                  <article
                    key={card.id}
                    className={`relative flex flex-col overflow-hidden rounded-[20px] border border-[#E7DCC8] bg-[#FBF8F2] ${lead ? "px-6 pt-5 pb-5 sm:px-7" : "hidden px-4 pt-4 pb-4 md:flex"}`}
                  >
                    {lead ? <CardBranch /> : null}
                    {lead ? (
                      <svg viewBox="0 0 480 70" className="pointer-events-none absolute right-0 bottom-0 h-14 w-full" aria-hidden>
                        <path d="M0 70c90-28 180-8 270-24 70-12 140-8 210-20v44H0Z" fill="#E7EFE3" />
                      </svg>
                    ) : null}
                    <span className="relative z-[1] mx-auto flex w-fit rounded-full bg-[#E3EBD4] px-3.5 py-1.5 font-sans text-[12px] font-semibold tracking-[0.12em] text-[#3E5346]">
                      {card.badge}
                    </span>
                    <div className={`relative z-[1] flex gap-3.5 ${lead ? "mt-6" : "mt-4"}`}>
                      <span className={`font-serif leading-none text-[#C6A15A] ${lead ? "pt-1 text-[3.4rem]" : "text-[2.4rem]"}`}>“</span>
                      <span className={`w-px shrink-0 bg-[#E6D3AE] ${lead ? "my-1" : "my-0.5"}`} />
                      <p className={`font-serif leading-[1.25] text-[#163028] ${lead ? "text-[clamp(1.55rem,2vw,1.95rem)]" : "text-[1.28rem]"}`}>{card.quote}</p>
                    </div>
                    <div className={`relative z-[1] mt-auto flex items-center gap-3 pt-6 ${lead ? "" : "pt-5"}`}>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E4EBDA] text-[#5C6B62]">
                        <UserRound size={20} strokeWidth={1.6} />
                      </span>
                      <span className="h-8 w-px shrink-0 bg-[#E6D3AE]" />
                      <span className="min-w-0">
                        <span className="block font-sans text-[16px] font-semibold leading-snug text-[#143028]">{card.name}</span>
                        {card.meta ? <span className="mt-0.5 block font-sans text-[14px] leading-snug text-[#7A847C]">{card.meta}</span> : null}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous story"
                  onClick={() => setIndex((i) => (i === 0 ? count - 1 : i - 1))}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#D7D0C4] text-[#143028]"
                >
                  <ChevronLeft size={15} />
                </button>
                <span className="min-w-[4.75rem] text-center font-sans text-[15px] tracking-[0.14em] text-[#3E4E46]">
                  0{index + 1} / 0{count}
                </span>
                <button
                  type="button"
                  aria-label="Next story"
                  onClick={() => setIndex((i) => (i >= count - 1 ? 0 : i + 1))}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#D7D0C4] text-[#143028]"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
              <span className="hidden h-4 w-px bg-[#DDD4C6] sm:block" />
              <span className="font-sans text-[15px] text-[#7A847C]">Navigation preview</span>
              <p className="font-sans text-[15.5px] italic text-[#5C6B62] lg:ml-auto">{reviews.share}</p>
              <button type="button" className="inline-flex h-11 cursor-pointer items-center rounded-[8px] border border-[#1A3324] px-4 font-sans text-[15.5px] font-medium text-[#143028]">
                {reviews.allStories} →
              </button>
            </div>
          </div>
        </div>
        <p className={`${BILVA_SITE_SHELL_CLASS} mt-6 font-sans text-[14px] italic text-[#9A9286]`}>{reviews.disclaimer}</p>
      </div>
    </section>
  );
}
