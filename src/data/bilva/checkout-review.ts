export interface CheckoutReviewStep {
  id: string;
  number: number;
  label: string;
  statusText: string;
  state: "done" | "current" | "upcoming";
}

export interface CheckoutReviewItem {
  id: string;
  title: string;
  purity: string;
  qtyLabel: string;
  priceFormatted: string;
  imageSrc: string;
  imageAlt: string;
}

export interface CheckoutPaymentMethod {
  id: "upi" | "netbanking" | "card";
  label: string;
  description: string;
}

export interface CheckoutSummaryRow {
  id: string;
  label: string;
  value: string;
  hasShield?: boolean;
  isMutedValue?: boolean;
}

export const CHECKOUT_REVIEW_DATA = {
  steps: [
    {
      id: "details",
      number: 1,
      label: "Details",
      statusText: "Complete",
      state: "done",
    },
    {
      id: "review",
      number: 2,
      label: "Review",
      statusText: "Current step",
      state: "current",
    },
    {
      id: "payment",
      number: 3,
      label: "Payment",
      statusText: "Next",
      state: "upcoming",
    },
  ] as CheckoutReviewStep[],

  heading: "Review your order.",
  subtitle:
    "Please confirm your selections, delivery address and final amount before payment.",
  verifiedBadge: "PAN verified",

  deliveryAddress: {
    label: "Delivering to",
    recipient: "Rajesh Sharma",
    cityPin: "Bengaluru, 560001",
    phone: "+91 XXXXX 43210",
    editLabel: "Edit",
    editHref: "/checkout/delivery",
  },

  items: [
    {
      id: "lakshmi-gold-coin-10g",
      title: "Lakshmi Gold Coin 10 g",
      purity: "24K (999)",
      qtyLabel: "Qty: 1",
      priceFormatted: "₹1,58,900",
      imageSrc: "/images/bilva/lakshmi-gold/specs-coin.png",
      imageAlt: "Lakshmi Gold Coin 10 g",
    },
    {
      id: "gold-bar-5g",
      title: "Gold Bar 5 g",
      purity: "24K (999)",
      qtyLabel: "Qty: 1",
      priceFormatted: "₹79,450",
      imageSrc: "/images/bilva/lakshmi-gold/related-bar.png",
      imageAlt: "Bilwa Gold Bar 5 g in velvet presentation box",
    },
  ] as CheckoutReviewItem[],

  paymentSectionTitle: "Choose payment method",
  paymentMethods: [
    {
      id: "upi",
      label: "UPI",
      description: "Pay securely using UPI",
    },
    {
      id: "netbanking",
      label: "Net banking",
      description: "Pay using your bank account",
    },
    {
      id: "card",
      label: "Credit / debit card",
      description: "Pay using your credit or debit card",
    },
  ] as CheckoutPaymentMethod[],

  securityNote: "Payment processed securely by our payment partner.",
  termsPrefix: "I have reviewed the final price and agree to the",
  termsLinkLabel: "terms of purchase",
  termsHref: "/terms",
  termsRequiredError: "Please agree to the terms of purchase before proceeding to payment.",
  payButtonLabel: "Pay ₹2,38,350 →",
  redirectNote: "You will be redirected securely for payment.",

  summary: {
    title: "Final price review",
    rows: [
      { id: "items", label: "Items (2)", value: "₹2,38,350" },
      { id: "delivery", label: "Delivery", value: "₹0" },
      {
        id: "taxes",
        label: "Taxes",
        value: "Calculated in final amount",
        isMutedValue: true,
      },
      {
        id: "insurance",
        label: "Delivery insurance",
        value: "₹0 — Covered by Bilwa",
        hasShield: true,
      },
    ] as CheckoutSummaryRow[],
    totalLabel: "Total payable",
    totalValue: "₹2,38,350",
    illustrativeNote: "Illustrative final amount for this design.",
    priceConfirmedTitle: "Price confirmed for this checkout attempt.",
    priceConfirmedSubtitle: "Expiry behavior defined by pricing policy.",
    insuranceFooter:
      "Your valuables are insured during dispatch at Bilwa’s cost.",
  },
};
