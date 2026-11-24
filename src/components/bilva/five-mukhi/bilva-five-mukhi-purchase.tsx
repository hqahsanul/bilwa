"use client";

import { useMemo, useState } from "react";
import { MapPin, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { FIVE_MUKHI_DATA } from "@/data/bilva/five-mukhi-rudraksha";

function chipClass(selected: boolean) {
  return `inline-flex h-10 cursor-pointer items-center justify-center rounded-full px-5 font-sans text-[14.5px] font-medium whitespace-nowrap transition-colors sm:h-11 sm:px-6 sm:text-[15px] ${
    selected
      ? "bg-[#1A3324] text-white"
      : "border border-[#C9C6B6] bg-white/70 text-[#1A3324] hover:bg-white"
  }`;
}

function SpecIcon({ name }: { name: "mukhi" | "origin" | "size" | "stringing" }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 26 26",
    fill: "none",
    stroke: "#1A3328",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "mukhi":
      return (
        <svg {...common}>
          <path d="M13 3.5c-1.2 4.2-1.1 8.4 0 12.8 1.1-4.4 1.2-8.6 0-12.8Z" />
          <path d="M13 4.2c3.4 2.2 6.2 6.4 6.6 11.2-3.2.4-6.2-1.6-6.6-4.2" />
          <path d="M13 4.2C9.6 6.4 6.8 10.6 6.4 15.4c3.2.4 6.2-1.6 6.6-4.2" />
          <path d="M13 16.2v6.2" />
        </svg>
      );
    case "origin":
      return (
        <svg {...common}>
          <path d="M3.5 19.5 9.2 9.2 13 14.2 17.4 6.5 22.5 19.5" />
          <path d="M3 19.5h20" />
        </svg>
      );
    case "size":
      return (
        <svg {...common}>
          <circle cx="13" cy="13" r="5.25" />
          <path d="M2.5 13h3.25M20.25 13H23.5" />
          <path d="M4.6 10.8 2.5 13l2.1 2.2" />
          <path d="M21.4 10.8 23.5 13l-2.1 2.2" />
        </svg>
      );
    case "stringing":
      return (
        <svg {...common}>
          <path d="M3.5 15.5c1.4-2.4 2.6-2.4 4 0s2.6 2.4 4 0 2.6-2.4 4 0 2.6 2.4 4 0 2.2-2.2 3-2.2" />
          <circle cx="7.2" cy="13.2" r="1.15" />
          <circle cx="13" cy="15.4" r="1.15" />
          <circle cx="18.8" cy="13.2" r="1.15" />
        </svg>
      );
    default:
      return null;
  }
}

