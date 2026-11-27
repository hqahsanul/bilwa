import {
  FIVE_MUKHI_RUDRAKSHA_PATH,
  LAKSHMI_GOLD_COIN_PATH,
  LAKSHMI_SILVER_COIN_PATH,
  GOLD_COINS_AND_BARS_PATH,
} from "@/lib/bilva-collection-routes";

export type BestSellerProduct = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  numericPrice: number;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

/** Homepage best-sellers strip — illustrative catalogue samples. */
export const BEST_SELLER_PRODUCTS: readonly BestSellerProduct[] = [
  {
    id: "heritage-gold-coin",
    title: "Heritage Gold Coin",
    subtitle: "24K (999) · 5 g",
    price: "₹62,250",
    numericPrice: 62250,
    imageSrc: "/images/bilva/bestseller-gold-coin-master.webp",
    imageAlt: "Heritage Gold Coin 24K (999) 5g on Travertine Pedestal",
    href: LAKSHMI_GOLD_COIN_PATH,
  },
  {
    id: "silver-keepsake-coin",
    title: "Silver Keepsake Coin",
    subtitle: "Silver 999 · 10 g",
    price: "₹1,650",
    numericPrice: 1650,
    imageSrc: "/images/bilva/bestseller-silver-coin-master.webp",
    imageAlt: "Silver Keepsake Coin 999 10g with Lotus Motif",
    href: LAKSHMI_SILVER_COIN_PATH,
  },
  {
    id: "bilwa-gold-bar",
    title: "Bilwa Gold Bar",
    subtitle: "24K (999) · 2 g",
    price: "₹24,900",
    numericPrice: 24900,
    imageSrc: "/images/bilva/bestseller-gold-bar-master.webp",
    imageAlt: "Bilwa Gold Bar 24K 2g Cast Ingot on Travertine Pedestal",
    href: GOLD_COINS_AND_BARS_PATH,
  },
  {
    id: "rudraksh-bracelet",
    title: "Rudraksh Bracelet",
    subtitle: "Natural rudraksh",
    price: "₹2,450",
    numericPrice: 2450,
    imageSrc: "/images/bilva/bestseller-rudraksh-bracelet-master.webp",
    imageAlt: "Natural Rudraksh Bracelet with 24K Gold Plated Bilwa Bead",
    href: FIVE_MUKHI_RUDRAKSHA_PATH,
  },
];