"use client";

import { BilvaRouteSwitcher } from "@/components/bilva/bilva-route-switcher";
import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaHero } from "@/components/bilva/bilva-hero";
import { BilvaMetalRates } from "@/components/bilva/bilva-metal-rates";
import { BilvaCollectionsSection } from "@/components/bilva/bilva-collections-section";
import { BilvaBestSellers } from "@/components/bilva/bilva-best-sellers";
import { BilvaSignatureCollection } from "@/components/bilva/bilva-signature-collection";
import { BilvaLegacySection } from "@/components/bilva/bilva-legacy-section";
import { BilvaSmallDenominations } from "@/components/bilva/bilva-small-denominations";
import { BilvaGiftingSection } from "@/components/bilva/bilva-gifting-section";
import { BilvaHowItWorksSection } from "@/components/bilva/bilva-how-it-works-section";
import { BilvaConfidenceSection } from "@/components/bilva/bilva-confidence-section";
import { BilvaFooter } from "@/components/bilva/bilva-footer";

export default function BilvaLandingPage() {
  return (
    <main className="bilva-page">
      {/* Temporary Route Switcher (remove later) */}
      <BilvaRouteSwitcher />

      {/* 1. Top Announcement Bar & Main Navigation Header */}
      <BilvaNavbar />

      {/* 2. Hero Carousel Section */}
      <BilvaHero />

      {/* 3. Today's Precious Metal Rates Section (Just below Hero) */}
      <BilvaMetalRates />

      {/* 4. Curated Collections Section (Explore our collections) */}
      <BilvaCollectionsSection />

      {/* 5. Customer Favourites - Best Sellers Section */}
      <BilvaBestSellers />

      {/* 6. Signature Collection Bento Grid Section */}
      <BilvaSignatureCollection />

      {/* 7. Rooted in Experience - Legacy & Clarity Section */}
      <BilvaLegacySection />

      {/* 8. Precious Starts Here - Small Denominations Section */}
      <BilvaSmallDenominations />

      {/* 9. Made for Life's Moments — Gifting */}
      <BilvaGiftingSection />

      {/* 10. Confidence at Every Step — How It Works */}
      <BilvaHowItWorksSection />

      {/* 11. Confidence is in the details — offline trust */}
      <BilvaConfidenceSection />

      {/* 12. Pre-Footer CTA & Luxury Heritage Footer */}
      <BilvaFooter />
    </main>
  );
}
