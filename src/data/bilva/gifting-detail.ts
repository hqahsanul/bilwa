import {
  type CorporateCollectionSet,
  type CorporateDocumentItem,
  type CorporateFaqItem,
  type CorporateFeature,
} from "@/data/bilva/corporate-gifting";
import { GIFTING_SIGNATURE_PATH } from "@/lib/bilva-collection-routes";
import type { CorporateGiftingPageData } from "@/data/bilva/corporate-gifting";

export const GIFTING_DETAIL_DATA: CorporateGiftingPageData = {
  hero: {
    headline: "Give something\ntimeless.",
    eyebrow: "THE BILWA\nGIFTING COLLECTION",
    imageSrc: "/images/bilva/gifting-hero.png",
    imageAlt: "Bilwa premium gifting collection presentation with precious metal keepsakes",
  },
  signatureSection: {
    eyebrow: "PERSONAL GIFTING",
    title: "Signature Gift\nCollection",
    description:
      "Precious metal pieces for milestones, celebrations, and the people who matter. Curated presentation, thoughtful detail, and distinctly Bilwa.",
    features: [
      {
        id: "packaging",
        title: "Packaging",
        description: "Gift-ready boxes with a refined finish, suited for personal celebrations and keepsakes.",
        iconName: "packaging",
      },
      {
        id: "imprint",
        title: "Engraving & message",
        description: "Names, dates, or a short dedication — subject to design and metal surface approval.",
        iconName: "imprint",
      },
      {
        id: "metal",
        title: "Metal options",
        description: "Gold or silver coins, medallions, and limited keepsakes from the Bilwa catalogue.",
        iconName: "metal",
      },
      {
        id: "leadTime",
        title: "Lead-time",
        description: "Single gifts often ship within a few business days; engraving may add a short lead time.",
        iconName: "leadTime",
      },
    ] as CorporateFeature[],
  },
  configurator: {
    eyebrow: "GIFT ENQUIRY",
    subtitle: "Choose a starting point — we’ll help you shape the perfect gift.",
    defaultQuantity: "1",
    quantityLabel: "Quantity",
    personalizationLabel: "Engraving / personalization",
    quantities: ["1", "2", "5", "Custom"],
    finishes: ["Gold", "Silver", "Mixed"],
    personalizations: ["Yes", "No"],
    indicativePricing: {
      label: "INDICATIVE PRICING",
      title: "Custom quote",
      subtext: "Share your occasion and preferences; we’ll respond with curated options and pricing.",
    },
    primaryCta: "Request a quote →",
    secondaryCta: "Speak with a gifting advisor",
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
    eyebrow: "YOUR GIFT, WITH CLEAR DOCUMENTATION.",
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
    title: "From our gifting clients.",
    cards: [
      { id: "review-1", quote: "“SAMPLE REVIEW — FOR LAYOUT ONLY”" },
      { id: "review-2", quote: "“SAMPLE REVIEW — FOR LAYOUT ONLY”" },
      { id: "review-3", quote: "“SAMPLE REVIEW — FOR LAYOUT ONLY”" },
    ],
  },
  collections: {
    eyebrow: "EXPLORE MORE GIFTING IDEAS",
    title: "Pair your gift with a timeless set.",
    sets: [
      {
        id: "milestone-celebration",
        title: "Milestone Celebration Set",
        subtitle: "FOR BIRTHDAYS & ANNIVERSARIES",
        imageSrc: "/images/bilva/corporate/set-milestone-recognition.png",
        imageAlt: "Milestone celebration gift set with gold coin in luxury box",
        href: GIFTING_SIGNATURE_PATH,
      },
      {
        id: "gratitude-keep-sake",
        title: "Gratitude Keepsake Set",
        subtitle: "FOR FAMILY & FRIENDS",
        imageSrc: "/images/bilva/corporate/set-partnership-commemorative.png",
        imageAlt: "Gratitude keepsake set with silver coin in ribboned presentation box",
        href: GIFTING_SIGNATURE_PATH,
      },
      {
        id: "heirloom-edition",
        title: "Heirloom Edition Set",
        subtitle: "FOR GENERATIONAL GIFTS",
        imageSrc: "/images/bilva/corporate/set-leadership-appreciation.png",
        imageAlt: "Heirloom edition dual metal coin gift set",
        href: GIFTING_SIGNATURE_PATH,
      },
    ] as CorporateCollectionSet[],
  },
  faq: {
    eyebrow: "FAQ / SUPPORT",
    title: "Common questions on personal gifting.",
    items: [
      {
        id: "faq-1",
        question: "Can I order a single gift?",
        answer:
          "Yes. Personal gifting starts from one piece. Share the occasion and recipient in your quote request and we’ll suggest suitable options.",
      },
      {
        id: "faq-2",
        question: "Do you offer engraving or a personalised message?",
        answer:
          "Yes. We can engrave names, dates, or short dedications on select metal pieces and include a personalised message card with premium packaging.",
      },
      {
        id: "faq-3",
        question: "What are typical lead times?",
        answer:
          "Ready-to-ship pieces are often fulfilled within 3–7 business days. Engraving or bespoke packaging may add a few additional days.",
      },
      {
        id: "faq-4",
        question: "Can gifts be shipped directly to the recipient?",
        answer:
          "Yes. We can deliver to your address or ship directly to the recipient with discreet, insured packaging and tracking.",
      },
    ] as CorporateFaqItem[],
  },
};