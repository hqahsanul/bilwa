export interface WishlistProduct {
  id: string;
  name: string;
  meta: string[];
  priceFormatted?: string;
  indicative?: boolean;
  priceNote?: string;
  stockLabel: string;
  madeToOrder?: boolean;
  imageSrc: string;
  imageAlt: string;
}

export interface WishlistMiniItem {
  id: string;
  name: string;
  meta: string[];
  priceFormatted?: string;
  indicative?: boolean;
  priceNote?: string;
  imageSrc: string;
  imageAlt: string;
}

export const WISHLIST_DATA = {
  eyebrow: "Pieces worth keeping",
  heading: "Your wishlist",
  shareLabel: "Share wishlist",
  shareCopiedNote: "Wishlist link copied to clipboard.",
  continueLabel: "Continue exploring",
  continueHref: "/gold-silver/gold-coins-and-bars",
  moveSelectedLabel: "Move selected to bag",
  removeSelectedLabel: "Remove selected",
  moveToBagLabel: "Move to bag",
  emptyMessage: "Your wishlist is currently empty. Explore collections or save pieces from your recently viewed items below.",

  initialItems: [
    {
      id: "gold-lotus-coin",
      name: "Gold Lotus Coin",
      meta: ["Gold", "24K (999.9)", "10 g"],
      priceFormatted: "₹1,06,550",
      indicative: true,
      stockLabel: "In stock",
      imageSrc: "/images/bilva/lakshmi-gold/related-lotus.png",
      imageAlt: "Gold Lotus Coin 24K 10 g",
    },
    {
      id: "silver-blessing-coin",
      name: "Silver Blessing Coin",
      meta: ["Silver", "999 Purity", "20 g"],
      priceFormatted: "₹2,350",
      indicative: true,
      stockLabel: "In stock",
      imageSrc: "/images/bilva/checkout/summary-silver-blessings-coin.png",
      imageAlt: "Silver Blessing Coin 999 Purity 20 g",
    },
    {
      id: "bilwa-gold-bar",
      name: "Bilwa Gold Bar",
      meta: ["Gold", "24K (999.9)", "5 g"],
      priceFormatted: "₹53,250",
      indicative: true,
      stockLabel: "In stock",
      imageSrc: "/images/bilva/bestseller-gold-bar-master.webp",
      imageAlt: "Bilwa Gold Bar 24K 5 g",
    },
    {
      id: "festive-gifting-piece",
      name: "Festive Gifting Piece",
      meta: ["Silver", "999 Purity", "~60 g (bowl)"],
      priceNote: "Price confirmed at checkout",
      stockLabel: "Made to order",
      madeToOrder: true,
      imageSrc: "/images/bilva/gifting-hero.png",
      imageAlt: "Festive Gifting Silver Piece",
    },
  ] as WishlistProduct[],

  recentlyViewed: {
    title: "Recently viewed",
    subtitle: "Keep exploring what caught your eye",
    viewAllLabel: "View all",
    viewAllHref: "/gold-silver/gold-coins-and-bars",
    items: [
      {
        id: "rv-gold-coin",
        name: "Gold Coin",
        meta: ["Gold", "24K (999.9)", "5 g"],
        priceFormatted: "₹53,250",
        indicative: true,
        imageSrc: "/images/bilva/bestseller-gold-coin-clean.webp",
        imageAlt: "24K Gold Coin 5 g",
      },
      {
        id: "rv-rudraksh",
        name: "5 Mukhi Rudraksh",
        meta: ["Natural", "Nepal Origin"],
        priceFormatted: "₹1,350",
        imageSrc: "/images/bilva/five-mukhi/hero.png",
        imageAlt: "5 Mukhi Rudraksh",
      },
      {
        id: "rv-emerald",
        name: "Emerald (Panna)",
        meta: ["Natural", "3.25 ct"],
        priceFormatted: "₹1,42,000",
        indicative: true,
        imageSrc: "/images/bilva/collection-gemstones-raw.webp",
        imageAlt: "Natural Emerald Gemstone",
      },
      {
        id: "rv-silver-diya",
        name: "Silver Lotus Diya",
        meta: ["Silver", "999 Purity", "75 g"],
        priceFormatted: "₹6,950",
        imageSrc: "/images/bilva/bestseller-silver-coin-clean.webp",
        imageAlt: "Silver Lotus Diya 999 Purity",
      },
    ] as WishlistMiniItem[],
  },

  recommendations: {
    title: "You may also like",
    subtitle: "Curated pieces that complement your wishlist",
    exploreLabel: "Explore more recommendations",
    exploreHref: "/#explore-collections",
    items: [
      {
        id: "rec-lakshmi-gold",
        name: "Gold Lakshmi Coin",
        meta: ["Gold", "24K (999.9)", "10 g"],
        priceFormatted: "₹1,06,550",
        indicative: true,
        imageSrc: "/images/bilva/lakshmi-gold/specs-coin.png",
        imageAlt: "Gold Lakshmi Coin 10 g",
      },
      {
        id: "rec-ganesh-silver",
        name: "Silver Ganesh Coin",
        meta: ["Silver", "999 Purity", "20 g"],
        priceFormatted: "₹2,350",
        indicative: true,
        imageSrc: "/images/bilva/lakshmi-silver/related-ganesha.png",
        imageAlt: "Silver Ganesh Coin 20 g",
      },
      {
        id: "rec-gold-bar-10g",
        name: "Bilwa Gold Bar",
        meta: ["Gold", "24K (999.9)", "10 g"],
        priceFormatted: "₹1,06,550",
        indicative: true,
        imageSrc: "/images/bilva/lakshmi-gold/related-bar.png",
        imageAlt: "Bilwa Gold Bar 10 g",
      },
      {
        id: "rec-hamper",
        name: "Premium Gifting Hamper",
        meta: ["Mixed Metals", "Curated Set"],
        priceNote: "Price confirmed at checkout",
        imageSrc: "/images/bilva/collection-premium-gifting-raw.webp",
        imageAlt: "Premium Gifting Hamper",
      },
    ] as WishlistMiniItem[],
  },

  trustStrip: [
    {
      id: "insured",
      title: "Insured delivery",
      subtitle: "Secure, fully insured shipping on every order",
    },
    {
      id: "docs",
      title: "Complete documentation",
      subtitle: "Hallmark & authenticity details with your purchase",
    },
    {
      id: "trackable",
      title: "Reliable & trackable delivery",
      subtitle: "Real-time updates, from our vault to your door",
    },
  ],
};
