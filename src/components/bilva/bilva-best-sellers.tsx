"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

import { BEST_SELLER_PRODUCTS } from "@/data/bilva/best-sellers";
import { BAG_PATH, GOLD_COINS_AND_BARS_PATH } from "@/lib/bilva-collection-routes";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";

const products = BEST_SELLER_PRODUCTS;

export function BilvaBestSellers() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [addedId, setAddedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToBag = (id: string) => {
    setAddedId(id);
    setTimeout(() => {
      setAddedId(null);
      router.push(BAG_PATH);
    }, 600);
  };

  const scrollPrev = () => {
    const next = (activeSlide - 1 + products.length) % products.length;
    scrollToIndex(next);
  };

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-bestseller-card]");
    const card = cards[index];
    if (!card) return;
    const isMobileStrip = window.matchMedia("(max-width: 639px)").matches;
    const left = isMobileStrip
      ? index * container.clientWidth
      : card.offsetLeft;
    container.scrollTo({
      left,
      behavior: "smooth",
    });
    setActiveSlide(index);
  }, []);

  const scrollNext = () => {
    const next = (activeSlide + 1) % products.length;
    scrollToIndex(next);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const syncActiveFromScroll = () => {
      const cards = container.querySelectorAll<HTMLElement>("[data-bestseller-card]");
      if (!cards.length) return;

      const slideWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;

      if (slideWidth > 0 && window.matchMedia("(max-width: 639px)").matches) {
        const index = Math.min(
          products.length - 1,
          Math.max(0, Math.round(scrollLeft / slideWidth))
        );
        setActiveSlide(index);
        return;
      }

      let closest = 0;
      let closestDist = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const dist = Math.abs(card.offsetLeft - scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = index;
        }
      });

      setActiveSlide(closest);
    };

    container.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => container.removeEventListener("scroll", syncActiveFromScroll);
  }, []);

  return (
    <section
      id="best-sellers"
      className="w-full bg-[#FAF7F2] pt-2 sm:pt-4 pb-6 sm:pb-8"
      aria-labelledby="best-sellers-heading"
    >
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* ===================================================================== */}
        {/* SECTION HEADER                                                        */}
        {/* ===================================================================== */}
        <div className="mb-8 sm:mb-10">
          {/* Eyebrow with gold divider line */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.22em] text-[#A67C44] uppercase">
              CUSTOMER FAVOURITES
            </span>
            <span className="w-10 sm:w-12 h-[1px] bg-[#C5A059]/70" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3 sm:block">
                <h2
                  id="best-sellers-heading"
                  className="font-serif text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.1] tracking-[-0.015em] text-[#0A2D23] font-semibold"
                >
                  Best Sellers
                </h2>

                {/* Mobile: arrows beside title (aligned to headline) */}
                <div className="flex shrink-0 items-center gap-2 pt-1 sm:hidden">
                  <button
                    onClick={scrollPrev}
                    aria-label="Previous best sellers"
                    className="h-9 w-9 rounded-full border border-[#C5B8A5] text-[#0A2D23] flex items-center justify-center active:scale-95 cursor-pointer"
                  >
                    <ArrowLeft size={15} strokeWidth={1.75} />
                  </button>
                  <button
                    onClick={scrollNext}
                    aria-label="Next best sellers"
                    className="h-9 w-9 rounded-full border border-[#C5B8A5] text-[#0A2D23] flex items-center justify-center active:scale-95 cursor-pointer"
                  >
                    <ArrowRight size={15} strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              <p className="font-sans text-[14.5px] sm:text-[16px] text-[#425E53] font-normal mt-1.5">
                Treasured choices from our retail collections.
              </p>

              <Link
                href={GOLD_COINS_AND_BARS_PATH}
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] sm:text-[14.5px] font-sans font-medium text-[#0A2D23] hover:text-[#A67C44] transition-colors border-b border-[#0A2D23] hover:border-[#A67C44] pb-0.5 group cursor-pointer"
              >
                <span>View all best sellers</span>
                <span className="text-[15px] leading-none transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Tablet/desktop: view-all row + arrows */}
            <div className="hidden sm:flex items-center gap-6 shrink-0 pb-1">
              <Link
                href={GOLD_COINS_AND_BARS_PATH}
                className="text-[14.5px] font-sans font-medium text-[#0A2D23] hover:text-[#A67C44] transition-colors border-b border-[#0A2D23] hover:border-[#A67C44] pb-0.5 group cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>View all best sellers</span>
                <span className="text-[15px] leading-none transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollPrev}
                  aria-label="Previous best sellers"
                  className="h-9 w-9 rounded-full border border-[#C5B8A5] hover:border-[#0A2D23] text-[#0A2D23] hover:bg-[#0A2D23] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <ArrowLeft size={15} strokeWidth={1.75} />
                </button>
                <button
                  onClick={scrollNext}
                  aria-label="Next best sellers"
                  className="h-9 w-9 rounded-full border border-[#C5B8A5] hover:border-[#0A2D23] text-[#0A2D23] hover:bg-[#0A2D23] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <ArrowRight size={15} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4 PRODUCT CARDS GRID                                                  */}
        {/* ===================================================================== */}
        <div
          ref={scrollContainerRef}
          className="flex gap-0 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2 scrollbar-none select-none touch-pan-x sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:select-text sm:touch-auto lg:grid-cols-4 sm:gap-5 lg:gap-6"
        >
          {products.map((item, idx) => {
            const isWishlisted = !!wishlist[item.id];
            const isAdded = addedId === item.id;

            return (
              <div
                key={item.id}
                data-bestseller-card
                className="group flex w-full min-w-full max-w-full shrink-0 snap-center flex-[0_0_100%] flex-col bg-[#FAF8F5] rounded-[8px] border border-[#E7DFD3] hover:border-[#C5A059]/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden select-text sm:block sm:w-auto sm:min-w-0 sm:max-w-none sm:flex-[unset]"
              >
                {/* 1. TOP PHOTO CONTAINER */}
                <div className="relative w-full aspect-[238/248] overflow-hidden bg-[#EAE2D5]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={idx < 2}
                  />

                  {/* Dynamic interactive heart icon overlay */}
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    aria-label={`Add ${item.title} to wishlist`}
                    className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                  >
                    <Heart
                      size={18}
                      className={`transition-colors duration-200 ${
                        isWishlisted
                          ? "fill-[#D94F4F] text-[#D94F4F]"
                          : "text-[#2B4036]/80 hover:text-[#0A2D23] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
                      }`}
                      strokeWidth={1.75}
                    />
                  </button>
                </div>

                {/* 2. CARD CONTENT CONTAINER */}
                <div className="flex flex-col flex-1 p-5 sm:p-5.5 justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-serif text-[20px] sm:text-[22px] text-[#0A2D23] font-semibold leading-snug group-hover:text-[#8D6B30] transition-colors">
                      {item.title}
                    </h3>

                    {/* Specifications */}
                    <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#4F675D] font-normal mt-1 mb-3">
                      {item.subtitle}
                    </p>

                    {/* Price */}
                    <div className="font-sans text-[24px] sm:text-[25px] font-bold text-[#0A2D23] tracking-tight">
                      {item.price}
                    </div>
                  </div>

                  {/* Actions: Add to bag + View details */}
                  <div className="mt-5 space-y-2.5">
                    {/* Add to bag Button */}
                    <button
                      onClick={() => handleAddToBag(item.id)}
                      className={`w-full py-2.5 sm:py-3 px-4 rounded-[6px] text-[14.5px] font-sans font-medium tracking-[0.02em] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] shadow-xs ${
                        isAdded
                          ? "bg-[#1E5D48] text-white"
                          : "bg-[#064E3B] hover:bg-[#033629] text-white hover:shadow-md"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <span className="text-[15px]">✓</span>
                          <span>Added to bag</span>
                        </>
                      ) : (
                        <span>Add to bag</span>
                      )}
                    </button>

                    {/* View details Link */}
                    <div className="text-center pt-0.5">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-[14px] font-sans font-medium text-[#0A2D23] hover:text-[#A67C44] underline hover:no-underline transition-colors pb-0.5"
                      >
                        <span>View details</span>
                        <span className="text-[15px] leading-none">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* FOOTER ROW: Disclaimer + Segmented Indicators                         */}
        {/* ===================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 sm:mt-7">
          {/* Disclaimer */}
          <p className="font-sans italic text-[11.5px] sm:text-[12px] text-[#5A7369]">
            Illustrative product selection and pricing for design preview.
          </p>

          {/* Segmented Indicators (01 / 04) */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            {/* 4 Segmented Lines */}
            <div className="flex items-center gap-1.5">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`h-[2px] w-7 sm:w-8 transition-colors duration-200 cursor-pointer ${
                    i === activeSlide ? "bg-[#0A2D23]" : "bg-[#D8CFC2]"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter: 01 / 04 */}
            <span className="font-sans text-[12px] sm:text-[12.5px] font-medium text-[#0A2D23] tracking-wider">
              0{activeSlide + 1} / 0{products.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
