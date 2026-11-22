import type { ReactNode } from "react";
import Image from "next/image";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  GOLD_METAL_PAGE_CONFIG,
  type MetalCollectionAssuranceItem,
  type MetalCollectionAssuranceVariant,
} from "./metal-collection-page-config";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { tclamp, tpx } from "./metal-type-scale";

/** Silver assurance band typography (+25% on design-base sizes). */
const SILVER_ASSURANCE_TYPE_SCALE = 1.25;

const ASSURANCE_ITEMS = [
  {
    title: "100+ years",
    body: "Retail precious-metal heritage",
    icon: "/images/bilva/assurance_icon_1_clean.png",
    iconAlt: "Bilva sacred gold leaves",
    iconClass: "h-16 sm:h-[4.25rem] lg:h-[4.75rem] w-auto",
    iconWidth: 142,
    iconHeight: 124,
    titleClass: "text-[clamp(2.65rem,4.6vw,3.5rem)]",
  },
  {
    title: "24K / 999",
    body: "Purity displayed with each item",
    icon: "/images/bilva/assurance_icon_2_clean.png",
    iconAlt: "Stacked pure gold bars",
    iconClass: "h-[3.75rem] sm:h-16 lg:h-[4.25rem] w-auto",
    iconWidth: 190,
    iconHeight: 106,
    titleClass: "text-[clamp(2.65rem,4.6vw,3.5rem)]",
  },
  {
    title: "Transparent pricing",
    titleLines: ["Transparent", "pricing"],
    body: "Weight and rate details before purchase",
    icon: "/images/bilva/assurance_icon_3_clean.png",
    iconAlt: "Jeweler balance scales",
    iconClass: "h-16 sm:h-[4.25rem] lg:h-[4.75rem] w-auto",
    iconWidth: 152,
    iconHeight: 128,
    titleClass: "text-[clamp(2.4rem,4.1vw,3.125rem)] leading-[1.12]",
  },
] as const;

const assuranceCardClass = cn(
  "border-[#D4AF37]/50 bg-gradient-to-b from-[#FCF7F0] via-[#F3E9DA] to-[#E8DECC]",
  "rounded-[20px] shadow-none sm:rounded-[24px]",
  "text-center shadow-[0_4px_16px_rgba(0,0,0,0.03)]",
  "min-h-0",
);

const reviewCardClass = cn(
  "flex min-h-0 flex-col gap-0 border-[#D4AF37]/50 bg-[#FAF7F2]",
  "rounded-[20px] shadow-none sm:rounded-[24px]",
  "shadow-[0_4px_16px_rgba(0,0,0,0.03)]",
);

function SectionTitle({
  id,
  children,
  compact = false,
}: {
  id: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <span className="h-[1.5px] max-w-14 flex-1 bg-[#C5A059]" aria-hidden />
      <h2
        id={id}
        className={cn(
          "shrink-0 px-1 py-1 text-center font-serif font-semibold leading-[1.2] text-[#0B6B5C]",
          compact
            ? "text-[clamp(1.35rem,2vw,1.75rem)] tracking-tight"
            : "text-[clamp(2.5rem,5.5vw,3.5rem)] tracking-tight",
        )}
      >
        {children}
      </h2>
      <span className="h-[1.5px] max-w-14 flex-1 bg-[#C5A059]" aria-hidden />
    </div>
  );
}

