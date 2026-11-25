"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaContactPage } from "@/components/bilva/contact/bilva-contact-page";

export default function ContactRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaContactPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
