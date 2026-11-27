import {
  LAKSHMI_SILVER_COIN_PATH,
  SILVER_COINS_AND_BARS_PATH,
} from "@/lib/bilva-collection-routes";
import type { GoldCollectionProduct } from "./gold-collection-products";
import { GOLD_BROWSE_CHIPS, GOLD_COLLECTION_PRODUCTS } from "./gold-collection-products";

/** Reuse gold catalogue photography for silver marketing until silver-specific assets ship. */
const GOLD_IMAGES = {
  coinA: "/images/bilva/bestseller-gold-coin-master.webp",
  coinB: "/images/bilva/bestseller-clean-gold-coin.webp",
  barA: "/images/bilva/bestseller-gold-bar-master.webp",
  coinC: "/images/bilva/signature-first-gold-coin.webp",
  coinD: "/images/bilva/bestseller-gold-denominations-master.webp",
  barB: "/images/bilva/bestseller-gold-bar.webp",
  hero: "/images/bilva/banner-exact-gold-2x.jpg",
  cta: "/images/bilva/prefooter-lakshmi-ganesha-coins-raw.webp",
} as const;

export type MetalCollectionHeroConfig = {
  breadcrumbCurrent: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  trustLabels: [string, string, string];
  heroImageSrc: string;
  heroImageAlt: string;
};

export type MetalCollectionTickerConfig = {
  label: string;
  badge: string;
  pricePerGram: string;
  changeLabel: string;
};

export type MetalCollectionBrowseConfig = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  chips: readonly { label: string; href: string }[];
};

export type MetalCollectionCtaConfig = {
  headline: string;
  subcopy: string;
  primaryCta: string;
  secondaryCta: string;
  imageSrc: string;
};

export type MetalCollectionAssuranceItem = {
  title: string;
  titleLines?: readonly [string, string];
  body: string;
};

export type MetalCollectionAssuranceVariant = "gold" | "silver";

export type MetalCollectionPageConfig = {
  metal: "gold" | "silver";
  assuranceVariant: MetalCollectionAssuranceVariant;
  discoverPresetKey: "coins-bars" | "silver-coins-bars";
  products: GoldCollectionProduct[];
  hero: MetalCollectionHeroConfig;
  ticker: MetalCollectionTickerConfig;
  browse: MetalCollectionBrowseConfig;
  cta: MetalCollectionCtaConfig;
  assuranceItems: readonly MetalCollectionAssuranceItem[];
  /** Pre-footer gradient CTA above main footer columns */
  showCollectionCta: boolean;
  /** “Find something worth keeping” strip inside BilvaFooter */
  showFooterPreCta: boolean;
  /** Emerald footer spans viewport (silver collection HTML mock) */
  footerFullBleed?: boolean;
};

export const GOLD_METAL_PAGE_CONFIG: MetalCollectionPageConfig = {
  metal: "gold",
  assuranceVariant: "gold",
  discoverPresetKey: "coins-bars",
  showCollectionCta: true,
  showFooterPreCta: true,
  products: GOLD_COLLECTION_PRODUCTS,
  hero: {
    breadcrumbCurrent: "Gold coins & bars",
    eyebrow: "The gold collection",
    title: "Gold coins & bars",
    description:
      "Thoughtfully chosen gold for gifting, celebration and keeping. Explore artistry in every weight.",
    primaryCta: "Explore gold coins",
    secondaryCta: "View gold bars",
    trustLabels: ["24K / 999", "Thoughtful craftsmanship", "Legacy of trust"],
    heroImageSrc: GOLD_IMAGES.hero,
    heroImageAlt: "Gold coins and bars from the Bilwa collection",
  },
  ticker: {
    label: "Today's gold reference · 24K (999)",
    badge: "Illustrative data · Not a live quote",
    pricePerGram: "₹12,450 / g",
    changeLabel: "−₹80 (−0.64%) vs yesterday",
  },
  browse: {
    title: "Browse gold your way",
    imageSrc: GOLD_IMAGES.hero,
    imageAlt: "Browse gold coins and bars",
    chips: GOLD_BROWSE_CHIPS,
  },
  cta: {
    headline: "Find a piece worth keeping.",
    subcopy: "Thoughtful gold for every milestone and new beginning.",
    primaryCta: "Explore gold coins",
    secondaryCta: "Discover gold bars",
    imageSrc: GOLD_IMAGES.cta,
  },
  assuranceItems: [
    { title: "100+ years", body: "Retail precious-metal heritage" },
    { title: "24K / 999", body: "Purity displayed with each item" },
    {
      title: "Transparent pricing",
      titleLines: ["Transparent", "pricing"],
      body: "Weight and rate details before purchase",
    },
  ],
};

