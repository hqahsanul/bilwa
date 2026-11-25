export interface DiscoverProduct {
  id: string;
  motif: "Lakshmi" | "Lotus" | "Ganesha" | "Tree of Life";
  grams: number;
  occasions: string[];
  price: number;
  imageSrc: string;
  imageAlt: string;
}

export interface DiscoverFilterGroup {
  key: "metal" | "purity" | "weight" | "occasion" | "price";
  label: string;
  options: string[];
}

export const DISCOVER_PRICE_BANDS = [
  { label: "Under ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000–₹25,000", min: 10000, max: 25000 },
  { label: "₹25,000–₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 & above", min: 50000, max: Number.POSITIVE_INFINITY },
] as const;

export const DISCOVER_WEIGHT_BANDS = [
  { label: "Under 10 g", min: 0, max: 10 },
  { label: "10–50 g", min: 10, max: 50 },
  { label: "50–100 g", min: 50, max: 100 },
  { label: "100 g & above", min: 100, max: Number.POSITIVE_INFINITY },
] as const;

const MOTIF_IMAGES: Record<DiscoverProduct["motif"], string> = {
  Lakshmi: "/images/bilva/lakshmi-gold/specs-coin.png",
  Lotus: "/images/bilva/lakshmi-gold/related-lotus.png",
  Ganesha: "/images/bilva/lakshmi-silver/related-ganesha.png",
  "Tree of Life": "/images/bilva/signature-heritage-gold-tree-2x.webp",
};

const BASE_PRODUCTS: Array<
  [DiscoverProduct["motif"], number, string[]]
> = [
  ["Lakshmi", 1, ["Festive", "Wedding"]],
  ["Lotus", 1, ["Housewarming", "Festive", "New beginning"]],
  ["Ganesha", 2, ["Wedding", "Housewarming"]],
  ["Tree of Life", 5, ["Anniversary", "New beginning"]],
  ["Lakshmi", 2, ["Festive", "Wedding"]],
  ["Lotus", 5, ["Housewarming", "Festive"]],
  ["Ganesha", 5, ["Wedding", "Anniversary"]],
  ["Tree of Life", 10, ["Anniversary", "New beginning"]],
  ["Lakshmi", 10, ["Festive", "Wedding"]],
  ["Lotus", 10, ["Housewarming", "Festive"]],
  ["Ganesha", 20, ["Wedding", "Anniversary"]],
  ["Lakshmi", 20, ["Festive", "Wedding"]],
];

export const SEARCH_DISCOVER_DATA = {
  heading: "Find something worth keeping.",
  defaultQuery: "gold coin",
  heroImageSrc: "/images/bilva/lakshmi-gold/hero-scene.png",
  heroImageAlt: "Sri Bilwa Jewels gold coin craftsmanship",
  suggestionsLabel: "Suggestions:",
  suggestions: ["Lakshmi", "Lotus", "1 g", "Festive"],

  filters: [
    { key: "metal", label: "Metal", options: ["Gold", "Silver"] },
    {
      key: "purity",
      label: "Purity",
      options: ["24K (999)", "999 silver", "22K (916)"],
    },
    {
      key: "weight",
      label: "Weight",
      options: DISCOVER_WEIGHT_BANDS.map((w) => w.label),
    },
    {
      key: "occasion",
      label: "Occasion",
      options: [
        "Wedding",
        "Housewarming",
        "Anniversary",
        "New beginning",
        "Festive",
      ],
    },
    {
      key: "price",
      label: "Price",
      options: DISCOVER_PRICE_BANDS.map((b) => b.label),
    },
  ] as DiscoverFilterGroup[],

  sortOptions: [
    { value: "featured", label: "Sort by: Featured" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "weight-asc", label: "Weight: low to high" },
    { value: "purity-24k", label: "Purity: 24K first" },
  ] as const,

  products: BASE_PRODUCTS.map(([motif, grams, occasions], idx) => ({
    id: `discover-${motif.toLowerCase().replace(/\s+/g, "-")}-${grams}g-${idx}`,
    motif,
    grams,
    occasions,
    price: grams * 13850,
    imageSrc: MOTIF_IMAGES[motif],
    imageAlt: `${motif} Gold Coin – ${grams} g`,
  })) as DiscoverProduct[],

  scrollLabel: "Scroll to discover more",
  noMatchPrompt: "No matches?",
  clearFiltersLabel: "Clear filters",
  askBilwaLabel: "Ask Bilwa ›",
  askBilwaHref: "/#contact-us",
  emptyMessage:
    "No matches for these filters. Try clearing a filter or ask Bilwa.",
};
