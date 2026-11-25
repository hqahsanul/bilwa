export interface LatestOrderNavPill {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface LatestOrderItem {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export interface LatestOrderStep {
  id: string;
  title: string;
  subtitle: string;
  state: "done" | "current" | "next";
}

export interface LatestOrderBottomCard {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export const LATEST_ORDER_DATA = {
  navPills: [
    { id: "overview", label: "Overview", href: "/my-bilwa", active: true },
    { id: "orders", label: "My orders", href: "#latest-order" },
    { id: "certificates", label: "Certificates", href: "#documents" },
    { id: "addresses", label: "Addresses", href: "#quick-links" },
    { id: "support", label: "Support", href: "#need-help" },
    { id: "preferences", label: "Preferences", href: "#quick-links" },
  ] as LatestOrderNavPill[],

  heading: "Welcome to My Bilwa, Rajesh.",
  subtitle: "Your latest order and everything you need, in one place.",
  leafImageSrc: "/images/bilva/checkout/summary-leaf-accent.png",

  latestOrder: {
    title: "Your latest order",
    orderIdLabel: "Order ID:",
    orderIdValue: "BLW-2026-00428",
    dateLabel: "Date: 14 Nov 2026",
    amountLabel: "Amount:",
    amountValue: "₹2,38,350",
    statusLabel: "Confirmed · Preparing",
    items: [
      {
        id: "lakshmi-gold-coin-10g",
        title: "Lakshmi Gold Coin • 10 g",
        imageSrc: "/images/bilva/lakshmi-gold/specs-coin.png",
        imageAlt: "Lakshmi Gold Coin 10 g",
      },
      {
        id: "gold-bar-5g",
        title: "Gold Bar • 5 g",
        imageSrc: "/images/bilva/lakshmi-gold/related-bar.png",
        imageAlt: "Bilwa Gold Bar 5 g in velvet presentation box",
      },
    ] as LatestOrderItem[],
    steps: [
      {
        id: "placed",
        title: "Order placed",
        subtitle: "14 Nov 2026",
        state: "done",
      },
      {
        id: "preparing",
        title: "Preparing",
        subtitle: "We are getting your order ready.",
        state: "current",
      },
      {
        id: "dispatch",
        title: "Insured dispatch",
        subtitle: "—",
        state: "next",
      },
      {
        id: "delivered",
        title: "Delivered",
        subtitle: "—",
        state: "next",
      },
    ] as LatestOrderStep[],
    primaryCtaLabel: "View order details",
    primaryCtaHref: "/checkout/confirmed",
    trackLabel: "Track delivery",
    trackHint: "Tracking appears after dispatch.",
    insuranceTitle: "Delivery insurance included · Covered by Bilwa (₹0)",
    insuranceNote: "Coverage details available in your order.",
  },

  documents: {
    title: "Your documents",
    items: [
      {
        id: "receipt",
        label: "Payment receipt",
        status: "Pending issuance",
        tone: "amber" as const,
      },
      {
        id: "certificates",
        label: "Product certificates",
        status: "Available when provided",
        tone: "soft" as const,
      },
    ],
    ctaLabel: "View document library",
    ctaHref: "/checkout/confirmed#order-summary",
  },

  help: {
    title: "Need help?",
    description: "We’re here to help with your order, documents and more.",
    links: [
      { id: "contact", label: "Contact support", href: "/#contact-us" },
      { id: "queries", label: "Order queries", href: "/checkout/payment-pending" },
    ],
  },

  bottomCards: [
    {
      id: "addresses",
      title: "Saved addresses",
      subtitle: "Manage your delivery addresses.",
      href: "/checkout/delivery",
    },
    {
      id: "wishlist",
      title: "Wishlist",
      subtitle: "View and manage your saved items.",
      href: "/gold-silver/gold-coins-and-bars",
    },
    {
      id: "preferences",
      title: "Account preferences",
      subtitle: "Update your details and account settings.",
      href: "/checkout",
    },
  ] as LatestOrderBottomCard[],
};
