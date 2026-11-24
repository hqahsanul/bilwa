import { CORPORATE_GIFTING_PATH, GOLD_COINS_AND_BARS_PATH, LAKSHMI_GOLD_COIN_PATH, LAKSHMI_SILVER_COIN_PATH } from "@/lib/bilva-collection-routes";

export const BAG_PATH = "/bag";

export const BAG_PAGE = {
  crumbHome: "Home",
  crumbCurrent: "Your bag",
  title: "Your bag",
  continue: "Continue shopping",
  continueHref: GOLD_COINS_AND_BARS_PATH,
  pricingTitle: "Metal-linked pricing",
  pricingNote: "Prices are indicative until confirmed at checkout.",
  extrasEyebrow: "Optional extras",
  extrasTitle: "Make it yours",
  extrasIntro: "Thoughtful add-ons for gifting, care and long-term value.",
  extrasAction: "View options",
  alsoTitle: "You may also like",
  alsoIntro: "Complement your purchase with these thoughtfully curated options.",
  alsoAction: "View product",
  summaryTitle: "Order summary",
  itemsLabel: "Items",
  deliveryLabel: "Delivery",
  deliveryValue: "Calculated next",
  taxesLabel: "Taxes",
  taxesValue: "Calculated at checkout",
  codeTitle: "Have a code?",
  codePlaceholder: "Enter coupon code",
  codeAction: "Apply",
  offersLabel: "View current offers",
  offersNote: "Example offers — eligibility confirmed at checkout",
  estimateLabel: "Estimated amount",
  estimateNote: "Indicative total · confirmed before payment",
  checkout: "Proceed to checkout",
  secure: "Secure checkout",
  secureNote: "Review final pricing before payment.",
  shipping: "Shipping information",
  assistance: "Need assistance?",
};

export type BagLine = {
  id: string;
  title: string;
  meta: string;
  packaging: string;
  packagingKind: "case" | "gift";
  unitPrice: number;
  quantity: number;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export const BAG_LINES: BagLine[] = [
  {
    id: "lakshmi-gold",
    title: "Lakshmi Gold Coin",
    meta: "24K · 999 · 5 g",
    packaging: "Classic case",
    packagingKind: "case",
    unitPrice: 79450,
    quantity: 1,
    href: LAKSHMI_GOLD_COIN_PATH,
    imageSrc: "/images/bilva/lakshmi-gold/specs-coin.png",
    imageAlt: "Lakshmi gold coin",
  },
  {
    id: "silver-blessings",
    title: "Silver Blessings Coin",
    meta: "999 Silver · 20 g",
    packaging: "Gift presentation",
    packagingKind: "gift",
    unitPrice: 2250,
    quantity: 1,
    href: LAKSHMI_SILVER_COIN_PATH,
    imageSrc: "/images/bilva/lakshmi-gold/related-silver.png",
    imageAlt: "Silver blessings coin in a presentation box",
  },
];

export const BAG_EXTRAS = [
  {
    id: "presentation",
    title: "Premium gift presentation",
    body: "Elevate your gift with Bilwa’s signature presentation.",
    href: CORPORATE_GIFTING_PATH,
    imageSrc: "/images/bilva/corporate/hero.png",
    imageAlt: "Bilwa presentation boxes with a gold band",
  },
  {
    id: "case",
    title: "Care & display case",
    body: "Keep your coin protected and beautifully displayed.",
    href: LAKSHMI_GOLD_COIN_PATH,
    imageSrc: "/images/bilva/corporate/set-milestone-recognition.png",
    imageAlt: "Open Bilwa case beside a closed green box",
  },
];

export const BAG_OFFERS = [
  { id: "wrap", title: "Complimentary gift wrap", detail: "on eligible gifts" },
  { id: "pack", title: "Preferred packaging", detail: "on select coins" },
];

export const BAG_ALSO = [
  {
    id: "silver-coin",
    title: "Silver Coin",
    meta: "999 Silver · 10 g",
    href: LAKSHMI_SILVER_COIN_PATH,
    imageSrc: "/images/bilva/lakshmi-silver/related-ganesha.png",
    imageAlt: "Silver Ganesha coin",
  },
  {
    id: "gift-card",
    title: "Bilwa Gift Card",
    meta: "A thoughtful way to gift choice and tradition.",
    href: CORPORATE_GIFTING_PATH,
    imageSrc: "/images/bilva/corporate/set-partnership-commemorative.png",
    imageAlt: "Bilwa gift presentation",
  },
];
