/**
 * Demo query params for use-case UI mocks:
 * - /bag — remove all lines for empty bag; /bag?attention=1 — bag attention card
 * - /checkout/payment-pending?status=failed — payment unsuccessful
 * - /checkout/delivery — PIN 560001 triggers not-serviceable error
 * - /checkout — OTP accepts only 428710; any other 6-digit code shows invalid message
 */

import {
  CONTACT_PATH,
  GOLD_COINS_AND_BARS_PATH,
  LOGIN_PATH,
} from "@/lib/bilva-collection-routes";

export const DEMO_UNSERVICEABLE_PIN = "560001";
export const DEMO_VALID_OTP = "428710";

const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export function isValidPan(value: string) {
  return PAN_PATTERN.test(value.trim().toUpperCase());
}

export const USE_CASE_EMPTY_BAG = {
  title: "Your bag is empty",
  body: "When you add coins or bars, they will appear here. Explore our collections to find something that fits your occasion.",
  primaryCta: "Explore collections",
  primaryHref: GOLD_COINS_AND_BARS_PATH,
  secondaryCta: "Sign in again",
  secondaryHref: LOGIN_PATH,
};

export const USE_CASE_PAYMENT_UNSUCCESSFUL = {
  title: "Payment not confirmed",
  body: "No confirmed payment was recorded.",
  primaryCta: "Check payment status",
  secondaryCta: "Choose another method",
  secondaryHref: "/checkout/review",
  notice:
    "Do not repeat payment if your bank has debited the amount. Check status first or contact support.",
};

export const USE_CASE_DELIVERY_PIN = {
  title: "Delivery check",
  subtitle: "We verify PIN codes before you continue to review.",
  error: "This PIN is not serviceable yet.",
  tryAnother: "Try another PIN",
  askBilwa: "Ask Bilwa",
  askBilwaHref: CONTACT_PATH,
};

export const USE_CASE_PAN_REVIEW = {
  title: "Review your PAN details",
  subtitle: "Required for high-value orders. Your PAN is used only for regulatory compliance.",
  error: "Please enter a valid PAN.",
  lockNote: "Secured with bank-grade encryption. Bilwa does not store your full PAN after verification.",
  continueCta: "Continue",
  panLabel: "PAN",
  panPlaceholder: "AAAAA9999A",
  showMaskedLabel: "Show masked",
  hideMaskedLabel: "Hide",
};

export const USE_CASE_RATES_BANNER = {
  text: "Rates are confirmed before payment. No change is applied without review.",
};

export const USE_CASE_INSURED_BANNER = {
  text: "Insured delivery covered by Bilwa • ₹0 once order is placed",
};

export const USE_CASE_OTP_INVALID = {
  message: "Invalid code. Please check and try again.",
};

export const USE_CASE_CHOOSE_ADDRESS = {
  title: "Choose delivery address",
  subtitle: "Select a saved address or add a new one below.",
  addNewLabel: "Add new address",
};

export type SavedAddressOption = {
  id: string;
  label: string;
  lines: string[];
  pin: string;
};

export const USE_CASE_SAVED_ADDRESSES: SavedAddressOption[] = [
  {
    id: "home",
    label: "Home",
    lines: ["Aarav Mehta", "14, Palm Grove Avenue", "Indiranagar, Bengaluru"],
    pin: "560038",
  },
  {
    id: "work",
    label: "Work",
    lines: ["Aarav Mehta", "Bilwa Commerce Tower, 3rd Floor", "MG Road, Bengaluru"],
    pin: "560001",
  },
];

export const USE_CASE_BAG_ATTENTION = {
  title: "Your bag needs attention",
  subtitle: "Something in your bag was updated since you last viewed it.",
  alerts: [
    { id: "stock", label: "Stock updated", detail: "Availability changed for one item." },
    { id: "rate", label: "Rate updated", detail: "Metal-linked price moved with the latest rate." },
  ],
  primaryCta: "Review updated total",
  note: "Nothing is confirmed until you proceed to checkout.",
};

export const USE_CASE_PAYMENT_PENDING_CARD = {
  title: "Payment pending",
  subtitle: "We are verifying your payment with your provider.",
  status: "Verification in progress",
  checkStatus: "Check status",
  contactSupport: "Contact support",
  contactSupportHref: CONTACT_PATH,
};