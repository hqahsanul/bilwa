export { RUDRAKSH_COLLECTION_PATH as RUDRAKSH_PATH } from "@/lib/bilva-collection-routes";

export type RudrakshGuideLink = {
  id: string;
  label: string;
  href: string;
  icon: "mukhi" | "size" | "care" | "guide";
};

export type RudrakshBrowseChip = {
  label: string;
  href: string;
};

export type RudrakshProduct = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  alt: string;
  badge?: string;
};

export const RUDRAKSH_HERO = {
  breadcrumbCurrent: "Rudraksh",
  eyebrow: "THE SACRED COLLECTION",
  title: "Rudraksh, thoughtfully chosen",
  description:
    "Sacred traditions, authentic character and meaningful pieces for everyday devotion.",
  primaryCta: "Explore rudraksh",
  secondaryCta: "Learn about rudraksh",
  trustLabels: ["Carefully selected", "Clear product details", "Heritage of trust"] as const,
  heroImageSrc: "/images/bilva/rudraksh/hero.jpg",
  heroImageAlt: "Rudraksh mala with tassel resting on textured stone",
} as const;

export const RUDRAKSH_GUIDE = {
  title: "CHOOSING RUDRAKSH",
  links: [
    { id: "mukhi", label: "Understand mukhi", href: "#understand-mukhi", icon: "mukhi" },
    { id: "size", label: "Know the size", href: "#know-the-size", icon: "size" },
    { id: "care", label: "Explore care guidance", href: "#care-guidance", icon: "care" },
    { id: "guide", label: "Rudraksha guide", href: "#rudraksh-guide", icon: "guide" },
  ] satisfies readonly RudrakshGuideLink[],
} as const;

export const RUDRAKSH_BROWSE = {
  title: "Find your rudraksh",
  imageSrc: "/images/bilva/rudraksh/browse.webp",
  imageAlt: "Rudraksh bead and mala on stone with green leaves",
  chips: [
    { label: "1–5 Mukhi", href: "#collection" },
    { label: "6–9 Mukhi", href: "#collection" },
    { label: "10+ Mukhi", href: "#collection" },
    { label: "Mala & bracelets", href: "#collection" },
    { label: "All rudraksh", href: "#collection" },
  ] satisfies readonly RudrakshBrowseChip[],
} as const;

export const RUDRAKSH_PRODUCTS: readonly RudrakshProduct[] = [
  {
    id: "5-mukhi-bead",
    title: "5 Mukhi Rudraksh Bead",
    subtitle: "Natural bead · 18 mm",
    price: "₹650",
    image: "/images/bilva/rudraksh/browse.webp",
    alt: "Natural 5 Mukhi Rudraksh bead",
  },
  {
    id: "rudraksh-mala",
    title: "Rudraksh Mala",
    subtitle: "5 Mukhi · 108 beads",
    price: "₹2,950",
    image: "/images/bilva/rudraksh/hero.jpg",
    alt: "Rudraksh mala with 108 beads",
    badge: "Mala",
  },
  {
    id: "rudraksh-bracelet",
    title: "Rudraksh Bracelet",
    subtitle: "5 Mukhi · 21 beads",
    price: "₹1,450",
    image: "/images/bilva/rudraksh/bracelet.webp",
    alt: "Rudraksh bracelet with 21 beads",
  },
  {
    id: "6-mukhi-bead",
    title: "6 Mukhi Rudraksh",
    subtitle: "Single bead · 16 mm",
    price: "₹1,250",
    image: "/images/bilva/rudraksh/browse.webp",
    alt: "Natural 6 Mukhi Rudraksh bead",
  },
  {
    id: "rudraksh-pendant",
    title: "Rudraksh Pendant",
    subtitle: "Bead with silver cap",
    price: "₹2,250",
    image: "/images/bilva/rudraksh/bracelet.webp",
    alt: "Rudraksh pendant with silver cap",
  },
  {
    id: "rudraksh-gift-set",
    title: "Rudraksh Gift Set",
    subtitle: "Bead and keepsake case",
    price: "₹3,200",
    image: "/images/bilva/rudraksh/hero.jpg",
    alt: "Rudraksh gift set with keepsake case",
    badge: "Gift Set",
  },
];

export const RUDRAKSH_ASSURANCE = [
  {
    title: "Carefully described",
    body: "Mukhi and bead details",
    icon: "leaf" as const,
  },
  {
    title: "Clear specifications",
    body: "Size and form shown",
    icon: "caliper" as const,
  },
  {
    title: "100+ years",
    body: "Retail heritage",
    icon: "store" as const,
  },
] as const;

export const RUDRAKSH_REVIEWS = [
  {
    quote: "[Verified offline customer review goes here]",
    who: "Offline-store review • awaiting approval",
  },
  {
    quote: "[Verified offline customer review goes here]",
    who: "Offline-store review • awaiting approval",
  },
] as const;

export const RUDRAKSH_CTA = {
  headline: "Meaning,\nbeautifully carried.",
  subcopy: "Explore rudraksh chosen for personal devotion and gifting.",
  primaryCta: "Explore rudraksh",
  secondaryCta: "Read the guide",
  imageSrc: "/images/bilva/rudraksh/cta-photo.jpg",
  imageAlt: "Rudraksh bead on marble with mala and gold tassel",
} as const;