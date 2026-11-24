"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import { FIVE_MUKHI_DATA } from "@/data/bilva/five-mukhi-rudraksha";

export function BilvaFiveMukhiFaq() {
  const { faq } = FIVE_MUKHI_DATA;
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] pb-0 pt-0"
      aria-labelledby="five-mukhi-faq-heading"
    >
      <div
        className={`${BILVA_SITE_FRAME_CLASS} border border-[#CCD8CC] bg-[#E8EFE6] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12`}
      >
        <h2
          id="five-mukhi-faq-heading"
          className="font-serif text-[clamp(2rem,3.6vw,2.9rem)] font-medium leading-[1.14] tracking-[-0.01em] text-[#0A2D23]"
        >
          {faq.title}
        </h2>

        <div className="mt-6 flex flex-col divide-y divide-[#CCD8CC] border-y border-[#CCD8CC] sm:mt-8">
          {faq.items.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div key={item.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenIds((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                  }
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left sm:py-4"
                >
                  <span className="font-sans text-[16.5px] font-medium leading-snug text-[#0A2D23] transition-colors group-hover:text-[#387C71] sm:text-[18px]">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-[#2C4A3E]">
                    {isOpen ? <Minus size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
                  </span>
                </button>
                {isOpen ? (
                  <div className="pb-3.5 pr-6 sm:pb-4">
                    <p className="max-w-3xl font-sans text-[15px] leading-relaxed text-[#4A5D55] sm:text-[15.5px]">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
