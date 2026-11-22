import Link from "next/link";
import { TrendingDown } from "lucide-react";

import {
  GOLD_METAL_PAGE_CONFIG,
  type MetalCollectionTickerConfig,
} from "./metal-collection-page-config";
import { tpx } from "./metal-type-scale";

export function BilvaMetalReferenceTicker({
  config = GOLD_METAL_PAGE_CONFIG.ticker,
  typeScale = 1,
}: {
  config?: MetalCollectionTickerConfig;
  typeScale?: number;
}) {
  const s = typeScale;
  const trendIcon = s === 1 ? 14 : 18;

  return (
    <div className="mt-6 w-full rounded-[7px] border border-[#DFC58F] bg-gradient-to-r from-[#F8EEE0] via-[#FAF3E9] to-[#ECE4D7] px-4 py-3 sm:mt-8 sm:flex sm:items-center sm:gap-0 sm:px-5 lg:px-6">
      <div className="min-w-0 sm:border-r sm:border-[#DFC58F] sm:pr-5">
        <p
          className={
            s === 1
              ? "font-sans text-[10px] font-bold uppercase tracking-[0.07em] text-[#5A4A22] sm:text-[11px]"
              : "font-sans font-bold uppercase tracking-[0.07em] text-[#5A4A22]"
          }
          style={s !== 1 ? { fontSize: tpx(11, s) } : undefined}
        >
          {config.label}
        </p>
        <span
          className={
            s === 1
              ? "mt-1 inline-block rounded-full bg-[#C9E1D9] px-2.5 py-0.5 font-sans text-[10px] font-medium text-[#2C5F52] sm:text-[11px]"
              : "mt-1 inline-block rounded-full bg-[#C9E1D9] px-2.5 py-0.5 font-sans font-medium text-[#2C5F52]"
          }
          style={s !== 1 ? { fontSize: tpx(10.5, s) } : undefined}
        >
          {config.badge}
        </span>
      </div>
      <p
        className={
          s === 1
            ? "mt-3 font-serif text-[22px] font-medium leading-none text-[#153D33] sm:mt-0 sm:border-r sm:border-[#DFC58F] sm:px-5 sm:text-[24px]"
            : "mt-3 font-serif font-medium leading-none text-[#153D33] sm:mt-0 sm:border-r sm:border-[#DFC58F] sm:px-5"
        }
        style={s !== 1 ? { fontSize: tpx(24, s) } : undefined}
      >
        {config.pricePerGram}
      </p>
      <p
        className={
          s === 1
            ? "mt-2 flex items-center gap-1.5 whitespace-nowrap font-sans text-[12px] text-[#153D33] sm:mt-0 sm:px-5"
            : "mt-2 flex items-center gap-1.5 whitespace-nowrap font-sans text-[#153D33] sm:mt-0 sm:px-5"
        }
        style={s !== 1 ? { fontSize: tpx(12, s) } : undefined}
      >
        <TrendingDown size={trendIcon} strokeWidth={2} className="text-[#1B786A]" aria-hidden />
        {config.changeLabel}
      </p>
      <Link
        href="/#pricing-works"
        className={
          s === 1
            ? "mt-3 block font-sans text-[12px] font-medium text-[#153D33] hover:underline sm:mt-0 sm:ml-auto"
            : "mt-3 block font-sans font-medium text-[#153D33] hover:underline sm:mt-0 sm:ml-auto"
        }
        style={s !== 1 ? { fontSize: tpx(12, s) } : undefined}
      >
        How pricing works ↗
      </Link>
    </div>
  );
}

export function BilvaGoldReferenceTicker() {
  return <BilvaMetalReferenceTicker />;
}