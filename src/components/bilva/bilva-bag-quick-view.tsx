"use client";

import Image from "next/image";
import Link from "next/link";
import { Info, Pencil, Trash2, X } from "lucide-react";
import {
  BAG_PATH,
  LAKSHMI_GOLD_COIN_PATH,
  LAKSHMI_SILVER_COIN_PATH,
} from "@/lib/bilva-collection-routes";

const LINK_TEAL = "#0B6B5C";
const GOLD = "#B89248";
const INK = "#0A2D23";
const MUTED = "#5C6B66";
const SUBTLE = "#666666";

export type BagItem = {
  id: string;
  title: string;
  quantity: number;
  href: string;
  image: string;
  alt: string;
};

export const MOCK_BAG_ITEMS: BagItem[] = [
  {
    id: "bag-gold-coin-1g",
    title: "Gold Coin · 1 g",
    quantity: 1,
    href: LAKSHMI_GOLD_COIN_PATH,
    image: "/images/bilva/bestseller-gold-coin-clean.webp",
    alt: "Gold coin 1 g",
  },
  {
    id: "bag-silver-coin-10g",
    title: "Silver Coin · 10 g",
    quantity: 1,
    href: LAKSHMI_SILVER_COIN_PATH,
    image: "/images/bilva/bestseller-silver-coin-clean.webp",
    alt: "Silver coin 10 g",
  },
];

type BilvaBagQuickViewProps = {
  items: BagItem[];
  onRemove: (id: string) => void;
  onClose: () => void;
  className?: string;
};

export function BilvaBagQuickView({
  items,
  onRemove,
  onClose,
  className = "",
}: BilvaBagQuickViewProps) {
  const count = items.length;
  const itemTotal = items.reduce((sum, item) => sum + item.quantity, 0);
  const countLabel = itemTotal === 1 ? "1 item" : `${itemTotal} items`;

  return (
    <div
      className={`relative w-[min(100vw-2rem,380px)] rounded-[8px] border border-[#E2DDD5] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-top-1 duration-150 ${className}`}
      role="dialog"
      aria-label="Your bag"
    >
      <div
        className="pointer-events-none absolute -top-[7px] right-5 h-3.5 w-3.5 rotate-45 border-l border-t border-[#E2DDD5] bg-white"
        aria-hidden
      />

      <div className="border-b border-[#EFEAE2] px-4 pb-3 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="font-sans text-[15px] font-bold" style={{ color: INK }}>
            Your Bag
          </span>
          <div className="flex items-center gap-2">
            {count > 0 && (
              <span
                className="rounded-full bg-[#E4EFEA] px-2.5 py-0.5 font-sans text-[11px] font-semibold"
                style={{ color: LINK_TEAL }}
              >
                {countLabel}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#7A8480] transition-colors hover:bg-[#F5F2EC] hover:text-[#0A2D23]"
              aria-label="Close bag"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      {count === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="font-sans text-[13px]" style={{ color: SUBTLE }}>
            Your bag is empty.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 inline-flex w-full items-center justify-center rounded-[6px] border py-2.5 font-sans text-[13px] font-semibold transition-colors hover:bg-[#FDF9F2]"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <ul className="m-0 max-h-[min(50vh,280px)] list-none overflow-y-auto p-0">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`flex items-start gap-3 px-4 py-3.5 ${index > 0 ? "border-t border-[#EFEAE2]" : ""}`}
            >
              <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[5px] border border-[#E8E1D5] bg-[#F7F3EB]">
                <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="56px" />
              </div>
              <div className="min-w-0 flex-1 pr-1">
                <p className="font-sans text-[14px] font-semibold leading-snug" style={{ color: INK }}>
                  {item.title}
                </p>
                <p className="mt-0.5 font-sans text-[11.5px]" style={{ color: SUBTLE }}>
                  Quantity {item.quantity}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center text-[#8A8175] transition-colors hover:text-[#0A2D23]"
                  aria-label={`Edit ${item.title}`}
                >
                  <Pencil size={15} strokeWidth={1.75} />
                </Link>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="grid h-8 w-8 place-items-center text-[#8A8175] transition-colors hover:text-[#0A2D23]"
                  aria-label={`Remove ${item.title} from bag`}
                >
                  <Trash2 size={16} strokeWidth={1.75} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {count > 0 && (
        <div className="border-t border-[#EFEAE2] px-4 pb-4 pt-3">
          <div className="flex items-start gap-2 rounded-[8px] border border-[#E8DFD0] bg-[#FAF8F4] px-3 py-2.5">
            <Info size={16} className="mt-0.5 shrink-0 text-[#8A8175]" strokeWidth={1.75} aria-hidden />
            <p className="m-0 font-sans text-[11px] leading-[1.45]" style={{ color: MUTED }}>
              Final price calculated in checkout. Bullion prices can change until a time-limited quote is
              confirmed.
            </p>
          </div>
          <p className="mt-2.5 font-sans text-[10.5px] leading-snug" style={{ color: SUBTLE }}>
            Delivery eligibility is checked on the product page / checkout.
          </p>
          <Link
            href={BAG_PATH}
            onClick={onClose}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-[6px] bg-[#0B6B5C] py-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#095548]"
          >
            Review Bag
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="mt-2.5 flex w-full items-center justify-center rounded-[6px] border bg-white py-2.5 font-sans text-[13px] font-semibold transition-colors hover:bg-[#FDF9F2]"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            Continue shopping
          </button>
        </div>
      )}
    </div>
  );
}