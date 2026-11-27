"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaGiftingListPage } from "@/components/bilva/gifting/bilva-gifting-list-page";

export default function GiftingPage() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaGiftingListPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}