"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaCheckoutReviewPage } from "@/components/bilva/checkout/bilva-checkout-review-page";

export default function CheckoutReviewRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaCheckoutReviewPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