const SILVER_BROWSE_CHIPS = [
  { label: "Silver coins", href: `${SILVER_COINS_AND_BARS_PATH}#collection` },
  { label: "Silver bars", href: `${SILVER_COINS_AND_BARS_PATH}#collection` },
  { label: "Under 10 g", href: `${SILVER_COINS_AND_BARS_PATH}#collection` },
  { label: "10–50 g", href: `${SILVER_COINS_AND_BARS_PATH}#collection` },
  { label: "50 g & above", href: `${SILVER_COINS_AND_BARS_PATH}#collection` },
] as const;

export const SILVER_COLLECTION_PRODUCTS: GoldCollectionProduct[] = [
  {
    id: "bilwa-leaf-silver-coin",
    title: "Bilwa Leaf Silver Coin",
    subtitle: "999 fine silver · 10 g",
    price: "₹1,450",
    image: GOLD_IMAGES.coinA,
    alt: "Bilwa Leaf Silver Coin 10 g",
    href: LAKSHMI_SILVER_COIN_PATH,
  },
  {
    id: "heritage-silver-coin",
    title: "Heritage Silver Coin",
    subtitle: "999 fine silver · 20 g",
    price: "₹2,900",
    image: GOLD_IMAGES.coinB,
    alt: "Heritage Silver Coin 20 g",
    href: LAKSHMI_SILVER_COIN_PATH,
  },
  {
    id: "classic-silver-bar",
    title: "Classic Silver Bar",
    subtitle: "999 fine silver · 50 g",
    price: "₹7,250",
    image: GOLD_IMAGES.barA,
    alt: "Classic Silver Bar 50 g",
    href: SILVER_COINS_AND_BARS_PATH,
  },
  {
    id: "sacred-motif-silver-coin",
    title: "Sacred Motif Silver Coin",
    subtitle: "999 fine silver · 25 g",
    price: "₹3,625",
    image: GOLD_IMAGES.coinC,
    alt: "Sacred Motif Silver Coin 25 g",
    href: LAKSHMI_SILVER_COIN_PATH,
  },
  {
    id: "small-beginnings-silver",
    title: "Small Beginnings Silver Coin",
    subtitle: "999 fine silver · 5 g",
    price: "₹725",
    image: GOLD_IMAGES.coinD,
    alt: "Small Beginnings Silver Coin 5 g",
    href: LAKSHMI_SILVER_COIN_PATH,
  },
  {
    id: "artisan-silver-bar",
    title: "Artisan Silver Bar",
    subtitle: "999 fine silver · 100 g",
    price: "₹14,500",
    image: GOLD_IMAGES.barB,
    alt: "Artisan Silver Bar 100 g",
    href: SILVER_COINS_AND_BARS_PATH,
  },
];

export const SILVER_METAL_PAGE_CONFIG: MetalCollectionPageConfig = {
  metal: "silver",
  assuranceVariant: "silver",
  discoverPresetKey: "silver-coins-bars",
  showCollectionCta: true,
  showFooterPreCta: false,
  footerFullBleed: false,
  products: SILVER_COLLECTION_PRODUCTS,
  hero: {
    breadcrumbCurrent: "Silver coins & bars",
    eyebrow: "The silver collection",
    title: "Silver coins & bars",
    description:
      "Timeless silver, thoughtfully crafted for gifting, collecting and meaningful beginnings.",
    primaryCta: "Explore silver coins",
    secondaryCta: "View silver bars",
    trustLabels: ["999 fine silver", "Thoughtful craftsmanship", "Legacy of trust"],
    heroImageSrc: GOLD_IMAGES.hero,
    heroImageAlt: "Silver coins and bars from the Bilwa collection",
  },
  ticker: {
    label: "Silver reference · 999 fine",
    badge: "Illustrative data · Not a live quote",
    pricePerGram: "₹145 / g",
    changeLabel: "−₹2 (−1.36%) vs yesterday",
  },
  browse: {
    title: "Browse silver your way",
    imageSrc: GOLD_IMAGES.hero,
    imageAlt: "Browse silver coins and bars",
    chips: SILVER_BROWSE_CHIPS,
  },
  cta: {
    headline: "Silver worth\nremembering.",
    subcopy: "For gifting, collecting and meaningful beginnings.",
    primaryCta: "Explore silver coins",
    secondaryCta: "Discover silver bars",
    imageSrc: "/images/bilva/collection-silver-cta-photo.png",
  },
  assuranceItems: [
    { title: "100+ years", body: "Retail precious-metal heritage" },
    { title: "999 fine silver", body: "Purity displayed with each item" },
    { title: "Clear weights", body: "Specifications before purchase" },
  ],
};