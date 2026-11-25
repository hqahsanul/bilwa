"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaOrderConfirmedPage } from "@/components/bilva/checkout/bilva-order-confirmed-page";

export default function CheckoutConfirmedRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaOrderConfirmedPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
