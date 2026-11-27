"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronUp, Heart, Star, X } from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  CORPORATE_LIST_DATA,
  type CorporateFilterKey,
  type CorporateSortOption,
} from "@/data/bilva/corporate-gifting-list";
import styles from "./bilva-corporate-list-page.module.css";

type SelectedFilters = Partial<Record<CorporateFilterKey, string[]>>;

function FeatureIcon({ name }: { name: "award" | "gift" | "headset" }) {
  if (name === "gift") {
    return (
      <svg width="54" height="54" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="9" width="18" height="12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2 9h20v4H2zM12 9v12" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 9C9 9 6 8 6 5.5S9.5 3 12 9c2.5-6 6-4.5 6-2s-3 3.5-6 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "headset") {
    return (
      <svg width="54" height="54" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" stroke="currentColor" strokeWidth="1.6" />
        <rect x="2.5" y="12.5" width="4.5" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="17" y="12.5" width="4.5" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M19.5 19.5c0 2-2 3-5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="86" height="70" viewBox="0 0 100 80" fill="none" aria-hidden>
      <g fill="#c08a2e" stroke="#c08a2e">
        <path d="M50 14c8 8 10 18 6 30-4 3-8 3-12 0-4-12-2-22 6-30z" />
        <path d="M30 40c8 0 14 3 17 10-2 5-8 7-13 5-5-3-6-10-4-15zM70 40c-8 0-14 3-17 10 2 5 8 7 13 5 5-3 6-10 4-15z" />
        <path d="M50 70V46" strokeWidth="2" />
      </g>
      <g fill="#c08a2e" transform="translate(6 6) scale(0.9)">
        <path d="M20 70C6 58 4 30 22 10" fill="none" stroke="#c08a2e" strokeWidth="2" />
        <ellipse cx="9" cy="32" rx="3.5" ry="7" transform="rotate(-20 9 32)" />
        <ellipse cx="9" cy="48" rx="3.5" ry="7" transform="rotate(-35 9 48)" />
        <ellipse cx="14" cy="62" rx="3.5" ry="7" transform="rotate(-55 14 62)" />
        <ellipse cx="20" cy="20" rx="3.5" ry="7" transform="rotate(10 20 20)" />
      </g>
      <g fill="#c08a2e" transform="translate(94 6) scale(-0.9 0.9)">
        <path d="M20 70C6 58 4 30 22 10" fill="none" stroke="#c08a2e" strokeWidth="2" />
        <ellipse cx="9" cy="32" rx="3.5" ry="7" transform="rotate(-20 9 32)" />
        <ellipse cx="9" cy="48" rx="3.5" ry="7" transform="rotate(-35 9 48)" />
        <ellipse cx="14" cy="62" rx="3.5" ry="7" transform="rotate(-55 14 62)" />
        <ellipse cx="20" cy="20" rx="3.5" ry="7" transform="rotate(10 20 20)" />
      </g>
    </svg>
  );
}

function LaurelMark() {
  return (
    <svg width="40" height="60" viewBox="0 0 44 76" fill="currentColor" aria-hidden>
      <path d="M24 74C16 56 14 34 24 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 8 + i * 10;
        const x = 22 + Math.sin((i / 6) * 1.4) * -8;
        return (
          <g key={i}>
            <ellipse cx={x - 6} cy={y} rx="5" ry="2.6" transform={`rotate(-35 ${x - 6} ${y})`} />
            <ellipse cx={x + 6} cy={y - 4} rx="5" ry="2.6" transform={`rotate(35 ${x + 6} ${y - 4})`} />
          </g>
        );
      })}
    </svg>
  );
}

