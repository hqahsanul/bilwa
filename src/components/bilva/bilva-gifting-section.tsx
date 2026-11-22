"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Mountain, HandHeart, Briefcase } from "lucide-react";

import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";

type OccasionId = "weddings" | "festivals" | "milestones" | "blessings" | "corporate";

interface OccasionItem {
  id: OccasionId;
  label: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  icon: ReactNode;
}

function WeddingRingsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
      aria-hidden
    >
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </svg>
  );
}

const OCCASIONS: OccasionItem[] = [
  {
    id: "weddings",
    label: "Weddings",
    imageSrc: "/images/bilva/gifting-hero.png",
    imageAlt: "Bilwa luxury wedding gift set with gold and silver coins in presentation box",
    description: "Explore meaningful keepsakes and gifts for a new beginning.",
    ctaHref: "#gifting-weddings",
    ctaLabel: "View wedding gifts",
    icon: <WeddingRingsIcon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />,
  },
  {
    id: "festivals",
    label: "Festivals",
    imageSrc: "/images/bilva/gifting-hero-alt-1.png",
    imageAlt: "Bilwa festive gifting with precious coins and ceremonial presentation",
    description: "Celebrate traditions with coins and gifts made for the season.",
    ctaHref: "#gifting-festivals",
    ctaLabel: "View festival gifts",
    icon: <Flame className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.75} />,
  },
  {
    id: "milestones",
    label: "Milestones",
    imageSrc: "/images/bilva/gifting-hero-alt-2.png",
    imageAlt: "Bilwa milestone gifting — gold keepsakes for life’s achievements",
    description: "Mark achievements with pieces worth keeping for years to come.",
    ctaHref: "#gifting-milestones",
    ctaLabel: "View milestone gifts",
    icon: <Mountain className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.75} />,
  },
  {
    id: "blessings",
    label: "Blessings",
    imageSrc: "/images/bilva/gifting-hero-alt-3.png",
    imageAlt: "Bilwa blessing and devotional gifting with sacred keepsakes",
    description: "Offer blessings with thoughtfully chosen precious pieces.",
    ctaHref: "#gifting-blessings",
    ctaLabel: "View blessing gifts",
    icon: <HandHeart className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.75} />,
  },
  {
    id: "corporate",
    label: "Corporate",
    imageSrc: "/images/bilva/gifting-hero.png",
    imageAlt: "Bilwa corporate gifting sets with engraved coins and premium packaging",
    description: "Elevate professional relationships with refined presentation sets.",
    ctaHref: "#gifting-corporate",
    ctaLabel: "View corporate gifts",
    icon: <Briefcase className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.75} />,
  },
];

