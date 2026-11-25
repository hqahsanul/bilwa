"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  ChevronDown,
  FileText,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  WISHLIST_DATA,
  type WishlistMiniItem,
  type WishlistProduct,
} from "@/data/bilva/wishlist";
import styles from "./bilva-wishlist-page.module.css";

function TrustIcon({ id }: { id: string }) {
  const className = "shrink-0 text-[#b98a3e]";
  switch (id) {
    case "insured":
      return <ShieldCheck size={28} strokeWidth={1.6} className={className} aria-hidden="true" />;
    case "docs":
      return <FileText size={28} strokeWidth={1.6} className={className} aria-hidden="true" />;
    default:
      return <Truck size={28} strokeWidth={1.6} className={className} aria-hidden="true" />;
  }
}

export function BilvaWishlistPage() {
  const {
    eyebrow,
    heading,
    shareLabel,
    shareCopiedNote,
    continueLabel,
    continueHref,
    moveSelectedLabel,
    removeSelectedLabel,
    moveToBagLabel,
    emptyMessage,
    initialItems,
    recentlyViewed,
    recommendations,
    trustStrip,
  } = WISHLIST_DATA;

  const headingId = useId();
  const selectAllRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<WishlistProduct[]>(initialItems);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  const totalCount = items.length;
  const selectedCount = selectedIds.length;
  const allSelected = totalCount > 0 && selectedCount === totalCount;
  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
  };

  const toggleItemSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removeSingleItem = (item: WishlistProduct) => {
    setItems((prev) => prev.filter((entry) => entry.id !== item.id));
    setSelectedIds((prev) => prev.filter((id) => id !== item.id));
    setStatusMessage(`${item.name} removed from wishlist.`);
  };

  const handleMoveSingleToBag = (item: WishlistProduct) => {
    setStatusMessage(`${item.name} noted for your bag.`);
  };

  const handleMoveSelectedToBag = () => {
    if (selectedCount === 0) return;
    setStatusMessage(
      `${selectedCount} selected ${selectedCount === 1 ? "item" : "items"} noted for your bag.`
    );
  };

  const handleRemoveSelected = () => {
    if (selectedCount === 0) return;
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setStatusMessage("Selected items removed from wishlist.");
  };

  const handleSaveFromRecent = (item: WishlistMiniItem) => {
    if (items.some((entry) => entry.id === item.id)) {
      setStatusMessage(`${item.name} is already in your wishlist.`);
      return;
    }
    const newItem: WishlistProduct = {
      id: item.id,
      name: item.name,
      meta: item.meta,
      priceFormatted: item.priceFormatted,
      indicative: item.indicative,
      priceNote: item.priceNote,
      stockLabel: "In stock",
      imageSrc: item.imageSrc,
      imageAlt: item.imageAlt,
    };
    setItems((prev) => [...prev, newItem]);
    setStatusMessage(`${item.name} saved to your wishlist.`);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        // Clipboard permission optional in preview environments
      }
    }
    setStatusMessage(shareCopiedNote);
  };

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Banner */}
        <header className={styles["banner"]}>
          <p className={styles["eyebrow"]}>{eyebrow}</p>
          <h1 id={headingId} className={styles["heading"]}>
            {heading}
          </h1>
          <p className={styles["sub"]}>
            {totalCount} saved {totalCount === 1 ? "item" : "items"}
          </p>
        </header>

        {/* Toolbar */}
        <div className={styles["toolbar"]}>
          <label className={styles["chkLabel"]}>
            <input
              ref={selectAllRef}
              type="checkbox"
              checked={allSelected}
              disabled={totalCount === 0}
              onChange={toggleSelectAll}
              className={styles["checkbox"]}
            />
            <span>Select all ({totalCount})</span>
          </label>

          <div className={styles["acts"]}>
            <button
              type="button"
              onClick={handleShare}
              className={`${styles["btn"]} ${styles["btnGhost"]} ${styles["btnSm"]}`}
            >
              <Share2 size={15} strokeWidth={1.7} aria-hidden="true" />
              <span>{shareLabel}</span>
            </button>
            <Link href={continueHref} className={styles["btn"]}>
              <span>{continueLabel}</span>
              <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {statusMessage ? (
          <p className={styles["statusNote"]} role="status" aria-live="polite">
            {statusMessage}
          </p>
        ) : null}

        {/* Wishlist cards */}
        {items.length > 0 ? (
          <section className={styles["grid"]} aria-label="Saved items">
            {items.map((item) => {
              const isChecked = selectedIds.includes(item.id);
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
                    <label className={styles["tickWrap"]}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItemSelection(item.id)}
                        aria-label={`Select ${item.name}`}
                        className={styles["checkbox"]}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeSingleItem(item)}
                      aria-pressed="true"
                      aria-label={`Remove ${item.name} from wishlist`}
                      className={styles["saveBtn"]}
                    >
                      <Bookmark
                        size={15}
                        strokeWidth={1.8}
                        className="fill-current"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className={styles["cardBody"]}>
                    <h3 className={styles["cardTitle"]}>{item.name}</h3>
                    <p className={styles["meta"]}>
                      {item.meta.map((part) => (
                        <span key={part}>{part}</span>
                      ))}
                    </p>

                    {item.priceNote ? (
                      <div className={styles["priceNote"]}>{item.priceNote}</div>
                    ) : (
                      <div className={styles["price"]}>
                        {item.priceFormatted}{" "}
                        {item.indicative ? <small>(Indicative)</small> : null}
                      </div>
                    )}

                    <div
                      className={`${styles["stock"]} ${
                        item.madeToOrder ? styles["stockMto"] : ""
                      }`}
                    >
                      {item.stockLabel}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleMoveSingleToBag(item)}
                      className={`${styles["btn"]} ${styles["cardBtn"]}`}
                    >
                      <ShoppingBag size={15} strokeWidth={1.7} aria-hidden="true" />
                      <span>{moveToBagLabel}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <div className={styles["emptyBox"]}>{emptyMessage}</div>
        )}

        {/* Bulk actions */}
        <div className={styles["bulk"]}>
          <button
            type="button"
            disabled={selectedCount === 0}
            onClick={handleMoveSelectedToBag}
            className={`${styles["btn"]} ${styles["btnGhost"]} ${styles["btnSm"]}`}
          >
            <span>{moveSelectedLabel}</span>
            <ChevronDown size={15} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button
            type="button"
            disabled={selectedCount === 0}
            onClick={handleRemoveSelected}
            className={`${styles["btn"]} ${styles["btnGhost"]} ${styles["btnSm"]}`}
          >
            <Trash2 size={15} strokeWidth={1.7} aria-hidden="true" />
            <span>{removeSelectedLabel}</span>
          </button>
        </div>

        {/* Recently viewed */}
        <section className={styles["sec"]} aria-label={recentlyViewed.title}>
          <div className={styles["secHeader"]}>
            <h2 className={styles["secTitle"]}>{recentlyViewed.title}</h2>
            <p className={styles["secSub"]}>{recentlyViewed.subtitle}</p>
            <Link href={recentlyViewed.viewAllHref} className={styles["secLink"]}>
              <span>{recentlyViewed.viewAllLabel}</span>
              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles["miniGrid"]}>
            {recentlyViewed.items.map((item) => (
              <div
                key={item.id}
                className={`${styles["mini"]} ${styles["miniPlain"]}`}
              >
                <div className={styles["miniThumb"]}>
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className={styles["miniInfo"]}>
                  <h4 className={styles["miniTitle"]}>{item.name}</h4>
                  <p className={`${styles["meta"]} ${styles["miniMeta"]}`}>
                    {item.meta.map((part) => (
                      <span key={part}>{part}</span>
                    ))}
                  </p>
                  <div className={styles["miniPrice"]}>
                    {item.priceFormatted}{" "}
                    {item.indicative ? <small>(Indicative)</small> : null}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveFromRecent(item)}
                  aria-label={`Save ${item.name}`}
                  className={styles["iconBtn"]}
                >
                  <Bookmark size={15} strokeWidth={1.7} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* You may also like */}
        <section className={styles["sec"]} aria-label={recommendations.title}>
          <div className={styles["secHeader"]}>
            <h2 className={styles["secTitle"]}>{recommendations.title}</h2>
            <p className={styles["secSub"]}>{recommendations.subtitle}</p>
            <Link
              href={recommendations.exploreHref}
              className={`${styles["secLink"]} ${styles["secLinkGold"]}`}
            >
              <span>{recommendations.exploreLabel}</span>
              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles["miniGrid"]}>
            {recommendations.items.map((item) => (
              <div key={item.id} className={styles["mini"]}>
                <div className={styles["miniThumb"]}>
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className={styles["miniInfo"]}>
                  <h4 className={styles["miniTitle"]}>{item.name}</h4>
                  <p className={`${styles["meta"]} ${styles["miniMeta"]}`}>
                    {item.meta.map((part) => (
                      <span key={part}>{part}</span>
                    ))}
                  </p>
                  {item.priceNote ? (
                    <div className={styles["miniPriceNote"]}>
                      {item.priceNote}
                    </div>
                  ) : (
                    <div className={styles["miniPrice"]}>
                      {item.priceFormatted}{" "}
                      {item.indicative ? <small>(Indicative)</small> : null}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setStatusMessage(`${item.name} noted for your bag.`)
                  }
                  aria-label={`Add ${item.name} to bag`}
                  className={styles["iconBtn"]}
                >
                  <ShoppingBag size={15} strokeWidth={1.7} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <div className={styles["trust"]}>
          {trustStrip.map((entry) => (
            <div key={entry.id} className={styles["trustItem"]}>
              <TrustIcon id={entry.id} />
              <div>
                <strong className={styles["trustTitle"]}>{entry.title}</strong>
                <span className={styles["trustSub"]}>{entry.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
