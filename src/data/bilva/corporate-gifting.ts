export interface CorporateFeature {
  id: string;
  title: string;
  description: string;
  iconName: "packaging" | "imprint" | "metal" | "leadTime";
}

export interface CorporateDocumentItem {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
}

export interface CorporateCollectionSet {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export interface CorporateFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CORPORATE_GIFTING_DATA = {
  hero: {
    headline: "Recognition,\nbeautifully\nexpressed.",
    eyebrow: "THE CORPORATE\nSIGNATURE COLLECTION",
    imageSrc: "/images/bilva/corporate/hero.png",
    imageAlt: "Bilwa Corporate Signature Collection presentation boxes on classical stone architectural steps",
  },
  signatureSection: {
    eyebrow: "CORPORATE GIFTING",
    title: "Corporate\nSignature Collection",
    description:
      "A curated range of precious metal gifts for recognition, partnerships and milestone occasions. Elegant, bespoke and distinctly Bilwa.",
    features: [
      {
        id: "packaging",
        title: "Packaging",
        description: "Premium gift boxes with refined finish, designed for corporate presentation.",
        iconName: "packaging",
      },
      {
        id: "imprint",
        title: "Imprint options",
        description: "Brand logo, event name or a short message (subject to design approval).",
        iconName: "imprint",
      },
      {
        id: "metal",
        title: "Metal product options",
        description: "Choice of Gold or Silver – coins, medallions or limited-edition keepsakes.",
        iconName: "metal",
      },
      {
        id: "leadTime",
        title: "Lead-time",
        description: "To be confirmed based on quantity, design and personalization requirements.",
        iconName: "leadTime",
      },
    ] as CorporateFeature[],
  },
  configurator: {
    eyebrow: "B2B ENQUIRY CONFIGURATOR",
    subtitle: "Build your requirement and request a custom quote for your organization.",
    defaultQuantity: "25",
    quantityLabel: "Quantity (units)",
    personalizationLabel: "Brand personalization",
    quantities: ["25", "50", "100", "Custom"],
    finishes: ["Gold", "Silver", "Mixed"],
    personalizations: ["Yes", "No"],
    indicativePricing: {
      label: "INDICATIVE PRICING",
      title: "Custom quote",
      subtext: "Share your requirement to receive a personalized proposal from our team.",
    },
    primaryCta: "Request a quote →",
    secondaryCta: "Speak with gifting specialist",
    regions: [
      "Select region",
      "Pan-India (Domestic)",
      "Delhi NCR & North",
      "Mumbai & Western Region",
      "Bengaluru & Southern Region",
      "Kolkata & Eastern Region",
      "International / Overseas",
    ],
  },
  documentation: {
    title: "Quality and documentation.",
    eyebrow: "YOUR CORPORATE GIFT, WITH CLEAR DOCUMENTATION.",
    documents: [
      {
        id: "product-certificate",
        title: "Product Certificate",
        imageSrc: "/images/bilva/corporate/doc-product-certificate.png",
        imageAlt: "Bilwa Product Certificate placeholder document",
        caption: "PLACEHOLDER DOCUMENT (FOR LAYOUT ONLY)",
      },
      {
        id: "presentation-specification",
        title: "Presentation Specification",
        imageSrc: "/images/bilva/corporate/doc-presentation-specification.png",
        imageAlt: "Bilwa Presentation Specification placeholder document",
        caption: "PLACEHOLDER DOCUMENT (FOR LAYOUT ONLY)",
      },
      {
        id: "fulfilment-terms",
        title: "Fulfilment Terms",
        imageSrc: "/images/bilva/corporate/doc-fulfilment-terms.png",
        imageAlt: "Bilwa Fulfilment Terms placeholder document",
        caption: "PLACEHOLDER DOCUMENT (FOR LAYOUT ONLY)",
      },
    ] as CorporateDocumentItem[],
  },
  reviews: {
    eyebrow: "CUSTOMER REVIEWS",
    title: "From our corporate partners.",
    cards: [
      {
        id: "review-1",
        quote: "“SAMPLE REVIEW — FOR LAYOUT ONLY”",
      },
      {
        id: "review-2",
        quote: "“SAMPLE REVIEW — FOR LAYOUT ONLY”",
      },
      {
        id: "review-3",
        quote: "“SAMPLE REVIEW — FOR LAYOUT ONLY”",
      },
    ],
  },
  collections: {
    eyebrow: "EXPLORE MORE CORPORATE COLLECTIONS",
    title: "Complement your gifting program.",
    sets: [
      {
        id: "milestone-recognition",
        title: "Milestone Recognition Set",
        subtitle: "FOR AWARDS & ACHIEVEMENTS",
        imageSrc: "/images/bilva/corporate/set-milestone-recognition.png",
        imageAlt: "Milestone Recognition Set with gold coin in emerald luxury box",
        href: "/corporate-gifting/signature",
      },
      {
        id: "partnership-commemorative",
        title: "Partnership Commemorative Set",
        subtitle: "FOR CLIENTS & COLLABORATORS",
        imageSrc: "/images/bilva/corporate/set-partnership-commemorative.png",
        imageAlt: "Partnership Commemorative Set with silver coin in taupe ribboned box",
        href: "/corporate-gifting/signature",
      },
      {
        id: "leadership-appreciation",
        title: "Leadership Appreciation Set",
        subtitle: "FOR LEADERSHIP & CXO TEAMS",
        imageSrc: "/images/bilva/corporate/set-leadership-appreciation.png",
        imageAlt: "Leadership Appreciation Set with dual gold and silver coin collection",
        href: "/corporate-gifting/signature",
      },
    ] as CorporateCollectionSet[],
  },
  faq: {
    eyebrow: "FAQ / SUPPORT",
    title: "Common questions on corporate gifting.",
    items: [
      {
        id: "faq-1",
        question: "What is the minimum order quantity (MOQ)?",
        answer:
          "Our standard minimum order quantity begins at 25 units for signature presentation packaging, and can be customized flexibly for bespoke coin weights or dual-metal sets.",
      },
      {
        id: "faq-2",
        question: "Can we add our brand logo or a custom message?",
        answer:
          "Yes. We offer precision laser engraving on the metal pieces, custom-embossed gold foil logo placement on presentation boxes, and personalized certificate cards.",
      },
      {
        id: "faq-3",
        question: "What are the typical timelines for a corporate order?",
        answer:
          "Standard orders are typically fulfilled within 7–10 business days. Custom-designed commemorative editions or bespoke packaging typically require 2–3 weeks upon artwork approval.",
      },
      {
        id: "faq-4",
        question: "Do you ship to multiple locations or across regions?",
        answer:
          "Yes, we provide individual multi-destination delivery to recipient addresses nationwide with tamper-evident insured packaging and full consignment tracking.",
      },
    ] as CorporateFaqItem[],
  },
};

export type CorporateGiftingPageData = typeof CORPORATE_GIFTING_DATA;
