"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, type ReactNode } from "react";

const TEAL = "#387C71";

const SUGGESTED_SEARCHES = [
  "1 g gold coin",
  "5 g gold coin",
  "Silver bars",
  "Rudraksh",
  "Gold bars",
  "Gemstone gifts",
] as const;

const MATCHING_CATEGORIES = [
  { label: "Gold Coins", href: "#gold-coins" },
  { label: "Gold Bars", href: "#gold-bars" },
  { label: "Gifting", href: "#gifting-collection" },
  { label: "Silver Coins", href: "#silver-coins" },
  { label: "Rudraksh", href: "#rudraksh-collection" },
] as const;

const PREVIEW_PRODUCTS = [
  {
    id: "coin",
    label: "Illustrative product",
    href: "#catalog",
    image: "/images/bilva/bestseller-gold-coin-clean.webp",
    alt: "Bilwa gold coin",
  },
  {
    id: "bar",
    label: "Illustrative product",
    href: "#catalog",
    image: "/images/bilva/bestseller-gold-bar.webp",
    alt: "Bilwa gold bar",
  },
] as const;

function matchQuery(query: string, text: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return text.toLowerCase().includes(q);
}

export type BilvaSearchOverlayProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onSubmit?: () => void;
};

export function BilvaSearchOverlay({
  query,
  onQueryChange,
  onClose,
  onSubmit,
}: BilvaSearchOverlayProps) {
  const trimmed = query.trim();
  const displayQuery = trimmed || "gold coin";

  const suggestions = useMemo(
    () => SUGGESTED_SEARCHES.filter((item) => matchQuery(query, item)),
    [query]
  );

  const categories = useMemo(
    () => MATCHING_CATEGORIES.filter((item) => matchQuery(query, item.label)),
    [query]
  );

  const showEmptyHints = trimmed.length === 0;
  const suggestionList =
    showEmptyHints ? SUGGESTED_SEARCHES : suggestions.length ? suggestions : SUGGESTED_SEARCHES;
  const categoryList =
    showEmptyHints ? MATCHING_CATEGORIES : categories.length ? categories : MATCHING_CATEGORIES;

  return (
    <div
      className="relative mx-auto w-full max-w-[880px] rounded-[6px] border border-[#E2DDD5] bg-white px-4 pb-3 pt-3 shadow-[0_12px_28px_rgba(0,0,0,0.07)] sm:px-5 sm:pb-3.5 sm:pt-3.5 animate-in fade-in slide-in-from-top-1 duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Search Bilwa"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full text-[#6B7C75] transition-colors hover:bg-[#F5F2EC] hover:text-[#0A2D23]"
        aria-label="Close search"
      >
        <X size={18} strokeWidth={1.75} />
      </button>

      <div className="flex flex-col gap-2 pr-9 sm:flex-row sm:items-center sm:gap-2.5 sm:pr-10">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[6px] border border-[#DDD5C7] bg-[#FDFCFA] px-3 py-2">
          <Search size={16} className="shrink-0 text-[#7A9188]" strokeWidth={1.75} aria-hidden />
          <input
            type="text"
            inputMode="search"
            enterKeyHint="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit?.();
            }}
            placeholder="Search gold coins, silver bars, rudraksh…"
            className="min-w-0 flex-1 bg-transparent font-serif text-[15px] font-medium text-[#0A2D23] caret-[#0A2D23] placeholder:font-normal placeholder:text-[#849B90] focus:outline-none"
            autoFocus
            autoComplete="off"
            aria-label="Search query"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="shrink-0 text-[#849B90] transition-colors hover:text-[#0A2D23]"
              aria-label="Clear search"
            >
              <X size={15} strokeWidth={2} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="shrink-0 rounded-[6px] bg-[#0B6B5C] px-5 py-2 font-sans text-[13px] font-medium text-white transition-colors hover:bg-[#095548]"
        >
          Search
        </button>
      </div>

      <div className="mt-3.5 flex flex-col gap-4 border-t border-[#EFEAE2] pt-3 lg:flex-row lg:gap-0">
        <SearchColumn title="Suggested searches">
          <ul className="space-y-1.5 text-[12.5px] text-[#333333]">
            {suggestionList.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => onQueryChange(item)}
                  className="text-left transition-colors hover:text-[#387C71] hover:underline"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </SearchColumn>

        <SearchColumn title="Matching categories" bordered className="lg:w-[26%]">
          <ul className="space-y-1.5 text-[12.5px] text-[#333333]">
            {categoryList.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="transition-colors hover:text-[#387C71] hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </SearchColumn>

        <SearchColumn title="Product preview" bordered className="lg:min-w-0 lg:flex-1">
          <div className="grid gap-3 sm:grid-cols-2">
            {PREVIEW_PRODUCTS.map((product) => (
              <div key={product.id} className="flex min-w-0 items-center gap-2.5">
                <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[5px] border border-[#E8E1D5] bg-[#F7F3EB]">
                  <Image src={product.image} alt={product.alt} fill className="object-cover" sizes="52px" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11.5px] text-[#555555]">{product.label}</p>
                  <Link
                    href={product.href}
                    onClick={onClose}
                    className="mt-0.5 inline-flex items-center gap-1 text-[11.5px] font-medium transition-colors hover:underline"
                    style={{ color: TEAL }}
                  >
                    View product details
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SearchColumn>
      </div>

      <div className="mt-3 border-t border-[#EFEAE2] pt-2.5 text-center">
        <Link
          href={`#catalog?q=${encodeURIComponent(displayQuery)}`}
          onClick={onClose}
          className="inline-flex items-center gap-1 font-sans text-[12px] font-semibold transition-opacity hover:opacity-85"
          style={{ color: TEAL }}
        >
          View all results for {displayQuery}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

function SearchColumn({
  title,
  children,
  bordered,
  className = "",
}: {
  title: string;
  children: ReactNode;
  bordered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`lg:w-[22%] lg:pr-3 ${bordered ? "lg:border-l lg:border-[#EFEAE2] lg:pl-4" : ""} ${className}`}
    >
      <h4 className="font-serif text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#387C71]">{title}</h4>
      <div className="mt-1 mb-2 h-px w-[min(100%,6rem)] bg-[#E8DFD0]" />
      {children}
    </div>
  );
}