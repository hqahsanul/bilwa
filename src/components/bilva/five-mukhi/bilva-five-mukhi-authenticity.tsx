"use client";

import Image from "next/image";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import { FIVE_MUKHI_DATA } from "@/data/bilva/five-mukhi-rudraksha";

function LeafSideAccent({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} w-[min(42vw,28rem)] overflow-hidden`}
      aria-hidden
    >
      <svg
        viewBox="0 0 360 720"
        className={`absolute top-1/2 h-[130%] w-full -translate-y-1/2 ${
          isLeft ? "left-0" : "right-0 -scale-x-100"
        }`}
        style={{
          WebkitMaskImage: isLeft
            ? "linear-gradient(to right, #000 0%, #000 28%, transparent 92%)"
            : "linear-gradient(to left, #000 0%, #000 28%, transparent 92%)",
          maskImage: isLeft
            ? "linear-gradient(to right, #000 0%, #000 28%, transparent 92%)"
            : "linear-gradient(to left, #000 0%, #000 28%, transparent 92%)",
        }}
        fill="none"
      >
        <g fill="#1F5A48" fillOpacity="0.72">
          <path d="M48 70c52 18 88 78 78 168-38 10-92-18-118-72 10-38 22-68 40-96Z" />
          <path d="M118 48c58 28 92 96 76 188-42 6-98-28-128-88 14-40 28-72 52-100Z" />
          <path d="M28 150c46 22 76 82 64 162-32 8-78-22-100-68 8-36 18-66 36-94Z" />
        </g>
        <g fill="#2F7A62" fillOpacity="0.55">
          <path d="M70 250c54 24 90 92 78 186-40 8-96-24-124-82 12-40 24-72 46-104Z" />
          <path d="M140 230c56 30 88 100 72 192-44 4-102-32-130-94 16-42 30-74 58-98Z" />
        </g>
      </svg>
      <div
        className={`absolute inset-0 ${
          isLeft
            ? "bg-gradient-to-r from-[#093126]/20 via-transparent to-[#093126]"
            : "bg-gradient-to-l from-[#093126]/20 via-transparent to-[#093126]"
        }`}
      />
    </div>
  );
}

export function BilvaFiveMukhiAuthenticity() {
  const { authenticity } = FIVE_MUKHI_DATA;

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] py-0"
      aria-labelledby="authenticity-heading"
    >
      <div
        className={`${BILVA_SITE_FRAME_CLASS} relative overflow-hidden bg-[#093126] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14 lg:py-20`}
      >
        <LeafSideAccent side="left" />
        <LeafSideAccent side="right" />

        <div className="relative z-[1] w-full">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="authenticity-heading"
              className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-[-0.01em] text-[#F5F2EB]"
            >
              {authenticity.title}
            </h2>
            <p className="mt-2.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#D0C2A0] sm:text-[11.5px]">
              {authenticity.eyebrow}
            </p>
          </div>

          <div className="mt-10 grid w-full grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 lg:gap-7">
            {authenticity.cards.map((card) => (
              <article
                key={card.id}
                className="relative aspect-square w-full overflow-hidden bg-[#FAF6EE] shadow-[0_10px_28px_rgba(0,0,0,0.18)]"
              >
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
