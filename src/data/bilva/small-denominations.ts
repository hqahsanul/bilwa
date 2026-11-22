export type SmallDenomWeight = "0.5 g" | "1 g" | "2 g" | "5 g";
export type SmallDenomMetal = "gold" | "silver";

export const SMALL_DENOM_WEIGHTS: readonly SmallDenomWeight[] = ["0.5 g", "1 g", "2 g", "5 g"];
export const SMALL_DENOM_METALS: readonly SmallDenomMetal[] = ["gold", "silver"];

export const SMALL_DENOM_DEFAULTS = {
  weight: "1 g" as SmallDenomWeight,
  metal: "gold" as SmallDenomMetal,
};

export const SMALL_DENOM_COPY = {
  eyebrow: "PRECIOUS STARTS HERE",
  headlineLines: ["Every beginning", "deserves something", "precious."] as const,
  body: "Start with thoughtfully sized coins — clear purity, clear weight, ready to gift or keep.",
  exploreLabel: "Explore by weight",
  viewPiecesLabel: "View pieces",
  backdropSrc: "/images/bilva/small-denominations-backdrop-master.webp",
  backdropAlt:
    "Bilwa 24K pure gold coins in 0.5g, 1g, 2g, and 5g denominations on travertine pedestals with emerald silk drapery",
  mobileImageSrc: "/images/bilva/small-denominations-master.webp",
  mobileImageAlt: "Bilwa gold coins in 0.5g, 1g, 2g, and 5g denominations",
} as const;

export function smallDenomPurity(metal: SmallDenomMetal): string {
  return metal === "gold" ? "24K (999)" : "Silver 999";
}

export function smallDenomCoinName(weight: SmallDenomWeight, metal: SmallDenomMetal): string {
  return `${weight} ${metal === "gold" ? "Gold coin" : "Silver coin"}`;
}

export function smallDenomCatalogHref(weight: SmallDenomWeight, metal: SmallDenomMetal): string {
  return `#catalog-${weight.replace(/\s+/g, "")}-${metal}`;
}