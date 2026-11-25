"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaLatestOrderPage } from "@/components/bilva/account/bilva-latest-order-page";

export default function MyBilwaRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaLatestOrderPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
