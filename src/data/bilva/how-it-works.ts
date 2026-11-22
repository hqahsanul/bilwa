export type HowItWorksStep = {
  id: string;
  num: string;
  title: string;
  description: string;
  placement: "s1" | "s2" | "s3" | "s4";
};

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    id: "01",
    num: "01",
    title: "Explore with confidence",
    description: "Discover weight, purity and product details.",
    placement: "s1",
  },
  {
    id: "02",
    num: "02",
    title: "Review your price",
    description: "See the price breakdown before checkout.",
    placement: "s2",
  },
  {
    id: "03",
    num: "03",
    title: "Place your order",
    description: "Review your details and complete payment.",
    placement: "s3",
  },
  {
    id: "04",
    num: "04",
    title: "Follow your purchase",
    description: "Track order status and access documents in your account.",
    placement: "s4",
  },
];

export const HOW_IT_WORKS_TRUST_POINTS = [
  { lines: ["Clear product", "specifications"] },
  { lines: ["Transparent", "checkout summary"] },
  { lines: ["Order updates", "and documents"] },
] as const;