"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaFiveMukhiHero } from "@/components/bilva/five-mukhi/bilva-five-mukhi-hero";
import { BilvaFiveMukhiPurchase } from "@/components/bilva/five-mukhi/bilva-five-mukhi-purchase";
import { BilvaFiveMukhiAuthenticity } from "@/components/bilva/five-mukhi/bilva-five-mukhi-authenticity";
import { BilvaFiveMukhiReviews } from "@/components/bilva/five-mukhi/bilva-five-mukhi-reviews";
import { BilvaFiveMukhiRelated } from "@/components/bilva/five-mukhi/bilva-five-mukhi-related";
import { BilvaFiveMukhiFaq } from "@/components/bilva/five-mukhi/bilva-five-mukhi-faq";

export default function FiveMukhiRudrakshaPage() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaFiveMukhiHero />
      <BilvaFiveMukhiPurchase />
      <BilvaFiveMukhiAuthenticity />
      <BilvaFiveMukhiReviews />
      <BilvaFiveMukhiRelated />
      <BilvaFiveMukhiFaq />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
