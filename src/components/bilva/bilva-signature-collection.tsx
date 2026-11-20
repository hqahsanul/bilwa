"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export function BilvaSignatureCollection() {
  const [isHeroWishlisted, setIsHeroWishlisted] = useState(false);

  return (
    <section
      id="signature-collection"
      className="w-full bg-[#FAF7F2] pt-0 sm:pt-1 pb-16 sm:pb-22 select-none"
      aria-labelledby="signature-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* ===================================================================== */}
        {/* SECTION HEADER                                                        */}
        {/* ===================================================================== */}
        <div className="flex flex-col gap-4 mb-7 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Kicker / Eyebrow */}
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.22em] text-[#A67C44] uppercase block mb-1.5">
              DESIGNED TO BE TREASURED
            </span>

            {/* Main Headline */}
            <h2
              id="signature-heading"
              className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.015em] text-[#0A2D23] font-semibold"
            >
              The Bilwa Signature Collection
            </h2>

            {/* Subhead */}
            <p className="font-sans text-[14px] sm:text-[15.5px] text-[#425E53] font-normal mt-1">
              Distinctive pieces for the moments that matter.
            </p>
          </div>

          {/* Right Action: Explore all pieces */}
          <div className="shrink-0 pb-1">
            <Link
              href="#all-signature-pieces"
              className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-sans font-medium text-[#0A2D23] hover:text-[#A67C44] transition-colors border-b border-[#0A2D23] hover:border-[#A67C44] pb-0.5 group cursor-pointer"
            >
              <span>Explore all pieces</span>
              <span className="text-[16px] leading-none transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* ASYMMETRICAL 2-COLUMN BENTO GRID                                      */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 items-stretch">
          {/* ----------------------------------------------------------------- */}
          {/* LEFT COLUMN: Large Featured Hero Card (01 / SIGNATURE)            */}
          {/* ----------------------------------------------------------------- */}
          <div className="group relative rounded-[6px] overflow-hidden border border-[#E5DDD0] shadow-[0_4px_16px_rgba(0,0,0,0.04)] min-h-[380px] sm:min-h-[540px] lg:min-h-[620px] flex flex-col justify-end p-5 sm:p-7">
            {/* Background Master Photo */}
            <Image
              src="/images/bilva/signature-heritage-gold-tree-2x.webp"
              alt="The Heritage Gold Coin 24K (999) 5g with Tree of Life"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Subtle bottom vignette to support glass card contrast */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

            {/* Floating Frosted Glass Card (Bottom-Left) */}
            <div className="relative z-10 w-full sm:w-[85%] max-w-[340px] bg-[#FAF8F5]/92 backdrop-blur-md rounded-[4px] border border-[#FFFFFF]/80 shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-5 sm:p-6 transition-all duration-300">
              {/* Badge */}
              <span className="text-[10.5px] font-sans font-semibold tracking-[0.2em] text-[#B6914C] uppercase block mb-1">
                01 / SIGNATURE
              </span>

              {/* Title */}
              <h3 className="font-serif text-[21px] sm:text-[23px] text-[#0A2D23] font-semibold leading-tight">
                The Heritage Gold Coin
              </h3>

              {/* Spec */}
              <p className="font-sans text-[12.5px] text-[#476156] font-normal mt-1 mb-2">
                24K (999) · 5 g
              </p>

              {/* Price */}
              <div className="font-sans text-[22px] sm:text-[24px] font-bold text-[#0A2D23] mb-4">
                ₹62,250
              </div>

              {/* CTA Row: Button + Wishlist Heart */}
              <div className="flex items-center gap-3">
                <Link
                  href="#heritage-gold-coin"
                  className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#064E3B] hover:bg-[#033629] text-white text-[13px] font-sans font-medium px-5 py-2.5 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                >
                  <span>View piece</span>
                  <span className="text-[14px]">→</span>
                </Link>

                <button
                  onClick={() => setIsHeroWishlisted(!isHeroWishlisted)}
                  aria-label="Add to wishlist"
                  className="p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-[#0A2D23]"
                >
                  <Heart
                    size={20}
                    className={`transition-colors duration-200 ${
                      isHeroWishlisted
                        ? "fill-[#D94F4F] text-[#D94F4F]"
                        : "text-[#0A2D23] hover:text-[#B6914C]"
                    }`}
                    strokeWidth={1.75}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT COLUMN: 3 Stacked Horizontal Cards                          */}
          {/* ----------------------------------------------------------------- */}
          <div className="flex flex-col justify-between gap-4 sm:gap-5">
            {/* 1. Card 02 / The First Gold Coin */}
            <div className="group flex flex-col sm:flex-row items-stretch bg-[#FAF8F5] rounded-[5px] border border-[#E7DFD3] hover:border-[#C5A059]/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden flex-1">
              {/* Product Photo */}
              <div className="relative w-full sm:w-[44%] min-h-[170px] sm:min-h-0 aspect-[4/3] sm:aspect-auto overflow-hidden bg-[#EAE2D5] shrink-0">
                <Image
                  src="/images/bilva/signature-first-gold-coin-2x.webp"
                  alt="The First Gold Coin 24K (999) 0.5g"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-5 sm:p-5.5 flex-1">
                <span className="text-[10px] sm:text-[10.5px] font-sans font-semibold tracking-[0.2em] text-[#B6914C] uppercase mb-1">
                  02 / SIGNATURE
                </span>
                <h3 className="font-serif text-[19px] sm:text-[20px] text-[#0A2D23] font-semibold leading-tight group-hover:text-[#8D6B30] transition-colors">
                  The First Gold Coin
                </h3>
                <p className="font-sans text-[12.5px] text-[#4F675D] font-normal mt-1 mb-2">
                  24K (999) · 0.5 g
                </p>
                <div className="font-sans text-[20px] sm:text-[21px] font-bold text-[#0A2D23] mb-3">
                  ₹6,225
                </div>
                <div>
                  <Link
                    href="#first-gold-coin"
                    className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#064E3B] hover:bg-[#033629] text-white text-[12.5px] font-sans font-medium px-4 py-2 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                  >
                    <span>View piece</span>
                    <span className="text-[13px]">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Card 03 / Silver Keepsake Coin (Distinctive soft sage card background) */}
            <div className="group flex flex-col sm:flex-row items-stretch bg-[#EEF4EE] rounded-[5px] border border-[#DAE4DA] hover:border-[#A2BFA6] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden flex-1">
              {/* Product Photo */}
              <div className="relative w-full sm:w-[44%] min-h-[170px] sm:min-h-0 aspect-[4/3] sm:aspect-auto overflow-hidden bg-[#DEE8DE] shrink-0">
                <Image
                  src="/images/bilva/signature-silver-peacock-coin-2x.webp"
                  alt="Silver Keepsake Coin 999 10g with Peacock Motif"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-5 sm:p-5.5 flex-1">
                <span className="text-[10px] sm:text-[10.5px] font-sans font-semibold tracking-[0.2em] text-[#A67C44] uppercase mb-1">
                  03 / SIGNATURE
                </span>
                <h3 className="font-serif text-[19px] sm:text-[20px] text-[#0A2D23] font-semibold leading-tight group-hover:text-[#8D6B30] transition-colors">
                  Silver Keepsake Coin
                </h3>
                <p className="font-sans text-[12.5px] text-[#4F675D] font-normal mt-1 mb-2">
                  Silver 999 · 10 g
                </p>
                <div className="font-sans text-[20px] sm:text-[21px] font-bold text-[#0A2D23] mb-3">
                  ₹1,650
                </div>
                <div>
                  <Link
                    href="#silver-keepsake-coin"
                    className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#064E3B] hover:bg-[#033629] text-white text-[12.5px] font-sans font-medium px-4 py-2 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                  >
                    <span>View piece</span>
                    <span className="text-[13px]">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Card 04 / The Celebration Gift Set */}
            <div className="group flex flex-col sm:flex-row items-stretch bg-[#FAF8F5] rounded-[5px] border border-[#E7DFD3] hover:border-[#C5A059]/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden flex-1">
              {/* Product Photo */}
              <div className="relative w-full sm:w-[44%] min-h-[170px] sm:min-h-0 aspect-[4/3] sm:aspect-auto overflow-hidden bg-[#EAE2D5] shrink-0">
                <Image
                  src="/images/bilva/signature-celebration-gift-set-2x.webp"
                  alt="The Celebration Gift Set in Emerald Presentation Box"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-5 sm:p-5.5 flex-1">
                <span className="text-[10px] sm:text-[10.5px] font-sans font-semibold tracking-[0.2em] text-[#B6914C] uppercase mb-1">
                  04 / SIGNATURE
                </span>
                <h3 className="font-serif text-[19px] sm:text-[20px] text-[#0A2D23] font-semibold leading-tight group-hover:text-[#8D6B30] transition-colors">
                  The Celebration Gift Set
                </h3>
                <p className="font-sans text-[12.5px] text-[#4F675D] font-normal mt-1 mb-2">
                  Curated gift set
                </p>
                <div className="font-sans text-[20px] sm:text-[21px] font-bold text-[#0A2D23] mb-3">
                  ₹15,900
                </div>
                <div>
                  <Link
                    href="#celebration-gift-set"
                    className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#064E3B] hover:bg-[#033629] text-white text-[12.5px] font-sans font-medium px-4 py-2 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                  >
                    <span>View piece</span>
                    <span className="text-[13px]">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* FOOTER NOTE                                                           */}
        {/* ===================================================================== */}
        <div className="flex justify-end mt-4">
          <p className="font-sans italic text-[11.5px] text-[#5A7369]">
            Illustrative product names and prices for layout preview.
          </p>
        </div>
      </div>
    </section>
  );
}
