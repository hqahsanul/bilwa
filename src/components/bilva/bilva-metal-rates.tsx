"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Radio } from "lucide-react";

import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";

export function BilvaMetalRates() {
  return (
    <section className="relative w-full bg-[#FAF7F2] py-6 sm:py-8 lg:py-10 select-none border-t border-[#EAE3D6]">
      <div
        className={cn(
          "relative overflow-hidden rounded-[18px] bg-[radial-gradient(ellipse_at_top_right,_#F2E7D2_0%,_#FAF7F2_58%)] py-6 sm:py-8",
          BILVA_SITE_SHELL_CLASS,
        )}
      >
        {/* Decorative Guilloché Background Wave Lines in Top Right */}
        <div className="absolute -top-10 right-0 w-[min(100vw,280px)] sm:w-[420px] lg:w-[520px] h-[240px] sm:h-[360px] lg:h-[460px] pointer-events-none opacity-30">
          <svg
            viewBox="0 0 520 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#C5A059]"
          >
            <path
              d="M 520 30 C 370 80, 180 260, 520 430"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.3"
            />
            <path
              d="M 520 70 C 330 130, 150 310, 520 470"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.25"
            />
            <path
              d="M 520 110 C 290 180, 120 360, 520 510"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.2"
            />
          </svg>
        </div>
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER & INTELLIGENCE STATUS                                   */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5 sm:mb-6">
          <div>
            {/* Kicker / Eyebrow with gold horizontal trailing rule */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.22em] text-[#A67C44] uppercase">
                TRANSPARENCY IN EVERY GRAM
              </span>
              <span className="w-16 sm:w-20 h-[1px] bg-[#C5A059]/70 inline-block" />
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.1] tracking-[-0.015em] text-[#0A2D23] font-bold">
              Today’s precious metal rates
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-[15px] sm:text-[16.5px] text-[#355046] font-medium mt-1">
              Market intelligence to help you make an informed buying decision.
            </p>
          </div>

          {/* Right Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 pb-1 w-full lg:w-auto">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCEBE3] border border-[#C6DDD1]">
              <span className="flex items-center text-[#14473B]">
                <Radio size={13} className="animate-pulse" />
              </span>
              <span className="text-[11px] sm:text-[12px] font-sans font-bold tracking-wider text-[#14473B] uppercase">
                ILLUSTRATIVE DATA • NOT LIVE
              </span>
            </div>

            {/* Divider */}
            <span className="text-[#C5D5CC] hidden sm:inline-block">|</span>

            {/* Timestamp */}
            <div className="inline-flex items-center gap-1.5 text-[12.5px] sm:text-[13px] font-sans font-semibold text-[#233D33]">
              <Clock size={15} className="text-[#2F473D]" />
              <span>Example: 13 Nov, 10:30 AM</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TWO PRECIOUS METAL RATE CARDS (GOLD & SILVER)                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {/* -------------------- CARD 1: GOLD 24K (999) -------------------- */}
          <div className="bg-gradient-to-b from-[#FCF9F3] to-[#F7F1E5] rounded-[16px] border border-[#DFD2BE] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            {/* Upper Content: Coin + Hairline Divider + Price Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Embossed Gold Coin */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-30 lg:h-30 shrink-0 drop-shadow-md mx-auto sm:mx-0">
                <Image
                  src="/images/bilva/gold-coin-24k-master.png"
                  alt="Bilwa Gold 24K 999 Coin"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Vertical Hairline Divider */}
              <div className="hidden sm:block w-[1px] h-20 sm:h-24 bg-[#DFD2BE] shrink-0 mx-2 sm:mx-3" />

              {/* Price Details */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="font-sans text-[15px] sm:text-[18px] font-bold tracking-[0.03em] text-[#0A2D23] uppercase">
                  GOLD 24K (999)
                </div>

                <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-0.5">
                  <span className="font-serif text-[38px] sm:text-[44px] lg:text-[48px] font-bold text-[#0A2D23] leading-none">
                    ₹12,450
                  </span>
                  <span className="font-sans text-[16px] sm:text-[18px] text-[#3E594E] font-medium">
                    / gram
                  </span>
                </div>

                {/* Diff Pill */}
                <div className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 px-3.5 py-1 rounded-full bg-[#E1EFE8] border border-[#CEE1D7] text-[#14473B] text-[12px] sm:text-[13px] font-semibold mt-2 max-w-full">
                  <span className="text-[#2C473C]">Compared with yesterday:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#14473B]">
                    <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#C8E0D3] text-[11px] font-bold">↓</span>
                    ₹80 (0.64%)
                  </span>
                </div>
              </div>
            </div>

            {/* Lower Content: 7-Day Trend Container */}
            <div className="bg-[#E6EFE9] rounded-[12px] border border-[#CEDFD5] p-2.5 sm:p-3 mt-3.5 sm:mt-4 flex items-center justify-between gap-2.5 sm:gap-3">
              {/* Left Column: Past 7 Days / 7-DAY TREND */}
              <div className="w-18 sm:w-22 shrink-0">
                <span className="block text-[10.5px] sm:text-[11px] font-sans font-semibold text-[#3E594E] uppercase tracking-wider">
                  Past 7 days
                </span>
                <span className="block text-[14px] sm:text-[15px] font-sans font-extrabold text-[#0A2D23] tracking-wide leading-tight">
                  7-DAY
                </span>
                <span className="block text-[14px] sm:text-[15px] font-sans font-extrabold text-[#0A2D23] tracking-wide leading-tight">
                  TREND
                </span>
              </div>

              {/* Divider */}
              <div className="w-[1px] h-11 bg-[#CAD8CF] shrink-0" />

              {/* Center: Sparkline SVG Curve with Fill, Nodes, and Day Labels */}
              <div className="flex-1 h-14 sm:h-16 relative flex items-center justify-center min-w-0">
                <svg
                  viewBox="0 0 240 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="gold-trend-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D695B" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#0D695B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient Area Fill Under Curve */}
                  <path
                    d="M 15 25 C 30 25, 33 31, 50 31 C 67 31, 70 21, 85 21 C 102 21, 105 15, 120 15 C 137 15, 140 28, 155 28 C 172 28, 175 22, 190 22 C 207 22, 210 17, 225 17 L 225 44 L 15 44 Z"
                    fill="url(#gold-trend-fill)"
                  />

                  {/* Trend Line */}
                  <path
                    d="M 15 25 C 30 25, 33 31, 50 31 C 67 31, 70 21, 85 21 C 102 21, 105 15, 120 15 C 137 15, 140 28, 155 28 C 172 28, 175 22, 190 22 C 207 22, 210 17, 225 17"
                    stroke="#0D695B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* 7 Circular Nodes */}
                  {[
                    [15, 25],
                    [50, 31],
                    [85, 21],
                    [120, 15],
                    [155, 28],
                    [190, 22],
                    [225, 17],
                  ].map(([cx, cy], i) => (
                    <circle
                      key={`gold-node-${i}`}
                      cx={cx}
                      cy={cy}
                      r="3"
                      fill="#FFFFFF"
                      stroke="#0D695B"
                      strokeWidth="1.8"
                    />
                  ))}

                  {/* D1..D7 Day Labels */}
                  {["D1", "D2", "D3", "D4", "D5", "D6", "D7"].map((label, i) => {
                    const xs = [15, 50, 85, 120, 155, 190, 225];
                    return (
                      <text
                        key={label}
                        x={xs[i]}
                        y="51"
                        textAnchor="middle"
                        fontSize="9"
                        fontFamily="sans-serif"
                        fill="#526E63"
                      >
                        {label}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* Divider */}
              <div className="w-[1px] h-11 bg-[#CAD8CF] shrink-0" />

              {/* Right Column: Yesterday Rate */}
              <div className="w-18 sm:w-22 shrink-0 text-right">
                <span className="block text-[10.5px] sm:text-[11px] font-sans font-semibold text-[#3E594E] uppercase tracking-wider">
                  Yesterday
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D5E6DD] text-[15px] sm:text-[17px] font-serif font-bold text-[#0A2D23] leading-tight mt-0.5">
                  ₹12,530
                </span>
              </div>
            </div>

            {/* Design Preview Caption */}
            <div className="border-t border-[#D8C6A8]/70 text-center mt-2.5 pt-2">
              <span className="font-serif italic text-[12.5px] sm:text-[13.5px] font-medium text-[#466155]">
                Sample rates for design preview
              </span>
            </div>
          </div>

          {/* -------------------- CARD 2: SILVER 999 -------------------- */}
          <div className="bg-gradient-to-b from-[#FCF9F3] to-[#F7F1E5] rounded-[16px] border border-[#DFD2BE] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            {/* Upper Content: Coin + Hairline Divider + Price Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Embossed Silver Coin */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-30 lg:h-30 shrink-0 drop-shadow-md mx-auto sm:mx-0">
                <Image
                  src="/images/bilva/silver-coin-999-master.png"
                  alt="Bilwa Silver 999 Coin"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Vertical Hairline Divider */}
              <div className="hidden sm:block w-[1px] h-20 sm:h-24 bg-[#DFD2BE] shrink-0 mx-2 sm:mx-3" />

              {/* Price Details */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="font-sans text-[15px] sm:text-[18px] font-bold tracking-[0.03em] text-[#0A2D23] uppercase">
                  SILVER 999
                </div>

                <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-0.5">
                  <span className="font-serif text-[38px] sm:text-[44px] lg:text-[48px] font-bold text-[#0A2D23] leading-none">
                    ₹165
                  </span>
                  <span className="font-sans text-[16px] sm:text-[18px] text-[#3E594E] font-medium">
                    / gram
                  </span>
                </div>

                {/* Diff Pill */}
                <div className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 px-3.5 py-1 rounded-full bg-[#E1EFE8] border border-[#CEE1D7] text-[#14473B] text-[12px] sm:text-[13px] font-semibold mt-2 max-w-full">
                  <span className="text-[#2C473C]">Compared with yesterday:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#7A541E]">
                    <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#F5E6C4] text-[#7A541E] text-[11px] font-bold">↑</span>
                    ₹3 (1.85%)
                  </span>
                </div>
              </div>
            </div>

            {/* Lower Content: 7-Day Trend Container */}
            <div className="bg-[#E6EFE9] rounded-[12px] border border-[#CEDFD5] p-2.5 sm:p-3 mt-3.5 sm:mt-4 flex items-center justify-between gap-2.5 sm:gap-3">
              {/* Left Column: Past 7 Days / 7-DAY TREND */}
              <div className="w-18 sm:w-22 shrink-0">
                <span className="block text-[10.5px] sm:text-[11px] font-sans font-semibold text-[#3E594E] uppercase tracking-wider">
                  Past 7 days
                </span>
                <span className="block text-[14px] sm:text-[15px] font-sans font-extrabold text-[#0A2D23] tracking-wide leading-tight">
                  7-DAY
                </span>
                <span className="block text-[14px] sm:text-[15px] font-sans font-extrabold text-[#0A2D23] tracking-wide leading-tight">
                  TREND
                </span>
              </div>

              {/* Divider */}
              <div className="w-[1px] h-11 bg-[#CAD8CF] shrink-0" />

              {/* Center: Sparkline SVG Curve with Fill, Nodes, and Day Labels */}
              <div className="flex-1 h-14 sm:h-16 relative flex items-center justify-center min-w-0">
                <svg
                  viewBox="0 0 240 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="silver-trend-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D695B" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#0D695B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient Area Fill Under Curve */}
                  <path
                    d="M 15 26 C 30 26, 33 32, 50 32 C 67 32, 70 23, 85 23 C 102 23, 105 16, 120 16 C 137 16, 140 28, 155 28 C 172 28, 175 23, 190 23 C 207 23, 210 16, 225 16 L 225 44 L 15 44 Z"
                    fill="url(#silver-trend-fill)"
                  />

                  {/* Trend Line */}
                  <path
                    d="M 15 26 C 30 26, 33 32, 50 32 C 67 32, 70 23, 85 23 C 102 23, 105 16, 120 16 C 137 16, 140 28, 155 28 C 172 28, 175 23, 190 23 C 207 23, 210 16, 225 16"
                    stroke="#0D695B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* 7 Circular Nodes */}
                  {[
                    [15, 26],
                    [50, 32],
                    [85, 23],
                    [120, 16],
                    [155, 28],
                    [190, 23],
                    [225, 16],
                  ].map(([cx, cy], i) => (
                    <circle
                      key={`silver-node-${i}`}
                      cx={cx}
                      cy={cy}
                      r="3"
                      fill="#FFFFFF"
                      stroke="#0D695B"
                      strokeWidth="1.8"
                    />
                  ))}

                  {/* D1..D7 Day Labels */}
                  {["D1", "D2", "D3", "D4", "D5", "D6", "D7"].map((label, i) => {
                    const xs = [15, 50, 85, 120, 155, 190, 225];
                    return (
                      <text
                        key={label}
                        x={xs[i]}
                        y="51"
                        textAnchor="middle"
                        fontSize="9"
                        fontFamily="sans-serif"
                        fill="#526E63"
                      >
                        {label}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* Divider */}
              <div className="w-[1px] h-11 bg-[#CAD8CF] shrink-0" />

              {/* Right Column: Yesterday Rate */}
              <div className="w-18 sm:w-22 shrink-0 text-right">
                <span className="block text-[10.5px] sm:text-[11px] font-sans font-semibold text-[#3E594E] uppercase tracking-wider">
                  Yesterday
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D5E6DD] text-[15px] sm:text-[17px] font-serif font-bold text-[#0A2D23] leading-tight mt-0.5">
                  ₹162
                </span>
              </div>
            </div>

            {/* Design Preview Caption */}
            <div className="border-t border-[#D8C6A8]/70 text-center mt-2.5 pt-2">
              <span className="font-serif italic text-[12.5px] sm:text-[13.5px] font-medium text-[#466155]">
                Sample rates for design preview
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. 'BEGIN WITH A SMALLER PIECE' BANNER                                    */}
        {/* ========================================================================= */}
        <div
          id="begin-smaller-piece"
          className="relative w-full rounded-[14px] border border-[#CCE0D6] bg-gradient-to-r from-[#EFECE2] via-[#E1EDE5] to-[#D4E6DC] p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 mt-4 sm:mt-5 overflow-hidden shadow-xs"
        >
          {/* Subtle Guilloché Wave Texture */}
          <svg
            className="absolute right-0 top-0 bottom-0 w-96 text-[#B8D3C6] opacity-35 pointer-events-none"
            viewBox="0 0 380 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M 0 50 C 120 20, 240 90, 380 35" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 0 75 C 140 45, 260 105, 380 60" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 0 100 C 160 70, 280 120, 380 85" stroke="currentColor" strokeWidth="0.8" />
          </svg>

          {/* Left: 1g and 0.5g Overlapping Gold Coins */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="relative w-26 h-18 sm:w-30 sm:h-20 lg:w-32 lg:h-22 drop-shadow-sm">
              <Image
                src="/images/bilva/coins-small-denominations-master.png"
                alt="Bilwa 1g and 0.5g Gold Coins"
                fill
                className="object-contain"
              />
            </div>

            {/* Vertical Hairline Divider */}
            <div className="w-[1px] h-14 bg-[#BDD2C7] shrink-0 mx-2 hidden md:block" />
          </div>

          {/* Center: Editorial Copy */}
          <div className="flex-1 text-center md:text-left z-10">
            <h3 className="font-serif text-[23px] sm:text-[26px] lg:text-[28px] font-bold text-[#0A2D23] leading-snug">
              Begin with a smaller piece
            </h3>
            <p className="font-sans text-[14px] sm:text-[15.5px] font-medium text-[#2E4B40] mt-0.5 max-w-xl">
              Explore thoughtfully sized gold and silver coins, made for meaningful beginnings.
            </p>
          </div>

          {/* Right: CTA Pill Button */}
          <div className="shrink-0 z-10">
            <Link
              href="#small-denominations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#0B4437] hover:bg-[#07352B] active:scale-[0.98] text-[#FFFFFF] font-sans text-[14px] sm:text-[15px] font-semibold tracking-[0.02em] shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <span className="sm:hidden">Small denominations</span>
              <span className="hidden sm:inline">Explore small denominations</span>
              <span className="text-[15px] leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. DISCLAIMER NOTICE BAR                                                  */}
        {/* ========================================================================= */}
        <div className="w-full bg-[#E7F0EB] rounded-[10px] border border-[#CEE0D7] px-4 sm:px-5 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs mt-3 sm:mt-3.5">
          <div className="flex items-center gap-3 text-[#2E4B40] leading-relaxed text-center sm:text-left">
            <div className="h-5 w-5 rounded-full border border-[#0A2D23] flex items-center justify-center text-[#0A2D23] shrink-0 font-serif font-bold text-[11px]">
              i
            </div>
            <span className="text-[#C2D1C9] hidden sm:inline-block">|</span>
            <p className="text-[12.5px] sm:text-[13.5px] font-medium text-[#2E4B40]">
              Changes reflect the metal reference rate, not the final price of a product. Taxes and applicable charges shown at checkout.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[#C2D1C9] hidden sm:inline-block">|</span>
            <Link
              href="#how-pricing-works"
              className="text-[12.5px] sm:text-[13.5px] font-semibold text-[#0A2D23] hover:text-[#A67C44] underline hover:no-underline transition-colors whitespace-nowrap"
            >
              How pricing works →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
