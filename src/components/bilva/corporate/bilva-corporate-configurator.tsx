"use client";

import { useState } from "react";
import { Headphones, Truck, ChevronDown, Check } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  CORPORATE_GIFTING_DATA,
  type CorporateGiftingPageData,
} from "@/data/bilva/corporate-gifting";

// Clean bespoke SVG line icons matching the reference image exactly
function PackagingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#23381F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* Box base */}
      <path d="M4 14h24v14H4z" />
      {/* Lid */}
      <path d="M2 9.5h28v4.5H2z" />
      {/* Vertical ribbon */}
      <path d="M16 9.5v18.5" />
      {/* Bow loops */}
      <path d="M16 9.5C14 6 9 6 9 9c0 2.2 4.5 3 7 3" />
      <path d="M16 9.5C18 6 23 6 23 9c0 2.2-4.5 3-7 3" />
    </svg>
  );
}

function ImprintIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#23381F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* Card outline */}
      <rect x="3" y="6" width="26" height="20" rx="3" />
      {/* Avatar silhouette */}
      <circle cx="10" cy="13" r="3" />
      <path d="M6 21c0-2.2 2-3.5 4-3.5s4 1.3 4 3.5" />
      {/* Text lines */}
      <path d="M17 11h8" />
      <path d="M17 15h6" />
      <path d="M17 19h4" />
    </svg>
  );
}

function MetalBarsIcon() {
  return (
    <svg width="30" height="28" viewBox="0 0 34 32" fill="none" stroke="#23381F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* Bottom-left bar */}
      <polygon points="3,25 13,25 15,20 5,20" />
      <path d="M3 25v3h10v-3" />
      <path d="M13 28l2-3" />
      
      {/* Bottom-right bar */}
      <polygon points="17,25 27,25 29,20 19,20" />
      <path d="M17 25v3h10v-3" />
      <path d="M27 28l2-3" />

      {/* Top stacked bar */}
      <polygon points="10,17 20,17 22,12 12,12" />
      <path d="M10 17v3h10v-3" />
      <path d="M20 20l2-3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#23381F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* Calendar body */}
      <rect x="4" y="6.5" width="24" height="21.5" rx="3" />
      {/* Header divider */}
      <path d="M4 12.5h24" />
      {/* Ring loops */}
      <path d="M10 3.5v5" />
      <path d="M22 3.5v5" />
      {/* Grid dots */}
      <circle cx="9" cy="17" r="1.1" fill="#23381F" />
      <circle cx="13.7" cy="17" r="1.1" fill="#23381F" />
      <circle cx="18.3" cy="17" r="1.1" fill="#23381F" />
      <circle cx="23" cy="17" r="1.1" fill="#23381F" />
      <circle cx="9" cy="22" r="1.1" fill="#23381F" />
      <circle cx="13.7" cy="22" r="1.1" fill="#23381F" />
      <circle cx="18.3" cy="22" r="1.1" fill="#23381F" />
      <circle cx="23" cy="22" r="1.1" fill="#23381F" />
    </svg>
  );
}

interface BilvaCorporateConfiguratorProps {
  data?: CorporateGiftingPageData;
  onRequestQuote: (config: {
    quantity: string;
    finish: string;
    personalization: string;
    region: string;
  }) => void;
  onSpeakSpecialist: () => void;
}

