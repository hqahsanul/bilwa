"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Loader2,
  MessageSquare,
  Search,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  DISCOVER_PRICE_BANDS,
  DISCOVER_WEIGHT_BANDS,
  SEARCH_DISCOVER_DATA,
  type DiscoverFilterGroup,
  type DiscoverProduct,
} from "@/data/bilva/search-discover";
import styles from "./bilva-search-discover-page.module.css";

type FilterKey = DiscoverFilterGroup["key"];
type SortKey = (typeof SEARCH_DISCOVER_DATA.sortOptions)[number]["value"];

function matchesFilter(
  product: DiscoverProduct,
  key: FilterKey,
  value: string
): boolean {
  switch (key) {
    case "metal":
      return value === "Gold";
    case "purity":
      return value === "24K (999)";
    case "weight": {
      const band = DISCOVER_WEIGHT_BANDS.find((w) => w.label === value);
      return band ? product.grams >= band.min && product.grams < band.max : true;
    }
    case "occasion":
      return product.occasions.includes(value);
    case "price": {
      const band = DISCOVER_PRICE_BANDS.find((b) => b.label === value);
      return band ? product.price >= band.min && product.price < band.max : true;
    }
  }
}

export function BilvaSearchDiscoverPage() {
  const {
    heading,
    defaultQuery,
    heroImageSrc,
    heroImageAlt,
    suggestionsLabel,
    suggestions,
    filters,
    sortOptions,
    products,
    scrollLabel,
    noMatchPrompt,
    clearFiltersLabel,
    askBilwaLabel,
    askBilwaHref,
    emptyMessage,
  } = SEARCH_DISCOVER_DATA;

  const headingId = useId();
  const fbarRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(defaultQuery);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<FilterKey, string[]>
  >({
    metal: [],
    purity: [],
    weight: [],
    occasion: [],
    price: [],
  });
  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [shownCount, setShownCount] = useState(8);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (fbarRef.current && !fbarRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openDropdown]);

  // Parse query including optional weight token like "1 g"
  const rawTrimmed = query.trim();
  const weightMatch = rawTrimmed.toLowerCase().match(/(\d+)\s*g\b/);
  const parsedWeight = weightMatch ? Number.parseInt(weightMatch[1], 10) : null;
  const tokens = rawTrimmed
    .toLowerCase()
    .replace(/(\d+)\s*g\b/, " ")
    .split(/\s+/)
    .filter(Boolean);

  const filteredProducts = products
    .filter((item) => {
      const haystack =
        `${item.motif} gold coin 24k 999 ${item.occasions.join(" ")}`.toLowerCase();
      if (!tokens.every((t) => haystack.includes(t))) return false;
      if (parsedWeight !== null && item.grams !== parsedWeight) return false;
      return filters.every((group) => {
        const chosen = selectedFilters[group.key];
        return (
          chosen.length === 0 ||
          chosen.some((val) => matchesFilter(item, group.key, val))
        );
      });
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "weight-asc") return a.grams - b.grams;
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, shownCount);
  const hasMore = shownCount < filteredProducts.length;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && shownCount < filteredProducts.length) {
          setShownCount((prev) => prev + 4);
        }
      },
      { rootMargin: "0px 0px 120px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shownCount, filteredProducts.length]);

  const toggleFilterOption = (key: FilterKey, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
    setShownCount(8);
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setSelectedFilters({
      metal: [],
      purity: [],
      weight: [],
      occasion: [],
      price: [],
    });
    setSortBy("featured");
    setQuery(defaultQuery);
    setShownCount(8);
    setOpenDropdown(null);
  };

  const activeSortLabel =
    sortOptions.find((s) => s.value === sortBy)?.label ?? "Sort by: Featured";

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Hero */}
        <section className={styles["hero"]} aria-label="Search">
          <div className={styles["heroImgWrap"]} aria-hidden="true">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              sizes="(max-width: 980px) 70vw, 52vw"
              className="object-cover"
            />
          </div>

          <h1 id={headingId} className={styles["heading"]}>
            {heading}
          </h1>

          <search>
            <form
              className={styles["searchBar"]}
              onSubmit={(e) => {
                e.preventDefault();
                setShownCount(8);
              }}
            >
              <Search size={19} strokeWidth={1.7} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShownCount(8);
                }}
                aria-label="Search products"
                autoComplete="off"
                className={styles["searchInput"]}
              />
              <button
                type="submit"
                aria-label="Search"
                className={styles["goBtn"]}
              >
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </form>
          </search>

          <div className={styles["suggRow"]}>
            <span>{suggestionsLabel}</span>
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(`gold coin ${item}`);
                  setShownCount(8);
                }}
                className={styles["suggBtn"]}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Filter bar */}
        <div ref={fbarRef} className={styles["fbar"]}>
          {filters.map((group) => {
            const count = selectedFilters[group.key].length;
            const isOpen = openDropdown === group.key;
            return (
              <div key={group.key} className={styles["dd"]}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenDropdown((prev) =>
                      prev === group.key ? null : group.key
                    )
                  }
                  className={`${styles["ddBtn"]} ${
                    count > 0 ? styles["ddBtnActive"] : ""
                  }`}
                >
                  <span>
                    {group.label}
                    {count > 0 ? ` (${count})` : ""}
                  </span>
                  <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
                </button>
                {isOpen ? (
                  <ul
                    role="listbox"
                    aria-multiselectable="true"
                    aria-label={group.label}
                    className={styles["ddList"]}
                  >
                    {group.options.map((option) => {
                      const selected =
                        selectedFilters[group.key].includes(option);
                      return (
                        <li
                          key={option}
                          role="option"
                          aria-selected={selected}
                          onClick={() =>
                            toggleFilterOption(group.key, option)
                          }
                          className={styles["ddOption"]}
                        >
                          <span
                            className={`${styles["checkBox"]} ${
                              selected ? styles["checkBoxSelected"] : ""
                            }`}
                            aria-hidden="true"
                          >
                            {selected ? <Check size={11} strokeWidth={2.6} /> : null}
                          </span>
                          <span>{option}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })}

          <span className={styles["fbarSep"]} aria-hidden="true" />

          {/* Sort dropdown */}
          <div className={styles["dd"]}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={openDropdown === "sort"}
              onClick={() =>
                setOpenDropdown((prev) => (prev === "sort" ? null : "sort"))
              }
              className={`${styles["ddBtn"]} ${styles["sortDdBtn"]}`}
            >
              <span>{activeSortLabel}</span>
              <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
            </button>
            {openDropdown === "sort" ? (
              <ul
                role="listbox"
                aria-label="Sort results"
                className={`${styles["ddList"]} ${styles["sortDdList"]}`}
              >
                {sortOptions.map((option) => {
                  const selected = sortBy === option.value;
                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setSortBy(option.value);
                        setOpenDropdown(null);
                      }}
                      className={`${styles["ddOption"]} ${
                        selected ? styles["ddOptionSelected"] : ""
                      }`}
                    >
                      <span>{option.label}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        {/* Result count */}
        <p className={styles["count"]}>
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "result" : "results"} for{" "}
          <em>{rawTrimmed || defaultQuery}</em>
        </p>

        {/* Product grid */}
        <div className={styles["grid"]}>
          {visibleProducts.length > 0 ? (
            visibleProducts.map((item) => {
              const isSaved = wishlistIds.includes(item.id);
              return (
                <article key={item.id} className={styles["card"]}>
                  <div className={styles["media"]}>
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => toggleWishlist(item.id)}
                      aria-pressed={isSaved}
                      aria-label={`Save ${item.motif} Gold Coin – ${item.grams} g to wishlist`}
                      className={`${styles["heartBtn"]} ${
                        isSaved ? styles["heartActive"] : ""
                      }`}
                    >
                      <Heart
                        size={16}
                        strokeWidth={1.7}
                        className={isSaved ? "fill-current" : ""}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className={styles["cardBody"]}>
                    <h3 className={styles["cardTitle"]}>
                      {item.motif} Gold Coin – {item.grams} g
                    </h3>
                    <p className={styles["cardMeta"]}>24K • 999 Purity</p>
                    <span className={styles["tag"]}>Indicative price</span>
                    <span className={styles["price"]}>
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </article>
              );
            })
          ) : (
            <p className={styles["empty"]}>{emptyMessage}</p>
          )}
        </div>

        {/* Scroll hint & no-match helper */}
        <div className={styles["footRow"]}>
          <div
            className={styles["scrollHint"]}
            style={{ visibility: hasMore ? "visible" : "hidden" }}
          >
            <Loader2
              size={18}
              strokeWidth={2.2}
              className={styles["spinIcon"]}
              aria-hidden="true"
            />
            <span>{scrollLabel}</span>
          </div>

          <div className={styles["noMatchBox"]}>
            <MessageSquare size={20} strokeWidth={1.6} aria-hidden="true" />
            <span>{noMatchPrompt}</span>
            <span className={styles["noMatchSep"]} aria-hidden="true" />
            <button
              type="button"
              onClick={handleClearAll}
              className={styles["clearBtn"]}
            >
              {clearFiltersLabel}
            </button>
            <span aria-hidden="true">/</span>
            <Link href={askBilwaHref} className={styles["askLink"]}>
              {askBilwaLabel}
            </Link>
          </div>
        </div>

        <div ref={sentinelRef} className={styles["sentinel"]} aria-hidden="true" />
      </div>
    </section>
  );
}