export function BilvaGiftingSection() {
  const [activeId, setActiveId] = useState<OccasionId>("weddings");
  const pillStripRef = useRef<HTMLDivElement>(null);

  const active = OCCASIONS.find((o) => o.id === activeId) ?? OCCASIONS[0];

  const scrollPillIntoView = useCallback((index: number) => {
    const strip = pillStripRef.current;
    if (!strip) return;
    const pills = strip.querySelectorAll<HTMLElement>("[data-occasion-pill]");
    const pill = pills[index];
    if (!pill) return;
    strip.scrollTo({
      left: pill.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const selectOccasion = (id: OccasionId, index: number) => {
    setActiveId(id);
    scrollPillIntoView(index);
  };

  useEffect(() => {
    const index = OCCASIONS.findIndex((o) => o.id === activeId);
    if (index >= 0) scrollPillIntoView(index);
  }, [activeId, scrollPillIntoView]);

  return (
    <section
      id="gifting"
      className="relative w-full bg-[#FAF7F2] text-[#0A2D23]"
      aria-labelledby="gifting-heading"
    >
      <div className={cn(BILVA_SITE_SHELL_CLASS, "pt-3 sm:pt-4 pb-6 sm:pb-8")}>
        <div className="flex flex-col gap-4 mb-7 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] sm:text-[12px] font-serif font-semibold tracking-[0.2em] text-[#A67C44] uppercase shrink-0">
                MADE FOR LIFE&apos;S MOMENTS
              </span>
              <span className="h-px w-16 sm:w-24 bg-[#C5A059]/80 shrink-0" aria-hidden />
            </div>
            <h2
              id="gifting-heading"
              className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.08] tracking-[-0.02em] text-[#0A2D23] font-semibold"
            >
              A precious gesture, for every occasion.
            </h2>
            <p className="font-serif text-[15px] sm:text-[16px] text-[#2F4A42] font-normal mt-2 max-w-xl leading-[1.55]">
              Choose the moment. We&apos;ll help you find something meaningful.
            </p>
          </div>
          <Link
            href="#all-gifting"
            className="shrink-0 inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-serif font-medium text-[#0A2D23] hover:text-[#A67C44] border-b border-[#C5A059] hover:border-[#A67C44] pb-0.5 transition-colors group"
          >
            <span>Explore all gifting</span>
            <span className="text-[16px] leading-none transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* Hero + shop-by-occasion: one card, no gap or seam between image and mint */}
        <div className="overflow-hidden rounded-[3px] border border-[#E0D9D0] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <div className="relative w-full aspect-[4/3] sm:aspect-[2.25/1] lg:aspect-[2.4/1] min-h-[248px] sm:min-h-[288px]">
            <Image
              key={active.imageSrc}
              src={active.imageSrc}
              alt={active.imageAlt}
              fill
              className="object-cover object-[center_42%] transition-opacity duration-500"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />

            <div className="absolute inset-0 flex items-center p-5 sm:p-8 lg:p-10 pointer-events-none">
              <div className="relative z-10 pointer-events-auto w-full max-w-[292px] sm:max-w-[320px] rounded-[3px] border border-white/50 bg-[#FDFBF7]/62 backdrop-blur-[6px] p-6 sm:p-7">
                <h3 className="font-serif text-[24px] sm:text-[28px] text-[#0A2D23] font-semibold leading-[1.12]">
                  For moments that stay.
                </h3>
                <p className="font-serif text-[14px] sm:text-[14.5px] text-[#3D574D]/85 font-normal mt-2 leading-[1.65]">
                  Beautifully presented. Thoughtfully chosen.
                </p>
                <Link
                  href={active.ctaHref}
                  className="mt-5 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] bg-[#064E3B] hover:bg-[#033629] text-white text-[13.5px] font-sans font-medium tracking-[0.02em] transition-colors"
                >
                  <span>Explore gifting</span>
                  <span className="text-[15px] leading-none">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-[#F1F6F4]">
          <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-7 pb-6 sm:pb-7">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="text-[10.5px] sm:text-[11px] font-serif font-semibold tracking-[0.22em] text-[#0A2D23] uppercase shrink-0">
              SHOP BY OCCASION
            </span>
            <span className="h-px flex-1 bg-[#C5A059]/65" aria-hidden />
          </div>

          <div
            ref={pillStripRef}
            className="flex flex-nowrap items-center gap-2.5 sm:gap-3 overflow-x-auto overscroll-x-contain scrollbar-none lg:overflow-visible"
            role="tablist"
            aria-label="Shop gifting by occasion"
          >
            {OCCASIONS.map((occasion, index) => {
              const isActive = occasion.id === activeId;
              return (
                <button
                  key={occasion.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-occasion-pill
                  onClick={() => selectOccasion(occasion.id, index)}
                  className={`inline-flex items-center justify-center gap-2.5 min-h-11 sm:min-h-12 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-sans font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#064E3B] text-white border border-[#064E3B]"
                      : "bg-[#FAFDFB] text-[#0A2D23] border border-[#C9B896]/85 hover:border-[#A67C44]"
                  }`}
                >
                  <span
                    className={`flex shrink-0 items-center justify-center ${
                      isActive ? "text-white" : "text-[#0A2D23]"
                    }`}
                  >
                    {occasion.icon}
                  </span>
                  <span>{occasion.label}</span>
                </button>
              );
            })}
          </div>

          </div>

          <div className="bg-white border-t border-[#D8E4DD] px-4 sm:px-6 lg:px-8 py-4 sm:py-[1.125rem]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-serif text-[14.5px] sm:text-[16px] leading-[1.55] text-[#0A2D23] min-w-0">
                <span className="font-semibold">{active.label}</span>
                <span className="font-normal text-[#3D574D]">
                  {" "}
                  / {active.description}
                </span>
              </p>
              <Link
                href={active.ctaHref}
                className="shrink-0 inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-serif font-medium text-[#0A2D23] hover:text-[#A67C44] border-b border-[#C5A059] hover:border-[#A67C44] pb-0.5 transition-colors group"
              >
                <span>{active.ctaLabel}</span>
                <span className="text-[15px] leading-none transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}