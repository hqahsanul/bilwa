import {
  BAG_PATH,
  CORPORATE_ENQUIRY_PATH,
  CORPORATE_GIFTING_PATH,
  CORPORATE_SIGNATURE_PATH,
  HOME_PATH,
} from "@/lib/bilva-collection-routes";

export type CorporateFilterKey =
  | "occasion"
  | "type"
  | "quantity"
  | "budget"
  | "presentation"
  | "availability";

export type CorporateListProduct = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  priceValue: number | null;
  imageSrc: string;
  imageAlt: string;
  href: string;
  facets: Record<CorporateFilterKey, string[]>;
};

export type CorporateListFilterOption = {
  id: string;
  label: string;
};

export type CorporateListFilterGroup = {
  id: CorporateFilterKey;
  label: string;
  options: readonly CorporateListFilterOption[];
};

export type CorporateListMilestone = {
  id: string;
  label: string;
  href: string;
};

export type CorporateSortOption = {
  id: "featured" | "price-asc" | "price-desc" | "name-asc";
  label: string;
};

export const CORPORATE_FILTER_GROUPS: readonly CorporateListFilterGroup[] = [
  {
    id: "occasion",
    label: "Occasion",
    options: [
      { id: "client-gifting", label: "Client gifting" },
      { id: "employee-rewards", label: "Employee rewards" },
      { id: "festive", label: "Festive gifting" },
      { id: "weddings", label: "Weddings" },
      { id: "milestones", label: "Milestones" },
    ],
  },
  {
    id: "type",
    label: "Product type",
    options: [
      { id: "gold-coin", label: "Gold coin" },
      { id: "silver-coin", label: "Silver coin" },
      { id: "silver-bar", label: "Silver bar" },
      { id: "gift-set", label: "Gift set" },
      { id: "rudraksh", label: "Rudraksh" },
    ],
  },
  {
    id: "quantity",
    label: "Quantity",
    options: [
      { id: "under-50", label: "Under 50 units" },
      { id: "50-100", label: "50–100 units" },
      { id: "100-250", label: "100–250 units" },
      { id: "250-plus", label: "250+ units" },
    ],
  },
  {
    id: "budget",
    label: "Budget per gift",
    options: [
      { id: "under-5k", label: "Under ₹5,000" },
      { id: "5k-10k", label: "₹5,000–₹10,000" },
      { id: "10k-20k", label: "₹10,000–₹20,000" },
      { id: "custom", label: "Custom quote" },
    ],
  },
  {
    id: "presentation",
    label: "Presentation",
    options: [
      { id: "gift-box", label: "Gift box" },
      { id: "velvet-case", label: "Velvet case" },
      { id: "gift-set-pack", label: "Gift set packaging" },
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

export const CORPORATE_SORT_OPTIONS: readonly CorporateSortOption[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name A–Z" },
];

export const CORPORATE_LIST_DATA = {
  hero: {
    breadcrumbHome: "Home",
    breadcrumbHomeHref: HOME_PATH,
    breadcrumbCurrent: "Corporate Gifting",
    eyebrow: "CORPORATE GIFTING",
    title: "Recognition, beautifully given",
    description:
      "Distinctive precious-metal gifts for the relationships and achievements worth honouring.",
    primaryCta: "Explore corporate gifting",
    primaryCtaHref: "#collection",
    secondaryCta: "Request a consultation",
    secondaryCtaHref: CORPORATE_ENQUIRY_PATH,
    trustLabels: [
      "Curated gifting options",
      "Considered presentation",
      "Heritage of trust",
    ] as const,
    imageSrc: "/images/bilva/corporate/hero.png",
    imageAlt:
      "Bilwa corporate gift boxes with silver and gold coin set on stone against cream silk",
  },

  strip: {
    title: "CORPORATE GIFTING, MADE SIMPLE",
    items: ["Curated selections", "Bulk quantities", "Custom presentation"] as const,
    cta: "Speak to our team",
    ctaHref: CORPORATE_ENQUIRY_PATH,
  },

  milestone: {
    title: "Gifting for every milestone",
    imageSrc: "/images/bilva/signature-celebration-gift-set-2x.webp",
    imageAlt: "Open Bilwa gift box with gold and silver coins and ribbon",
    chips: [
      { id: "employee", label: "Employee rewards", href: `${CORPORATE_GIFTING_PATH}#collection` },
      { id: "client", label: "Client gifts", href: `${CORPORATE_GIFTING_PATH}#collection` },
      { id: "festive", label: "Festive gifting", href: `${CORPORATE_GIFTING_PATH}#collection` },
      { id: "bulk", label: "Bulk enquiries", href: CORPORATE_ENQUIRY_PATH },
      { id: "all", label: "Explore all", href: `${CORPORATE_GIFTING_PATH}#collection` },
    ] as CorporateListMilestone[],
  },

  discover: {
    title: "Discover the collection",
    subtitle: "Explore gifting options for teams, clients and milestones.",
    filtersCaption: "Illustrative catalogue filters",
    productsCaption: "Illustrative products and prices — final catalogue pending.",
    clearFilters: "Clear filters",
    sortPrefix: "Sort by:",
    emptyResults: "No pieces match these filters. Clear filters to see the full collection.",
    filters: CORPORATE_FILTER_GROUPS,
    sortOptions: CORPORATE_SORT_OPTIONS,
  },

  products: [
    {
      id: "little-gold-keepsake",
      badge: "Celebration",
      title: "Little Gold Keepsake",
      subtitle: "Gold coin · Gift box",
      price: "₹6,225",
      priceValue: 6225,
      imageSrc: "/images/bilva/bestseller-gold-coin-master.webp",
      imageAlt: "Gold coin in cream gift presentation",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Employee rewards", "Festive gifting", "Milestones"],
        type: ["Gold coin"],
        quantity: ["Under 50 units", "50–100 units"],
        budget: ["₹5,000–₹10,000"],
        presentation: ["Gift box"],
        availability: ["Ready to gift"],
      },
    },
    {
      id: "silver-celebration-set",
      badge: "Thoughtful gift",
      title: "Silver Celebration Set",
      subtitle: "Silver coins · Gift box",
      price: "₹4,350",
      priceValue: 4350,
      imageSrc: "/images/bilva/bestseller-silver-coin-master.webp",
      imageAlt: "Two silver coins in gift box",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Client gifting", "Festive gifting", "Employee rewards"],
        type: ["Silver coin", "Gift set"],
        quantity: ["50–100 units", "100–250 units"],
        budget: ["Under ₹5,000"],
        presentation: ["Gift box", "Gift set packaging"],
        availability: ["Ready to gift"],
      },
    },
    {
      id: "wedding-blessing-coin",
      badge: "Celebration",
      title: "Wedding Blessing Coin",
      subtitle: "Gold · Occasion gift",
      price: "₹12,450",
      priceValue: 12450,
      imageSrc: "/images/bilva/signature-first-gold-coin.webp",
      imageAlt: "Gold coin in green velvet case",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Weddings", "Milestones", "Client gifting"],
        type: ["Gold coin"],
        quantity: ["Under 50 units", "50–100 units"],
        budget: ["₹10,000–₹20,000"],
        presentation: ["Velvet case"],
        availability: ["Ready to gift", "Made to order"],
      },
    },
    {
      id: "rudraksh-keepsake",
      badge: "Thoughtful gift",
      title: "Rudraksh Keepsake",
      subtitle: "Rudraksh · Gift presentation",
      price: "₹2,450",
      priceValue: 2450,
      imageSrc: "/images/bilva/bestseller-rudraksh-bracelet-master.webp",
      imageAlt: "Rudraksh bead in gift presentation",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Employee rewards", "Festive gifting", "Client gifting"],
        type: ["Rudraksh"],
        quantity: ["50–100 units", "100–250 units", "250+ units"],
        budget: ["Under ₹5,000"],
        presentation: ["Gift box"],
        availability: ["Ready to gift"],
      },
    },
    {
      id: "milestone-silver-gift",
      badge: "Celebration",
      title: "Milestone Silver Gift",
      subtitle: "Silver bar · Personal gift",
      price: "₹7,250",
      priceValue: 7250,
      imageSrc: "/images/bilva/bestseller-gold-bar-master.webp",
      imageAlt: "999 silver bar in gift box",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Milestones", "Client gifting", "Employee rewards"],
        type: ["Silver bar"],
        quantity: ["Under 50 units", "50–100 units"],
        budget: ["₹5,000–₹10,000"],
        presentation: ["Gift box"],
        availability: ["Ready to gift", "Made to order"],
      },
    },
    {
      id: "signature-gift-box",
      badge: "Thoughtful gift",
      title: "Signature Gift Box",
      subtitle: "Gold & silver · Gift set",
      price: "₹19,500",
      priceValue: 19500,
      imageSrc: "/images/bilva/corporate/set-leadership-appreciation.png",
      imageAlt: "Gold and silver coins and gold bar set",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Client gifting", "Milestones", "Weddings"],
        type: ["Gift set", "Gold coin", "Silver coin"],
        quantity: ["Under 50 units", "50–100 units"],
        budget: ["₹10,000–₹20,000"],
        presentation: ["Gift set packaging"],
        availability: ["Made to order"],
      },
    },
    {
      id: "milestone-recognition",
      badge: "Celebration",
      title: "Milestone Recognition Set",
      subtitle: "For awards & achievements",
      price: "Custom quote",
      priceValue: null,
      imageSrc: "/images/bilva/corporate/set-milestone-recognition.png",
      imageAlt: "Milestone Recognition Set with gold coin in emerald luxury box",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Milestones", "Employee rewards"],
        type: ["Gift set", "Gold coin"],
        quantity: ["50–100 units", "100–250 units", "250+ units"],
        budget: ["Custom quote"],
        presentation: ["Gift set packaging", "Velvet case"],
        availability: ["Enquiry only", "Made to order"],
      },
    },
    {
      id: "partnership-commemorative",
      badge: "Thoughtful gift",
      title: "Partnership Commemorative Set",
      subtitle: "For clients & collaborators",
      price: "Custom quote",
      priceValue: null,
      imageSrc: "/images/bilva/corporate/set-partnership-commemorative.png",
      imageAlt: "Partnership Commemorative Set with silver coin in ribboned box",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Client gifting", "Milestones"],
        type: ["Gift set", "Silver coin"],
        quantity: ["50–100 units", "100–250 units"],
        budget: ["Custom quote"],
        presentation: ["Gift set packaging"],
        availability: ["Enquiry only", "Made to order"],
      },
    },
    {
      id: "leadership-appreciation",
      badge: "Celebration",
      title: "Leadership Appreciation Set",
      subtitle: "For leadership & CXO teams",
      price: "Custom quote",
      priceValue: null,
      imageSrc: "/images/bilva/corporate/set-leadership-appreciation.png",
      imageAlt: "Leadership Appreciation Set with dual gold and silver coins",
      href: CORPORATE_SIGNATURE_PATH,
      facets: {
        occasion: ["Employee rewards", "Milestones", "Client gifting"],
        type: ["Gift set", "Gold coin", "Silver coin"],
        quantity: ["Under 50 units", "50–100 units"],
        budget: ["Custom quote"],
        presentation: ["Gift set packaging", "Velvet case"],
        availability: ["Enquiry only"],
      },
    },
  ] as CorporateListProduct[],

  scrollCue: {
    title: "Scroll to discover more gifting options",
    progressLabel: "8 of 9 options loaded · More appear as you scroll",
  },

  features: [
    {
      id: "heritage",
      title: "100+ years",
      body: "Retail precious-metal heritage",
      icon: "award" as const,
    },
    {
      id: "presentation",
      title: "Gift presentation",
      body: "Details shown before enquiry",
      icon: "gift" as const,
    },
    {
      id: "assistance",
      title: "Personal assistance",
      body: "Discuss quantities and requirements",
      icon: "headset" as const,
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
    title: "Make every recognition memorable.",
    body: "Thoughtful precious-metal gifts for clients, teams and milestones.",
    primary: "Request a quote",
    primaryHref: CORPORATE_ENQUIRY_PATH,
    secondary: "Explore gifting options",
    secondaryHref: "#collection",
    note: "Bulk pricing and customisation confirmed by enquiry.",
    imageSrc: "/images/bilva/collection-corporate-gifting-raw.webp",
    imageAlt: "Bilwa gift box with gold ribbon, gold coin and silver bar presentation",
  },

  actions: {
    addToBagHref: BAG_PATH,
    viewDetailsLabel: "View details",
    addToBagLabel: "Add to bag",
  },
} as const;
