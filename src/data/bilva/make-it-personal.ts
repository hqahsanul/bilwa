export interface PresentationOption {
  id: "classic-case" | "gift-box";
  label: string;
  description: string;
  price: number;
}

export const MAKE_IT_PERSONAL_DATA = {
  heading: "Make it personal",
  subtitle:
    "Choose a beautiful presentation, add a heartfelt message, and make your gift uniquely theirs.",
  heroImageSrc: "/images/bilva/gifting-hero.png",
  heroImageAlt: "Bilwa luxury gift presentation box",

  presentationTitle: "Presentation",
  presentationSubtitle: "How would you like it presented?",
  presentationOptions: [
    {
      id: "classic-case",
      label: "Classic case",
      description: "BILWA presentation case with a velvet finish",
      price: 350,
    },
    {
      id: "gift-box",
      label: "Gift box",
      description: "Premium gift box with ribbon and gift card",
      price: 450,
    },
  ] as PresentationOption[],

  giftMessageTitle: "Gift message",
  giftMessageSubtitle: "Add a personal note. We’ll include it on a gift card.",
  defaultMessage:
    "With blessings of prosperity and happiness.\nFor your new beginnings. ♥",
  emptyPreviewMessage: "Your message will appear here.",
  maxMessageLength: 250,

  engravingTitle: "Engraving",
  engravingPill: "Available on select products",
  engravingNote: "Not available for this coin.",

  accordions: [
    {
      id: "packaging",
      title: "Packaging details",
      body: "Presented in a velvet-finish BILWA case or a premium gift box, sealed and ready to gift.",
    },
    {
      id: "delivery",
      title: "Gifting & delivery",
      body: "Insured delivery to your recipient’s address. Prices are inclusive of presentation; no invoice is placed in the parcel.",
    },
  ],

  previewTitle: "Live preview",
  previewSubtitle: "Your gift, as it will be prepared.",
  costSummaryTitle: "Cost summary",
  costRowLabel: "Gift presentation",
  totalLabel: "Added to order",
  addLabel: "Add personalisation",
  skipLabel: "Not now",
  addedStatus: "Personalisation added to your order.",
  skippedStatus: "No personalisation added.",
};
