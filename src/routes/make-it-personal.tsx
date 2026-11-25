"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaMakeItPersonalPage } from "@/components/bilva/gifting/bilva-make-it-personal-page";

export default function MakeItPersonalRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaMakeItPersonalPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
