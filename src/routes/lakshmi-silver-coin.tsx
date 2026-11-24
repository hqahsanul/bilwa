"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaLakshmiSilverHero } from "@/components/bilva/lakshmi-silver/bilva-lakshmi-silver-hero";
import { BilvaLakshmiSilverPurchase } from "@/components/bilva/lakshmi-silver/bilva-lakshmi-silver-purchase";
import { BilvaLakshmiSilverAuthenticity } from "@/components/bilva/lakshmi-silver/bilva-lakshmi-silver-authenticity";
import { BilvaLakshmiSilverReviews } from "@/components/bilva/lakshmi-silver/bilva-lakshmi-silver-reviews";
import { BilvaLakshmiSilverRelated } from "@/components/bilva/lakshmi-silver/bilva-lakshmi-silver-related";
import { BilvaLakshmiSilverFaq } from "@/components/bilva/lakshmi-silver/bilva-lakshmi-silver-faq";

export default function LakshmiSilverCoinPage() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaLakshmiSilverHero />
      <BilvaLakshmiSilverPurchase />
      <BilvaLakshmiSilverAuthenticity />
      <BilvaLakshmiSilverReviews />
      <BilvaLakshmiSilverRelated />
      <BilvaLakshmiSilverFaq />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
