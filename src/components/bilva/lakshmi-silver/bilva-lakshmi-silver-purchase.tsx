"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Minus, Plus, ShoppingBag } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { BAG_PATH, CHECKOUT_PATH } from "@/lib/bilva-collection-routes";
import { LAKSHMI_SILVER_COIN_DATA } from "@/data/bilva/lakshmi-silver-coin";

function SpecIcon({ name }: { name: "purity" | "weight" | "finish" | "gift" }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 30 30",
    fill: "none",
    stroke: "#1A3328",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "purity") {
    return (
      <svg {...common}>
        <path d="M8 11.5h14l2.2 3.2H5.8L8 11.5Z" />
        <path d="M5.8 14.7h18.4V22H5.8z" />
        <path d="M10.2 17.4h9.6" />
      </svg>
    );
  }
  if (name === "weight") {
    return (
      <svg {...common}>
        <path d="M15 4.8v4.2" />
        <circle cx="15" cy="4.2" r="0.8" fill="#1A3328" stroke="none" />
        <path d="M5.5 11.2h19" />
        <path d="M8 11.2 5.6 17.4h5.2L8 11.2Z" />
        <path d="M22 11.2 19.6 17.4h5.2L22 11.2Z" />
        <path d="M15 9v15.2" />
        <path d="M10.2 24.2h9.6" />
      </svg>
    );
  }
  if (name === "finish") {
    return (
      <svg {...common}>
        <path d="M15 24.5c0-4.2 1.4-7 1.4-10.4C16.4 9.6 15 6 15 6s-1.4 3.6-1.4 8.1c0 3.4 1.4 6.2 1.4 10.4Z" />
        <path d="M15 15c-4 .4-7.2 2.2-8.4 4.6 3 .2 5.8-.8 8.4-2.2 2.6 1.4 5.4 2.4 8.4 2.2-1.2-2.4-4.4-4.2-8.4-4.6Z" />
        <path d="M15 12.5C12.2 11 10.2 8.6 10.2 6.8c1.8 1.2 3.2 3 4.8 4.6 1.6-1.6 3-3.4 4.8-4.6 0 1.8-2 4.2-4.8 5.7Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="5" y="13" width="20" height="11.5" rx="1" />
      <path d="M5 13h20V10.2H5z" />
      <path d="M15 10.2V24.5" />
      <path d="M15 10.2c-2-3-6-3.2-6-.4 0 1.8 3.4 2.4 6 2.4" />
      <path d="M15 10.2c2-3 6-3.2 6-.4 0 1.8-3.4 2.4-6 2.4" />
    </svg>
  );
}