export function BilvaCorporateConfigurator({
  data = CORPORATE_GIFTING_DATA,
  onRequestQuote,
  onSpeakSpecialist,
}: BilvaCorporateConfiguratorProps) {
  const { signatureSection, configurator } = data;
  const titleLines = signatureSection.title.split("\n");

  // Interactive Configurator States
  const [selectedQuantity, setSelectedQuantity] = useState(
    configurator.defaultQuantity ?? configurator.quantities[0]
  );
  const [selectedFinish, setSelectedFinish] = useState("Gold");
  const [selectedPersonalization, setSelectedPersonalization] = useState("Yes");
  const [selectedRegion, setSelectedRegion] = useState("Select region");
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case "packaging":
        return <PackagingIcon />;
      case "imprint":
        return <ImprintIcon />;
      case "metal":
        return <MetalBarsIcon />;
      case "leadTime":
      default:
        return <CalendarIcon />;
    }
  };

  const handleRequestClick = () => {
    onRequestQuote({
      quantity: selectedQuantity,
      finish: selectedFinish,
      personalization: selectedPersonalization,
      region: selectedRegion,
    });
  };

  const chipClass = (selected: boolean) =>
    `flex h-11 cursor-pointer items-center justify-center rounded-full font-sans text-[15.5px] font-medium transition-all sm:h-12 sm:text-[16px] ${
      selected
        ? "bg-[#1E3219] text-white"
        : "border border-[#CAD0BA] bg-[#E9EADC] text-[#23381F] hover:bg-[#F3F4E8]"
    }`;

  return (
    <section id="configurator" className="w-full select-none bg-[#FAF7F2] py-0">
      {/* Cream band — frame width, flush to neighbors, no radius */}
      <div className={`${BILVA_SITE_FRAME_CLASS} bg-[#F3EEE3] py-10 sm:py-12 lg:py-14`}>
        <div className={BILVA_SITE_SHELL_CLASS}>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-7 xl:gap-8">
            <div className="flex flex-col">
              <div>
                <span className="block font-sans text-[13px] font-semibold uppercase tracking-[0.22em] text-[#3D5A4E] sm:text-[14px]">
                  {signatureSection.eyebrow}
                </span>

                <h2 className="mt-2 mb-3 font-serif text-[clamp(2.65rem,4.2vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.01em] text-[#13382C]">
                  {titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>

                <p className="mb-4 max-w-lg font-sans text-[17.5px] leading-relaxed text-[#4A5D55] sm:text-[18px]">
                  {signatureSection.description}
                </p>

                <div className="h-px w-full bg-[#E2D9CC]" aria-hidden />
              </div>

              <div className="flex flex-col divide-y divide-[#E2D9CC]">
                {signatureSection.features.map((feature) => (
                  <div key={feature.id} className="flex items-start gap-4 py-2.5 sm:py-3">
                    <div className="mt-0.5 shrink-0 text-[#23381F]">
                      {getFeatureIcon(feature.iconName)}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-sans text-[18.5px] font-semibold leading-snug text-[#183B2B] sm:text-[19.5px]">
                        {feature.title}
                      </h3>
                      <p className="mt-0.5 font-sans text-[16px] leading-snug text-[#556961] sm:text-[16.5px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B Enquiry Configurator — square card */}
            <div className="flex flex-col justify-between border border-[#CCD0B8] bg-[#DEE0CB] p-6 sm:p-7 lg:p-8">
              <div>
                <span className="block font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#3D5A4E] sm:text-[13px]">
                  {configurator.eyebrow}
                </span>
                <p className="mt-1.5 font-sans text-[16px] font-medium leading-snug text-[#1E3B30] sm:text-[16.5px]">
                  {configurator.subtitle}
                </p>

                <div className="my-4 h-px w-full bg-[#CCD0B8]" aria-hidden />

                <div className="space-y-2.5">
                  <label className="block font-sans text-[15.5px] font-semibold text-[#1E3B30] sm:text-[16px]">
                    {configurator.quantityLabel ?? "Quantity (units)"}
                  </label>
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                    {configurator.quantities.map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setSelectedQuantity(qty)}
                        className={chipClass(selectedQuantity === qty)}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 sm:mt-5">
                  <label className="block font-sans text-[15.5px] font-semibold text-[#1E3B30] sm:text-[16px]">
                    Finish
                  </label>
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {configurator.finishes.map((finish) => (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={chipClass(selectedFinish === finish)}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 sm:mt-5">
                  <label className="block font-sans text-[15.5px] font-semibold text-[#1E3B30] sm:text-[16px]">
                    {configurator.personalizationLabel ?? "Brand personalization"}
                  </label>
                  <div className="grid max-w-[240px] grid-cols-2 gap-2.5">
                    {configurator.personalizations.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSelectedPersonalization(item)}
                        className={chipClass(selectedPersonalization === item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-[12px] border border-[#C5C9B4] bg-[#E4E7D4] p-5 sm:mt-5 sm:p-6">
                  <span className="block font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5A6F56]">
                    {configurator.indicativePricing.label}
                  </span>
                  <h4 className="mt-1 mb-1 font-serif text-[30px] font-semibold leading-tight text-[#1E3219] sm:text-[34px]">
                    {configurator.indicativePricing.title}
                  </h4>
                  <p className="font-sans text-[14.5px] leading-relaxed text-[#4E624A] sm:text-[15px]">
                    {configurator.indicativePricing.subtext}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRequestClick}
                  className="mt-4 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#1E3219] font-sans text-[16px] font-medium text-white transition-all hover:bg-[#152511] active:scale-[0.99] sm:mt-5 sm:text-[16.5px]"
                >
                  <span>{configurator.primaryCta}</span>
                </button>

                <button
                  type="button"
                  onClick={onSpeakSpecialist}
                  className="mt-2.5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#BDC2AC] bg-[#E9EADC] font-sans text-[15px] font-medium text-[#1E3219] transition-all hover:bg-[#F3F4E8] sm:h-[3.25rem] sm:text-[15.5px]"
                >
                  <Headphones size={17} className="text-[#1E3219]" />
                  <span>{configurator.secondaryCta}</span>
                </button>
              </div>

              <div className="relative mt-4 flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-[#23381F]">
                  <Truck size={18} className="text-[#3B5436]" />
                  <span className="font-sans text-[13.5px] font-medium text-[#23381F]">
                    Delivery region
                  </span>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                    className="inline-flex min-w-[140px] cursor-pointer items-center justify-between gap-2 border border-[#CAD0BA] bg-[#E9EADC] px-3 py-2 font-sans text-[13px] text-[#1E3B30] transition-colors hover:bg-[#F3F4E8]"
                  >
                    <span className="truncate">{selectedRegion}</span>
                    <ChevronDown size={14} className="shrink-0 text-[#4E624A]" />
                  </button>

                  {isRegionDropdownOpen ? (
                    <div className="absolute bottom-full right-0 z-30 mb-1 w-56 border border-[#CAD0BA] bg-[#E9EADC] py-1.5 text-[13.5px] shadow-lg animate-in fade-in duration-100">
                      {configurator.regions.map((region) => (
                        <button
                          key={region}
                          type="button"
                          onClick={() => {
                            setSelectedRegion(region);
                            setIsRegionDropdownOpen(false);
                          }}
                          className={`flex w-full cursor-pointer items-center justify-between px-3.5 py-1.5 text-left hover:bg-[#DEE0CB] ${
                            selectedRegion === region
                              ? "bg-[#DEE0CB] font-semibold text-[#1E3219]"
                              : "text-[#333333]"
                          }`}
                        >
                          <span>{region}</span>
                          {selectedRegion === region ? (
                            <Check size={14} className="text-[#1E3219]" />
                          ) : null}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