export function BilvaCorporateListPage() {
  const {
    hero,
    strip,
    milestone,
    discover,
    products,
    scrollCue,
    features,
    reviews,
    cta,
    actions,
  } = CORPORATE_LIST_DATA;

  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const [sortId, setSortId] = useState<CorporateSortOption["id"]>("featured");
  const filterBarRef = useRef<HTMLDivElement>(null);

  const totalCount = products.length;

  const activeChips = useMemo(() => {
    const chips: { key: CorporateFilterKey; label: string }[] = [];
    for (const group of discover.filters) {
      for (const label of selectedFilters[group.id] ?? []) {
        chips.push({ key: group.id, label });
      }
    }
    return chips;
  }, [discover.filters, selectedFilters]);

  const filteredProducts = useMemo(() => {
    const next = products.filter((product) =>
      discover.filters.every((group) => {
        const selected = selectedFilters[group.id] ?? [];
        if (selected.length === 0) return true;
        return selected.some((label) => product.facets[group.id].includes(label));
      }),
    );

    const sorted = [...next];
    if (sortId === "price-asc") {
      sorted.sort((a, b) => (a.priceValue ?? Number.POSITIVE_INFINITY) - (b.priceValue ?? Number.POSITIVE_INFINITY));
    } else if (sortId === "price-desc") {
      sorted.sort((a, b) => (b.priceValue ?? -1) - (a.priceValue ?? -1));
    } else if (sortId === "name-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [discover.filters, products, selectedFilters, sortId]);

  const showingLabel = `Showing ${filteredProducts.length} of ${totalCount} pieces`;
  const currentSortLabel =
    discover.sortOptions.find((option) => option.id === sortId)?.label ?? "Featured";

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!filterBarRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const toggleSave = (id: string) => {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFilterOption = (key: CorporateFilterKey, label: string) => {
    setSelectedFilters((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label];
      return { ...prev, [key]: next };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setSortId("featured");
    setOpenMenu(null);
  };

  const removeChip = (key: CorporateFilterKey, label: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((item) => item !== label),
    }));
  };

  return (
    <div className={styles["page"]}>
      <section className={styles["hero"]} aria-labelledby="corporate-list-heading">
        <div className={styles["heroMedia"]}>
          <Image
            src={hero.imageSrc}
            alt={hero.imageAlt}
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 62vw"
            className="object-cover object-[62%_48%]"
          />
          <div className={styles["heroMediaFade"]} aria-hidden />
        </div>

        <div className={`${BILVA_SITE_SHELL_CLASS} ${styles["heroInner"]}`}>
          <nav className={styles["crumb"]} aria-label="Breadcrumb">
            <Link href={hero.breadcrumbHomeHref}>{hero.breadcrumbHome}</Link>
            <i className={styles["crumbSep"]}>/</i>
            <span className={styles["crumbCurrent"]}>{hero.breadcrumbCurrent}</span>
          </nav>

          <p className={styles["eyebrow"]}>{hero.eyebrow}</p>
          <h1 id="corporate-list-heading" className={styles["title"]}>
            {hero.title}
          </h1>
          <p className={styles["lead"]}>{hero.description}</p>

          <div className={styles["ctas"]}>
            <Link href={hero.primaryCtaHref} className={styles["primaryCta"]}>
              {hero.primaryCta}
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
            </Link>
            <Link href={hero.secondaryCtaHref} className={styles["secondaryCta"]}>
              {hero.secondaryCta}
              <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
            </Link>
          </div>

          <div className={styles["trust"]}>
            {hero.trustLabels.map((label) => (
              <span key={label} className={styles["trustItem"]}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={BILVA_SITE_SHELL_CLASS}>
        <div className={styles["strip"]}>
          <div className={styles["stripItem"]}>{strip.title}</div>
          {strip.items.map((item) => (
            <div key={item} className={styles["stripItem"]}>
              {item}
            </div>
          ))}
          <div className={styles["stripItem"]}>
            <Link href={strip.ctaHref} className={styles["stripCta"]}>
              {strip.cta}
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden />
            </Link>
          </div>
        </div>

        <section className={styles["mile"]} aria-labelledby="corporate-milestone-heading">
          <div className={styles["mileMedia"]}>
            <Image
              src={milestone.imageSrc}
              alt={milestone.imageAlt}
              fill
              sizes="(max-width: 1100px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className={styles["mileBody"]}>
            <h2 id="corporate-milestone-heading" className={styles["mileTitle"]}>
              {milestone.title}
            </h2>
            <div className={styles["chips"]}>
              {milestone.chips.map((chip) => (
                <Link key={chip.id} href={chip.href} className={styles["chip"]}>
                  <span>{chip.label}</span>
                  <ArrowRight size={15} strokeWidth={1.8} aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="collection"
          className={styles["discover"]}
          aria-labelledby="corporate-discover-heading"
        >
          <div className={styles["discoverHead"]}>
            <div>
              <h2 id="corporate-discover-heading" className={styles["discoverTitle"]}>
                {discover.title}
              </h2>
              <p className={styles["discoverSub"]}>{discover.subtitle}</p>
            </div>
            <p className={styles["showing"]}>{showingLabel}</p>
          </div>

          <div
            ref={filterBarRef}
            className={styles["filterBar"]}
            role="group"
            aria-label="Collection filters"
          >
            <div className={styles["filterGroup"]}>
              {discover.filters.map((filter, index) => {
                const isOpen = openMenu === filter.id;
                const selectedCount = selectedFilters[filter.id]?.length ?? 0;
                const alignEnd = index >= discover.filters.length - 2;

                return (
                  <div key={filter.id} className={styles["filterItem"]}>
                    <button
                      type="button"
                      className={`${styles["filterPill"]}${isOpen ? ` ${styles["filterPillOpen"]}` : ""}${
                        selectedCount > 0 ? ` ${styles["filterPillActive"]}` : ""
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="listbox"
                      onClick={() => setOpenMenu(isOpen ? null : filter.id)}
                    >
                      <span>{filter.label}</span>
                      {isOpen ? (
                        <ChevronUp size={16} strokeWidth={1.8} aria-hidden />
                      ) : (
                        <ChevronDown size={16} strokeWidth={1.8} aria-hidden />
                      )}
                    </button>

                    {isOpen ? (
                      <div
                        className={`${styles["filterMenu"]}${alignEnd ? ` ${styles["filterMenuEnd"]}` : ""}`}
                        role="listbox"
                        aria-label={filter.label}
                        aria-multiselectable="true"
                      >
                        <p className={styles["filterMenuTitle"]}>{filter.label}</p>
                        <div className={styles["filterMenuOptions"]}>
                          {filter.options.map((option) => {
                            const isChecked = (selectedFilters[filter.id] ?? []).includes(option.label);
                            return (
                              <button
                                key={option.id}
                                type="button"
                                role="option"
                                aria-selected={isChecked}
                                className={styles["filterOption"]}
                                onClick={() => toggleFilterOption(filter.id, option.label)}
                              >
                                <span
                                  className={`${styles["filterCheck"]}${
                                    isChecked ? ` ${styles["filterCheckOn"]}` : ""
                                  }`}
                                  aria-hidden
                                >
                                  {isChecked ? <Check size={12} strokeWidth={3} /> : null}
                                </span>
                                <span>{option.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        <div className={styles["filterMenuActions"]}>
                          <button
                            type="button"
                            className={styles["filterApply"]}
                            onClick={() => setOpenMenu(null)}
                          >
                            Done
                          </button>
                          <button
                            type="button"
                            className={styles["filterReset"]}
                            onClick={() =>
                              setSelectedFilters((prev) => ({ ...prev, [filter.id]: [] }))
                            }
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className={styles["filterAside"]}>
              <span className={styles["filterSep"]} aria-hidden />
              <button
                type="button"
                className={styles["clearFilters"]}
                onClick={clearFilters}
                disabled={activeChips.length === 0 && sortId === "featured"}
              >
                {discover.clearFilters}
              </button>
              <span className={styles["filterSep"]} aria-hidden />

              <div className={`${styles["filterItem"]} ${styles["sortItem"]}`}>
                <button
                  type="button"
                  className={`${styles["filterPill"]} ${styles["sortPill"]}${
                    openMenu === "sort" ? ` ${styles["filterPillOpen"]}` : ""
                  }`}
                  aria-expanded={openMenu === "sort"}
                  aria-haspopup="listbox"
                  onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
                >
                  <span>
                    {discover.sortPrefix} {currentSortLabel}
                  </span>
                  {openMenu === "sort" ? (
                    <ChevronUp size={16} strokeWidth={1.8} aria-hidden />
                  ) : (
                    <ChevronDown size={16} strokeWidth={1.8} aria-hidden />
                  )}
                </button>

                {openMenu === "sort" ? (
                  <div
                    className={`${styles["filterMenu"]} ${styles["filterMenuEnd"]} ${styles["sortMenu"]}`}
                    role="listbox"
                    aria-label="Sort products"
                  >
                    {discover.sortOptions.map((option) => {
                      const isSelected = sortId === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`${styles["sortOption"]}${
                            isSelected ? ` ${styles["sortOptionActive"]}` : ""
                          }`}
                          onClick={() => {
                            setSortId(option.id);
                            setOpenMenu(null);
                          }}
                        >
                          {option.label}
                          {isSelected ? <Check size={14} strokeWidth={2.4} aria-hidden /> : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {activeChips.length > 0 ? (
            <div className={styles["tags"]}>
              {activeChips.map((chip) => (
                <button
                  key={`${chip.key}-${chip.label}`}
                  type="button"
                  className={styles["tag"]}
                  onClick={() => removeChip(chip.key, chip.label)}
                  aria-label={`Remove ${chip.label} filter`}
                >
                  {chip.label}
                  <X size={15} strokeWidth={1.8} aria-hidden />
                </button>
              ))}
            </div>
          ) : null}

          <p className={styles["caption"]}>{discover.filtersCaption}</p>

          <div className={styles["grid"]}>
            {filteredProducts.length === 0 ? (
              <p className={styles["emptyResults"]}>{discover.emptyResults}</p>
            ) : null}
            {filteredProducts.map((product) => {
              const isSaved = Boolean(saved[product.id]);
              return (
                <article key={product.id} className={styles["card"]}>
                  <div className={styles["cardMedia"]}>
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span className={styles["badge"]}>{product.badge}</span>
                    <button
                      type="button"
                      className={styles["wishBtn"]}
                      aria-pressed={isSaved}
                      aria-label={`${isSaved ? "Remove from" : "Add to"} wishlist: ${product.title}`}
                      onClick={() => toggleSave(product.id)}
                    >
                      <Heart
                        size={18}
                        strokeWidth={1.6}
                        className={isSaved ? "fill-current" : undefined}
                      />
                    </button>
                  </div>
                  <div className={styles["cardBody"]}>
                    <h3 className={styles["cardTitle"]}>{product.title}</h3>
                    <p className={styles["cardSub"]}>{product.subtitle}</p>
                    <p className={styles["cardPrice"]}>{product.price}</p>
                    <div className={styles["cardActions"]}>
                      <Link href={actions.addToBagHref} className={styles["addBtn"]}>
                        {actions.addToBagLabel}
                      </Link>
                      <Link href={product.href} className={styles["detailsLink"]}>
                        {actions.viewDetailsLabel}
                        <ArrowRight size={15} strokeWidth={1.8} aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className={styles["caption"]}>{discover.productsCaption}</p>
        </section>
      </div>

      <section className={styles["scrollCue"]} aria-label={scrollCue.title}>
        <h3 className={styles["scrollTitle"]}>{scrollCue.title}</h3>
        <div className={styles["progress"]} aria-hidden>
          <span className={styles["progressFill"]} />
        </div>
        <p className={styles["scrollMeta"]}>{scrollCue.progressLabel}</p>
        <div className={styles["spinner"]} aria-hidden />
      </section>

      <div className={`${BILVA_SITE_SHELL_CLASS} ${styles["lowerWrap"]}`}>
        <div className={styles["features"]}>
          {features.map((feature) => (
            <div key={feature.id} className={styles["feature"]}>
              <span className={styles["featureIcon"]}>
                <FeatureIcon name={feature.icon} />
              </span>
              <div>
                <h4 className={styles["featureTitle"]}>{feature.title}</h4>
                <p className={styles["featureBody"]}>{feature.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className={styles["reviewsHead"]}>{reviews.title}</h3>
        <div className={styles["reviews"]}>
          {reviews.cards.map((card) => (
            <blockquote key={card.id} className={styles["review"]}>
              <span className={`${styles["laurel"]} ${styles["laurelLeft"]}`}>
                <LaurelMark />
              </span>
              <span className={`${styles["laurel"]} ${styles["laurelRight"]}`}>
                <LaurelMark />
              </span>
              <div className={styles["stars"]} aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={28} className="fill-current" strokeWidth={0} />
                ))}
              </div>
              <q className={styles["quote"]}>{card.quote}</q>
              <small className={styles["reviewMeta"]}>{card.meta}</small>
            </blockquote>
          ))}
        </div>
        <p className={styles["sampleNote"]}>{reviews.sampleNote}</p>
      </div>

      <section className={styles["cta"]} aria-labelledby="corporate-cta-heading">
        <div className={`${BILVA_SITE_SHELL_CLASS} ${styles["ctaInner"]}`}>
          <div>
            <h2 id="corporate-cta-heading" className={styles["ctaTitle"]}>
              {cta.title}
            </h2>
            <p className={styles["ctaBody"]}>{cta.body}</p>
            <div className={styles["ctaActions"]}>
              <Link href={cta.primaryHref} className={styles["ctaPrimary"]}>
                {cta.primary}
              </Link>
              <Link href={cta.secondaryHref} className={styles["ctaSecondary"]}>
                {cta.secondary}
              </Link>
            </div>
            <p className={styles["ctaNote"]}>{cta.note}</p>
          </div>
          <div className={styles["ctaMedia"]}>
            <Image
              src={cta.imageSrc}
              alt={cta.imageAlt}
              fill
              sizes="(max-width: 1100px) 100vw, 44vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
