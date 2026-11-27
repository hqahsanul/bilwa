"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaCorporateListPage } from "@/components/bilva/corporate/bilva-corporate-list-page";

export default function CorporateGiftingPage() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaCorporateListPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
