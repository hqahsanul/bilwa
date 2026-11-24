export const LAKSHMI_SILVER_COIN_PATH = "/gold-silver/lakshmi-silver-coin";

export const LAKSHMI_SILVER_COIN_DATA = {
  hero: {
    headline: "Silver, made\nunforgettable.",
    eyebrow: "LAKSHMI SILVER COIN",
    imageSrc: "/images/bilva/lakshmi-silver/hero.png",
    imageAlt: "Lakshmi silver coin standing on stone with a lotus and temple arches",
  },
  product: {
    eyebrow: "BILWA SILVER",
    title: "Lakshmi Silver Coin",
    description:
      "A finely-crafted silver coin featuring Goddess Lakshmi, a timeless symbol of prosperity, grace and abundance.",
    specs: [
      { id: "purity", label: "Purity", value: "999 Silver", icon: "purity" as const },
      { id: "weight", label: "Weight", value: "20 g", icon: "weight" as const },
      {
        id: "finish",
        label: "Finish",
        value: "Relief (highly detailed engraving)",
        icon: "finish" as const,
      },
      {
        id: "gift",
        label: "Gift Presentation",
        value: "Comes in a premium Bilwa gift box, ideal for gifting and special occasions.",
        icon: "gift" as const,
      },
    ],
  },
  purchase: {
    weightLabel: "SELECT WEIGHT (SILVER 999)",
    weights: ["10 g", "20 g", "50 g", "100 g"],
    packagingLabel: "SELECT PACKAGING",
    packaging: [
      { id: "box", title: "Bilwa Gift Box", detail: "Premium presentation" },
      { id: "pouch", title: "Protective Pouch", detail: "Refined & travel-friendly" },
    ],
    quantityLabel: "QUANTITY",
    priceLabel: "ILLUSTRATIVE PRICE",
    rateLabel: "SAMPLE SILVER RATE CONTEXT",
    ratePerGram: 112.5,
    addToBag: "Add to Bag",
    buyNow: "Buy Now",
    deliveryLabel: "Check delivery to your PIN",
    deliveryPlaceholder: "Enter PIN",
  },
  authenticity: {
    title: "Authenticity,\ndocumented.",
    intro:
      "Your Bilwa silver coin is accompanied by key documents for assurance and complete transparency.",
    cards: [
      { id: "assay", title: "ASSAY REPORT", detail: "Sample document\n(for layout only)", icon: "document" as const },
      { id: "note", title: "AUTHENTICITY NOTE", detail: "Sample document\n(for layout only)", icon: "shield" as const },
      { id: "certificate", title: "PRODUCT CERTIFICATE", detail: "Sample document\n(for layout only)", icon: "medal" as const },
    ],
  },
  reviews: {
    eyebrow: "CUSTOMER REVIEWS",
    title: "What our customers say.",
    quotes: ["SAMPLE REVIEW —\nFOR LAYOUT ONLY", "SAMPLE REVIEW —\nFOR LAYOUT ONLY", "SAMPLE REVIEW —\nFOR LAYOUT ONLY"],
  },
  related: {
    eyebrow: "EXPLORE MORE",
    title: "You may also like.",
    items: [
      {
        id: "ganesha",
        title: "Ganesha Silver Coin",
        subtitle: "Silver 999 | 20 g",
        imageSrc: "/images/bilva/lakshmi-silver/related-ganesha.png",
        imageAlt: "Ganesha silver coin on stone",
        href: LAKSHMI_SILVER_COIN_PATH,
      },
      {
        id: "bar",
        title: "Silver Bar",
        subtitle: "Silver 999 | 50 g",
        imageSrc: "/images/bilva/lakshmi-silver/related-bar.png",
        imageAlt: "Bilwa 50 gram silver bar",
        href: LAKSHMI_SILVER_COIN_PATH,
      },
      {
        id: "gold",
        title: "Lakshmi Gold Coin (Gift)",
        subtitle: "Gold | Gifting Edition",
        imageSrc: "/images/bilva/lakshmi-silver/related-gold.png",
        imageAlt: "Lakshmi gold coin in a Bilwa presentation box",
        href: LAKSHMI_SILVER_COIN_PATH,
      },
    ],
  },
  faq: {
    eyebrow: "FAQ & SUPPORT",
    title: "Questions?\nWe're here to help.",
    items: [
      {
        id: "purity",
        question: "What is the purity of this silver coin?",
        answer: "This coin is 999 silver — fine silver, as stated on the piece and in the accompanying documents.",
      },
      {
        id: "finish",
        question: "What is the finish of the coin?",
        answer: "A lightly detailed relief engraving, with the Goddess Lakshmi motif raised from the field.",
      },
      {
        id: "packaging",
        question: "Does it come in a gift packaging?",
        answer: "Yes. Choose the Bilwa gift box for presentation, or the protective pouch.",
      },
      {
        id: "weight",
        question: "How do I choose the right weight?",
        answer: "10 g and 20 g suit personal gifts. 50 g and 100 g are chosen when a more substantial piece is preferred.",
      },
    ],
  },
};
