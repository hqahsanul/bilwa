import {
  GOLD_COINS_AND_BARS_PATH,
  LAKSHMI_GOLD_COIN_PATH,
  SILVER_COINS_AND_BARS_PATH,
} from "@/lib/bilva-collection-routes";

export interface SearchResultProduct {
  id: string;
  grams: number;
  price: number;
  title: string;
  purity: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface SearchPriceBand {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface SearchCategoryPill {
  id: string;
  label: string;
  href: string;
}

export const SEARCH_RESULTS_DATA = {
  heading: "Search Results",
  lead: "Discover gold, silver and spiritual valuables from Bilwa",
  defaultQuery: "gold coin",
  didYouMeanLabel: "Did you mean:",
  didYouMeanQuery: "gold coins",
  relatedLabel: "Explore related categories:",

  categories: [
    { id: "gold-coins", label: "Gold coins", href: GOLD_COINS_AND_BARS_PATH },
    { id: "gold-bars", label: "Gold bars", href: GOLD_COINS_AND_BARS_PATH },
    {
      id: "silver-coins",
      label: "Silver coins",
      href: SILVER_COINS_AND_BARS_PATH,
    },
    { id: "gifting", label: "Gifting", href: "/make-it-personal" },
  ] as SearchCategoryPill[],

  products: [
    {
      id: "gold-coin-1g",
      grams: 1,
      price: 11500,
      title: "Bilwa Gold Coin – 1 Gram",
      purity: "24K (999) Gold",
      href: LAKSHMI_GOLD_COIN_PATH,
      imageSrc: "/images/bilva/bestseller-clean-gold-coin.webp",
      imageAlt: "Bilwa Gold Coin 1 Gram",
    },
    {
      id: "gold-coin-2g",
      grams: 2,
      price: 23000,
      title: "Bilwa Gold Coin – 2 Gram",
      purity: "24K (999) Gold",
      href: LAKSHMI_GOLD_COIN_PATH,
      imageSrc: "/images/bilva/bestseller-gold-coin-clean.webp",
      imageAlt: "Bilwa Gold Coin 2 Gram",
    },
    {
      id: "gold-coin-5g",
      grams: 5,
      price: 57500,
      title: "Bilwa Gold Coin – 5 Gram",
      purity: "24K (999) Gold",
      href: LAKSHMI_GOLD_COIN_PATH,
      imageSrc: "/images/bilva/gold-coin-24k-master.png",
      imageAlt: "Bilwa Gold Coin 5 Gram",
    },
    {
      id: "gold-coin-10g",
      grams: 10,
      price: 115000,
      title: "Bilwa Gold Coin – 10 Gram",
      purity: "24K (999) Gold",
      href: LAKSHMI_GOLD_COIN_PATH,
      imageSrc: "/images/bilva/lakshmi-gold/specs-coin.png",
      imageAlt: "Bilwa Gold Coin 10 Gram",
    },
    {
      id: "gold-coin-20g",
      grams: 20,
      price: 230000,
      title: "Bilwa Gold Coin – 20 Gram",
      purity: "24K (999) Gold",
      href: LAKSHMI_GOLD_COIN_PATH,
      imageSrc: "/images/bilva/lakshmi-gold/hero-coin.png",
      imageAlt: "Bilwa Gold Coin 20 Gram",
    },
    {
      id: "gold-coin-50g",
      grams: 50,
      price: 575000,
      title: "Bilwa Gold Coin – 50 Gram",
      purity: "24K (999) Gold",
      href: LAKSHMI_GOLD_COIN_PATH,
      imageSrc: "/images/bilva/bestseller-gold-coin-master.webp",
      imageAlt: "Bilwa Gold Coin 50 Gram",
    },
  ] as SearchResultProduct[],

  priceBands: [
    { id: "below-25k", label: "Below ₹25,000", min: 0, max: 25000 },
    { id: "25k-50k", label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
    { id: "50k-100k", label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
    {
      id: "above-100k",
      label: "Above ₹1,00,000",
      min: 100000,
      max: Number.POSITIVE_INFINITY,
    },
  ] as SearchPriceBand[],

  defaultChips: [
    { id: "coins", label: "Coins" },
    { id: "gold", label: "Gold" },
    { id: "24k", label: "24K (999)" },
    { id: "instock", label: "In stock" },
  ],

  sortOptions: [
    { value: "rel", label: "Relevance" },
    { value: "lo", label: "Price: Low to High" },
    { value: "hi", label: "Price: High to Low" },
  ] as const,

  helpCta: {
    heading: "Can’t find what you’re looking for?",
    description:
      "Our experts can help you find the right gold coin, size or option for your need, including custom and bulk requirements.",
    ctaLabel: "Ask Bilwa",
    ctaHref: "/contact",
    imageSrc: "/images/bilva/legacy-story-workshop.png",
    imageAlt: "Bilwa master craftsperson workshop",
  },

  assurances: [
    { id: "heritage", label: "100-year retail heritage" },
    { id: "docs", label: "Product-specific documentation" },
    { id: "insured", label: "Insured delivery by Bilwa" },
  ],
};
