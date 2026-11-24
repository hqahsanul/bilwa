"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Award, Truck } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { LAKSHMI_GOLD_COIN_DATA } from "@/data/bilva/lakshmi-gold-coin";

export function BilvaLakshmiGoldAuthenticity() {
  const { authenticity } = LAKSHMI_GOLD_COIN_DATA;
  const [index, setIndex] = useState(0);
  const count = authenticity.cards.length;

  return (
    <section className="w-full select-none bg-[#F7F3EC] py-0">
      <div className={`${BILVA_SITE_FRAME_CLASS} bg-[#0E3A30] px-0 py-12 text-[#F6F1E6] sm:py-14`}>
        <div className={BILVA_SITE_SHELL_CLASS}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1]">{authenticity.title}</h2>
              <p className="mt-2 font-sans text-[15.5px] text-[#D5E4DC]">{authenticity.intro}</p>
              <span className="mt-3 block h-[2px] w-12 bg-[#C4A15A]" />
            </div>
            <div className="flex items-center gap-3 font-sans text-[13px] tracking-[0.14em]">
              <button type="button" aria-label="Previous document" onClick={() => setIndex((i) => (i === 0 ? count - 1 : i - 1))} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/40">
                <ChevronLeft size={16} />
              </button>
              <span>0{index + 1} — 0{count} / 05</span>
              <button type="button" aria-label="Next document" onClick={() => setIndex((i) => (i >= count - 1 ? 0 : i + 1))} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/40">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {authenticity.cards.map((card, cardIndex) => (
              <article key={card.id} className={`rounded-[16px] p-4 ${cardIndex === index ? "bg-[#164A3E]" : "bg-[#123F35]"}`}>
                <div className="rounded-[8px] border border-[#E4D3A8] bg-[#F8F3E8] px-5 py-6 text-[#143028]">
                  <p className="text-center font-serif text-[13px] tracking-[0.18em]">BILWA</p>
                  <p className="mt-3 text-center font-serif text-[18px] italic">{card.title}</p>
                  <div className="mt-4 space-y-2 font-sans text-[12px] text-[#5C6B62]">
                    {card.lines.map((line) => (
                      <div key={line} className="flex items-end gap-2">
                        <span className="w-16 shrink-0">{line}</span>
                        <span className="h-px flex-1 bg-[#D9D0C2]" />
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="mt-4 text-center font-serif text-[20px]">{card.caption}</h3>
                <p className="mt-1 text-center font-sans text-[13.5px] text-[#E7D7B0] underline underline-offset-4">View document ↗</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center font-sans text-[12.5px] text-[#C9D8D0]">{authenticity.note}</p>
        </div>
        <div className="mt-6 bg-[#1C6B4A] py-3">
          <div className={`${BILVA_SITE_SHELL_CLASS} flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-sans text-[13.5px]`}>
            <span className="inline-flex items-center gap-2"><Award size={16} /> {authenticity.trust[0]?.label}</span>
            <span className="inline-flex items-center gap-2"><Truck size={16} /> {authenticity.trust[1]?.label}</span>
            <span className="inline-flex items-center gap-2"><FileText size={16} /> {authenticity.trust[2]?.label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
