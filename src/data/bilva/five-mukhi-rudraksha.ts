export const FIVE_MUKHI_PATH = "/rudraksh/five-mukhi";

export const FIVE_MUKHI_DATA = {
  hero: {
    headline: "A quiet connection\nto the sacred.",
    imageSrc: "/images/bilva/five-mukhi/hero.png",
    imageAlt: "Five Mukhi Rudraksha on a stone ledge with temple architecture and foliage",
  },
  product: {
    eyebrow: "RUDRAKSHA",
    title: "Five Mukhi\nRudraksha",
    description:
      "A natural five-mukhi Rudraksha (5 faces), revered in traditional practice.",
    note: "The five-mukhi Rudraksha is a widely sought-after, everyday Rudraksha, valued for its balance and suitability for regular wear and practice.",
    specs: [
      { id: "mukhi", label: "Mukhi (Faces)", value: "5", icon: "mukhi" as const },
      {
        id: "origin",
        label: "Origin",
        value: "Natural origin unspecified",
        valueHint: "(pending verification)",
        icon: "origin" as const,
      },
      { id: "size", label: "Size (Illustrative)", value: "18 mm", icon: "size" as const },
      {
        id: "stringing",
        label: "Stringing Choice",
        value: "Single bead or mala",
        valueHint: "(as per selection)",
        icon: "stringing" as const,
      },
    ],
  },
  purchase: {
    title: "Select and Purchase",
    beadSizeLabel: "Bead Size (Diameter)",
    beadSizes: ["16 mm", "18 mm", "20 mm"],
    forms: ["Single Bead", "Mala"],
    threading: ["With Thread", "With Mala Thread", "With Case"],
    basePriceInr: 1850,
    priceBySize: { "16 mm": 1650, "18 mm": 1850, "20 mm": 2150 } as Record<string, number>,
    priceLabel: "Illustrative price",
    addToBag: "Add to Bag",
    buyNow: "Buy Now",
    deliveryPlaceholder: "Enter PIN to check delivery",
  },
  authenticity: {
    title: "Origin and authenticity.",
    eyebrow: "DOCUMENTED INSIGHTS FOR INFORMED CHOOSING.",
    cards: [
      {
        id: "microscopy",
        title: "Microscopy Details",
        caption: "Conditional Preview",
        imageSrc: "/images/bilva/five-mukhi/auth-microscopy.png",
        imageAlt: "Microscopy details placeholder document",
      },
      {
        id: "report",
        title: "Bead-Specific Report",
        caption: "Conditional Preview",
        imageSrc: "/images/bilva/five-mukhi/auth-report.png",
        imageAlt: "Bead-specific report placeholder document",
      },
      {
        id: "care",
        title: "Care Guide",
        caption: "Conditional Preview",
        imageSrc: "/images/bilva/five-mukhi/auth-care.png",
        imageAlt: "Care guide placeholder document",
      },
    ],
  },
  reviews: {
    eyebrow: "CUSTOMER REVIEWS",
    title: "What our customers say.",
    quotes: [
      "SAMPLE REVIEW — FOR LAYOUT ONLY",
      "SAMPLE REVIEW — FOR LAYOUT ONLY",
      "SAMPLE REVIEW — FOR LAYOUT ONLY",
    ],
  },
  related: {
    title: "Related Rudraksha Products.",
    items: [
      {
        id: "three-mukhi",
        title: "Three Mukhi Rudraksha",
        subtitle: "Natural Rudraksha",
        imageSrc: "/images/bilva/five-mukhi/related-1.png",
        imageAlt: "Three Mukhi Rudraksha on stone",
        href: FIVE_MUKHI_PATH,
      },
      {
        id: "seven-mukhi",
        title: "Seven Mukhi Rudraksha",
        subtitle: "Natural Rudraksha",
        imageSrc: "/images/bilva/five-mukhi/related-2.png",
        imageAlt: "Seven Mukhi Rudraksha on stone",
        href: FIVE_MUKHI_PATH,
      },
      {
        id: "rudraksha-mala",
        title: "Rudraksha Mala",
        subtitle: "Natural Rudraksha",
        imageSrc: "/images/bilva/five-mukhi/related-mala.png",
        imageAlt: "Rudraksha mala with maroon tassel on stone",
        href: FIVE_MUKHI_PATH,
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions.",
    items: [
      {
        id: "faq-size",
        question: "How do I choose the right size?",
        answer:
          "Bead size is a matter of preference and wear. 14mm suits delicate daily wear, 18mm is a balanced classic, and 20mm reads more present as a statement piece.",
      },
      {
        id: "faq-report",
        question: "Will I receive a report for my bead?",
        answer:
          "When available, bead-specific documentation and microscopy notes can accompany your order. Availability is confirmed at fulfilment.",
      },
      {
        id: "faq-care",
        question: "How should I care for my Rudraksha?",
        answer:
          "Keep it dry when possible, wipe gently with a soft cloth, and avoid harsh chemicals or prolonged soaking so the natural surface stays intact.",
      },
    ],
  },
};