function PackIcon({ id }: { id: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    stroke: "#1A3328",
    strokeWidth: 1.25,
    "aria-hidden": true as const,
  };
  if (id === "box") {
    return (
      <svg {...common}>
        <rect x="3" y="9" width="16" height="9" />
        <path d="M3 9h16V7H3z" />
        <path d="M11 7v11" />
        <path d="M11 7c-1.4-2-4.4-2.2-4.4-.2 0 1.3 2.6 1.8 4.4 1.8" />
        <path d="M11 7c1.4-2 4.4-2.2 4.4-.2 0 1.3-2.6 1.8-4.4 1.8" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 9.5h10l-1 9H7l-1-9Z" />
      <path d="M8 9.5V8a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

export function BilvaLakshmiSilverPurchase() {
  const { product, purchase } = LAKSHMI_SILVER_COIN_DATA;
  const [weight, setWeight] = useState("20 g");
  const [packaging, setPackaging] = useState("box");
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");

  const grams = Number.parseInt(weight, 10);
  const unit = useMemo(() => Math.round(grams * purchase.ratePerGram), [grams, purchase.ratePerGram]);
  const total = unit * qty;
  const rateLabel = purchase.ratePerGram.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section id="purchase" className="w-full select-none bg-[#FAF7F2] py-0">
      <div className={`${BILVA_SITE_FRAME_CLASS} bg-[#F4F0E6] py-10 sm:py-12 lg:py-14`}>
        <div className={BILVA_SITE_SHELL_CLASS}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7F76]">
                {product.eyebrow}
              </span>
              <h2 className="mt-2 font-serif text-[clamp(2.65rem,4.4vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.02em] text-[#12352A]">
                {product.title}
              </h2>
              <span className="mt-3 block h-[2px] w-11 bg-[#C4A15A]" aria-hidden />
              <p className="mt-3.5 max-w-md font-serif text-[19px] font-medium leading-[1.32] text-[#2C4038] sm:text-[21px]">
                {product.description}
              </p>

              <div className="mt-8 flex max-w-xl flex-col gap-7 sm:gap-8">
                {product.specs.map((spec) => (
                  <div key={spec.id} className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-4">
                    <span className="flex h-8 w-8 items-center justify-center">
                      <SpecIcon name={spec.icon} />
                    </span>
                    <div>
                      <p className="font-sans text-[18px] font-bold leading-none text-[#12352A] sm:text-[19px]">{spec.label}</p>
                      <p className="mt-1 font-sans text-[16.5px] font-medium leading-snug text-[#3A4F46] sm:text-[17px]">
                        {spec.id === "weight" ? weight : spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[16px] bg-[#E4E7D4] p-5 sm:p-6">
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3D5348]">
                {purchase.weightLabel}
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {purchase.weights.map((item) => {
                  const selected = weight === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setWeight(item)}
                      className={`h-10 min-w-[4rem] cursor-pointer rounded-[6px] px-3.5 font-sans text-[15.5px] font-medium transition-colors ${
                        selected ? "bg-[#1A3324] text-white" : "border border-[#D5D8C8] bg-white text-[#1A3324] hover:bg-white"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <span className="mt-5 block font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3D5348]">
                {purchase.packagingLabel}
              </span>
              <div className="mt-3 flex flex-col gap-2">
                {purchase.packaging.map((option) => {
                  const selected = packaging === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setPackaging(option.id)}
                      className={`flex cursor-pointer items-center gap-3 rounded-[10px] border bg-white px-3 py-2.5 text-left ${
                        selected ? "border-[#1A3324]" : "border-[#E1E3D6]"
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-[#E1E3D6]">
                        <PackIcon id={option.id} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-sans text-[15.5px] font-semibold text-[#1A3324]">{option.title}</span>
                        <span className="mt-0.5 block font-sans text-[13.5px] text-[#6A736C]">{option.detail}</span>
                      </span>
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          selected ? "border-[#1A3324]" : "border-[#C5C8BA]"
                        }`}
                      >
                        {selected ? <span className="h-2 w-2 rounded-full bg-[#1A3324]" /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>

              <span className="mt-5 block font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3D5348]">
                {purchase.quantityLabel}
              </span>
              <div className="mt-2 inline-flex items-center rounded-[8px] border border-[#D5D8C8] bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center text-[#1A3324]"
                >
                  <Minus size={14} />
                </button>
                <span className="min-w-[1.4rem] text-center font-sans text-[16px] font-medium text-[#1A3324]">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center text-[#1A3324]"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5C6B62]">
                    {purchase.priceLabel}
                  </span>
                  <p className="mt-1 font-serif text-[36px] font-semibold leading-none text-[#1A3324] sm:text-[40px]">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1.5 font-sans text-[14.5px] text-[#5C6B62]">For {weight} (Silver 999)</p>
                </div>
                <div className="text-right">
                  <span className="block max-w-[10.5rem] font-sans text-[11px] font-semibold uppercase leading-tight tracking-[0.1em] text-[#5C6B62]">
                    {purchase.rateLabel}
                  </span>
                  <p className="mt-1 font-serif text-[20px] font-semibold leading-none text-[#1A3324]">₹{rateLabel} / g</p>
                  <p className="mt-1 font-sans text-[13.5px] text-[#5C6B62]">(illustrative)</p>
                </div>
              </div>

              <Link
                href={BAG_PATH}
                className="mt-5 flex h-[3.15rem] w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#1A3324] font-sans text-[16px] font-medium text-white hover:bg-[#12241A]"
              >
                <ShoppingBag size={16} strokeWidth={1.75} />
                {purchase.addToBag}
              </Link>
              <Link
                href={CHECKOUT_PATH}
                className="mt-2 flex h-[3.15rem] w-full cursor-pointer items-center justify-center rounded-[8px] border border-[#D7DACE] bg-white font-sans text-[16px] font-medium text-[#1A3324] hover:bg-[#F7F8F2]"
              >
                {purchase.buyNow}
              </Link>

              <div className="mt-4 flex items-center gap-2.5">
                <MapPin size={16} className="shrink-0 text-[#1A3324]" />
                <span className="font-sans text-[14.5px] text-[#1A3324]">{purchase.deliveryLabel}</span>
                <label className="ml-auto flex h-10 w-[8.25rem] shrink-0 items-center rounded-[8px] border border-[#C9CDB8] bg-white pl-3 pr-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={purchase.deliveryPlaceholder}
                    aria-label={purchase.deliveryPlaceholder}
                    className="w-full bg-transparent font-sans text-[14.5px] text-[#1A3324] placeholder:text-[#8A9084] outline-none"
                  />
                  <ArrowRight size={16} className="shrink-0 text-[#1A3324]" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
