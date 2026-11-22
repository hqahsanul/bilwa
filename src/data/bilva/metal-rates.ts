export type MetalRateQuote = {
  id: "gold" | "silver";
  title: string;
  priceLabel: string;
  unitLabel: string;
  changeLabel: string;
  /** Tailwind-friendly tone for the change pill value. */
  changeTone: "positive" | "negative";
  yesterdayLabel: string;
  imageSrc: string;
  imageAlt: string;
  /** Sparkline node [cx, cy] in a 240×54 viewBox. */
  trendNodes: readonly [number, number][];
  trendPath: string;
  trendFillPath: string;
  gradientId: string;
  stroke: string;
};

/** Illustrative spot rates for marketing layout — not live market data. */
export const METAL_RATES_META = {
  eyebrow: "TRANSPARENCY IN EVERY GRAM",
  headline: "Today’s precious metal rates",
  subcopy: "Market intelligence to help you make an informed buying decision.",
  statusLabel: "ILLUSTRATIVE DATA • NOT LIVE",
  timestampLabel: "Example: 13 Nov, 10:30 AM",
  caption: "Sample rates for design preview",
  comparedPrefix: "Compared with yesterday:",
} as const;

export const METAL_RATE_QUOTES: readonly MetalRateQuote[] = [
  {
    id: "gold",
    title: "GOLD 24K (999)",
    priceLabel: "₹12,450",
    unitLabel: "/ gram",
    changeLabel: "↓ ₹80 (0.64%)",
    changeTone: "positive",
    yesterdayLabel: "₹12,530",
    imageSrc: "/images/bilva/gold-coin-24k-master.png",
    imageAlt: "Bilwa Gold 24K 999 Coin",
    gradientId: "gold-trend-fill",
    stroke: "#0D695B",
    trendNodes: [
      [15, 25],
      [50, 31],
      [85, 21],
      [120, 15],
      [155, 28],
      [190, 22],
      [225, 17],
    ],
    trendPath:
      "M 15 25 C 30 25, 33 31, 50 31 C 67 31, 70 21, 85 21 C 102 21, 105 15, 120 15 C 137 15, 140 28, 155 28 C 172 28, 175 22, 190 22 C 207 22, 210 17, 225 17",
    trendFillPath:
      "M 15 25 C 30 25, 33 31, 50 31 C 67 31, 70 21, 85 21 C 102 21, 105 15, 120 15 C 137 15, 140 28, 155 28 C 172 28, 175 22, 190 22 C 207 22, 210 17, 225 17 L 225 44 L 15 44 Z",
  },
  {
    id: "silver",
    title: "SILVER 999",
    priceLabel: "₹165",
    unitLabel: "/ gram",
    changeLabel: "↑ ₹3 (1.85%)",
    changeTone: "negative",
    yesterdayLabel: "₹162",
    imageSrc: "/images/bilva/silver-coin-999-master.png",
    imageAlt: "Bilwa Silver 999 Coin",
    gradientId: "silver-trend-fill",
    stroke: "#0D695B",
    trendNodes: [
      [15, 26],
      [50, 32],
      [85, 23],
      [120, 16],
      [155, 28],
      [190, 23],
      [225, 16],
    ],
    trendPath:
      "M 15 26 C 30 26, 33 32, 50 32 C 67 32, 70 23, 85 23 C 102 23, 105 16, 120 16 C 137 16, 140 28, 155 28 C 172 28, 175 23, 190 23 C 207 23, 210 16, 225 16",
    trendFillPath:
      "M 15 26 C 30 26, 33 32, 50 32 C 67 32, 70 23, 85 23 C 102 23, 105 16, 120 16 C 137 16, 140 28, 155 28 C 172 28, 175 23, 190 23 C 207 23, 210 16, 225 16 L 225 44 L 15 44 Z",
  },
];

export const TREND_DAY_LABELS = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"] as const;
export const TREND_DAY_XS = [15, 50, 85, 120, 155, 190, 225] as const;