import {
  GOLD_COINS_AND_BARS_PATH,
  SILVER_COINS_AND_BARS_PATH,
  RUDRAKSH_COLLECTION_PATH,
} from "@/lib/bilva-collection-routes";

export type NavPrimaryItem = {
  label: string;
  hasDropdown: boolean;
  href?: string;
};

export const NAV_ANNOUNCEMENT = "Precious pieces. Thoughtfully chosen.";

export const NAV_PRIMARY_ITEMS: readonly NavPrimaryItem[] = [
  { label: "Gold & Silver", hasDropdown: true },
  { label: "Rudraksh", hasDropdown: true },
  { label: "Gemstones", hasDropdown: true },
  { label: "Gifting", hasDropdown: true },
  { label: "Corporate Gifting", hasDropdown: false, href: "#corporate-gifting" },
  { label: "Our Story", hasDropdown: false, href: "#our-story" },
];

export const NAV_GOLD_SILVER_LINKS = [
  { label: "Gold coins & bars", href: GOLD_COINS_AND_BARS_PATH },
  { label: "Silver coins & bars", href: SILVER_COINS_AND_BARS_PATH },
] as const;

export const NAV_GUIDE_LINKS = {
  goldSilver: [
    { label: "Understand Purity", href: "#purity" },
    { label: "How Metal Pricing Works", href: "#pricing-works" },
  ],
  rudraksh: [
    { label: "Rudraksh Guide", href: `${RUDRAKSH_COLLECTION_PATH}#rudraksh-guide` },
    { label: "Understanding Certification", href: `${RUDRAKSH_COLLECTION_PATH}#understanding-certification` },
  ],
  gemstones: [
    { label: "Gemstone Buying Guide", href: "#gemstone-guide" },
    { label: "Understanding Reports", href: "#understanding-reports" },
  ],
  gifting: [
    { label: "Gifting Guide", href: "#gifting-guide" },
    { label: "Corporate Gifting", href: "#corporate-gifting" },
  ],
} as const;