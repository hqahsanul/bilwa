"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Coins,
  FileText,
  Gift,
  Heart,
  Landmark,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { SEARCH_RESULTS_DATA } from "@/data/bilva/search-results";
import styles from "./bilva-search-results-page.module.css";

function CategoryIcon({ id }: { id: string }) {
  const className = "shrink-0 text-[#b98a3e]";
  switch (id) {
    case "gifting":
      return <Gift size={16} strokeWidth={1.7} className={className} aria-hidden="true" />;
    default:
      return <Coins size={16} strokeWidth={1.7} className={className} aria-hidden="true" />;
  }
}

function AssuranceIcon({ id }: { id: string }) {
  const className = "shrink-0 text-[#b98a3e]";
  switch (id) {
    case "heritage":
      return <Landmark size={30} strokeWidth={1.3} className={className} aria-hidden="true" />;
    case "docs":
      return <FileText size={30} strokeWidth={1.3} className={className} aria-hidden="true" />;
    default:
      return <ShieldCheck size={30} strokeWidth={1.3} className={className} aria-hidden="true" />;
  }
}

export function BilvaSearchResultsPage() {
  const {
    heading,
    lead,
    defaultQuery,
    didYouMeanLabel,
    didYouMeanQuery,
    relatedLabel,
    categories,
    products,
    priceBands,
    defaultChips,
    sortOptions,
    helpCta,
    assurances,
  } = SEARCH_RESULTS_DATA;

  const headingId = useId();
  const sortListId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sortWrapRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(defaultQuery);
  const [selectedWeights, setSelectedWeights] = useState<number[]>([]);
  const [selectedBandIds, setSelectedBandIds] = useState<string[]>([]);
  const [chips, setChips] = useState(defaultChips);
  const [sortBy, setSortBy] = useState<"rel" | "lo" | "hi">("rel");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [showAllNotice, setShowAllNotice] = useState(false);

  useEffect(() => {
    if (!isSortOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        sortWrapRef.current &&
        !sortWrapRef.current.contains(e.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isSortOpen]);

  const activeQuery = query.trim() || defaultQuery;

  const filteredProducts = products
    .filter((item) => {
      const weightMatch =
        selectedWeights.length === 0 || selectedWeights.includes(item.grams);
      const bandMatch =
        selectedBandIds.length === 0 ||
        selectedBandIds.some((bandId) => {
          const band = priceBands.find((b) => b.id === bandId);
          return band ? item.price >= band.min && item.price < band.max : false;
        });
      return weightMatch && bandMatch;
    })
    .sort((a, b) => {
      if (sortBy === "lo") return a.price - b.price;
      if (sortBy === "hi") return b.price - a.price;
      return 0;
    });

  const activeSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label ?? "Relevance";

  const toggleWeight = (grams: number) => {
    setSelectedWeights((prev) =>
      prev.includes(grams) ? prev.filter((g) => g !== grams) : [...prev, grams]
    );
  };

  const toggleBand = (bandId: string) => {
    setSelectedBandIds((prev) =>
      prev.includes(bandId)
        ? prev.filter((id) => id !== bandId)
        : [...prev, bandId]
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedWeights([]);
    setSelectedBandIds([]);
  };

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Hero search banner */}
        <section className={styles["hero"]} aria-label="Search">
          <h1 id={headingId} className={styles["heading"]}>
            {heading}
          </h1>
          <p className={styles["lead"]}>{lead}</p>

          <search>
            <form
              className={styles["searchBar"]}
              onSubmit={(e) => e.preventDefault()}
            >
              <Search size={19} strokeWidth={1.7} aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
                className={styles["searchInput"]}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className={styles["clearBtn"]}
                >
                  <X size={17} strokeWidth={1.8} aria-hidden="true" />
                </button>
              ) : null}
              <button type="submit" className={styles["goBtn"]}>
                Search
              </button>
            </form>
          </search>

          <div className={styles["infoRow"]}>
            <span>
              Showing{" "}
              <strong>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "result" : "results"}
              </strong>{" "}
              for “<strong>{activeQuery}</strong>”
            </span>
            <span className={styles["infoSep"]} aria-hidden="true" />
            <span>
              {didYouMeanLabel}{" "}
              <button
                type="button"
                onClick={() => setQuery(didYouMeanQuery)}
                className={styles["didYouMeanBtn"]}
              >
                {didYouMeanQuery}?
              </button>
            </span>
          </div>

          <div className={styles["catsRow"]}>
            <span className={styles["catsLabel"]}>{relatedLabel}</span>
            {categories.map((cat) => (
              <Link key={cat.id} href={cat.href} className={styles["catPill"]}>
                <CategoryIcon id={cat.id} />
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Sidebar filters + Results */}
        <div className={styles["layout"]}>
          <aside className={styles["filters"]} aria-label="Filters">
            <div className={styles["filterHead"]}>
              <h2 className={styles["filterTitle"]}>Filters</h2>
              <button
                type="button"
                onClick={clearAllFilters}
                className={styles["linkBtn"]}
              >
                Clear all
              </button>
            </div>

            <details className={styles["filterGroup"]} open>
              <summary className={styles["filterSummary"]}>
                <span>Category</span>
                <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
              </summary>
              <div className={styles["filterOpts"]}>
                <label className={styles["cbLabel"]}>
                  <input
                    type="checkbox"
                    defaultChecked
                    className={styles["checkbox"]}
                  />
                  <span>Coins (6)</span>
                </label>
                <label
                  className={`${styles["cbLabel"]} ${styles["cbLabelDisabled"]}`}
                >
                  <input
                    type="checkbox"
                    disabled
                    className={styles["checkbox"]}
                  />
                  <span>Bars (0)</span>
                </label>
                <label
                  className={`${styles["cbLabel"]} ${styles["cbLabelDisabled"]}`}
                >
                  <input
                    type="checkbox"
                    disabled
                    className={styles["checkbox"]}
                  />
                  <span>Medallions (0)</span>
                </label>
              </div>
            </details>

            <details className={styles["filterGroup"]} open>
              <summary className={styles["filterSummary"]}>
                <span>Metal</span>
                <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
              </summary>
              <div className={styles["filterOpts"]}>
                <label className={styles["cbLabel"]}>
                  <input
                    type="checkbox"
                    defaultChecked
                    className={styles["checkbox"]}
                  />
                  <span>Gold (6)</span>
                </label>
                <label
                  className={`${styles["cbLabel"]} ${styles["cbLabelDisabled"]}`}
                >
                  <input
                    type="checkbox"
                    disabled
                    className={styles["checkbox"]}
                  />
                  <span>Silver (0)</span>
                </label>
              </div>
            </details>

            <details className={styles["filterGroup"]} open>
              <summary className={styles["filterSummary"]}>
                <span>Weight</span>
                <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
              </summary>
              <div className={styles["filterOpts"]}>
                {products.map((item) => (
                  <label key={item.id} className={styles["cbLabel"]}>
                    <input
                      type="checkbox"
                      checked={selectedWeights.includes(item.grams)}
                      onChange={() => toggleWeight(item.grams)}
                      className={styles["checkbox"]}
                    />
                    <span>{item.grams} gram (1)</span>
                  </label>
                ))}
              </div>
            </details>

            <details className={styles["filterGroup"]} open>
              <summary className={styles["filterSummary"]}>
                <span>Purity</span>
                <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
              </summary>
              <div className={styles["filterOpts"]}>
                <label className={styles["cbLabel"]}>
                  <input
                    type="checkbox"
                    defaultChecked
                    className={styles["checkbox"]}
                  />
                  <span>24K (999) (6)</span>
                </label>
                <label
                  className={`${styles["cbLabel"]} ${styles["cbLabelDisabled"]}`}
                >
                  <input
                    type="checkbox"
                    disabled
                    className={styles["checkbox"]}
                  />
                  <span>22K (0)</span>
                </label>
              </div>
            </details>

            <details className={styles["filterGroup"]} open>
              <summary className={styles["filterSummary"]}>
                <span>Availability</span>
                <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
              </summary>
              <div className={styles["filterOpts"]}>
                <label className={styles["cbLabel"]}>
                  <input
                    type="checkbox"
                    defaultChecked
                    className={styles["checkbox"]}
                  />
                  <span>In stock (6)</span>
                </label>
              </div>
            </details>

            <details className={styles["filterGroup"]} open>
              <summary className={styles["filterSummary"]}>
                <span>Price</span>
                <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
              </summary>
              <div className={styles["filterOpts"]}>
                {priceBands.map((band) => {
                  const count = products.filter(
                    (p) => p.price >= band.min && p.price < band.max
                  ).length;
                  return (
                    <label key={band.id} className={styles["cbLabel"]}>
                      <input
                        type="checkbox"
                        checked={selectedBandIds.includes(band.id)}
                        onChange={() => toggleBand(band.id)}
                        className={styles["checkbox"]}
                      />
                      <span>
                        {band.label} ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </details>
          </aside>

          <section aria-label="Results">
            <div className={styles["resHeader"]}>
              <h2 className={styles["resTitle"]}>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "result" : "results"} for “
                {activeQuery}”
              </h2>

              <div className={styles["sortWrap"]}>
                <span>Sort by:</span>
                <div ref={sortWrapRef} className={styles["ddWrap"]}>
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isSortOpen}
                    aria-controls={sortListId}
                    onClick={() => setIsSortOpen((open) => !open)}
                    className={styles["ddBtn"]}
                  >
                    <span>{activeSortLabel}</span>
                    <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  {isSortOpen ? (
                    <ul
                      id={sortListId}
                      role="listbox"
                      aria-label="Sort results"
                      className={styles["ddList"]}
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
                              setIsSortOpen(false);
                            }}
                            className={`${styles["ddOption"]} ${
                              selected ? styles["ddOptionSelected"] : ""
                            }`}
                          >
                            <span>{option.label}</span>
                            {selected ? (
                              <Check size={14} strokeWidth={2.2} aria-hidden="true" />
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>

            {chips.length > 0 ? (
              <div className={styles["chips"]}>
                {chips.map((chip) => (
                  <span key={chip.id} className={styles["chip"]}>
                    <span>{chip.label}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setChips((prev) => prev.filter((c) => c.id !== chip.id))
                      }
                      aria-label={`Remove ${chip.label}`}
                      className={styles["chipRemove"]}
                    >
                      <X size={13} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setChips([])}
                  className={styles["linkBtn"]}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={styles["chips"]} />
            )}

            <div className={styles["grid"]}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => {
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
                          aria-label={`Save ${item.title} to wishlist`}
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
                        <h3 className={styles["cardTitle"]}>{item.title}</h3>
                        <div className={styles["cardMeta"]}>
                          <span>{item.grams} gram</span>
                          <span
                            className={styles["cardMetaSep"]}
                            aria-hidden="true"
                          />
                          <span>{item.purity}</span>
                        </div>
                        <div className={styles["cardPrice"]}>
                          Price (SAMPLE):{" "}
                          <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                        </div>
                        <Link href={item.href} className={styles["viewLink"]}>
                          View details
                        </Link>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className={styles["empty"]}>
                  No products match these filters.
                </p>
              )}
            </div>

            <div className={styles["moreWrap"]}>
              <button
                type="button"
                onClick={() => setShowAllNotice(true)}
                className={styles["moreBtn"]}
              >
                <span>Load more products</span>
                <ChevronDown size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
              {showAllNotice ? (
                <p className={styles["moreNote"]} role="status">
                  All matching sample products are currently shown.
                </p>
              ) : null}
            </div>
          </section>
        </div>

        {/* Help CTA banner */}
        <section className={styles["ctaBanner"]} aria-label="Help">
          <div className={styles["ctaImageWrap"]}>
            <Image
              src={helpCta.imageSrc}
              alt={helpCta.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 240px"
              className="object-cover"
            />
          </div>
          <div className={styles["ctaCopy"]}>
            <h2 className={styles["ctaTitle"]}>{helpCta.heading}</h2>
            <p className={styles["ctaDesc"]}>{helpCta.description}</p>
          </div>
          <Link href={helpCta.ctaHref} className={styles["askBtn"]}>
            <span>{helpCta.ctaLabel}</span>
            <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </section>

        {/* Assurances strip */}
        <section className={styles["trust"]} aria-label="Assurances">
          {assurances.map((item) => (
            <div key={item.id} className={styles["trustItem"]}>
              <AssuranceIcon id={item.id} />
              <span>{item.label}</span>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
