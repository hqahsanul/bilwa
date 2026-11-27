import {
  BAG_PATH,
  CONTACT_PATH,
  CORPORATE_ENQUIRY_PATH,
  CORPORATE_GIFTING_PATH,
  GEMSTONES_PATH,
  GIFTING_PATH,
  GOLD_COINS_AND_BARS_PATH,
  LOGIN_PATH,
  MY_ACCOUNT_PATH,
  MY_BILWA_PATH,
  OUR_STORY_PATH,
  POLICIES_PATH,
  PRIVACY_PATH,
  REFUND_PATH,
  RUDRAKSH_COLLECTION_PATH,
  SILVER_COINS_AND_BARS_PATH,
  TERMS_PATH,
  WISHLIST_PATH,
} from "@/lib/bilva-collection-routes";

export type FooterLink = { label: string; href: string };

export const FOOTER_SHOP_LINKS: readonly FooterLink[] = [
  { label: "Gold coins & bars", href: GOLD_COINS_AND_BARS_PATH },
  { label: "Silver coins & bars", href: SILVER_COINS_AND_BARS_PATH },
  { label: "Rudraksh", href: RUDRAKSH_COLLECTION_PATH },
  { label: "Gemstones", href: GEMSTONES_PATH },
  { label: "Premium gifting", href: GIFTING_PATH },
  { label: "Corporate gifting", href: CORPORATE_GIFTING_PATH },
];

export const FOOTER_CARE_LINKS: readonly FooterLink[] = [
  { label: "Contact support", href: CONTACT_PATH },
  { label: "Track an order", href: MY_BILWA_PATH },
  { label: "Shipping & delivery", href: POLICIES_PATH },
  { label: "Returns & refunds", href: REFUND_PATH },
  { label: "FAQs", href: POLICIES_PATH },
];

export const FOOTER_ACCOUNT_LINKS: readonly FooterLink[] = [
  { label: "Sign in", href: LOGIN_PATH },
  { label: "My orders", href: MY_BILWA_PATH },
  { label: "Wishlist", href: WISHLIST_PATH },
  { label: "Addresses", href: MY_ACCOUNT_PATH },
  { label: "Documents", href: MY_ACCOUNT_PATH },
];

export const FOOTER_ABOUT_LINKS: readonly FooterLink[] = [
  { label: "Our story", href: OUR_STORY_PATH },
  { label: "Our approach", href: OUR_STORY_PATH },
  { label: "Why Bilwa", href: OUR_STORY_PATH },
  { label: "Corporate enquiries", href: CORPORATE_ENQUIRY_PATH },
];

export const FOOTER_LEGAL_LINKS: readonly FooterLink[] = [
  { label: "Pricing explained", href: POLICIES_PATH },
  { label: "Product authenticity", href: POLICIES_PATH },
  { label: "Privacy policy", href: PRIVACY_PATH },
  { label: "Terms & conditions", href: TERMS_PATH },
];

export const FOOTER_PRE_CTA = {
  eyebrow: "THE NEXT CHAPTER IS YOURS",
  headline: "Find something worth keeping.",
  subcopy: "Explore thoughtfully chosen precious pieces and meaningful gifts.",
  primary: { label: "Explore collections", href: GOLD_COINS_AND_BARS_PATH },
  secondary: { label: "Talk to us", href: CONTACT_PATH },
  imageSrc: "/images/bilva/footer-cta-master.webp",
  imageAlt: "Bilwa gold and silver presentation pieces",
} as const;
