"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaLakshmiGoldHero } from "@/components/bilva/lakshmi-gold/bilva-lakshmi-gold-hero";
import { BilvaLakshmiGoldSelection } from "@/components/bilva/lakshmi-gold/bilva-lakshmi-gold-selection";
import { BilvaLakshmiGoldAuthenticity } from "@/components/bilva/lakshmi-gold/bilva-lakshmi-gold-authenticity";
import { BilvaLakshmiGoldReviews } from "@/components/bilva/lakshmi-gold/bilva-lakshmi-gold-reviews";
import { BilvaLakshmiGoldRelated } from "@/components/bilva/lakshmi-gold/bilva-lakshmi-gold-related";

export default function LakshmiGoldCoinPage() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaLakshmiGoldHero />
      <BilvaLakshmiGoldSelection />
      <BilvaLakshmiGoldAuthenticity />
      <BilvaLakshmiGoldReviews />
      <BilvaLakshmiGoldRelated />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
