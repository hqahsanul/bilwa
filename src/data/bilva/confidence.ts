export type ConfidenceDetailId = "know" | "total" | "records";

export type ConfidenceDetail = {
  id: ConfidenceDetailId;
  num: string;
  title: string;
  body: string;
};

export type ConfidenceReview = {
  quote: string;
  who: string;
};

export const CONFIDENCE_DETAILS: readonly ConfidenceDetail[] = [
  {
    id: "know",
    num: "01",
    title: "Know your piece",
    body: "Purity and weight are clearly shown for every coin, bar, gemstone or rudraksh.",
  },
  {
    id: "total",
    num: "02",
    title: "Understand your total",
    body: "See a clear price breakdown, with the final amount and any applicable charges, before you place your order.",
  },
  {
    id: "records",
    num: "03",
    title: "Keep your records",
    body: "Your order details and relevant documents are available in your account, whenever you need them.",
  },
];

/** Placeholder copy until verified customer quotes are approved. */
export const CONFIDENCE_REVIEWS: readonly ConfidenceReview[] = [
  {
    quote: "Sample review text. Replace with verified offline customer feedback.",
    who: "Offline customer · Name pending approval",
  },
  {
    quote: "Sample review text. Replace with verified offline customer feedback.",
    who: "Offline customer · Name pending approval",
  },
  {
    quote: "Sample review text. Replace with verified offline customer feedback.",
    who: "Offline customer · Name pending approval",
  },
];