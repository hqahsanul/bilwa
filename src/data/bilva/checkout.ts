export interface CheckoutStep {
  id: string;
  number: number;
  label: string;
}

export interface CheckoutBagItem {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  imageSrc: string;
  imageAlt: string;
}

export const CHECKOUT_DATA = {
  steps: [
    { id: "identify", number: 1, label: "Identify" },
    { id: "delivery", number: 2, label: "Delivery" },
    { id: "payment", number: 3, label: "Payment" },
    { id: "confirm", number: 4, label: "Confirm" },
  ] as CheckoutStep[],

  title: "How would you like to continue?",

  mobileOtp: {
    title: "Continue with mobile OTP",
    subtitle: "Get a one-time password (OTP) on your mobile to continue securely.",
    mobileLabel: "Mobile number",
    defaultCountryCode: "+91",
    defaultPhone: "98765 43210",
    otpLabel: "Enter OTP",
    resendLabel: "Resend OTP",
    cta: "Continue with mobile OTP",
  },

  guest: {
    title: "Continue as a guest",
    subtitle: "No account needed. Just provide your email to continue.",
    emailLabel: "Email address",
    placeholder: "you@example.com",
    cta: "Continue as a guest",
  },

  guestNote: "Guests can track their order using the verified email or phone. No account is required.",

  bag: {
    title: "Your bag",
    items: [
      {
        id: "lakshmi-gold-coin-10g",
        title: "Lakshmi Gold Coin · 10 g",
        price: 158900,
        formattedPrice: "₹1,58,900",
        imageSrc: "/images/bilva/checkout/summary-lakshmi-gold-coin.png",
        imageAlt: "Lakshmi Gold Coin 10 g",
      },
      {
        id: "bilwa-gold-bar-5g",
        title: "Bilwa Gold Bar · 5 g",
        price: 79450,
        formattedPrice: "₹79,450",
        imageSrc: "/images/bilva/lakshmi-gold/related-bar.png",
        imageAlt: "Bilwa Gold Bar 5 g",
      },
    ] as CheckoutBagItem[],
    totalLabel: "Total",
    totalPrice: 238350,
    formattedTotal: "₹2,38,350",
  },

  insuredBanner: {
    text: "Insured delivery, covered by Bilwa · ₹0",
  },

  resendNote: "Resend noted. A code is sent when checkout is connected.",
};
