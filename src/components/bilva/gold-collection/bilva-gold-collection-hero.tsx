import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  GOLD_METAL_PAGE_CONFIG,
  type MetalCollectionHeroConfig,
} from "./metal-collection-page-config";
import { tclampPx, tpx } from "./metal-type-scale";

export function BilvaMetalCollectionHero({
  config = GOLD_METAL_PAGE_CONFIG.hero,
  typeScale = 1,
}: {
  config?: MetalCollectionHeroConfig;
  typeScale?: number;
}) {
  const s = typeScale;
  const iconSm = Math.round(16 * s);
  const iconXs = Math.round(15 * s);
  const btnHeight = s === 1 ? "h-10" : "min-h-[2.75rem]";
  const btnPadX = s === 1 ? "px-5" : "px-6";

  return (
    <section className="relative w-full bg-[#FAF7F2]">
      <div className="grid w-full items-stretch lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:gap-0">
        <div className="relative z-[1] pb-10 pt-6 lg:pb-14 lg:pt-10">
          <nav
            className="font-sans text-[#8A9590]"
            style={{ fontSize: tpx(12, s) }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[#0B6B5C]">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span>Gold &amp; Silver</span>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-[#0B6B5C]">{config.breadcrumbCurrent}</span>
          </nav>

          <p
            className="mt-8 flex items-center gap-3 font-serif font-bold uppercase tracking-[0.2em] text-[#B07A24] sm:mt-10"
            style={{ fontSize: tpx(11, s) }}
          >
            {config.eyebrow}
            <span className="h-px w-12 bg-[#D4B87A] sm:w-16" aria-hidden />
          </p>

          <h1
            className="mt-3 font-serif font-medium leading-[1.08] tracking-[-0.01em] text-[#0A2D23]"
            style={{ fontSize: tclampPx(34, 4.9, 50, s) }}
          >
            {config.title}
          </h1>
          <p
            className="mt-3 max-w-lg font-sans leading-[1.5] text-[#4B5754] sm:max-w-xl lg:max-w-none"
            style={{ fontSize: tpx(14, s) }}
          >
            {config.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-8">
            <Link
              href="#collection"
              className={`inline-flex ${btnHeight} items-center gap-2 rounded-[6px] bg-[#0B6B5C] ${btnPadX} font-sans font-medium text-white transition-colors hover:bg-[#095548]`}
              style={{ fontSize: tpx(13, s) }}
            >
              {config.primaryCta}
              <ArrowRight size={iconSm} strokeWidth={2} aria-hidden />
            </Link>
            <Link
              href="#collection"
              className="inline-flex items-center gap-2 font-sans font-medium text-[#0B6B5C] hover:underline"
              style={{ fontSize: tpx(13, s) }}
            >
              {config.secondaryCta}
              <ArrowRight size={iconXs} strokeWidth={2} aria-hidden />
            </Link>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-x-0 font-serif font-medium text-[#1F4A3F]"
            style={{ fontSize: tpx(12, s) }}
          >
            {config.trustLabels.map((label, index) => (
              <span
                key={label}
                className={index > 0 ? "border-l border-[#D4B87A] pl-5 ml-5 sm:pl-6 sm:ml-6" : ""}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative -mx-4 min-h-[220px] overflow-hidden sm:-mx-8 sm:min-h-[280px] lg:mx-0 lg:-mr-12 lg:min-h-[410px]">
          <Image
            src={config.heroImageSrc}
            alt={config.heroImageAlt}
            fill
            priority
            className="object-cover object-[62%_38%] lg:object-[right_center]"
            sizes="(max-width: 1024px) 100vw, 56vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#FAF7F2_0%,#FAF7F2e6_22%,#FAF7F288_38%,transparent_54%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#FAF7F2] to-transparent lg:hidden"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use BilvaMetalCollectionPage with GOLD_METAL_PAGE_CONFIG */
export function BilvaGoldCollectionHero() {
  return <BilvaMetalCollectionHero />;
}