function GoldStars() {
  return (
    <div className="flex items-center gap-1.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-9 w-9 text-[#C89D4B] sm:h-10 sm:w-10"
          aria-hidden
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function resolveAssuranceItems(items: readonly MetalCollectionAssuranceItem[]) {
  return ASSURANCE_ITEMS.map((base, index) => {
    const override = items[index];
    if (!override) return base;
    const merged = { ...base, ...override };
    if (!override.titleLines) {
      const { titleLines: _drop, ...withoutLines } = merged;
      return withoutLines;
    }
    return merged;
  });
}

function SilverAssuranceOrnament() {
  return (
    <div className="mb-2.5 flex items-center justify-center gap-4">
      <span className="h-px w-[min(150px,28vw)] bg-[#B8862B]" aria-hidden />
      <Image
        src="/images/bilva/assurance_icon_1_clean.png"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 object-contain opacity-90"
        aria-hidden
      />
      <span className="h-px w-[min(150px,26vw)] bg-[#B8862B]" aria-hidden />
    </div>
  );
}


const SILVER_ASSURANCE_VISUALS = [
  {
    src: "/images/bilva/confidence-details.png",
    alt: "Heritage craftsmanship",
    className: "object-cover object-[42%_58%]",
  },
  {
    src: "/images/bilva/how-it-works-coin.png",
    alt: "999 fine silver purity",
    className: "object-cover object-center",
  },
  {
    src: "/images/bilva/artisan-legacy-master.webp",
    alt: "Clear weight specifications",
    className: "object-cover object-[58%_42%]",
  },
] as const;

function SilverAssuranceVisual({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const visual = SILVER_ASSURANCE_VISUALS[index] ?? SILVER_ASSURANCE_VISUALS[0];
  return (
    <div
      className={cn("relative h-full w-full min-h-0 overflow-hidden bg-[#E8E6E0]", className)}
      aria-hidden
    >
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 420px"
        className={cn("transition-transform duration-300", visual.className)}
      />
    </div>
  );
}

function SilverAssurancePanel({ items }: { items: readonly MetalCollectionAssuranceItem[] }) {
  const s = SILVER_ASSURANCE_TYPE_SCALE;

  return (
    <>
      <div className={cn(BILVA_SITE_SHELL_CLASS, "bg-[#FAF7F2] pb-6 pt-2 sm:pb-8 sm:pt-3")}>
        <div
          className="w-full rounded-[14px] bg-[#E6E9DA] px-4 py-9 text-center sm:px-6 sm:py-10 lg:px-8 lg:py-11"
          aria-labelledby="silver-assurance-heading"
        >
          <SilverAssuranceOrnament />
          <h2
            id="silver-assurance-heading"
            className="font-serif font-semibold uppercase tracking-[0.08em] text-[#0E3D36]"
            style={{ fontSize: tclamp(1.25, 2, 1.625, s) }}
          >
            The Bilwa Assurance
          </h2>
          <p
            className="mt-1.5 font-serif italic leading-snug text-[#66708A]"
            style={{ fontSize: tpx(15, s) }}
          >
            Trust, purity and clarity in every piece.
          </p>

          <div className="mx-auto mt-5 grid w-[90.56%] max-w-full grid-cols-1 gap-6 sm:mt-6 sm:grid-cols-2 sm:gap-7 md:grid-cols-3 md:gap-8">
            {items.map((item, index) => (
              <article
                key={item.title}
                className="flex aspect-square w-full flex-col overflow-hidden rounded-[9px] border border-[#EBCF9C] bg-[#FDF9F2] text-center shadow-none"
              >
                <div className="relative min-h-0 w-full flex-[11]">
                  <SilverAssuranceVisual index={index} className="absolute inset-0" />
                </div>
                <div className="flex min-h-0 flex-[9] flex-col items-center justify-center px-2.5 pb-2.5 pt-1 sm:px-3">
                  <h3
                    className="font-serif font-semibold leading-[1.15] text-[#0E3D36]"
                    style={{ fontSize: tclamp(1.1, 1.45, 1.375, s) }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mx-auto mt-1 max-w-[95%] font-serif italic leading-[1.35] text-[#66708A]"
                    style={{ fontSize: tpx(13, s) }}
                  >
                    {item.body}
                  </p>
                  <hr
                    className="mx-auto mt-1.5 border-0 border-t border-[#B8862B]"
                    style={{ width: tpx(30, s) }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className={BILVA_SITE_SHELL_CLASS}>
        <Separator decorative className="h-[1.5px] w-full bg-[#C5A059]/80" />
      </div>
    </>
  );
}

export function BilvaMetalAssuranceBand({
  variant = "gold",
  items = GOLD_METAL_PAGE_CONFIG.assuranceItems,
}: {
  variant?: MetalCollectionAssuranceVariant;
  items?: readonly MetalCollectionAssuranceItem[];
}) {
  const assuranceItems = resolveAssuranceItems(items);
  const isSilver = variant === "silver";

  return (
    <section className="w-full bg-[#FAF7F2] text-[#0A2D23]" aria-label="The Bilwa Assurance and customer reviews">
      {isSilver ? (
        <SilverAssurancePanel items={items} />
      ) : (
        <>
          <div className={cn(BILVA_SITE_SHELL_CLASS, "py-6 sm:py-8")}>
            <div className="w-full rounded-[14px] bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,#F2EBE0_0%,#E8E0D4_45%,#DDD4C6_100%)] px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
              <SectionTitle id="gold-assurance-heading">The Bilwa Assurance</SectionTitle>

              <div className="mt-5 grid w-full min-w-0 grid-cols-1 gap-4 sm:mt-6 sm:gap-5 md:grid-cols-3">
                {assuranceItems.map((item) => (
                  <Card key={item.title} className={cn(assuranceCardClass, "min-w-0 flex flex-col p-6 sm:p-8")}>
                    <CardHeader className="flex flex-col items-center space-y-0 p-0">
                      <div className="mb-3 flex h-16 items-center justify-center sm:h-[4.5rem]">
                        <Image
                          src={item.icon}
                          alt={item.iconAlt}
                          width={item.iconWidth}
                          height={item.iconHeight}
                          className={item.iconClass}
                        />
                      </div>
                      <CardTitle
                        className={cn(
                          "font-serif font-semibold leading-[1.12] tracking-normal text-[#0B6B5C]",
                          item.titleClass,
                        )}
                      >
                        {"titleLines" in item && item.titleLines ? (
                          <>
                            {item.titleLines[0]}
                            <br />
                            {item.titleLines[1]}
                          </>
                        ) : (
                          item.title
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-3">
                      <p className="mx-auto max-w-[17rem] font-serif text-[21px] italic leading-snug text-[#2D4A3E] sm:text-[23px]">
                        {item.body}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className={BILVA_SITE_SHELL_CLASS}>
            <Separator decorative className="h-[1.5px] w-full bg-[#C5A059]/80" />
          </div>
        </>
      )}

      {/* Mock 1: plain cream testimonials — aligned width with assurance */}
      <div
        className={cn(BILVA_SITE_SHELL_CLASS, "bg-[#FAF7F2] py-6 sm:py-8")}
        aria-labelledby="gold-testimonials-heading"
      >
        <div className="w-full">
          <SectionTitle id="gold-testimonials-heading" compact={isSilver}>
            Words from our customers
          </SectionTitle>

          <div className="mt-5 grid w-full grid-cols-1 gap-4 sm:mt-6 md:grid-cols-2 md:gap-5 lg:gap-6">
            {[0, 1].map((key) => (
              <Card
                key={key}
                className={cn(reviewCardClass, "min-w-0", isSilver ? "p-4 sm:p-5" : "p-6 sm:p-8")}
              >
                <CardHeader className="space-y-0 p-0">
                  <GoldStars />
                </CardHeader>
                <CardContent
                  className={cn("relative flex-1 p-0", isSilver ? "mt-2 pl-6" : "mt-4 pl-8 sm:pl-10")}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 font-serif leading-none text-[#C5A059]",
                      isSilver ? "text-[1.625rem]" : "text-[4.25rem] sm:text-[4.75rem]",
                    )}
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <blockquote
                    className={cn(
                      "font-serif italic text-[#0B6B5C]",
                      isSilver
                        ? "text-[17px] font-medium leading-[1.35]"
                        : "text-[clamp(1.75rem,3.15vw,2.5rem)] leading-[1.34]",
                    )}
                  >
                    [Verified offline customer review goes here]
                    <span
                      className={cn(
                        "ml-1 inline align-baseline font-serif not-italic leading-none text-[#C5A059]",
                        isSilver ? "text-[1.625rem]" : "text-[2.5rem] sm:text-[2.875rem]",
                      )}
                      aria-hidden
                    >
                      &rdquo;
                    </span>
                  </blockquote>
                </CardContent>
                <CardFooter className="mt-auto p-0 pb-1 pt-5">
                  <p
                    className={cn(
                      "font-serif italic leading-snug text-[#4A6475]",
                      isSilver ? "text-[13px]" : "text-[clamp(1.25rem,2.2vw,1.625rem)]",
                    )}
                  >
                    Offline-store review · awaiting approval
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>

          <p
            className={cn(
              "mt-5 text-center font-serif italic text-[#4A6B82]",
              isSilver ? "text-[12.5px]" : "text-[clamp(1.2rem,2.1vw,1.5rem)] tracking-wide",
            )}
          >
            Sample review layout — replace with verified customer feedback.
          </p>

          <Separator decorative className="mx-auto mt-5 h-[1.5px] max-w-[65rem] bg-[#C5A059]/80 sm:mt-6" />
        </div>
      </div>
    </section>
  );
}

export function BilvaGoldAssuranceBand() {
  return <BilvaMetalAssuranceBand />;
}