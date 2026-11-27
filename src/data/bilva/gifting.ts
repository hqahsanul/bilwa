export type GiftingOccasionId =
  | "weddings"
  | "festivals"
  | "milestones"
  | "blessings"
  | "corporate";

export type GiftingOccasion = {
  id: GiftingOccasionId;
  label: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  /** Maps to icon renderer in the section component. */
  icon: GiftingOccasionId;
};

export const GIFTING_OCCASIONS: readonly GiftingOccasion[] = [
  {
    id: "weddings",
    label: "Weddings",
    imageSrc: "/images/bilva/gifting-hero.png",
    imageAlt: "Bilwa luxury wedding gift set with gold and silver coins in presentation box",
    description: "Explore meaningful keepsakes and gifts for a new beginning.",
    ctaHref: "#gifting-weddings",
    ctaLabel: "View wedding gifts",
    icon: "weddings",
  },
  {
    id: "festivals",
    label: "Festivals",
    imageSrc: "/images/bilva/gifting-hero-alt-1.png",
    imageAlt: "Bilwa festive gifting with precious coins and ceremonial presentation",
    description: "Celebrate traditions with coins and gifts made for the season.",
    ctaHref: "#gifting-festivals",
    ctaLabel: "View festival gifts",
    icon: "festivals",
  },
  {
    id: "milestones",
    label: "Milestones",
    imageSrc: "/images/bilva/gifting-hero-alt-2.png",
    imageAlt: "Bilwa milestone gifting — gold keepsakes for life’s achievements",
    description: "Mark achievements with pieces worth keeping for years to come.",
    ctaHref: "#gifting-milestones",
    ctaLabel: "View milestone gifts",
    icon: "milestones",
  },
  {
    id: "blessings",
    label: "Blessings",
    imageSrc: "/images/bilva/gifting-hero-alt-3.png",
    imageAlt: "Bilwa blessing and devotional gifting with sacred keepsakes",
    description: "Offer blessings with thoughtfully chosen precious pieces.",
    ctaHref: "#gifting-blessings",
    ctaLabel: "View blessing gifts",
    icon: "blessings",
  },
  {
    id: "corporate",
    label: "Corporate",
    imageSrc: "/images/bilva/gifting-hero.png",
    imageAlt: "Bilwa corporate gifting sets with engraved coins and premium packaging",
    description: "Elevate professional relationships with refined presentation sets.",
    ctaHref: "/corporate-gifting",
    ctaLabel: "View corporate gifts",
    icon: "corporate",
  },
];