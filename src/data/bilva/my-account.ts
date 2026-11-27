export interface MyAccountTab {
  id: string;
  label: string;
  href: string;
  hasChevron?: boolean;
}

export interface MyAccountQuickCard {
  id: string;
  title: string;
  actionLabel: string;
  href: string;
}

export interface MyAccountOrderItem {
  id: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  statusTone: "transit" | "confirmed";
  primaryActionLabel: string;
  primaryActionHref: string;
  primaryActionStyle: "fill" | "line";
  secondaryActionLabel: string;
  secondaryActionHref: string;
  imageSrc: string;
  imageAlt: string;
}

export interface MyAccountSavedPiece {
  id: string;
  title: string;
  subtitle: string;
  actionLabel: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export const MY_ACCOUNT_DATA = {
  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "My Account", href: "/my-account" },
    ],
    title: "Welcome to My Bilwa",
    subtitle: "Your precious purchases, all in one place.",
    exploreLabel: "Explore collections",
    exploreHref: "/gold-silver/gold-coins-and-bars",
    bannerImageSrc: "/images/bilva/hero-slide-1-master-2x.webp",
    bannerImageAlt: "Sri Bilwa Jewels curated gold and silver collection",
  },

  tabs: [
    { id: "overview", label: "Overview", href: "#overview" },
    { id: "orders", label: "Orders", href: "#recent-orders" },
    { id: "documents", label: "Documents", href: "#ownership-documents" },
    { id: "wishlist", label: "Wishlist", href: "#saved-pieces" },
    { id: "addresses", label: "Addresses", href: "#preferences" },
    { id: "profile", label: "Profile", href: "#preferences" },
    { id: "support", label: "Support", href: "#account-help" },
    { id: "settings", label: "Settings", href: "#preferences", hasChevron: true },
  ] as MyAccountTab[],

  quickCards: [
    {
      id: "orders",
      title: "My Orders",
      actionLabel: "View",
      href: "/my-bilwa",
    },
    {
      id: "saved",
      title: "Saved Pieces",
      actionLabel: "View",
      href: "#saved-pieces",
    },
    {
      id: "certificates",
      title: "Certificates & Invoices",
      actionLabel: "View",
      href: "/checkout/confirmed#order-summary",
    },
  ] as MyAccountQuickCard[],

  recentOrders: {
    title: "Recent orders",
    items: [
      {
        id: "gold-coin-1g",
        title: "Gold Coin · 1 g",
        subtitle: "Example layout",
        statusLabel: "In transit · example",
        statusTone: "transit",
        primaryActionLabel: "Track Delivery",
        primaryActionHref: "/my-bilwa",
        primaryActionStyle: "fill",
        secondaryActionLabel: "Documents",
        secondaryActionHref: "/checkout/confirmed#order-summary",
        imageSrc: "/images/bilva/bestseller-gold-coin-clean.webp",
        imageAlt: "24K Gold Coin 1 g",
      },
      {
        id: "silver-coin-10g",
        title: "Silver Coin · 10 g",
        subtitle: "Example layout",
        statusLabel: "Confirmed · example",
        statusTone: "confirmed",
        primaryActionLabel: "View Order",
        primaryActionHref: "/checkout/confirmed",
        primaryActionStyle: "line",
        secondaryActionLabel: "Documents",
        secondaryActionHref: "/checkout/confirmed#order-summary",
        imageSrc: "/images/bilva/bestseller-silver-coin-clean.webp",
        imageAlt: "999 Silver Coin 10 g",
      },
    ] as MyAccountOrderItem[],
    note: "Actions change as orders move from confirmation to delivery.",
  },

  ownershipDocuments: {
    title: "Ownership Documents",
    description:
      "Access available invoices and product certificates linked to your purchases.",
    ctaLabel: "Open documents",
    ctaHref: "/checkout/confirmed#order-summary",
    imageSrc: "/images/bilva/corporate/doc-product-certificate.png",
    imageAlt: "Bilwa product authenticity certificate",
  },

  savedPieces: {
    title: "Saved pieces",
    items: [
      {
        id: "saved-gold-coin",
        title: "Gold Coin · 1 g",
        subtitle: "Example layout",
        actionLabel: "View Wishlist",
        href: "/gold-silver/gold-coins-and-bars",
        imageSrc: "/images/bilva/bestseller-clean-gold-coin.webp",
        imageAlt: "24K Gold Coin 1 g",
      },
      {
        id: "saved-emerald",
        title: "Emerald Gemstone",
        subtitle: "Example layout",
        actionLabel: "View Wishlist",
        href: "/gold-silver/gold-coins-and-bars",
        imageSrc: "/images/bilva/collection-gemstones-raw.webp",
        imageAlt: "Natural Emerald Gemstone",
      },
    ] as MyAccountSavedPiece[],
  },

  help: {
    title: "Need help with a purchase?",
    description:
      "Our support team is here to assist you with your purchase, documents or any order-related query.",
    ctaLabel: "Contact Support",
    ctaHref: "/contact",
  },

  preferences: {
    title: "Account preferences",
    links: [
      { id: "addresses", label: "Addresses", href: "/checkout/delivery" },
      {
        id: "communication",
        label: "Communication preferences",
        href: "/my-bilwa",
      },
      { id: "privacy", label: "Privacy controls", href: "/privacy" },
      { id: "sign-out", label: "Sign out", href: "/login" },
    ],
    openAriaLabel: "Open preferences",
    openHref: "/my-bilwa",
  },
};