export function BilvaFiveMukhiPurchase() {
  const { product, purchase } = FIVE_MUKHI_DATA;
  const [beadSize, setBeadSize] = useState("18 mm");
  const [form, setForm] = useState("Single Bead");
  const [threading, setThreading] = useState("With Thread");
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const titleLines = product.title.split("\n");

  const unitPrice = purchase.priceBySize[beadSize] ?? purchase.basePriceInr;
  const total = useMemo(() => unitPrice * qty, [unitPrice, qty]);

  return (
    <section id="purchase" className="w-full select-none bg-[#FAF7F2] py-0">
      <div className={`${BILVA_SITE_FRAME_CLASS} bg-[#F3EEE3] py-10 sm:py-12 lg:py-14`}>
        <div className={BILVA_SITE_SHELL_CLASS}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
            {/* Left — product info (Figma) */}
            <div className="relative flex flex-col overflow-hidden">
              {/* Single pale leaf — bottom left, as in Figma */}
              <svg
                viewBox="0 0 240 280"
                className="pointer-events-none absolute -bottom-10 -left-6 h-52 w-44 text-[#8FA58A] opacity-[0.22] sm:h-64 sm:w-56"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M118 18c8 28 10 62 4 98-18 8-48 6-78-8 22-28 48-58 74-90Z"
                />
                <path
                  fill="currentColor"
                  d="M122 28c22 36 28 78 18 122-8 6-22 8-36 6 6-42 8-86 18-128Z"
                  opacity="0.85"
                />
                <path
                  d="M118 22c6 36 8 78 2 128"
                  fill="none"
                  stroke="#6E8A6A"
                  strokeWidth="1.2"
                  opacity="0.45"
                />
              </svg>

              <div className="relative z-[1]">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6B7F76]">
                  {product.eyebrow}
                </span>

                <h2 className="mt-2 font-serif text-[clamp(2.75rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-[#12352A]">
                  {titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>

                <p className="mt-4 max-w-[28rem] font-serif text-[17px] leading-[1.45] text-[#3A4F46] sm:text-[18px]">
                  {product.description}
                </p>

                {/* Icon | label | value — hairline only under the value column */}
                <div className="mt-8 flex max-w-[34rem] flex-col">
                  {product.specs.map((spec, idx) => {
                    const isLast = idx === product.specs.length - 1;
                    return (
                      <div
                        key={spec.id}
                        className="grid grid-cols-[1.75rem_9.5rem_minmax(0,1fr)] items-start gap-x-3 sm:grid-cols-[1.75rem_10.5rem_minmax(0,1fr)] sm:gap-x-4"
                      >
                        <div className="pt-0.5">
                          <SpecIcon name={spec.icon} />
                        </div>
                        <span className="pt-1 font-sans text-[15px] font-semibold leading-snug text-[#12352A] sm:text-[15.5px]">
                          {spec.label}
                        </span>
                        <div className={isLast ? "pt-1 pb-1" : "border-b border-[#D5CBBC] pt-1 pb-3.5"}>
                          <span className="block font-sans text-[15px] leading-snug text-[#2C4A3E] sm:text-[15.5px]">
                            {spec.value}
                            {"valueHint" in spec && spec.valueHint ? (
                              <>
                                <br />
                                <span className="text-[#5E7268]">{spec.valueHint}</span>
                              </>
                            ) : null}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-8 max-w-[30rem] font-serif text-[17px] italic leading-[1.45] text-[#3A4F46] sm:mt-10 sm:text-[18px]">
                  {product.note}
                </p>
              </div>
            </div>

            {/* Right — select & purchase (Figma) */}
            <div className="flex flex-col rounded-[16px] border border-[#D5D8C4] bg-[#E4E6D4] p-6 sm:p-7 lg:p-8">
              <h3 className="font-serif text-[28px] font-medium italic leading-tight text-[#1A3324] sm:text-[32px]">
                {purchase.title}
              </h3>

              <div className="mt-6 space-y-5">
                <div className="space-y-2.5">
                  <span className="block font-sans text-[15px] font-semibold text-[#1A3324]">
                    {purchase.beadSizeLabel}
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {purchase.beadSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setBeadSize(size)}
                        className={chipClass(beadSize === size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="block font-sans text-[15px] font-semibold text-[#1A3324]">
                    Form
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {purchase.forms.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setForm(item)}
                        className={chipClass(form === item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="block font-sans text-[15px] font-semibold text-[#1A3324]">
                    Threading / Case
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {purchase.threading.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setThreading(item)}
                        className={chipClass(threading === item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="block font-sans text-[15px] font-semibold text-[#1A3324]">
                    Quantity
                  </span>
                  <div className="inline-flex items-center rounded-[8px] border border-[#C9C6B6] bg-white/50">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center text-[#1A3324]"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="min-w-[1.75rem] text-center font-sans text-[15px] font-medium text-[#1A3324]">
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty((q) => q + 1)}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center text-[#1A3324]"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block font-sans text-[14.5px] font-medium text-[#1A3324]">
                    {purchase.priceLabel}
                  </span>
                  <p className="mt-1 font-serif text-[36px] font-semibold leading-none text-[#1A3324] sm:text-[40px]">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  type="button"
                  className="flex h-[3.25rem] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[12px] bg-[#1A3324] font-sans text-[16px] font-medium text-white transition-colors hover:bg-[#12241A]"
                >
                  <ShoppingBag size={18} strokeWidth={1.75} />
                  <span>{purchase.addToBag}</span>
                </button>

                <button
                  type="button"
                  className="flex h-[3.15rem] w-full cursor-pointer items-center justify-center rounded-[12px] border border-[#C9C6B6] bg-transparent font-sans text-[15.5px] font-medium text-[#1A3324] transition-colors hover:bg-white/40"
                >
                  {purchase.buyNow}
                </button>

                <div className="relative">
                  <MapPin
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C6654]"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder={purchase.deliveryPlaceholder}
                    className="h-12 w-full rounded-[12px] border border-[#D5D2C4] bg-white pr-11 pl-10 font-sans text-[14.5px] text-[#1A3324] placeholder:text-[#8A9084] outline-none focus:border-[#1A3324]"
                  />
                  <button
                    type="button"
                    aria-label="Check delivery"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#1A3324]"
                  >
                    <ArrowRight size={16} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
