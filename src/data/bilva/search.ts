import {
  GOLD_COINS_AND_BARS_PATH,
  GIFTING_PATH,
  LAKSHMI_GOLD_COIN_PATH,
  LAKSHMI_SILVER_COIN_PATH,
  RUDRAKSH_COLLECTION_PATH,
  SILVER_COINS_AND_BARS_PATH,
} from "@/lib/bilva-collection-routes";

export const SEARCH_SUGGESTIONS = [
  "1 g gold coin",
  "5 g gold coin",
  "Silver bars",
  "Rudraksh",
  "Gold bars",
  "Gemstone gifts",
] as const;

export const SEARCH_CATEGORIES = [
  { label: "Gold Coins", href: GOLD_COINS_AND_BARS_PATH },
  { label: "Gold Bars", href: GOLD_COINS_AND_BARS_PATH },
  { label: "Gifting", href: GIFTING_PATH },
  { label: "Silver Coins", href: SILVER_COINS_AND_BARS_PATH },
  { label: "Rudraksh", href: RUDRAKSH_COLLECTION_PATH },
] as const;

export const SEARCH_PREVIEW_PRODUCTS = [
  {
    id: "coin",
    label: "Illustrative product",
    href: LAKSHMI_GOLD_COIN_PATH,
    image: "/images/bilva/bestseller-gold-coin-clean.webp",
    alt: "Bilwa gold coin",
  },
  {
    id: "bar",
    label: "Illustrative product",
    href: LAKSHMI_SILVER_COIN_PATH,
    image: "/images/bilva/bestseller-gold-bar.webp",
    alt: "Bilwa gold bar",
  },
] as const;

export const SEARCH_DEFAULT_QUERY_LABEL = "gold coin";
