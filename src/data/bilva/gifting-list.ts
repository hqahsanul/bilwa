import {
  GIFTING_CATALOGUE_PATH,
  GIFTING_ENQUIRY_PATH,
  GIFTING_SIGNATURE_PATH,
  HOME_PATH,
  MAKE_IT_PERSONAL_PATH,
} from "@/lib/bilva-collection-routes";

export type GiftingFilterKey =
  | "occasion"
  | "recipient"
  | "budget"
  | "type"
  | "availability";

export type GiftingListProduct = {
  id: string;
  badge?: string;
  title: string;
  subtitle: string;
  price: string;
  priceValue: number | null;
  imageSrc: string;
  imageAlt: string;
  href: string;
  quoteHref: string;
  facets: Record<GiftingFilterKey, string[]>;
};

export type GiftingListFilterOption = {
  id: string;
  label: string;
};

export type GiftingListFilterGroup = {
  id: GiftingFilterKey;
  label: string;
  options: readonly GiftingListFilterOption[];
};

export type GiftingListMilestone = {
  id: string;
  label: string;
  href: string;
};

export type GiftingSortOption = {
  id: "featured" | "price-asc" | "price-desc" | "name-asc";
  label: string;
};

export const GIFTING_FILTER_GROUPS: readonly GiftingListFilterGroup[] = [
  {
    id: "occasion",
    label: "Occasion",
    options: [
      { id: "birthday", label: "Birthday" },
      { id: "wedding", label: "Wedding" },
      { id: "festivals", label: "Festivals" },
      { id: "milestones", label: "Milestones" },
      { id: "client", label: "Client gifting" },
      { id: "corporate", label: "Corporate" },
    ],
  },
  {
    id: "recipient",
    label: "Recipient",
    options: [
      { id: "family", label: "Family" },
      { id: "friends", label: "Friends" },
      { id: "colleagues", label: "Colleagues" },
      { id: "clients", label: "Clients" },
      { id: "leadership", label: "Leadership" },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    options: [
      { id: "under-10k", label: "Under ₹10,000" },
      { id: "10k-20k", label: "₹10,000–₹20,000" },
      { id: "over-20k", label: "₹20,000+" },
      { id: "custom", label: "Custom quote" },
    ],
  },
  {
    id: "type",
    label: "Metal / type",
    options: [
      { id: "gold-coin", label: "Gold coin" },
      { id: "silver-coin", label: "Silver coin" },
      { id: "silver-bar", label: "Silver bar" },
      { id: "gift-set", label: "Gift set" },
      { id: "mixed", label: "Mixed metals" },
    ],
  },
  {
    id: "availability",
    label: "Availability",
    options: [
      { id: "ready", label: "Ready to gift" },
      { id: "made-to-order", label: "Made to order" },
      { id: "enquiry", label: "Enquiry only" },
    ],
  },
];

export const GIFTING_SORT_OPTIONS: readonly GiftingSortOption[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name A–Z" },
];

const quoteHref = GIFTING_ENQUIRY_PATH;

export const GIFTING_LIST_DATA = {
  hero: {
    breadcrumbHome: "Home",
    breadcrumbHomeHref: HOME_PATH,
    breadcrumbCurrent: "Gifting",
    eyebrow: "GIFTS WITH MEANING",
    title: "Give something timeless",
    description:
      "Precious pieces made for milestones, celebrations and the people who matter.",
    primaryCta: "Explore gifts",
    primaryCtaHref: "#collection",
    secondaryCta: "Shop by occasion",
    secondaryCtaHref: "#occasions",
    trustLabels: [
      "Thoughtful presentation",
      "Meaningful choices",
      "Legacy of trust",
    ] as const,
    imageSrc: "/images/bilva/gifting-hero.png",
    imageAlt:
      "Open cream gift box with gold BILWA coin, satin ribbon on stone against cream silk",
  },

  strip: {
    title: "THE ART OF GIFTING",
    items: [
      { id: "occasion", label: "Gift by occasion", icon: "gift" as const },
      { id: "presentation", label: "Thoughtful presentation", icon: "bow" as const },
      { id: "budget", label: "Choose a budget", icon: "coins" as const },
    ],
    cta: "Gifting guide",
    ctaHref: MAKE_IT_PERSONAL_PATH,
  },

  milestone: {
    title: "Find the perfect gift",
    imageSrc: "/images/bilva/gifting-hero-alt-2.png",
    imageAlt: "Gold coin in open gift box with ribbon and baby's-breath flowers",
    chips: [
      { id: "birthday", label: "Birthday", href: `${GIFTING_CATALOGUE_PATH}#collection` },
      { id: "wedding", label: "Wedding", href: `${GIFTING_CATALOGUE_PATH}#collection` },
      { id: "festivals", label: "Festivals", href: `${GIFTING_CATALOGUE_PATH}#collection` },
      { id: "under-10k", label: "Under ₹10,000", href: `${GIFTING_CATALOGUE_PATH}#collection` },
      { id: "all", label: "All gifts", href: `${GIFTING_CATALOGUE_PATH}#collection` },
    ] as GiftingListMilestone[],
  },

  discover: {
    title: "Discover the collection",
    subtitle: "Choose by occasion, recipient and budget.",
    filtersCaption: "Illustrative catalogue filters",
    productsCaption: "Illustrative products and prices — final catalogue pending.",
    clearFilters: "Clear filters",
    sortPrefix: "Sort by:",
    emptyResults: "No pieces match these filters. Clear filters to see the full collection.",
    filters: GIFTING_FILTER_GROUPS,
    sortOptions: GIFTING_SORT_OPTIONS,
    bulkNote: "Bulk orders quoted individually.",
  },

  products: [
    {
      id: "executive-silver-coin-set",
      title: "Executive Silver Coin Set",
      subtitle: "Silver · Presentation box",
      price: "Price on enquiry",
      priceValue: null,
      imageSrc: "/images/bilva/bestseller-silver-coin-master.webp",
      imageAlt: "Silver coin on green velvet in cream presentation box",
      href: GIFTING_SIGNATURE_PATH,
      quoteHref,
      facets: {
        occasion: ["Milestones", "Corporate", "Client gifting"],
        recipient: ["Colleagues", "Leadership", "Clients"],
        budget: ["Custom quote", "₹10,000–₹20,000"],
        type: ["Silver coin", "Gift set"],
        availability: ["Enquiry only", "Made to order"],
      },
    },
    {
      id: "client-appreciation-gift",
      badge: "Client gifting",
      title: "Client Appreciation Gift",
      subtitle: "Gold coin · Gift box",
      price: "Price on enquiry",
      priceValue: null,
      imageSrc: "/images/bilva/bestseller-gold-coin-master.webp",
      imageAlt: "Gold coin on green velvet with ribboned gift box",
      href: GIFTING_SIGNATURE_PATH,
      quoteHref,
      facets: {
        occasion: ["Client gifting", "Milestones", "Corporate"],
        recipient: ["Clients", "Leadership"],
        budget: ["Custom quote", "₹10,000–₹20,000"],
        type: ["Gold coin"],
        availability: ["Enquiry only"],
      },
    },
    {
      id: "team-milestone-silver",
      title: "Team Milestone Silver",
      subtitle: "Silver bar · Gift set",
      price: "Price on enquiry",
      priceValue: null,
      imageSrc: "/images/bilva/bestseller-gold-bar-master.webp",
      imageAlt: "999 silver bar in gift presentation box",
      href: GIFTING_SIGNATURE_PATH,
      quoteHref,
      facets: {
        occasion: ["Milestones", "Corporate", "Festivals"],
        recipient: ["Colleagues", "Leadership"],
        budget: ["Under ₹10,000", "Custom quote"],
        type: ["Silver bar", "Gift set"],
        availability: ["Made to order", "Enquiry only"],
      },
    },
    {
      id: "festive-recognition-set",
      badge: "Festive gifting",
      title: "Festive Recognition Set",
      subtitle: "Mixed coins · Gift set",
      price: "Price on enquiry",
      priceValue: null,
      imageSrc: "/images/bilva/signature-celebration-gift-set-2x.webp",
      imageAlt: "Gold and silver coins in festive gift box",
      href: GIFTING_SIGNATURE_PATH,
      quoteHref,
      facets: {
        occasion: ["Festivals", "Birthday", "Wedding"],
        recipient: ["Family", "Friends", "Colleagues"],
        budget: ["Under ₹10,000", "₹10,000–₹20,000"],
        type: ["Gift set", "Mixed metals", "Gold coin", "Silver coin"],
        availability: ["Ready to gift", "Made to order"],
      },
    },
    {
      id: "leadership-keepsake",
      badge: "Leadership gift",
      title: "Leadership Keepsake",
      subtitle: "Gold coin · Premium case",
      price: "Price on enquiry",
      priceValue: null,
      imageSrc: "/images/bilva/gifting-hero-alt-1.png",
      imageAlt: "Gold coin in premium velvet case",
      href: GIFTING_SIGNATURE_PATH,
      quoteHref,
      facets: {
        occasion: ["Milestones", "Corporate", "Client gifting"],
        recipient: ["Leadership", "Clients"],
        budget: ["₹20,000+", "Custom quote"],
        type: ["Gold coin"],
        availability: ["Enquiry only", "Made to order"],
      },
    },
    {
      id: "corporate-signature-set",
      title: "Corporate Signature Set",
      subtitle: "Gold & silver · Gift box",
      price: "Price on enquiry",
      priceValue: null,
      imageSrc: "/images/bilva/corporate/set-partnership-commemorative.png",
      imageAlt: "Gold and silver coins with ribboned premium gift box",
      href: GIFTING_SIGNATURE_PATH,
      quoteHref,
      facets: {
        occasion: ["Corporate", "Wedding", "Milestones"],
        recipient: ["Clients", "Colleagues", "Leadership"],
        budget: ["Custom quote", "₹20,000+"],
        type: ["Gift set", "Gold coin", "Silver coin", "Mixed metals"],
        availability: ["Enquiry only"],
      },
    },
  ] as GiftingListProduct[],

  scrollCue: {
    title: "Scroll to discover more pieces",
    progressLabel: "6 of 6 pieces loaded · More items appear as you scroll",
  },

  features: [
    {
      id: "selection",
      title: "Thoughtful selection",
      body: "Options for every milestone",
      icon: "award" as const,
    },
    {
      id: "presentation",
      title: "Presentation shown",
      body: "Gift packaging details",
      icon: "gift" as const,
    },
    {
      id: "heritage",
      title: "100+ years",
      body: "Retail heritage",
      icon: "store" as const,
    },
  ],

  reviews: {
    title: "Words from our customers",
    sampleNote: "Sample review layout — replace with verified customer feedback",
    cards: [
      {
        id: "r1",
        quote: "[Verified offline customer review goes here]",
        meta: "Offline-store review · awaiting approval",
      },
      {
        id: "r2",
        quote: "[Verified offline customer review goes here]",
        meta: "Offline-store review · awaiting approval",
      },
    ],
  },

  cta: {
    eyebrow: "BILWA",
    title: "Make the moment unforgettable.",
    body: "Find a precious piece for someone who matters.",
    primary: "Explore gifts",
    primaryHref: "#collection",
    secondary: "Shop by occasion",
    secondaryHref: "#occasions",
    imageSrc: "/images/bilva/collection-premium-gifting-raw.webp",
    imageAlt: "Cream gift box with gold ribbon and gold BILWA coin on green velvet",
  },

  actions: {
    requestQuoteLabel: "Request quote",
    viewDetailsLabel: "View details",
  },
} as const;