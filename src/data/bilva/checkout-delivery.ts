export interface OrderSummaryItem {
  id: string;
  title: string;
  specs: string;
  qty: number;
  price: number;
  formattedPrice: string;
  imageSrc: string;
  imageAlt: string;
}

export const CHECKOUT_DELIVERY_DATA = {
  steps: [
    { number: 1, label: "Details", active: true },
    { number: 2, label: "Review", active: false },
    { number: 3, label: "Payment", active: false },
  ],

  title: "Where should we deliver?",
  subtitle: "Your details stay private and are used to fulfil your order.",
  alreadyAccount: "Already have an account?",
  signIn: "Sign in",

  contact: {
    title: "Contact",
    emailLabel: "Email address *",
    emailPlaceholder: "customer@example.com",
    phoneLabel: "Phone *",
    defaultCountryCode: "+91",
    defaultPhone: "98765 43210",
    updatesCheckbox:
      "Send order updates (order status, delivery updates) to my email and phone",
  },

  delivery: {
    title: "Delivery details",
    fullNameLabel: "Full name *",
    fullNamePlaceholder: "e.g. Rajesh Sharma",
    pincodeLabel: "PIN code *",
    pincodePlaceholder: "e.g. 560001",
    addressLine1Label: "Address line 1 *",
    addressLine1Placeholder: "House / Flat No., Building, Street",
    cityLabel: "City *",
    cityPlaceholder: "e.g. Bengaluru",
    addressLine2Label: "Address line 2 (optional)",
    addressLine2Placeholder: "Apartment, Area, Colony, etc.",
    stateLabel: "State *",
    statePlaceholder: "Select state",
    landmarkLabel: "Landmark (optional)",
    landmarkPlaceholder: "e.g. Near City Mall, Opp. Central Park",
    saveAddressCheckbox:
      "Save this address to My Bilwa for a faster checkout next time",
    billingSameToggle: "Billing address same as delivery",
  },

  indianStates: [
    "Karnataka",
    "Maharashtra",
    "Delhi",
    "Tamil Nadu",
    "Gujarat",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
    "Kerala",
    "Rajasthan",
    "Andhra Pradesh",
    "Madhya Pradesh",
    "Punjab",
    "Haryana",
    "Bihar",
    "Odisha",
    "Goa",
    "Assam",
  ],

  summary: {
    title: "Order summary",
    items: [
      {
        id: "lakshmi-gold-coin-10g",
        title: "Lakshmi Gold Coin",
        specs: "24K Gold · 10 g",
        qty: 1,
        price: 79450,
        formattedPrice: "₹79,450",
        imageSrc: "/images/bilva/checkout/summary-lakshmi-gold-coin.png",
        imageAlt: "Lakshmi Gold Coin 10 g",
      },
      {
        id: "silver-blessings-coin-50g",
        title: "Silver Blessings Coin",
        specs: "999 Silver · 50 g",
        qty: 1,
        price: 2250,
        formattedPrice: "₹2,250",
        imageSrc: "/images/bilva/checkout/summary-silver-blessings-coin.png",
        imageAlt: "Silver Blessings Coin 50 g",
      },
    ] as OrderSummaryItem[],
    itemsCountLabel: "Items (2)",
    itemsTotalFormatted: "₹81,700",
    deliveryLabel: "Delivery",
    deliveryValue: "Calculated after PIN",
    taxesLabel: "Taxes (GST)",
    taxesValue: "Calculated at checkout",
    insurance: {
      title: "Delivery insurance",
      coveredText: "Covered by Bilwa",
      amountFormatted: "₹0",
      description:
        "Insured while in transit under Bilwa's shipping cover. (Mockup policy – pending confirmation)",
    },
    totalLabel: "Total",
    totalFormatted: "₹81,700",
    indicativeTag: "indicative",
    finalPayableNote: "Final payable amount confirmed before payment.",
  },

  returnToBag: "Return to bag",
  continueToReview: "Continue to review",
};
