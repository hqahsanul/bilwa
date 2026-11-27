"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Box, ChevronDown, Gift, Headphones, Info, Lock, Minus, Plus, Tag, Truck, X } from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { BAG_ALSO, BAG_EXTRAS, BAG_LINES, BAG_OFFERS, BAG_PAGE, type BagLine } from "@/data/bilva/bag";
import {
  BilvaBagAttentionCard,
  BilvaEmptyBagState,
  BilvaRatesBanner,
} from "@/components/bilva/use-cases/bilva-use-case-states";

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function BilvaBagPage() {
  const searchParams = useSearchParams();
  const attentionFromUrl = searchParams.get("attention") === "1";

  const [lines, setLines] = useState<BagLine[]>(BAG_LINES);
  const [code, setCode] = useState("");
  const [codeNote, setCodeNote] = useState("");
  const [offersOpen, setOffersOpen] = useState(true);
  const [demoAttention, setDemoAttention] = useState(false);
  const [attentionDismissed, setAttentionDismissed] = useState(false);

  const showAttention =
    !attentionDismissed && (attentionFromUrl || demoAttention) && lines.length > 0;

  const pieceCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const itemsTotal = useMemo(() => lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0), [lines]);

  function setQuantity(id: string, next: number) {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, quantity: Math.max(1, next) } : line)));
  }

  return (
    <section className="w-full bg-[#F7F4EE] pb-16">
      <div className={`${BILVA_SITE_SHELL_CLASS} pt-6`}>
        <p className="font-sans text-[13px] font-medium text-[#6A736C]">
          <Link href="/" className="hover:text-[#143028]">
            {BAG_PAGE.crumbHome}
          </Link>
          <span className="mx-2 text-[#C4B8A8]">/</span>
          {BAG_PAGE.crumbCurrent}
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-[clamp(2.2rem,3.4vw,2.8rem)] font-semibold leading-none text-[#143028]">{BAG_PAGE.title}</h1>
            <p className="mt-2 font-sans text-[15px] font-medium text-[#5C6B62]">
              {pieceCount === 1 ? "One piece selected." : `${pieceCount} pieces selected.`} Review the details before checkout.
            </p>
          </div>
          <Link href={BAG_PAGE.continueHref} className="inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-[#1F6B45] underline underline-offset-4">
            <ArrowLeft size={16} />
            {BAG_PAGE.continue}
          </Link>
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22.5rem]">
          <div>
            {lines.length === 0 ? (
              <BilvaEmptyBagState />
            ) : (
            <>
            {showAttention ? (
              <h2 className="mb-4 font-serif text-[1.35rem] font-semibold text-[#143028]">
                Updates in your bag
              </h2>
            ) : null}
            {showAttention ? (
              <div className="mb-4">
                <BilvaBagAttentionCard
                  onReviewTotal={() => {
                    setAttentionDismissed(true);
                    setDemoAttention(false);
                  }}
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-4">
              {lines.map((line) => (
                <article key={line.id} className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 rounded-[16px] border border-[#E7E1D6] bg-white p-3 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:p-4">
                  <div className="relative h-[92px] overflow-hidden rounded-[12px] bg-[#F3EEE6] sm:h-[104px]">
                    <Image src={line.imageSrc} alt={line.imageAlt} fill sizes="112px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-serif text-[20px] font-semibold leading-tight text-[#143028]">{line.title}</h2>
                    <p className="mt-1 font-sans text-[13.5px] font-medium text-[#6A736C]">{line.meta}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 font-sans text-[13.5px] font-medium text-[#3E4E46]">
                      {line.packagingKind === "gift" ? <Gift size={14} /> : <Box size={14} />}
                      {line.packaging}
                    </p>
                    <Link href={line.href} className="mt-2 inline-flex font-sans text-[13.5px] font-semibold text-[#1F6B45] underline underline-offset-4">
                      Edit details
                    </Link>
                  </div>
                  <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-end">
                    <div className="inline-flex items-center rounded-[8px] border border-[#E4DDD2] bg-white">
                      <button type="button" aria-label={`Decrease ${line.title}`} onClick={() => setQuantity(line.id, line.quantity - 1)} className="flex h-9 w-9 cursor-pointer items-center justify-center text-[#143028]">
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[1.25rem] text-center font-sans text-[15px] font-semibold">{line.quantity}</span>
                      <button type="button" aria-label={`Increase ${line.title}`} onClick={() => setQuantity(line.id, line.quantity + 1)} className="flex h-9 w-9 cursor-pointer items-center justify-center text-[#143028]">
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="min-w-[5.5rem] text-right font-serif text-[20px] font-semibold text-[#143028]">{formatInr(line.unitPrice * line.quantity)}</p>
                    <button
                      type="button"
                      aria-label={`Remove ${line.title}`}
                      onClick={() => setLines((current) => current.filter((item) => item.id !== line.id))}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-[#8A8478]"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <BagDemoAttentionToggle
              demoAttention={demoAttention}
              attentionFromUrl={attentionFromUrl}
              onToggle={() => setDemoAttention((on) => !on)}
            />

            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-[12px] bg-[#E7EFE4] px-4 py-3 font-sans text-[14px] font-medium text-[#143028]">
              <Info size={16} className="shrink-0" />
              <span className="font-bold">{BAG_PAGE.pricingTitle}</span>
              <span className="hidden h-4 w-px bg-[#C5D0BE] sm:block" />
              <span className="text-[#3E4E46]">{BAG_PAGE.pricingNote}</span>
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif text-[1.85rem] font-semibold text-[#143028]">{BAG_PAGE.extrasTitle}</h2>
                <span className="rounded-full bg-[#E7EFE4] px-2.5 py-1 font-sans text-[12px] font-semibold text-[#1F6B45]">{BAG_PAGE.extrasEyebrow}</span>
              </div>
              <p className="mt-1 font-sans text-[14.5px] font-medium text-[#5C6B62]">{BAG_PAGE.extrasIntro}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {BAG_EXTRAS.map((extra) => (
                  <article key={extra.id} className="overflow-hidden rounded-[16px] border border-[#E7E1D6] bg-white">
                    <div className="relative h-36">
                      <Image src={extra.imageSrc} alt={extra.imageAlt} fill sizes="280px" className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-[18px] font-semibold text-[#143028]">{extra.title}</h3>
                      <p className="mt-1 font-sans text-[13.5px] font-medium leading-snug text-[#5C6B62]">{extra.body}</p>
                      <Link href={extra.href} className="mt-3 inline-flex items-center gap-1 rounded-full border border-[#1A3324] px-3.5 py-1.5 font-sans text-[13.5px] font-semibold text-[#143028]">
                        {BAG_PAGE.extrasAction} <Plus size={13} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            </>
            )}
          </div>

          {lines.length > 0 ? (
          <aside className="rounded-[18px] bg-[#E7EFE4] p-5 sm:p-6 lg:sticky lg:top-6">
            <h2 className="font-serif text-[1.65rem] font-semibold text-[#143028]">{BAG_PAGE.summaryTitle}</h2>
            <div className="mt-4 space-y-2.5 font-sans text-[14.5px] font-medium text-[#3E4E46]">
              <div className="flex justify-between">
                <span>
                  {BAG_PAGE.itemsLabel} ({pieceCount})
                </span>
                <span className="font-semibold text-[#143028]">{formatInr(itemsTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{BAG_PAGE.deliveryLabel}</span>
                <span>{BAG_PAGE.deliveryValue}</span>
              </div>
              <div className="flex justify-between">
                <span>{BAG_PAGE.taxesLabel}</span>
                <span>{BAG_PAGE.taxesValue}</span>
              </div>
            </div>

            <div className="mt-4">
              <BilvaRatesBanner />
            </div>

            <div className="mt-5 border-t border-[#D5DECE] pt-4">
              <p className="font-sans text-[14.5px] font-bold text-[#143028]">{BAG_PAGE.codeTitle}</p>
              <form
                className="mt-2 flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  setCodeNote(code.trim() ? "Code noted. Any adjustment is confirmed at checkout." : "");
                }}
              >
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder={BAG_PAGE.codePlaceholder}
                  className="h-10 min-w-0 flex-1 rounded-[8px] border border-[#E4DDD2] bg-white px-3 font-sans text-[14px] font-medium text-[#143028] outline-none"
                />
                <button type="submit" className="h-10 cursor-pointer rounded-[8px] bg-[#1A3324] px-4 font-sans text-[14px] font-semibold text-white">
                  {BAG_PAGE.codeAction}
                </button>
              </form>
              {codeNote ? <p className="mt-2 font-sans text-[12.5px] font-medium text-[#3E4E46]">{codeNote}</p> : null}
            </div>

            <button type="button" onClick={() => setOffersOpen((open) => !open)} className="mt-4 flex w-full cursor-pointer items-center justify-between font-sans text-[14.5px] font-semibold text-[#1F6B45]">
              <span className="inline-flex items-center gap-2">
                <Tag size={15} />
                {BAG_PAGE.offersLabel} ({BAG_OFFERS.length})
              </span>
              <ChevronDown size={16} className={offersOpen ? "rotate-180" : ""} />
            </button>
            {offersOpen ? (
              <div className="mt-3 rounded-[12px] bg-white/70 p-3">
                <p className="font-sans text-[12.5px] font-medium text-[#6A736C]">{BAG_PAGE.offersNote}</p>
                <ul className="mt-2 space-y-2">
                  {BAG_OFFERS.map((offer) => (
                    <li key={offer.id} className="flex items-start gap-2 font-sans text-[13.5px] font-medium text-[#143028]">
                      {offer.id === "wrap" ? <Gift size={15} className="mt-0.5 shrink-0" /> : <Box size={15} className="mt-0.5 shrink-0" />}
                      <span>
                        <span className="font-semibold">{offer.title}</span>
                        <span className="block text-[12.5px] text-[#6A736C]">{offer.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-5 border-t border-[#D5DECE] pt-4">
              <div className="flex items-end justify-between">
                <p className="font-sans text-[15px] font-bold text-[#143028]">{BAG_PAGE.estimateLabel}</p>
                <p className="font-serif text-[1.7rem] font-semibold text-[#143028]">{formatInr(itemsTotal)}</p>
              </div>
              <p className="mt-1 font-sans text-[12.5px] font-medium text-[#5C6B62]">{BAG_PAGE.estimateNote}</p>
              {showAttention ? (
                <p className="mt-4 rounded-[10px] border border-[#e8d4b0] bg-[#faf3e8] px-3 py-2 text-center font-sans text-[12.5px] font-medium text-[#4a4035]">
                  Review updated totals before you continue to checkout.
                </p>
              ) : null}
              <Link
                href="/checkout"
                aria-disabled={showAttention}
                className={`mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#1A3324] font-sans text-[15.5px] font-semibold text-white ${
                  showAttention ? "pointer-events-none opacity-45" : "cursor-pointer"
                }`}
              >
                {BAG_PAGE.checkout}
                <ArrowRight size={16} />
              </Link>
              <p className="mt-2 flex items-center justify-center gap-1.5 font-sans text-[13px] font-medium text-[#3E4E46]">
                <Lock size={13} />
                {BAG_PAGE.secure}
              </p>
              <p className="text-center font-sans text-[12px] font-medium text-[#6A736C]">{BAG_PAGE.secureNote}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-[#D5DECE] pt-3 font-sans text-[13px] font-semibold text-[#1F6B45]">
              <span className="inline-flex items-center gap-1.5">
                <Truck size={14} /> {BAG_PAGE.shipping}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Headphones size={14} /> {BAG_PAGE.assistance}
              </span>
            </div>
          </aside>
          ) : null}
        </div>

        {lines.length > 0 ? (
        <div className="mt-12">
          <h2 className="font-serif text-[1.85rem] font-semibold text-[#143028]">{BAG_PAGE.alsoTitle}</h2>
          <p className="mt-1 font-sans text-[14.5px] font-medium text-[#5C6B62]">{BAG_PAGE.alsoIntro}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:max-w-[46rem]">
            {BAG_ALSO.map((item) => (
              <article key={item.id} className="grid grid-cols-[108px_minmax(0,1fr)] overflow-hidden rounded-[16px] border border-[#E7E1D6] bg-white">
                <div className="relative min-h-[108px]">
                  <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="108px" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-4">
                  <h3 className="font-serif text-[18px] font-semibold text-[#143028]">{item.title}</h3>
                  <p className="mt-1 font-sans text-[13.5px] font-medium leading-snug text-[#5C6B62]">{item.meta}</p>
                  <Link href={item.href} className="mt-3 inline-flex w-fit items-center gap-1 rounded-full border border-[#1A3324] px-3.5 py-1.5 font-sans text-[13.5px] font-semibold text-[#143028]">
                    {BAG_PAGE.alsoAction} <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        ) : null}
      </div>
    </section>
  );
}

function BagDemoAttentionToggle({
  demoAttention,
  attentionFromUrl,
  onToggle,
}: {
  demoAttention: boolean;
  attentionFromUrl: boolean;
  onToggle: () => void;
}) {
  if (attentionFromUrl) return null;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="mt-4 font-sans text-[12px] font-semibold text-[#1F6B45] underline underline-offset-2"
    >
      {demoAttention ? "Hide demo: bag attention" : "Demo: bag needs attention"}
    </button>
  );
}
