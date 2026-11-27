"use client";

import Image from "next/image";
import Link from "next/link";
import { Info, X } from "lucide-react";
import {
  GOLD_COINS_AND_BARS_PATH,
  LAKSHMI_GOLD_COIN_PATH,
  LAKSHMI_SILVER_COIN_PATH,
  WISHLIST_PATH,
} from "@/lib/bilva-collection-routes";

const LINK_TEAL = "#0B6B5C";
const INK = "#0A2D23";
const MUTED = "#5C6B66";
const SUBTLE = "#666666";

export type WishlistItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  alt: string;
};

export const MOCK_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: "gold-coin-1g",
    title: "Gold Coin · 1 g",
    subtitle: "Illustrative item",
    href: LAKSHMI_GOLD_COIN_PATH,
    image: "/images/bilva/bestseller-gold-coin-clean.webp",
    alt: "Gold coin 1 g",
  },
  {
    id: "silver-coin-1g",
    title: "Silver Coin · 1 g",
    subtitle: "Illustrative item",
    href: LAKSHMI_SILVER_COIN_PATH,
    image: "/images/bilva/bestseller-silver-coin-clean.webp",
    alt: "Silver coin 1 g",
  },
];

type BilvaWishlistQuickViewProps = {
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onClose: () => void;
  className?: string;
};

export function BilvaWishlistQuickView({
  items,
  onRemove,
  onClose,
  className = "",
}: BilvaWishlistQuickViewProps) {
  const count = items.length;
  const countLabel = count === 1 ? "1 item" : `${count} items`;

  return (
    <div
      className={`relative w-[min(100vw-2rem,380px)] rounded-[8px] border border-[#E2DDD5] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-top-1 duration-150 ${className}`}
      role="dialog"
      aria-label="Wishlist quick view"
    >
      <div
        className="pointer-events-none absolute -top-[7px] right-5 h-3.5 w-3.5 rotate-45 border-l border-t border-[#E2DDD5] bg-white"
        aria-hidden
      />

      <div className="border-b border-[#EFEAE2] px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3 pr-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span
              className="font-sans text-[12.5px] font-bold uppercase tracking-[0.06em]"
              style={{ color: INK }}
            >
              Wishlist quick view
            </span>
            {count > 0 && (
              <span
                className="rounded-full bg-[#E4EFEA] px-2.5 py-0.5 font-sans text-[11px] font-semibold"
                style={{ color: LINK_TEAL }}
              >
                {countLabel}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#7A8480] transition-colors hover:bg-[#F5F2EC] hover:text-[#0A2D23]"
            aria-label="Close wishlist"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {count === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="font-sans text-[13px]" style={{ color: SUBTLE }}>
            Your wishlist is empty.
          </p>
          <Link
            href={GOLD_COINS_AND_BARS_PATH}
            onClick={onClose}
            className="mt-3 inline-block font-sans text-[12.5px] font-medium underline underline-offset-2 decoration-[#0B6B5C]/55"
            style={{ color: LINK_TEAL }}
          >
            Continue exploring
          </Link>
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
                  {item.subtitle}
                </p>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="mt-1 inline-flex items-center gap-1 font-sans text-[12px] font-medium underline underline-offset-2 decoration-[#0B6B5C]/55 hover:opacity-90"
                  style={{ color: LINK_TEAL }}
                >
                  View details
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="grid h-8 w-8 shrink-0 place-items-center text-[#8A8175] transition-colors hover:text-[#0A2D23]"
                aria-label={`Remove ${item.title} from wishlist`}
              >
                <X size={17} strokeWidth={1.75} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {count > 0 && (
        <div className="border-t border-[#EFEAE2] px-4 pb-4 pt-3">
          <div className="flex items-start gap-2 rounded-[8px] border border-[#E8DFD0] bg-[#FAF8F4] px-3 py-2.5">
            <Info size={16} className="mt-0.5 shrink-0 text-[#8A8175]" strokeWidth={1.75} aria-hidden />
            <p className="m-0 font-sans text-[11px] leading-[1.4]" style={{ color: MUTED }}>
              Prices and availability are confirmed on product pages.
            </p>
          </div>
          <Link
            href={WISHLIST_PATH}
            onClick={onClose}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-[6px] bg-[#0B6B5C] py-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#095548]"
          >
            View Wishlist
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full text-center font-sans text-[12.5px] font-medium underline underline-offset-2 decoration-[#0B6B5C]/55"
            style={{ color: LINK_TEAL }}
          >
            Continue exploring
          </button>
        </div>
      )}
    </div>
  );
}