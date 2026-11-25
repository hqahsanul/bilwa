export interface PaymentPendingItem {
  id: string;
  title: string;
  priceFormatted: string;
  imageSrc: string;
  imageAlt: string;
}

export const PAYMENT_PENDING_DATA = {
  heading: "Payment not confirmed yet",
  subtitle: "Your bag is saved. We have not marked this order as paid.",

  statusCard: {
    title: "Checking payment status",
    subtitle: "Verifying with your payment provider...",
    recheckingSubtitle: "Re-verifying status with your payment provider...",
    recheckResultNote:
      "Still awaiting confirmation from your payment provider. If your bank has debited the amount, please wait a few minutes before checking again.",
    badge: "PENDING",
    progressbarLabel: "Checking payment status",
  },

  troubleCard: {
    title: "Still having trouble?",
    checkAgainLabel: "Check payment again",
    checkingLabel: "Checking status...",
    tryAnotherLabel: "Try another payment method",
    tryAnotherHref: "/checkout/review",
    supportLabel: "Contact Bilwa support",
    supportHref: "/#contact-us",
  },

  orderSummary: {
    referenceLabel: "Order reference",
    referenceValue: "BLW-2026-00428",
    items: [
      {
        id: "lakshmi-gold-coin-10g",
        title: "Lakshmi Gold Coin · 10 g",
        priceFormatted: "₹1,58,900",
        imageSrc: "/images/bilva/lakshmi-gold/specs-coin.png",
        imageAlt: "Lakshmi Gold Coin 10 g",
      },
      {
        id: "bilwa-gold-bar-5g",
        title: "Bilwa Gold Bar · 5 g",
        priceFormatted: "₹79,450",
        imageSrc: "/images/bilva/lakshmi-gold/related-bar.png",
        imageAlt: "Bilwa Gold Bar 5 g in velvet presentation box",
      },
    ] as PaymentPendingItem[],
    insuredNote: "Insured delivery covered by Bilwa · ₹0",
    totalLabel: "Total",
    totalFormatted: "₹2,38,350",
  },

  notice:
    "Do not retry payment if your bank has debited you; first check the status.",

  leafDecor: {
    imageSrc: "/images/bilva/checkout/summary-leaf-accent.png",
  },
};
