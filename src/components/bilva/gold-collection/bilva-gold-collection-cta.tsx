import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  GOLD_METAL_PAGE_CONFIG,
  type MetalCollectionCtaConfig,
} from "./metal-collection-page-config";

const CTA_SERIF = "font-['Newsreader',Georgia,serif]";

export function BilvaMetalCollectionCta({
  config = GOLD_METAL_PAGE_CONFIG.cta,
  variant = "gold",
}: {
  config?: MetalCollectionCtaConfig;
  variant?: "gold" | "silver";
}) {
  const isSilver = variant === "silver";
  const headlineLines = config.headline.split("\n");

  if (isSilver) {
    return (
      <section className="border-t border-[#EAE3D6] bg-[#FAF7F2]" aria-labelledby="silver-collection-cta-heading">
        <div className={cn(BILVA_SITE_SHELL_CLASS, "py-8 sm:py-10")}>
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-[14px]",
            "bg-[radial-gradient(ellipse_at_20%_0%,#2C6B57,transparent_55%),linear-gradient(120deg,#0D4A3D_0%,#195F4E_55%,#2E6C58_100%)]",
          )}
        >
          <div className="grid grid-cols-1 items-center lg:grid-cols-[1.05fr_1fr] lg:min-h-[270px]">
            <div className="relative z-[2] px-5 py-10 sm:px-7 sm:py-12 lg:flex lg:min-h-[270px] lg:flex-col lg:justify-center lg:py-8">
              <h2
                id="silver-collection-cta-heading"
                className={cn(
                  CTA_SERIF,
                  "text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold leading-[1.08] text-[#F6E3B4]",
                )}
              >
                {headlineLines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < headlineLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h2>
              <p
                className={cn(
                  CTA_SERIF,
                  "mt-2.5 max-w-md text-[15px] italic leading-normal text-white",
                )}
              >
                {config.subcopy}
              </p>
              <div className="mt-[18px] flex flex-wrap gap-3">
                <Link
                  href="#collection"
                  className={cn(
                    CTA_SERIF,
                    "inline-flex items-center justify-center rounded-[6px] border border-[#FBEED0] bg-[#FBEED0] px-[18px] py-[11px] text-[15px] font-medium text-[#0D4A3D] transition-colors hover:bg-[#F5E4C8]",
                  )}
                >
                  {config.primaryCta}
                </Link>
                <Link
                  href="#collection"
                  className={cn(
                    CTA_SERIF,
                    "inline-flex items-center justify-center rounded-[6px] border border-[#E8DCC0] bg-transparent px-[18px] py-[11px] text-[15px] font-medium text-white transition-colors hover:bg-white/10",
                  )}
                >
                  {config.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="relative min-h-[220px] w-full overflow-hidden sm:min-h-[250px] lg:min-h-[270px]">
              <Image
                src={config.imageSrc}
                alt="Bilwa silver coin and bar on stone pedestals"
                fill
                className="object-cover object-[70%_center]"
                sizes="(max-width: 1024px) 100vw, 420px"
                quality={92}
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(45%,8.5rem)] bg-gradient-to-r from-[#0D4A3D] via-[#144C41]/75 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-[#EAE3D6] bg-[#FAF7F2]">
      <div className={cn(BILVA_SITE_SHELL_CLASS, "py-10 sm:py-12")}>
      <div className="relative w-full overflow-hidden rounded-[14px] bg-gradient-to-br from-[#083D35] via-[#0A423C] to-[#0D4D45] text-white shadow-[0_10px_32px_rgba(8,61,53,0.14)]">
        <div className="relative z-[1] flex w-full flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-12">
          <div className="w-full lg:max-w-[52%]">
            <h2 className="font-serif text-[clamp(2.15rem,4.8vw,3rem)] font-semibold leading-tight text-[#F7F3EA]">
              {config.headline}
            </h2>
            <p className="mt-4 max-w-md font-serif text-[clamp(1.15rem,2.3vw,1.45rem)] italic leading-relaxed text-[#D8E8E4]">
              {config.subcopy}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="bilwaGold" size="lg" className="h-11 px-6" asChild>
                <Link href="#collection">{config.primaryCta}</Link>
              </Button>
              <Button variant="bilwaGoldOutline" size="lg" className="h-11 px-6" asChild>
                <Link href="#collection">{config.secondaryCta}</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-[504/278] w-full max-w-[500px] lg:mx-0 lg:shrink-0">
            <Image
              src={config.imageSrc}
              alt=""
              fill
              className="rounded-[8px] object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 500px"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-14 rounded-l-[8px] bg-gradient-to-r from-[#0A423C] to-transparent lg:block"
              aria-hidden
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export function BilvaGoldCollectionCta() {
  return <BilvaMetalCollectionCta />;
}