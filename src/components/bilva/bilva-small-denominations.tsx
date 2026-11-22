"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";

type WeightOption = "0.5 g" | "1 g" | "2 g" | "5 g";
type MetalOption = "gold" | "silver";

export function BilvaSmallDenominations() {
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>("1 g");
  const [selectedMetal, setSelectedMetal] = useState<MetalOption>("gold");

  const purityText = selectedMetal === "gold" ? "24K (999)" : "Silver 999";
  const coinName = `${selectedWeight} ${selectedMetal === "gold" ? "Gold coin" : "Silver coin"}`;

  return (
    <section
      id="small-denominations"
      className="relative w-full bg-[#FAF7F2] text-[#0A2D23] select-none pt-8 sm:pt-12 lg:pt-14 pb-2 sm:pb-3 overflow-hidden"
      aria-labelledby="small-denominations-heading"
    >
      {/* =================================================================== */}
      {/* MAIN CONTAINER: 16:10 Editorial Spread matching exact design        */}
      {/* =================================================================== */}
      <div className={cn("relative", BILVA_SITE_SHELL_CLASS)}>
        {/* Visual Canvas Area (16:10 ratio on desktop) */}
        <div className="relative w-full lg:aspect-[16/10] lg:min-h-[640px] lg:max-h-[760px] overflow-hidden">
          {/* Desktop Master Photographic Backdrop (Full bleed within container) */}
          <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
            <Image
              src="/images/bilva/small-denominations-backdrop-master.webp"
              alt="Bilwa 24K pure gold coins in 0.5g, 1g, 2g, and 5g denominations on travertine pedestals with emerald silk drapery"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Mobile/Tablet Photographic Header (< lg screens) */}
          <div className="block lg:hidden relative w-full h-[250px] sm:h-[360px] mb-6 sm:mb-8 overflow-hidden rounded-[8px]">
            <Image
              src="/images/bilva/small-denominations-master.webp"
              alt="Bilwa gold coins in 0.5g, 1g, 2g, and 5g denominations"
              fill
              className="object-cover object-[center_35%]"
              priority
            />
            {/* Mobile floating card */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-[#FAF8F5]/95 backdrop-blur-md rounded-[8px] border border-[#C5A059]/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-3.5 min-w-[180px]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-sans text-[9px] font-semibold tracking-[0.2em] text-[#A67C44] uppercase">
                  SELECTED SIZE
                </span>
                <span className="w-6 h-[1px] bg-[#C5A059]/60" />
              </div>
              <div className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#0A2D23] leading-tight">
                {coinName}
              </div>
              <div className="font-sans text-[11.5px] text-[#4A5D55] mb-2">
                {purityText}
              </div>
              <Link
                href={`#catalog-${selectedWeight.replace(/\s+/g, "")}-${selectedMetal}`}
                className="inline-flex items-center gap-1 text-[12px] font-sans font-medium text-[#0A2D23] hover:text-[#A67C44] underline underline-offset-4"
              >
                <span>View pieces</span>
                <span className="text-[13px] leading-none">→</span>
              </Link>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* DESKTOP CONTENT GRID                                              */}
          {/* ----------------------------------------------------------------- */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 h-full items-start lg:items-center">
            {/* LEFT COLUMN: Typography & "Explore by weight" Card (42% width) */}
            <div className="lg:col-span-5 flex flex-col justify-center py-2 lg:py-4 lg:pl-2 lg:pr-4 max-w-[420px]">
              {/* Eyebrow with gold divider line */}
              <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
                <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.22em] text-[#A67C44] uppercase">
                  PRECIOUS STARTS HERE
                </span>
                <span className="w-12 sm:w-16 h-[1px] bg-[#C5A059]/70 inline-block" />
              </div>

              {/* Main Headline */}
              <h2
                id="small-denominations-heading"
                className="font-serif text-[30px] sm:text-[42px] lg:text-[45px] leading-[1.1] tracking-[-0.015em] text-[#0A2D23] font-normal mb-3 sm:mb-3.5"
              >
                Every beginning
                <span className="block font-serif text-[#0A2D23]">deserves something</span>
                <span className="block font-serif text-[#0A2D23]">precious.</span>
              </h2>

              {/* Subhead narrative */}
              <p className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#3E5B50] font-normal max-w-[370px] mb-5 sm:mb-6">
                Discover smaller gold and silver pieces designed for meaningful gifts and thoughtful milestones.
              </p>

              {/* Interactive "Explore by weight" Control Panel Card */}
              <div className="w-full max-w-[375px] bg-[#FAF8F5]/95 backdrop-blur-xs rounded-[14px] border border-[#DDD6C8] p-5 sm:p-5.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-serif text-[16.5px] font-semibold text-[#0A2D23] mb-3">
                  Explore by weight
                </h3>

                {/* Row 1: Weight Buttons (0.5 g, 1 g, 2 g, 5 g) */}
                <div className="grid grid-cols-4 gap-2 mb-2.5">
                  {(["0.5 g", "1 g", "2 g", "5 g"] as WeightOption[]).map((weight) => {
                    const isActive = selectedWeight === weight;
                    return (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        aria-pressed={isActive}
                        className={`py-2 px-1 text-center rounded-[6px] text-[13px] font-sans font-medium transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-[#064E3B] text-white shadow-xs font-semibold"
                            : "bg-[#FFFFFF] text-[#0A2D23] border border-[#D5CDC0] hover:border-[#A67C44] hover:bg-[#FAF8F5]"
                        }`}
                      >
                        {weight}
                      </button>
                    );
                  })}
                </div>

                {/* Row 2: Metal Option Toggle (Gold / Silver) */}
                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  {/* Gold Button */}
                  <button
                    onClick={() => setSelectedMetal("gold")}
                    aria-pressed={selectedMetal === "gold"}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-[6px] text-[13px] font-sans font-medium transition-all duration-200 cursor-pointer ${
                      selectedMetal === "gold"
                        ? "bg-[#064E3B] text-white shadow-xs font-semibold"
                        : "bg-[#FFFFFF] text-[#4A5D55] border border-[#D5CDC0] hover:border-[#A67C44] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    {/* Gold bullion icon */}
                    <span className="w-4 h-3 flex items-center justify-center">
                      <svg viewBox="0 0 20 14" fill="none" className="w-full h-full">
                        <path d="M2 12L5 4H15L18 12H2Z" fill="#D4AF37" stroke="#A67C1E" strokeWidth="0.8" />
                        <path d="M5 4L7.5 1H12.5L15 4H5Z" fill="#F5DF88" stroke="#A67C1E" strokeWidth="0.8" />
                      </svg>
                    </span>
                    <span>Gold</span>
                  </button>

                  {/* Silver Button */}
                  <button
                    onClick={() => setSelectedMetal("silver")}
                    aria-pressed={selectedMetal === "silver"}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-[6px] text-[13px] font-sans font-medium transition-all duration-200 cursor-pointer ${
                      selectedMetal === "silver"
                        ? "bg-[#064E3B] text-white shadow-xs font-semibold"
                        : "bg-[#FFFFFF] text-[#4A5D55] border border-[#D5CDC0] hover:border-[#A67C44] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    {/* Silver bullion icon */}
                    <span className="w-4 h-3 flex items-center justify-center">
                      <svg viewBox="0 0 20 14" fill="none" className="w-full h-full">
                        <path d="M2 12L5 4H15L18 12H2Z" fill="#B0B8B5" stroke="#7A8582" strokeWidth="0.8" />
                        <path d="M5 4L7.5 1H12.5L15 4H5Z" fill="#E2E7E5" stroke="#7A8582" strokeWidth="0.8" />
                      </svg>
                    </span>
                    <span>Silver</span>
                  </button>
                </div>

                {/* Row 3: Action Button */}
                <Link
                  href={`#catalog-${selectedWeight.replace(/\s+/g, "")}-${selectedMetal}`}
                  className="w-full py-3 px-4 rounded-[6px] bg-[#064E3B] hover:bg-[#033629] text-white font-sans font-medium text-[14px] tracking-[0.02em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  <span>Explore small coins</span>
                  <span className="text-[16px] leading-none">→</span>
                </Link>

                {/* Disclaimer */}
                <p className="font-sans italic text-[11px] text-[#5A7369] mt-2.5">
                  Available weights vary by metal and design.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Empty spacer on desktop because the background contains the visual photography */}
            <div className="hidden lg:block lg:col-span-7 h-full pointer-events-none" />
          </div>

          {/* Floating "SELECTED SIZE" Glass Card (Bottom Right on Desktop) */}
          <div className="hidden lg:block absolute bottom-8 sm:bottom-10 right-4 sm:right-6 xl:right-8 z-20 bg-[#FAF8F5]/95 backdrop-blur-md rounded-[12px] border border-[#C5A059]/60 shadow-[0_8px_28px_rgba(0,0,0,0.08)] p-4 sm:p-5 min-w-[210px] sm:min-w-[230px] transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-sans text-[9.5px] sm:text-[10px] font-semibold tracking-[0.2em] text-[#A67C44] uppercase">
                SELECTED SIZE
              </span>
              <span className="w-8 h-[1px] bg-[#C5A059]/60" />
            </div>

            {/* Coin Title (Dynamic with user click) */}
            <div className="font-serif text-[22px] sm:text-[24px] font-semibold text-[#0A2D23] leading-tight mb-0.5">
              {coinName}
            </div>

            {/* Purity */}
            <div className="font-sans text-[12.5px] sm:text-[13px] text-[#4A5D55] mb-2.5">
              {purityText}
            </div>

            {/* View pieces link */}
            <Link
              href={`#view-piece-${selectedWeight.replace(/\s+/g, "")}-${selectedMetal}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-medium text-[#0A2D23] hover:text-[#A67C44] underline underline-offset-4 transition-colors group cursor-pointer"
            >
              <span>View pieces</span>
              <span className="text-[14px] leading-none transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* =================================================================== */}
        {/* BOTTOM SLOGAN: "Small in size. Lasting in meaning."                  */}
        {/* =================================================================== */}
        <p className="font-serif italic text-[17px] sm:text-[19px] text-[#0A2D23] tracking-wide text-center mt-5 sm:mt-6 pb-1">
          Small in size. Lasting in meaning.
        </p>
      </div>
    </section>
  );
}
