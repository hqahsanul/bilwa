import {
  CORPORATE_GIFTING_PATH,
  CORPORATE_ENQUIRY_PATH,
  GEMSTONES_PATH,
  GIFTING_PATH,
  GIFTING_SIGNATURE_PATH,
  GOLD_COINS_AND_BARS_PATH,
  LOGIN_PATH,
  MAKE_IT_PERSONAL_PATH,
  MY_ACCOUNT_PATH,
  MY_BILWA_PATH,
  OUR_STORY_PATH,
  POLICIES_PATH,
  RUDRAKSH_COLLECTION_PATH,
  SILVER_COINS_AND_BARS_PATH,
} from "@/lib/bilva-collection-routes";

export type NavPrimaryItem = {
  label: string;
  hasDropdown: boolean;
  href: string;
};

export const NAV_ANNOUNCEMENT = "Precious pieces. Thoughtfully chosen.";

export const NAV_PRIMARY_ITEMS: readonly NavPrimaryItem[] = [
  { label: "Gold & Silver", hasDropdown: true, href: GOLD_COINS_AND_BARS_PATH },
  { label: "Rudraksh", hasDropdown: true, href: RUDRAKSH_COLLECTION_PATH },
  { label: "Gemstones", hasDropdown: true, href: GEMSTONES_PATH },
  { label: "Gifting", hasDropdown: true, href: GIFTING_PATH },
  { label: "Corporate Gifting", hasDropdown: false, href: CORPORATE_GIFTING_PATH },
  { label: "Our Story", hasDropdown: false, href: OUR_STORY_PATH },
];

export const NAV_GOLD_SILVER_LINKS = [
  { label: "Gold coins & bars", href: GOLD_COINS_AND_BARS_PATH },
  { label: "Silver coins & bars", href: SILVER_COINS_AND_BARS_PATH },
] as const;

export const NAV_GUIDE_LINKS = {
  goldSilver: [
    { label: "Understand Purity", href: POLICIES_PATH },
    { label: "How Metal Pricing Works", href: POLICIES_PATH },
  ],
  rudraksh: [
    { label: "Rudraksh Guide", href: `${RUDRAKSH_COLLECTION_PATH}#rudraksh-guide` },
    { label: "Understanding Certification", href: `${RUDRAKSH_COLLECTION_PATH}#understanding-certification` },
  ],
  gemstones: [
    { label: "Gemstone Buying Guide", href: POLICIES_PATH },
    { label: "Understanding Reports", href: POLICIES_PATH },
  ],
  gifting: [
    { label: "Gifting Guide", href: MAKE_IT_PERSONAL_PATH },
    { label: "Corporate Gifting", href: CORPORATE_GIFTING_PATH },
  ],
} as const;

export const NAV_GIFTING_PERSONALISE = [
  { label: "Engravable Coins", href: MAKE_IT_PERSONAL_PATH },
  { label: "Curated Gift Boxes", href: `${GIFTING_PATH}#collection` },
  { label: "Gift Packaging", href: GIFTING_SIGNATURE_PATH },
  { label: "Personal Messages", href: MAKE_IT_PERSONAL_PATH },
  { label: "Corporate Enquiries", href: CORPORATE_ENQUIRY_PATH },
] as const;

export type NavAccountMenuItem = {
  id: string;
  label: string;
  href: string;
  isLogout?: boolean;
};

/** Account icon dropdown — mirrors My Bilwa sections + logout. */
export const NAV_ACCOUNT_MENU: readonly NavAccountMenuItem[] = [
  { id: "overview", label: "Overview", href: MY_BILWA_PATH },
  { id: "orders", label: "My orders", href: `${MY_BILWA_PATH}#latest-order` },
  { id: "account", label: "My account", href: MY_ACCOUNT_PATH },
  { id: "certificates", label: "Certificates", href: `${MY_BILWA_PATH}#documents` },
  { id: "addresses", label: "Addresses", href: `${MY_BILWA_PATH}#quick-links` },
  { id: "logout", label: "Log out", href: LOGIN_PATH, isLogout: true },
];
