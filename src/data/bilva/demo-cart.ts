/**
 * Illustrative bag / wishlist samples for the marketing chrome.
 * Replace with session/cart API when commerce is enabled.
 */

export type DemoBagItem = {
  id: string;
  title: string;
  quantity: number;
  href: string;
  image: string;
  alt: string;
};

export type DemoWishlistItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  alt: string;
};

export const DEMO_BAG_ITEMS: readonly DemoBagItem[] = [
  {
    id: "bag-gold-coin-1g",
    title: "Gold Coin · 1 g",
    quantity: 1,
    href: "#catalog",
    image: "/images/bilva/bestseller-gold-coin-clean.webp",
    alt: "Gold coin 1 g",
  },
  {
    id: "bag-silver-coin-10g",
    title: "Silver Coin · 10 g",
    quantity: 1,
    href: "#catalog",
    image: "/images/bilva/bestseller-silver-coin-clean.webp",
    alt: "Silver coin 10 g",
  },
];

export const DEMO_WISHLIST_ITEMS: readonly DemoWishlistItem[] = [
  {
    id: "gold-coin-1g",
    title: "Gold Coin · 1 g",
    subtitle: "Illustrative item",
    href: "#catalog",
    image: "/images/bilva/bestseller-gold-coin-clean.webp",
    alt: "Gold coin 1 g",
  },
  {
    id: "silver-coin-1g",
    title: "Silver Coin · 1 g",
    subtitle: "Illustrative item",
    href: "#catalog",
    image: "/images/bilva/bestseller-silver-coin-clean.webp",
    alt: "Silver coin 1 g",
  },
];