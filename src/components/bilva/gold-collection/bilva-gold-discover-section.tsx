"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, ChevronRight, Heart, X, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { GOLD_COLLECTION_PRODUCTS } from "./gold-collection-products";

// =============================================================================
// TYPES & DATA STRUCTURES FOR ALL 5 COLLECTION FILTERS
// =============================================================================

export type CollectionCategoryKey =
  | "coins-bars"
  | "silver-coins-bars"
  | "gemstones"
  | "rudraksh"
  | "corporate-gifting"
  | "premium-gifting";

interface FilterOptionConfig {
  label: string;
  color?: string; // For colour swatches in gemstones
}

interface FilterGroupConfig {
  id: string;
  label: string;
  type?: "checkbox" | "radio" | "color";
  options: FilterOptionConfig[];
  note?: string; // e.g. "Bulk pricing and customisation confirmed by quotation."
}

interface CollectionPreset {
  key: CollectionCategoryKey;
  tabLabel: string;
  title: string;
  subtitle: string;
  totalPieces: number;
  initialChips: string[];
  filters: FilterGroupConfig[];
}

const COLLECTION_PRESETS: Record<CollectionCategoryKey, CollectionPreset> = {
  "coins-bars": {
    key: "coins-bars",
    tabLabel: "Coins & Bars",
    title: "Discover the collection",
    subtitle: "Find your piece by weight, purity and design.",
    totalPieces: 48,
    initialChips: ["24K gold", "1–10 g"],
    filters: [
      {
        id: "weight",
        label: "Weight",
        type: "checkbox",
        options: [
          { label: "Under 10 g" },
          { label: "10–50 g" },
          { label: "50–100 g" },
          { label: "100 g & above" },
        ],
      },
      {
        id: "purity",
        label: "Purity",
        type: "checkbox",
        options: [
          { label: "24K (999)" },
          { label: "999 silver" },
          { label: "22K (916)" },
        ],
      },
      {
        id: "price",
        label: "Price range",
        type: "checkbox",
        options: [
          { label: "Under ₹10,000" },
          { label: "₹10,000–₹25,000" },
          { label: "₹25,000–₹50,000" },
          { label: "₹50,000 & above" },
        ],
      },
      {
        id: "format",
        label: "Format",
        type: "checkbox",
        options: [
          { label: "Coins" },
          { label: "Bars" },
          { label: "Gift Sets" },
        ],
      },
      {
        id: "design",
        label: "Design",
        type: "checkbox",
        options: [
          { label: "Bilva Leaf" },
          { label: "Lotus" },
          { label: "Peacock" },
          { label: "Tree of Life" },
          { label: "Lakshmi / Ganesha" },
        ],
      },
      {
        id: "availability",
        label: "Availability",
        type: "checkbox",
        options: [
          { label: "In stock" },
          { label: "Ready to ship" },
          { label: "Made to order" },
        ],
      },
    ],
  },
  "silver-coins-bars": {
    key: "silver-coins-bars",
    tabLabel: "Silver coins & bars",
    title: "Discover the collection",
    subtitle: "Choose by weight, purity and design.",
    totalPieces: 48,
    initialChips: ["999 silver", "10–50 g"],
    filters: [
      {
        id: "weight",
        label: "Weight",
        type: "checkbox",
        options: [
          { label: "Under 10 g" },
          { label: "10–50 g" },
          { label: "50–100 g" },
          { label: "100 g & above" },
        ],
      },
      {
        id: "purity",
        label: "Purity",
        type: "checkbox",
        options: [{ label: "999 fine silver" }],
      },
      {
        id: "price",
        label: "Price range",
        type: "checkbox",
        options: [
          { label: "Under ₹3,000" },
          { label: "₹3,000–₹10,000" },
          { label: "₹10,000–₹25,000" },
          { label: "₹25,000 & above" },
        ],
      },
      {
        id: "format",
        label: "Format",
        type: "checkbox",
        options: [
          { label: "Coins" },
          { label: "Bars" },
          { label: "Gift Sets" },
        ],
      },
      {
        id: "design",
        label: "Design",
        type: "checkbox",
        options: [
          { label: "Bilva Leaf" },
          { label: "Lotus" },
          { label: "Flower motif" },
          { label: "Heritage" },
        ],
      },
      {
        id: "availability",
        label: "Availability",
        type: "checkbox",
        options: [
          { label: "In stock" },
          { label: "Ready to ship" },
          { label: "Made to order" },
        ],
      },
    ],
  },
  gemstones: {
    key: "gemstones",
    tabLabel: "Gemstones",
    title: "Discover the collection",
    subtitle: "Find stones by hue, form and character.",
    totalPieces: 48,
    initialChips: ["Green", "Oval"],
    filters: [
      {
        id: "colour",
        label: "Colour",
        type: "color",
        options: [
          { label: "Green", color: "#0F6B48" },
          { label: "Blue", color: "#1D68B3" },
          { label: "Pink & red", color: "#C24864" },
          { label: "Purple", color: "#7E5B9B" },
          { label: "Warm tones", color: "#D49D42" },
        ],
      },
      {
        id: "stone-type",
        label: "Stone type",
        type: "checkbox",
        options: [
          { label: "Emerald" },
          { label: "Blue Sapphire" },
          { label: "Ruby" },
          { label: "Yellow Sapphire" },
          { label: "Cat's Eye" },
          { label: "Hessonite" },
        ],
      },
      {
        id: "shape",
        label: "Shape",
        type: "checkbox",
        options: [
          { label: "Oval" },
          { label: "Cushion" },
          { label: "Round" },
          { label: "Octagon" },
          { label: "Pear" },
        ],
      },
      {
        id: "carat",
        label: "Carat weight",
        type: "checkbox",
        options: [
          { label: "Under 2 ct" },
          { label: "2–4 ct" },
          { label: "4–7 ct" },
          { label: "7 ct & above" },
        ],
      },
      {
        id: "price",
        label: "Price range",
        type: "checkbox",
        options: [
          { label: "Under ₹25,000" },
          { label: "₹25,000–₹50,000" },
          { label: "₹50,000–₹1,00,000" },
          { label: "₹1,00,000 & above" },
        ],
      },
      {
        id: "availability",
        label: "Availability",
        type: "checkbox",
        options: [
          { label: "In stock" },
          { label: "Certified Vedic" },
          { label: "Rare single-origin" },
        ],
      },
    ],
  },
  rudraksh: {
    key: "rudraksh",
    tabLabel: "Rudraksh",
    title: "Discover the collection",
    subtitle: "Find a piece by mukhi, form and size.",
    totalPieces: 48,
    initialChips: ["5 Mukhi", "Mala"],
    filters: [
      {
        id: "mukhi",
        label: "Mukhi",
        type: "checkbox",
        options: [
          { label: "1–4 Mukhi" },
          { label: "5 Mukhi" },
          { label: "6–9 Mukhi" },
          { label: "10+ Mukhi" },
        ],
      },
      {
        id: "form",
        label: "Form",
        type: "checkbox",
        options: [
          { label: "Mala" },
          { label: "Bracelet" },
          { label: "Single Bead Pendant" },
          { label: "Collector Bead" },
        ],
      },
      {
        id: "bead-size",
        label: "Bead size",
        type: "checkbox",
        options: [
          { label: "Small (6–8 mm)" },
          { label: "Medium (10–14 mm)" },
          { label: "Large (16–20 mm)" },
          { label: "Collector (22+ mm)" },
        ],
      },
      {
        id: "price",
        label: "Price range",
        type: "checkbox",
        options: [
          { label: "Under ₹3,000" },
          { label: "₹3,000–₹10,000" },
          { label: "₹10,000–₹25,000" },
          { label: "₹25,000 & above" },
        ],
      },
      {
        id: "availability",
        label: "Availability",
        type: "checkbox",
        options: [
          { label: "In stock" },
          { label: "Certified origin" },
          { label: "Nepali natural" },
        ],
      },
    ],
  },
  "corporate-gifting": {
    key: "corporate-gifting",
    tabLabel: "Corporate Gifting",
    title: "Discover the collection",
    subtitle: "Explore gifting options for teams, clients and milestones.",
    totalPieces: 48,
    initialChips: ["Client gifting", "50–100 units"],
    filters: [
      {
        id: "occasion",
        label: "Occasion",
        type: "checkbox",
        options: [
          { label: "Client gifting" },
          { label: "Annual milestones" },
          { label: "Festive & Diwali" },
          { label: "Executive rewards" },
        ],
      },
      {
        id: "product-type",
        label: "Product type",
        type: "checkbox",
        options: [
          { label: "Gold keepsake coins" },
          { label: "Silver bars" },
          { label: "Custom minted coins" },
          { label: "Luxury box sets" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "checkbox",
        note: "Bulk pricing and customisation confirmed by quotation.",
        options: [
          { label: "Under 25" },
          { label: "25–49" },
          { label: "50–100" },
          { label: "101–250" },
          { label: "250+ / Enquire" },
        ],
      },
      {
        id: "budget-gift",
        label: "Budget per gift",
        type: "checkbox",
        options: [
          { label: "Under ₹2,500" },
          { label: "₹2,500–₹5,000" },
          { label: "₹5,000–₹15,000" },
          { label: "₹15,000+" },
        ],
      },
      {
        id: "presentation",
        label: "Presentation",
        type: "checkbox",
        options: [
          { label: "Velvet showcase box" },
          { label: "Hardbound luxury case" },
          { label: "Eco-suede pouch" },
          { label: "Custom brand card" },
        ],
      },
      {
        id: "availability",
        label: "Availability",
        type: "checkbox",
        options: [
          { label: "In stock" },
          { label: "Custom engraving ready" },
          { label: "Express corporate delivery" },
        ],
      },
    ],
  },
  "premium-gifting": {
    key: "premium-gifting",
    tabLabel: "Premium Gifting",
    title: "Discover the collection",
    subtitle: "Choose by occasion, recipient and budget.",
    totalPieces: 48,
    initialChips: ["Wedding", "Under ₹10,000"],
    filters: [
      {
        id: "occasion",
        label: "Occasion",
        type: "checkbox",
        options: [
          { label: "Wedding" },
          { label: "Housewarming" },
          { label: "Anniversary" },
          { label: "New beginning" },
          { label: "Festive" },
        ],
      },
      {
        id: "recipient",
        label: "Recipient",
        type: "checkbox",
        options: [
          { label: "Family" },
          { label: "Couple" },
          { label: "Parents" },
          { label: "Close Friends" },
          { label: "Self" },
        ],
      },
      {
        id: "budget",
        label: "Budget",
        type: "radio", // Radio group matching Image 5
        options: [
          { label: "Under ₹5,000" },
          { label: "₹5,000–₹10,000" },
          { label: "₹10,000–₹25,000" },
          { label: "₹25,000 & above" },
        ],
      },
      {
        id: "metal-type",
        label: "Metal / type",
        type: "checkbox",
        options: [
          { label: "Pure 24K Gold" },
          { label: "999 Fine Silver" },
          { label: "Vedic Gemstone" },
          { label: "Rudraksh in Gold" },
        ],
      },
      {
        id: "availability",
        label: "Availability",
        type: "checkbox",
        options: [
          { label: "Ready for gifting" },
          { label: "Gift-boxed in stock" },
          { label: "Personalised card ready" },
        ],
      },
    ],
  },
};

const SORT_OPTIONS = [
  "Sort by: Featured",
  "Price: low to high",
  "Price: high to low",
  "Weight: low to high",
  "Purity: 24K first",
] as const;

/** Filter bar — Lora humanist serif spec (#1F3D2E, cream/peach boxes) */
const FILTER_FONT = "font-['Lora','Source Serif 4',Georgia,serif]";

const BILWA_FILTER_BOX = cn(
  FILTER_FONT,
  "min-h-[2.35rem] shrink-0 border border-[#D9A15F] bg-[#FDF8F3] text-[#1F3D2E]",
  "rounded-[11px] px-3.5 py-1.5 text-[13.5px] font-medium leading-snug tracking-normal shadow-none",
  "transition-[border-color]",
  "hover:border-[#C4A05C]",
  "focus-visible:outline-none",
);

const BILWA_FILTER_BOX_OPEN = "border-[#B8954A]";

const BILWA_FILTER_PANEL = cn(
  "absolute left-0 top-[calc(100%+6px)] z-50",
  "w-[17.5rem] max-w-[calc(100vw-2rem)] min-w-[12.5rem] shrink-0",
  "rounded-[11px] border border-[#E8C9A8] bg-[#FDF8F3] p-4",
  "shadow-[0_4px_14px_rgba(31,61,46,0.08)]",
  "animate-in fade-in zoom-in-95 duration-150",
);

const BILWA_FILTER_OPTION = cn(
  FILTER_FONT,
  "flex cursor-pointer select-none items-start gap-2.5 py-0.5",
  "text-[13.5px] font-normal leading-snug tracking-normal text-[#1F3D2E]",
);

const BILWA_FILTER_CHIP = cn(
  FILTER_FONT,
  "inline-flex h-[2.5rem] items-center gap-2 rounded-full border-0",
  "bg-[#E1ECE6] px-3.5 text-[13px] font-normal text-[#1F3D2E]",
  "transition-colors hover:bg-[#D5E3DC] cursor-pointer",
);

/** Product card copy — matches bilwa-gold-collection.html .card h3 / .m / .pr */
const PRODUCT_CARD_TITLE = cn(
  "font-['Newsreader',Georgia,serif] text-[17px] font-semibold leading-[1.25] text-[#0F4035]",
);
const PRODUCT_CARD_META = cn(
  "mt-[0.2rem] font-sans text-[12px] font-normal leading-[1.4] text-[#6A736F]",
);
const PRODUCT_CARD_PRICE = cn(
  "mt-[0.15rem] font-['Newsreader',Georgia,serif] text-[20px] font-bold leading-[1.2] text-[#1A2723] tabular-nums",
);

function sortTriggerParts(sortLabel: string) {
  const marker = "Sort by: ";
  if (sortLabel.startsWith(marker)) {
    return { lead: marker, value: sortLabel.slice(marker.length) };
  }
  return { lead: "Sort by: ", value: sortLabel };
}

// Spinner component for infinite scroll preview
const LOAD_SPINNER_DASHES = Array.from({ length: 12 }, (_, i) => ({
  opacity: 0.15 + 0.85 * (i / 11),
  rotate: i * 30,
}));

function GoldCollectionLoadSpinner() {
  return (
    <svg
      className="mx-auto h-10 w-10 animate-spin motion-reduce:animate-none sm:h-[3.25rem] sm:w-[3.25rem] [animation-duration:1.3s]"
      viewBox="0 0 40 40"
      aria-hidden
    >
      {LOAD_SPINNER_DASHES.map((dash, i) => (
        <line
          key={i}
          x1="20"
          y1="3"
          x2="20"
          y2="9"
          stroke="#5D8F80"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity={dash.opacity}
          transform={`rotate(${dash.rotate} 20 20)`}
        />
      ))}
    </svg>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function BilvaMetalDiscoverSection({
  presetKey = "coins-bars",
  products = GOLD_COLLECTION_PRODUCTS,
}: {
  presetKey?: CollectionCategoryKey;
  products?: typeof GOLD_COLLECTION_PRODUCTS;
}) {
  const currentPreset = COLLECTION_PRESETS[presetKey];
  const isSilverCatalogue = presetKey === "silver-coins-bars";

  // Active open dropdown filter ID
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>(SORT_OPTIONS[0]);

  // Selected values per filter ID: Record<filterId, string[]>
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Active filter chips (pill tags below the bar)
  const [activeChips, setActiveChips] = useState<string[]>(currentPreset.initialChips);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Container ref for click-outside dismissal
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterBarRef.current && !filterBarRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle option selection
  const handleToggleOption = (filterId: string, optionLabel: string, isRadio?: boolean) => {
    setSelectedFilters((prev) => {
      const current = prev[filterId] || [];
      if (isRadio) {
        return { ...prev, [filterId]: [optionLabel] };
      }
      if (current.includes(optionLabel)) {
        return { ...prev, [filterId]: current.filter((item) => item !== optionLabel) };
      }
      return { ...prev, [filterId]: [...current, optionLabel] };
    });
  };

  // Apply filters from dropdown
  const handleApplyFilters = (filterId: string) => {
    const selected = selectedFilters[filterId] || [];
    // Synchronize active chips with selected values
    setActiveChips((prev) => {
      // Remove previous chips that belong to this filter group
      const otherGroupChips = prev.filter(
        (chip) => !currentPreset.filters.find((f) => f.id === filterId)?.options.some((o) => o.label === chip)
      );
      return [...otherGroupChips, ...selected];
    });
    setOpenDropdownId(null);
  };

  // Reset filter within dropdown
  const handleResetFilter = (filterId: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterId]: [] }));
    setActiveChips((prev) =>
      prev.filter(
        (chip) => !currentPreset.filters.find((f) => f.id === filterId)?.options.some((o) => o.label === chip)
      )
    );
  };

  // Remove single chip
  const handleRemoveChip = (chipToRemove: string) => {
    setActiveChips((prev) => prev.filter((c) => c !== chipToRemove));
    // Also remove from selectedFilters state
    setSelectedFilters((prev) => {
      const updated: Record<string, string[]> = {};
      Object.keys(prev).forEach((key) => {
        updated[key] = prev[key].filter((val) => val !== chipToRemove);
      });
      return updated;
    });
  };

  // Clear all filters
  const handleClearAll = () => {
    setActiveChips([]);
    setSelectedFilters({});
    setOpenDropdownId(null);
    setCurrentSort(SORT_OPTIONS[0]);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="collection"
      className={cn(
        "mt-8 bg-[#F8F4F1] pt-8 sm:mt-10 select-none",
        isSilverCatalogue ? "pb-3 sm:pb-4" : "pb-12",
      )}
    >
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* ================================================================= */}
        {/* HEADER: Title, Subtitle, and Showing Counter                      */}
        {/* ================================================================= */}
        <div className="flex w-full flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="min-w-0">
            <h2 className="font-serif text-[clamp(1.5rem,2.2vw,1.875rem)] font-semibold leading-[1.12] text-[#0F4035]">
              {currentPreset.title}
            </h2>
            <p className="mt-1 font-sans text-[13.5px] leading-snug text-[#4A5D55] sm:text-[14px]">
              {currentPreset.subtitle}
            </p>
          </div>
          <p className="shrink-0 pb-0.5 font-sans text-[13px] text-[#3D6B86] sm:text-[13.5px]">
            Showing 12 of {currentPreset.totalPieces} pieces
          </p>
        </div>

        {/* ================================================================= */}
        {/* FILTER BAR CONTAINER (#E7EEE5 Soft Sage Green)                    */}
        {/* ================================================================= */}
        <div
          ref={filterBarRef}
          className="relative mt-7 w-full overflow-visible rounded-[8px] bg-[#E8EFE6] px-3 py-3 sm:px-4 lg:min-h-[4.3rem] lg:py-2 lg:pl-3 lg:pr-3"
          role="group"
          aria-label="Collection filters"
        >
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5 lg:gap-3">
            {/* Left Filter Pill Buttons */}
            <div className="flex flex-1 min-w-0 flex-wrap items-center gap-2 overflow-visible lg:flex-nowrap lg:gap-2.5">
              {currentPreset.filters.map((filter) => {
                const isOpen = openDropdownId === filter.id;
                const panelAlignEnd = filter.id === currentPreset.filters.at(-1)?.id;

                return (
                  <div key={filter.id} className="relative min-w-[5.25rem] lg:min-w-0 lg:flex-1">
                    {/* Trigger Pill Button */}
                    <button
                      type="button"
                      onClick={() => setOpenDropdownId(isOpen ? null : filter.id)}
                      aria-expanded={isOpen}
                      className={cn(
                        BILWA_FILTER_BOX,
                        "flex w-full min-w-0 items-center justify-between gap-2 cursor-pointer select-none",
                        isOpen && BILWA_FILTER_BOX_OPEN,
                      )}
                    >
                      <span className="truncate normal-case">{filter.label}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 shrink-0 text-[#1F3D2E]/70" strokeWidth={2} />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#1F3D2E]/70" strokeWidth={2} />
                      )}
                    </button>

                    {/* ======================================================= */}
                    {/* CUSTOM DROPDOWN FLYOUT POPOVER PANEL                    */}
                    {/* ======================================================= */}
                    {isOpen && (
                      <div
                        className={cn(
                          BILWA_FILTER_PANEL,
                          panelAlignEnd && "left-auto right-0",
                        )}
                      >
                        <div className={cn(FILTER_FONT, "mb-2.5 text-[14px] font-medium text-[#1F3D2E]")}>
                          {filter.label}
                        </div>

                        <div className="mb-4 max-h-[260px] space-y-3 overflow-y-auto pr-2 [scrollbar-gutter:stable]">
                          {filter.options.map((option) => {
                            const isChecked = selectedFilters[filter.id]?.includes(option.label);
                            const isRadio = filter.type === "radio";

                            return (
                              <label
                                key={option.label}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleToggleOption(filter.id, option.label, isRadio);
                                }}
                                className={cn(BILWA_FILTER_OPTION, "group")}
                              >
                                {isRadio ? (
                                  <span
                                    className={cn(
                                      "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border bg-white transition-colors",
                                      isChecked
                                        ? "border-[#1F3D2E]"
                                        : "border-[#E8C9A8] group-hover:border-[#D9A15F]",
                                    )}
                                  >
                                    {isChecked && <span className="h-2 w-2 rounded-full bg-[#1F3D2E]" />}
                                  </span>
                                ) : (
                                  <span
                                    className={cn(
                                      "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border bg-white transition-colors",
                                      isChecked
                                        ? "border-[#1F3D2E] bg-[#1F3D2E] text-white"
                                        : "border-[#E8C9A8] group-hover:border-[#D9A15F]",
                                    )}
                                  >
                                    {isChecked && <Check size={13} strokeWidth={3} className="text-white" />}
                                  </span>
                                )}

                                {/* Color Swatch Dot if present (Gemstones Colour) */}
                                {option.color && (
                                  <span
                                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                                    style={{ backgroundColor: option.color }}
                                  />
                                )}

                                <span className="min-w-0 flex-1 leading-snug [overflow-wrap:anywhere]">
                                  {option.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Special Note if applicable (e.g. Corporate Gifting quotation note) */}
                        {filter.note && (
                          <p
                            className={cn(
                              FILTER_FONT,
                              "mb-3 mt-2 text-[13px] font-normal italic leading-tight text-[#1F3D2E]/75",
                            )}
                          >
                            {filter.note}
                          </p>
                        )}

                        {/* Action Buttons: [ Apply filters ] and [ Reset ] */}
                        <div className="flex min-w-0 items-stretch gap-2 border-t border-[#E8C9A8]/80 pt-3">
                          <button
                            type="button"
                            onClick={() => handleApplyFilters(filter.id)}
                            className={cn(
                              FILTER_FONT,
                              "min-w-0 flex-1 cursor-pointer whitespace-nowrap rounded-[11px] bg-[#1F3D2E] px-3 py-2 text-center text-[13.5px] font-medium text-white shadow-none transition-colors hover:bg-[#173528] active:scale-[0.98]",
                            )}
                          >
                            Apply filters
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResetFilter(filter.id)}
                            className={cn(
                              FILTER_FONT,
                              "shrink-0 cursor-pointer whitespace-nowrap rounded-[11px] border border-[#1F3D2E] bg-[#FDF8F3] px-3.5 py-2 text-center text-[13.5px] font-medium text-[#1F3D2E] shadow-none transition-colors hover:bg-[#F7F0E8] active:scale-[0.98]",
                            )}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side: Clear Filters & Sort by: Featured */}
            <div className="flex shrink-0 items-center gap-3 border-t border-[#C5D5C3]/60 pt-2 sm:gap-4 lg:border-l lg:border-t-0 lg:border-[#BCCDBC] lg:pl-3 lg:pt-0">
              <button
                type="button"
                onClick={handleClearAll}
                className={cn(
                  FILTER_FONT,
                  "shrink-0 cursor-pointer text-[13.5px] font-normal text-[#1F3D2E] underline underline-offset-2 hover:opacity-85",
                )}
              >
                Clear filters
              </button>

              <span className="hidden h-[2.4rem] w-px shrink-0 bg-[#BCCDBC] lg:block" aria-hidden />

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={cn(
                    BILWA_FILTER_BOX,
                    "flex min-w-[14rem] items-center justify-between gap-2.5",
                    isSortOpen && BILWA_FILTER_BOX_OPEN,
                  )}
                >
                  <span className="min-w-0 truncate text-left normal-case">
                    <span className="font-normal">{sortTriggerParts(currentSort).lead}</span>
                    <span className="font-medium">{sortTriggerParts(currentSort).value}</span>
                  </span>
                  {isSortOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-[#1F3D2E]/70" strokeWidth={2} />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-[#1F3D2E]/70" strokeWidth={2} />
                  )}
                </button>

                {isSortOpen && (
                  <div className={cn(BILWA_FILTER_PANEL, "right-0 left-auto w-[14rem]")}>
                    <div className="space-y-1">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setCurrentSort(opt);
                            setIsSortOpen(false);
                          }}
                          className={cn(
                            FILTER_FONT,
                            "w-full cursor-pointer rounded-[8px] px-2 py-2 text-left text-[13.5px] font-normal text-[#1F3D2E] transition-colors",
                            currentSort === opt
                              ? "bg-[#EDE4D8] font-medium"
                              : "hover:bg-[#F7F0E8]",
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* ACTIVE FILTER CHIPS & RIGHT CATALOGUE FOOTNOTE                    */}
        {/* ================================================================= */}
        <div className="mt-3.5 flex w-full flex-wrap items-center justify-between gap-y-2">
          {activeChips.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleRemoveChip(chip)}
                  className={BILWA_FILTER_CHIP}
                >
                  <span>{chip}</span>
                  <X size={13} strokeWidth={2.5} className="text-[#1F3D2E]/70" aria-hidden />
                </button>
              ))}
            </div>
          ) : (
            <div />
          )}

          {/* Right Footnote: Illustrative catalogue filters */}
          <p className="font-serif italic text-[13px] text-[#5A7369] ml-auto">
            Illustrative catalogue filters
          </p>
        </div>

        {/* ================================================================= */}
        {/* PRODUCT GRID                                                      */}
        {/* ================================================================= */}
        <div className="mt-6 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {products.map((product) => {
            const saved = !!wishlist[product.id];
            return (
              <article
                key={product.id}
                className="flex aspect-square flex-col overflow-hidden rounded-[8px] border border-[#E6CD95] bg-[#FDF7EE] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  />
                  {product.badge ? (
                    <span className="absolute left-2.5 top-2.5 rounded-[4px] bg-[#F5EFE4]/95 px-2 py-0.5 font-serif text-[11px] italic text-[#0A2D23] shadow-sm">
                      {product.badge}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-pressed={saved}
                    aria-label={`${saved ? "Remove from" : "Add to"} wishlist: ${product.title}`}
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/70 backdrop-blur-xs transition-colors hover:bg-white"
                  >
                    <Heart
                      size={16}
                      className={saved ? "fill-[#E0586E] text-[#E0586E]" : "text-[#0A2D23]"}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>
                <div className="shrink-0 px-3.5 pb-3 pt-2.5 sm:px-4">
                  <h3 className={cn(PRODUCT_CARD_TITLE, "line-clamp-2")}>{product.title}</h3>
                  <p className={PRODUCT_CARD_META}>{product.subtitle}</p>
                  <p className={PRODUCT_CARD_PRICE}>{product.price}</p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-3 px-3.5 pb-3.5 sm:px-4">
                  <Button asChild variant="bilwaBag" size="bilwaProduct" className="flex-1 sm:flex-none">
                    <Link href="/bag">Add to bag</Link>
                  </Button>
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-1 font-sans text-[13px] font-medium text-[#0B6B5C] hover:underline"
                  >
                    View details
                    <ChevronRight className="h-[1.15rem] w-[1.15rem] shrink-0" strokeWidth={2} aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Catalog Disclaimers and Infinite Scroll Section */}
        <p className="mt-6 flex w-full items-center justify-center gap-3 font-serif text-[13px] italic text-[#4A4F86] sm:text-[14.5px]">
          <span className="hidden h-px max-w-[18rem] flex-1 bg-[#DCC79C] sm:block" aria-hidden />
          Illustrative products and prices — final catalogue pending.
          <span className="hidden h-px max-w-[18rem] flex-1 bg-[#DCC79C] sm:block" aria-hidden />
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-2 text-center sm:mt-12">
          <h2 className="px-2 font-['Newsreader',Georgia,serif] text-[clamp(1.35rem,2vw,1.7rem)] font-semibold leading-tight text-[#0A2D23]">
            Scroll to discover more pieces
          </h2>
          <div
            className="mx-auto h-[1.45rem] w-full max-w-[min(90%,64.4rem)] overflow-hidden rounded-2xl border border-[#E6D4BB] bg-[#F1E3D3]"
            role="progressbar"
            aria-valuenow={12}
            aria-valuemin={0}
            aria-valuemax={48}
            aria-label="Pieces loaded"
          >
            <div className="h-full w-1/4 rounded-2xl bg-gradient-to-r from-[#0B6B5C] to-[#085648]" />
          </div>
          <p className="px-2 font-sans text-[13px] font-normal leading-snug text-[#4A4F86] sm:text-[13.5px]">
            12 of 48 pieces loaded • More items appear as you scroll
          </p>
          <GoldCollectionLoadSpinner />
          <p className="px-2 font-serif text-[13px] italic leading-snug text-[#4A4F86] sm:text-[13.5px]">
            Keep scrolling — we&apos;re loading more Bilwa pieces for you.
          </p>
        </div>
      </div>
    </section>
  );
}

export function BilvaGoldDiscoverSection() {
  return <BilvaMetalDiscoverSection />;
}
