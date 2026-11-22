import {
  GOLD_COINS_AND_BARS_PATH,
  SILVER_COINS_AND_BARS_PATH,
  RUDRAKSH_COLLECTION_PATH,
} from "@/lib/bilva-collection-routes";

export type FooterLink = { label: string; href: string };

export const FOOTER_SHOP_LINKS: readonly FooterLink[] = [
  { label: "Gold coins & bars", href: GOLD_COINS_AND_BARS_PATH },
  { label: "Silver coins & bars", href: SILVER_COINS_AND_BARS_PATH },
  { label: "Rudraksh", href: RUDRAKSH_COLLECTION_PATH },
  { label: "Gemstones", href: "#gemstones" },
  { label: "Premium gifting", href: "#premium-gifting" },
  { label: "Corporate gifting", href: "#corporate-gifting" },
];

export const FOOTER_CARE_LINKS: readonly FooterLink[] = [
  { label: "Contact support", href: "#contact-support" },
  { label: "Track an order", href: "#track-an-order" },
  { label: "Shipping & delivery", href: "#shipping-delivery" },
  { label: "Returns & refunds", href: "/refund" },
  { label: "FAQs", href: "#faqs" },
];

export const FOOTER_ACCOUNT_LINKS: readonly FooterLink[] = [
  { label: "Sign in", href: "#sign-in" },
  { label: "Orders", href: "#orders" },
  { label: "Wishlist", href: "#wishlist" },
];

export const FOOTER_ABOUT_LINKS: readonly FooterLink[] = [
  { label: "Our story", href: "#our-story" },
  { label: "Craft & purity", href: "#purity" },
  { label: "Stores", href: "#stores" },
];

export const FOOTER_LEGAL_LINKS: readonly FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export const FOOTER_PRE_CTA = {
  eyebrow: "THE NEXT CHAPTER IS YOURS",
  headline: "Find something worth keeping.",
  subcopy: "Explore thoughtfully chosen precious pieces and meaningful gifts.",
  primary: { label: "Explore collections", href: "#explore-collections" },
  secondary: { label: "Talk to us", href: "#contact-us" },
  imageSrc: "/images/bilva/footer-cta-master.webp",
  imageAlt: "Bilwa gold and silver presentation pieces",
} as const;