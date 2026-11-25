import { GOLD_COINS_AND_BARS_PATH } from "@/lib/bilva-collection-routes";

export interface OrderConfirmedMetaItem {
  id: string;
  label: string;
  value: string;
  isTotal?: boolean;
}

export interface OrderTimelineStep {
  id: string;
  title: string;
  subtitle: string;
  state: "done" | "current" | "upcoming";
}

export interface OrderConfirmedProduct {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
}

export const ORDER_CONFIRMED_DATA = {
  eyebrow: "ORDER CONFIRMED",
  headline: "A beautiful choice. On its way.",
  lead: "Thank you for choosing Bilwa. Your payment was successful and your order has been placed.",

  meta: [
    { id: "order-id", label: "SAMPLE ORDER ID", value: "BLW-2026-00428" },
    { id: "order-date", label: "ORDER DATE", value: "14 Nov 2026" },
    { id: "total-paid", label: "TOTAL PAID", value: "₹2,38,350", isTotal: true },
  ] as OrderConfirmedMetaItem[],

  timelineTitle: "What happens next",
  timeline: [
    {
      id: "placed",
      title: "Order placed",
      subtitle: "Payment confirmed",
      state: "done",
    },
    {
      id: "preparing",
      title: "Being prepared",
      subtitle: "Our team is getting your order ready",
      state: "current",
    },
    {
      id: "dispatch",
      title: "Insured dispatch",
      subtitle: "Will be dispatched with delivery insurance",
      state: "upcoming",
    },
    {
      id: "delivered",
      title: "Delivered",
      subtitle: "At your doorstep",
      state: "upcoming",
    },
  ] as OrderTimelineStep[],

  insurance: {
    title: "Delivery insurance: ₹0 charged to you — covered by Bilwa",
    subtitle: "Your shipment will be insured in transit under Bilwa’s policy (policy terms to be verified).",
  },

  actions: {
    primaryLabel: "View order in My Bilwa →",
    primaryNotice: "Illustrative order view — full My Bilwa order tracking will open once customer accounts are enabled.",
    secondaryLabel: "Continue shopping",
    secondaryHref: GOLD_COINS_AND_BARS_PATH,
    redirectPrefix: "Redirecting to your dashboard in",
    initialSeconds: 8,
    stayLabel: "Stay on this page",
    pausedLabel: "paused",
  },

  summary: {
    title: "Your order summary",
    countLabel: "2 products",
    products: [
      {
        id: "lakshmi-gold-coin",
        title: "Lakshmi Gold Coin · 10 g",
        imageSrc: "/images/bilva/lakshmi-gold/specs-coin.png",
        imageAlt: "Lakshmi Gold Coin 10 g",
      },
      {
        id: "gold-bar",
        title: "Gold Bar · 5 g",
        imageSrc: "/images/bilva/lakshmi-gold/related-bar.png",
        imageAlt: "Bilwa Gold Bar 5 g in velvet presentation box",
      },
    ] as OrderConfirmedProduct[],
    receipt: {
      title: "Receipt (PDF) / Invoice",
      badge: "Available when issued",
      description: "Your official receipt / tax invoice will be available in My Bilwa once it is issued.",
    },
  },

  hero: {
    imageSrc: "/images/bilva/hero-slide-1-master-2x.webp",
    imageAlt: "Gold Bilwa coin in a velvet presentation box inside a sunlit arched alcove with leaves",
  },
} as const;
