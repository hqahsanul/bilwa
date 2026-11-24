"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaCheckoutPage } from "@/components/bilva/checkout/bilva-checkout-page";

export default function CheckoutRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaCheckoutPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
