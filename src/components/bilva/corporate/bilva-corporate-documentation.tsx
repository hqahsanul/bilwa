"use client";

import Image from "next/image";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import {
  CORPORATE_GIFTING_DATA,
  type CorporateGiftingPageData,
} from "@/data/bilva/corporate-gifting";

/** Photo-like bilva leaves — gradient-masked into the emerald band */
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
        {/* Overlapping bilva trifoliate clusters */}
        <g fill="#1F5A48" fillOpacity="0.72">
          <path d="M48 70c52 18 88 78 78 168-38 10-92-18-118-72 10-38 22-68 40-96Z" />
          <path d="M118 48c58 28 92 96 76 188-42 6-98-28-128-88 14-40 28-72 52-100Z" />
          <path d="M28 150c46 22 76 82 64 162-32 8-78-22-100-68 8-36 18-66 36-94Z" />
        </g>
        <g fill="#2F7A62" fillOpacity="0.58">
          <path d="M70 250c54 24 90 92 78 186-40 8-96-24-124-82 12-40 24-72 46-104Z" />
          <path d="M140 230c56 30 88 100 72 192-44 4-102-32-130-94 16-42 30-74 58-98Z" />
          <path d="M40 340c48 20 80 86 68 170-34 6-80-24-102-70 10-36 18-66 34-100Z" />
        </g>
        <g fill="#3D8F74" fillOpacity="0.42">
          <ellipse cx="170" cy="420" rx="78" ry="128" transform="rotate(-16 170 420)" />
          <ellipse cx="95" cy="520" rx="62" ry="108" transform="rotate(14 95 520)" />
          <ellipse cx="210" cy="580" rx="70" ry="118" transform="rotate(-10 210 580)" />
          <path d="M55 560c44 22 74 80 62 158-30 6-72-22-94-64 8-34 16-62 32-94Z" />
        </g>
        <g fill="#256B56" fillOpacity="0.5">
          <path d="M160 120c40 14 68 58 60 122-28 6-70-14-90-52 8-28 16-50 30-70Z" />
          <path d="M200 300c44 18 72 70 62 148-32 6-78-20-100-62 10-32 18-58 38-86Z" />
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

interface BilvaCorporateDocumentationProps {
  data?: CorporateGiftingPageData;
}

export function BilvaCorporateDocumentation({
  data = CORPORATE_GIFTING_DATA,
}: BilvaCorporateDocumentationProps) {
  const { documentation } = data;

  return (
    <section
      className="w-full select-none bg-[#FAF7F2] pb-0 pt-0"
      aria-labelledby="documentation-heading"
    >
      {/* Contained Emerald Band — exactly leveled with site frame max-w-7xl */}
      <div
        className={`${BILVA_SITE_FRAME_CLASS} relative overflow-hidden rounded-[14px] bg-[#093126] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20 text-white shadow-[0_6px_32px_rgba(9,49,38,0.12)]`}
      >
        <LeafSideAccent side="left" />
        <LeafSideAccent side="right" />

        <div className="relative z-[1] w-full">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="documentation-heading"
              className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-[-0.01em] text-[#F5F2EB]"
            >
              {documentation.title}
            </h2>
            <p className="mt-2.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#D0C2A0] sm:text-[11.5px]">
              {documentation.eyebrow}
            </p>
          </div>

          <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:mt-12 sm:gap-7 md:grid-cols-3 lg:mt-14 lg:gap-8">
            {documentation.documents.map((doc) => (
              <article
                key={doc.id}
                className="group relative aspect-square w-full overflow-hidden rounded-[10px] bg-[#FAF6EE] shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1"
              >
                <Image
                  src={doc.imageSrc}
                  alt={doc.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
