export type BilvaHeroSlide = {
  id: string;
  number: string;
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  descriptionLine1: string;
  descriptionLine2: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  upNextTitle: string;
  imageSrc: string;
  imageAlt: string;
  seriesTag: string;
};

/** Homepage hero carousel — illustrative until CMS/API is wired. */
export const HERO_SLIDES: readonly BilvaHeroSlide[] = [
  {
    id: "signature-collection",
    number: "01",
    eyebrow: "BILWA SIGNATURE COLLECTION",
    headlineLine1: "More than precious.",
    headlineLine2: "Made meaningful.",
    descriptionLine1: "Gold and silver pieces crafted for gifting,",
    descriptionLine2: "celebrating and keeping.",
    primaryCtaText: "Explore the collection",
    primaryCtaHref: "/gold-silver/gold-coins-and-bars",
    secondaryCtaText: "Our heritage",
    secondaryCtaHref: "/#legacy-trust",
    upNextTitle: "The art of silver",
    imageSrc: "/images/bilva/hero-slide-1-master-2x.webp",
    imageAlt: "Bilwa Signature Collection - 24K Gold Coin in Green Velvet Presentation Box",
    seriesTag: "SIGNATURE SERIES",
  },
  {
    id: "art-of-silver",
    number: "02",
    eyebrow: "THE ART OF SILVER",
    headlineLine1: "Purity sculpted in",
    headlineLine2: "divine silver.",
    descriptionLine1: "Master-crafted 999 pure silver coins,",
    descriptionLine2: "idols and keepsakes for timeless blessings.",
    primaryCtaText: "Explore Silver",
    primaryCtaHref: "/gold-silver/silver-coins-and-bars",
    secondaryCtaText: "Our heritage",
    secondaryCtaHref: "/#legacy-trust",
    upNextTitle: "Gifts with meaning",
    imageSrc: "/images/bilva/hero-slide-1-master-2x.webp",
    imageAlt: "Bilwa Art of Silver Collection",
    seriesTag: "SIGNATURE SERIES",
  },
  {
    id: "joy-of-giving",
    number: "03",
    eyebrow: "THE JOY OF GIVING",
    headlineLine1: "A precious gift that",
    headlineLine2: "holds its meaning.",
    descriptionLine1: "Thoughtfully boxed coins and divine treasures,",
    descriptionLine2: "crafted for life's celebrated milestones.",
    primaryCtaText: "Explore Gifting",
    primaryCtaHref: "/make-it-personal",
    secondaryCtaText: "Our heritage",
    secondaryCtaHref: "/#legacy-trust",
    upNextTitle: "Signature collection",
    imageSrc: "/images/bilva/hero-slide-1-master-2x.webp",
    imageAlt: "Bilwa Curated Gifting Sets",
    seriesTag: "SIGNATURE SERIES",
  },
];