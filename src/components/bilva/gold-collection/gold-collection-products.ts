import {
  GOLD_COINS_AND_BARS_PATH,
  LAKSHMI_GOLD_COIN_PATH,
} from "@/lib/bilva-collection-routes";

export type GoldCollectionProduct = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  alt: string;
  href: string;
  badge?: string;
};

export const GOLD_COLLECTION_PRODUCTS: GoldCollectionProduct[] = [
  {
    id: "bilwa-leaf-coin",
    title: "Bilwa Leaf Gold Coin",
    subtitle: "24K (999) · 1 g",
    price: "₹12,450",
    image: "/images/bilva/bestseller-gold-coin-master.webp",
    alt: "Bilwa Leaf Gold Coin 1 g",
    href: LAKSHMI_GOLD_COIN_PATH,
  },
  {
    id: "heritage-coin",
    title: "Heritage Gold Coin",
    subtitle: "24K (999) · 5 g",
    price: "₹62,250",
    image: "/images/bilva/bestseller-clean-gold-coin.webp",
    alt: "Heritage Gold Coin 5 g",
    href: LAKSHMI_GOLD_COIN_PATH,
  },
  {
    id: "classic-bar",
    title: "Classic Gold Bar",
    subtitle: "24K (999) · 2 g",
    price: "₹24,900",
    image: "/images/bilva/bestseller-gold-bar-master.webp",
    alt: "Classic Gold Bar 2 g",
    href: GOLD_COINS_AND_BARS_PATH,
  },
  {
    id: "sacred-motif-coin",
    title: "Sacred Motif Gold Coin",
    subtitle: "24K (999) · 10 g",
    price: "₹1,24,500",
    image: "/images/bilva/signature-first-gold-coin.webp",
    alt: "Sacred Motif Gold Coin 10 g",
    href: LAKSHMI_GOLD_COIN_PATH,
  },
  {
    id: "small-beginnings",
    title: "Small Beginnings Coin",
    subtitle: "24K (999) · 0.5 g",
    price: "₹6,225",
    image: "/images/bilva/bestseller-gold-denominations-master.webp",
    alt: "Small Beginnings Gold Coin 0.5 g",
    href: LAKSHMI_GOLD_COIN_PATH,
  },
  {
    id: "artisan-bar",
    title: "Artisan Gold Bar",
    subtitle: "24K (999) · 5 g",
    price: "₹62,250",
    image: "/images/bilva/bestseller-gold-bar.webp",
    alt: "Artisan Gold Bar 5 g",
    href: GOLD_COINS_AND_BARS_PATH,
  },
];

export const GOLD_BROWSE_CHIPS = [
  { label: "Gold coins", href: `${GOLD_COINS_AND_BARS_PATH}#collection` },
  { label: "Gold bars", href: `${GOLD_COINS_AND_BARS_PATH}#collection` },
  { label: "Under 1 g", href: `${GOLD_COINS_AND_BARS_PATH}#collection` },
  { label: "1–5 g", href: `${GOLD_COINS_AND_BARS_PATH}#collection` },
  { label: "10 g & above", href: `${GOLD_COINS_AND_BARS_PATH}#collection` },
] as const;