"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaPaymentPendingPage } from "@/components/bilva/checkout/bilva-payment-pending-page";

export default function CheckoutPaymentPendingRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaPaymentPendingPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
