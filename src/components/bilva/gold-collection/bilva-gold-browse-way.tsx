import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  GOLD_METAL_PAGE_CONFIG,
  type MetalCollectionBrowseConfig,
} from "./metal-collection-page-config";

export function BilvaMetalBrowseWay({
  config = GOLD_METAL_PAGE_CONFIG.browse,
}: {
  config?: MetalCollectionBrowseConfig;
}) {
  return (
    <section className="mt-5 w-full overflow-hidden rounded-[10px] border border-[#E0C690] bg-[#FCF8F2] sm:mt-6 lg:grid lg:grid-cols-[minmax(0,29rem)_1fr]">
      <div className="relative h-48 sm:h-56 lg:h-auto lg:min-h-[17.5rem]">
        <Image
          src={config.imageSrc}
          alt={config.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 29rem"
        />
      </div>
      <div className="px-5 pb-8 pt-7 sm:px-7 lg:pt-9">
        <h2 className="font-serif text-[clamp(1.35rem,2vw,1.5625rem)] font-medium leading-tight text-[#0A2D23]">
          {config.title}
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {config.chips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.href}
              className="inline-flex h-10 items-center gap-2 rounded-[6px] border border-[#D4B87A] bg-[#FFFAF3] px-4 font-serif text-[13px] text-[#0A2D23] transition-colors hover:bg-[#F8ECD6]"
            >
              {chip.label}
              <ArrowRight size={14} strokeWidth={2} className="text-[#0B6B5C]" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BilvaGoldBrowseWay() {
  return <BilvaMetalBrowseWay />;
}