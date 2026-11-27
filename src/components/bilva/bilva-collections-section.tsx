"use client";

import Image from "next/image";
import Link from "next/link";

import { HOME_COLLECTIONS } from "@/data/bilva/collections";
import { GOLD_COINS_AND_BARS_PATH } from "@/lib/bilva-collection-routes";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";

const COLLECTIONS = HOME_COLLECTIONS;

export function BilvaCollectionsSection() {
  return (
    <section
      id="explore-collections"
      className="relative w-full bg-[#FAF7F2] pb-6 sm:pb-8 lg:pb-10 overflow-hidden select-none"
    >
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* ===================================================================== */}
        {/* SECTION HEADER                                                        */}
        {/* ===================================================================== */}
        <div className="flex flex-col gap-4 mb-7 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Kicker / Eyebrow */}
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.22em] text-[#A67C44] uppercase block mb-1.5">
              CURATED WITH INTENTION
            </span>

            {/* Main Headline */}
            <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.015em] text-[#0A2D23] font-semibold">
              Explore our collections
            </h2>

            {/* Subhead */}
            <p className="font-sans text-[14px] sm:text-[15.5px] text-[#425E53] font-normal mt-1">
              Precious metals, meaningful treasures, exceptional gifts.
            </p>
          </div>

          {/* Right Action: View all collections */}
          <div className="shrink-0 pb-1 w-full sm:w-auto">
            <Link
              href={GOLD_COINS_AND_BARS_PATH}
              className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-sans font-medium text-[#0A2D23] hover:text-[#A67C44] transition-colors border-b border-[#0A2D23] hover:border-[#A67C44] pb-0.5 group cursor-pointer max-sm:w-full max-sm:justify-between"
            >
              <span>View all collections</span>
              <span className="text-[16px] leading-none transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 1. BENTO GRID: DESKTOP MOSAIC (>= 1024px)                             */}
        {/* ===================================================================== */}
        <div
          className="hidden lg:grid w-full gap-2.5 xl:gap-3 aspect-[1200/680]"
          style={{
            gridTemplateColumns: "411fr 208fr 82fr 227fr",
            gridTemplateRows: "212fr 187fr 173fr",
          }}
        >
          {COLLECTIONS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-label={`Explore ${item.title} collection`}
              className={`group relative block w-full h-full overflow-hidden rounded-[2px] bg-[#0A2D23] ${item.desktopCol} ${item.desktopRow} cursor-pointer shadow-xs hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Background Clean Master Jewelry Photography */}
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 1280px) 50vw, 33vw"
                priority={item.id === "gold-coins-and-bars"}
              />

              {/* Gradient Scrim for Contrast */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#02281F] via-[#02281F]/75 to-transparent pointer-events-none" />

              {/* Fine Border Ring */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />

              {/* Live HTML Content & Typography */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                <h3
                  className={`font-serif font-semibold text-white tracking-[-0.01em] leading-tight drop-shadow-xs ${item.titleSize}`}
                >
                  {item.title}
                </h3>

                <div className="inline-flex items-center gap-1.5 font-sans text-[12.5px] sm:text-[13.5px] text-white/90 group-hover:text-white mt-1.5 transition-colors">
                  <span>Explore collection</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/60 text-white text-[11px] group-hover:border-white group-hover:bg-white group-hover:text-[#0A2D23] transition-all">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ===================================================================== */}
        {/* 2. TABLET ADAPTIVE GRID (640px to 1023px)                             */}
        {/* ===================================================================== */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
          {/* Card 1: Gold coins & bars */}
          <Link
            href={COLLECTIONS[0].href}
            aria-label={`Explore ${COLLECTIONS[0].title} collection`}
            className="group relative block w-full aspect-[4/3.5] overflow-hidden rounded-[2px] bg-[#0A2D23] cursor-pointer shadow-xs hover:shadow-lg"
          >
            <Image
              src={COLLECTIONS[0].image}
              alt={COLLECTIONS[0].alt}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02281F] via-[#02281F]/75 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
              <h3 className="font-serif text-[24px] font-semibold text-white tracking-[-0.01em] leading-tight">
                {COLLECTIONS[0].title}
              </h3>
              <div className="inline-flex items-center gap-1.5 font-sans text-[13px] text-white/90 group-hover:text-white mt-1.5">
                <span>Explore collection</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/60 text-white text-[11px] group-hover:border-white group-hover:bg-white group-hover:text-[#0A2D23] transition-all">
                  ↗
                </span>
              </div>
            </div>
          </Link>

          {/* Card 2: Silver coins & bars */}
          <Link
            href={COLLECTIONS[1].href}
            aria-label={`Explore ${COLLECTIONS[1].title} collection`}
            className="group relative block w-full aspect-[4/3.5] overflow-hidden rounded-[2px] bg-[#0A2D23] cursor-pointer shadow-xs hover:shadow-lg"
          >
            <Image
              src={COLLECTIONS[1].image}
              alt={COLLECTIONS[1].alt}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02281F] via-[#02281F]/75 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
              <h3 className="font-serif text-[22px] font-semibold text-white tracking-[-0.01em] leading-tight">
                {COLLECTIONS[1].title}
              </h3>
              <div className="inline-flex items-center gap-1.5 font-sans text-[13px] text-white/90 group-hover:text-white mt-1.5">
                <span>Explore collection</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/60 text-white text-[11px] group-hover:border-white group-hover:bg-white group-hover:text-[#0A2D23] transition-all">
                  ↗
                </span>
              </div>
            </div>
          </Link>

          {/* Card 3: Rudraksh */}
          <Link
            href={COLLECTIONS[2].href}
            aria-label={`Explore ${COLLECTIONS[2].title} collection`}
            className="group relative block w-full aspect-[4/3] overflow-hidden rounded-[2px] bg-[#0A2D23] cursor-pointer shadow-xs hover:shadow-lg"
          >
            <Image
              src={COLLECTIONS[2].image}
              alt={COLLECTIONS[2].alt}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#02281F] via-[#02281F]/75 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end">
              <h3 className="font-serif text-[20px] font-semibold text-white tracking-[-0.01em] leading-tight">
                {COLLECTIONS[2].title}
              </h3>
              <div className="inline-flex items-center gap-1.5 font-sans text-[12.5px] text-white/90 group-hover:text-white mt-1">
                <span>Explore collection</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/60 text-white text-[11px] group-hover:border-white group-hover:bg-white group-hover:text-[#0A2D23] transition-all">
                  ↗
                </span>
              </div>
            </div>
          </Link>

          {/* Card 4: Gemstones */}
          <Link
            href={COLLECTIONS[3].href}
            aria-label={`Explore ${COLLECTIONS[3].title} collection`}
            className="group relative block w-full aspect-[4/3] overflow-hidden rounded-[2px] bg-[#0A2D23] cursor-pointer shadow-xs hover:shadow-lg"
          >
            <Image
              src={COLLECTIONS[3].image}
              alt={COLLECTIONS[3].alt}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#02281F] via-[#02281F]/75 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end">
              <h3 className="font-serif text-[20px] font-semibold text-white tracking-[-0.01em] leading-tight">
                {COLLECTIONS[3].title}
              </h3>
              <div className="inline-flex items-center gap-1.5 font-sans text-[12.5px] text-white/90 group-hover:text-white mt-1">
                <span>Explore collection</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/60 text-white text-[11px] group-hover:border-white group-hover:bg-white group-hover:text-[#0A2D23] transition-all">
                  ↗
                </span>
              </div>
            </div>
          </Link>

          {/* Card 5: Corporate gifting (Full width banner on tablet) */}
          <Link
            href={COLLECTIONS[5].href}
            aria-label={`Explore ${COLLECTIONS[5].title} collection`}
            className="col-span-2 group relative block w-full aspect-[16/7] overflow-hidden rounded-[2px] bg-[#0A2D23] cursor-pointer shadow-xs hover:shadow-lg"
          >
            <Image
              src={COLLECTIONS[5].image}
              alt={COLLECTIONS[5].alt}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="100vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02281F] via-[#02281F]/75 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
              <h3 className="font-serif text-[24px] font-semibold text-white tracking-[-0.01em] leading-tight">
                {COLLECTIONS[5].title}
              </h3>
              <div className="inline-flex items-center gap-1.5 font-sans text-[13px] text-white/90 group-hover:text-white mt-1.5">
                <span>Explore collection</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/60 text-white text-[11px] group-hover:border-white group-hover:bg-white group-hover:text-[#0A2D23] transition-all">
                  ↗
                </span>
              </div>
            </div>
          </Link>

          {/* Card 6: Premium gifting (Full width banner on tablet) */}
          <Link
            href={COLLECTIONS[4].href}
            aria-label={`Explore ${COLLECTIONS[4].title} collection`}
            className="col-span-2 group relative block w-full aspect-[16/7.5] overflow-hidden rounded-[2px] bg-[#0A2D23] cursor-pointer shadow-xs hover:shadow-lg"
          >
            <Image
              src={COLLECTIONS[4].image}
              alt={COLLECTIONS[4].alt}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="100vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02281F] via-[#02281F]/75 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
              <h3 className="font-serif text-[24px] font-semibold text-white tracking-[-0.01em] leading-tight">
                {COLLECTIONS[4].title}
              </h3>
              <div className="inline-flex items-center gap-1.5 font-sans text-[13px] text-white/90 group-hover:text-white mt-1.5">
                <span>Explore collection</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/60 text-white text-[11px] group-hover:border-white group-hover:bg-white group-hover:text-[#0A2D23] transition-all">
                  ↗
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* ===================================================================== */}
        {/* 3. MOBILE ADAPTIVE STACK (< 640px)                                    */}
        {/* ===================================================================== */}
        <div className="grid sm:hidden grid-cols-1 gap-4">
          {COLLECTIONS.map((item) => (
            <Link
              key={`mobile-${item.id}`}
              href={item.href}
              aria-label={`Explore ${item.title} collection`}
              className="group relative block w-full aspect-[16/10] overflow-hidden rounded-[2px] bg-[#0A2D23] cursor-pointer shadow-xs hover:shadow-md"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="100vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#02281F] via-[#02281F]/80 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end">
                <h3 className="font-serif text-[22px] font-semibold text-white tracking-[-0.01em] leading-tight">
                  {item.title}
                </h3>
                <div className="inline-flex items-center gap-1.5 font-sans text-[12.5px] text-white/90 group-hover:text-white mt-1.5">
                  <span>Explore collection</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/60 text-white text-[11px] group-hover:border-white group-hover:bg-white group-hover:text-[#0A2D23] transition-all">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
