"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import { LAKSHMI_SILVER_COIN_DATA } from "@/data/bilva/lakshmi-silver-coin";

export function BilvaLakshmiSilverFaq() {
  const { faq } = LAKSHMI_SILVER_COIN_DATA;
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const titleLines = faq.title.split("\n");

  return (
    <section className="w-full select-none bg-[#FAF7F2] pb-0 pt-0" aria-labelledby="silver-faq-heading">
      <div className={`${BILVA_SITE_FRAME_CLASS} relative overflow-hidden bg-[#E6EDD8] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14`}>
        <svg
          viewBox="0 0 180 110"
          className="pointer-events-none absolute bottom-0 left-2 h-[4.5rem] w-[7.5rem] sm:left-6 sm:h-20 sm:w-32"
          aria-hidden
        >
          <path d="M28 96c8-22 22-38 40-48-6 16-8 32-6 48" fill="#7FA35C" />
          <path d="M46 98c18-16 40-22 62-20-20 6-40 14-58 28" fill="#648A48" />
          <path d="M18 100c22-8 36-22 42-40-14 10-26 24-32 42" fill="#8FB36C" />
          <path d="M62 102c16-28 18-48 8-64 2 22 2 42 0 66" fill="#5E8244" />
          <path d="M70 40c8 18 8 36 2 58" fill="none" stroke="#4F6E3A" strokeWidth="1.2" />
        </svg>

        <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-0">
          <div className="lg:py-4 lg:pr-12">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5E7268]">
              {faq.eyebrow}
            </span>
            <h2
              id="silver-faq-heading"
              className="mt-3 font-serif text-[clamp(2.35rem,3.6vw,3.15rem)] font-bold leading-[1.02] tracking-[-0.02em] text-[#163028]"
            >
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <span className="mt-4 block h-[2px] w-10 bg-[#C4A15A]" aria-hidden />
          </div>

          <div className="border-[#C9D4BE] lg:border-l lg:pl-12">
            <div className="divide-y divide-[#C9D4BE] border-y border-[#C9D4BE]">
              {faq.items.map((item) => {
                const isOpen = !!openIds[item.id];
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIds((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-2.5 text-left sm:py-3"
                    >
                      <span className="font-serif text-[18.5px] font-semibold leading-tight text-[#163028] sm:text-[21px]">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        strokeWidth={1.6}
                        className={`shrink-0 text-[#163028] transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen ? (
                      <p className="-mt-0.5 pb-3 pr-8 font-sans text-[16px] font-medium leading-snug text-[#3E5248]">
                        {item.answer}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
