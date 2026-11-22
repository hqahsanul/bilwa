export type SignatureFeaturedPiece = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type SignatureStackPiece = SignatureFeaturedPiece & {
  cardTone: "cream" | "sage";
};

export const SIGNATURE_FEATURED: SignatureFeaturedPiece = {
  id: "heritage-gold-coin",
  badge: "01 / SIGNATURE",
  title: "The Heritage Gold Coin",
  subtitle: "24K (999) · 5 g",
  price: "₹62,250",
  href: "#heritage-gold-coin",
  imageSrc: "/images/bilva/signature-heritage-gold-tree-2x.webp",
  imageAlt: "The Heritage Gold Coin 24K (999) 5g with Tree of Life",
};

export const SIGNATURE_STACK: readonly SignatureStackPiece[] = [
  {
    id: "first-gold-coin",
    badge: "02 / SIGNATURE",
    title: "The First Gold Coin",
    subtitle: "24K (999) · 0.5 g",
    price: "₹6,225",
    href: "#first-gold-coin",
    imageSrc: "/images/bilva/signature-first-gold-coin-2x.webp",
    imageAlt: "The First Gold Coin 24K (999) 0.5g",
    cardTone: "cream",
  },
  {
    id: "silver-keepsake-coin",
    badge: "03 / SIGNATURE",
    title: "Silver Keepsake Coin",
    subtitle: "Silver 999 · 10 g",
    price: "₹1,650",
    href: "#silver-keepsake-coin",
    imageSrc: "/images/bilva/signature-silver-peacock-coin-2x.webp",
    imageAlt: "Silver Keepsake Coin 999 10g with Peacock Motif",
    cardTone: "sage",
  },
  {
    id: "celebration-gift-set",
    badge: "04 / SIGNATURE",
    title: "The Celebration Gift Set",
    subtitle: "Curated gift set",
    price: "₹15,900",
    href: "#celebration-gift-set",
    imageSrc: "/images/bilva/signature-celebration-gift-set-2x.webp",
    imageAlt: "The Celebration Gift Set in Emerald Presentation Box",
    cardTone: "cream",
  },
];

export const SIGNATURE_SECTION = {
  eyebrow: "DESIGNED TO BE TREASURED",
  headline: "The Bilwa Signature Collection",
  subcopy: "Distinctive pieces for the moments that matter.",
  exploreAllHref: "#all-signature-pieces",
  exploreAllLabel: "Explore all pieces",
  footnote: "Illustrative product names and prices for layout preview.",
} as const;