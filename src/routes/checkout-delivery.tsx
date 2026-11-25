"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaCheckoutDeliveryPage } from "@/components/bilva/checkout/bilva-checkout-delivery-page";

export default function CheckoutDeliveryRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaCheckoutDeliveryPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
