"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaBagPage } from "@/components/bilva/bag/bilva-bag-page";

export default function BagRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaBagPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
