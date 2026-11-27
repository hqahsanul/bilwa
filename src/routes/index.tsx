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
      <BilvaRouteSwitcher />
      <BilvaNavbar />
      <BilvaHero />
      <BilvaMetalRates />
      <BilvaCollectionsSection />
      <BilvaBestSellers />
      <BilvaSignatureCollection />
      <BilvaLegacySection />
      <BilvaSmallDenominations />
      <BilvaGiftingSection />
      <BilvaHowItWorksSection />
      <BilvaConfidenceSection />
      <BilvaFooter />
    </main>
  );
}
