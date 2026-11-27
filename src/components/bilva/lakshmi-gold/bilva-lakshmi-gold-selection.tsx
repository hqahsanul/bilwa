"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Truck } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { BAG_PATH, CHECKOUT_PATH } from "@/lib/bilva-collection-routes";
import { LAKSHMI_GOLD_COIN_DATA } from "@/data/bilva/lakshmi-gold-coin";

export function BilvaLakshmiGoldSelection() {
  const { product, selection, buyBar } = LAKSHMI_GOLD_COIN_DATA;
  const [weight, setWeight] = useState("5 g");
  const [packaging, setPackaging] = useState("classic");
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const grams = Number.parseInt(weight, 10);
  const total = useMemo(() => grams * buyBar.ratePerGram * qty, [grams, qty, buyBar.ratePerGram]);
  const presentation = packaging === "classic" ? "Classic / Gift" : "Gift presentation";

  return (
    <section className="w-full select-none bg-[#F7F3EC] py-0">
      <div className={`${BILVA_SITE_FRAME_CLASS} bg-[#F7F3EC] py-10 sm:py-14`}>
        <div className={`${BILVA_SITE_SHELL_CLASS} grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10`}>
          <div>
            <h2 className="font-serif text-[clamp(2.2rem,3.6vw,3rem)] font-medium leading-[1.1] text-[#143028]">{product.title}</h2>
            <p className="mt-4 max-w-lg font-sans text-[16.5px] leading-[1.55] text-[#3E4E46]">{product.description}</p>
            <h3 className="mt-8 font-serif text-[28px] font-medium text-[#143028]">{product.specsTitle}</h3>
            <div className="mt-3 max-w-lg border-t border-[#E4DDD2]">
              {product.specs.map((spec) => (
                <div key={spec.id} className="grid grid-cols-2 border-b border-[#E4DDD2] py-2 font-sans text-[15.5px]">
                  <span className="font-semibold text-[#143028]">{spec.label}</span>
                  <span className="text-[#3E4E46]">{spec.id === "weight" ? weight : spec.id === "presentation" ? presentation : spec.value}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-8 aspect-[4/3] max-w-lg overflow-hidden rounded-[12px] bg-[#EFE8DC]">
              <Image src={product.imageSrc} alt={product.imageAlt} fill sizes="50vw" className="object-cover" />
            </div>
          </div>

          <div className="rounded-[18px] bg-[#E7EFE4] p-5 sm:p-7">
            <h3 className="font-serif text-[28px] font-medium text-[#143028]">{selection.title}</h3>
            <p className="mt-3 font-sans text-[15px] text-[#3E4E46]">
              {selection.productName} · {weight}
            </p>
            <p className="mt-2 font-serif text-[40px] font-semibold leading-none text-[#143028]">₹{total.toLocaleString("en-IN")}</p>
            <p className="mt-2 font-sans text-[13.5px] text-[#5C6B62]">{selection.priceNote}</p>
            <div className="mt-4 flex items-center justify-between rounded-[10px] bg-[#F4F7F1] px-3 py-2.5 font-sans text-[13.5px] text-[#3E4E46]">
              <span>{selection.rateLabel}</span>
              <span className="text-[#2F6B45]">↗</span>
            </div>

            <p className="mt-5 font-sans text-[15px] font-semibold text-[#143028]">{selection.weightLabel}</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {selection.weights.map((item) => {
                const selected = weight === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setWeight(item)}
                    className={`h-11 cursor-pointer rounded-[8px] font-sans text-[15px] font-medium ${
                      selected ? "bg-[#1A3324] text-white" : "border border-[#D5DDD0] bg-white text-[#1A3324]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <p className="mt-5 font-sans text-[15px] font-semibold text-[#143028]">{selection.packagingLabel}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {selection.packaging.map((option) => {
                const selected = packaging === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPackaging(option.id)}
                    className={`h-11 cursor-pointer rounded-[8px] font-sans text-[14.5px] font-medium ${
                      selected ? "bg-[#1A3324] text-white" : "border border-[#D5DDD0] bg-white text-[#1A3324]"
                    }`}
                  >
                    {option.title}
                  </button>
                );
              })}
            </div>

            <p className="mt-5 font-sans text-[15px] font-semibold text-[#143028]">{selection.quantityLabel}</p>
            <div className="mt-2 inline-flex items-center rounded-[8px] border border-[#D5DDD0] bg-white">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-10 w-10 cursor-pointer items-center justify-center">
                <Minus size={15} />
              </button>
              <span className="min-w-[1.5rem] text-center font-sans text-[16px] font-medium">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="flex h-10 w-10 cursor-pointer items-center justify-center">
                <Plus size={15} />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link
                href={BAG_PATH}
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[8px] bg-[#1A3324] font-sans text-[15.5px] font-medium text-white"
              >
                {selection.addToBag}
              </Link>
              <Link
                href={CHECKOUT_PATH}
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[8px] border border-[#D5DDD0] bg-white font-sans text-[15.5px] font-medium text-[#1A3324]"
              >
                {selection.buyNow}
              </Link>
            </div>

            <p className="mt-5 font-sans text-[15px] font-semibold text-[#143028]">{selection.pinTitle}</p>
            <div className="mt-2 flex gap-2">
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                inputMode="numeric"
                placeholder={selection.pinPlaceholder}
                className="h-11 flex-1 rounded-[8px] border border-[#D5DDD0] bg-white px-3 font-sans text-[14.5px] text-[#143028] outline-none placeholder:text-[#8A9084]"
              />
              <button type="button" className="h-11 cursor-pointer rounded-[8px] bg-[#1A3324] px-4 font-sans text-[14.5px] font-medium text-white">
                {selection.pinAction}
              </button>
            </div>
            <p className="mt-3 inline-flex items-center gap-2 font-sans text-[13px] text-[#3E4E46]">
              <Truck size={15} />
              {selection.dispatch}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
