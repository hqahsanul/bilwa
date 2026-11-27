import {
  CORPORATE_GIFTING_PATH,
  GEMSTONES_PATH,
  GIFTING_PATH,
  GOLD_COINS_AND_BARS_PATH,
  RUDRAKSH_COLLECTION_PATH,
  SILVER_COINS_AND_BARS_PATH,
} from "@/lib/bilva-collection-routes";

export type CollectionTile = {
  id: string;
  title: string;
  href: string;
  image: string;
  alt: string;
  desktopCol: string;
  desktopRow: string;
  titleSize: string;
};

export const HOME_COLLECTIONS: readonly CollectionTile[] = [
  {
    id: "gold-coins-and-bars",
    title: "Gold coins & bars",
    href: GOLD_COINS_AND_BARS_PATH,
    image: "/images/bilva/collection-gold-coins-and-bars-raw.webp",
    alt: "Bilwa 24K Gold Lotus Coin and Gold Bar on Travertine",
    desktopCol: "lg:col-start-1 lg:col-end-2",
    desktopRow: "lg:row-start-1 lg:row-end-3",
    titleSize: "text-[22px] sm:text-[26px] lg:text-[28px]",
  },
  {
    id: "silver-coins-and-bars",
    title: "Silver coins & bars",
    href: SILVER_COINS_AND_BARS_PATH,
    image: "/images/bilva/collection-silver-coins-and-bars-raw.webp",
    alt: "Bilwa 999 Ganesha Silver Coin and Bilwa Silver Coin on Silk",
    desktopCol: "lg:col-start-2 lg:col-end-4",
    desktopRow: "lg:row-start-1 lg:row-end-2",
    titleSize: "text-[18px] sm:text-[21px] lg:text-[23px]",
  },
  {
    id: "rudraksh",
    title: "Rudraksh",
    href: RUDRAKSH_COLLECTION_PATH,
    image: "/images/bilva/collection-rudraksh-raw.webp",
    alt: "Sacred Rudraksh Beads Bracelet with 24K Gold Spheres",
    desktopCol: "lg:col-start-4 lg:col-end-5",
    desktopRow: "lg:row-start-1 lg:row-end-2",
    titleSize: "text-[18px] sm:text-[21px] lg:text-[23px]",
  },
  {
    id: "gemstones",
    title: "Gemstones",
    href: GEMSTONES_PATH,
    image: "/images/bilva/collection-gemstones-raw.webp",
    alt: "Faceted Emerald, Ruby, and Sapphire Vedic Gemstones",
    desktopCol: "lg:col-start-2 lg:col-end-3",
    desktopRow: "lg:row-start-2 lg:row-end-3",
    titleSize: "text-[18px] sm:text-[21px] lg:text-[22px]",
  },
  {
    id: "premium-gifting",
    title: "Premium gifting",
    href: GIFTING_PATH,
    image: "/images/bilva/collection-premium-gifting-raw.webp",
    alt: "Bilwa Luxury Velvet Gift Set with 24K Gold Coin and Bar",
    desktopCol: "lg:col-start-3 lg:col-end-5",
    desktopRow: "lg:row-start-2 lg:row-end-4",
    titleSize: "text-[20px] sm:text-[24px] lg:text-[26px]",
  },
  {
    id: "corporate-gifting",
    title: "Corporate gifting",
    href: CORPORATE_GIFTING_PATH,
    image: "/images/bilva/collection-corporate-gifting-raw.webp",
    alt: "Custom Engraved Bilwa Corporate Presentation Set",
    desktopCol: "lg:col-start-1 lg:col-end-3",
    desktopRow: "lg:row-start-3 lg:row-end-4",
    titleSize: "text-[20px] sm:text-[24px] lg:text-[26px]",
  },
];
