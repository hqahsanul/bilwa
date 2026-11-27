"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import {
  CORPORATE_GIFTING_DATA,
  type CorporateGiftingPageData,
} from "@/data/bilva/corporate-gifting";

interface BilvaCorporateFaqProps {
  data?: CorporateGiftingPageData;
}

export function BilvaCorporateFaq({ data = CORPORATE_GIFTING_DATA }: BilvaCorporateFaqProps) {
  const { faq } = data;
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] pb-0 pt-4 sm:pt-6"
      aria-labelledby="corporate-faq-heading"
    >
      {/* Square sage band — site frame width, flush to footer */}
      <div
        className={`${BILVA_SITE_FRAME_CLASS} border border-[#CCD8CC] bg-[#E8EFE6] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12`}
      >
        <div className="mb-5 flex flex-col sm:mb-6">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2C4A3E] sm:text-[12px]">
            {faq.eyebrow}
          </span>
          <h2
            id="corporate-faq-heading"
            className="mt-1.5 font-serif text-[clamp(2rem,3.6vw,2.9rem)] font-medium leading-[1.14] tracking-[-0.01em] text-[#0A2D23]"
          >
            {faq.title}
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#CCD8CC] border-y border-[#CCD8CC]">
          {faq.items.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left sm:py-4"
                >
                  <span className="font-sans text-[16.5px] font-medium leading-snug text-[#0A2D23] transition-colors group-hover:text-[#387C71] sm:text-[18px]">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-[#2C4A3E] transition-colors group-hover:text-[#387C71]">
                    {isOpen ? <Minus size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
                  </span>
                </button>

                {isOpen ? (
                  <div className="animate-in fade-in pb-3.5 pr-6 duration-200 sm:pb-4">
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
